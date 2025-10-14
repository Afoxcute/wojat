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
echo "6. Fast (optimized for Railway, minimal dependencies)"
echo "7. Frontend Only (fastest, frontend only)"
echo "8. Simple Fast (copies entire frontend, handles missing files)"
echo "9. Robust Fast (handles missing config files gracefully)"
echo "10. No USB (excludes USB package entirely, ultra fast)"
echo "11. Ultra Fast (NPM with ignore-scripts, fastest)"
echo "12. Selective (installs only essential packages)"
echo "13. NPM Simple (single-stage NPM build, reliable)"
echo "14. Hybrid (NPM root + Yarn frontend, handles both)"
echo "15. Yarn Simple (pure Yarn, fastest and most reliable)"
echo "16. Test current Dockerfile locally"
echo ""

read -p "Enter your choice (1-16): " choice

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
        echo "📦 Switching to fast Dockerfile..."
        mv Dockerfile Dockerfile.yarn 2>/dev/null || true
        mv Dockerfile.fast Dockerfile
        echo "✅ Fast Dockerfile is now active"
        ;;
    7)
        echo "📦 Switching to frontend-only Dockerfile..."
        mv Dockerfile Dockerfile.yarn 2>/dev/null || true
        mv Dockerfile.frontend-only Dockerfile
        echo "✅ Frontend-only Dockerfile is now active"
        ;;
    8)
        echo "📦 Switching to simple fast Dockerfile..."
        mv Dockerfile Dockerfile.yarn 2>/dev/null || true
        mv Dockerfile.simple-fast Dockerfile
        echo "✅ Simple fast Dockerfile is now active"
        ;;
    9)
        echo "📦 Switching to robust fast Dockerfile..."
        mv Dockerfile Dockerfile.yarn 2>/dev/null || true
        mv Dockerfile.robust-fast Dockerfile
        echo "✅ Robust fast Dockerfile is now active"
        ;;
    10)
        echo "📦 Switching to no USB Dockerfile..."
        mv Dockerfile Dockerfile.yarn 2>/dev/null || true
        mv Dockerfile.no-usb Dockerfile
        echo "✅ No USB Dockerfile is now active"
        ;;
    11)
        echo "📦 Switching to ultra fast NPM Dockerfile..."
        mv Dockerfile Dockerfile.yarn 2>/dev/null || true
        mv Dockerfile.npm-ultra-fast Dockerfile
        echo "✅ Ultra fast NPM Dockerfile is now active"
        ;;
    12)
        echo "📦 Switching to selective Dockerfile..."
        mv Dockerfile Dockerfile.yarn 2>/dev/null || true
        mv Dockerfile.selective Dockerfile
        echo "✅ Selective Dockerfile is now active"
        ;;
    13)
        echo "📦 Switching to NPM simple Dockerfile..."
        mv Dockerfile Dockerfile.yarn 2>/dev/null || true
        mv Dockerfile.npm-simple Dockerfile
        echo "✅ NPM simple Dockerfile is now active"
        ;;
    14)
        echo "📦 Switching to hybrid Dockerfile..."
        mv Dockerfile Dockerfile.yarn 2>/dev/null || true
        mv Dockerfile.hybrid Dockerfile
        echo "✅ Hybrid Dockerfile is now active"
        ;;
    15)
        echo "📦 Switching to Yarn simple Dockerfile..."
        mv Dockerfile Dockerfile.yarn 2>/dev/null || true
        mv Dockerfile.yarn-simple Dockerfile
        echo "✅ Yarn simple Dockerfile is now active"
        ;;
    16)
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
