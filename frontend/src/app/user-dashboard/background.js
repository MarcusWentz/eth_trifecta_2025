// Constants
const API_ENDPOINT = 'https://Sovereign Ads-api.example.com'; // Replace with your actual API endpoint
const POLLING_INTERVAL = 5 * 60 * 1000; // 5 minutes
const LOCAL_STORAGE_KEYS = {
  USER_DATA: 'Sovereign Ads_user_data',
  LAST_FETCH: 'Sovereign Ads_last_fetch',
  WALLET_ADDRESS: 'Sovereign Ads_wallet_address',
  AUTH_TOKEN: 'Sovereign Ads_auth_token'
};

// Initialize background script
chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  if (reason === 'install') {
    // First time installation
    await showWelcomeNotification();
    // Set default settings
    await chrome.storage.local.set({
      [LOCAL_STORAGE_KEYS.USER_DATA]: null,
      [LOCAL_STORAGE_KEYS.LAST_FETCH]: null,
      [LOCAL_STORAGE_KEYS.WALLET_ADDRESS]: null,
      [LOCAL_STORAGE_KEYS.AUTH_TOKEN]: null
    });
  } else if (reason === 'update') {
    // Extension was updated
    await showUpdateNotification();
  }
  
  // Start the data polling
  startPolling();
});

// Show welcome notification
async function showWelcomeNotification() {
  await chrome.notifications.create('welcome', {
    type: 'basic',
    iconUrl: 'icons/icon128.png',
    title: 'Welcome to Sovereign Ads!',
    message: 'Thank you for installing. Connect your wallet to start earning rewards through privacy-preserving ads.',
    priority: 2
  });
  
  // Open the welcome page
  chrome.notifications.onClicked.addListener((notificationId) => {
    if (notificationId === 'welcome') {
      chrome.tabs.create({ url: chrome.runtime.getURL('index.html') });
    }
  });
}

// Show update notification
async function showUpdateNotification() {
  await chrome.notifications.create('update', {
    type: 'basic',
    iconUrl: 'icons/icon128.png',
    title: 'Sovereign Ads Has Been Updated!',
    message: 'Check out the new features and improvements in this version.',
    priority: 1
  });
}

// Start polling for new data
function startPolling() {
  // Fetch data immediately
  fetchData();
  
  // Set up interval for polling
  setInterval(fetchData, POLLING_INTERVAL);
  
  // Listen for user activity to refresh data
  chrome.tabs.onActivated.addListener(() => {
    checkLastFetch();
  });
}

// Check when we last fetched data and fetch if it's been too long
async function checkLastFetch() {
  const data = await chrome.storage.local.get(LOCAL_STORAGE_KEYS.LAST_FETCH);
  const lastFetch = data[LOCAL_STORAGE_KEYS.LAST_FETCH];
  
  if (!lastFetch || (Date.now() - lastFetch > POLLING_INTERVAL)) {
    fetchData();
  }
}

