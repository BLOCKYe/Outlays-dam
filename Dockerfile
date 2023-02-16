FROM node:16-bullseye-slim

WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./prisma

RUN npm install
RUN npx prisma generate
RUN rm -rf prisma

RUN mkdir -p .next
RUN chown node:node . node_modules .next
RUN chown -R node:node node_modules/.prisma

USER node

# debug
# RUN ls -la node_modules/.prisma/client

CMD ["npm", "run", "dev"]