# ElizaOS Agents Dockerfile
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S elizaos -u 1001

# Change ownership
RUN chown -R elizaos:nodejs /app
USER elizaos

# Expose port (if needed)
EXPOSE 3001

# Start the application
CMD ["node", "phase2-orchestrator.js"]
