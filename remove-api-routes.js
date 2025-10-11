#!/usr/bin/env node

/**
 * Remove API routes for static export compatibility
 * Moves API routes to a backup directory to prevent build errors
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🔧 Removing API routes for static export compatibility...\n');

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

// Create backup directory
const backupDir = path.join(__dirname, 'frontend/api-backup');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
  log('📁 Created backup directory: frontend/api-backup', 'yellow');
}

// Find all API route files
const apiRoutes = glob.sync('frontend/app/api/**/*.ts');

log(`Found ${apiRoutes.length} API route files`, 'yellow');

let movedCount = 0;

apiRoutes.forEach(routeFile => {
  try {
    const fullPath = path.join(__dirname, routeFile);
    const relativePath = path.relative(path.join(__dirname, 'frontend/app'), routeFile);
    const backupPath = path.join(backupDir, relativePath);
    
    // Create backup directory structure
    const backupDirPath = path.dirname(backupPath);
    if (!fs.existsSync(backupDirPath)) {
      fs.mkdirSync(backupDirPath, { recursive: true });
    }
    
    // Move file to backup
    fs.copyFileSync(fullPath, backupPath);
    fs.unlinkSync(fullPath);
    
    log(`✅ Moved: ${routeFile} → api-backup/`, 'green');
    movedCount++;
  } catch (error) {
    log(`❌ Error moving ${routeFile}: ${error.message}`, 'red');
  }
});

// Remove empty API directories
const apiDirs = glob.sync('frontend/app/api/**/');
apiDirs.sort((a, b) => b.length - a.length); // Sort by depth, deepest first

apiDirs.forEach(dir => {
  try {
    const fullPath = path.join(__dirname, dir);
    if (fs.existsSync(fullPath) && fs.readdirSync(fullPath).length === 0) {
      fs.rmdirSync(fullPath);
      log(`🗑️  Removed empty directory: ${dir}`, 'blue');
    }
  } catch (error) {
    // Ignore errors for non-empty directories
  }
});

log(`\n🎉 Moved ${movedCount} API route files to backup`, 'green');
log('📋 Next steps:', 'yellow');
log('1. Try building the frontend again: cd frontend && npm run build', 'blue');
log('2. The frontend should now build successfully without API routes', 'blue');
log('3. API routes are backed up in frontend/api-backup/ for future use', 'blue');
log('4. For full API functionality, consider using a separate API server', 'blue');
