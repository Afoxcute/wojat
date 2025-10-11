#!/usr/bin/env node

/**
 * Fix API routes for static export compatibility
 * Removes or comments out 'export const dynamic = "force-dynamic"' lines
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🔧 Fixing API routes for static export compatibility...\n');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

function log(message, color = 'blue') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Find all API route files
const apiRoutes = glob.sync('frontend/app/api/**/*.ts');

log(`Found ${apiRoutes.length} API route files`, 'yellow');

let fixedCount = 0;

apiRoutes.forEach(routeFile => {
  try {
    const fullPath = path.join(__dirname, routeFile);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Check if file contains the problematic line
    if (content.includes('export const dynamic = \'force-dynamic\';')) {
      // Comment out the line instead of removing it completely
      content = content.replace(
        /export const dynamic = 'force-dynamic';/g,
        '// export const dynamic = \'force-dynamic\'; // Disabled for static export'
      );
      
      fs.writeFileSync(fullPath, content);
      log(`✅ Fixed: ${routeFile}`, 'green');
      fixedCount++;
    } else {
      log(`⏭️  Skipped: ${routeFile} (no dynamic export)`, 'blue');
    }
  } catch (error) {
    log(`❌ Error fixing ${routeFile}: ${error.message}`, 'red');
  }
});

log(`\n🎉 Fixed ${fixedCount} API route files`, 'green');
log('📋 Next steps:', 'yellow');
log('1. Try building the frontend again: cd frontend && npm run build', 'blue');
log('2. The API routes will be disabled but the frontend should build', 'blue');
log('3. For full API functionality, consider using a separate API server', 'blue');
