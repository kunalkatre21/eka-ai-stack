/**
 * Webflow Integration Script
 * Handles component initialization and Webflow-specific interactions
 * Based on the Webflow integration patterns from project working doc
 */

class WebflowComponentManager {
  constructor() {
    this.initialized = false;
    this.components = new Map();
    this.debugMode = false;
  }

  /**
   * Initialize Webflow component integration
   */
  init() {
    if (this.initialized) return;

    console.log('🎨 Initializing Webflow Component Integration...');

    // Wait for Webflow to be ready
    this.waitForWebflow(() => {
      this.initializeComponents();
      this.setupWebflowInteractions();
      this.initialized = true;
      console.log('✅ Webflow Component Integration initialized');
    });
  }

  /**
   * Wait for Webflow to be fully loaded
   */
  waitForWebflow(callback) {
    if (window.Webflow && window.Webflow.ready) {
      callback();
      return;
    }

    const checkWebflow = () => {
      if (window.Webflow && window.Webflow.ready) {
        callback();
      } else {
        setTimeout(checkWebflow, 100);
      }
    };

    checkWebflow();
  }

  /**
   * Initialize all components on the page
   */
  initializeComponents() {
    const componentElements = document.querySelectorAll('[data-component]');

    componentElements.forEach(element => {
      const componentType = element.dataset.component;
      const config = this.parseConfig(element.dataset.config);

      if (this.debugMode) {
        console.log(`🔧 Initializing Webflow component: ${componentType}`, config);
      }

      this.renderComponent(componentType, element, config);
    });

    // Handle dynamic content loading (CMS collections)
    this.handleCMSCollections();
  }

