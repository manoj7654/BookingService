FROM node:latest

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 4500

CMD node index.js

