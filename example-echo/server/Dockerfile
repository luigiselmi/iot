FROM node:alpine

WORKDIR /app

ADD package.json /app
RUN npm install

ADD app.js /app
ADD combined.log /app

EXPOSE 8082

ENTRYPOINT [ "node", "app.js" ]
