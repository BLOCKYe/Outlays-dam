FROM node:18.1.0-alpine3.15

WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./prisma

RUN npm install
RUN npx prisma generate


CMD ["npm", "run", "dev"]