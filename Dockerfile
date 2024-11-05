FROM node:lts-buster

RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  
COPY package.json .

RUN npm install && npm install -g qrcode-terminal pm2

COPY . .

EXPOSE 3000


CMD ["pm2-runtime", "start", "index.js"]