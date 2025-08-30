/**
 * Standalone Component System
 * A non-module version that works without ES6 modules
 * Perfect for testing and development
 */

(function(window) {
  'use strict';

  // Component System Class
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

      console.log('🚀 Initializing Component System (Standalone)...');

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

  // Navigation Component
  class Navigation {
    constructor(container, config = {}) {
      this.container = container;
      this.config = {
        variant: 'default',
        items: [
          { label: 'Home', href: '#home', icon: 'fal fa-home' },
          { label: 'About', href: '#about', icon: 'fal fa-user' },
          { label: 'Services', href: '#services', icon: 'fal fa-cog' },
          { label: 'Contact', href: '#contact', icon: 'fal fa-envelope' }
        ],
        logo: '/logo.png',
        showCTA: true,
        logoIcon: 'fad fa-hexagon-vertical-nft',
        ...config
      };

      this.render();
      this.attachEvents();
    }

    render() {
      const variantClasses = {
        default: 'bg-white shadow-lg',
        transparent: 'bg-transparent',
        sticky: 'bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50'
      };

      this.container.innerHTML = `
        <nav class="${variantClasses[this.config.variant]} transition-all duration-300">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
              <!-- Logo -->
              <div class="flex-shrink-0">
                <a href="/" class="flex items-center">
                  ${this.config.logoIcon ? `<i class="${this.config.logoIcon} text-2xl mr-2" style="--fa-primary-color: var(--icon-primary); --fa-secondary-color: var(--icon-secondary);"></i>` : ''}
                  ${this.config.logo ? `<img src="${this.config.logo}" alt="Logo" class="h-8 w-auto">` : '<span class="text-xl font-bold text-gray-900">Logo</span>'}
                </a>
              </div>

              <!-- Desktop Navigation -->
              <div class="hidden md:block">
                <div class="ml-10 flex items-baseline space-x-4">
                  ${this.config.items.map(item => `
                    <a href="${item.href}" class="nav-link text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      ${item.icon ? `<i class="${item.icon}"></i>` : ''}
                      ${item.label}
                    </a>
                  `).join('')}
                </div>
              </div>

              <!-- CTA Button -->
              ${this.config.showCTA ? `
                <div class="hidden md:block">
                  <a href="#contact" class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    Get Started
                  </a>
                </div>
              ` : ''}

              <!-- Mobile menu button -->
              <div class="md:hidden">
                <button type="button" class="mobile-menu-btn bg-gray-200 inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500" aria-expanded="false">
                  <span class="sr-only">Open main menu</span>
                  <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Mobile Navigation Menu -->
          <div class="mobile-menu hidden md:hidden">
            <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              ${this.config.items.map(item => `
                <a href="${item.href}" class="nav-link text-gray-900 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
                  ${item.icon ? `<i class="${item.icon}"></i>` : ''}
                  ${item.label}
                </a>
              `).join('')}

              ${this.config.showCTA ? `
                <a href="#contact" class="bg-blue-600 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700">
                  Get Started
                </a>
              ` : ''}
            </div>
          </div>
        </nav>
      `;
    }

    attachEvents() {
      // Mobile menu toggle
      const mobileMenuBtn = this.container.querySelector('.mobile-menu-btn');
      const mobileMenu = this.container.querySelector('.mobile-menu');
      const menuIcon = mobileMenuBtn?.querySelector('.block');
      const closeIcon = mobileMenuBtn?.querySelector('.hidden');

      if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
          const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';

          mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
          mobileMenu.classList.toggle('hidden');

          if (menuIcon && closeIcon) {
            menuIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
          }
        });
      }

      // Close mobile menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!this.container.contains(e.target) && mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
          mobileMenuBtn?.setAttribute('aria-expanded', 'false');

          if (menuIcon && closeIcon) {
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
          }
        }
      });
    }
  }

  // Hero Section Component
  class HeroSection {
    constructor(container, config = {}) {
      this.container = container;
      this.config = {
        title: 'Welcome to Our Platform',
        subtitle: 'Build amazing websites with our component system',
        ctaText: 'Get Started',
        ctaLink: '#contact',
        variant: 'centered',
        badge: '',
        badgeIcon: 'fad fa-sparkles',
        backgroundIcon: 'fad fa-hexagon-vertical-nft',
        ...config
      };

      this.render();
      this.attachEvents();
    }

    render() {
      this.container.innerHTML = `
        <section class="hero-section relative py-20 lg:py-32 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            ${this.config.badge ? `
              <div class="hero-badge mb-6">
                <i class="${this.config.badgeIcon} badge-icon"></i>
                <span class="badge-text">${this.config.badge}</span>
                <div class="badge-glow"></div>
              </div>
            ` : ''}

            <h1 class="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              ${this.config.title}
            </h1>

              ${this.config.subtitle ? `
                <p class="text-xl lg:text-2xl mb-8 opacity-90 leading-relaxed">
                  ${this.config.subtitle}
                </p>
              ` : ''}

              <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="${this.config.ctaLink}" class="cta-button bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  ${this.config.ctaText}
                </a>
              </div>
            </div>
          </div>
        </section>
      `;
    }

    attachEvents() {
      // Add click tracking
      const ctaButton = this.container.querySelector('.cta-button');
      if (ctaButton) {
        ctaButton.addEventListener('click', () => {
          if (window.gtag) {
            window.gtag('event', 'click', {
              event_category: 'engagement',
              event_label: 'hero_cta'
            });
          }
        });
      }
    }
  }

  // Card Component
  class Card {
    constructor(container, config = {}) {
      this.container = container;
          this.config = {
      title: 'Card Title',
      content: 'This is the card content that describes what this card is about.',
      link: '#',
      variant: 'default',
      icon: '',
      titleIcon: '',
      ...config
    };

      this.render();
      this.attachEvents();
    }

    render() {
      const variantClasses = {
        default: 'bg-white shadow-md hover:shadow-lg',
        featured: 'bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg hover:shadow-xl border-2 border-blue-200'
      };

      this.container.innerHTML = `
        <div class="card group relative overflow-hidden rounded-xl transition-all duration-300 transform hover:-translate-y-1 ${variantClasses[this.config.variant]}">
          <div class="p-6">
            <!-- Icon (if provided) -->
            ${this.config.icon ? `
              <div class="mb-4">
                <i class="${this.config.icon} feature-icon"></i>
              </div>
            ` : ''}

            <h3 class="text-xl font-bold text-gray-900 mb-3 leading-tight">
              ${this.config.titleIcon ? `<i class="${this.config.titleIcon.replace('far', 'fal')} mr-2"></i>` : ''}
              ${this.config.title}
            </h3>

            <p class="text-gray-600 mb-4 leading-relaxed">
              ${this.config.content}
            </p>

            <a href="${this.config.link}" class="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors group">
              Learn More
              <svg class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>

          <!-- Click overlay -->
          <a href="${this.config.link}" class="absolute inset-0 ${this.config.link !== '#' ? 'cursor-pointer' : ''}" aria-label="Read more about ${this.config.title}">
          </a>
        </div>
      `;
    }

    attachEvents() {
      // Add click tracking
      const cardLink = this.container.querySelector('a[href]:not(.inline-flex)');
      if (cardLink && cardLink.getAttribute('href') !== '#') {
        cardLink.addEventListener('click', () => {
          if (window.gtag) {
            window.gtag('event', 'click', {
              event_category: 'engagement',
              event_label: 'card_click',
              value: this.config.title
            });
          }
        });
      }
    }
  }

  // Create global instance
  const componentSystem = new ComponentSystem();

  // Register components
  componentSystem.registerComponent('navigation', Navigation);
  componentSystem.registerComponent('hero-section', HeroSection);
  componentSystem.registerComponent('card', Card);

  // Make globally available
  window.ComponentSystem = componentSystem;
  window.Navigation = Navigation;
  window.HeroSection = HeroSection;
  window.Card = Card;

  // Component Library helper
  window.TailwindComponents = {
    navigation: (config) => `<div data-component="navigation" data-config='${JSON.stringify(config)}'></div>`,
    'hero-section': (config) => `<div data-component="hero-section" data-config='${JSON.stringify(config)}'></div>`,
    card: (config) => `<div data-component="card" data-config='${JSON.stringify(config)}'></div>`
  };

  // Global debug helper
  window.debugComponents = () => {
    console.table(window.ComponentSystem.getDebugInfo());
  };

  // Auto-initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.ComponentSystem.init();
    });
  } else {
    window.ComponentSystem.init();
  }

  console.log('🎉 Component System Standalone loaded successfully!');

})(window);
