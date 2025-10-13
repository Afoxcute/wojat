#!/bin/bash

# Wojat Platform - Railway Deployment Script
# This script helps deploy all services to Railway with proper Node.js 20 configuration

set -e

echo "🚀 Wojat Platform - Railway Deployment Script"
echo "=============================================="

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

# Check if Railway CLI is installed
check_railway_cli() {
    if ! command -v railway &> /dev/null; then
        print_error "Railway CLI is not installed!"
        echo "Please install it with: npm install -g @railway/cli"
        exit 1
    fi
    print_success "Railway CLI is installed"
}

# Check if user is logged in to Railway
check_railway_login() {
    if ! railway whoami &> /dev/null; then
        print_error "Not logged in to Railway!"
        echo "Please login with: railway login"
        exit 1
    fi
    print_success "Logged in to Railway"
}

# Deploy a service
deploy_service() {
    local service_name=$1
    local service_path=$2
    local dockerfile_name=${3:-"Dockerfile"}
    
    print_status "Deploying $service_name from $service_path..."
    
    cd "$service_path"
    
    # Check if Dockerfile exists
    if [ ! -f "$dockerfile_name" ]; then
        print_error "Dockerfile $dockerfile_name not found in $service_path"
        return 1
    fi
    
    # Deploy to Railway
    if railway deploy --detach; then
        print_success "$service_name deployed successfully!"
    else
        print_error "Failed to deploy $service_name"
        return 1
    fi
    
    cd - > /dev/null
}

# Main deployment function
main() {
    print_status "Starting Wojat Platform deployment to Railway..."
    
    # Check prerequisites
    check_railway_cli
    check_railway_login
    
    # Deploy services
    print_status "Deploying all services..."
    
    # Frontend
    deploy_service "Frontend" "frontend" "Dockerfile"
    
    # Bitquery Service
    deploy_service "Bitquery Service" "bitquery" "Dockerfile"
    
    # ElizaOS Agents
    deploy_service "ElizaOS Agents" "elizaos-agents" "Dockerfile"
    
    # Telegram Scraper
    deploy_service "Telegram Scraper" "js-scraper" "Dockerfile-telegram"
    
    # Outlight Scraper
    deploy_service "Outlight Scraper" "js-scraper" "Dockerfile-outlight"
    
    # TikTok Scraper
    deploy_service "TikTok Scraper" "js-scraper" "Dockerfile-tiktok"
    
    print_success "All services deployed successfully!"
    print_status "Check your Railway dashboard for deployment status and URLs"
}

# Handle script arguments
case "${1:-}" in
    "frontend")
        deploy_service "Frontend" "frontend" "Dockerfile"
        ;;
    "bitquery")
        deploy_service "Bitquery Service" "bitquery" "Dockerfile"
        ;;
    "elizaos")
        deploy_service "ElizaOS Agents" "elizaos-agents" "Dockerfile"
        ;;
    "telegram")
        deploy_service "Telegram Scraper" "js-scraper" "Dockerfile-telegram"
        ;;
    "outlight")
        deploy_service "Outlight Scraper" "js-scraper" "Dockerfile-outlight"
        ;;
    "tiktok")
        deploy_service "TikTok Scraper" "js-scraper" "Dockerfile-tiktok"
        ;;
    "help"|"-h"|"--help")
        echo "Usage: $0 [service]"
        echo ""
        echo "Services:"
        echo "  frontend   - Deploy frontend service"
        echo "  bitquery   - Deploy bitquery service"
        echo "  elizaos    - Deploy elizaos-agents service"
        echo "  telegram   - Deploy telegram scraper"
        echo "  outlight   - Deploy outlight scraper"
        echo "  tiktok     - Deploy tiktok scraper"
        echo ""
        echo "If no service is specified, all services will be deployed."
        ;;
    "")
        main
        ;;
    *)
        print_error "Unknown service: $1"
        echo "Use '$0 help' for usage information"
        exit 1
        ;;
esac
