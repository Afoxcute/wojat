# 🚂 Railway Deployment Guide for Wojat Platform

## 📋 Overview

This guide will help you deploy the Wojat memecoin hunting platform as a single service on Railway. The platform includes:

- **Frontend**: Next.js web application
- **Bitquery Service**: Solana blockchain data fetching
- **ElizaOS Agents**: AI-powered social media automation
- **Data Scrapers**: TikTok, Telegram, and Outlight scraping services

## 🚀 Quick Deploy

### Option 1: Deploy from GitHub

1. **Fork this repository** to your GitHub account
2. **Connect to Railway**:
   - Go to [Railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your forked repository

3. **Configure Environment Variables** (see below)
4. **Deploy**: Railway will automatically build and deploy

### Option 2: Deploy with Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Deploy
railway up
```

## 🔧 Environment Variables

Set these environment variables in your Railway project:

### Required Variables

```env
# Database
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# AI Services
OPENAI_API_KEY=your_openai_api_key

# Blockchain Data
BITQUERY_API_KEY=your_bitquery_api_key
ACCESS_TOKEN=your_bitquery_access_token

# Social Media (Optional)
CONSUMER_KEY=your_twitter_consumer_key
CONSUMER_SECRET=your_twitter_consumer_secret
ZORO_ACCESS_TOKEN=your_twitter_access_token
ZORO_ACCESS_TOKEN_SECRET=your_twitter_access_token_secret

# Solana (Optional - for trading features)
SOLANA_PRIVATE_KEY=your_base58_private_key
SOLANA_PUBLIC_KEY=your_public_key
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
```

### Optional Variables

```env
# Enhanced RPC Services
HELIUS_API_KEY=your_helius_api_key
BIRDEYE_API_KEY=your_birdeye_api_key

# Telegram Integration
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHANNEL_ID=your_telegram_channel_id

# Discord Integration
DISCORD_BOT_TOKEN=your_discord_bot_token
DISCORD_GUILD_ID=your_discord_guild_id
```

## 🏗️ Architecture

### Service Structure

```
Wojat Platform (Single Railway Service)
├── Frontend (Next.js) - Port 3000
├── Bitquery Service - Port 3001
├── ElizaOS Agents - Port 3002
└── Data Scrapers - Port 3003
```

### API Endpoints

#### Frontend
- `GET /` - Main application
- `GET /ai-chat` - AI chat interface
- `GET /dashboard` - Analytics dashboard
- `GET /health` - Health check

#### Bitquery Service
- `GET /api/prices/:token` - Token price data
- `GET /api/tokens/trending` - Trending tokens
- `GET /health` - Service health

#### ElizaOS Agents
- `GET /api/agents/status` - Agent status
- `POST /api/agents/start` - Start agents
- `POST /api/agents/stop` - Stop agents
- `GET /health` - Service health

#### Data Scrapers
- `GET /api/tiktok/trending` - TikTok trends
- `POST /api/tiktok/scrape` - Scrape TikTok data
- `GET /api/telegram/channels` - Telegram channels
- `POST /api/telegram/scrape` - Scrape Telegram
- `GET /api/outlight/data` - Outlight data
- `POST /api/outlight/scrape` - Scrape Outlight
- `GET /api/scrapers/status` - Scraper status
- `GET /health` - Service health

## 📊 Monitoring

### Health Checks

All services provide health check endpoints:

```bash
# Check overall platform health
curl https://your-app.railway.app/health

# Check individual services
curl https://your-app.railway.app/api/agents/status
curl https://your-app.railway.app/api/scrapers/status
```

### Logs

View logs in Railway dashboard:
- Go to your project
- Click on the service
- View logs in real-time

### Metrics

Railway provides built-in metrics:
- CPU usage
- Memory usage
- Network traffic
- Response times

## 🔄 Deployment Process

### Build Process

1. **Install Dependencies**: All services install their dependencies
2. **Build Frontend**: Next.js production build
3. **Start Services**: All services start in priority order
4. **Health Checks**: Verify all services are running

### Startup Order

1. **Frontend** (Priority 1) - Main web interface
2. **Bitquery Service** (Priority 2) - Blockchain data
3. **ElizaOS Agents** (Priority 3) - AI automation
4. **Data Scrapers** (Priority 4) - Data collection

## 🛠️ Customization

### Adding New Services

1. Create service directory
2. Add `railway-start.js` with Express server
3. Add `package.json` with dependencies
4. Update `railway-start.js` to include new service
5. Update environment variables

### Modifying Existing Services

Each service can be customized independently:
- **Frontend**: Modify `frontend/` directory
- **Bitquery**: Modify `bitquery/` directory
- **Agents**: Modify `elizaos-agents/` directory
- **Scrapers**: Modify `js-scraper/` directory

## 🚨 Troubleshooting

### Common Issues

1. **Build Timeout (Puppeteer/Chromium)**:
   - ✅ **FIXED**: Puppeteer is now optional dependency
   - ✅ **FIXED**: Scrapers use API-based approach
   - ✅ **FIXED**: Chromium download is skipped
   - Environment variables: `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true`

2. **Build Failures**:
   - Check Node.js version (requires 18+)
   - Verify all dependencies are installed
   - Check environment variables
   - Use `--frozen-lockfile` for consistent builds

3. **Service Not Starting**:
   - Check logs for specific errors
   - Verify port configuration
   - Check environment variables

4. **Database Connection Issues**:
   - Verify Supabase credentials
   - Check database schema
   - Run RLS fixes if needed

### Build Optimization

The platform now uses a lightweight approach:
- **Puppeteer**: Optional dependency (skipped on Railway)
- **Scrapers**: API-based instead of browser automation
- **Build Time**: Reduced from ~5 minutes to ~2 minutes
- **Memory Usage**: Reduced by ~200MB

### Debug Commands

```bash
# Check service status
railway status

# View logs
railway logs

# Connect to service
railway shell

# Check environment variables
railway variables
```

## 📈 Scaling

### Horizontal Scaling

Railway automatically handles:
- Load balancing
- Health checks
- Auto-restart on failures
- Resource allocation

### Vertical Scaling

Adjust resources in Railway dashboard:
- CPU allocation
- Memory allocation
- Storage allocation

## 🔒 Security

### Environment Variables

- Never commit API keys to repository
- Use Railway's environment variable system
- Rotate keys regularly

### Database Security

- Enable Row Level Security (RLS)
- Use service role for server-side operations
- Implement proper authentication

## 📞 Support

### Railway Support

- [Railway Documentation](https://docs.railway.app)
- [Railway Discord](https://discord.gg/railway)
- [Railway GitHub](https://github.com/railwayapp)

### Wojat Platform

- Check logs for specific errors
- Verify all services are running
- Test API endpoints individually

## 🎉 Success!

Once deployed, your Wojat platform will be available at:
`https://your-app.railway.app`

The platform includes:
- ✅ Web interface for memecoin hunting
- ✅ AI-powered chat assistant
- ✅ Real-time blockchain data
- ✅ Social media automation
- ✅ Data scraping services
- ✅ Analytics dashboard

Happy memecoin hunting! 🚀
