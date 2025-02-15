ARG NODE_VERSION=22.5

FROM node:${NODE_VERSION}-alpine

# Установка рабочей директории
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build

