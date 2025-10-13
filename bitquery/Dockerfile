# Use Node.js 20 LTS
FROM node:20-alpine

# Install build dependencies for native modules
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    py3-pip \
    linux-headers \
    libusb-dev \
    eudev-dev

# Set working directory
WORKDIR /app

# Install dependencies first (for better caching)
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/health || exit 1

# Start the application
CMD ["node", "server.mjs"]
