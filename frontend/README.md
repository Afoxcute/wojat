# Wojat Frontend Service

Next.js frontend application for the Wojat memecoin hunting platform.

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Solana Configuration
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
NEXT_PUBLIC_SOLANA_CLUSTER=mainnet-beta

# Service URLs (for Railway deployment)
NEXT_PUBLIC_BITQUERY_SERVICE_URL=https://your-bitquery-service.railway.app
NEXT_PUBLIC_ELIZAOS_SERVICE_URL=https://your-elizaos-service.railway.app
NEXT_PUBLIC_SCRAPER_SERVICE_URL=https://your-scraper-service.railway.app

# OpenAI Configuration
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key

# App Configuration
NEXT_PUBLIC_APP_NAME=Wojat
NEXT_PUBLIC_APP_VERSION=1.0.0
NODE_ENV=production
```

## Railway Deployment

This service is configured for Railway deployment with:

- **Start Command**: `npm run start`
- **Health Check**: `/api/health` endpoint
- **Auto-restart**: On failure with max 10 retries
- **Port**: Automatically assigned by Railway
- **Build**: Optimized Next.js standalone build

## Local Development

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start
```

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/status` - Service status and features

## Features

### Core Pages
- `/` - Homepage with trending memecoins
- `/dashboard` - Main dashboard with analytics
- `/trending-coins` - Real-time trending memecoins
- `/ai-chat` - AI-powered conversational interface
- `/portfolio` - Portfolio management

### AI Integration
- Conversational AI chat
- Voice interaction (speech-to-text/text-to-speech)
- Personalized recommendations
- Real-time market analysis

### Blockchain Integration
- Solana wallet connection
- Token management
- Transaction history
- Portfolio tracking

### Social Media Integration
- TikTok trend analysis
- Twitter automation
- Social sentiment tracking