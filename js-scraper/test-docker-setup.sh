#!/bin/bash

# Test script to verify JS scraper Docker setup
echo "🔍 Testing JS Scraper Docker Setup..."

# Check if scripts exist
echo "📁 Checking script files..."
if [ -f "/app/start-all-scrapers.sh" ]; then
    echo "✅ /app/start-all-scrapers.sh exists"
    ls -la /app/start-all-scrapers.sh
else
    echo "❌ /app/start-all-scrapers.sh not found"
fi

if [ -f "/app/cron-scraper.sh" ]; then
    echo "✅ /app/cron-scraper.sh exists"
    ls -la /app/cron-scraper.sh
else
    echo "❌ /app/cron-scraper.sh not found"
fi

# Check permissions
echo ""
echo "🔐 Checking permissions..."
echo "Script permissions:"
ls -la /app/*.sh

# Check log directory
echo ""
echo "📂 Checking log directory..."
if [ -d "/var/log/js-scraper" ]; then
    echo "✅ /var/log/js-scraper exists"
    ls -la /var/log/js-scraper
else
    echo "❌ /var/log/js-scraper not found"
fi

# Check cron setup
echo ""
echo "⏰ Checking cron setup..."
crontab -l 2>/dev/null || echo "No crontab found"

# Check user
echo ""
echo "👤 Current user:"
whoami
id

# Test script execution
echo ""
echo "🧪 Testing script execution..."
if [ -x "/app/start-all-scrapers.sh" ]; then
    echo "✅ /app/start-all-scrapers.sh is executable"
    echo "Testing script (dry run)..."
    head -5 /app/start-all-scrapers.sh
else
    echo "❌ /app/start-all-scrapers.sh is not executable"
fi

echo ""
echo "🎯 Test completed!"
