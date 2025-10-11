# 🚀 Quick Deploy Guide - Wojat Platform to Render.com

## ⚡ **Fast Track Deployment (5 minutes)**

### **Step 1: Prepare Your Repository**
```bash
# Make sure all files are committed
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

### **Step 2: Create Render Service**
1. Go to [render.com/dashboard](https://render.com/dashboard)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select the repository containing Wojat

### **Step 3: Configure Service**
- **Name**: `wojat-platform`
- **Environment**: `Node`
- **Region**: Choose closest to your users
- **Branch**: `main`

### **Step 4: Set Build & Start Commands**
- **Build Command**:
  ```bash
  npm install --legacy-peer-deps && cd frontend && npm install --legacy-peer-deps && npm run build && cd ../elizaos-agents && npm install --legacy-peer-deps && cd ../js-scraper && npm install --legacy-peer-deps && cd ../bitquery && npm install --legacy-peer-deps
  ```
- **Start Command**:
  ```bash
  node server.js
  ```

### **Step 5: Add Environment Variables**
Add these in Render dashboard under "Environment Variables":

**Required:**
```env
NODE_ENV=production
PORT=3000
OPENAI_API_KEY=your_openai_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Optional (for full functionality):**
```env
BITQUERY_API_KEY=your_bitquery_api_key
ACCESS_TOKEN=your_bitquery_access_token
CONSUMER_KEY=your_twitter_consumer_key
CONSUMER_SECRET=your_twitter_consumer_secret
ZORO_ACCESS_TOKEN=your_twitter_access_token
ZORO_ACCESS_TOKEN_SECRET=your_twitter_access_token_secret
SOLANA_PRIVATE_KEY=your_base58_private_key
SOLANA_PUBLIC_KEY=your_public_key
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
```

### **Step 6: Deploy**
1. Click **"Create Web Service"**
2. Wait for build to complete (5-10 minutes)
3. Your app will be available at `https://wojat-platform.onrender.com`

## ✅ **Verify Deployment**

### **Health Check**
Visit: `https://your-app-name.onrender.com/health`

Should return:
```json
{
  "status": "healthy",
  "services": {
    "frontend": "running",
    "phase2": "running",
    "phase4": "running",
    "scraper": "running"
  }
}
```

### **Frontend**
Visit: `https://your-app-name.onrender.com`

Should show the Wojat platform interface.

## 🛠️ **Troubleshooting**

### **Build Fails**
- Check that all environment variables are set
- Verify your GitHub repository is accessible
- Check build logs in Render dashboard

### **Service Won't Start**
- Ensure `PORT=3000` is set
- Check that all required environment variables are configured
- Review startup logs

### **Frontend Not Loading**
- Verify frontend build completed successfully
- Check that `frontend/out` directory was created
- Ensure static file serving is working

## 📊 **What's Included**

Your deployed Wojat platform includes:

- ✅ **Frontend**: Next.js web interface
- ✅ **Phase 2**: Twitter automation (if Twitter credentials provided)
- ✅ **Phase 4**: AI trading system (if Solana credentials provided)
- ✅ **Data Collection**: TikTok scraper (if Bitquery credentials provided)
- ✅ **Health Monitoring**: Built-in health checks
- ✅ **API Endpoints**: Status and health endpoints

## 🎯 **Next Steps**

1. **Test all features** with your environment variables
2. **Set up monitoring** using Render's built-in tools
3. **Configure custom domain** (optional)
4. **Scale up** if needed (upgrade Render plan)

---

**🎉 That's it! Your Wojat platform is now live on Render.com!**

**Need help?** Check the full [RENDER_DEPLOYMENT_GUIDE.md](./RENDER_DEPLOYMENT_GUIDE.md) for detailed instructions.
