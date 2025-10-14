@echo off
REM Wojat Platform Lockfile Update Script for Windows
REM Updates all lockfiles to fix Railway deployment issues

echo 🔧 Updating Wojat Platform lockfiles...

REM Update root lockfile
echo 📦 Updating root lockfile...
yarn install
if %errorlevel% neq 0 (
    echo ❌ Failed to update root lockfile
    exit /b 1
)

REM Update frontend lockfile
echo 🎨 Updating frontend lockfile...
cd frontend
yarn install
if %errorlevel% neq 0 (
    echo ❌ Failed to update frontend lockfile
    exit /b 1
)
cd ..

REM Update elizaos-agents lockfile
echo 🤖 Updating elizaos-agents lockfile...
cd elizaos-agents
yarn install
if %errorlevel% neq 0 (
    echo ❌ Failed to update elizaos-agents lockfile
    exit /b 1
)
cd ..

REM Update js-scraper lockfile
echo 🕷️ Updating js-scraper lockfile...
cd js-scraper
yarn install
if %errorlevel% neq 0 (
    echo ❌ Failed to update js-scraper lockfile
    exit /b 1
)
cd ..

REM Update bitquery lockfile
echo 🔗 Updating bitquery lockfile...
cd bitquery
yarn install
if %errorlevel% neq 0 (
    echo ❌ Failed to update bitquery lockfile
    exit /b 1
)
cd ..

echo ✅ All lockfiles updated successfully!
echo 🚀 Ready for Railway deployment!
