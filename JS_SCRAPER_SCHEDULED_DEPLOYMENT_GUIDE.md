# Wojat JS Scraper Service - Scheduled Deployment Guide

## 🎯 Overview

The Wojat JS Scraper Service now runs **all three scrapers (TikTok, Telegram, Outlight) every 3 hours** automatically using cron scheduling within Docker containers.

## ⏰ Schedule Details

**Cron Schedule:** `0 */3 * * *` (Every 3 hours)
- **00:00** - Midnight
- **03:00** - 3 AM
- **06:00** - 6 AM
- **09:00** - 9 AM
- **12:00** - Noon
- **15:00** - 3 PM
- **18:00** - 6 PM
- **21:00** - 9 PM

**Execution Order:**
1. 📱 **TikTok Scraper** (`yarn scrape-tiktok`)
2. 📢 **Telegram Scraper** (`yarn scrape-telegram`)
3. 🔍 **Outlight Scraper** (`yarn scrape-outlight`)

## 🚀 Quick Start

### Start Scheduled Service
```bash
# Linux/Mac
./manage-js-scraper.sh start-all

# Windows
manage-js-scraper.bat start-all

# Docker Compose
docker-compose up -d js-scraper
```

### Check Schedule
```bash
# Linux/Mac
./manage-js-scraper.sh schedule

# Windows
manage-js-scraper.bat schedule

# Direct Docker command
docker-compose exec js-scraper crontab -l
```

## 📋 Management Commands

### Service Control
| Command | Description |
|---------|-------------|
| `start-all` | Start scheduled scraper service |
| `stop` | Stop all scraper services |
| `restart` | Restart scheduled service |
| `status` | Show service status |

### Monitoring
| Command | Description |
|---------|-------------|
| `logs` | Show recent service logs |
| `cron-logs` | Show cron job execution logs |
| `schedule` | Display cron schedule |

### Manual Execution
| Command | Description |
|---------|-------------|
| `run-tiktok` | Run TikTok scraper immediately |
| `run-telegram` | Run Telegram scraper immediately |
| `run-outlight` | Run Outlight scraper immediately |

## 📊 Monitoring and Logs

### Check Service Status
```bash
# Using management script
./manage-js-scraper.sh status

# Using Docker Compose
docker-compose ps js-scraper
```

### View Cron Logs
```bash
# Cron job execution logs
./manage-js-scraper.sh cron-logs

# Service logs
./manage-js-scraper.sh logs

# Direct Docker command
docker-compose exec js-scraper tail -100 /var/log/js-scraper/cron.log
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

## 🔧 Configuration

### Environment Variables
Ensure your `.env` file contains all required variables:

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
```

### Docker Compose Configuration
```yaml
services:
  js-scraper:
    build:
      context: ./js-scraper
      dockerfile: Dockerfile
    environment:
      - NODE_ENV=production
    env_file:
      - .env
    restart: unless-stopped
    volumes:
      - js_scraper_logs:/var/log/js-scraper
    networks:
      - wojat-network

volumes:
  js_scraper_logs:
```

## 🛠️ Troubleshooting

### Common Issues

**1. Cron Not Running**
```bash
# Check if cron daemon is running
docker-compose exec js-scraper ps aux | grep cron

# Check cron logs
docker-compose exec js-scraper tail -f /var/log/js-scraper/cron.log

# Restart service
docker-compose restart js-scraper
```

**2. Scrapers Failing**
```bash
# Check individual scraper logs
docker-compose exec js-scraper yarn scrape-tiktok
docker-compose exec js-scraper yarn scrape-telegram
docker-compose exec js-scraper yarn scrape-outlight

# Check environment variables
docker-compose exec js-scraper env | grep -E "(SUPABASE|TIKTOK|TELEGRAM|OUTLIGHT)"
```

