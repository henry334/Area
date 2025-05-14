# Use Node.js LTS image as the base image
FROM node:lts-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the app files
COPY . .

RUN mkdir -p /usr/src/app/output/
RUN ln -s /usr/src/app/output/mobile.apk .

# Expose the port that the Next.js app will run on
EXPOSE 8081

# Start the Next.js app
CMD ["npm", "run", "dev"]
