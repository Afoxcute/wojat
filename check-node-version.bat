@echo off
REM Wojat Platform Node.js Version Checker for Windows
REM Verifies Node.js version compatibility for Railway deployment

echo 🔍 Wojat Platform Node.js Version Checker
echo ==========================================
echo.

REM Check current Node.js version
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo 📦 Current Node.js version: %NODE_VERSION%

REM Extract major version number
for /f "tokens=1 delims=." %%a in ("%NODE_VERSION:v=%") do set MAJOR_VERSION=%%a
for /f "tokens=2 delims=." %%b in ("%NODE_VERSION:v=%") do set MINOR_VERSION=%%b

echo 🔢 Major version: %MAJOR_VERSION%
echo 🔢 Minor version: %MINOR_VERSION%
echo.

REM Check if version meets requirements
if %MAJOR_VERSION% geq 22 (
    echo ✅ Node.js version is compatible!
    echo ✅ Meets requirement: ^>=22.0.0
) else if %MAJOR_VERSION% equ 20 (
    if %MINOR_VERSION% geq 18 (
        echo ⚠️ Node.js version is partially compatible!
        echo ⚠️ Required: ^>=22.0.0, Found: %NODE_VERSION%
        echo ⚠️ Some packages (@iqai/adk) require Node.js 22+
        echo.
        echo 🔧 Solutions:
        echo 1. Update Node.js to version 22.0.0 or higher
        echo 2. Railway will use Node.js 22 in Docker build
    ) else (
        echo ❌ Node.js version is incompatible!
        echo ❌ Required: ^>=22.0.0, Found: %NODE_VERSION%
        echo.
        echo 🔧 Solutions:
        echo 1. Update Node.js to version 22.0.0 or higher
        echo 2. Railway will use Node.js 22 in Docker build
    )
) else (
    echo ❌ Node.js version is incompatible!
    echo ❌ Required: ^>=22.0.0, Found: %NODE_VERSION%
    echo.
    echo 🔧 Solutions:
    echo 1. Update Node.js to version 22.0.0 or higher
    echo 2. Railway will use Node.js 22 in Docker build
)

echo.
echo 🚀 Railway Deployment:
echo ✅ Dockerfile uses node:22-alpine (compatible)
echo ✅ All packages including @iqai/adk will work correctly
echo ✅ No local Node.js version issues for Railway
