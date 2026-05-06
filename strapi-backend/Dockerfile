FROM node:20-alpine AS build

RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---

FROM node:20-alpine

RUN apk add --no-cache vips-dev

WORKDIR /app

COPY --from=build /app/package.json /app/package-lock.json ./
RUN echo '{"compilerOptions":{"outDir":"dist"},"include":["src"]}' > tsconfig.json && mkdir -p src && echo 'export {}' > src/index.ts
RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist
COPY --from=build /app/database ./database
COPY --from=build /app/public ./public

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=1337

EXPOSE 1337

CMD ["npm", "run", "start"]
