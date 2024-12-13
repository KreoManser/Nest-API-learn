FROM node:22-alpine
WORKDIR /opt/top-api-app
ADD packaje.json packaje.json
RUN npm install
ADD . .
RUN npm run build
RUN npm prune --production
CMD ["node", "./dist/main.js"]