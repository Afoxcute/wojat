@echo off
REM Wojat Platform Railway Build Script for Windows
REM Ensures all services are properly installed and built

echo 🚀 Starting Wojat Platform build for Railway...

REM Install root dependencies
echo 📦 Installing root dependencies...
yarn install --frozen-lockfile
if %errorlevel% neq 0 (
    echo ❌ Failed to install root dependencies
    exit /b 1
)

REM Install frontend dependencies and build
echo 🎨 Installing frontend dependencies...
cd frontend
yarn install --frozen-lockfile
if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    exit /b 1
)
echo 🏗️ Building frontend...
yarn build
if %errorlevel% neq 0 (
    echo ❌ Failed to build frontend
    exit /b 1
)
cd ..

REM Install elizaos-agents dependencies
echo 🤖 Installing ElizaOS agents dependencies...
cd elizaos-agents
yarn install --frozen-lockfile
if %errorlevel% neq 0 (
    echo ❌ Failed to install elizaos-agents dependencies
    exit /b 1
)
cd ..

REM Install js-scraper dependencies
echo 🕷️ Installing scraper dependencies...
cd js-scraper
yarn install --frozen-lockfile
if %errorlevel% neq 0 (
    echo ❌ Failed to install js-scraper dependencies
    exit /b 1
)
cd ..

REM Install bitquery dependencies
echo 🔗 Installing Bitquery dependencies...
cd bitquery
yarn install --frozen-lockfile
if %errorlevel% neq 0 (
    echo ❌ Failed to install bitquery dependencies
    exit /b 1
)
cd ..

echo ✅ Build completed successfully!
echo 🚀 Ready to start Wojat Platform with: yarn wojat:railway
