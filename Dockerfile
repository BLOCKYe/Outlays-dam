FROM node:16

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY prisma ./prisma

CMD [ "npm", "run", "dev" ]