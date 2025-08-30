# Enterprise Component System

A scalable, component-based architecture for building enterprise websites using Tailwind Plus and vanilla JavaScript, with seamless Webflow integration.

## Overview

This project implements the component-based approach described in the project working document, providing:

- **Component-Based Architecture**: Reusable components that can be edited once and updated everywhere
- **Tailwind Plus Integration**: Access to 500+ premium components and templates
- **Webflow Compatibility**: Seamless integration with Webflow's visual design tools
- **Enterprise-Ready**: Built for large-scale applications with performance and maintainability in mind
- **Vanilla JavaScript**: No complex frameworks, just pure web standards

## Font Awesome Pro Integration

### Secure Configuration Setup

#### 1. **Copy Configuration File**
```bash
# Copy the example configuration
cp config.example.js config.js
```

#### 2. **Add Your Kit ID**
Edit `config.js` and replace `YOUR_FONTAWESOME_KIT_ID_HERE` with your actual Font Awesome Pro Kit ID:

```javascript
window.FontAwesomeConfig = {
  kitId: 'your-actual-kit-id-here', // ← Replace this
  version: '6.4.0',
  autoAddCss: true
};
```

#### 3. **Security Features**
- ✅ `config.js` is automatically ignored by Git (added to `.gitignore`)
- ✅ Kit ID never exposed in public repositories
- ✅ Fallback to free version if not configured
- ✅ Local development only requires your personal setup

### Template Integration

The templates use the secure loader system:

```html
<!-- Font Awesome Pro Configuration -->
<script src="/config.js"></script>

<!-- Font Awesome Pro Loader -->
<script src="/assets/js/fontawesome-loader.js"></script>
```

### Benefits

- **🔒 Secure**: Kit ID never committed to version control
- **🔄 Automatic**: Falls back gracefully if not configured
- **⚡ Optimized**: Loads only what's needed
- **🎨 Professional**: 33,000+ Pro icons with duotone effects

### Quick Setup

```bash
# Run the interactive setup
npm run setup:fontawesome

# Or manually copy and edit
cp config.example.js config.js
# Then edit config.js with your Kit ID
```

📖 **Detailed Instructions**: See `FONTAWESOME-README.md`

## Quick Start

### 🚀 Try It Now!
Open `templates/test.html` in your browser to see the component system in action immediately!

### 1. Basic Setup

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Enterprise Site</title>

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Component System -->
    <script src="/components/ComponentLibrary.js" type="module"></script>
</head>
<body>
    <!-- Navigation -->
    <div data-component="navigation" data-config='{"variant":"sticky","showCTA":true}'></div>

    <!-- Hero Section -->
    <div data-component="hero-section" data-config='{"title":"Welcome","ctaText":"Get Started"}'></div>

    <!-- Content -->
    <div data-component="card" data-config='{"title":"Example Card","content":"Card content"}'></div>
</body>
</html>
```

### 2. Alternative: Standalone Version (No Server Required)

If you encounter issues with ES modules, use the standalone version:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Enterprise Site</title>

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Custom CSS -->
    <link rel="stylesheet" href="../assets/css/custom.css">

    <!-- Component System (Standalone - No ES modules needed) -->
    <script src="../components/ComponentSystem-standalone.js"></script>
</head>
<body>
    <!-- Navigation -->
    <div data-component="navigation" data-config='{"variant":"sticky"}'></div>

    <!-- Hero Section -->
    <div data-component="hero-section" data-config='{"title":"Welcome"}'></div>

    <!-- Content -->
    <div data-component="card" data-config='{"title":"Example","content":"Content"}'></div>
</body>
</html>
```

### 3. Component Configuration

Components are configured using JSON in the `data-config` attribute:

```html
<div data-component="navigation" data-config='{
    "variant": "transparent",
    "items": [
        {"label": "Home", "href": "#home"},
        {"label": "About", "href": "#about"}
    ],
    "showCTA": true
}'></div>
```

## Troubleshooting

### "ComponentSystem is not defined" Error

If you get this error in the browser console, try these solutions:

#### Solution 1: Use the Test Page
Open `templates/test.html` in your browser - it uses the standalone version and works immediately without any setup.

#### Solution 2: Use the Standalone Version
Replace the ES module script with the standalone version:
```html
<!-- Instead of this: -->
<script src="../components/ComponentLibrary.js" type="module"></script>

<!-- Use this: -->
<script src="../components/ComponentSystem-standalone.js"></script>
```

#### Solution 3: Start a Local Server
For ES modules to work properly, you need a local server:
```bash
# Python (recommended)
python -m http.server 8000

# Node.js alternative
npx live-server --port=3000

# Then open: http://localhost:8000/templates/test.html
```

### Debug Commands

```javascript
// Enable debug mode
ComponentSystem.enableDebug()

// Show component information
debugComponents()

// Get detailed debug info
ComponentSystem.getDebugInfo()

// Show as table
console.table(ComponentSystem.getDebugInfo())
```

## Core Components

### Navigation Component

Responsive navigation with mobile menu support.

```html
<div data-component="navigation" data-config='{
    "variant": "default", // "default" | "transparent" | "sticky"
    "items": [
        {"label": "Home", "href": "#home"},
        {"label": "About", "href": "#about"}
    ],
    "logo": "/logo.png",
    "showCTA": true
}'></div>
```

