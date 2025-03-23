// Ad placement configurations
const adConfigs = {
  website: {
    sidebar: {
      position: 'right',
      margin: '20px'
    },
    inContent: {
      frequency: 3 // Show ad every 3 paragraphs
    }
  },
  youtube: {
    sidebar: {
      selector: '#secondary',
      position: 'top'
    },
    video: {
      frequency: 300, // Show video ad every 300 seconds (5 minutes)
      duration: 15,   // Ad duration in seconds
      skipAfter: 5    // Allow skip after 5 seconds
    }
  }
};

// Sample ad data (in production, this would come from your backend)
const sampleAds = [
  // {
  //   title: 'Premium NFT Collection',
  //   description: 'Exclusive digital art collection with proof of ownership',
  //   longDescription: 'Join the future of digital art ownership. Each piece comes with verifiable authenticity through blockchain technology.',
  //   imageUrl: 'https://via.placeholder.com/300x250',
  //   link: 'https://example.com/nft-collection',
  //   videoUrl: 'https://www.example.com/sample-ad.mp4',
  //   cta: 'Explore Collection',
  //   tags: ['NFT', 'Digital Art', 'Blockchain']
  // },
  // {
  //   title: 'DeFi Yield Farming',
  //   description: 'Earn high yields on your crypto assets',
  //   longDescription: 'Start earning passive income with our secure DeFi protocols. Industry-leading APY with real-time rewards tracking.',
  //   imageUrl: 'https://via.placeholder.com/300x250',
  //   link: 'https://example.com/defi-yield',
  //   videoUrl: 'https://www.example.com/defi-ad.mp4',
  //   cta: 'Start Earning',
  //   tags: ['DeFi', 'Yield', 'Crypto']
  // },
  {
    title: 'Immutable Gaming',
    description: 'Play-to-earn gaming revolution',
    longDescription: 'Experience the next generation of gaming where every achievement has real value. Join thousands of players earning while playing.',
    imageUrl: 'https://mma.prnewswire.com/media/1916004/Immutable_Logo.jpg',
    link: 'https://www.immutable.com/',
    videoUrl: 'https://www.youtube.com/watch?v=rB8kiqlvXv8',
    cta: 'Play Now',
    tags: ['Gaming', 'P2E', 'Web3']
  }
];

// Get random ad from the pool
function getRandomAd() {
  const index = Math.floor(Math.random() * sampleAds.length);
  return sampleAds[index];
}

// Create ad element
function createAdElement(ad) {
  const adContainer = document.createElement('div');
  adContainer.className = 'sovereign-ads-container';
  
  // Add close button
  const closeButton = document.createElement('button');
  closeButton.className = 'sovereign-close-button';
  closeButton.setAttribute('aria-label', 'Close advertisement');
  
  // Stop event propagation on close button
  closeButton.addEventListener('click', (e) => {
    e.stopPropagation();
    adContainer.style.opacity = '0';
    adContainer.style.transform = 'scale(0.95)';
    setTimeout(() => {
      adContainer.remove();
    }, 200);
  });

  // Create branding element
  const branding = document.createElement('a');
  branding.className = 'sovereign-branding';
  branding.href = 'https://sovereignads.com';
  branding.target = '_blank';
  branding.innerHTML = `
    <span class="sovereign-branding-icon">⚡</span>
    <span>Powered by Sovereign Ads</span>
  `;
  branding.onclick = (e) => e.stopPropagation(); // Prevent ad click when clicking branding

  adContainer.innerHTML = `
    <div class="sovereign-ad-content">
      <div class="sovereign-ad-badge">
        <span class="sovereign-badge-text">Ad</span>
      </div>
      <img src="${ad.imageUrl}" style="width: 100%; border-radius: 8px; margin-bottom: 16px;">
      <h3 class="sovereign-ad-title">${ad.title}</h3>
      <p class="sovereign-ad-description">${ad.description}</p>
      <div class="sovereign-tags-container">${ad.tags.map(tag => 
        `<span class="sovereign-tag">${tag}</span>`).join('')}
      </div>
      <button class="sovereign-cta-button">${ad.cta}</button>
    </div>
  `;

  // Insert close button and branding
  adContainer.insertBefore(closeButton, adContainer.firstChild);
  adContainer.querySelector('.sovereign-ad-content').appendChild(branding);

  // Add click event for the ad (excluding close button and branding clicks)
  adContainer.addEventListener('click', (e) => {
    if (!e.target.closest('.sovereign-close-button') && !e.target.closest('.sovereign-branding')) {
      window.open(ad.link, '_blank');
    }
  });

  return adContainer;
}

