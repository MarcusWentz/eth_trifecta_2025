// Initialize extension settings when installed
chrome.runtime.onInstalled.addListener(function() {
  // Set default settings
  chrome.storage.local.set({
    adSettings: {
      enabled: true,
      youtube: true,
      website: true
    }
  });
});

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'getAds') {
    // In a real implementation, this would fetch ads from your backend
    // For now, we'll return sample data
    sendResponse({
      success: true,
      ads: [
        {
          title: 'Offer only for you',
          description: 'Check out our amazing deals!',
          imageUrl: 'https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iozx2qNpenIg/v1/-1x-1.webp',
          link: 'https://www.bloomberg.com/news/articles/2022-03-19/nft-bored-ape-yacht-club-s-apecoin-benefits-backers-like-andreessen-horowtz'
        }
      ]
    });
  }
}); 