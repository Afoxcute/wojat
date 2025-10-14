# 🚨 Railway Deployment Troubleshooting Guide

## ⏱️ **Build Timeout Issues**

### **Problem:**
```
Build timed out
sharing credentials for production-europe-west4-drams3a.railway-registry.com
```

### **Solution:**
1. **Use Fast Dockerfile** - Optimized for Railway with minimal dependencies
2. **Use Frontend-Only Dockerfile** - Fastest option, frontend only
3. **Increase build timeout** - Railway config now includes `buildTimeout: 1800`
4. **Skip optional dependencies** - Use `--ignore-optional` flag
5. **Disable ESLint during build** - Use `DISABLE_ESLINT_PLUGIN=true`

### **Quick Fix Options:**

#### **Option 1: Use Fast Dockerfile (Recommended)**
```bash
# On Windows
switch-dockerfile.bat
# Choose option 6 (Fast)

# On Linux/Mac
chmod +x switch-dockerfile.sh
./switch-dockerfile.sh
# Choose option 6 (Fast)
```

#### **Option 2: Use Frontend-Only Dockerfile (Fastest)**
```bash
# On Windows
switch-dockerfile.bat
# Choose option 7 (Frontend Only)

# On Linux/Mac
chmod +x switch-dockerfile.sh
./switch-dockerfile.sh
# Choose option 7 (Frontend Only)
```

#### **Option 3: Manual Dockerfile Switch**
```bash
# Backup current Dockerfile
mv Dockerfile Dockerfile.backup

# Use fast Dockerfile
mv Dockerfile.fast Dockerfile

# Commit and push
git add Dockerfile railway.json
git commit -m "Switch to fast Dockerfile for Railway"
git push origin main
```

## 🔧 **Lockfile Issues (Most Common)**

### **Problem:**
```
error Your lockfile needs to be updated, but yarn was run with `--frozen-lockfile`.
```

### **Solution:**
1. **Update lockfiles locally:**
   ```bash
   # On Windows
   update-lockfiles.bat
   
   # On Linux/Mac
   chmod +x update-lockfiles.sh
   ./update-lockfiles.sh
   ```

2. **Commit updated lockfiles:**
   ```bash
   git add yarn.lock frontend/yarn.lock elizaos-agents/yarn.lock js-scraper/yarn.lock bitquery/yarn.lock
   git commit -m "Update lockfiles for Railway deployment"
   git push origin main
   ```

3. **Redeploy on Railway:**
   - Railway will automatically redeploy when you push changes
   - The Docker build will now use the updated lockfiles

## 🐳 **Docker Build Issues**

### **Problem:**
```
fatal error: libudev.h: No such file or directory
#include <libudev.h>
compilation terminated.
```

### **Solution:**
1. **Use updated Dockerfile** - Now includes libudev development libraries
2. **USB libraries installed** - Dockerfile includes:
   ```dockerfile
   RUN apk add --no-cache \
       python3 \
       make \
       g++ \
       gcc \
       libc-dev \
       linux-headers \
       eudev-dev \
       libusb-dev
   ```

### **Problem:**
```
error /app/node_modules/usb: Command failed.
gyp ERR! find Python Python is not set from command line or npm configuration
gyp ERR! find Python You need to install the latest version of Python.
```

### **Solution:**
1. **Use updated Dockerfile** - Now includes Python and build tools
2. **Build dependencies installed** - Dockerfile includes:
   ```dockerfile
   RUN apk add --no-cache \
       python3 \
       make \
       g++ \
       gcc \
       libc-dev \
       linux-headers \
       eudev-dev \
       libusb-dev
   ```

### **Problem:**
```
⨯ ESLint: Failed to load config "@typescript-eslint/recommended" to extend from. Referenced from: /app/.eslintrc.js
Failed to compile.
app/api/health/route.ts
Type error: File '/app/frontend/app/api/health/route.ts' is not a module.
```

### **Solution:**
1. **Fixed ESLint configuration** - Removed problematic `@typescript-eslint/recommended` extension
2. **Created proper health route** - Added valid Next.js API route content
3. **Disabled ESLint during build** - Dockerfiles now use `DISABLE_ESLINT_PLUGIN=true`
4. **Updated Dockerfiles** - All versions now skip ESLint during build process

### **Problem:**
```
error @iqai/adk@0.3.7: The engine "node" is incompatible with this module. Expected version ">=22.0". Got "20.19.5"
```

### **Solution:**
1. **Use Node.js 22** - Updated Dockerfile uses `node:22-alpine`
2. **Check Node.js version requirements** in package.json:
   ```json
   "engines": {
     "node": ">=22.0.0"
   }
   ```

### **Problem:**
```
error @solana/codecs-numbers@2.3.0: The engine "node" is incompatible with this module. Expected version ">=20.18.0". Got "18.20.8"
```

### **Solution:**
1. **Use Node.js 20** - Updated Dockerfile uses `node:20-alpine`
2. **Check Node.js version requirements** in package.json:
   ```json
   "engines": {
     "node": ">=20.18.0"
   }
   ```

### **Problem:**
```
npm error EEXIST: file already exists
npm error File exists: /usr/local/bin/yarnpkg
```

### **Solution:**
1. **Use the updated Dockerfile** (yarn is already installed in node:18-alpine)
2. **Alternative: Use npm-based Dockerfile:**
   ```bash
   # Rename Dockerfile to Dockerfile.yarn
   mv Dockerfile Dockerfile.yarn
   # Use npm version
   mv Dockerfile.npm Dockerfile
   ```

