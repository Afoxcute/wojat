#!/bin/bash

# Wojat Platform - Render Deployment Script
echo "🚀 Deploying Wojat Platform to Render..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not initialized. Please run 'git init' first."
    exit 1
fi

# Check if all files are committed
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Uncommitted changes detected. Please commit all changes first."
    echo "Run: git add . && git commit -m 'Deploy to Render'"
    exit 1
fi

# Push to main branch
echo "📤 Pushing to main branch..."
git push origin main

echo "✅ Code pushed to GitHub!"
echo ""
echo "🔧 Next steps:"
echo "1. Go to https://render.com"
echo "2. Create a new Web Service"
echo "3. Connect your GitHub repository"
echo "4. Use these settings:"
echo "   - Build Command: npm install && cd frontend && npm install && npm run build"
echo "   - Start Command: cd frontend && npm run start"
echo "   - Environment: Node"
echo "5. Add your environment variables"
echo "6. Deploy!"
echo ""
echo "📚 See RENDER_DEPLOYMENT_GUIDE.md for detailed instructions."
