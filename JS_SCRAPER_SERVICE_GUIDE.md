# Wojat JS Scraper Service - Complete Guide

## 🎯 Overview

The Wojat JS Scraper Service includes three powerful scrapers:
- **TikTok Scraper** (`yarn scrape-tiktok`) - Collects TikTok video data and hashtags
- **Telegram Scraper** (`yarn scrape-telegram`) - Scrapes Telegram channels for memecoin mentions
- **Outlight Scraper** (`yarn scrape-outlight`) - Collects data from Outlight platform

## 🚀 Quick Start

### Start All Scrapers
```bash
# Using management script (Linux/Mac)
./manage-js-scraper.sh start-all

# Using management script (Windows)
manage-js-scraper.bat start-all

# Using Docker Compose directly
docker-compose up -d js-scraper
```

### Start Individual Scrapers
```bash
# Start only TikTok scraper
./manage-js-scraper.sh start-tiktok

# Start only Telegram scraper
./manage-js-scraper.sh start-telegram

# Start only Outlight scraper
./manage-js-scraper.sh start-outlight
```

## 📋 Available Commands

### Management Script Commands

| Command | Description |
|---------|-------------|
| `start-all` | Start all scrapers (TikTok, Telegram, Outlight) |
| `start-tiktok` | Start TikTok scraper only |
| `start-telegram` | Start Telegram scraper only |
| `start-outlight` | Start Outlight scraper only |
| `stop` | Stop all scraper services |
| `restart` | Restart all scraper services |
| `status` | Show service status |
| `logs` | Show recent logs |
| `run-tiktok` | Run TikTok scraper immediately |
| `run-telegram` | Run Telegram scraper immediately |
| `run-outlight` | Run Outlight scraper immediately |
| `build` | Build Docker images |

### Docker Compose Commands

```bash
# Start all scrapers
docker-compose up -d js-scraper

# Start individual scrapers
docker-compose --profile individual up -d js-scraper-tiktok
docker-compose --profile individual up -d js-scraper-telegram
docker-compose --profile individual up -d js-scraper-outlight

# Run scrapers immediately (one-time)
docker-compose --profile individual run --rm js-scraper-tiktok
docker-compose --profile individual run --rm js-scraper-telegram
docker-compose --profile individual run --rm js-scraper-outlight

# View logs
docker-compose logs -f js-scraper
docker-compose logs -f js-scraper-tiktok
docker-compose logs -f js-scraper-telegram
docker-compose logs -f js-scraper-outlight
```

## 🔧 Configuration

### Environment Variables

Ensure your `.env` file contains:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_SECRET=your_supabase_key

# TikTok Scraper Configuration
TIKTOK_API_KEY=your_tiktok_api_key
TIKTOK_SECRET=your_tiktok_secret

# Telegram Scraper Configuration
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_API_ID=your_telegram_api_id
TELEGRAM_API_HASH=your_telegram_api_hash

# Outlight Scraper Configuration
OUTLIGHT_API_KEY=your_outlight_api_key
OUTLIGHT_SECRET=your_outlight_secret

# Other required variables...
```

### Scraper-Specific Configuration

**TikTok Scraper:**
- Requires Puppeteer and Chrome browser
- Scrapes video metadata, hashtags, and engagement metrics
- Stores data in `tiktoks` table

**Telegram Scraper:**
- Requires Telegram API credentials
- Scrapes channel messages and media
- Stores data in `telegram_messages` and `telegram_channels` tables

**Outlight Scraper:**
- Requires Outlight API access
- Collects platform-specific data
- Stores data in appropriate tables

## 📊 Monitoring and Logs

### Check Service Status
```bash
# Using management script
./manage-js-scraper.sh status

# Using Docker Compose
docker-compose ps | grep js-scraper
```

### View Logs
```bash
# All scrapers
./manage-js-scraper.sh logs

