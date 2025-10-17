#!/bin/bash

echo "====================================================="
echo "JS Scraper Cron Job Started: $(date)"
echo "====================================================="

# Navigate to the application directory
cd /app

# Run all scrapers in sequence
echo "📱 Running TikTok scraper..."
yarn scrape-tiktok

echo ""
echo "📢 Running Telegram scraper..."
yarn scrape-telegram

echo ""
echo "🔍 Running Outlight scraper..."
yarn scrape-outlight

echo ""
echo "====================================================="
echo "JS Scraper Cron Job Completed: $(date)"
echo "====================================================="
