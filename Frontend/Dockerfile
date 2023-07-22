# Use an official Node runtime as a parent image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire application to the container
COPY . .

# Build the React app (replace 'build' with your actual build command if different)
RUN npm run build

# Set the command to run the application
CMD ["npm", "start"]