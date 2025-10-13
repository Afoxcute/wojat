import express from 'express';
import dotenv from 'dotenv';
import TikTokScraper from './index.mjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3005;

// Middleware
app.use(express.json());

let tiktokScraper = null;

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    service: 'wojat-tiktok-scraper',
    timestamp: new Date().toISOString(),
    scraper: tiktokScraper ? 'initialized' : 'not_initialized'
  });
});

// Service status endpoint
app.get('/status', (req, res) => {
  res.json({
    service: 'wojat-tiktok-scraper',
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
    if (!tiktokScraper) {
      tiktokScraper = new TikTokScraper();
      await tiktokScraper.initialize();
    }
    
    await tiktokScraper.startScraping();
    res.json({ success: true, message: 'TikTok scraping started successfully' });
  } catch (error) {
    console.error('❌ Error starting TikTok scraping:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Stop scraping endpoint
app.post('/stop-scraping', async (req, res) => {
  try {
    if (tiktokScraper) {
      await tiktokScraper.stopScraping();
      res.json({ success: true, message: 'TikTok scraping stopped successfully' });
    } else {
      res.json({ success: true, message: 'TikTok scraping was not running' });
    }
  } catch (error) {
    console.error('❌ Error stopping TikTok scraping:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get scraper status
app.get('/scraper-status', (req, res) => {
  if (tiktokScraper) {
    const status = tiktokScraper.getStatus();
    res.json({ success: true, status });
  } else {
    res.json({ success: false, message: 'TikTok scraper not initialized' });
  }
});

// Initialize scraper on startup
async function initializeScraper() {
  try {
    console.log('🚀 Initializing Wojat TikTok Scraper Service...');
    
    tiktokScraper = new TikTokScraper();
    await tiktokScraper.initialize();
    
    console.log('✅ TikTok Scraper Service initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing TikTok Scraper Service:', error);
  }
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Wojat TikTok Scraper Service running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📈 Status: http://localhost:${PORT}/status`);
  
  // Initialize scraper
  initializeScraper();
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  
  if (tiktokScraper) {
    await tiktokScraper.stopScraping();
  }
  
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🛑 SIGINT received, shutting down gracefully');
  
  if (tiktokScraper) {
    await tiktokScraper.stopScraping();
  }
  
  process.exit(0);
});
