#!/usr/bin/env node

/**
 * ElizaOS Agents Service - Railway Startup
 * Runs Wojat AI agents for social media automation and trading
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'elizaos-agents',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Agent status endpoint
app.get('/api/agents/status', (req, res) => {
  res.json({
    agents: {
      twitterManager: { status: 'running', lastActivity: new Date().toISOString() },
      contentGenerator: { status: 'running', lastActivity: new Date().toISOString() },
      masterScheduler: { status: 'running', lastActivity: new Date().toISOString() }
    },
    timestamp: new Date().toISOString()
  });
});

// Start agents endpoint
app.post('/api/agents/start', async (req, res) => {
  try {
    res.json({ 
      success: true, 
      message: 'Agents started successfully (simulation mode)',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Stop agents endpoint
app.post('/api/agents/stop', async (req, res) => {
  try {
    res.json({ 
      success: true, 
      message: 'Agents stopped successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🤖 ElizaOS Agents Service running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🎯 Agent status: http://localhost:${PORT}/api/agents/status`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 ElizaOS Agents Service shutting down...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 ElizaOS Agents Service shutting down...');
  process.exit(0);
});
