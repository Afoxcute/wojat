import express from 'express';
import dotenv from 'dotenv';
import OutlightScraper from './outlight-scraper.mjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3004;

// Middleware
app.use(express.json());

let outlightScraper = null;

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    service: 'wojat-outlight-scraper',
    timestamp: new Date().toISOString(),
    scraper: outlightScraper ? 'initialized' : 'not_initialized'
  });
});

// Service status endpoint
app.get('/status', (req, res) => {
  res.json({
    service: 'wojat-outlight-scraper',
    version: '1.0.0',
    status: 'running',
    endpoints: [
      'GET /health',
      'GET /status',
      'POST /start-scraping',
      'POST /stop-scraping',
      'GET /scraper-status'
    ]
  });
});

// Start scraping endpoint
app.post('/start-scraping', async (req, res) => {
  try {
    if (!outlightScraper) {
      outlightScraper = new OutlightScraper();
      await outlightScraper.initialize();
    }
    
    await outlightScraper.startScraping();
    res.json({ success: true, message: 'Outlight scraping started successfully' });
  } catch (error) {
    console.error('❌ Error starting Outlight scraping:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Stop scraping endpoint
app.post('/stop-scraping', async (req, res) => {
  try {
    if (outlightScraper) {
      await outlightScraper.stopScraping();
      res.json({ success: true, message: 'Outlight scraping stopped successfully' });
    } else {
      res.json({ success: true, message: 'Outlight scraping was not running' });
    }
  } catch (error) {
    console.error('❌ Error stopping Outlight scraping:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get scraper status
app.get('/scraper-status', (req, res) => {
  if (outlightScraper) {
    const status = outlightScraper.getStatus();
    res.json({ success: true, status });
  } else {
    res.json({ success: false, message: 'Outlight scraper not initialized' });
  }
});

// Initialize scraper on startup
async function initializeScraper() {
  try {
    console.log('🚀 Initializing Wojat Outlight Scraper Service...');
    
    outlightScraper = new OutlightScraper();
    await outlightScraper.initialize();
    
    console.log('✅ Outlight Scraper Service initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing Outlight Scraper Service:', error);
  }
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Wojat Outlight Scraper Service running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📈 Status: http://localhost:${PORT}/status`);
  
  // Initialize scraper
  initializeScraper();
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  
  if (outlightScraper) {
    await outlightScraper.stopScraping();
  }
  
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🛑 SIGINT received, shutting down gracefully');
  
  if (outlightScraper) {
    await outlightScraper.stopScraping();
  }
  
  process.exit(0);
});
