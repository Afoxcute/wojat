#!/usr/bin/env node

/**
 * Wojat Platform Railway Startup Script
 * Runs all services for Railway deployment with centralized environment variables
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

class WojatRailwayOrchestrator {
  constructor() {
    this.processes = new Map();
    this.isShuttingDown = false;
    this.startTime = Date.now();
    
    // Railway-specific process configurations
    this.configs = {
      frontend: {
        name: 'Frontend (Next.js)',
        command: 'yarn',
        args: ['start'],
        cwd: path.join(__dirname, 'frontend'),
        port: process.env.PORT || 3000,
        color: colors.cyan,
        dependencies: []
      },
      bitquery: {
        name: 'Bitquery Service',
        command: 'node',
        args: ['index.mjs'],
        cwd: path.join(__dirname, 'bitquery'),
        port: null,
        color: colors.blue,
        dependencies: []
      },
      elizaos: {
        name: 'ElizaOS Agents',
        command: 'node',
        args: ['phase2-orchestrator.js'],
        cwd: path.join(__dirname, 'elizaos-agents'),
        port: null,
        color: colors.magenta,
        dependencies: []
      },
      tiktok: {
        name: 'TikTok Scraper',
        command: 'node',
        args: ['index.mjs'],
        cwd: path.join(__dirname, 'js-scraper'),
        port: null,
        color: colors.yellow,
        dependencies: []
      },
      telegram: {
        name: 'Telegram Scraper',
        command: 'node',
        args: ['telegram_scraper.mjs'],
        cwd: path.join(__dirname, 'js-scraper'),
        port: null,
        color: colors.green,
        dependencies: []
      },
      outlight: {
        name: 'Outlight Scraper',
        command: 'node',
        args: ['run-outlight-scraper.mjs'],
        cwd: path.join(__dirname, 'js-scraper'),
        port: null,
        color: colors.white,
        dependencies: []
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

  // Copy environment variables to service directories
  async copyEnvToServices() {
    try {
      this.log(null, 'Copying environment variables to all services...', 'info');
      
      const envContent = this.getEnvContent();
      
      // Copy to each service directory
      const services = ['frontend', 'elizaos-agents', 'js-scraper', 'bitquery'];
      
      for (const service of services) {
        const envPath = path.join(__dirname, service, '.env');
        fs.writeFileSync(envPath, envContent);
        this.log(service, `Environment variables copied to ${service}/.env`, 'success');
      }
      
      return true;
    } catch (error) {
      this.log(null, `Failed to copy environment variables: ${error.message}`, 'error');
      return false;
    }
  }

  // Generate environment content for all services
  getEnvContent() {
    const envVars = [
      // Supabase
      'SUPABASE_URL',
      'SUPABASE_ANON_KEY',
      'SUPABASE_ANON_SECRET',
      
      // OpenAI
      'OPENAI_API_KEY',
      
      // Bitquery
      'BITQUERY_API_KEY',
      'ACCESS_TOKEN',
      
      // Twitter
      'CONSUMER_KEY',
      'CONSUMER_SECRET',
      'ZORO_ACCESS_TOKEN',
      'ZORO_ACCESS_TOKEN_SECRET',
      
      // Telegram
      'TELEGRAM_BOT_TOKEN',
      'TELEGRAM_CHANNEL_ID',
      'TELEGRAM_GROUP_ID',
      
      // Discord
      'DISCORD_BOT_TOKEN',
      'DISCORD_GUILD_ID',
      'DISCORD_ANNOUNCEMENT_CHANNEL_ID',
      'DISCORD_TRADING_CHANNEL_ID',
      'DISCORD_VOICE_CHANNEL_ID',
      
      // Solana
      'SOLANA_PRIVATE_KEY',
      'SOLANA_PUBLIC_KEY',
      'SOLANA_RPC_URL',
      'SOLANA_CLUSTER',
      
      // Optional services
      'HELIUS_API_KEY',
      'BIRDEYE_API_KEY',
      
      // Railway specific
      'PORT',
      'NODE_ENV',
      'RAILWAY_ENVIRONMENT',
      'RAILWAY_PROJECT_ID',
      'RAILWAY_SERVICE_ID'
    ];

    let envContent = '# Wojat Platform Environment Variables\n';
    envContent += '# Generated for Railway deployment\n\n';
    
    envVars.forEach(varName => {
      const value = process.env[varName];
      if (value !== undefined) {
        envContent += `${varName}=${value}\n`;
      }
    });
    
    return envContent;
  }

  // Start a single service
  async startService(serviceName) {
    const config = this.configs[serviceName];
    if (!config) {
      this.log(serviceName, `Unknown service: ${serviceName}`, 'error');
      return false;
    }

    // Check dependencies
    for (const dep of config.dependencies) {
      if (!this.processes.has(dep)) {
        this.log(serviceName, `Waiting for dependency: ${dep}`, 'warning');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    this.log(serviceName, `Starting ${config.name}...`, 'info');
    
    const childProcess = spawn(config.command, config.args, {
      cwd: config.cwd,
      stdio: 'pipe',
      shell: true,
      env: { ...process.env, NODE_ENV: 'production' }
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
  }

  // Start all services
  async startAll() {
    try {
      this.log(null, '🚀 Starting Wojat Platform on Railway...', 'info');
      
      // Copy environment variables first
      const envCopied = await this.copyEnvToServices();
      if (!envCopied) {
        this.log(null, 'Continuing without copying env files...', 'warning');
      }

      // Start services in order
      const serviceOrder = ['frontend', 'bitquery', 'elizaos', 'tiktok', 'telegram', 'outlight'];
      
      for (const serviceName of serviceOrder) {
        const started = await this.startService(serviceName);
        if (!started && serviceName === 'frontend') {
          this.log(null, 'Frontend failed to start - this is critical for Railway', 'error');
          throw new Error('Frontend service failed to start');
        }
        
        // Small delay between service starts
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      this.displayStatus();
      this.log(null, '🎉 All Wojat services started successfully!', 'success');
      
    } catch (error) {
      this.log(null, `Failed to start services: ${error.message}`, 'error');
      throw error;
    }
  }

  // Display current status
  displayStatus() {
    console.log(`\n${colors.bright}📊 Wojat Platform Status:${colors.reset}`);
    console.log(`${colors.bright}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    
    for (const [serviceName, process] of this.processes) {
      const config = this.configs[serviceName];
      const status = process && !process.killed ? '🟢 Running' : '🔴 Stopped';
      const port = config.port ? `:${config.port}` : '';
      
      console.log(`${config.color}${status} ${config.name}${port}${colors.reset}`);
    }
    
    console.log(`${colors.bright}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.green}🌐 Frontend accessible at: ${process.env.RAILWAY_PUBLIC_DOMAIN || 'http://localhost:3000'}${colors.reset}\n`);
  }

  // Graceful shutdown
  async shutdown(signal) {
    this.isShuttingDown = true;
    this.log(null, `🛑 Received ${signal}, shutting down gracefully...`, 'warning');
    
    const shutdownPromises = [];
    
    for (const [serviceName, process] of this.processes) {
      if (process && !process.killed) {
        this.log(serviceName, 'Stopping service...', 'info');
        shutdownPromises.push(
          new Promise((resolve) => {
            process.on('close', () => {
              this.log(serviceName, 'Service stopped', 'success');
              resolve();
            });
            process.kill(signal === 'SIGTERM' ? 'SIGTERM' : 'SIGINT');
            
            // Force kill after 5 seconds
            setTimeout(() => {
              if (!process.killed) {
                process.kill('SIGKILL');
                resolve();
              }
            }, 5000);
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
    const shutdown = async (signal) => {
      await this.shutdown(signal);
      process.exit(0);
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGUSR2', () => shutdown('SIGUSR2')); // For nodemon
  }

  // Start monitoring
  startMonitoring() {
    setInterval(() => {
      for (const [serviceName, process] of this.processes) {
        if (!process || process.killed) {
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
  console.log(`${colors.bright}🚀 Starting Wojat Platform on Railway...${colors.reset}\n`);
  
  const orchestrator = new WojatRailwayOrchestrator();
  orchestrator.setupGracefulShutdown();
  
  try {
    await orchestrator.startAll();
    orchestrator.startMonitoring();
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

// Run the main function
if (require.main === module) {
  main();
}

module.exports = WojatRailwayOrchestrator;
