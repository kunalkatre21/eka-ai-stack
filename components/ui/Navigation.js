/**
 * Navigation Component
 * Responsive navigation with mobile menu support
 * @param {Object} config - Component configuration
 * @param {string} config.variant - 'default' | 'transparent' | 'sticky'
 * @param {Array} config.items - Navigation menu items
 * @param {string} config.logo - Logo URL
 * @param {boolean} config.showCTA - Show call-to-action button
 */

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

    // Smooth scrolling for anchor links
    this.container.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }

        // Close mobile menu after navigation
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
          mobileMenuBtn?.setAttribute('aria-expanded', 'false');

          if (menuIcon && closeIcon) {
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
          }
        }
      });
    });
  }
}

// Register component
if (window.ComponentSystem) {
  window.ComponentSystem.registerComponent('navigation', Navigation);
}

export default Navigation;
