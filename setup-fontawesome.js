#!/usr/bin/env node

/**
 * Font Awesome Pro Setup Script
 * Interactive setup for configuring Font Awesome Pro Kit ID
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function setupFontAwesome() {
  console.log('🎨 Font Awesome Pro Setup');
  console.log('==========================\n');

  console.log('This script will help you configure Font Awesome Pro for your project.\n');

  // Check if config.js already exists
  const configPath = path.join(__dirname, 'config.js');
  if (fs.existsSync(configPath)) {
    const overwrite = await ask('config.js already exists. Do you want to overwrite it? (y/N): ');
    if (overwrite.toLowerCase() !== 'y' && overwrite.toLowerCase() !== 'yes') {
      console.log('Setup cancelled.');
      rl.close();
      return;
    }
  }

  console.log('To get your Font Awesome Pro Kit ID:');
  console.log('1. Go to https://fontawesome.com/kits');
  console.log('2. Sign in to your Font Awesome Pro account');
  console.log('3. Create or find your kit');
  console.log('4. Copy the Kit ID from the script tag\n');

  const kitId = await ask('Enter your Font Awesome Pro Kit ID: ');

  if (!kitId || kitId.trim() === '') {
    console.log('❌ No Kit ID provided. Setup cancelled.');
    rl.close();
    return;
  }

  // Validate Kit ID format (basic validation)
  if (kitId.length < 10) {
    console.log('⚠️ Kit ID seems too short. Please verify it\'s correct.');
    const confirm = await ask('Continue anyway? (y/N): ');
    if (confirm.toLowerCase() !== 'y' && confirm.toLowerCase() !== 'yes') {
      rl.close();
      return;
    }
  }

  // Create config.js
  const configContent = `/**
 * Font Awesome Pro Configuration
 * This file contains your actual Kit ID and is NOT committed to version control
 *
 * Kit ID: ${kitId}
 * Generated: ${new Date().toISOString()}
 */

window.FontAwesomeConfig = {
  // Your Font Awesome Pro Kit ID
  kitId: '${kitId}',

  // Additional configuration options
  version: '6.4.0',
  autoAddCss: true,
  autoA11y: {
    mode: 'strict'
  }
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.FontAwesomeConfig;
}`;

  try {
    fs.writeFileSync(configPath, configContent);
    console.log('✅ config.js created successfully!');
    console.log('');
    console.log('🔒 Security Note:');
    console.log('- config.js is automatically ignored by Git');
    console.log('- Your Kit ID is never committed to version control');
    console.log('- Keep this file local and secure');
    console.log('');
    console.log('🎯 Next Steps:');
    console.log('1. Open templates/test.html in your browser');
    console.log('2. Check the console for Font Awesome loading confirmation');
    console.log('3. Start using Pro icons in your components!');
    console.log('');
    console.log('📚 Font Awesome Pro Features:');
    console.log('- 33,000+ icons (vs 2,000+ free)');
    console.log('- Duotone effects');
    console.log('- Sharp variants');
    console.log('- Custom styling');

  } catch (error) {
    console.error('❌ Error creating config.js:', error.message);
  }

  rl.close();
}

// Run setup if called directly
if (require.main === module) {
  setupFontAwesome().catch(console.error);
}

module.exports = { setupFontAwesome };
