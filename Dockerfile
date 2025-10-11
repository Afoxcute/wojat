# Multi-stage Dockerfile for Wojat Platform
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy frontend package files
COPY frontend/package*.json ./frontend/
RUN cd frontend && yarn install --frozen-lockfile

# Copy elizaos-agents package files
COPY elizaos-agents/package*.json ./elizaos-agents/
RUN cd elizaos-agents && yarn install --frozen-lockfile

# Copy js-scraper package files
COPY js-scraper/package*.json ./js-scraper/
RUN cd js-scraper && yarn install --frozen-lockfile

# Copy bitquery package files
COPY bitquery/package*.json ./bitquery/
RUN cd bitquery && yarn install --frozen-lockfile

# Build stage
FROM base AS builder
WORKDIR /app

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/frontend/node_modules ./frontend/node_modules
COPY --from=deps /app/elizaos-agents/node_modules ./elizaos-agents/node_modules
COPY --from=deps /app/js-scraper/node_modules ./js-scraper/node_modules
COPY --from=deps /app/bitquery/node_modules ./bitquery/node_modules

# Copy source code
COPY . .

# Build frontend
RUN cd frontend && yarn build

# Production stage
FROM base AS runner
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 wojat

# Copy built application
COPY --from=builder --chown=wojat:nodejs /app/frontend/out ./frontend/out
COPY --from=builder --chown=wojat:nodejs /app/elizaos-agents ./elizaos-agents
COPY --from=builder --chown=wojat:nodejs /app/js-scraper ./js-scraper
COPY --from=builder --chown=wojat:nodejs /app/bitquery ./bitquery
COPY --from=builder --chown=wojat:nodejs /app/server.js ./
COPY --from=builder --chown=wojat:nodejs /app/package*.json ./

# Install production dependencies
RUN yarn install --production --frozen-lockfile --legacy-peer-deps

# Switch to non-root user
USER wojat

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start the application
CMD ["node", "server.js"]
