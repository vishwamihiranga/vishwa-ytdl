FROM node:lts-buster

# Update package lists and install required packages
RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y

# Copy package.json and install dependencies
COPY package.json ./

# Install npm dependencies
RUN npm install && npm install -g qrcode-terminal pm2

# Copy the rest of your application code
COPY . .

# Expose the port your application runs on
EXPOSE 3000

# Start the application using pm2-runtime
CMD ["pm2-runtime", "start", "index.js"]
