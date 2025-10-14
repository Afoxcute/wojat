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
echo 6. Fast (optimized for Railway, minimal dependencies)
echo 7. Frontend Only (fastest, frontend only)
echo 8. Simple Fast (copies entire frontend, handles missing files)
echo 9. Robust Fast (handles missing config files gracefully)
echo 10. Test current Dockerfile locally
echo.

set /p choice="Enter your choice (1-10): "

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
    echo 📦 Switching to fast Dockerfile...
    if exist Dockerfile move Dockerfile Dockerfile.yarn
    move Dockerfile.fast Dockerfile
    echo ✅ Fast Dockerfile is now active
) else if "%choice%"=="7" (
    echo 📦 Switching to frontend-only Dockerfile...
    if exist Dockerfile move Dockerfile Dockerfile.yarn
    move Dockerfile.frontend-only Dockerfile
    echo ✅ Frontend-only Dockerfile is now active
) else if "%choice%"=="8" (
    echo 📦 Switching to simple fast Dockerfile...
    if exist Dockerfile move Dockerfile Dockerfile.yarn
    move Dockerfile.simple-fast Dockerfile
    echo ✅ Simple fast Dockerfile is now active
) else if "%choice%"=="9" (
    echo 📦 Switching to robust fast Dockerfile...
    if exist Dockerfile move Dockerfile Dockerfile.yarn
    move Dockerfile.robust-fast Dockerfile
    echo ✅ Robust fast Dockerfile is now active
) else if "%choice%"=="10" (
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
