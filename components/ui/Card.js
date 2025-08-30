/**
 * Card Component
 * Flexible card component for displaying content
 * @param {Object} config - Component configuration
 * @param {string} config.title - Card title
 * @param {string} config.content - Card content/description
 * @param {string} config.image - Card image URL
 * @param {string} config.link - Card link URL
 * @param {string} config.variant - 'default' | 'featured' | 'compact'
 * @param {Array} config.tags - Array of tag strings
 * @param {Object} config.cta - Call-to-action configuration
 */

class Card {
  constructor(container, config = {}) {
    this.container = container;
    this.config = {
      title: 'Card Title',
      content: 'This is the card content that describes what this card is about.',
      image: '',
      link: '#',
      variant: 'default',
      tags: [],
      icon: '',
      titleIcon: '',
      cta: {
        text: 'Learn More',
        link: '#'
      },
      ...config
    };

    this.render();
    this.attachEvents();
  }

  render() {
    const variantClasses = {
      default: 'bg-white shadow-md hover:shadow-lg',
      featured: 'bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg hover:shadow-xl border-2 border-blue-200',
      compact: 'bg-white shadow-sm hover:shadow-md'
    };

    const cardClasses = `card group relative overflow-hidden rounded-xl transition-all duration-300 transform hover:-translate-y-1 ${variantClasses[this.config.variant]}`;

    this.container.innerHTML = `
      <div class="${cardClasses}">
        <!-- Image -->
        ${this.config.image ? `
          <div class="aspect-video overflow-hidden">
            <img src="${this.config.image}"
                 alt="${this.config.title}"
                 class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105">
          </div>
        ` : ''}

        <!-- Content -->
        <div class="p-6">
          <!-- Icon (if provided) -->
          ${this.config.icon ? `
            <div class="mb-4">
              <i class="${this.config.icon} feature-icon"></i>
            </div>
          ` : ''}

          <!-- Tags -->
          ${this.config.tags.length > 0 ? `
            <div class="flex flex-wrap gap-2 mb-4">
              ${this.config.tags.map(tag => `
                <span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                  ${tag}
                </span>
              `).join('')}
            </div>
          ` : ''}

          <!-- Title -->
          <h3 class="text-xl font-bold text-gray-900 mb-3 leading-tight">
            ${this.config.titleIcon ? `<i class="${this.config.titleIcon.replace('far', 'fal')} mr-2"></i>` : ''}
            ${this.config.title}
          </h3>

          <!-- Content -->
          <p class="text-gray-600 mb-4 leading-relaxed">
            ${this.config.content}
          </p>

          <!-- CTA -->
          ${this.config.cta ? `
            <a href="${this.config.cta.link || this.config.link}"
               class="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors group">
              ${this.config.cta.text}
              <svg class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          ` : ''}
        </div>

        <!-- Hover overlay for featured cards -->
        ${this.config.variant === 'featured' ? `
          <div class="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/5 group-hover:to-purple-600/5 transition-all duration-300 pointer-events-none"></div>
        ` : ''}

        <!-- Click overlay -->
        <a href="${this.config.link}"
           class="absolute inset-0 ${this.config.link !== '#' ? 'cursor-pointer' : ''}"
           aria-label="Read more about ${this.config.title}">
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

    // Add intersection observer for animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(this.container);

    // Add loading state for images
    const image = this.container.querySelector('img');
    if (image) {
      image.addEventListener('load', () => {
        image.classList.add('loaded');
      });

      image.addEventListener('error', () => {
        console.warn(`Failed to load image: ${this.config.image}`);
        // Could add fallback image here
      });
    }
  }
}

// Register component
if (window.ComponentSystem) {
  window.ComponentSystem.registerComponent('card', Card);
}

export default Card;
