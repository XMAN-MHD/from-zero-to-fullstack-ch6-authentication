# Build stage
FROM node:20 AS build

ARG VITE_BACKEND_URL=http://localhost:3001/api/v1
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM nginx:alpine AS final

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80