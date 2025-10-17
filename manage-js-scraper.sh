#!/bin/bash

# Wojat JS Scraper Service Management Script
# This script helps manage the JS scraper services (TikTok, Telegram, Outlight)

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to show usage
show_usage() {
    echo "Wojat JS Scraper Service Management"
    echo ""
    echo "Usage: $0 [COMMAND] [OPTIONS]"
    echo ""
    echo "Commands:"
    echo "  start-all       Start all scrapers (TikTok, Telegram, Outlight)"
    echo "  start-tiktok    Start TikTok scraper only"
    echo "  start-telegram  Start Telegram scraper only"
    echo "  start-outlight  Start Outlight scraper only"
    echo "  stop            Stop all scraper services"
    echo "  restart         Restart all scraper services"
    echo "  status          Show service status"
    echo "  logs            Show recent logs"
    echo "  cron-logs       Show cron job logs"
    echo "  schedule        Show cron schedule"
    echo "  run-tiktok      Run TikTok scraper immediately"
    echo "  run-telegram    Run Telegram scraper immediately"
    echo "  run-outlight    Run Outlight scraper immediately"
    echo "  build           Build the JS scraper Docker images"
    echo "  help            Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 start-all          # Start all scrapers"
    echo "  $0 start-tiktok      # Start TikTok scraper only"
    echo "  $0 run-telegram       # Run Telegram scraper immediately"
    echo "  $0 logs               # View logs"
}

# Function to start all scrapers
start_all() {
    print_status "Starting all Wojat JS scrapers..."
    docker-compose up -d js-scraper
    print_success "All scrapers started"
    print_status "Running: TikTok, Telegram, Outlight"
}

# Function to start specific scraper
start_scraper() {
    local scraper_type=$1
    print_status "Starting $scraper_type scraper..."
    
    case $scraper_type in
        "tiktok")
            docker-compose --profile individual up -d js-scraper-tiktok
            ;;
        "telegram")
            docker-compose --profile individual up -d js-scraper-telegram
            ;;
        "outlight")
            docker-compose --profile individual up -d js-scraper-outlight
            ;;
        *)
            print_error "Unknown scraper type: $scraper_type"
            return 1
            ;;
    esac
    
    print_success "$scraper_type scraper started"
}

# Function to stop all scrapers
stop_all() {
    print_status "Stopping all Wojat JS scrapers..."
    docker-compose stop js-scraper js-scraper-tiktok js-scraper-telegram js-scraper-outlight 2>/dev/null || true
    print_success "All scrapers stopped"
}

# Function to restart all scrapers
restart_all() {
    print_status "Restarting all Wojat JS scrapers..."
    docker-compose restart js-scraper
    print_success "All scrapers restarted"
}

# Function to show service status
show_status() {
    print_status "Wojat JS Scraper Service Status:"
    echo ""
    
    # Check main scraper service
    if docker-compose ps js-scraper | grep -q "Up"; then
        print_success "✅ Main scraper service is running (all scrapers)"
    else
        print_warning "⚠️ Main scraper service is not running"
    fi
    
    # Check individual scraper services
    local services=("js-scraper-tiktok" "js-scraper-telegram" "js-scraper-outlight")
    local names=("TikTok" "Telegram" "Outlight")
    
    for i in "${!services[@]}"; do
        if docker-compose ps "${services[$i]}" | grep -q "Up"; then
            print_success "✅ ${names[$i]} scraper is running"
        else
            print_warning "⚠️ ${names[$i]} scraper is not running"
        fi
    done
    
    echo ""
    print_status "Container Information:"
    docker-compose ps | grep js-scraper
}

# Function to show logs
show_logs() {
    print_status "Showing recent JS scraper logs..."
    echo ""
    
    # Show main scraper logs
    if docker-compose ps js-scraper | grep -q "Up"; then
        print_status "Main Scraper Logs (last 50 lines):"
        docker-compose logs --tail=50 js-scraper
    fi
    
    # Show individual scraper logs
    local services=("js-scraper-tiktok" "js-scraper-telegram" "js-scraper-outlight")
    local names=("TikTok" "Telegram" "Outlight")
    
    for i in "${!services[@]}"; do
        if docker-compose ps "${services[$i]}" | grep -q "Up"; then
            echo ""
            print_status "${names[$i]} Scraper Logs:"
            docker-compose logs --tail=20 "${services[$i]}"
        fi
    done
}

# Function to show cron logs
show_cron_logs() {
    print_status "Showing JS scraper cron job logs..."
    echo ""
    
    if docker-compose ps js-scraper | grep -q "Up"; then
        print_status "Cron Job Logs (last 100 lines):"
        docker-compose exec js-scraper tail -100 /var/log/js-scraper/cron.log 2>/dev/null || echo "No cron logs available yet"
    else
        print_warning "JS scraper service is not running"
    fi
}

# Function to show cron schedule
show_schedule() {
    print_status "Showing JS scraper cron schedule..."
    echo ""
    
    if docker-compose ps js-scraper | grep -q "Up"; then
        print_status "Cron Schedule:"
        docker-compose exec js-scraper crontab -l 2>/dev/null || echo "No cron schedule found"
        echo ""
        print_status "Schedule Explanation:"
        echo "0 */3 * * * - Runs every 3 hours (at 00:00, 03:00, 06:00, 09:00, 12:00, 15:00, 18:00, 21:00)"
        echo "Runs: TikTok → Telegram → Outlight scrapers in sequence"
    else
        print_warning "JS scraper service is not running"
    fi
}

# Function to run scraper immediately
run_scraper() {
    local scraper_type=$1
    print_status "Running $scraper_type scraper immediately..."
    
    case $scraper_type in
        "tiktok")
            docker-compose --profile individual run --rm js-scraper-tiktok
            ;;
        "telegram")
            docker-compose --profile individual run --rm js-scraper-telegram
            ;;
        "outlight")
            docker-compose --profile individual run --rm js-scraper-outlight
            ;;
        *)
            print_error "Unknown scraper type: $scraper_type"
            return 1
            ;;
    esac
    
    print_success "$scraper_type scraper completed"
}

# Function to build images
build_images() {
    print_status "Building JS scraper Docker images..."
    docker-compose build js-scraper js-scraper-tiktok js-scraper-telegram js-scraper-outlight
    print_success "JS scraper Docker images built successfully"
}

# Main script logic
case "${1:-help}" in
    start-all)
        start_all
        ;;
    start-tiktok)
        start_scraper "tiktok"
        ;;
    start-telegram)
        start_scraper "telegram"
        ;;
    start-outlight)
        start_scraper "outlight"
        ;;
    stop)
        stop_all
        ;;
    restart)
        restart_all
        ;;
    status)
        show_status
        ;;
    logs)
        show_logs
        ;;
    cron-logs)
        show_cron_logs
        ;;
    schedule)
        show_schedule
        ;;
    run-tiktok)
        run_scraper "tiktok"
        ;;
    run-telegram)
        run_scraper "telegram"
        ;;
    run-outlight)
        run_scraper "outlight"
        ;;
    build)
        build_images
        ;;
    help|--help|-h)
        show_usage
        ;;
    *)
        print_error "Unknown command: $1"
        echo ""
        show_usage
        exit 1
        ;;
esac
