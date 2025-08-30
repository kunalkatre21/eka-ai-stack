/**
 * Component Library
 * Main component library file that imports and registers all components
 * Based on the component-based architecture from project working doc
 */

// Import core system
import ComponentSystem from './core/ComponentSystem.js';

// Import UI components
import Navigation from './ui/Navigation.js';
import HeroSection from './ui/HeroSection.js';
import Card from './ui/Card.js';

// Make ComponentSystem globally available
window.ComponentSystem = ComponentSystem;

// Component Library Object (for external use)
window.TailwindComponents = {
  // Navigation components
  navigation: (config) => {
    return `<div data-component="navigation" data-config='${JSON.stringify(config)}'></div>`;
  },

  // Hero section components
  'hero-section': (config) => {
    return `<div data-component="hero-section" data-config='${JSON.stringify(config)}'></div>`;
  },

  // Content components
  card: (config) => {
    return `<div data-component="card" data-config='${JSON.stringify(config)}'></div>`;
  },

  // Grid layouts
  'card-grid': (config) => {
    const { columns = 3, cards = [] } = config;
    const gridCols = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
    };

    return `
      <div class="grid ${gridCols[columns] || gridCols[3]} gap-6">
        ${cards.map(cardConfig => window.TailwindComponents.card(cardConfig)).join('')}
      </div>
    `;
  },

  // Feature sections
  'features-section': (config) => {
    const { title = 'Features', features = [] } = config;

    return `
      <section class="py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">${title}</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${features.map(feature => `
              <div class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">${feature.title}</h3>
                <p class="text-gray-600">${feature.description}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }
};

// Initialize components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Initialize component system
  if (window.ComponentSystem) {
    window.ComponentSystem.init();
  }

  // Auto-initialize any components that were added after initial load
  setTimeout(() => {
    if (window.ComponentSystem) {
      window.ComponentSystem.initializeComponents();
    }
  }, 100);
});

// Export for module use
export { Navigation, HeroSection, Card };
export default window.TailwindComponents;
