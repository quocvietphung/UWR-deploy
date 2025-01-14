# Use an official Node.js runtime as the base image
FROM node:19.6.0-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json file to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Specify the command to run the React app
CMD [ "npm", "start" ]