#!/bin/bash

echo "🚀 Starting Wojat JS Scraper Service..."
echo "📊 Available scrapers: TikTok, Telegram, Outlight"
echo "⏰ Schedule: Every 3 hours"
echo ""

# Function to run scraper with error handling
run_scraper() {
    local name=$1
    local command=$2
    
    echo "🔄 Starting $name scraper..."
    if yarn $command; then
        echo "✅ $name scraper completed successfully"
    else
        echo "❌ $name scraper failed"
        return 1
    fi
}

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
echo "🎉 All scrapers completed!"
