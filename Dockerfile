FROM node:20-slim

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve

EXPOSE 4200

CMD ["serve", "-s", "build", "-l", "4200"]