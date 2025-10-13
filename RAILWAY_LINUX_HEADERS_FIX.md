# 🚀 Railway Deployment - Linux Headers Fix

## 🎯 **Problem Solved**

**Issue**: The `usb` package (dependency of Solana hardware wallet adapters) requires Linux kernel headers to compile native USB libraries, but Alpine Linux containers don't have them by default.

**Error**: 
```
fatal error: linux/magic.h: No such file or directory
```

## ✅ **Solution Implemented**

### **Updated All Dockerfiles**

Added Linux kernel headers and USB development libraries to all Dockerfiles:

```dockerfile
# Install build dependencies for native modules
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    py3-pip \
    linux-headers \
    libusb-dev \
    eudev-dev
```

### **What These Packages Provide:**

- **`linux-headers`**: Linux kernel headers including `linux/magic.h`
- **`libusb-dev`**: USB library development files
- **`eudev-dev`**: Device manager development files
- **`python3`**: Python for node-gyp
- **`make` & `g++`**: Build tools for compilation

### **Files Updated:**

1. **Frontend**: `frontend/Dockerfile` - Added Linux headers + USB dev libraries
2. **Bitquery**: `bitquery/Dockerfile` - Added Linux headers + USB dev libraries  
3. **ElizaOS Agents**: `elizaos-agents/Dockerfile` - Added Linux headers + USB dev libraries
4. **Telegram Scraper**: `js-scraper/Dockerfile-telegram` - Added Linux headers + USB dev libraries + Chromium
5. **Outlight Scraper**: `js-scraper/Dockerfile-outlight` - Added Linux headers + USB dev libraries + Chromium
6. **TikTok Scraper**: `js-scraper/Dockerfile-tiktok` - Added Linux headers + USB dev libraries + Chromium

## 🚀 **Expected Results**

After this fix:
- ✅ `yarn install` will complete successfully
- ✅ Native USB modules will compile properly
- ✅ Solana hardware wallet adapters will work
- ✅ All services will build and deploy successfully

## 🔍 **Alternative Solutions**

If the Linux headers approach still has issues, we can:

### **Option 1: Remove Hardware Wallet Support**
```json
// Remove from package.json
"@solana/wallet-adapter-wallets": "^0.19.32"
// Keep only essential adapters
"@solana/wallet-adapter-phantom": "^0.9.24"
```

### **Option 2: Use Multi-stage Build**
```dockerfile
# Build stage with all dependencies
FROM node:20-alpine AS builder
RUN apk add --no-cache linux-headers libusb-dev eudev-dev python3 make g++
# ... build steps

# Production stage without build tools
FROM node:20-alpine AS production
# Copy built files
```

### **Option 3: Use Different Base Image**
```dockerfile
FROM node:20-slim  # Instead of alpine
# Includes more system libraries by default
```

## 📋 **Deployment Steps**

1. **Redeploy Services**: The updated Dockerfiles will automatically be used
2. **Monitor Build Logs**: Check for successful Linux headers installation
3. **Verify Dependencies**: Ensure `yarn install` completes without errors
4. **Test Services**: Confirm all services start successfully

## ✅ **Verification**

Check build logs for:
- `linux-headers` installation success
- `libusb-dev` installation success
- `yarn install` completing without errors
- No more "linux/magic.h: No such file or directory" errors
- Successful native module compilation

## 🎯 **Root Cause**

The `usb` package is a dependency of Solana hardware wallet adapters (like Ledger, Trezor) that need to communicate with USB devices. In a containerized environment, this requires:

1. **Linux kernel headers** - For system-level USB access
2. **libusb development libraries** - For USB communication
3. **Build tools** - For compiling native modules

The Linux headers fix should resolve this issue completely!
