#!/bin/bash

# Wojat Platform Dockerfile Switcher
# Helps choose the right Dockerfile for Railway deployment

echo "🔧 Wojat Platform Dockerfile Switcher"
echo "======================================"
echo ""
echo "Choose your preferred Dockerfile:"
echo "1. Standard (yarn, assumes yarn is pre-installed)"
echo "2. NPM-based (uses npm instead of yarn)"
echo "3. Robust (handles yarn installation gracefully)"
echo "4. Multi-stage (smaller final image, removes build deps)"
echo "5. Lightweight (excludes USB package, faster build)"
echo "6. Test current Dockerfile locally"
echo ""

read -p "Enter your choice (1-6): " choice

case $choice in
    1)
        echo "📦 Using standard Dockerfile..."
        if [ -f "Dockerfile.yarn" ]; then
            mv Dockerfile.yarn Dockerfile
        fi
        echo "✅ Standard Dockerfile is now active"
        ;;
    2)
        echo "📦 Switching to npm-based Dockerfile..."
        mv Dockerfile Dockerfile.yarn 2>/dev/null || true
        mv Dockerfile.npm Dockerfile
        echo "✅ NPM-based Dockerfile is now active"
        ;;
    3)
        echo "📦 Switching to robust Dockerfile..."
        mv Dockerfile Dockerfile.yarn 2>/dev/null || true
        mv Dockerfile.robust Dockerfile
        echo "✅ Robust Dockerfile is now active"
        ;;
    4)
        echo "📦 Switching to multi-stage Dockerfile..."
        mv Dockerfile Dockerfile.yarn 2>/dev/null || true
        mv Dockerfile.multistage Dockerfile
        echo "✅ Multi-stage Dockerfile is now active"
        ;;
    5)
        echo "📦 Switching to lightweight Dockerfile..."
        mv Dockerfile Dockerfile.yarn 2>/dev/null || true
        mv Dockerfile.lightweight Dockerfile
        echo "✅ Lightweight Dockerfile is now active"
        ;;
    6)
        echo "🧪 Testing current Dockerfile..."
        docker build -t wojat-test .
        if [ $? -eq 0 ]; then
            echo "✅ Docker build successful!"
        else
            echo "❌ Docker build failed. Try a different Dockerfile option."
        fi
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "🚀 Ready for Railway deployment!"
echo "💡 Tip: Commit your changes and push to trigger Railway deployment"
