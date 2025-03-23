document.addEventListener('DOMContentLoaded', function() {
  // Load saved settings
  chrome.storage.local.get(['adSettings'], function(result) {
    const settings = result.adSettings || {
      enabled: true,
      youtube: true,
      website: true,
      videoAds: true,
      sidebarAds: true,
      inContentAds: true
    };
    
    document.getElementById('adToggle').checked = settings.enabled;
    document.getElementById('youtubeToggle').checked = settings.youtube;
    document.getElementById('websiteToggle').checked = settings.website;
    document.getElementById('videoAdsToggle').checked = settings.videoAds;
    document.getElementById('sidebarAdsToggle').checked = settings.sidebarAds;
    document.getElementById('inContentAdsToggle').checked = settings.inContentAds;
  });

  // Save settings when button is clicked
  document.getElementById('saveSettings').addEventListener('click', function() {
    const button = document.getElementById('saveSettings');
    const originalText = button.textContent;
    
    const settings = {
      enabled: document.getElementById('adToggle').checked,
      youtube: document.getElementById('youtubeToggle').checked,
      website: document.getElementById('websiteToggle').checked,
      videoAds: document.getElementById('videoAdsToggle').checked,
      sidebarAds: document.getElementById('sidebarAdsToggle').checked,
      inContentAds: document.getElementById('inContentAdsToggle').checked
    };

    chrome.storage.local.set({ adSettings: settings }, function() {
      // Notify content scripts about the settings change
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'settingsUpdated',
          settings: settings
        });
      });

      // Visual feedback
      button.textContent = 'Saved!';
      button.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
      
      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = 'linear-gradient(135deg, #FF3366 0%, #FF6B3D 100%)';
      }, 2000);
    });
  });

  // Add dependencies between toggles
  document.getElementById('adToggle').addEventListener('change', function(e) {
    const enabled = e.target.checked;
    const toggles = [
      'youtubeToggle',
      'websiteToggle',
      'videoAdsToggle',
      'sidebarAdsToggle',
      'inContentAdsToggle'
    ];

    toggles.forEach(id => {
      const toggle = document.getElementById(id);
      toggle.disabled = !enabled;
      if (!enabled) {
        toggle.checked = false;
      }
    });
  });

  // Add dependencies for platform toggles
  document.getElementById('youtubeToggle').addEventListener('change', function(e) {
    if (!e.target.checked) {
      document.getElementById('videoAdsToggle').checked = false;
    }
  });

  document.getElementById('websiteToggle').addEventListener('change', function(e) {
    if (!e.target.checked) {
      document.getElementById('sidebarAdsToggle').checked = false;
      document.getElementById('inContentAdsToggle').checked = false;
    }
  });
}); 