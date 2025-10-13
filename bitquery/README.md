# Wojat Bitquery Service

Blockchain data collection service for the Wojat memecoin hunting platform.

## Environment Variables

Create a `.env` file with the following variables:

```env
# Bitquery API Configuration
BITQUERY_API_KEY=your_bitquery_api_key
ACCESS_TOKEN=your_bitquery_access_token

# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# Solana Configuration
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
SOLANA_CLUSTER=mainnet-beta

# Service Configuration
PORT=3001
NODE_ENV=production
```

## Railway Deployment

This service is configured for Railway deployment with:

- **Start Command**: `node index.mjs`
- **Health Check**: `/health` endpoint
- **Auto-restart**: On failure with max 10 retries
- **Port**: Automatically assigned by Railway

## Local Development

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Run full data collection
yarn full-collection
```

## API Endpoints

- `GET /health` - Health check endpoint
- `POST /collect-memecoins` - Collect memecoin data
- `POST /collect-prices` - Collect price data
- `GET /status` - Service status