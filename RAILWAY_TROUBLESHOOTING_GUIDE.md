# 🚨 Railway Deployment Troubleshooting Guide

## 🔍 **Common Issues and Solutions**

### **1. Dockerfile Not Found Error**
**Error**: `Dockerfile 'Dockerfile' does not exist`

**Solutions**:
- ✅ **Verify Dockerfile exists**: Check that `Dockerfile` exists in the service directory
- ✅ **Check file permissions**: Ensure Dockerfile is readable
- ✅ **Verify railway.json**: Ensure `dockerfilePath` is correctly specified
- ✅ **Use railway.toml**: Alternative configuration file for Railway

**Files to check**:
```
frontend/Dockerfile ✅
bitquery/Dockerfile ✅
elizaos-agents/Dockerfile ✅
js-scraper/Dockerfile-telegram ✅
js-scraper/Dockerfile-outlight ✅
js-scraper/Dockerfile-tiktok ✅
```

### **2. Node.js Version Compatibility**
**Error**: `@solana/codecs-numbers@2.3.0: The engine "node" is incompatible with this module. Expected version ">=20.18.0". Got "18.20.5"`

**Solutions**:
- ✅ **Use Dockerfiles**: All Dockerfiles specify `FROM node:20-alpine`
- ✅ **Check railway.json**: Ensure `"builder": "DOCKERFILE"` is set
- ✅ **Verify .railwayignore**: Prevents Nixpacks from being used
- ✅ **Use railway.toml**: Alternative configuration approach

### **3. Railway Still Using Nixpacks**
**Issue**: Railway ignores Dockerfile and uses Nixpacks instead

**Solutions**:
- ✅ **Add .railwayignore**: Prevents Nixpacks detection
- ✅ **Use railway.toml**: More explicit configuration
- ✅ **Check railway.json**: Ensure correct builder specification
- ✅ **Manual override**: Set builder in Railway dashboard

### **4. Build Context Issues**
**Error**: Build fails due to missing files or incorrect context

**Solutions**:
- ✅ **Use .dockerignore**: Exclude unnecessary files
- ✅ **Check file paths**: Ensure all required files are included
- ✅ **Verify COPY commands**: Check Dockerfile COPY instructions
- ✅ **Test locally**: Use `docker build` to test locally

## 🛠️ **Step-by-Step Fix Process**

### **Step 1: Verify Configuration Files**
```bash
# Check if all required files exist
ls -la frontend/Dockerfile
ls -la bitquery/Dockerfile
ls -la elizaos-agents/Dockerfile
ls -la js-scraper/Dockerfile-*

# Check railway.json files
cat frontend/railway.json
cat bitquery/railway.json
cat elizaos-agents/railway.json
```

### **Step 2: Test Docker Build Locally**
```bash
# Test frontend build
cd frontend
docker build -t wojat-frontend .
docker run -p 3000:3000 wojat-frontend

# Test bitquery build
cd ../bitquery
docker build -t wojat-bitquery .
docker run -p 3001:3001 wojat-bitquery
```

### **Step 3: Deploy to Railway**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Deploy services
./deploy-railway.sh frontend
./deploy-railway.sh bitquery
./deploy-railway.sh elizaos
```

### **Step 4: Verify Deployment**
```bash
# Check service health
curl https://your-frontend.railway.app/api/health
curl https://your-bitquery.railway.app/health
curl https://your-elizaos.railway.app/health
```

## 🔧 **Configuration Files Reference**

### **railway.json (Primary)**
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "DOCKERFILE",
    "dockerfilePath": "Dockerfile"
  },
  "deploy": {
    "healthcheckPath": "/health",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### **railway.toml (Alternative)**
```toml
[build]
builder = "dockerfile"
dockerfilePath = "Dockerfile"

[deploy]
healthcheckPath = "/health"
healthcheckTimeout = 100
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 10
```

### **.railwayignore (Prevents Nixpacks)**
```
# Ignore nixpacks files
.nixpacks.toml
nixpacks.toml

# Ignore package manager files that might trigger Nixpacks
package-lock.json
yarn.lock
```

## 🚀 **Deployment Commands**

### **Using Railway CLI**
```bash
# Deploy individual services
railway deploy --service frontend
railway deploy --service bitquery
railway deploy --service elizaos-agents

# Deploy with specific Dockerfile
cd js-scraper
railway deploy --dockerfile Dockerfile-telegram
```

### **Using Deployment Scripts**
```bash
# Deploy all services (Linux/Mac)
./deploy-railway.sh

# Deploy specific service (Linux/Mac)
./deploy-railway.sh frontend

# Deploy all services (Windows)
deploy-railway.bat

# Deploy specific service (Windows)
deploy-railway.bat frontend
```

## 📊 **Health Check Endpoints**

All services include health check endpoints:
- **Frontend**: `GET /api/health`
- **Bitquery**: `GET /health`
- **ElizaOS Agents**: `GET /health`
- **Telegram Scraper**: `GET /health`
- **Outlight Scraper**: `GET /health`
- **TikTok Scraper**: `GET /health`

## 🔍 **Debugging Commands**

### **Check Railway Service Status**
```bash
# List all services
railway status

# Check specific service logs
railway logs --service frontend

# Check service environment
railway variables --service frontend
```

### **Test Docker Build Locally**
```bash
# Build and test frontend
cd frontend
docker build -t wojat-frontend .
docker run -p 3000:3000 -e NODE_ENV=production wojat-frontend

# Test health endpoint
curl http://localhost:3000/api/health
```

### **Check Node.js Version**
```bash
# In Railway logs, look for:
# "Node.js version: v20.x.x"

# Or check via health endpoint
curl https://your-service.railway.app/health
# Should show Node.js version in response
```

## ✅ **Success Indicators**

Your deployment is successful when:
- ✅ All services build without errors
- ✅ Health check endpoints return `200 OK`
- ✅ Services show "healthy" status in Railway dashboard
- ✅ Node.js version is 20.x.x in logs
- ✅ No Nixpacks-related errors in build logs

## 🆘 **Still Having Issues?**

If you're still experiencing problems:

1. **Check Railway Dashboard**: Look at build logs for specific errors
2. **Verify Environment Variables**: Ensure all required env vars are set
3. **Test Locally**: Use Docker Compose to test all services locally
4. **Check Dependencies**: Ensure all package.json files have correct dependencies
5. **Review Logs**: Check Railway service logs for runtime errors

## 📞 **Support Resources**

- **Railway Documentation**: https://docs.railway.app
- **Railway Discord**: https://discord.gg/railway
- **Docker Documentation**: https://docs.docker.com
- **Node.js Documentation**: https://nodejs.org/docs
