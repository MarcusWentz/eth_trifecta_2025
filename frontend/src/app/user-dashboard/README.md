# Sovereign Ads Browser Extension

## Overview

The Sovereign Ads Browser Extension provides a seamless way to track your privacy-preserving ad interactions, earn rewards, and view your earnings history—all in a compact, visually appealing interface.

## Features

- **Real-time Reward Tracking**: View your accumulated ZKT tokens and progress toward higher reward levels
- **Ad History**: See which ads you've viewed and how much you've earned from each
- **Earnings Dashboard**: Track your total earnings, broken down by source (ad views, referrals, bonuses)
- **Privacy Controls**: Maintain full control over what data is shared
- **Wallet Integration**: Securely connect your Ethereum wallet to manage your rewards

## Installation

### Development Mode

1. Clone this repository
2. Navigate to `chrome://extensions/` in your Chrome browser
3. Enable "Developer mode" in the top-right corner
4. Click "Load unpacked" and select the `browser-extension` directory
5. The Sovereign Ads extension should now appear in your extensions toolbar

### Production Release

The extension will be available on the Chrome Web Store and other browser extension marketplaces soon.

## Usage

1. **Connect Your Wallet**: Click the Sovereign Ads icon in your browser toolbar and connect your Ethereum wallet
2. **Browse Normally**: As you encounter Sovereign Ads-powered advertisements, your rewards will accumulate automatically
3. **Check Your Rewards**: Open the extension popup to see your current rewards, history, and earnings
4. **Redeem**: When you've accumulated enough ZKT tokens, use the Redeem button to convert them to other assets

## Privacy

Sovereign Ads is built with privacy at its core:

- All ad interactions use zero-knowledge proofs to verify viewing without revealing personal data
- No personal browsing history is tracked or stored
- Your wallet address is the only identifier needed
- All data is encrypted and stored locally whenever possible

## Development

### Directory Structure

```
browser-extension/
  ├── manifest.json     # Extension configuration
  ├── popup.html        # Extension popup UI
  ├── popup.js          # Popup functionality
  ├── background.js     # Background processes
  ├── content.js        # Content script for interacting with web pages
  └── icons/            # Extension icons
```

### Building from Source

1. Install dependencies:
```
npm install
```

2. Build the extension:
```
npm run build
```

3. The built extension will be in the `dist` directory, ready to load as an unpacked extension.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For support or inquiries, please contact support@Sovereign Ads.org 