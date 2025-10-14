# Wojat Platform Dockerfile for Railway
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package.json yarn.lock ./
COPY frontend/package.json frontend/yarn.lock ./frontend/
COPY elizaos-agents/package.json elizaos-agents/yarn.lock ./elizaos-agents/
COPY js-scraper/package.json js-scraper/yarn.lock ./js-scraper/
COPY bitquery/package.json bitquery/yarn.lock ./bitquery/

# Install root dependencies
RUN yarn install

# Install frontend dependencies
WORKDIR /app/frontend
RUN yarn install

# Install elizaos-agents dependencies
WORKDIR /app/elizaos-agents
RUN yarn install

# Install js-scraper dependencies
WORKDIR /app/js-scraper
RUN yarn install

# Install bitquery dependencies
WORKDIR /app/bitquery
RUN yarn install

# Copy source code
WORKDIR /app
COPY . .

# Build frontend
WORKDIR /app/frontend
RUN yarn build

# Set working directory back to root
WORKDIR /app

# Expose port
EXPOSE 3000

# Start the application
CMD ["yarn", "wojat:railway"]
