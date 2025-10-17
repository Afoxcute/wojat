@echo off
REM Wojat JS Scraper Service Management Script for Windows
REM This script helps manage the JS scraper services (TikTok, Telegram, Outlight)

setlocal enabledelayedexpansion

if "%1"=="" goto :help
if "%1"=="help" goto :help
if "%1"=="--help" goto :help
if "%1"=="-h" goto :help

if "%1"=="start-all" goto :start-all
if "%1"=="start-tiktok" goto :start-tiktok
if "%1"=="start-telegram" goto :start-telegram
if "%1"=="start-outlight" goto :start-outlight
if "%1"=="stop" goto :stop
if "%1"=="restart" goto :restart
if "%1"=="status" goto :status
if "%1"=="logs" goto :logs
if "%1"=="run-tiktok" goto :run-tiktok
if "%1"=="run-telegram" goto :run-telegram
if "%1"=="run-outlight" goto :run-outlight
if "%1"=="build" goto :build

echo [ERROR] Unknown command: %1
echo.
goto :help

:start-all
echo [INFO] Starting all Wojat JS scrapers...
docker-compose up -d js-scraper
echo [SUCCESS] All scrapers started
echo [INFO] Running: TikTok, Telegram, Outlight
goto :end

:start-tiktok
echo [INFO] Starting TikTok scraper...
docker-compose --profile individual up -d js-scraper-tiktok
echo [SUCCESS] TikTok scraper started
goto :end

:start-telegram
echo [INFO] Starting Telegram scraper...
docker-compose --profile individual up -d js-scraper-telegram
echo [SUCCESS] Telegram scraper started
goto :end

:start-outlight
echo [INFO] Starting Outlight scraper...
docker-compose --profile individual up -d js-scraper-outlight
echo [SUCCESS] Outlight scraper started
goto :end

:stop
echo [INFO] Stopping all Wojat JS scrapers...
docker-compose stop js-scraper js-scraper-tiktok js-scraper-telegram js-scraper-outlight 2>nul
echo [SUCCESS] All scrapers stopped
goto :end

:restart
echo [INFO] Restarting all Wojat JS scrapers...
docker-compose restart js-scraper
echo [SUCCESS] All scrapers restarted
goto :end

:status
echo [INFO] Wojat JS Scraper Service Status:
echo.
docker-compose ps js-scraper | findstr "Up" >nul
if !errorlevel! equ 0 (
    echo [SUCCESS] ✅ Main scraper service is running (all scrapers)
) else (
    echo [WARNING] ⚠️ Main scraper service is not running
)

docker-compose ps js-scraper-tiktok | findstr "Up" >nul
if !errorlevel! equ 0 (
    echo [SUCCESS] ✅ TikTok scraper is running
) else (
    echo [WARNING] ⚠️ TikTok scraper is not running
)

docker-compose ps js-scraper-telegram | findstr "Up" >nul
if !errorlevel! equ 0 (
    echo [SUCCESS] ✅ Telegram scraper is running
) else (
    echo [WARNING] ⚠️ Telegram scraper is not running
)

docker-compose ps js-scraper-outlight | findstr "Up" >nul
if !errorlevel! equ 0 (
    echo [SUCCESS] ✅ Outlight scraper is running
) else (
    echo [WARNING] ⚠️ Outlight scraper is not running
)

echo.
echo [INFO] Container Information:
docker-compose ps | findstr js-scraper
goto :end

:logs
echo [INFO] Showing recent JS scraper logs...
echo.
docker-compose ps js-scraper | findstr "Up" >nul
if !errorlevel! equ 0 (
    echo [INFO] Main Scraper Logs (last 50 lines):
    docker-compose logs --tail=50 js-scraper
)

docker-compose ps js-scraper-tiktok | findstr "Up" >nul
if !errorlevel! equ 0 (
    echo.
    echo [INFO] TikTok Scraper Logs:
    docker-compose logs --tail=20 js-scraper-tiktok
)

docker-compose ps js-scraper-telegram | findstr "Up" >nul
if !errorlevel! equ 0 (
    echo.
    echo [INFO] Telegram Scraper Logs:
    docker-compose logs --tail=20 js-scraper-telegram
)

docker-compose ps js-scraper-outlight | findstr "Up" >nul
if !errorlevel! equ 0 (
    echo.
    echo [INFO] Outlight Scraper Logs:
    docker-compose logs --tail=20 js-scraper-outlight
)
goto :end

:run-tiktok
echo [INFO] Running TikTok scraper immediately...
docker-compose --profile individual run --rm js-scraper-tiktok
echo [SUCCESS] TikTok scraper completed
goto :end

:run-telegram
echo [INFO] Running Telegram scraper immediately...
docker-compose --profile individual run --rm js-scraper-telegram
echo [SUCCESS] Telegram scraper completed
goto :end

:run-outlight
echo [INFO] Running Outlight scraper immediately...
docker-compose --profile individual run --rm js-scraper-outlight
echo [SUCCESS] Outlight scraper completed
goto :end

:build
echo [INFO] Building JS scraper Docker images...
docker-compose build js-scraper js-scraper-tiktok js-scraper-telegram js-scraper-outlight
echo [SUCCESS] JS scraper Docker images built successfully
goto :end

:help
echo Wojat JS Scraper Service Management
echo.
echo Usage: %0 [COMMAND] [OPTIONS]
echo.
echo Commands:
echo   start-all       Start all scrapers (TikTok, Telegram, Outlight)
echo   start-tiktok    Start TikTok scraper only
echo   start-telegram  Start Telegram scraper only
echo   start-outlight  Start Outlight scraper only
echo   stop            Stop all scraper services
echo   restart         Restart all scraper services
echo   status          Show service status
echo   logs            Show recent logs
echo   run-tiktok      Run TikTok scraper immediately
echo   run-telegram    Run Telegram scraper immediately
echo   run-outlight    Run Outlight scraper immediately
echo   build           Build the JS scraper Docker images
echo   help            Show this help message
echo.
echo Examples:
echo   %0 start-all          # Start all scrapers
echo   %0 start-tiktok      # Start TikTok scraper only
echo   %0 run-telegram       # Run Telegram scraper immediately
echo   %0 logs               # View logs
goto :end

:end
endlocal
