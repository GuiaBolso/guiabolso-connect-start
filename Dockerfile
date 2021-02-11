# Builder
FROM node:14.15.1-stretch-slim AS builder

RUN mkdir /opt/app

WORKDIR /opt/app

COPY ./ /opt/app

RUN npm --only=production install

RUN npm run build

# Application
FROM nginx:1.19.5-alpine

ADD default.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /opt/app/dist/ /usr/share/nginx/html/
