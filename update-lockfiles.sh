#!/bin/bash

# Wojat Platform Lockfile Update Script
# Updates all lockfiles to fix Railway deployment issues

echo "🔧 Updating Wojat Platform lockfiles..."

# Update root lockfile
echo "📦 Updating root lockfile..."
yarn install

# Update frontend lockfile
echo "🎨 Updating frontend lockfile..."
cd frontend
yarn install
cd ..

# Update elizaos-agents lockfile
echo "🤖 Updating elizaos-agents lockfile..."
cd elizaos-agents
yarn install
cd ..

# Update js-scraper lockfile
echo "🕷️ Updating js-scraper lockfile..."
cd js-scraper
yarn install
cd ..

# Update bitquery lockfile
echo "🔗 Updating bitquery lockfile..."
cd bitquery
yarn install
cd ..

echo "✅ All lockfiles updated successfully!"
echo "🚀 Ready for Railway deployment!"
