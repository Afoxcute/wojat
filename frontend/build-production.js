#!/usr/bin/env node

/**
 * Production Build Script for Wojat Frontend
 * Sets proper NODE_ENV and handles build issues
 */

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Wojat Frontend Production Build...');

// Set proper NODE_ENV
process.env.NODE_ENV = 'production';

const buildProcess = spawn('npm', ['run', 'build'], {
  cwd: path.join(__dirname),
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    NODE_ENV: 'production',
    NEXT_TELEMETRY_DISABLED: '1'
  }
});

buildProcess.on('close', (code) => {
  if (code === 0) {
    console.log('✅ Wojat Frontend build completed successfully!');
  } else {
    console.error(`❌ Wojat Frontend build failed with exit code ${code}`);
    process.exit(code);
  }
});

buildProcess.on('error', (error) => {
  console.error('❌ Build process error:', error);
  process.exit(1);
});
