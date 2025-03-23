// Constants
const AD_SELECTORS = [
  '.Sovereign Ads-advertisement',
  '[data-Sovereign Ads="true"]',
  '.advertisement[data-provider="Sovereign Ads"]'
];

// Configuration
const config = {
  enabled: true,
  privacyLevel: 'high', // 'low', 'medium', 'high'
  trackingAllowed: true
};

// Initialize content script
(async function() {
  // Check if we're on a partner site
  if (isPartnerSite()) {
    // Load configuration from storage
    const storedConfig = await getStoredConfig();
    Object.assign(config, storedConfig);
    
    if (config.enabled) {
      // Initialize ad tracking
      initAdTracking();
      
      // Check for ads that are already on the page
      checkForAds();
      
      // Set up observer to detect dynamically added ads
      setupAdObserver();
    }
  }
  
  // Listen for messages from the extension
  chrome.runtime.onMessage.addListener(handleMessage);
})();

// Check if we're on a partner site
function isPartnerSite() {
  // List of partner domains
  const partnerDomains = [
    'example.com',
    'Sovereign Ads.org',
    'partner-site.com'
    // Add more partner domains here
  ];
  
  const currentDomain = window.location.hostname.replace('www.', '');
  
  // For demo purposes, we'll return true to show functionality
  // In a real implementation, you would check against actual partner sites
  return true; //partnerDomains.includes(currentDomain);
}

// Get stored configuration
async function getStoredConfig() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['Sovereign Ads_config'], (result) => {
      resolve(result.Sovereign Ads_config || {});
    });
  });
}

// Initialize ad tracking
function initAdTracking() {
  console.log('Sovereign Ads: Initialized ad tracking');
  
  // Add tracking for clicks on the entire document
  document.addEventListener('click', handleDocumentClick, { capture: true });
}

// Set up observer to detect dynamically added ads
function setupAdObserver() {
  const observer = new MutationObserver((mutations) => {
    let shouldCheck = false;
    
    for (const mutation of mutations) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        shouldCheck = true;
        break;
      }
    }
    
    if (shouldCheck) {
      checkForAds();
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Check for ads on the page
function checkForAds() {
  let foundAds = 0;
  
  // Check for ads using our selectors
  for (const selector of AD_SELECTORS) {
    const ads = document.querySelectorAll(selector);
    foundAds += ads.length;
    
    // Add tracking data to each ad
    ads.forEach((ad, index) => {
      if (!ad.hasAttribute('data-Sovereign Ads-tracked')) {
        setupAdElement(ad, index);
      }
    });
  }
  
  // Mock ad insertion for demo purposes
  // In a real extension, you wouldn't inject ads like this
  // This is just to demonstrate functionality
  if (foundAds === 0 && Math.random() > 0.7) {
    injectDemoAd();
  }
  
  return foundAds;
}

// Set up tracking for an ad element
function setupAdElement(adElement, index) {
  const adId = `zkad-${Date.now()}-${index}`;
  
  // Mark this ad as tracked
  adElement.setAttribute('data-Sovereign Ads-tracked', 'true');
  adElement.setAttribute('data-Sovereign Ads-id', adId);
  
  // Record an impression
  recordAdImpression(adId, adElement);
  
  // Add specific click tracking to this element
  adElement.addEventListener('click', (event) => {
    recordAdClick(adId, adElement, event);
  });
  
  // Add a visual indicator that this is a tracked ad
  // Only if we're in development mode
  if (isDevelopmentMode()) {
    addAdIndicator(adElement);
  }
}

// Record an ad impression
function recordAdImpression(adId, adElement) {
  if (!config.trackingAllowed) return;
  
  // Get ad metadata
  const metadata = extractAdMetadata(adElement);
  
  // Create an impression event
  const impressionEvent = {
    type: 'impression',
    adId: adId,
    timestamp: Date.now(),
    url: window.location.href,
    metadata: metadata,
    viewportVisible: isElementInViewport(adElement)
  };
  
  // Send impression event to background script
  chrome.runtime.sendMessage({
    action: 'RECORD_AD_EVENT',
    event: impressionEvent
  });
  
  // Set up intersection observer to track viewability
  trackAdViewability(adId, adElement);
}

// Record an ad click
function recordAdClick(adId, adElement, event) {
  if (!config.trackingAllowed) return;
  
  // Create a click event
  const clickEvent = {
    type: 'click',
    adId: adId,
    timestamp: Date.now(),
    url: window.location.href,
    metadata: extractAdMetadata(adElement),
    position: {
      x: event.clientX,
      y: event.clientY
    }
  };
  
  // Send click event to background script
  chrome.runtime.sendMessage({
    action: 'RECORD_AD_EVENT',
    event: clickEvent
  });
}

// Track ad viewability using Intersection Observer
function trackAdViewability(adId, adElement) {
  // Create a new IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // If the ad is visible
      if (entry.isIntersecting) {
        const viewableEvent = {
          type: 'viewable',
          adId: adId,
          timestamp: Date.now(),
          durationMs: 0, // Will be calculated in background
          visibleRatio: entry.intersectionRatio
        };
        
        // Send viewable event to background script
        chrome.runtime.sendMessage({
          action: 'RECORD_AD_EVENT',
          event: viewableEvent
        });
        
        // If it's been visible for at least 1 second, we'll count it as viewed
        // In a real implementation, you would track the actual time viewed
        setTimeout(() => {
          if (isElementInViewport(adElement)) {
            const viewedEvent = {
              type: 'viewed',
              adId: adId,
              timestamp: Date.now(),
              durationMs: 1000
            };
            
            // Send viewed event to background script
            chrome.runtime.sendMessage({
              action: 'RECORD_AD_EVENT',
              event: viewedEvent
            });
          }
        }, 1000);
      }
    });
  }, {
    threshold: [0, 0.5, 1.0] // Trigger at 0%, 50%, and 100% visibility
  });
  
  // Start observing the ad element
  observer.observe(adElement);
}

