#!/usr/bin/env node

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Parse command line arguments and return config object
function parseCommandLineArgs() {
    console.log('Args 1: ', process.argv);
    const args = process.argv.slice(2);
    if (args.length != 3 || args[0] !== '--mode' || !['light', 'dark'].includes(args[1])) {
        console.log('Usage: node take-screenshot.js --mode <light|dark> <url>');
        console.log('Example: node take-screenshot.js --mode dark https://example.com');
        process.exit(1);
    }

    console.log('Args 2: ', args);
    return {
        darkMode: args[1] === 'dark',
        url: args[2]
    };
}


// Generate filename based on URL
function generateFilename(url, isDarkMode) {
  try {
    const urlObj = new URL(url);
    let name;
    
    if (urlObj.hostname.includes('pjpscriv.co.nz')) {
      // For pjpscriv.co.nznz, use the first level route after '/'
      const pathParts = urlObj.pathname.split('/').filter(part => part.length > 0);
      name = pathParts.length > 0 ? pathParts[0] : 'home';
    } else {
      // For other domains, use the domain name
      name = urlObj.hostname;
    }
    
    // Replace non-alphanumeric characters with hyphens
    name = name.replace(/[^a-zA-Z0-9]/g, '-');
    
    // Remove multiple consecutive hyphens and trim
    name = name.replace(/-+/g, '-').replace(/^-|-$/g, '');
    
    const mode = isDarkMode ? 'dark' : 'light';
    return `${name}-${mode}.jpg`;
  } catch (error) {
    console.error('Invalid URL provided:', url);
    process.exit(1);
  }
}

// Create readline interface for user interaction
function createReadlineInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}

// Wait for user to press Enter
function waitForUserInput(message) {
  return new Promise((resolve) => {
    const rl = createReadlineInterface();
    rl.question(message, () => {
      rl.close();
      resolve();
    });
  });
}

async function takeScreenshot() {
  // Parse command line arguments
  const { darkMode, url } = parseCommandLineArgs();
  console.log(`Taking screenshot of: ${url}`);
  console.log(`Dark mode: ${darkMode ? 'enabled' : 'disabled'}`);
  
  // Launch browser
  const browser = await chromium.launch({ 
    headless: false,  // Run in headed mode so user can interact
    channel: 'chrome' // Use Chrome if available
  });
  
  // Create context with dark mode preference if specified
  const contextOptions = {
    viewport: { width: 1200, height: 800 }
  };
  
  if (darkMode) {
    contextOptions.colorScheme = 'dark';
  }
  
  const context = await browser.newContext(contextOptions);
  const page = await context.newPage();
  
  try {
    // Navigate to the URL
    console.log('Navigating to the page...');
    await page.goto(url, { waitUntil: 'networkidle' });
    
    // Wait for user interaction
    console.log('\n🌐 Browser is now open. Make any modifications you need to the page.');
    console.log('   - Scroll to the desired position');
    console.log('   - Open sidebars or menus');
    console.log('   - Adjust any settings');
    await waitForUserInput('Press Enter when ready to take the screenshot...');
    
    // Hide scrollbars before taking screenshot
    await page.addStyleTag({
      content: `
        * {
          scrollbar-width: none !important; /* Firefox */
          -ms-overflow-style: none !important; /* Internet Explorer 10+ */
        }
        *::-webkit-scrollbar {
          display: none !important; /* WebKit */
        }
      `
    });
    
    // Generate filename
    const filename = generateFilename(url, darkMode);
    const screenshotPath = path.join(__dirname, 'static', 'img', 'projects', filename);
    
    // Ensure the directory exists
    const dir = path.dirname(screenshotPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Take screenshot
    console.log('Taking screenshot...');
    await page.screenshot({ 
      path: screenshotPath, 
      type: 'jpeg',
      quality: 90,
      fullPage: false  // Only capture the viewport
    });
    
    console.log(`✅ Screenshot saved to: ${screenshotPath}`);
    
  } catch (error) {
    console.error('Error taking screenshot:', error);
  } finally {
    await browser.close();
  }
}

// Run the script
takeScreenshot().catch(console.error);