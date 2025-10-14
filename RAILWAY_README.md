# 🚂 Wojat Platform - Railway Deployment Ready

The Wojat memecoin hunting platform is now fully configured for Railway deployment with all services running simultaneously.

## 🚀 **Quick Start**

### **Deploy to Railway:**
1. **Connect Repository**: Link your GitHub repo to Railway
2. **Set Environment Variables**: Add all variables from `railway.env.example`
3. **Deploy**: Railway automatically runs `yarn wojat:railway`
4. **Access**: Your frontend will be available at the Railway domain

### **Local Testing:**
```bash
# Test Railway configuration locally
yarn wojat:railway

# Or use the regular development command
yarn wojat
```

## 🏗️ **Architecture**

### **Services Deployed:**
- **Frontend** (Next.js) - Main web interface at Railway domain
- **Bitquery Service** - Solana blockchain data collection
- **ElizaOS Agents** - AI trading and social media automation
- **TikTok Scraper** - TikTok trend analysis and monitoring
- **Telegram Scraper** - Telegram channel monitoring
- **Outlight Scraper** - Additional data source scraping

### **Configuration Files:**
- `railway.json` - Railway deployment configuration
- `nixpacks.toml` - Build and dependency management
- `railway-start.js` - Multi-service orchestrator
- `Procfile` - Alternative process definition
- `railway.env.example` - Complete environment template

## 🔧 **Environment Variables**

All environment variables are centralized and automatically distributed to all services:

### **Required Variables:**
```env
# Supabase Database
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI AI Services
OPENAI_API_KEY=your_openai_api_key

# Bitquery Blockchain Data
BITQUERY_API_KEY=your_bitquery_api_key
ACCESS_TOKEN=your_bitquery_access_token

# Twitter Social Media
CONSUMER_KEY=your_twitter_consumer_key
CONSUMER_SECRET=your_twitter_consumer_secret
ZORO_ACCESS_TOKEN=your_twitter_access_token
ZORO_ACCESS_TOKEN_SECRET=your_twitter_access_token_secret

# Telegram Integration
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHANNEL_ID=your_telegram_channel_id
TELEGRAM_GROUP_ID=your_telegram_group_id

# Discord Integration
DISCORD_BOT_TOKEN=your_discord_bot_token
DISCORD_GUILD_ID=your_discord_guild_id
DISCORD_ANNOUNCEMENT_CHANNEL_ID=your_announcement_channel_id
DISCORD_TRADING_CHANNEL_ID=your_trading_channel_id
DISCORD_VOICE_CHANNEL_ID=your_voice_channel_id

# Solana Blockchain
SOLANA_PRIVATE_KEY=your_base58_private_key
SOLANA_PUBLIC_KEY=your_public_key
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
SOLANA_CLUSTER=mainnet-beta
```

## 📊 **Features**

### **Multi-Service Orchestration:**
- All services start simultaneously
- Automatic service restart on failure
- Centralized logging and monitoring
- Environment variable distribution

### **Production Ready:**
- Optimized build process
- Health checks and monitoring
- Graceful shutdown handling
- Error recovery mechanisms

### **Access Points:**
- **Main App**: `https://your-app.railway.app`
- **AI Chat**: `https://your-app.railway.app/ai-chat`
- **Dashboard**: `https://your-app.railway.app/dashboard`
- **Trending Coins**: `https://your-app.railway.app/trending-coins`

## 🚨 **Troubleshooting**

### **Common Issues:**

1. **Services Not Starting:**
   - Verify all environment variables are set
   - Check Railway logs for specific errors
   - Ensure API keys are valid and active

2. **Frontend Not Accessible:**
   - Confirm PORT environment variable is set
   - Check Railway public domain assignment
   - Verify frontend build completed successfully

3. **Database Connection Issues:**
   - Verify Supabase URL and keys
   - Check database permissions and RLS policies
   - Ensure database schema is properly set up

### **Debug Commands:**
```bash
# Test Railway configuration locally
yarn wojat:railway

# Test individual services
cd frontend && yarn start
cd elizaos-agents && node phase2-orchestrator.js
cd js-scraper && node index.mjs
cd bitquery && node index.mjs
```

## 📈 **Monitoring**

### **Railway Dashboard:**
- Real-time logs for all services
- Resource usage monitoring
- Deployment status tracking
- Environment variable management

### **Service Health:**
- Automatic restart on failure
- Health check endpoints
- Performance monitoring
- Error tracking and reporting

## 🔄 **Updates & Maintenance**

### **Deploying Updates:**
1. Push changes to GitHub
2. Railway automatically redeploys
3. Services restart with new code
4. Environment variables persist

### **Scaling:**
- Railway handles automatic scaling
- Monitor resource usage
- Upgrade plan for higher traffic
- Load balancing included

## 🎯 **Production Checklist**

- [ ] All environment variables configured
- [ ] Supabase database set up with schema
- [ ] API keys tested and working
- [ ] Frontend accessible via Railway domain
- [ ] All services running without errors
- [ ] Monitoring and logging configured
- [ ] Backup strategy implemented

## 🎉 **Success!**

Your Wojat platform is now:
- ✅ **Railway Ready** - Fully configured for deployment
- ✅ **Multi-Service** - All services running simultaneously
- ✅ **Production Ready** - Optimized for live deployment
- ✅ **Scalable** - Automatic scaling and monitoring
- ✅ **Maintainable** - Easy updates and management

**Deploy to Railway and start hunting memecoins!** 🚀💰
