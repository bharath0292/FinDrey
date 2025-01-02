# syntax = docker/dockerfile:1
FROM node:22-slim AS next-build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy the Next.js application source code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port and start Next.js
EXPOSE 3000
CMD ["npm", "run", "start"]
