# 🚀 Wojat Platform - Render Deployment Checklist

## Pre-Deployment Setup

### ✅ **1. Environment Variables**
Set these in your Render dashboard:

**Core:**
- [ ] `NODE_ENV=production`
- [ ] `PORT=3000`

**AI Services:**
- [ ] `OPENAI_API_KEY=your_openai_api_key`

**Database:**
- [ ] `SUPABASE_URL=your_supabase_url`
- [ ] `SUPABASE_ANON_KEY=your_supabase_anon_key`

**Blockchain Data:**
- [ ] `BITQUERY_API_KEY=your_bitquery_api_key`
- [ ] `ACCESS_TOKEN=your_bitquery_access_token`

**Twitter Integration:**
- [ ] `CONSUMER_KEY=your_twitter_consumer_key`
- [ ] `CONSUMER_SECRET=your_twitter_consumer_secret`
- [ ] `ZORO_ACCESS_TOKEN=your_twitter_access_token`
- [ ] `ZORO_ACCESS_TOKEN_SECRET=your_twitter_access_token_secret`

**Solana (Optional):**
- [ ] `SOLANA_PRIVATE_KEY=your_base58_private_key`
- [ ] `SOLANA_PUBLIC_KEY=your_public_key`
- [ ] `SOLANA_RPC_URL=https://api.mainnet-beta.solana.com`

### ✅ **2. Repository Setup**
- [ ] Code pushed to GitHub
- [ ] All files committed
- [ ] Repository is public or Render has access

### ✅ **3. Local Testing**
- [ ] `npm run build:render` runs successfully
- [ ] `node server.js` starts locally
- [ ] Frontend builds without errors
- [ ] All services can start

## Render Deployment

### ✅ **4. Create Web Service**
- [ ] Go to [render.com/dashboard](https://render.com/dashboard)
- [ ] Click "New +" → "Web Service"
- [ ] Connect GitHub repository
- [ ] Select correct repository

### ✅ **5. Configure Service**
- [ ] **Name**: `wojat-platform`
- [ ] **Environment**: `Node`
- [ ] **Region**: Choose appropriate region
- [ ] **Branch**: `main` (or your default branch)

### ✅ **6. Build Settings**
- [ ] **Build Command**: 
  ```bash
  npm install && cd frontend && npm install && npm run build && cd ../elizaos-agents && npm install && cd ../js-scraper && npm install && cd ../bitquery && npm install
  ```
- [ ] **Start Command**: 
  ```bash
  node server.js
  ```

### ✅ **7. Environment Variables**
- [ ] Add all required environment variables
- [ ] Mark sensitive ones as "Secret"
- [ ] Verify all values are correct

### ✅ **8. Deploy**
- [ ] Click "Create Web Service"
- [ ] Wait for build to complete
- [ ] Monitor build logs for errors

## Post-Deployment Verification

### ✅ **9. Health Check**
- [ ] Visit: `https://your-app-name.onrender.com/health`
- [ ] Response shows all services running
- [ ] No error messages in response

### ✅ **10. Frontend Access**
- [ ] Visit: `https://your-app-name.onrender.com`
- [ ] Frontend loads correctly
- [ ] No console errors
- [ ] All pages accessible

### ✅ **11. API Endpoints**
- [ ] `/api/status` returns service status
- [ ] `/health` returns health information
- [ ] No 404 or 500 errors

### ✅ **12. Background Services**
- [ ] Check logs for service startup messages
- [ ] Verify all services are running
- [ ] No service crashes in logs

## Monitoring & Maintenance

### ✅ **13. Logs Monitoring**
- [ ] Check service logs regularly
- [ ] Set up log monitoring
- [ ] Watch for error patterns

### ✅ **14. Performance Monitoring**
- [ ] Monitor resource usage
- [ ] Check response times
- [ ] Monitor uptime

### ✅ **15. Updates & Maintenance**
- [ ] Test updates locally first
- [ ] Deploy updates during low traffic
- [ ] Monitor after each update
- [ ] Keep dependencies updated

## Troubleshooting

### ❌ **Common Issues & Solutions**

**Build Fails:**
- [ ] Check all package.json files exist
- [ ] Verify Node.js version compatibility
- [ ] Check build logs for specific errors

**Service Won't Start:**
- [ ] Verify all environment variables are set
- [ ] Check PORT is set to 3000
- [ ] Review startup logs for errors

**Frontend Not Loading:**
- [ ] Ensure frontend build completed
- [ ] Check frontend/out directory exists
- [ ] Verify static file serving

**Background Services Not Running:**
- [ ] Check service directories exist
- [ ] Verify package.json in each service
- [ ] Review service startup logs

## Success Criteria

### ✅ **Deployment is Successful When:**
- [ ] Health endpoint returns 200 OK
- [ ] Frontend loads without errors
- [ ] All background services are running
- [ ] No critical errors in logs
- [ ] API endpoints respond correctly
- [ ] Service stays running for 24+ hours

---

**🎉 Once all items are checked, your Wojat platform is successfully deployed!**

**Next Steps:**
1. Set up monitoring and alerts
2. Configure custom domain (optional)
3. Set up automated backups
4. Plan for scaling as needed