# Individual scrapers
docker-compose logs -f js-scraper-tiktok
docker-compose logs -f js-scraper-telegram
docker-compose logs -f js-scraper-outlight
```

### Monitor Performance
```bash
# Check resource usage
docker stats js-scraper

# Check disk usage
docker-compose exec js-scraper df -h

# Monitor memory usage
docker-compose exec js-scraper free -h
```

## 🛠️ Troubleshooting

### Common Issues

**1. Chrome/Puppeteer Issues**
```bash
# Check Chrome installation
docker-compose exec js-scraper chromium-browser --version

# Check Puppeteer configuration
docker-compose exec js-scraper node -e "console.log(process.env.PUPPETEER_EXECUTABLE_PATH)"
```

**2. Telegram API Issues**
```bash
# Test Telegram connection
docker-compose exec js-scraper node -e "
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {polling: false});
console.log('Telegram connection:', bot ? 'OK' : 'FAILED');
"
```

**3. Database Connection Issues**
```bash
# Test database connection
docker-compose exec js-scraper node -e "
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_SECRET);
console.log('Database connection:', supabase ? 'OK' : 'FAILED');
"
```

### Manual Testing

```bash
# Test individual scrapers
./manage-js-scraper.sh run-tiktok
./manage-js-scraper.sh run-telegram
./manage-js-scraper.sh run-outlight

# Test with verbose output
docker-compose exec js-scraper yarn scrape-tiktok --verbose
docker-compose exec js-scraper yarn scrape-telegram --verbose
docker-compose exec js-scraper yarn scrape-outlight --verbose
```

## 🔄 Scheduling

### Automatic Scheduling

To run scrapers on a schedule, you can:

1. **Use cron on the host system:**
```bash
# Add to crontab
0 */6 * * * /path/to/manage-js-scraper.sh run-tiktok
0 */4 * * * /path/to/manage-js-scraper.sh run-telegram
0 */8 * * * /path/to/manage-js-scraper.sh run-outlight
```

2. **Use Docker Compose with restart policies:**
```yaml
services:
  js-scraper:
    restart: unless-stopped
    # Runs continuously
```

3. **Create a scheduled Dockerfile (similar to Bitquery):**
```dockerfile
# Add cron to Dockerfile
RUN apk add --no-cache dcron
RUN echo "0 */6 * * * cd /app && yarn scrape-tiktok" | crontab -
RUN echo "0 */4 * * * cd /app && yarn scrape-telegram" | crontab -
RUN echo "0 */8 * * * cd /app && yarn scrape-outlight" | crontab -
CMD ["crond", "-f"]
```

## 📈 Performance Optimization

### Resource Limits
```yaml
services:
  js-scraper:
    deploy:
      resources:
        limits:
          memory: 2G
          cpus: '1.0'
        reservations:
          memory: 1G
          cpus: '0.5'
```

### Parallel Execution
```bash
# Run scrapers in parallel
docker-compose --profile individual up -d js-scraper-tiktok js-scraper-telegram js-scraper-outlight
```

### Log Rotation
```bash
# Create log rotation script
cat > /opt/wojat/rotate-scraper-logs.sh << 'EOF'
#!/bin/bash
docker-compose exec js-scraper find /var/log -name "*.log" -mtime +7 -delete
EOF

chmod +x /opt/wojat/rotate-scraper-logs.sh
```

## 🎉 Success Indicators

Your JS scraper service is working correctly when:

- ✅ Containers show "Up" status
- ✅ Logs show successful data collection
- ✅ Database contains fresh scraped data
- ✅ No error messages in logs
- ✅ Scrapers complete without crashes

## 📞 Support

If you encounter issues:

1. Check the logs: `./manage-js-scraper.sh logs`
2. Verify environment variables
3. Test individual scrapers: `./manage-js-scraper.sh run-tiktok`
4. Check Docker and Docker Compose status
5. Review this troubleshooting guide

The JS scraper service is now configured to collect data from TikTok, Telegram, and Outlight! 🚀
