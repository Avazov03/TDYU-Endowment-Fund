# Production image: Express + public dump + admin dist.
# Bind published ports to 127.0.0.1 on the host so other vhosts stay untouched.
FROM node:20-alpine

WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=18787

COPY package.json package-lock.json ./
COPY server/prisma ./server/prisma
RUN npm ci --omit=dev && npx prisma generate --schema server/prisma/schema.prisma

COPY server ./server
COPY public ./public
COPY dist ./dist

RUN mkdir -p server/uploads \
  && addgroup -S tdyu && adduser -S tdyu -G tdyu \
  && chown -R tdyu:tdyu /app

USER tdyu
EXPOSE 18787
CMD ["node", "server/src/index.mjs"]
