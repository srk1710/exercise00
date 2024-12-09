# Use official Node.js image as the base image
FROM node:lts

# Set working directory
WORKDIR /usr/src/app

# Define build argument for REACT_APP_API_URL
ARG REACT_APP_API_URL

# Set the environment variable for React build process
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the build directory into the container
COPY ./build ./build

# Expose the port your app runs on
EXPOSE 8080

# Command to serve the frontend app
CMD ["npx", "serve", "-s", "build", "-l", "8080"]
