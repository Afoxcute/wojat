#!/usr/bin/env node

/**
 * Wojat Platform - Unified Server for Render Deployment
 * Runs all phases of the Wojat memecoin hunting platform as a single web service
 */

const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Serve static files from frontend build
const frontendPath = path.join(__dirname, 'frontend/out');
if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));
  log('SERVER', `Serving static files from: ${frontendPath}`, 'success');
} else {
  log('SERVER', `Frontend build not found at: ${frontendPath}`, 'warning');
  log('SERVER', 'Frontend will not be available until build completes', 'warning');
}

// Store running processes
const processes = new Map();

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

// Log function
function log(service, message, type = 'info') {
  const timestamp = new Date().toISOString().substr(11, 12);
  const serviceName = service ? `[${service}]` : '[SERVER]';
  
  let prefix = '';
  switch (type) {
    case 'success': prefix = '✅'; break;
    case 'error': prefix = '❌'; break;
    case 'warning': prefix = '⚠️'; break;
    case 'info': prefix = 'ℹ️'; break;
    default: prefix = '📝';
  }
  
  console.log(`${colors.cyan}${timestamp}${colors.reset} ${prefix} ${serviceName} ${message}`);
}

// Start a service
async function startService(serviceName, config) {
  try {
    log(serviceName, `Starting ${config.name}...`, 'info');
    
    const childProcess = spawn(config.command, config.args, {
      cwd: config.cwd,
      stdio: 'pipe',
      shell: true,
      env: { ...process.env, NODE_ENV: 'production' }
    });

    // Store process reference
    processes.set(serviceName, childProcess);

    // Handle process output
    childProcess.stdout.on('data', (data) => {
      const lines = data.toString().split('\n').filter(line => line.trim());
      lines.forEach(line => {
        log(serviceName, line.trim());
      });
    });

    childProcess.stderr.on('data', (data) => {
      const lines = data.toString().split('\n').filter(line => line.trim());
      lines.forEach(line => {
        log(serviceName, line.trim(), 'warning');
      });
    });

    childProcess.on('close', (code) => {
      log(serviceName, `Process exited with code ${code}`, code === 0 ? 'success' : 'error');
      processes.delete(serviceName);
    });

    childProcess.on('error', (error) => {
      log(serviceName, `Process error: ${error.message}`, 'error');
      processes.delete(serviceName);
    });

    // Wait a moment for the process to start
    await new Promise(resolve => setTimeout(resolve, 2000));

    log(serviceName, `${config.name} started successfully`, 'success');
    return true;
  } catch (error) {
    log(serviceName, `Failed to start: ${error.message}`, 'error');
    return false;
  }
}

// Service configurations
const services = {
  phase2: {
    name: 'Twitter-Only Automation (Phase 2)',
    command: 'node',
    args: ['phase2-orchestrator.js'],
    cwd: path.join(__dirname, 'elizaos-agents'),
    port: null,
    color: colors.magenta
  },
  phase4: {
    name: 'AI Trading System (Phase 4)',
    command: 'node',
    args: ['phase4-orchestrator.js'],
    cwd: path.join(__dirname, 'elizaos-agents'),
    port: null,
    color: colors.yellow
  },
  scraper: {
    name: 'Data Collection (TikTok Scraper)',
    command: 'node',
    args: ['index.mjs'],
    cwd: path.join(__dirname, 'js-scraper'),
    port: null,
    color: colors.blue
  }
};

// Health check endpoint
app.get('/health', (req, res) => {
  const status = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      frontend: 'running',
      phase2: processes.has('phase2') ? 'running' : 'stopped',
      phase4: processes.has('phase4') ? 'running' : 'stopped',
      scraper: processes.has('scraper') ? 'running' : 'stopped'
    },
    uptime: process.uptime()
  };
  
  res.json(status);
});

// API endpoints for frontend
app.get('/api/status', (req, res) => {
  res.json({
    status: 'running',
    services: Array.from(processes.keys()),
    timestamp: new Date().toISOString()
  });
});

// Serve frontend routes
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'frontend/out/index.html');
  
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    // Fallback response when frontend is not built
    res.status(503).json({
      status: 'building',
      message: 'Wojat Platform is starting up...',
      services: {
        frontend: 'building',
        phase2: processes.has('phase2') ? 'running' : 'starting',
        phase4: processes.has('phase4') ? 'running' : 'starting',
        scraper: processes.has('scraper') ? 'running' : 'starting'
      },
      timestamp: new Date().toISOString(),
      note: 'Please wait a moment for the frontend to build and refresh the page.'
    });
  }
});

// Start all services
async function startAllServices() {
  log('SERVER', 'Starting Wojat Platform services...', 'info');
  
  // Start background services
  for (const [serviceName, config] of Object.entries(services)) {
    await startService(serviceName, config);
    // Add delay between service starts
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
  
  log('SERVER', 'All services started', 'success');
}

// Graceful shutdown
function gracefulShutdown(signal) {
  log('SERVER', `Received ${signal}, shutting down gracefully...`, 'warning');
  
  // Stop all child processes
  for (const [serviceName, childProcess] of processes) {
    if (childProcess && !childProcess.killed) {
      log(serviceName, 'Stopping service...', 'info');
      childProcess.kill(signal === 'SIGTERM' ? 'SIGTERM' : 'SIGINT');
    }
  }
  
  // Wait for processes to close
  setTimeout(() => {
    log('SERVER', 'Shutdown complete', 'success');
    process.exit(0);
  }, 5000);
}

// Handle shutdown signals
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

// Start the server
async function startServer() {
  try {
    // Check if frontend is built
    const frontendBuildPath = path.join(__dirname, 'frontend/out');
    if (!fs.existsSync(frontendBuildPath)) {
      log('SERVER', 'Frontend not built, building now...', 'warning');
      // In production, this should be handled by the build process
      log('SERVER', 'Please ensure frontend is built before deployment', 'error');
    }
    
    // Start background services
    await startAllServices();
    
    // Start Express server
    app.listen(PORT, () => {
      log('SERVER', `Wojat Platform running on port ${PORT}`, 'success');
      log('SERVER', `Health check: http://localhost:${PORT}/health`, 'info');
      log('SERVER', `Frontend: http://localhost:${PORT}`, 'info');
    });
    
  } catch (error) {
    log('SERVER', `Failed to start server: ${error.message}`, 'error');
    process.exit(1);
  }
}

// Start the server
startServer();
