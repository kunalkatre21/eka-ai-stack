/**
 * Core Component System
 * Main component initialization and management system
 * Based on the component-based architecture from project working doc
 */

class ComponentSystem {
  constructor() {
    this.components = new Map();
    this.initialized = false;
    this.debugMode = false;
  }

  /**
   * Initialize the component system
   */
  init() {
    if (this.initialized) return;

    console.log('🚀 Initializing Component System...');

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
    } else {
      this.initializeComponents();
    }

    this.initialized = true;
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
        console.log(`🔧 Initializing component: ${componentType}`, config);
      }

      this.renderComponent(componentType, element, config);
    });

    // Initialize lazy-loaded components
    this.initLazyComponents();

    console.log(`✅ Component System initialized with ${componentElements.length} components`);
  }

  /**
   * Parse component configuration from JSON string
   */
  parseConfig(configString) {
    if (!configString) return {};

    try {
      return JSON.parse(configString);
    } catch (error) {
      console.warn('⚠️ Invalid component config:', configString, error);
      return {};
    }
  }

  /**
   * Render a component
   */
  renderComponent(type, container, config = {}) {
    const ComponentClass = this.components.get(type);

    if (!ComponentClass) {
      console.warn(`⚠️ Component "${type}" not found`);
      return;
    }

    try {
      const component = new ComponentClass(container, config);
      container._componentInstance = component;
    } catch (error) {
      console.error(`❌ Error rendering component "${type}":`, error);
    }
  }

  /**
   * Register a component class
   */
  registerComponent(name, ComponentClass) {
    this.components.set(name, ComponentClass);
    if (this.debugMode) {
      console.log(`📝 Registered component: ${name}`);
    }
  }

  /**
   * Initialize lazy-loaded components
   */
  initLazyComponents() {
    const lazyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const componentType = element.dataset.component;
          const config = this.parseConfig(element.dataset.config);

          this.renderComponent(componentType, element, config);
          lazyObserver.unobserve(element);
        }
      });
    }, {
      rootMargin: '50px',
      threshold: 0.1
    });

    document.querySelectorAll('[data-lazy-component]').forEach(el => {
      lazyObserver.observe(el);
    });
  }

  /**
   * Enable debug mode
   */
  enableDebug() {
    this.debugMode = true;
    console.log('🐛 Debug mode enabled');
  }

  /**
   * Get debugging information
   */
  getDebugInfo() {
    const activeComponents = Array.from(document.querySelectorAll('[data-component]'))
      .map(el => ({
        type: el.dataset.component,
        element: el,
        config: el.dataset.config,
        hasInstance: !!el._componentInstance
      }));

    return {
      totalComponents: activeComponents.length,
      registeredComponents: Array.from(this.components.keys()),
      activeComponents,
      initialized: this.initialized,
      debugMode: this.debugMode
    };
  }
}

// Global instance
window.ComponentSystem = new ComponentSystem();

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.ComponentSystem.init();
});

// Global debug helper
window.debugComponents = () => {
  console.table(window.ComponentSystem.getDebugInfo());
};

// Export for module use
export default ComponentSystem;
