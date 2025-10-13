# 🚀 Wojat Platform - Railway Deployment Guide

Complete guide for deploying all Wojat services on Railway.

## 📋 Services Overview

| Service | Port | Railway Config | Description |
|---------|------|---------------|-------------|
| **Frontend** | 3000 | `frontend/railway.json` | Next.js web application |
| **Bitquery** | 3001 | `bitquery/railway.json` | Blockchain data service |
| **ElizaOS Agents** | 3002 | `elizaos-agents/railway.json` | AI agents and automation |
| **Telegram Scraper** | 3003 | `js-scraper/telegram-railway.json` | Telegram data collection |
| **Outlight Scraper** | 3004 | `js-scraper/outlight-railway.json` | Outlight data collection |
| **TikTok Scraper** | 3005 | `js-scraper/tiktok-railway.json` | TikTok data collection |

## 🛠️ Prerequisites

1. **Railway Account**: Sign up at [railway.app](https://railway.app)
2. **GitHub Repository**: Push your Wojat code to GitHub
3. **Environment Variables**: Prepare all required API keys and secrets

## 🚀 Deployment Steps

### 1. **Deploy Frontend Service**

```bash
# In Railway Dashboard:
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your Wojat repository
4. Select "frontend" folder as root directory
5. Railway will auto-detect Next.js and deploy
```

**Environment Variables:**
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key
NODE_ENV=production
```

### 2. **Deploy Bitquery Service**

```bash
# In Railway Dashboard:
1. Click "New Service"
2. Select "Deploy from GitHub repo"
3. Choose your Wojat repository
4. Select "bitquery" folder as root directory
5. Railway will auto-detect Node.js and deploy
```

**Environment Variables:**
```env
BITQUERY_API_KEY=your_bitquery_api_key
ACCESS_TOKEN=your_bitquery_access_token
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
NODE_ENV=production
```

### 3. **Deploy ElizaOS Agents Service**

```bash
# In Railway Dashboard:
1. Click "New Service"
2. Select "Deploy from GitHub repo"
3. Choose your Wojat repository
4. Select "elizaos-agents" folder as root directory
5. Railway will auto-detect Node.js and deploy
```

**Environment Variables:**
```env
OPENAI_API_KEY=your_openai_api_key
SOLANA_PRIVATE_KEY=your_base58_private_key
SOLANA_PUBLIC_KEY=your_public_key
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
CONSUMER_KEY=your_twitter_consumer_key
CONSUMER_SECRET=your_twitter_consumer_secret
ZORO_ACCESS_TOKEN=your_twitter_access_token
ZORO_ACCESS_TOKEN_SECRET=your_twitter_access_token_secret
NODE_ENV=production
```

### 4. **Deploy Scraper Services**

#### **Telegram Scraper**
```bash
# In Railway Dashboard:
1. Click "New Service"
2. Select "Deploy from GitHub repo"
3. Choose your Wojat repository
4. Select "js-scraper" folder as root directory
5. Set start command: node telegram-server.mjs
6. Railway will auto-detect Node.js and deploy
```

#### **Outlight Scraper**
```bash
# In Railway Dashboard:
1. Click "New Service"
2. Select "Deploy from GitHub repo"
3. Choose your Wojat repository
4. Select "js-scraper" folder as root directory
5. Set start command: node outlight-server.mjs
6. Railway will auto-detect Node.js and deploy
```

#### **TikTok Scraper**
```bash
# In Railway Dashboard:
1. Click "New Service"
2. Select "Deploy from GitHub repo"
3. Choose your Wojat repository
4. Select "js-scraper" folder as root directory
5. Set start command: node tiktok-server.mjs
6. Railway will auto-detect Node.js and deploy
```

**Environment Variables (All Scrapers):**
```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
CONSUMER_KEY=your_twitter_consumer_key
CONSUMER_SECRET=your_twitter_consumer_secret
ZORO_ACCESS_TOKEN=your_twitter_access_token
ZORO_ACCESS_TOKEN_SECRET=your_twitter_access_token_secret
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHANNEL_ID=your_telegram_channel_id
NODE_ENV=production
```

## 🔧 Service Configuration

### **Health Checks**
All services include health check endpoints:
- Frontend: `https://your-frontend.railway.app/api/health`
- Bitquery: `https://your-bitquery.railway.app/health`
- ElizaOS: `https://your-elizaos.railway.app/health`
- Scrapers: `https://your-scraper.railway.app/health`

### **Service URLs**
After deployment, update your frontend environment variables with the Railway URLs:
```env
NEXT_PUBLIC_BITQUERY_SERVICE_URL=https://your-bitquery-service.railway.app
NEXT_PUBLIC_ELIZAOS_SERVICE_URL=https://your-elizaos-service.railway.app
NEXT_PUBLIC_SCRAPER_SERVICE_URL=https://your-scraper-service.railway.app
```

## 📊 Monitoring & Management

### **Service Status**
Check service health:
```bash
curl https://your-service.railway.app/health
curl https://your-service.railway.app/status
```

### **Logs**
Monitor logs in Railway dashboard:
1. Go to your service
2. Click "Logs" tab
3. View real-time logs

### **Scaling**
Railway automatically scales based on traffic. For manual scaling:
1. Go to service settings
2. Adjust resource allocation
3. Set scaling policies

## 🔄 Continuous Deployment

Railway automatically redeploys when you push to your main branch:
1. Make changes to your code
2. Push to GitHub
3. Railway detects changes and redeploys
4. Services restart automatically

## 🛡️ Security & Environment

### **Environment Variables**
- Never commit `.env` files to Git
- Use Railway's environment variable management
- Rotate API keys regularly
- Use different keys for production/staging

### **Database Security**
- Enable RLS policies in Supabase
- Use service role keys only in backend services
- Implement proper authentication

## 🚨 Troubleshooting

### **Common Issues**

1. **Node.js Version Compatibility**
   - **Issue**: `@solana/codecs-numbers@2.3.0: The engine "node" is incompatible with this module. Expected version ">=20.18.0". Got "18.20.5"`
   - **Solution**: All services now use Node.js 20+ via Dockerfiles
   - **Files**: `Dockerfile` files explicitly specify `FROM node:20-alpine`
   - **Railway Config**: `railway.json` files use `"builder": "DOCKERFILE"`

2. **TypeScript Compilation Errors**
   - **Issue**: `'error' is of type 'unknown'` in health check routes
   - **Solution**: Fixed error handling with proper type checking
   - **Files**: `frontend/app/api/health/route.ts`

3. **Service Won't Start**
   - Check logs for missing dependencies
   - Verify environment variables
   - Ensure correct start command
   - Verify Node.js version compatibility

4. **Health Check Fails**
   - Verify health endpoint exists
   - Check if service is listening on correct port
   - Review service initialization

5. **Database Connection Issues**
   - Verify Supabase credentials
   - Check RLS policies
   - Ensure database is accessible

### **Debug Commands**
```bash
# Check service health
curl -v https://your-service.railway.app/health

# Check service status
curl -v https://your-service.railway.app/status

# View logs
# Use Railway dashboard logs tab

# Check Node.js version in container
docker exec -it <container_id> node --version
```

### **Dockerfile Deployment**
All services now use Dockerfiles to ensure Node.js 20 compatibility:

- **Frontend**: `frontend/Dockerfile`
- **Bitquery**: `bitquery/Dockerfile`
- **ElizaOS Agents**: `elizaos-agents/Dockerfile`
- **Telegram Scraper**: `js-scraper/Dockerfile-telegram`
- **Outlight Scraper**: `js-scraper/Dockerfile-outlight`
- **TikTok Scraper**: `js-scraper/Dockerfile-tiktok`

Each Dockerfile:
- Uses `FROM node:20-alpine` to ensure Node.js 20
- Includes health checks
- Optimizes for production deployment
- Handles dependencies properly

## 📈 Performance Optimization

### **Frontend**
- Enable Next.js optimizations
- Use CDN for static assets
- Implement caching strategies

### **Backend Services**
- Use connection pooling
- Implement rate limiting
- Optimize database queries

### **Scrapers**
- Implement proper delays
- Use batch processing
- Monitor API rate limits

## 🎯 Production Checklist

- [ ] All services deployed successfully
- [ ] Environment variables configured
- [ ] Health checks passing
- [ ] Database connections working
- [ ] API integrations functional
- [ ] Monitoring set up
- [ ] Security measures in place
- [ ] Performance optimized
- [ ] Backup strategy implemented
- [ ] Documentation updated

## 📞 Support

For Railway-specific issues:
- [Railway Documentation](https://docs.railway.app)
- [Railway Discord](https://discord.gg/railway)
- [Railway GitHub](https://github.com/railwayapp)

For Wojat platform issues:
- Check service logs
- Review environment configuration
- Verify API credentials
- Test health endpoints
