# Use official lightweight Node.js image
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy dependency files first (better layer caching)
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy the rest of the app source
COPY . .

# Expose the port the app listens on
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]