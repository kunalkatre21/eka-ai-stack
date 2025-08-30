/**
 * Font Awesome Pro Configuration
 * Copy this file to config.js and add your actual Kit ID
 *
 * IMPORTANT: Never commit config.js to version control
 */

window.FontAwesomeConfig = {
  // Your Font Awesome Pro Kit ID
  kitId: 'YOUR_FONTAWESOME_KIT_ID_HERE',

  // Additional configuration options
  version: '6.4.0',
  autoAddCss: true,
  autoA11y: {
    mode: 'strict'
  },

  // Custom icon configuration
  icons: {
    // You can preload specific icons here if needed
    // This reduces initial load time for critical icons
    // preload: ['rocket-launch', 'sparkles', 'hexagon-vertical-nft']
  }
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.FontAwesomeConfig;
}
