# Use Node.js 18 LTS as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN npm install

# Copy frontend package files
COPY frontend/package*.json ./frontend/
COPY frontend/yarn.lock ./frontend/

# Install frontend dependencies
RUN cd frontend && npm install

# Copy all source code
COPY . .

# Build the frontend
RUN cd frontend && npm run build

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Start the application
CMD ["cd", "frontend", "&&", "npm", "run", "start"]
