FROM node:17.2.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install --silent
RUN npm install react-scripts -g --silent

COPY . .
EXPOSE 3000
CMD ["npm", "start"]