/**
 * Hero Section Component
 * Eye-catching hero section with call-to-action
 * @param {Object} config - Component configuration
 * @param {string} config.title - Main heading text
 * @param {string} config.subtitle - Subtitle text
 * @param {string} config.backgroundImage - Background image URL
 * @param {string} config.ctaText - Call-to-action button text
 * @param {string} config.ctaLink - Call-to-action button link
 * @param {string} config.variant - 'default' | 'centered' | 'left-aligned'
 */

class HeroSection {
  constructor(container, config = {}) {
    this.container = container;
    this.config = {
      title: 'Welcome to Our Platform',
      subtitle: 'Build amazing websites with our component-based system',
      backgroundImage: '',
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
    const variantClasses = {
      default: 'text-center',
      centered: 'text-center',
      'left-aligned': 'text-left'
    };

    const backgroundStyle = this.config.backgroundImage
      ? `background-image: url('${this.config.backgroundImage}'); background-size: cover; background-position: center;`
      : '';

    this.container.innerHTML = `
      <section class="hero-section relative py-20 lg:py-32 ${this.config.backgroundImage ? 'bg-gray-900 text-white' : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'}" style="${backgroundStyle}">
        ${this.config.backgroundImage ? '<div class="absolute inset-0 bg-black bg-opacity-50"></div>' : ''}

        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <!-- Content -->
            <div class="${variantClasses[this.config.variant]}">
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

              <div class="flex flex-col sm:flex-row gap-4 ${this.config.variant === 'left-aligned' ? 'justify-start' : 'justify-center'}">
                <a href="${this.config.ctaLink}" class="cta-button bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  ${this.config.ctaText}
                </a>

                <a href="#learn-more" class="secondary-button border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
                  Learn More
                </a>
              </div>

              <!-- Social proof or additional content -->
              <div class="mt-12 flex items-center justify-center lg:justify-start space-x-8 opacity-75">
                <div class="text-center">
                  <div class="text-2xl font-bold">500+</div>
                  <div class="text-sm">Components</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold">10k+</div>
                  <div class="text-sm">Developers</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold">99%</div>
                  <div class="text-sm">Uptime</div>
                </div>
              </div>
            </div>

            <!-- Visual Element (optional) -->
            <div class="hidden lg:block">
              <div class="relative">
                <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
                  <div class="aspect-square bg-white/20 rounded-xl flex items-center justify-center">
                    <div class="text-center">
                      <div class="mb-4">
                        <i class="${this.config.backgroundIcon} text-6xl float-element" style="--fa-primary-color: rgba(255, 255, 255, 0.8); --fa-secondary-color: rgba(255, 255, 255, 0.4);"></i>
                      </div>
                      <p class="text-white font-medium">Your Hero Content</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Scroll indicator -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg class="w-6 h-6 text-white opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>
    `;
  }

  attachEvents() {
    // Add click tracking or analytics if needed
    const ctaButton = this.container.querySelector('.cta-button');
    if (ctaButton) {
      ctaButton.addEventListener('click', () => {
        // Track conversion event
        if (window.gtag) {
          window.gtag('event', 'click', {
            event_category: 'engagement',
            event_label: 'hero_cta'
          });
        }
      });
    }

    // Smooth scroll for secondary button
    const secondaryButton = this.container.querySelector('.secondary-button');
    if (secondaryButton) {
      secondaryButton.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = secondaryButton.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    }

    // Add intersection observer for animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, { threshold: 0.1 });

    observer.observe(this.container);
  }
}

// Register component
if (window.ComponentSystem) {
  window.ComponentSystem.registerComponent('hero-section', HeroSection);
}

export default HeroSection;
