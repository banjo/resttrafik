FROM node:16 AS builder

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm install
RUN npx prisma generate

COPY . .

RUN npm run build

FROM node:16
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY prisma ./prisma/
RUN npm install pm2@latest -g
COPY ./startup.sh ./startup.sh
RUN npx prisma generate

ENTRYPOINT [ "sh", "startup.sh" ]