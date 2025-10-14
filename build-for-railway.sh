#!/bin/bash

# Wojat Platform Railway Build Script
# Ensures all services are properly installed and built

set -e

echo "🚀 Starting Wojat Platform build for Railway..."

# Install root dependencies
echo "📦 Installing root dependencies..."
yarn install

# Install frontend dependencies and build
echo "🎨 Installing frontend dependencies..."
cd frontend
yarn install
echo "🏗️ Building frontend..."
yarn build
cd ..

# Install elizaos-agents dependencies
echo "🤖 Installing ElizaOS agents dependencies..."
cd elizaos-agents
yarn install
cd ..

# Install js-scraper dependencies
echo "🕷️ Installing scraper dependencies..."
cd js-scraper
yarn install
cd ..

# Install bitquery dependencies
echo "🔗 Installing Bitquery dependencies..."
cd bitquery
yarn install
cd ..

echo "✅ Build completed successfully!"
echo "🚀 Ready to start Wojat Platform with: yarn wojat:railway"
