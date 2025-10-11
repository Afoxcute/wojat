# 🚀 Wojat Platform - Render.com Deployment Guide

This guide will help you deploy the Wojat memecoin hunting platform to Render.com as a single web service.

## 📋 Prerequisites

1. **Render.com Account**: Sign up at [render.com](https://render.com)
2. **GitHub Repository**: Push your code to GitHub
3. **Environment Variables**: Prepare all required API keys and credentials

## 🔧 Required Environment Variables

Set these in your Render dashboard under "Environment Variables":

### **Core Services**
```env
NODE_ENV=production
PORT=3000
```

### **AI Services**
```env
OPENAI_API_KEY=your_openai_api_key
```

### **Database (Supabase)**
```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### **Blockchain Data (Bitquery)**
```env
BITQUERY_API_KEY=your_bitquery_api_key
ACCESS_TOKEN=your_bitquery_access_token
```

### **Twitter Integration**
```env
CONSUMER_KEY=your_twitter_consumer_key
CONSUMER_SECRET=your_twitter_consumer_secret
ZORO_ACCESS_TOKEN=your_twitter_access_token
ZORO_ACCESS_TOKEN_SECRET=your_twitter_access_token_secret
```

### **Solana Integration (Optional)**
```env
SOLANA_PRIVATE_KEY=your_base58_private_key
SOLANA_PUBLIC_KEY=your_public_key
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
```

### **Enhanced RPC Services (Optional)**
```env
HELIUS_API_KEY=your_helius_api_key
BIRDEYE_API_KEY=your_birdeye_api_key
```

## 🚀 Deployment Steps

### **Method 1: Using Render Dashboard (Recommended)**

1. **Connect Repository**
   - Go to [render.com/dashboard](https://render.com/dashboard)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository containing Wojat

2. **Configure Service**
   - **Name**: `wojat-platform`
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)

3. **Build & Deploy Settings**
   - **Build Command**: 
     ```bash
     npm install && cd frontend && npm install && npm run build && cd ../elizaos-agents && npm install && cd ../js-scraper && npm install && cd ../bitquery && npm install
     ```
   - **Start Command**: 
     ```bash
     node server.js
     ```

4. **Environment Variables**
   - Add all the environment variables listed above
   - Mark sensitive ones as "Secret"

5. **Deploy**
   - Click "Create Web Service"
   - Wait for build to complete (5-10 minutes)
   - Your service will be available at `https://wojat-platform.onrender.com`

### **Method 2: Using render.yaml (Alternative)**

1. **Add render.yaml to your repository** (already created)
2. **Deploy from GitHub**
   - Connect repository in Render dashboard
   - Render will automatically detect the `render.yaml` file
   - Follow the prompts to deploy

### **Method 3: Using Docker (Advanced)**

1. **Dockerfile is already created** in your repository
2. **Deploy as Docker service**
   - Select "Docker" as environment in Render
   - Render will use the Dockerfile automatically

## 🔍 Post-Deployment Verification

### **Health Check**
Visit: `https://your-app-name.onrender.com/health`

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "services": {
    "frontend": "running",
    "phase2": "running",
    "phase4": "running",
    "scraper": "running"
  },
  "uptime": 123.456
}
```

### **Frontend Access**
Visit: `https://your-app-name.onrender.com`

### **API Endpoints**
- **Status**: `https://your-app-name.onrender.com/api/status`
- **Health**: `https://your-app-name.onrender.com/health`

## 🛠️ Troubleshooting

### **Common Issues**

1. **Build Fails**
   - Check that all dependencies are in package.json files
   - Verify Node.js version compatibility
   - Check build logs in Render dashboard

2. **Service Won't Start**
   - Verify all environment variables are set
   - Check that PORT is set to 3000
   - Review startup logs

3. **Frontend Not Loading**
   - Ensure frontend build completed successfully
   - Check that `frontend/out` directory exists
   - Verify static file serving configuration

4. **Background Services Not Running**
   - Check that all service directories exist
   - Verify package.json files in each service directory
   - Review service startup logs

### **Logs and Monitoring**

1. **View Logs**
   - Go to your service dashboard
   - Click "Logs" tab
   - Monitor real-time output

2. **Service Status**
   - Check "Metrics" tab for resource usage
   - Monitor "Events" for deployment history

## 🔧 Customization

### **Scaling**
- **Starter Plan**: 1 instance, 512MB RAM
- **Standard Plan**: 1+ instances, 1GB RAM
- **Pro Plan**: Multiple instances, 2GB+ RAM

### **Custom Domain**
1. Go to service settings
2. Add custom domain
3. Update DNS records as instructed

### **Environment-Specific Configs**
- **Development**: Use different environment variables
- **Staging**: Create separate Render service
- **Production**: Use production environment variables

## 📊 Monitoring and Maintenance

### **Health Monitoring**
- Set up uptime monitoring for your health endpoint
- Monitor service logs for errors
- Set up alerts for service failures

### **Updates**
- Push changes to your GitHub repository
- Render will automatically redeploy
- Monitor deployment logs for issues

### **Backup**
- Database backups (if using external database)
- Environment variable backup
- Code repository backup (GitHub)

## 🎯 Production Checklist

- [ ] All environment variables configured
- [ ] Frontend builds successfully
- [ ] All services start without errors
- [ ] Health check endpoint responds
- [ ] Frontend loads correctly
- [ ] API endpoints work
- [ ] Background services running
- [ ] Custom domain configured (if needed)
- [ ] Monitoring set up
- [ ] SSL certificate active

## 🆘 Support

If you encounter issues:

1. **Check Render Documentation**: [render.com/docs](https://render.com/docs)
2. **Review Service Logs**: Look for error messages
3. **Verify Environment Variables**: Ensure all required vars are set
4. **Test Locally**: Run `node server.js` locally first
5. **Contact Support**: Use Render's support channels

---

**🎉 Your Wojat platform should now be running on Render.com!**

Visit your service URL to start hunting for memecoins! 🚀
