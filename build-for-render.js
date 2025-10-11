#!/usr/bin/env node

/**
 * Build script for Render.com deployment
 * Ensures all components are built and ready for production
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building Wojat Platform for Render deployment...\n');

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

async function buildForRender() {
  try {
    // Step 1: Install root dependencies
    log('📦 Installing root dependencies...', 'yellow');
    if (!runCommand('npm install --legacy-peer-deps')) {
      throw new Error('Failed to install root dependencies');
    }

    // Step 2: Build frontend
    log('🎨 Building frontend...', 'yellow');
    if (!runCommand('npm install --legacy-peer-deps', path.join(__dirname, 'frontend'))) {
      throw new Error('Failed to install frontend dependencies');
    }
    
    if (!runCommand('npm run build', path.join(__dirname, 'frontend'))) {
      throw new Error('Failed to build frontend');
    }

    // Step 3: Install ElizaOS agents dependencies
    log('🤖 Installing ElizaOS agents dependencies...', 'yellow');
    if (!runCommand('npm install --legacy-peer-deps', path.join(__dirname, 'elizaos-agents'))) {
      throw new Error('Failed to install ElizaOS agents dependencies');
    }

    // Step 4: Install JS scraper dependencies
    log('🕷️ Installing JS scraper dependencies...', 'yellow');
    if (!runCommand('npm install --legacy-peer-deps', path.join(__dirname, 'js-scraper'))) {
      throw new Error('Failed to install JS scraper dependencies');
    }

    // Step 5: Install Bitquery dependencies
    log('🔗 Installing Bitquery dependencies...', 'yellow');
    if (!runCommand('npm install --legacy-peer-deps', path.join(__dirname, 'bitquery'))) {
      throw new Error('Failed to install Bitquery dependencies');
    }

    // Step 6: Verify build outputs
    log('✅ Verifying build outputs...', 'yellow');
    
    const frontendOut = path.join(__dirname, 'frontend/out');
    if (!fs.existsSync(frontendOut)) {
      throw new Error('Frontend build output not found');
    }
    
    const serverFile = path.join(__dirname, 'server.js');
    if (!fs.existsSync(serverFile)) {
      throw new Error('Server.js not found');
    }

    // Step 7: Create production environment template
    log('📝 Creating production environment template...', 'yellow');
    const envTemplate = `# Wojat Platform - Production Environment Variables
# Copy this file to .env and fill in your values

# Core
NODE_ENV=production
PORT=3000

# AI Services
OPENAI_API_KEY=your_openai_api_key

# Database (Supabase)
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# Blockchain Data (Bitquery)
BITQUERY_API_KEY=your_bitquery_api_key
ACCESS_TOKEN=your_bitquery_access_token

# Twitter Integration
CONSUMER_KEY=your_twitter_consumer_key
CONSUMER_SECRET=your_twitter_consumer_secret
ZORO_ACCESS_TOKEN=your_twitter_access_token
ZORO_ACCESS_TOKEN_SECRET=your_twitter_access_token_secret

# Solana Integration (Optional)
SOLANA_PRIVATE_KEY=your_base58_private_key
SOLANA_PUBLIC_KEY=your_public_key
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com

# Enhanced RPC Services (Optional)
HELIUS_API_KEY=your_helius_api_key
BIRDEYE_API_KEY=your_birdeye_api_key
`;

    fs.writeFileSync(path.join(__dirname, '.env.production.template'), envTemplate);

    log('🎉 Build completed successfully!', 'green');
    log('📋 Next steps:', 'yellow');
    log('1. Set up your environment variables in Render dashboard', 'blue');
    log('2. Deploy to Render using the provided configuration', 'blue');
    log('3. Monitor your deployment logs', 'blue');
    log('4. Test your health endpoint: https://your-app.onrender.com/health', 'blue');

  } catch (error) {
    log(`❌ Build failed: ${error.message}`, 'red');
    process.exit(1);
  }
}

// Run the build
buildForRender();