// Fetch user data from the API
async function fetchData() {
  try {
    // Get wallet address from storage
    const data = await chrome.storage.local.get([
      LOCAL_STORAGE_KEYS.WALLET_ADDRESS,
      LOCAL_STORAGE_KEYS.AUTH_TOKEN
    ]);
    
    const walletAddress = data[LOCAL_STORAGE_KEYS.WALLET_ADDRESS];
    const authToken = data[LOCAL_STORAGE_KEYS.AUTH_TOKEN];
    
    // If we don't have a wallet address, we can't fetch data
    if (!walletAddress) {
      return;
    }
    
    // For the demo, we'll just use mock data
    // In a real implementation, you would fetch from your API
    const userData = await mockFetchUserData(walletAddress);
    
    // Store the fetched data
    await chrome.storage.local.set({
      [LOCAL_STORAGE_KEYS.USER_DATA]: userData,
      [LOCAL_STORAGE_KEYS.LAST_FETCH]: Date.now()
    });
    
    // Check for new ads or rewards and show notifications
    checkForNewAdsAndRewards(userData);
    
    // Notify any open extension popup to update its data
    chrome.runtime.sendMessage({ action: 'UPDATE_DATA' });
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Mock function to simulate API call
async function mockFetchUserData(walletAddress) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Get current data
  const data = await chrome.storage.local.get(LOCAL_STORAGE_KEYS.USER_DATA);
  const currentData = data[LOCAL_STORAGE_KEYS.USER_DATA];
  
  // If we have existing data, modify it slightly to simulate changes
  if (currentData) {
    const hasNewReward = Math.random() > 0.7; // 30% chance of new reward
    
    if (hasNewReward) {
      const newRewardAmount = (Math.random() * 1.5 + 0.1).toFixed(2);
      currentData.availableRewards += parseFloat(newRewardAmount);
      
      // Add a new ad view
      const adTypes = [
        { company: 'Aave', title: 'Earn Interest on Your Crypto', category: 'DeFi' },
        { company: 'Arweave', title: 'Permanent Storage for Your Data', category: 'Storage' },
        { company: 'Rarible', title: 'Create and Sell NFTs', category: 'NFT' },
        { company: 'Maker', title: 'Generate DAI Stablecoin', category: 'Stablecoin' },
        { company: 'Filecoin', title: 'Decentralized Storage Network', category: 'Storage' }
      ];
      
      const randomAd = adTypes[Math.floor(Math.random() * adTypes.length)];
      
      // Add new ad to the beginning of the array
      currentData.recentAds.unshift({
        id: Date.now(),
        company: randomAd.company,
        companyInitials: randomAd.company.substring(0, 2).toUpperCase(),
        title: randomAd.title,
        earnings: parseFloat(newRewardAmount),
        category: randomAd.category,
        status: 'verified',
        date: new Date()
      });
      
      // Keep only the 10 most recent ads
      currentData.recentAds = currentData.recentAds.slice(0, 10);
      
      // Update earnings
      currentData.earnings.unshift({
        id: Date.now(),
        type: 'Ad Reward',
        amount: parseFloat(newRewardAmount),
        description: `Viewed ${randomAd.company} ad`,
        date: new Date()
      });
      
      // Keep only the 10 most recent earnings
      currentData.earnings = currentData.earnings.slice(0, 10);
    }
    
    return currentData;
  }
  
  // If we don't have data yet, generate some mock data
  return {
    isConnected: true,
    walletAddress: walletAddress,
    availableRewards: 376,
    level: 'Silver',
    nextLevelPoints: 500,
    pointsToNextLevel: 124,
    progressPercentage: 75,
    recentAds: [
      {
        id: 1,
        company: 'MetaMask',
        companyInitials: 'ME',
        title: 'Secure Your Crypto Assets',
        earnings: 0.45,
        category: 'DeFi',
        status: 'verified',
        date: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
      },
      {
        id: 2,
        company: 'Uniswap',
        companyInitials: 'UN',
        title: 'Trade Tokens with Low Fees',
        earnings: 0.65,
        category: 'DEX',
        status: 'verified',
        date: new Date(Date.now() - 1000 * 60 * 60 * 5) // 5 hours ago
      },
      {
        id: 3,
        company: 'Lens Protocol',
        companyInitials: 'LP',
        title: 'Join the Social Revolution',
        earnings: 0.35,
        category: 'Social',
        status: 'pending',
        date: new Date(Date.now() - 1000 * 60 * 60 * 8) // 8 hours ago
      }
    ],
    earnings: [
      {
        id: 1,
        type: 'Daily Rewards',
        amount: 2.50,
        description: 'Viewed 5 ads',
        date: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
      },
      {
        id: 2,
        type: 'Referral Bonus',
        amount: 5.00,
        description: 'User: crypto_max joined',
        date: new Date(Date.now() - 1000 * 60 * 60 * 48) // 2 days ago
      },
      {
        id: 3,
        type: 'Daily Rewards',
        amount: 1.50,
        description: 'Viewed 3 ads',
        date: new Date(Date.now() - 1000 * 60 * 60 * 72) // 3 days ago
      }
    ]
  };
}

// Check for new ads and rewards to show notifications
function checkForNewAdsAndRewards(userData) {
  // Check if there's any new ad in the past hour
  const oneHourAgo = new Date(Date.now() - 1000 * 60 * 60);
  
  const recentAds = userData.recentAds.filter(ad => 
    new Date(ad.date) > oneHourAgo
  );
  
  if (recentAds.length > 0) {
    // Show notification for the most recent ad
    const mostRecentAd = recentAds[0];
    
    chrome.notifications.create(`ad-${mostRecentAd.id}`, {
      type: 'basic',
      iconUrl: 'icons/icon128.png',
      title: `Earned ${mostRecentAd.earnings.toFixed(2)} ZKT!`,
      message: `You've earned rewards for viewing "${mostRecentAd.title}" from ${mostRecentAd.company}.`,
      priority: 1
    });
  }
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'CONNECT_WALLET') {
    // Store the wallet address
    chrome.storage.local.set({
      [LOCAL_STORAGE_KEYS.WALLET_ADDRESS]: message.address,
      [LOCAL_STORAGE_KEYS.AUTH_TOKEN]: message.token
    });
    
    // Fetch data for the new wallet
    fetchData();
  } else if (message.action === 'DISCONNECT_WALLET') {
    // Clear user data
    chrome.storage.local.set({
      [LOCAL_STORAGE_KEYS.USER_DATA]: null,
      [LOCAL_STORAGE_KEYS.WALLET_ADDRESS]: null,
      [LOCAL_STORAGE_KEYS.AUTH_TOKEN]: null
    });
  } else if (message.action === 'GET_USER_DATA') {
    // Return the current user data
    chrome.storage.local.get(LOCAL_STORAGE_KEYS.USER_DATA, (data) => {
      sendResponse({ userData: data[LOCAL_STORAGE_KEYS.USER_DATA] });
    });
    return true; // Required for async sendResponse
  }
});

// Add listener for alarm to periodically check for new rewards
chrome.alarms.create('checkRewards', { periodInMinutes: 60 }); // Check every hour

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'checkRewards') {
    fetchData();
  }
}); 