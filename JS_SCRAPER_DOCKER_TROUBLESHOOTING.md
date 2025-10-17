# JS Scraper Docker Troubleshooting Guide

## 🚨 Issue: Script Not Found Error

### Error Message
```
/usr/local/bin/docker-entrypoint.sh: exec: line 11: /app/start-all-scrapers.sh: not found
```

### Root Cause
This error occurs when:
1. The script file doesn't exist in the container
2. The script doesn't have execute permissions
3. The script was created after switching to a non-root user
4. File ownership issues prevent execution

### Solutions

#### Solution 1: Use Alternative Dockerfile (Recommended)
The alternative Dockerfile copies script files instead of creating them inline:

```bash
# Use the alternative Dockerfile
docker-compose build js-scraper
docker-compose up -d js-scraper
```

#### Solution 2: Debug Inside Container
```bash
# Check if scripts exist
docker-compose exec js-scraper ls -la /app/*.sh

# Check permissions
docker-compose exec js-scraper ls -la /app/start-all-scrapers.sh

# Check if executable
docker-compose exec js-scraper test -x /app/start-all-scrapers.sh && echo "Executable" || echo "Not executable"

# Check file content
docker-compose exec js-scraper head -10 /app/start-all-scrapers.sh
```

#### Solution 3: Manual Script Creation
```bash
# Create script manually inside container
docker-compose exec js-scraper bash -c 'cat > /app/start-all-scrapers.sh << "EOF"
#!/bin/bash
echo "🚀 Starting Wojat JS Scraper Service..."
echo "📊 Available scrapers: TikTok, Telegram, Outlight"
echo "⏰ Schedule: Every 3 hours"
echo ""
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
EOF'

# Make executable
docker-compose exec js-scraper chmod +x /app/start-all-scrapers.sh

# Test execution
docker-compose exec js-scraper /app/start-all-scrapers.sh
```

#### Solution 4: Rebuild with Debug
```bash
# Rebuild with verbose output
docker-compose build --no-cache js-scraper

# Check build logs for errors
docker-compose logs js-scraper

# Test the container
docker-compose run --rm js-scraper ls -la /app/
```

### Prevention

1. **Always create scripts before switching users**
2. **Use COPY instead of inline creation when possible**
3. **Verify file permissions after creation**
4. **Test scripts before setting up cron**

### Quick Fix Commands

```bash
# Stop current container
docker-compose stop js-scraper

# Remove container
docker-compose rm -f js-scraper

# Rebuild with alternative Dockerfile
docker-compose build js-scraper

# Start with logs
docker-compose up js-scraper
```

### Verification Steps

After applying the fix, verify:

1. **Scripts exist:**
   ```bash
   docker-compose exec js-scraper ls -la /app/*.sh
   ```

2. **Scripts are executable:**
   ```bash
   docker-compose exec js-scraper test -x /app/start-all-scrapers.sh
   ```

3. **Scripts can run:**
   ```bash
   docker-compose exec js-scraper /app/start-all-scrapers.sh
   ```

4. **Cron is set up:**
   ```bash
   docker-compose exec js-scraper crontab -l
   ```

5. **Service starts without errors:**
   ```bash
   docker-compose logs js-scraper
   ```

### Alternative Approach

If the issue persists, use a simpler CMD:

```dockerfile
CMD ["sh", "-c", "echo 'Starting scrapers...' && yarn scrape-tiktok && yarn scrape-telegram && yarn scrape-outlight && crond -f"]
```

This bypasses the script files entirely and runs the commands directly.
