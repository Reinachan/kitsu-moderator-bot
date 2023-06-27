FROM node:16

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY ["secrets.json", "package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../

COPY . .

CMD ["npm", "start"]
