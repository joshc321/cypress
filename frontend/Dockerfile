# syntax=docker/dockerfile:1

# Build react client
FROM node:16-alpine 

# Working directory be app
WORKDIR /usr/src/app

COPY package*.json ./

###  Installing dependencies

RUN npm install --production

# copy local files to app folder
COPY . .

EXPOSE 3000

CMD ["npm","start"]