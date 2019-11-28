FROM node:alpine

WORKDIR /app

ADD package.json /app
RUN npm install

ADD app.js /app
ADD combined.log /app
ADD public /app/public

EXPOSE 8081

ENTRYPOINT [ "node", "app.js" ]
