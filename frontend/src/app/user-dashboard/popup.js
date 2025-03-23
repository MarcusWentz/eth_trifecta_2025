// Constants
const API_ENDPOINT = 'https://Sovereign Ads-api.example.com'; // Replace with your actual API endpoint

// State management
let userData = {
  isConnected: false,
  walletAddress: '',
  availableRewards: 0,
  level: 'Bronze',
  nextLevelPoints: 500,
  pointsToNextLevel: 0,
  recentAds: [],
  earnings: []
};

// Initialize the extension
document.addEventListener('DOMContentLoaded', function() {
  initializeUI();
  setupEventListeners();
  checkWalletConnection();
});

// Initialize UI elements
function initializeUI() {
  // Tab switching functionality
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const tabName = this.getAttribute('data-tab');
      
      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      // Show corresponding content
      tabContents.forEach(content => {
        content.classList.add('hidden');
        if (content.id === `${tabName}-content`) {
          content.classList.remove('hidden');
        }
      });
    });
  });
}

// Set up event listeners
function setupEventListeners() {
  // Redeem button click
  const redeemButton = document.querySelector('.action-button');
  if (redeemButton) {
    redeemButton.addEventListener('click', function() {
      // Open rewards page in a new tab
      chrome.tabs.create({ url: chrome.runtime.getURL('index.html#/user-dashboard/rewards') });
    });
  }

  // Connect wallet button (if exists)
  const connectWalletBtn = document.querySelector('.connect-wallet-btn');
  if (connectWalletBtn) {
    connectWalletBtn.addEventListener('click', connectWallet);
  }
}

// Check if wallet is connected
async function checkWalletConnection() {
  try {
    // Check if browser wallet is available
    if (typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      
      if (accounts.length > 0) {
        // User is already connected
        userData.isConnected = true;
        userData.walletAddress = accounts[0];
        updateConnectionStatus(true);
        fetchUserData();
      } else {
        // User is not connected
        updateConnectionStatus(false);
        showConnectPrompt();
      }

      // Listen for account changes
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    } else {
      // No wallet detected
      updateConnectionStatus(false, 'No wallet detected');
      showNoWalletMessage();
    }
  } catch (error) {
    console.error('Error checking wallet connection:', error);
    updateConnectionStatus(false, 'Connection error');
  }
}

// Handle account changes
function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {
    // User disconnected their wallet
    userData.isConnected = false;
    userData.walletAddress = '';
    updateConnectionStatus(false);
    showConnectPrompt();
  } else {
    // User switched accounts
    userData.walletAddress = accounts[0];
    fetchUserData();
  }
}

// Connect wallet function
async function connectWallet() {
  try {
    if (typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts'
      });
      
      userData.isConnected = true;
      userData.walletAddress = accounts[0];
      updateConnectionStatus(true);
      fetchUserData();
    } else {
      showNoWalletMessage();
    }
  } catch (error) {
    console.error('Error connecting wallet:', error);
    updateConnectionStatus(false, 'Connection failed');
  }
}

