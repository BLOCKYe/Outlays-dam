FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm install

COPY . .

CMD ["npm", "run", "dev"]