// Handle clicks on the document
function handleDocumentClick(event) {
  // If we're not tracking, exit early
  if (!config.trackingAllowed) return;
  
  // Check if the click is on or within an ad
  let adElement = null;
  let currentElement = event.target;
  
  // Traverse up the DOM tree to see if we clicked in an ad
  while (currentElement && currentElement !== document.body) {
    if (isAdElement(currentElement)) {
      adElement = currentElement;
      break;
    }
    currentElement = currentElement.parentElement;
  }
  
  // If we found an ad, and it's not already tracked, set it up
  if (adElement && !adElement.hasAttribute('data-Sovereign Ads-tracked')) {
    setupAdElement(adElement, 0);
  }
}

// Check if an element is an ad
function isAdElement(element) {
  for (const selector of AD_SELECTORS) {
    if (element.matches(selector)) {
      return true;
    }
  }
  return false;
}

// Extract metadata from an ad element
function extractAdMetadata(adElement) {
  const metadata = {
    advertiser: adElement.getAttribute('data-advertiser') || 'Unknown',
    campaign: adElement.getAttribute('data-campaign') || 'Unknown',
    category: adElement.getAttribute('data-category') || 'Unknown',
    format: adElement.getAttribute('data-format') || 'banner'
  };
  
  // Try to extract the ad creative URL
  const imgElement = adElement.querySelector('img');
  if (imgElement) {
    metadata.creativeUrl = imgElement.src;
  }
  
  // Try to extract the target URL
  const linkElement = adElement.querySelector('a');
  if (linkElement) {
    metadata.targetUrl = linkElement.href;
  }
  
  return metadata;
}

