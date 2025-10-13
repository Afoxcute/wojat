import express from 'express';
import dotenv from 'dotenv';
import TelegramScraper from './telegram_scraper.mjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(express.json());

let telegramScraper = null;

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    service: 'wojat-telegram-scraper',
    timestamp: new Date().toISOString(),
    scraper: telegramScraper ? 'initialized' : 'not_initialized'
  });
});

// Service status endpoint
app.get('/status', (req, res) => {
  res.json({
    service: 'wojat-telegram-scraper',
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
    if (!telegramScraper) {
      telegramScraper = new TelegramScraper();
      await telegramScraper.initialize();
    }
    
    await telegramScraper.startScraping();
    res.json({ success: true, message: 'Telegram scraping started successfully' });
  } catch (error) {
    console.error('❌ Error starting Telegram scraping:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Stop scraping endpoint
app.post('/stop-scraping', async (req, res) => {
  try {
    if (telegramScraper) {
      await telegramScraper.stopScraping();
      res.json({ success: true, message: 'Telegram scraping stopped successfully' });
    } else {
      res.json({ success: true, message: 'Telegram scraping was not running' });
    }
  } catch (error) {
    console.error('❌ Error stopping Telegram scraping:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get scraper status
app.get('/scraper-status', (req, res) => {
  if (telegramScraper) {
    const status = telegramScraper.getStatus();
    res.json({ success: true, status });
  } else {
    res.json({ success: false, message: 'Telegram scraper not initialized' });
  }
});

// Initialize scraper on startup
async function initializeScraper() {
  try {
    console.log('🚀 Initializing Wojat Telegram Scraper Service...');
    
    telegramScraper = new TelegramScraper();
    await telegramScraper.initialize();
    
    console.log('✅ Telegram Scraper Service initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing Telegram Scraper Service:', error);
  }
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Wojat Telegram Scraper Service running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📈 Status: http://localhost:${PORT}/status`);
  
  // Initialize scraper
  initializeScraper();
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  
  if (telegramScraper) {
    await telegramScraper.stopScraping();
  }
  
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🛑 SIGINT received, shutting down gracefully');
  
  if (telegramScraper) {
    await telegramScraper.stopScraping();
  }
  
  process.exit(0);
});
