# 🚀 Railway Deployment - Dockerfile Path Fix

## 🎯 **Problem Solved**

**Issue**: Railway couldn't find Dockerfiles because they were in subdirectories
**Solution**: Updated Railway configurations to specify correct Dockerfile paths

## ✅ **Updated Railway Configurations**

All `railway.json` files now include the correct `dockerfilePath`:

- **Frontend**: `"dockerfilePath": "frontend/Dockerfile"`
- **Bitquery**: `"dockerfilePath": "bitquery/Dockerfile"`
- **ElizaOS**: `"dockerfilePath": "elizaos-agents/Dockerfile"`
- **Scrapers**: Already configured with correct paths

## 🚀 **Deployment Instructions**

### **Method 1: Deploy from Root Directory (Recommended)**

1. **Deploy Frontend Service:**
   ```
   Service Name: wojat-frontend
   Root Directory: . (root)
   Railway will use: frontend/Dockerfile
   ```

2. **Deploy Bitquery Service:**
   ```
   Service Name: wojat-bitquery
   Root Directory: . (root)
   Railway will use: bitquery/Dockerfile
   ```

3. **Deploy ElizaOS Agents Service:**
   ```
   Service Name: wojat-elizaos-agents
   Root Directory: . (root)
   Railway will use: elizaos-agents/Dockerfile
   ```

4. **Deploy Scraper Services:**
   ```
   Telegram Scraper:
   - Service Name: wojat-telegram-scraper
   - Root Directory: . (root)
   - Railway will use: js-scraper/Dockerfile-telegram

   Outlight Scraper:
   - Service Name: wojat-outlight-scraper
   - Root Directory: . (root)
   - Railway will use: js-scraper/Dockerfile-outlight

   TikTok Scraper:
   - Service Name: wojat-tiktok-scraper
   - Root Directory: . (root)
   - Railway will use: js-scraper/Dockerfile-tiktok
   ```

### **Method 2: Deploy from Service Directories**

Alternatively, you can deploy each service from its own directory:

1. **Frontend**: Set Root Directory to `frontend/`
2. **Bitquery**: Set Root Directory to `bitquery/`
3. **ElizaOS**: Set Root Directory to `elizaos-agents/`
4. **Scrapers**: Set Root Directory to `js-scraper/` and specify Dockerfile name

## 🔧 **Railway Dashboard Steps**

For each service:

1. **Create New Service** in Railway Dashboard
2. **Connect GitHub Repository** (your Wojat repo)
3. **Set Root Directory** to `.` (root) for Method 1, or service directory for Method 2
4. **Configure Environment Variables** (see deployment guide)
5. **Deploy**

## ✅ **Expected Results**

After deployment:
- ✅ Railway will find Dockerfiles using the specified paths
- ✅ All services will use Node.js 20
- ✅ Health checks will work
- ✅ Services will start successfully

## 🔍 **Verification**

Check deployment logs for:
- `FROM node:20-alpine` - Confirms Node.js 20 is being used
- `Successfully built` - Confirms Dockerfile was found
- Health check endpoints responding

## 📚 **Files Updated**

- `frontend/railway.json` - Added `dockerfilePath`
- `bitquery/railway.json` - Added `dockerfilePath`
- `elizaos-agents/railway.json` - Added `dockerfilePath`
- Scraper configurations already had correct paths

The Dockerfile path issue is now resolved!
