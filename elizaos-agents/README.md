# Wojat ElizaOS Agents Service

AI-powered agents service for the Wojat memecoin hunting platform using ElizaOS framework.

## Environment Variables

Create a `.env` file with the following variables:

```env
# ElizaOS Configuration
OPENAI_API_KEY=your_openai_api_key

# Solana Configuration
SOLANA_PRIVATE_KEY=your_base58_private_key
SOLANA_PUBLIC_KEY=your_public_key
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
SOLANA_CLUSTER=mainnet-beta

# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# Twitter Configuration
CONSUMER_KEY=your_twitter_consumer_key
CONSUMER_SECRET=your_twitter_consumer_secret
ZORO_ACCESS_TOKEN=your_twitter_access_token
ZORO_ACCESS_TOKEN_SECRET=your_twitter_access_token_secret

# Service Configuration
PORT=3002
NODE_ENV=production
```

## Railway Deployment

This service is configured for Railway deployment with:

- **Start Command**: `node server.mjs`
- **Health Check**: `/health` endpoint
- **Auto-restart**: On failure with max 10 retries
- **Port**: Automatically assigned by Railway

## Local Development

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Start specific phases
yarn phase2      # Twitter automation
yarn phase4      # AI trading
yarn twitter-only # Twitter-only mode
```

## API Endpoints

### Health & Status
- `GET /health` - Health check endpoint
- `GET /status` - Service status and available endpoints

### Phase Management
- `POST /start-phase2` - Start Twitter automation
- `POST /start-phase4` - Start AI trading
- `POST /start-twitter-only` - Start Twitter-only mode
- `POST /stop-phase2` - Stop Twitter automation
- `POST /stop-phase4` - Stop AI trading
- `POST /stop-twitter-only` - Stop Twitter-only mode

### Status Monitoring
- `GET /phase2-status` - Get Phase 2 status
- `GET /phase4-status` - Get Phase 4 status
- `GET /twitter-only-status` - Get Twitter-only status

## Features

### Phase 2: Twitter Automation
- AI-powered content generation
- Automated Twitter posting
- Community engagement
- Performance analytics

### Phase 4: AI Trading
- Automated trade execution
- Portfolio management
- Risk management
- Market prediction

### Twitter-Only Mode
- Simplified Twitter automation
- Content generation
- Engagement management