  /**
   * Parse component configuration
   */
  parseConfig(configString) {
    if (!configString) return {};

    try {
      // Handle Webflow's dynamic content syntax
      const processedConfig = configString.replace(/\{\{wf \{&quot;path&quot;:&quot;([^&]+)&quot;\}\}/g, (match, path) => {
        // In a real implementation, you'd fetch the actual CMS value
        return `"${path}_value"`; // Placeholder for demo
      });

      return JSON.parse(processedConfig);
    } catch (error) {
      console.warn('⚠️ Invalid Webflow component config:', configString, error);
      return {};
    }
  }

  /**
   * Render a component
   */
  renderComponent(type, container, config = {}) {
    const ComponentClass = this.components.get(type);

    if (!ComponentClass) {
      console.warn(`⚠️ Webflow component "${type}" not found`);
      return;
    }

    try {
      const component = new ComponentClass(container, config);
      container._webflowComponentInstance = component;
    } catch (error) {
      console.error(`❌ Error rendering Webflow component "${type}":`, error);
    }
  }

  /**
   * Handle Webflow CMS collections
   */
  handleCMSCollections() {
    // Handle dynamic CMS content
    const cmsItems = document.querySelectorAll('[data-cms-item]');

    cmsItems.forEach(item => {
      const cmsData = this.extractCMSData(item);
      if (cmsData.component) {
        this.renderComponent(cmsData.component, item, cmsData.config);
      }
    });
  }

  /**
   * Extract CMS data from Webflow elements
   */
  extractCMSData(element) {
    const cmsFields = element.querySelectorAll('[data-cms-field]');
    const data = {};

    cmsFields.forEach(field => {
      const fieldName = field.dataset.cmsField;
      const fieldType = field.dataset.cmsType || 'text';

      switch (fieldType) {
        case 'text':
          data[fieldName] = field.textContent || field.value;
          break;
        case 'image':
          data[fieldName] = field.src || field.querySelector('img')?.src;
          break;
        case 'link':
          data[fieldName] = field.href;
          break;
      }
    });

    return {
      component: element.dataset.cmsComponent,
      config: data
    };
  }

  /**
   * Setup Webflow-specific interactions
   */
  setupWebflowInteractions() {
    // Handle Webflow interactions
    this.setupWebflowInteractionsAPI();

    // Handle form submissions
    this.setupFormHandling();

    // Handle dynamic content loading
    this.setupDynamicLoading();
  }

  /**
   * Setup Webflow Interactions API integration
   */
  setupWebflowInteractionsAPI() {
    if (window.Webflow && window.Webflow.require) {
      try {
        const ix = window.Webflow.require('ix');
        if (ix) {
          // Custom interactions for components
          this.setupComponentInteractions(ix);
        }
      } catch (error) {
        console.warn('Webflow Interactions API not available:', error);
      }
    }
  }

  /**
   * Setup component-specific interactions
   */
  setupComponentInteractions(ix) {
    // Example: Add interactions to navigation component
    const navElements = document.querySelectorAll('[data-component="navigation"]');
    navElements.forEach(nav => {
      // Add hover effects, mobile menu interactions, etc.
      this.addNavigationInteractions(nav, ix);
    });
  }

  /**
   * Add navigation-specific interactions
   */
  addNavigationInteractions(navElement, ix) {
    const mobileMenuBtn = navElement.querySelector('.mobile-menu-btn');
    const mobileMenu = navElement.querySelector('.mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.contains('open');

        if (isOpen) {
          // Close menu with Webflow interaction
          ix.run({
            id: 'mobile-menu-close',
            targets: [mobileMenu]
          });
        } else {
          // Open menu with Webflow interaction
          ix.run({
            id: 'mobile-menu-open',
            targets: [mobileMenu]
          });
        }
      });
    }
  }

  /**
   * Setup form handling for Webflow forms
   */
  setupFormHandling() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        // Add custom validation or processing
        this.handleFormSubmission(e, form);
      });
    });
  }

  /**
   * Handle form submission
   */
  handleFormSubmission(event, form) {
    // Custom form validation
    const isValid = this.validateForm(form);

    if (!isValid) {
      event.preventDefault();
      return;
    }

    // Add loading state
    this.setFormLoading(form, true);

    // Track form submission
    if (window.gtag) {
      window.gtag('event', 'form_submit', {
        event_category: 'engagement',
        event_label: form.dataset.formName || 'contact_form'
      });
    }
  }

  /**
   * Validate form fields
   */
  validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        this.showFieldError(field, 'This field is required');
        isValid = false;
      } else {
        this.clearFieldError(field);
      }
    });

    return isValid;
  }

  /**
   * Show field validation error
   */
  showFieldError(field, message) {
    field.classList.add('error');
    let errorElement = field.parentNode.querySelector('.field-error');

    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'field-error text-red-600 text-sm mt-1';
      field.parentNode.appendChild(errorElement);
    }

    errorElement.textContent = message;
  }

  /**
   * Clear field validation error
   */
  clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
      errorElement.remove();
    }
  }

  /**
   * Set form loading state
   */
  setFormLoading(form, loading) {
    const submitBtn = form.querySelector('input[type="submit"], button[type="submit"]');

    if (submitBtn) {
      if (loading) {
        submitBtn.disabled = true;
        submitBtn.dataset.originalText = submitBtn.value || submitBtn.textContent;
        submitBtn.value = submitBtn.textContent = 'Sending...';
      } else {
        submitBtn.disabled = false;
        if (submitBtn.dataset.originalText) {
          submitBtn.value = submitBtn.textContent = submitBtn.dataset.originalText;
        }
      }
    }
  }

  /**
   * Setup dynamic content loading
   */
  setupDynamicLoading() {
    // Handle infinite scroll or load more functionality
    const loadMoreButtons = document.querySelectorAll('[data-load-more]');

    loadMoreButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.loadMoreContent(button);
      });
    });
  }

  /**
   * Load more content dynamically
   */
  async loadMoreContent(button) {
    const container = document.querySelector(button.dataset.target);
    const endpoint = button.dataset.endpoint;
    const currentPage = parseInt(button.dataset.page || '1');

    if (!container || !endpoint) return;

    try {
      button.disabled = true;
      button.textContent = 'Loading...';

      const response = await fetch(`${endpoint}?page=${currentPage + 1}`);
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        data.items.forEach(item => {
          const itemElement = this.createContentItem(item);
          container.appendChild(itemElement);
        });

        button.dataset.page = currentPage + 1;

        // Hide button if no more items
        if (!data.hasMore) {
          button.style.display = 'none';
        }
      }
    } catch (error) {
      console.error('Error loading more content:', error);
    } finally {
      button.disabled = false;
      button.textContent = 'Load More';
    }
  }

  /**
   * Create content item element
   */
  createContentItem(item) {
    const element = document.createElement('div');
    element.innerHTML = `
      <div data-component="card" data-config='${JSON.stringify(item)}'></div>
    `;

    // Initialize the component
    const componentElement = element.querySelector('[data-component]');
    if (componentElement) {
      this.renderComponent('card', componentElement, item);
    }

    return element;
  }

  /**
   * Register a component
   */
  registerComponent(name, ComponentClass) {
    this.components.set(name, ComponentClass);
    if (this.debugMode) {
      console.log(`📝 Registered Webflow component: ${name}`);
    }
  }

  /**
   * Enable debug mode
   */
  enableDebug() {
    this.debugMode = true;
    console.log('🐛 Webflow debug mode enabled');
  }

  /**
   * Get debug information
   */
  getDebugInfo() {
    return {
      initialized: this.initialized,
      registeredComponents: Array.from(this.components.keys()),
      activeComponents: Array.from(document.querySelectorAll('[data-component]')).length,
      webflowReady: !!(window.Webflow && window.Webflow.ready),
      debugMode: this.debugMode
    };
  }
}

// Global instance
window.WebflowComponentManager = new WebflowComponentManager();

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.WebflowComponentManager.init();
});

// Global debug helper for Webflow
window.debugWebflow = () => {
  console.table(window.WebflowComponentManager.getDebugInfo());
};