// Check if an element is in the viewport
function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Handle messages from the extension
function handleMessage(message, sender, sendResponse) {
  if (message.action === 'UPDATE_CONFIG') {
    // Update our configuration
    Object.assign(config, message.config);
    sendResponse({ success: true });
  } else if (message.action === 'CHECK_FOR_ADS') {
    // Check for ads and report back how many we found
    const count = checkForAds();
    sendResponse({ count: count });
  }
  
  return true; // Indicate we'll respond asynchronously
}

// Check if we're in development mode
function isDevelopmentMode() {
  return false; // Set to true during development to see debugging info
}

// Add a visual indicator to mark ads
function addAdIndicator(adElement) {
  const indicator = document.createElement('div');
  indicator.style.position = 'absolute';
  indicator.style.top = '0';
  indicator.style.right = '0';
  indicator.style.backgroundColor = 'rgba(99, 102, 241, 0.7)';
  indicator.style.color = 'white';
  indicator.style.padding = '2px 4px';
  indicator.style.fontSize = '10px';
  indicator.style.borderBottomLeftRadius = '4px';
  indicator.style.zIndex = '9999';
  indicator.textContent = 'Sovereign Ads';
  
  // Make sure the parent element has position relative/absolute
  const currentPosition = window.getComputedStyle(adElement).position;
  if (currentPosition === 'static') {
    adElement.style.position = 'relative';
  }
  
  adElement.appendChild(indicator);
}

// Inject a demo ad for testing purposes
function injectDemoAd() {
  if (Math.random() < 0.3 || document.querySelector('.Sovereign Ads-demo-ad')) {
    return; // Don't always inject ads, and never inject more than one
  }
  
  // Create a demo ad container
  const adContainer = document.createElement('div');
  adContainer.className = 'Sovereign Ads-advertisement Sovereign Ads-demo-ad';
  adContainer.setAttribute('data-advertiser', 'Sovereign Ads Demo');
  adContainer.setAttribute('data-campaign', 'Demo Campaign');
  adContainer.setAttribute('data-category', 'Crypto');
  adContainer.setAttribute('data-format', 'banner');
  
  // Set the styles
  adContainer.style.position = 'fixed';
  adContainer.style.bottom = '20px';
  adContainer.style.right = '20px';
  adContainer.style.width = '300px';
  adContainer.style.padding = '12px';
  adContainer.style.backgroundColor = '#1e293b';
  adContainer.style.borderRadius = '8px';
  adContainer.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
  adContainer.style.fontFamily = 'Arial, sans-serif';
  adContainer.style.zIndex = '9998';
  adContainer.style.border = '1px solid #334155';
  
  // Create the ad content
  adContainer.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="width: 24px; height: 24px; border-radius: 50%; background-color: rgba(99, 102, 241, 0.2); display: flex; align-items: center; justify-content: center; color: #6366f1; font-weight: bold;">Z</div>
        <div style="font-weight: bold; color: #f8fafc;">Sovereign Ads Demo</div>
      </div>
      <button id="Sovereign Ads-demo-close" style="background: none; border: none; color: #94a3b8; cursor: pointer; font-size: 18px; line-height: 1;">&times;</button>
    </div>
    <div style="color: #f8fafc; font-size: 14px; margin-bottom: 12px;">
      Experience privacy-first advertising with Sovereign Ads. Earn rewards while protecting your data.
    </div>
    <a href="https://Sovereign Ads.org" target="_blank" style="display: block; text-align: center; background-color: #6366f1; color: white; text-decoration: none; padding: 8px 16px; border-radius: 4px; font-weight: bold; font-size: 14px;">Learn More</a>
    <div style="text-align: right; margin-top: 8px; font-size: 10px; color: #94a3b8;">
      <span>Ad by Sovereign Ads</span>
    </div>
  `;
  
  // Add the ad to the page
  document.body.appendChild(adContainer);
  
  // Add a close button functionality
  const closeButton = document.getElementById('Sovereign Ads-demo-close');
  closeButton.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    adContainer.remove();
  });
}

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    isPartnerSite,
    checkForAds,
    isElementInViewport
  };
} 