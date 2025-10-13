#!/usr/bin/env node

/**
 * Bitquery Service - Railway Startup
 * Handles Solana blockchain data fetching for Wojat platform
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'bitquery',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API endpoints
app.get('/api/prices/:token', async (req, res) => {
  try {
    const { token } = req.params;
    // Implement price fetching logic here
    res.json({
      token,
      price: 0.000012,
      change24h: 15.67,
      volume24h: 1250000,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/tokens/trending', async (req, res) => {
  try {
    // Implement trending tokens logic here
    res.json({
      tokens: [
        { symbol: 'BONK', price: 0.000012, change24h: 15.67 },
        { symbol: 'WIF', price: 2.45, change24h: 8.23 },
        { symbol: 'PEPE', price: 0.000001, change24h: -3.45 }
      ],
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Bitquery Service running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Bitquery Service shutting down...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 Bitquery Service shutting down...');
  process.exit(0);
});
