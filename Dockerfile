FROM node:lts-alpine AS builder

WORKDIR /apps

COPY . .

RUN npm i

RUN npm run build

ENTRYPOINT [ "npm", "run", "start" ]