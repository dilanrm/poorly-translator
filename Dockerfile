FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install --global nodemon

# FROM gcr.io/distroless/nodejs:12

COPY . .

ENV PORT=3000

EXPOSE 3000

CMD ["npm","start"]