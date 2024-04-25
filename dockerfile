# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory
WORKDIR /app

# Copy the backend package.json and package-lock.json files
COPY backend/package*.json ./backend/

# Install the backend dependencies
RUN cd backend && npm install

# Copy the backend code
COPY backend ./backend

# Build the backend (if needed)
# RUN cd backend && npm run build

# Copy the frontend files
COPY frontend ./frontend

# Expose the port your application runs on
EXPOSE 4000

# Start the backend server
CMD ["npm", "start", "--prefix", "backend"]