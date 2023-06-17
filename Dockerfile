FROM node:17

WORKDIR /app

COPY ./package*.json ./

RUN npm install prettier -g

RUN npm install

COPY . .


EXPOSE 4500

CMD ["npm", "run","server"]

