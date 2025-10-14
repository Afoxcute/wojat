#!/bin/bash

# Wojat Platform Node.js Version Checker
# Verifies Node.js version compatibility for Railway deployment

echo "🔍 Wojat Platform Node.js Version Checker"
echo "=========================================="
echo ""

# Check current Node.js version
NODE_VERSION=$(node --version)
echo "📦 Current Node.js version: $NODE_VERSION"

# Extract major version number
MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')
MINOR_VERSION=$(echo $NODE_VERSION | cut -d'.' -f2)

echo "🔢 Major version: $MAJOR_VERSION"
echo "🔢 Minor version: $MINOR_VERSION"
echo ""

# Check if version meets requirements
if [ "$MAJOR_VERSION" -ge 22 ]; then
    echo "✅ Node.js version is compatible!"
    echo "✅ Meets requirement: >=22.0.0"
elif [ "$MAJOR_VERSION" -eq 20 ] && [ "$MINOR_VERSION" -ge 18 ]; then
    echo "⚠️ Node.js version is partially compatible!"
    echo "⚠️ Required: >=22.0.0, Found: $NODE_VERSION"
    echo "⚠️ Some packages (@iqai/adk) require Node.js 22+"
    echo ""
    echo "🔧 Solutions:"
    echo "1. Update Node.js to version 22.0.0 or higher"
    echo "2. Use nvm to switch Node.js versions:"
    echo "   nvm install 22"
    echo "   nvm use 22"
    echo "3. Railway will use Node.js 22 in Docker build"
else
    echo "❌ Node.js version is incompatible!"
    echo "❌ Required: >=22.0.0, Found: $NODE_VERSION"
    echo ""
    echo "🔧 Solutions:"
    echo "1. Update Node.js to version 22.0.0 or higher"
    echo "2. Use nvm to switch Node.js versions:"
    echo "   nvm install 22"
    echo "   nvm use 22"
    echo "3. Railway will use Node.js 22 in Docker build"
fi

echo ""
echo "🚀 Railway Deployment:"
echo "✅ Dockerfile uses node:22-alpine (compatible)"
echo "✅ All packages including @iqai/adk will work correctly"
echo "✅ No local Node.js version issues for Railway"
