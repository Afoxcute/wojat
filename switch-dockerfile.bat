@echo off
REM Wojat Platform Dockerfile Switcher for Windows
REM Helps choose the right Dockerfile for Railway deployment

echo 🔧 Wojat Platform Dockerfile Switcher
echo ======================================
echo.
echo Choose your preferred Dockerfile:
echo 1. Standard (yarn, assumes yarn is pre-installed)
echo 2. NPM-based (uses npm instead of yarn)
echo 3. Robust (handles yarn installation gracefully)
echo 4. Multi-stage (smaller final image, removes build deps)
echo 5. Lightweight (excludes USB package, faster build)
echo 6. Test current Dockerfile locally
echo.

set /p choice="Enter your choice (1-6): "

if "%choice%"=="1" (
    echo 📦 Using standard Dockerfile...
    if exist Dockerfile.yarn move Dockerfile.yarn Dockerfile
    echo ✅ Standard Dockerfile is now active
) else if "%choice%"=="2" (
    echo 📦 Switching to npm-based Dockerfile...
    if exist Dockerfile move Dockerfile Dockerfile.yarn
    move Dockerfile.npm Dockerfile
    echo ✅ NPM-based Dockerfile is now active
) else if "%choice%"=="3" (
    echo 📦 Switching to robust Dockerfile...
    if exist Dockerfile move Dockerfile Dockerfile.yarn
    move Dockerfile.robust Dockerfile
    echo ✅ Robust Dockerfile is now active
) else if "%choice%"=="4" (
    echo 📦 Switching to multi-stage Dockerfile...
    if exist Dockerfile move Dockerfile Dockerfile.yarn
    move Dockerfile.multistage Dockerfile
    echo ✅ Multi-stage Dockerfile is now active
) else if "%choice%"=="5" (
    echo 📦 Switching to lightweight Dockerfile...
    if exist Dockerfile move Dockerfile Dockerfile.yarn
    move Dockerfile.lightweight Dockerfile
    echo ✅ Lightweight Dockerfile is now active
) else if "%choice%"=="6" (
    echo 🧪 Testing current Dockerfile...
    docker build -t wojat-test .
    if %errorlevel% equ 0 (
        echo ✅ Docker build successful!
    ) else (
        echo ❌ Docker build failed. Try a different Dockerfile option.
    )
) else (
    echo ❌ Invalid choice. Please run the script again.
    exit /b 1
)

echo.
echo 🚀 Ready for Railway deployment!
echo 💡 Tip: Commit your changes and push to trigger Railway deployment
