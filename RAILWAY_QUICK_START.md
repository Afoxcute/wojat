# 🚂 Railway Quick Start - Wojat Platform

## ⚡ One-Click Deployment

Your Wojat platform is now ready for Railway deployment! Here's how to deploy it in minutes:

### 🚀 Step 1: Deploy to Railway

1. **Push to GitHub**: Make sure your code is in a GitHub repository
2. **Go to Railway**: Visit [railway.app](https://railway.app) and sign in
3. **New Project**: Click "New Project" → "Deploy from GitHub repo"
4. **Select Repository**: Choose your Wojat repository
5. **Auto-Deploy**: Railway will automatically detect and deploy your app

### 🔧 Step 2: Set Environment Variables

In your Railway project dashboard, go to "Variables" and add:

```env
# Required
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key

# Frontend
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### ✅ Step 3: Done!

Your Wojat platform will be live at: `https://your-app.railway.app`

## 📋 What's Included

### ✅ Pre-configured Files
- `railway.json` - Railway deployment configuration
- `nixpacks.toml` - Build configuration
- `Procfile` - Process configuration
- `start-railway.js` - Railway-optimized startup script
- `frontend/app/api/health/route.ts` - Health check endpoint

### ✅ Features Deployed
- 🌐 **Frontend**: Next.js web interface
- 🤖 **AI Chat**: Conversational AI assistant
- 🐦 **Twitter Automation**: Social media posting
- 📊 **Data Collection**: TikTok and blockchain data
- 💰 **Trading System**: AI-powered trading (if configured)

## 🔧 Configuration Details

### Build Process
```bash
# Railway automatically runs:
npm install
cd frontend && npm install && npm run build
cd ../elizaos-agents && npm install
npm run start:railway
```

### Health Checks
- **Endpoint**: `/api/health`
- **Timeout**: 30 seconds
- **Auto-restart**: On failure (max 10 retries)

### Environment Variables
See `railway.env.example` for all available variables.

## 🚨 Troubleshooting

### Common Issues

1. **Build Fails**
   - Check that all dependencies are in package.json
   - Ensure Node.js 18+ compatibility

2. **App Won't Start**
   - Verify environment variables are set
   - Check Railway logs for errors

3. **Health Check Fails**
   - Ensure `/api/health` endpoint is accessible
   - Check that the app is listening on the correct port

### Debug Commands

```bash
# Test configuration locally
npm run test:railway

# Start with Railway config
npm run start:railway
```

## 📖 Full Documentation

For detailed setup instructions, see:
- `RAILWAY_DEPLOYMENT_GUIDE.md` - Complete deployment guide
- `README.md` - General platform information
- `QUICK_START.md` - Local development setup

## 🎉 Success!

Once deployed, your Wojat platform will be running with:
- ✅ Automatic HTTPS
- ✅ Auto-scaling
- ✅ Health monitoring
- ✅ Log aggregation
- ✅ Environment variable management

Happy memecoin hunting! 🚀