3. **Or use the robust version:**
   ```bash
   # Use the robust Dockerfile
   mv Dockerfile.robust Dockerfile
   ```

### **Problem:**
Docker build fails during dependency installation

### **Solution:**
1. **Check Dockerfile syntax:**
   ```bash
   docker build -t wojat-test .
   ```

2. **Verify all package.json files exist:**
   - `package.json` (root)
   - `frontend/package.json`
   - `elizaos-agents/package.json`
   - `js-scraper/package.json`
   - `bitquery/package.json`

3. **Check .dockerignore:**
   - Ensure it's not excluding necessary files
   - Verify node_modules are excluded

## 🌐 **Environment Variable Issues**

### **Problem:**
Services fail to start due to missing environment variables

### **Solution:**
1. **Verify all required variables are set in Railway:**
   ```env
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   OPENAI_API_KEY=your_openai_api_key
   BITQUERY_API_KEY=your_bitquery_api_key
   ACCESS_TOKEN=your_bitquery_access_token
   CONSUMER_KEY=your_twitter_consumer_key
   CONSUMER_SECRET=your_twitter_consumer_secret
   ZORO_ACCESS_TOKEN=your_twitter_access_token
   ZORO_ACCESS_TOKEN_SECRET=your_twitter_access_token_secret
   TELEGRAM_BOT_TOKEN=your_telegram_bot_token
   TELEGRAM_CHANNEL_ID=your_telegram_channel_id
   TELEGRAM_GROUP_ID=your_telegram_group_id
   DISCORD_BOT_TOKEN=your_discord_bot_token
   DISCORD_GUILD_ID=your_discord_guild_id
   DISCORD_ANNOUNCEMENT_CHANNEL_ID=your_announcement_channel_id
   DISCORD_TRADING_CHANNEL_ID=your_trading_channel_id
   DISCORD_VOICE_CHANNEL_ID=your_voice_channel_id
   SOLANA_PRIVATE_KEY=your_base58_private_key
   SOLANA_PUBLIC_KEY=your_public_key
   SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
   SOLANA_CLUSTER=mainnet-beta
   ```

2. **Test environment variables locally:**
   ```bash
   # Copy railway.env.example to .env
   cp railway.env.example .env
   # Edit .env with your actual values
   yarn wojat:railway
   ```

## 🚀 **Service Startup Issues**

### **Problem:**
Services start but fail immediately

### **Solution:**
1. **Check Railway logs:**
   - Go to Railway dashboard
   - Click on your service
   - View logs for specific error messages

2. **Test individual services:**
   ```bash
   # Test frontend
   cd frontend && yarn start
   
   # Test ElizaOS agents
   cd elizaos-agents && node phase2-orchestrator.js
   
   # Test scrapers
   cd js-scraper && node index.mjs
   
   # Test Bitquery
   cd bitquery && node index.mjs
   ```

3. **Check port conflicts:**
   - Ensure PORT environment variable is set
   - Verify no other services are using port 3000

## 📊 **Database Connection Issues**

### **Problem:**
Supabase connection failures

### **Solution:**
1. **Verify Supabase credentials:**
   - Check SUPABASE_URL format
   - Verify SUPABASE_ANON_KEY is correct
   - Test connection in Supabase dashboard

2. **Check database schema:**
   - Run `complete_supabase_schema.sql` in Supabase SQL Editor
   - Verify RLS policies are configured
   - Run `simple_rls_fix.sql` if needed

3. **Test database connection:**
   ```bash
   # Test from any service directory
   node -e "
   const { createClient } = require('@supabase/supabase-js');
   const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
   supabase.from('tokens').select('*').limit(1).then(console.log);
   "
   ```

## 🔄 **Deployment Process**

### **Step-by-Step Deployment:**
1. **Prepare repository:**
   ```bash
   git add .
   git commit -m "Fix Railway deployment"
   git push origin main
   ```

2. **Create Railway project:**
   - Go to railway.app
   - New Project → Deploy from GitHub repo
   - Select your repository

3. **Configure environment:**
   - Add all variables from `railway.env.example`
   - Set PORT=3000 (Railway will override this)

4. **Deploy:**
   - Railway automatically builds and deploys
   - Monitor logs for any issues
   - Access your app at the Railway domain

## 🎯 **Success Indicators**

### **What to look for:**
- ✅ Docker build completes successfully
- ✅ All services start without errors
- ✅ Frontend accessible at Railway domain
- ✅ No critical errors in logs
- ✅ Environment variables properly loaded

### **Common Success Messages:**
```
✅ Wojat Platform started successfully!
🌐 Frontend accessible at: https://your-app.railway.app
🟢 All services running
```

## 🆘 **Getting Help**

### **If issues persist:**
1. **Check Railway documentation:**
   - https://docs.railway.app/

2. **Review Railway logs:**
   - Look for specific error messages
   - Check build and runtime logs

3. **Test locally first:**
   - Ensure everything works locally
   - Use `yarn wojat:railway` to test Railway config

4. **Contact support:**
   - Railway support for platform issues
   - Check GitHub issues for similar problems

## 🎉 **Deployment Success!**

Once deployed successfully, you'll have:
- ✅ All Wojat services running on Railway
- ✅ Public domain access to your frontend
- ✅ Automatic scaling and monitoring
- ✅ Easy updates via Git push

**Your Wojat memecoin hunting platform is now live!** 🚀💰
