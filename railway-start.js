#!/usr/bin/env node

/**
 * Railway Unified Startup Script for Wojat Platform
 * Orchestrates all services in a single Railway deployment
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

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

class RailwayWojatOrchestrator {
  constructor() {
    this.processes = new Map();
    this.isShuttingDown = false;
    this.startTime = Date.now();
    this.port = process.env.PORT || 3000;
    
    // Service configurations for Railway
    this.services = {
      frontend: {
        name: 'Frontend (Next.js)',
        command: 'npm',
        args: ['run', 'start'],
        cwd: path.join(__dirname, 'frontend'),
        port: this.port,
        color: colors.cyan,
        priority: 1
      },
      bitquery: {
        name: 'Bitquery Service',
        command: 'node',
        args: ['index.js'],
        cwd: path.join(__dirname, 'bitquery'),
        port: null,
        color: colors.blue,
        priority: 2
      },
      elizaos: {
        name: 'ElizaOS Agents',
        command: 'node',
        args: ['railway-start.js'],
        cwd: path.join(__dirname, 'elizaos-agents'),
        port: null,
        color: colors.magenta,
        priority: 3
      },
      scrapers: {
        name: 'Data Scrapers',
        command: 'node',
        args: ['railway-start.js'],
        cwd: path.join(__dirname, 'js-scraper'),
        port: null,
        color: colors.yellow,
        priority: 4
      }
    };
  }

  // Log with color and timestamp
  log(service, message, type = 'info') {
    const timestamp = new Date().toISOString().substr(11, 12);
    const serviceName = service ? `[${service}]` : '[RAILWAY]';
    const color = service ? this.services[service]?.color || colors.white : colors.bright;
    
    let prefix = '';
    switch (type) {
      case 'error': prefix = '❌'; break;
      case 'warning': prefix = '⚠️'; break;
      case 'success': prefix = '✅'; break;
      case 'info': prefix = 'ℹ️'; break;
      default: prefix = '📝';
    }
    
    console.log(`${color}${prefix} ${serviceName} ${message}${colors.reset}`);
  }

  // Start a service
  async startService(serviceName) {
    const config = this.services[serviceName];
    if (!config) {
      this.log(serviceName, `Unknown service: ${serviceName}`, 'error');
      return false;
    }

    this.log(serviceName, `Starting ${config.name}...`, 'info');
    
    try {
      const childProcess = spawn(config.command, config.args, {
        cwd: config.cwd,
        stdio: 'pipe',
        shell: true,
        env: { 
          ...process.env, 
          NODE_ENV: 'production',
          PORT: config.port || undefined
        }
      });

      // Store process reference
      this.processes.set(serviceName, childProcess);

      // Handle process output
      childProcess.stdout.on('data', (data) => {
        const lines = data.toString().split('\n').filter(line => line.trim());
        lines.forEach(line => {
          this.log(serviceName, line.trim());
        });
      });

      childProcess.stderr.on('data', (data) => {
        const lines = data.toString().split('\n').filter(line => line.trim());
        lines.forEach(line => {
          this.log(serviceName, line.trim(), 'warning');
        });
      });

      childProcess.on('close', (code) => {
        if (!this.isShuttingDown) {
          this.log(serviceName, `Process exited with code ${code}`, code === 0 ? 'success' : 'error');
          this.processes.delete(serviceName);
        }
      });

      childProcess.on('error', (error) => {
        this.log(serviceName, `Process error: ${error.message}`, 'error');
        this.processes.delete(serviceName);
      });

      // Wait for service to start
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Check if process is still running
      if (childProcess.killed) {
        this.log(serviceName, `${config.name} failed to start`, 'error');
        return false;
      }

      this.log(serviceName, `${config.name} started successfully`, 'success');
      return true;

    } catch (error) {
      this.log(serviceName, `Failed to start: ${error.message}`, 'error');
      return false;
    }
  }

  // Start all services in priority order
  async startAll() {
    console.log(`${colors.bright}🚀 Starting Wojat Platform on Railway...${colors.reset}\n`);
    
    // Sort services by priority
    const sortedServices = Object.keys(this.services).sort(
      (a, b) => this.services[a].priority - this.services[b].priority
    );

    // Start services sequentially
    for (const serviceName of sortedServices) {
      const success = await this.startService(serviceName);
      if (!success && serviceName === 'frontend') {
        this.log('RAILWAY', 'Frontend failed to start - this is critical for Railway', 'error');
        process.exit(1);
      }
      
      // Wait between service starts
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    this.log('RAILWAY', 'All services started successfully', 'success');
    this.displayStatus();
  }

  // Display service status
  displayStatus() {
    console.log(`\n${colors.bright}📊 Wojat Platform Status:${colors.reset}`);
    console.log(`   🌐 Frontend: http://localhost:${this.port}`);
    console.log(`   🤖 Services: ${this.processes.size} running`);
    console.log(`   ⏱️  Uptime: ${Math.round((Date.now() - this.startTime) / 1000)}s`);
    
    for (const [serviceName, process] of this.processes) {
      const status = process && !process.killed ? '🟢 Running' : '🔴 Stopped';
      console.log(`   ${status} ${this.services[serviceName]?.name || serviceName}`);
    }
    console.log('');
  }

  // Graceful shutdown
  async shutdown(signal) {
    this.isShuttingDown = true;
    console.log(`\n${colors.yellow}🛑 Received ${signal}, shutting down gracefully...${colors.reset}`);
    
    const shutdownPromises = [];
    
    for (const [serviceName, childProcess] of this.processes) {
      if (childProcess && !childProcess.killed) {
        this.log(serviceName, 'Stopping service...', 'info');
        shutdownPromises.push(
          new Promise((resolve) => {
            childProcess.on('close', () => {
              this.log(serviceName, 'Service stopped', 'success');
              resolve();
            });
            childProcess.kill(signal === 'SIGTERM' ? 'SIGTERM' : 'SIGINT');
            
            // Force kill after 5 seconds
            setTimeout(() => {
              if (!childProcess.killed) {
                childProcess.kill('SIGKILL');
                resolve();
              }
            }, 5000);
          })
        );
      }
    }

    await Promise.all(shutdownPromises);
    
    const runtime = Math.round((Date.now() - this.startTime) / 1000);
    console.log(`\n${colors.green}✅ Wojat Platform stopped successfully after ${runtime} seconds${colors.reset}`);
    process.exit(0);
  }

  // Setup graceful shutdown handlers
  setupGracefulShutdown() {
    const shutdown = (signal) => this.shutdown(signal);
    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGUSR2', () => shutdown('SIGUSR2')); // For nodemon
  }

  // Start monitoring
  startMonitoring() {
    setInterval(() => {
      for (const [serviceName, childProcess] of this.processes) {
        if (!childProcess || childProcess.killed) {
          this.log(serviceName, 'Service stopped, attempting restart...', 'warning');
          this.startService(serviceName).catch(error => {
            this.log(serviceName, `Restart failed: ${error.message}`, 'error');
          });
        }
      }
    }, 30000); // Check every 30 seconds
  }
}

// Main execution
async function main() {
  const orchestrator = new RailwayWojatOrchestrator();
  
  try {
    orchestrator.setupGracefulShutdown();
    await orchestrator.startAll();
    orchestrator.startMonitoring();
    
    // Keep the process alive
    setInterval(() => {
      orchestrator.displayStatus();
    }, 300000); // Status every 5 minutes
    
  } catch (error) {
    console.error(`${colors.red}❌ Failed to start Wojat Platform: ${error.message}${colors.reset}`);
    process.exit(1);
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error(`${colors.red}❌ Uncaught Exception: ${error.message}${colors.reset}`);
  console.error(error.stack);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error(`${colors.red}❌ Unhandled Rejection at: ${promise}, reason: ${reason}${colors.reset}`);
  process.exit(1);
});

// Start the platform
main();
