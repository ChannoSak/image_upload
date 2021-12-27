FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
COPY package-lock.json* .
RUN npm install
# Copying source files
COPY . .
EXPOSE 2100
CMD [ "node", "index.js" ]