#!/usr/bin/env node

/**
 * Quick fix script to install missing dependencies
 * Specifically fixes the bs58 library issue for Solana private key handling
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🔧 Fixing Wojat Platform dependencies...\n');

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

function runCommand(command, cwd = process.cwd()) {
  try {
    log(`Running: ${command}`, 'blue');
    execSync(command, { 
      cwd, 
      stdio: 'inherit',
      env: { ...process.env, NODE_ENV: 'production' }
    });
    return true;
  } catch (error) {
    log(`Error running command: ${command}`, 'red');
    log(`Error: ${error.message}`, 'red');
    return false;
  }
}

async function fixDependencies() {
  try {
    // Fix 1: Install root dependencies
    log('📦 Installing root dependencies...', 'yellow');
    if (!runCommand('npm install --legacy-peer-deps')) {
      log('⚠️ Root dependencies failed, trying without legacy flag...', 'warning');
      runCommand('npm install');
    }

    // Fix 2: Install ElizaOS agents dependencies (with bs58)
    log('🤖 Installing ElizaOS agents dependencies (including bs58)...', 'yellow');
    if (!runCommand('npm install --legacy-peer-deps', path.join(__dirname, 'elizaos-agents'))) {
      log('⚠️ ElizaOS agents dependencies failed, trying without legacy flag...', 'warning');
      if (!runCommand('npm install', path.join(__dirname, 'elizaos-agents'))) {
        log('❌ ElizaOS agents dependencies failed completely', 'red');
        return false;
      }
    }

    // Fix 3: Verify bs58 is installed
    log('✅ Verifying bs58 installation...', 'yellow');
    try {
      const bs58Path = path.join(__dirname, 'elizaos-agents/node_modules/bs58');
      const fs = require('fs');
      if (fs.existsSync(bs58Path)) {
        log('✅ bs58 library found in elizaos-agents', 'green');
      } else {
        log('❌ bs58 library not found, trying manual install...', 'red');
        runCommand('npm install bs58', path.join(__dirname, 'elizaos-agents'));
      }
    } catch (error) {
      log(`❌ Error verifying bs58: ${error.message}`, 'red');
    }

    // Fix 4: Install other service dependencies
    log('🕷️ Installing JS scraper dependencies...', 'yellow');
    runCommand('npm install --legacy-peer-deps', path.join(__dirname, 'js-scraper'));

    log('🔗 Installing Bitquery dependencies...', 'yellow');
    runCommand('npm install --legacy-peer-deps', path.join(__dirname, 'bitquery'));

    log('🎉 Dependencies fixed successfully!', 'green');
    log('📋 Next steps:', 'yellow');
    log('1. Test the platform: npm run wojat', 'blue');
    log('2. Check that bs58 error is resolved', 'blue');
    log('3. Deploy to Render if everything works', 'blue');

  } catch (error) {
    log(`❌ Fix failed: ${error.message}`, 'red');
    process.exit(1);
  }
}

// Run the fix
fixDependencies();
