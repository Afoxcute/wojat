@echo off
REM Wojat Platform - Railway Deployment Script (Windows)
REM This script helps deploy all services to Railway with proper Node.js 20 configuration

echo 🚀 Wojat Platform - Railway Deployment Script
echo ==============================================

REM Check if Railway CLI is installed
railway --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Railway CLI is not installed!
    echo Please install it with: npm install -g @railway/cli
    exit /b 1
)
echo [SUCCESS] Railway CLI is installed

REM Check if user is logged in to Railway
railway whoami >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Not logged in to Railway!
    echo Please login with: railway login
    exit /b 1
)
echo [SUCCESS] Logged in to Railway

REM Deploy services based on argument
if "%1"=="frontend" (
    echo [INFO] Deploying Frontend...
    cd frontend
    railway deploy --detach
    cd ..
    goto :end
)

if "%1"=="bitquery" (
    echo [INFO] Deploying Bitquery Service...
    cd bitquery
    railway deploy --detach
    cd ..
    goto :end
)

if "%1"=="elizaos" (
    echo [INFO] Deploying ElizaOS Agents...
    cd elizaos-agents
    railway deploy --detach
    cd ..
    goto :end
)

if "%1"=="telegram" (
    echo [INFO] Deploying Telegram Scraper...
    cd js-scraper
    railway deploy --detach
    cd ..
    goto :end
)

if "%1"=="outlight" (
    echo [INFO] Deploying Outlight Scraper...
    cd js-scraper
    railway deploy --detach
    cd ..
    goto :end
)

if "%1"=="tiktok" (
    echo [INFO] Deploying TikTok Scraper...
    cd js-scraper
    railway deploy --detach
    cd ..
    goto :end
)

if "%1"=="help" (
    echo Usage: %0 [service]
    echo.
    echo Services:
    echo   frontend   - Deploy frontend service
    echo   bitquery   - Deploy bitquery service
    echo   elizaos    - Deploy elizaos-agents service
    echo   telegram   - Deploy telegram scraper
    echo   outlight   - Deploy outlight scraper
    echo   tiktok     - Deploy tiktok scraper
    echo.
    echo If no service is specified, all services will be deployed.
    goto :end
)

REM Deploy all services if no specific service is specified
echo [INFO] Deploying all services...

echo [INFO] Deploying Frontend...
cd frontend
railway deploy --detach
cd ..

echo [INFO] Deploying Bitquery Service...
cd bitquery
railway deploy --detach
cd ..

echo [INFO] Deploying ElizaOS Agents...
cd elizaos-agents
railway deploy --detach
cd ..

echo [INFO] Deploying Telegram Scraper...
cd js-scraper
railway deploy --detach
cd ..

echo [INFO] Deploying Outlight Scraper...
cd js-scraper
railway deploy --detach
cd ..

echo [INFO] Deploying TikTok Scraper...
cd js-scraper
railway deploy --detach
cd ..

echo [SUCCESS] All services deployed successfully!
echo [INFO] Check your Railway dashboard for deployment status and URLs

:end
