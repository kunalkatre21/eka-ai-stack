/**
 * Font Awesome Pro Loader
 * Safely loads Font Awesome Pro kit with configuration
 * Handles missing config gracefully
 */

(function(window, document) {
  'use strict';

  // Default configuration
  const defaultConfig = {
    kitId: null,
    version: '6.4.0',
    autoAddCss: true,
    autoA11y: {
      mode: 'strict'
    },
    icons: {}
  };

  // Load configuration
  function loadConfig() {
    // Try to get config from global scope
    if (window.FontAwesomeConfig) {
      return { ...defaultConfig, ...window.FontAwesomeConfig };
    }

    // Try to load from config.js if it exists
    try {
      // This will only work if config.js is loaded before this script
      if (window.FontAwesomeConfig) {
        return { ...defaultConfig, ...window.FontAwesomeConfig };
      }
    } catch (e) {
      console.warn('Font Awesome config not found. Using default configuration.');
    }

    return defaultConfig;
  }

  // Load Font Awesome Kit
  function loadFontAwesomeKit(config) {
    if (!config.kitId || config.kitId === 'YOUR_FONTAWESOME_KIT_ID_HERE') {
      console.warn('Font Awesome Pro Kit ID not configured. Please set your Kit ID in config.js');
      console.info('To get a Kit ID: https://fontawesome.com/kits');

      // Load free version as fallback
      loadFreeVersion();
      return;
    }

    // Create script element for Font Awesome Pro Kit
    const script = document.createElement('script');
    script.src = `https://kit.fontawesome.com/${config.kitId}.js`;
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-auto-add-css', config.autoAddCss);
    script.setAttribute('data-auto-a11y', JSON.stringify(config.autoA11y));

    // Add version if specified
    if (config.version) {
      script.setAttribute('data-version', config.version);
    }

    // Handle script loading
    script.onload = function() {
      console.log('✅ Font Awesome Pro loaded successfully');

      // Configure FA after loading
      if (window.FontAwesome) {
        configureFontAwesome(window.FontAwesome, config);
      }
    };

    script.onerror = function() {
      console.error('❌ Failed to load Font Awesome Pro Kit');
      console.info('Falling back to free version...');
      loadFreeVersion();
    };

    // Append to head
    document.head.appendChild(script);
  }

  // Load free version as fallback
  function loadFreeVersion() {
    console.log('📦 Loading Font Awesome Free as fallback');

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    link.integrity = 'sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==';
    link.crossOrigin = 'anonymous';

    document.head.appendChild(link);
  }

  // Configure Font Awesome after loading
  function configureFontAwesome(FA, config) {
    // Set up custom configuration
    if (config.icons && config.icons.preload) {
      // Preload specific icons if needed
      console.log('Preloading icons:', config.icons.preload);
    }

    // Add any custom configurations
    if (FA && FA.config) {
      FA.config.autoAddCss = config.autoAddCss;
      FA.config.autoA11y = config.autoA11y;
    }
  }

  // Initialize
  function init() {
    const config = loadConfig();

    // Check if Font Awesome is already loaded
    if (window.FontAwesome) {
      console.log('Font Awesome already loaded');
      configureFontAwesome(window.FontAwesome, config);
      return;
    }

    // Load Font Awesome
    loadFontAwesomeKit(config);
  }

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export for manual initialization
  window.FontAwesomeLoader = {
    init: init,
    loadConfig: loadConfig
  };

})(window, document);
