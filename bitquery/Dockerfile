# Bitquery Service Dockerfile
FROM node:18-alpine

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
RUN adduser -S bitquery -u 1001

# Change ownership
RUN chown -R bitquery:nodejs /app
USER bitquery

# Expose port (if needed)
EXPOSE 3002

# Start the application
CMD ["node", "index.mjs"]
