import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Basic root endpoint
app.get('/', (req, res) => {
  res.json({ 
    service: 'wojat-bitquery-service',
    status: 'running',
    message: 'Bitquery service is operational'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    service: 'wojat-bitquery-service',
    timestamp: new Date().toISOString()
  });
});

// Service status endpoint
app.get('/status', (req, res) => {
  res.json({
    service: 'wojat-bitquery-service',
    version: '1.0.0',
    status: 'running',
    endpoints: [
      'GET /health',
      'POST /collect-memecoins',
      'POST /collect-prices',
      'POST /collect-market-data',
      'GET /status'
    ]
  });
});

// Collect memecoins endpoint
app.post('/collect-memecoins', async (req, res) => {
  try {
    console.log('📈 Collecting memecoins...');
    const { fetchAndPushMemecoins } = await import("./scripts/memecoins.mjs");
    await fetchAndPushMemecoins();
    res.json({ success: true, message: 'Memecoins collected successfully' });
  } catch (error) {
    console.error('❌ Error collecting memecoins:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Collect prices endpoint
app.post('/collect-prices', async (req, res) => {
  try {
    console.log('💰 Collecting prices...');
    const { fetchAndPushPrices } = await import("./scripts/prices.mjs");
    await fetchAndPushPrices();
    res.json({ success: true, message: 'Prices collected successfully' });
  } catch (error) {
    console.error('❌ Error collecting prices:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Collect market data endpoint
app.post('/collect-market-data', async (req, res) => {
  try {
    console.log('📊 Collecting market data...');
    const { fetchMarketData, updateTokenMarketData } = await import("./scripts/market-data.mjs");
    await fetchAndPushMarketData();
    res.json({ success: true, message: 'Market data collected successfully' });
  } catch (error) {
    console.error('❌ Error collecting market data:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Full collection endpoint
app.post('/collect-all', async (req, res) => {
  try {
    console.log('🚀 Starting full data collection...');
    
    // Import modules dynamically
    const { fetchAndPushMemecoins } = await import("./scripts/memecoins.mjs");
    const { fetchAndPushPrices } = await import("./scripts/prices.mjs");
    
    // Step 1: Fetch and push memecoins
    console.log('📈 Step 1: Fetching and pushing memecoins...');
    await fetchAndPushMemecoins();
    
    // Step 2: Fetch and push prices
    console.log('💰 Step 2: Fetching and pushing prices...');
    await fetchAndPushPrices();
    
    // Step 3: Fetch and push market data
    console.log('📊 Step 3: Fetching and pushing market data...');
    await fetchAndPushMarketData();
    
    res.json({ success: true, message: 'All data collection completed successfully' });
  } catch (error) {
    console.error('❌ Error during full data collection:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

async function fetchAndPushMarketData() {
  try {
    // Import modules dynamically
    const { fetchMarketData, updateTokenMarketData } = await import("./scripts/market-data.mjs");
    
    // Get tokens from Supabase that need market data updates
    const tokens = await getTokensForMarketDataUpdate();
    
    if (!tokens || tokens.length === 0) {
      console.log("ℹ️ No tokens found that need market data updates");
      return;
    }
    
    console.log(`📊 Found ${tokens.length} tokens to update with market data`);
    
    // Process tokens in batches to avoid overwhelming the API
    const batchSize = 5; // Process 5 tokens at a time
    let processedCount = 0;
    
    for (let i = 0; i < tokens.length; i += batchSize) {
      const batch = tokens.slice(i, i + batchSize);
      
      console.log(`🔄 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(tokens.length / batchSize)}`);
      
      // Process batch concurrently
      const batchPromises = batch.map(async (token) => {
        try {
          const marketData = await fetchMarketData(token.address);
          if (marketData) {
            await updateTokenMarketData(token.id, marketData);
            processedCount++;
            console.log(`✅ Updated market data for ${token.symbol} (${token.address})`);
          }
        } catch (error) {
          console.error(`❌ Error updating market data for ${token.symbol}:`, error.message);
        }
      });
      
      await Promise.all(batchPromises);
      
      // Add delay between batches to be respectful to the API
      if (i + batchSize < tokens.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    console.log(`✅ Market data collection completed. Updated ${processedCount} tokens.`);
  } catch (error) {
    console.error('❌ Error in fetchAndPushMarketData:', error);
    throw error;
  }
}

async function getTokensForMarketDataUpdate() {
  // This function should be implemented to fetch tokens from Supabase
  // that need market data updates
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
    
    const { data, error } = await supabase
      .from('tokens')
      .select('id, symbol, address')
      .or('market_cap.is.null,total_supply.is.null')
      .limit(50);
    
    if (error) {
      console.error('❌ Error fetching tokens:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('❌ Error in getTokensForMarketDataUpdate:', error);
    return [];
  }
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Wojat Bitquery Service running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📈 Status: http://localhost:${PORT}/status`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully');
  process.exit(0);
});
