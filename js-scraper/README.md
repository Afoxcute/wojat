# Wojat Scraper Services

Collection of scraper services for the Wojat memecoin hunting platform.

## Services

### 1. Telegram Scraper Service
- **Port**: 3003
- **File**: `telegram-server.mjs`
- **Railway Config**: `telegram-railway.json`

### 2. Outlight Scraper Service
- **Port**: 3004
- **File**: `outlight-server.mjs`
- **Railway Config**: `outlight-railway.json`

### 3. TikTok Scraper Service
- **Port**: 3005
- **File**: `tiktok-server.mjs`
- **Railway Config**: `tiktok-railway.json`

## Environment Variables

Create a `.env` file with the following variables:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# Twitter Configuration
CONSUMER_KEY=your_twitter_consumer_key
CONSUMER_SECRET=your_twitter_consumer_secret
ZORO_ACCESS_TOKEN=your_twitter_access_token
ZORO_ACCESS_TOKEN_SECRET=your_twitter_access_token_secret

# Telegram Configuration
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHANNEL_ID=your_telegram_channel_id

# Service Configuration
PORT=3003
NODE_ENV=production
```

## Railway Deployment

Each service is configured for Railway deployment with:

- **Health Check**: `/health` endpoint
- **Auto-restart**: On failure with max 10 retries
- **Port**: Automatically assigned by Railway

## Local Development

```bash
# Install dependencies
yarn install

# Start specific services
yarn start-telegram    # Telegram scraper service
yarn start-outlight    # Outlight scraper service
yarn start-tiktok     # TikTok scraper service

# Development mode
yarn dev
```

## API Endpoints

### Common Endpoints (All Services)
- `GET /health` - Health check endpoint
- `GET /status` - Service status and available endpoints
- `POST /start-scraping` - Start scraping
- `POST /stop-scraping` - Stop scraping
- `GET /scraper-status` - Get scraper status

## Features

### Telegram Scraper
- Real-time Telegram channel monitoring
- Message analysis and pattern recognition
- Automated data storage
- AI-powered content analysis

### Outlight Scraper
- Outlight platform data collection
- Trend analysis and monitoring
- Automated data processing
- Integration with Wojat platform

### TikTok Scraper
- TikTok hashtag and trend monitoring
- Video content analysis
- Social sentiment tracking
- Memecoin correlation analysis

## Database Integration

All scrapers integrate with Supabase for:
- Data storage and retrieval
- Real-time updates
- Pattern recognition
- AI analysis results