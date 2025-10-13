#!/usr/bin/env node

/**
 * Wojat Platform Railway Deployment Script
 * Optimized for Railway cloud deployment
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

class RailwayDeployment {
  constructor() {
    this.processes = new Map();
    this.isShuttingDown = false;
    this.startTime = Date.now();
    
    // Railway-specific configuration
    this.port = process.env.PORT || 3000;
    this.nodeEnv = process.env.NODE_ENV || 'production';
    
    // Process configurations for Railway
    this.configs = {
      frontend: {
        name: 'Wojat Frontend',
        command: 'npm',
        args: ['run', 'start'],
        cwd: path.join(__dirname, 'frontend'),
        port: this.port,
        color: colors.cyan,
        env: {
          ...process.env,
          NODE_ENV: this.nodeEnv,
          PORT: this.port
        }
      },
      phase2: {
        name: 'Twitter Automation',
        command: 'node',
        args: ['phase2-orchestrator.js'],
        cwd: path.join(__dirname, 'elizaos-agents'),
        port: null,
        color: colors.magenta,
        env: {
          ...process.env,
          NODE_ENV: this.nodeEnv
        }
      },
      phase4: {
        name: 'AI Trading System',
        command: 'node',
        args: ['phase4-orchestrator.js'],
        cwd: path.join(__dirname, 'elizaos-agents'),
        port: null,
        color: colors.yellow,
        env: {
          ...process.env,
          NODE_ENV: this.nodeEnv
        }
      }
    };
  }

  // Log with color and timestamp
  log(service, message, type = 'info') {
    const timestamp = new Date().toISOString().substr(11, 12);
    const serviceName = service ? `[${service}]` : '[RAILWAY]';
    const color = service ? this.configs[service]?.color || colors.white : colors.bright;
    
    let prefix = '';
    switch (type) {
      case 'success': prefix = '✅'; break;
      case 'error': prefix = '❌'; break;
      case 'warning': prefix = '⚠️'; break;
      case 'info': prefix = 'ℹ️'; break;
      default: prefix = '📝';
    }
    
    console.log(`${color}${prefix} ${serviceName} ${message}${colors.reset}`);
  }

  // Check if required environment variables are set
  checkEnvironmentVariables() {
    const required = [
      'SUPABASE_URL',
      'SUPABASE_ANON_KEY',
      'OPENAI_API_KEY'
    ];
    
    const missing = required.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
      this.log(null, `Missing required environment variables: ${missing.join(', ')}`, 'warning');
      this.log(null, 'Some features may not work properly', 'warning');
    } else {
      this.log(null, 'All required environment variables are set', 'success');
    }
  }

  // Start a service
  async startService(serviceName) {
    const config = this.configs[serviceName];
    if (!config) {
      this.log(serviceName, 'Unknown service configuration', 'error');
      return false;
    }

    // Check if service directory exists
    if (!fs.existsSync(config.cwd)) {
      this.log(serviceName, `Directory not found: ${config.cwd}`, 'error');
      return false;
    }

    this.log(serviceName, `Starting ${config.name}...`, 'info');
    
    try {
      const childProcess = spawn(config.command, config.args, {
        cwd: config.cwd,
        stdio: 'pipe',
        shell: true,
        env: config.env
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

      // Wait a moment for the process to start
      await new Promise(resolve => setTimeout(resolve, 3000));

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

  // Start all services
  async startAll() {
    this.log(null, '🚀 Starting Wojat Platform on Railway...', 'info');
    this.log(null, `Port: ${this.port}, Environment: ${this.nodeEnv}`, 'info');
    
    // Check environment variables
    this.checkEnvironmentVariables();
    
    // Start services in order
    const services = ['frontend', 'phase2', 'phase4'];
    const results = [];
    
    for (const service of services) {
      const result = await this.startService(service);
      results.push({ service, success: result });
      
      // Wait between service starts
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    // Display results
    const successful = results.filter(r => r.success).length;
    const total = results.length;
    
    this.log(null, `Started ${successful}/${total} services successfully`, successful === total ? 'success' : 'warning');
    
    if (successful > 0) {
      this.log(null, `🌐 Wojat Platform is running on port ${this.port}`, 'success');
      this.log(null, '📊 Services are starting up...', 'info');
    }
    
    return successful > 0;
  }

  // Graceful shutdown
  async shutdown(signal) {
    this.isShuttingDown = true;
    this.log(null, `🛑 Received ${signal}, shutting down gracefully...`, 'warning');
    
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
            
            // Force kill after 10 seconds
            setTimeout(() => {
              if (!childProcess.killed) {
                childProcess.kill('SIGKILL');
                resolve();
              }
            }, 10000);
          })
        );
      }
    }

    await Promise.all(shutdownPromises);
    
    const runtime = Math.round((Date.now() - this.startTime) / 1000);
    this.log(null, `✅ Wojat Platform stopped successfully after ${runtime} seconds`, 'success');
  }

  // Setup graceful shutdown handlers
  setupGracefulShutdown() {
    const shutdown = (signal) => {
      this.shutdown(signal).then(() => {
        process.exit(0);
      }).catch((error) => {
        this.log(null, `Shutdown error: ${error.message}`, 'error');
        process.exit(1);
      });
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGUSR2', () => shutdown('SIGUSR2')); // Nodemon restart
  }

  // Start monitoring (simplified for Railway)
  startMonitoring() {
    // Railway handles process monitoring, so we just log status
    setInterval(() => {
      const runningServices = Array.from(this.processes.keys());
      if (runningServices.length > 0) {
        this.log(null, `🟢 ${runningServices.length} services running: ${runningServices.join(', ')}`, 'info');
      }
    }, 60000); // Log every minute
  }
}

// Main execution
async function main() {
  const deployment = new RailwayDeployment();
  deployment.setupGracefulShutdown();
  
  try {
    const success = await deployment.startAll();
    if (success) {
      deployment.startMonitoring();
      
      // Keep the process alive
      setInterval(() => {
        // Health check - just keep running
      }, 30000);
    } else {
      console.error(`${colors.red}❌ Failed to start Wojat Platform${colors.reset}`);
      process.exit(1);
    }
  } catch (error) {
    console.error(`${colors.red}❌ Fatal error: ${error.message}${colors.reset}`);
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
  console.error(`${colors.red}❌ Unhandled Rejection at: ${promise}${colors.reset}`);
  console.error(`Reason: ${reason}`);
  process.exit(1);
});

// Start the application
if (require.main === module) {
  main();
}

module.exports = RailwayDeployment;
