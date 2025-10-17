# JS Scraper Service Dockerfile
FROM node:22-alpine

# Install Chrome dependencies, build tools, and cron
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    python3 \
    make \
    g++ \
    gcc \
    libc-dev \
    linux-headers \
    pkgconfig \
    libusb-dev \
    eudev-dev \
    dcron \
    busybox-suid

# Tell Puppeteer to skip installing Chromium. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY yarn.lock* ./

# Use yarn if yarn.lock exists, otherwise use npm
RUN if [ -f yarn.lock ]; then \
        yarn install --frozen-lockfile --production; \
    else \
        npm install --omit=dev; \
    fi

# Copy source code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S scraper -u 1001

# Change ownership
RUN chown -R scraper:nodejs /app
USER scraper

# Expose port (if needed)
EXPOSE 3003

# Create log directory
RUN mkdir -p /var/log/js-scraper && chown -R scraper:nodejs /var/log/js-scraper

# Create startup script for all scrapers
RUN cat > /app/start-all-scrapers.sh << 'EOF'
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
EOF

# Create cron script for scheduled scraping
RUN cat > /app/cron-scraper.sh << 'EOF'
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
EOF

RUN chmod +x /app/start-all-scrapers.sh
RUN chmod +x /app/cron-scraper.sh

# Set up cron job to run every 3 hours
RUN echo "0 */3 * * * /app/cron-scraper.sh >> /var/log/js-scraper/cron.log 2>&1" | crontab -

# Start cron daemon and run initial scraping
CMD ["sh", "-c", "echo '🚀 Starting Wojat JS Scraper Service with 3-hour schedule...' && /app/start-all-scrapers.sh && crond -f -L /var/log/js-scraper/cron.log"]
