import express from 'express';
import dotenv from 'dotenv';
import { Phase2Orchestrator } from './phase2-orchestrator.js';
import { Phase4Orchestrator } from './phase4-orchestrator.js';
import { TwitterOnlyOrchestrator } from './twitter-only-orchestrator.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(express.json());

// Initialize orchestrators
let phase2Orchestrator = null;
let phase4Orchestrator = null;
let twitterOnlyOrchestrator = null;

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    service: 'wojat-elizaos-agents',
    timestamp: new Date().toISOString(),
    agents: {
      phase2: phase2Orchestrator ? 'initialized' : 'not_initialized',
      phase4: phase4Orchestrator ? 'initialized' : 'not_initialized',
      twitterOnly: twitterOnlyOrchestrator ? 'initialized' : 'not_initialized'
    }
  });
});

// Service status endpoint
app.get('/status', (req, res) => {
  res.json({
    service: 'wojat-elizaos-agents',
    version: '1.0.0',
    status: 'running',
    endpoints: [
      'GET /health',
      'GET /status',
      'POST /start-phase2',
      'POST /start-phase4',
      'POST /start-twitter-only',
      'POST /stop-phase2',
      'POST /stop-phase4',
      'POST /stop-twitter-only',
      'GET /phase2-status',
      'GET /phase4-status',
      'GET /twitter-only-status'
    ]
  });
});

// Start Phase 2 (Twitter-only automation)
app.post('/start-phase2', async (req, res) => {
  try {
    if (!phase2Orchestrator) {
      phase2Orchestrator = new Phase2Orchestrator();
      await phase2Orchestrator.initialize();
    }
    
    await phase2Orchestrator.startAutomation();
    res.json({ success: true, message: 'Phase 2 (Twitter automation) started successfully' });
  } catch (error) {
    console.error('❌ Error starting Phase 2:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start Phase 4 (AI Trading)
app.post('/start-phase4', async (req, res) => {
  try {
    if (!phase4Orchestrator) {
      phase4Orchestrator = new Phase4Orchestrator();
      await phase4Orchestrator.initialize();
    }
    
    await phase4Orchestrator.startTradingAutomation();
    res.json({ success: true, message: 'Phase 4 (AI Trading) started successfully' });
  } catch (error) {
    console.error('❌ Error starting Phase 4:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start Twitter-only mode
app.post('/start-twitter-only', async (req, res) => {
  try {
    if (!twitterOnlyOrchestrator) {
      twitterOnlyOrchestrator = new TwitterOnlyOrchestrator();
      await twitterOnlyOrchestrator.initialize();
    }
    
    await twitterOnlyOrchestrator.startAutomation();
    res.json({ success: true, message: 'Twitter-only automation started successfully' });
  } catch (error) {
    console.error('❌ Error starting Twitter-only mode:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Stop Phase 2
app.post('/stop-phase2', async (req, res) => {
  try {
    if (phase2Orchestrator) {
      await phase2Orchestrator.stopAutomation();
      res.json({ success: true, message: 'Phase 2 stopped successfully' });
    } else {
      res.json({ success: true, message: 'Phase 2 was not running' });
    }
  } catch (error) {
    console.error('❌ Error stopping Phase 2:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Stop Phase 4
app.post('/stop-phase4', async (req, res) => {
  try {
    if (phase4Orchestrator) {
      await phase4Orchestrator.stopTradingAutomation();
      res.json({ success: true, message: 'Phase 4 stopped successfully' });
    } else {
      res.json({ success: true, message: 'Phase 4 was not running' });
    }
  } catch (error) {
    console.error('❌ Error stopping Phase 4:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Stop Twitter-only mode
app.post('/stop-twitter-only', async (req, res) => {
  try {
    if (twitterOnlyOrchestrator) {
      await twitterOnlyOrchestrator.stopAutomation();
      res.json({ success: true, message: 'Twitter-only automation stopped successfully' });
    } else {
      res.json({ success: true, message: 'Twitter-only automation was not running' });
    }
  } catch (error) {
    console.error('❌ Error stopping Twitter-only mode:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get Phase 2 status
app.get('/phase2-status', (req, res) => {
  if (phase2Orchestrator) {
    const status = phase2Orchestrator.getSystemStatus();
    res.json({ success: true, status });
  } else {
    res.json({ success: false, message: 'Phase 2 not initialized' });
  }
});

// Get Phase 4 status
app.get('/phase4-status', (req, res) => {
  if (phase4Orchestrator) {
    const status = phase4Orchestrator.getSystemStatus();
    res.json({ success: true, status });
  } else {
    res.json({ success: false, message: 'Phase 4 not initialized' });
  }
});

// Get Twitter-only status
app.get('/twitter-only-status', (req, res) => {
  if (twitterOnlyOrchestrator) {
    const status = twitterOnlyOrchestrator.getSystemStatus();
    res.json({ success: true, status });
  } else {
    res.json({ success: false, message: 'Twitter-only mode not initialized' });
  }
});

// Initialize services on startup
async function initializeServices() {
  try {
    console.log('🚀 Initializing Wojat ElizaOS Agents Service...');
    
    // Initialize Twitter-only mode by default
    twitterOnlyOrchestrator = new TwitterOnlyOrchestrator();
    await twitterOnlyOrchestrator.initialize();
    
    console.log('✅ ElizaOS Agents Service initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing ElizaOS Agents Service:', error);
  }
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Wojat ElizaOS Agents Service running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📈 Status: http://localhost:${PORT}/status`);
  
  // Initialize services
  initializeServices();
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  
  if (phase2Orchestrator) {
    await phase2Orchestrator.stopAutomation();
  }
  if (phase4Orchestrator) {
    await phase4Orchestrator.stopTradingAutomation();
  }
  if (twitterOnlyOrchestrator) {
    await twitterOnlyOrchestrator.stopAutomation();
  }
  
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🛑 SIGINT received, shutting down gracefully');
  
  if (phase2Orchestrator) {
    await phase2Orchestrator.stopAutomation();
  }
  if (phase4Orchestrator) {
    await phase4Orchestrator.stopTradingAutomation();
  }
  if (twitterOnlyOrchestrator) {
    await twitterOnlyOrchestrator.stopAutomation();
  }
  
  process.exit(0);
});
