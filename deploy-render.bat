@echo off
REM Wojat Platform - Render Deployment Script for Windows
echo 🚀 Deploying Wojat Platform to Render...

REM Check if git is initialized
if not exist ".git" (
    echo ❌ Git repository not initialized. Please run 'git init' first.
    pause
    exit /b 1
)

REM Check if all files are committed
git status --porcelain > temp_status.txt
if %errorlevel% neq 0 (
    echo ❌ Git status check failed.
    del temp_status.txt
    pause
    exit /b 1
)

for /f %%i in (temp_status.txt) do (
    echo ⚠️  Uncommitted changes detected. Please commit all changes first.
    echo Run: git add . ^&^& git commit -m "Deploy to Render"
    del temp_status.txt
    pause
    exit /b 1
)

del temp_status.txt

REM Push to main branch
echo 📤 Pushing to main branch...
git push origin main

if %errorlevel% neq 0 (
    echo ❌ Failed to push to GitHub. Please check your git configuration.
    pause
    exit /b 1
)

echo ✅ Code pushed to GitHub!
echo.
echo 🔧 Next steps:
echo 1. Go to https://render.com
echo 2. Create a new Web Service
echo 3. Connect your GitHub repository
echo 4. Use these settings:
echo    - Build Command: npm install ^&^& cd frontend ^&^& npm install ^&^& npm run build
echo    - Start Command: cd frontend ^&^& npm run start
echo    - Environment: Node
echo 5. Add your environment variables
echo 6. Deploy!
echo.
echo 📚 See RENDER_DEPLOYMENT_GUIDE.md for detailed instructions.
pause