// Create video ad overlay with close button
function createVideoAdOverlay(ad, onSkip) {
  const overlay = document.createElement('div');
  overlay.className = 'sovereign-video-overlay';

  const closeButton = document.createElement('button');
  closeButton.className = 'sovereign-close-button';
  closeButton.style.top = '16px';
  closeButton.style.right = '16px';
  closeButton.style.opacity = '1';
  closeButton.style.transform = 'scale(1)';
  closeButton.setAttribute('aria-label', 'Close advertisement');

  closeButton.addEventListener('click', (e) => {
    e.stopPropagation();
    onSkip();
  });

  // Create branding element
  const branding = document.createElement('a');
  branding.className = 'sovereign-branding';
  branding.href = 'https://sovereignads.com';
  branding.target = '_blank';
  branding.innerHTML = `
    <span class="sovereign-branding-icon">⚡</span>
    <span>Powered by Sovereign Ads</span>
  `;

  const adContent = document.createElement('div');
  adContent.className = 'sovereign-video-content';
  
  const skipButton = document.createElement('button');
  skipButton.className = 'sovereign-skip-button';
  skipButton.textContent = 'Skip Ad in 5...';

  const tags = ad.tags.map(tag => `<span class="sovereign-tag">${tag}</span>`).join('');

  adContent.innerHTML = `
    <div class="sovereign-video-header">
      <div class="sovereign-brand">
        <span class="sovereign-logo">⚡</span>
        <span class="sovereign-brand-text">Ad</span>
      </div>
      <div class="sovereign-timer">${adConfigs.youtube.video.duration}s</div>
    </div>
    <div class="sovereign-video-main">
      <h2>${ad.title}</h2>
      <p class="sovereign-description">${ad.longDescription}</p>
      <div class="sovereign-tags-container">${tags}</div>
      <a href="${ad.link}" target="_blank" class="sovereign-learn-more">
        <span>${ad.cta}</span>
        <svg class="sovereign-arrow" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </a>
    </div>
  `;

  overlay.appendChild(closeButton);
  overlay.appendChild(adContent);
  overlay.appendChild(skipButton);
  overlay.appendChild(branding);

  let skipTimer = adConfigs.youtube.video.skipAfter;
  const countdownInterval = setInterval(() => {
    skipTimer--;
    if (skipTimer <= 0) {
      skipButton.textContent = 'Skip Ad';
      skipButton.classList.add('sovereign-skip-active');
      skipButton.onclick = () => {
        clearInterval(countdownInterval);
        onSkip();
      };
    } else {
      skipButton.textContent = `Skip Ad in ${skipTimer}...`;
    }
  }, 1000);

  return overlay;
}

// Handle YouTube video ads
function handleYouTubeVideoAds() {
  const video = document.querySelector('video');
  if (!video) return;

  let lastAdTime = 0;
  let adPlaying = false;

  video.addEventListener('timeupdate', () => {
    if (adPlaying) return;

    const currentTime = Math.floor(video.currentTime);
    const timeSinceLastAd = currentTime - lastAdTime;

    if (timeSinceLastAd >= adConfigs.youtube.video.frequency) {
      adPlaying = true;
      lastAdTime = currentTime;
      
      // Store video state
      const wasPlaying = !video.paused;
      const currentTime = video.currentTime;
      
      // Pause the video
      video.pause();

      // Create and show ad overlay
      const ad = getRandomAd();
      const adOverlay = createVideoAdOverlay(ad, () => {
        // Remove ad overlay
        adOverlay.remove();
        adPlaying = false;

        // Restore video state
        video.currentTime = currentTime;
        if (wasPlaying) {
          video.play();
        }
      });

      // Add overlay to video container
      const videoContainer = video.closest('.html5-main-video');
      if (videoContainer) {
        videoContainer.parentElement.appendChild(adOverlay);
      }
    }
  });
}

// Insert ad into website
function insertWebsiteAd() {
  // Sidebar ad
  const sidebarAd = createAdElement(getRandomAd());
  sidebarAd.style.position = 'fixed';
  sidebarAd.style.right = adConfigs.website.sidebar.margin;
  sidebarAd.style.top = '100px';
  document.body.appendChild(sidebarAd);

  // In-content ads
  const paragraphs = document.querySelectorAll('p');
  for (let i = 0; i < paragraphs.length; i++) {
    if ((i + 1) % adConfigs.website.inContent.frequency === 0) {
      const inContentAd = createAdElement(getRandomAd());
      paragraphs[i].parentNode.insertBefore(inContentAd, paragraphs[i].nextSibling);
    }
  }
}

// Insert ad into YouTube
function insertYouTubeAd() {
  // Sidebar ad
  const sidebar = document.querySelector(adConfigs.youtube.sidebar.selector);
  if (sidebar) {
    const youtubeAd = createAdElement(getRandomAd());
    youtubeAd.dataset.platform = 'youtube';
    sidebar.insertBefore(youtubeAd, sidebar.firstChild);
  }

  // Initialize video ads
  handleYouTubeVideoAds();
}

// Initialize ads based on current settings
function initializeAds() {
  chrome.storage.local.get(['adSettings'], function(result) {
    const settings = result.adSettings || {
      enabled: true,
      youtube: true,
      website: true
    };

    if (!settings.enabled) return;

    const isYouTube = window.location.hostname.includes('youtube.com');
    
    if (isYouTube && settings.youtube) {
      // Wait for YouTube's dynamic content to load
      setTimeout(insertYouTubeAd, 2000);
    } else if (!isYouTube && settings.website) {
      insertWebsiteAd();
    }
  });
}

// Listen for settings updates
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'settingsUpdated') {
    // Remove existing ads
    document.querySelectorAll('.sovereign-ads-container, .sovereign-video-overlay').forEach(ad => ad.remove());
    
    // Reinitialize with new settings
    if (request.settings.enabled) {
      initializeAds();
    }
  }
});

// Initialize when page loads
initializeAds(); 