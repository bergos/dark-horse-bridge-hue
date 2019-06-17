FROM node:10-slim

RUN mkdir -p /usr/src/app
COPY . /usr/src/app

WORKDIR /usr/src/app
RUN npm install --only=prod

CMD ["npm", "start"]
