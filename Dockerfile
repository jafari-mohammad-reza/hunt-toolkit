FROM node:22
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
ENTRYPOINT ["node", "index.js"]
