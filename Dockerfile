FROM node:5.7.0

RUN mkdir -p /app

ADD . /app
RUN npm i

WORKDIR /app
EXPOSE 4000

CMD npm start