**3. Chrome/Puppeteer Issues**
```bash
# Check Chrome installation
docker-compose exec js-scraper chromium-browser --version

# Check Puppeteer configuration
docker-compose exec js-scraper node -e "console.log(process.env.PUPPETEER_EXECUTABLE_PATH)"
```

### Manual Testing

```bash
# Test individual scrapers
./manage-js-scraper.sh run-tiktok
./manage-js-scraper.sh run-telegram
./manage-js-scraper.sh run-outlight

# Test cron script directly
docker-compose exec js-scraper /app/cron-scraper.sh
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

### Log Rotation
```bash
# Create log rotation script
cat > /opt/wojat/rotate-js-scraper-logs.sh << 'EOF'
#!/bin/bash
docker-compose exec js-scraper find /var/log/js-scraper -name "*.log" -mtime +7 -delete
EOF

chmod +x /opt/wojat/rotate-js-scraper-logs.sh
```

### Monitoring Script
```bash
# Create monitoring script
cat > /opt/wojat/monitor-js-scraper.sh << 'EOF'
#!/bin/bash
echo "=== Wojat JS Scraper Status ==="
echo "Service Status:"
docker-compose ps js-scraper
echo ""
echo "Recent Cron Logs:"
docker-compose exec js-scraper tail -20 /var/log/js-scraper/cron.log
echo ""
echo "Resource Usage:"
docker stats js-scraper --no-stream
EOF

chmod +x /opt/wojat/monitor-js-scraper.sh
```

## 🔄 Schedule Customization

### Change Schedule Frequency

To modify the schedule, edit the Dockerfile:

```dockerfile
# Current: Every 3 hours
RUN echo "0 */3 * * * /app/cron-scraper.sh >> /var/log/js-scraper/cron.log 2>&1" | crontab -

# Every hour
RUN echo "0 * * * * /app/cron-scraper.sh >> /var/log/js-scraper/cron.log 2>&1" | crontab -

# Every 6 hours
RUN echo "0 */6 * * * /app/cron-scraper.sh >> /var/log/js-scraper/cron.log 2>&1" | crontab -

# Every 12 hours
RUN echo "0 */12 * * * /app/cron-scraper.sh >> /var/log/js-scraper/cron.log 2>&1" | crontab -
```

### Different Schedules for Each Scraper

Create separate cron jobs for different frequencies:

```dockerfile
# TikTok every 2 hours, Telegram every 4 hours, Outlight every 6 hours
RUN echo "0 */2 * * * cd /app && yarn scrape-tiktok >> /var/log/js-scraper/cron.log 2>&1" | crontab -
RUN echo "0 */4 * * * cd /app && yarn scrape-telegram >> /var/log/js-scraper/cron.log 2>&1" | crontab -
RUN echo "0 */6 * * * cd /app && yarn scrape-outlight >> /var/log/js-scraper/cron.log 2>&1" | crontab -
```

## 🎉 Success Indicators

Your scheduled JS scraper service is working correctly when:

- ✅ Container shows "Up" status
- ✅ Cron daemon is running (`ps aux | grep cron`)
- ✅ Cron logs show successful executions
- ✅ Database contains fresh scraped data every 3 hours
- ✅ No error messages in cron logs
- ✅ All three scrapers complete successfully

## 📞 Support

If you encounter issues:

1. **Check cron logs:** `./manage-js-scraper.sh cron-logs`
2. **Verify schedule:** `./manage-js-scraper.sh schedule`
3. **Test individual scrapers:** `./manage-js-scraper.sh run-tiktok`
4. **Check environment variables**
5. **Review this troubleshooting guide**

## 🚀 Deployment Commands

### Ubuntu Server Deployment
```bash
# Build and start
docker-compose up -d js-scraper

# Check status
./manage-js-scraper.sh status

# View logs
./manage-js-scraper.sh cron-logs

# Monitor schedule
./manage-js-scraper.sh schedule
```

The JS scraper service now automatically runs all three scrapers every 3 hours! 🎯