// Update connection status UI
function updateConnectionStatus(isConnected, message = '') {
  const statusElement = document.querySelector('.connected-status');
  if (!statusElement) return;

  if (isConnected) {
    statusElement.innerHTML = `
      <span class="dot"></span>
      <span>Connected</span>
    `;
    statusElement.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
    statusElement.style.color = 'var(--success-color)';
    statusElement.style.borderColor = 'rgba(16, 185, 129, 0.2)';
  } else {
    statusElement.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="8" y1="12" x2="16" y2="12"></line>
      </svg>
      <span>${message || 'Disconnected'}</span>
    `;
    statusElement.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
    statusElement.style.color = 'var(--error-color)';
    statusElement.style.borderColor = 'rgba(239, 68, 68, 0.2)';
  }
}

// Show connect wallet prompt
function showConnectPrompt() {
  const adsContent = document.getElementById('ads-content');
  const earningsContent = document.getElementById('earnings-content');
  const rewardsCard = document.querySelector('.rewards-card');

  if (rewardsCard) {
    rewardsCard.innerHTML = `
      <div class="empty-state">
        <svg class="empty-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="9" y1="3" x2="9" y2="21"></line>
        </svg>
        <div style="margin-bottom: 12px;">Connect your wallet to view rewards</div>
        <button class="action-button connect-wallet-btn">Connect Wallet</button>
      </div>
    `;
    
    const connectBtn = rewardsCard.querySelector('.connect-wallet-btn');
    if (connectBtn) {
      connectBtn.addEventListener('click', connectWallet);
    }
  }

  if (adsContent) {
    adsContent.innerHTML = `
      <div class="empty-state">
        <div>Connect your wallet to view your recent ads</div>
      </div>
    `;
  }

  if (earningsContent) {
    earningsContent.innerHTML = `
      <div class="empty-state">
        <div>Connect your wallet to view your earnings</div>
      </div>
    `;
  }
}

// Show no wallet message
function showNoWalletMessage() {
  const container = document.querySelector('.container');
  if (!container) return;

  container.innerHTML = `
    <header>
      <div class="logo">
        <svg class="logo-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
        <span class="logo-text">Sovereign Ads</span>
        <span class="badge">Extension</span>
      </div>
      <div class="connected-status" style="background-color: rgba(239, 68, 68, 0.1); color: var(--error-color); border-color: rgba(239, 68, 68, 0.2);">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
        <span>No Wallet</span>
      </div>
    </header>
    
    <div class="empty-state" style="flex: 1;">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 16px; opacity: 0.5;">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="9" y1="3" x2="9" y2="21"></line>
      </svg>
      <h3 style="margin-bottom: 8px; font-size: 16px;">No Wallet Detected</h3>
      <p style="margin-bottom: 16px; color: var(--text-secondary); text-align: center; font-size: 14px;">
        To use Sovereign Ads, you need an Ethereum wallet like MetaMask
      </p>
      <button class="action-button" id="install-wallet-btn">Install MetaMask</button>
    </div>
    
    <footer>
      <div>Sovereign Ads Extension v1.0.0 • Privacy-First Advertising</div>
    </footer>
  `;

  const installWalletBtn = document.getElementById('install-wallet-btn');
  if (installWalletBtn) {
    installWalletBtn.addEventListener('click', function() {
      chrome.tabs.create({ url: 'https://metamask.io/download/' });
    });
  }
}

// Fetch user data
async function fetchUserData() {
  try {
    // In a real implementation, you would fetch data from your API
    // For demonstration, we'll use mock data
    
    // Simulate API fetch delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock data
    userData = {
      isConnected: true,
      walletAddress: userData.walletAddress,
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
          date: new Date(2023, 4, 20)
        },
        {
          id: 2,
          company: 'Uniswap',
          companyInitials: 'UN',
          title: 'Trade Tokens with Low Fees',
          earnings: 0.65,
          category: 'DEX',
          status: 'verified',
          date: new Date(2023, 4, 19)
        },
        {
          id: 3,
          company: 'Lens Protocol',
          companyInitials: 'LP',
          title: 'Join the Social Revolution',
          earnings: 0.35,
          category: 'Social',
          status: 'pending',
          date: new Date(2023, 4, 18)
        },
        {
          id: 4,
          company: 'Chainlink',
          companyInitials: 'CH',
          title: 'Power Your dApps with Oracle Data',
          earnings: 0.55,
          category: 'Infrastructure',
          status: 'verified',
          date: new Date(2023, 4, 17)
        },
        {
          id: 5,
          company: 'Polygon',
          companyInitials: 'PO',
          title: 'Scale Your Ethereum Applications',
          earnings: 0.50,
          category: 'L2',
          status: 'verified',
          date: new Date(2023, 4, 16)
        }
      ],
      earnings: [
        {
          id: 1,
          type: 'Daily Rewards',
          amount: 2.50,
          description: 'Viewed 5 ads',
          date: new Date(2023, 4, 20)
        },
        {
          id: 2,
          type: 'Referral Bonus',
          amount: 5.00,
          description: 'User: crypto_max joined',
          date: new Date(2023, 4, 19)
        },
        {
          id: 3,
          type: 'Daily Rewards',
          amount: 1.50,
          description: 'Viewed 3 ads',
          date: new Date(2023, 4, 18)
        },
        {
          id: 4,
          type: 'Special Campaign',
          amount: 3.25,
          description: 'DeFi awareness program',
          date: new Date(2023, 4, 15)
        },
        {
          id: 5,
          type: 'Weekly Bonus',
          amount: 4.50,
          description: 'Active user reward',
          date: new Date(2023, 4, 10)
        }
      ]
    };
    
    // Update UI with the fetched data
    updateRewardsUI();
    updateAdsUI();
    updateEarningsUI();
    
  } catch (error) {
    console.error('Error fetching user data:', error);
    // Show error message
    showErrorMessage('Could not load your data. Please try again later.');
  }
}

// Update rewards UI
function updateRewardsUI() {
  const rewardsCard = document.querySelector('.rewards-card');
  if (!rewardsCard) return;
  
  rewardsCard.innerHTML = `
    <div class="reward-info">
      <h2>Available Rewards</h2>
      <div class="reward-amount">${userData.availableRewards} ZKT</div>
      <div class="progress-container">
        <div class="progress-bar" style="width: ${userData.progressPercentage}%"></div>
      </div>
      <div style="font-size: 10px; color: var(--text-secondary); margin-top: 4px;">
        ${userData.pointsToNextLevel} ZKT until ${userData.level === 'Bronze' ? 'Silver' : userData.level === 'Silver' ? 'Gold' : 'Platinum'} Level
      </div>
    </div>
    <button class="action-button">Redeem</button>
  `;
  
  // Reattach event listener
  const redeemButton = rewardsCard.querySelector('.action-button');
  if (redeemButton) {
    redeemButton.addEventListener('click', function() {
      chrome.tabs.create({ url: chrome.runtime.getURL('index.html#/user-dashboard/rewards') });
    });
  }
}

// Update ads UI
function updateAdsUI() {
  const adsContent = document.getElementById('ads-content');
  if (!adsContent) return;
  
  if (userData.recentAds.length === 0) {
    adsContent.innerHTML = `
      <div class="empty-state">
        <div>No ads viewed yet</div>
      </div>
    `;
    return;
  }
  
  adsContent.innerHTML = userData.recentAds.map(ad => `
    <div class="ad-item">
      <div class="ad-header">
        <div class="ad-company">
          <div class="company-avatar">${ad.companyInitials}</div>
          <div class="company-name">${ad.company}</div>
        </div>
        <div class="ad-earnings">+${ad.earnings.toFixed(2)} ZKT</div>
      </div>
      <div class="ad-title">${ad.title}</div>
      <div class="ad-meta">
        <span class="ad-category">${ad.category}</span>
        <div class="ad-status ${ad.status === 'verified' ? 'status-verified' : ad.status === 'pending' ? 'status-pending' : 'status-failed'}">
          ${ad.status === 'verified' ? `
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 6L9 17l-5-5"></path>
            </svg>
            <span>Verified</span>
          ` : ad.status === 'pending' ? `
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>Pending</span>
          ` : `
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
            <span>Failed</span>
          `}
        </div>
      </div>
    </div>
  `).join('');
}

// Update earnings UI
function updateEarningsUI() {
  const earningsContent = document.getElementById('earnings-content');
  if (!earningsContent) return;
  
  if (userData.earnings.length === 0) {
    earningsContent.innerHTML = `
      <div class="empty-state">
        <div>No earnings yet</div>
      </div>
    `;
    return;
  }
  
  earningsContent.innerHTML = userData.earnings.map(earning => `
    <div class="earning-item">
      <div class="earning-header">
        <div class="company-name">${earning.type}</div>
        <div class="earning-amount">+${earning.amount.toFixed(2)} ZKT</div>
      </div>
      <div class="earning-meta">
        <div>${earning.description}</div>
        <div>${formatDate(earning.date)}</div>
      </div>
    </div>
  `).join('');
}

// Show error message
function showErrorMessage(message) {
  const container = document.querySelector('.container');
  if (!container) return;
  
  const errorBanner = document.createElement('div');
  errorBanner.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
  errorBanner.style.color = 'var(--error-color)';
  errorBanner.style.padding = '12px';
  errorBanner.style.borderRadius = '6px';
  errorBanner.style.margin = '12px';
  errorBanner.style.fontSize = '14px';
  errorBanner.style.display = 'flex';
  errorBanner.style.alignItems = 'center';
  errorBanner.style.justifyContent = 'space-between';
  
  errorBanner.innerHTML = `
    <div style="display: flex; align-items: center; gap: 8px;">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <span>${message}</span>
    </div>
    <button id="close-error" style="background: none; border: none; cursor: pointer; color: var(--error-color);">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  `;
  
  container.insertBefore(errorBanner, container.firstChild.nextSibling);
  
  const closeButton = document.getElementById('close-error');
  if (closeButton) {
    closeButton.addEventListener('click', function() {
      errorBanner.remove();
    });
  }
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (errorBanner.parentNode) {
      errorBanner.remove();
    }
  }, 5000);
}

// Format date helper
function formatDate(date) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'UPDATE_DATA') {
    fetchUserData();
  }
});

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    updateConnectionStatus,
    fetchUserData,
    formatDate
  };
} 