### Hero Section Component

Eye-catching hero section with call-to-action.

```html
<div data-component="hero-section" data-config='{
    "title": "Welcome to Our Platform",
    "subtitle": "Build amazing websites with our component system",
    "backgroundImage": "/hero-bg.jpg",
    "ctaText": "Get Started",
    "ctaLink": "#contact",
    "variant": "centered" // "default" | "centered" | "left-aligned"
}'></div>
```

### Card Component

Flexible card component for displaying content.

```html
<div data-component="card" data-config='{
    "title": "Card Title",
    "content": "Card content description",
    "image": "/card-image.jpg",
    "link": "#",
    "variant": "default", // "default" | "featured" | "compact"
    "tags": ["tag1", "tag2"],
    "cta": {
        "text": "Learn More",
        "link": "#"
    }
}'></div>
```

## Webflow Integration

### Designer-Developer Workflow

1. **Designers** create layouts in Webflow and place HTML embed elements as placeholders
2. **Developers** implement components that fit the designated spaces
3. **Content teams** use Webflow CMS, components pull dynamic content

### Webflow Setup

#### 1. Project Settings > Custom Code (Head)

```html
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://your-domain.com/components/ComponentLibrary.js" type="module"></script>
```

#### 2. Project Settings > Custom Code (Before </body>)

```html
<script>
document.addEventListener('DOMContentLoaded', function() {
  // Components auto-initialize
  if (window.ComponentSystem) {
    window.ComponentSystem.init();
  }
});
</script>
```

#### 3. Using Components in Webflow

Place HTML embed elements where you want components:
{% raw %}
```html
<!-- Navigation -->
<div data-component="navigation" data-config='{"variant":"sticky"}'></div>

<!-- Hero with CMS content -->
<div data-component="hero-section" data-config='{
    "title": "{{wf {&quot;path&quot;:&quot;hero_title&quot;} }}",
    "subtitle": "{{wf {&quot;path&quot;:&quot;hero_subtitle&quot;} }}"
}'></div>
```
{% endraw %}

### CMS Integration

Components automatically work with Webflow CMS collections:
{% raw %}
```html
<!-- In Collection Template -->
<div data-component="card" data-config='{
    "title": "{{wf {&quot;path&quot;:&quot;name&quot;} }}",
    "content": "{{wf {&quot;path&quot;:&quot;description&quot;} }}",
    "image": "{{wf {&quot;path&quot;:&quot;featured_image&quot;,&quot;type&quot;:&quot;Image&quot;} }}"
}'></div>
```
{% endraw %}


## Advanced Features

### Component Registration

Register custom components:

```javascript
// components/CustomComponent.js
class CustomComponent {
  constructor(container, config = {}) {
    this.container = container;
    this.config = config;
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="custom-component">
        <h3>${this.config.title}</h3>
        <p>${this.config.content}</p>
      </div>
    `;
  }
}

// Register component
if (window.ComponentSystem) {
  window.ComponentSystem.registerComponent('custom-component', CustomComponent);
}
```

### Lazy Loading

Components support lazy loading for better performance:

```html
<div data-lazy-component data-component="card" data-config='{"title":"Lazy Card"}'></div>
```

### Event Handling

Components include built-in event handling:

```javascript
// In component class
attachEvents() {
  this.container.addEventListener('click', (e) => {
    if (e.target.matches('.cta-button')) {
      // Handle CTA click
      this.handleCTAClick();
    }
  });
}
```

## Performance Optimization

### CSS Optimization

- **Purge unused styles** in production
- **Combine component CSS** to reduce HTTP requests
- **Use CSS custom properties** for theming

### JavaScript Optimization

- **Lazy load components** that are below the fold
- **Debounce scroll events** for performance
- **Use Intersection Observer** for visibility detection

### Loading Strategies

```javascript
// Critical components load immediately
ComponentSystem.init();

// Non-critical components load after
setTimeout(() => {
  ComponentSystem.initLazyComponents();
}, 100);
```

## Development Workflow

### File Structure

```
/
├── components/
│   ├── core/
│   │   └── ComponentSystem.js
│   ├── ui/
│   │   ├── Navigation.js
│   │   ├── HeroSection.js
│   │   └── Card.js
│   └── ComponentLibrary.js
├── assets/
│   ├── css/
│   │   └── custom.css
│   └── js/
│       └── webflow-integration.js
├── templates/
│   ├── base.html
│   ├── homepage.html
│   └── webflow-example.html
├── tailwind.config.js
└── docs/
    └── README.md
```

### Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint
```

### Debugging

Enable debug mode for development:

```javascript
// In browser console
ComponentSystem.enableDebug();
debugComponents(); // View active components
debugWebflow();    // View Webflow integration info
```

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

- 📖 [Documentation](docs/)
- 🐛 [Issues](https://github.com/your-repo/issues)
- 💬 [Discussions](https://github.com/your-repo/discussions)
- 📧 [Email Support](mailto:support@yourcompany.com)

---

Built with ❤️ using Tailwind Plus and vanilla JavaScript</content>
</xai:function_call">The file has been truncated due to length. Let me continue writing the rest of the documentation.
