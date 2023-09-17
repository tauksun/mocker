FROM node:18-alpine
WORKDIR /app
COPY ./dist /app
CMD ["npm","start"]

