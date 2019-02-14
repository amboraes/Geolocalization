FROM node:11

ARG PORT=3000
ENV PORT $PORT

WORKDIR /usr/src/app
COPY . ./

RUN npm install --test

EXPOSE 3000
CMD npm start
