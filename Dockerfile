FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN npm install && npm cache clean --force

COPY . /app

EXPOSE 1150

ENTRYPOINT ["nodemon", "/usr/src/index.ts"]  

CMD ["npm", "run", "dev"]
