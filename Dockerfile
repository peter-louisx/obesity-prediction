# Stage 1: Build the React app
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm i --force

COPY . .

ARG API_URL 
ENV REACT_APP_API_URL=$API_URL

RUN npm run build

# Stage 2: Serve the build with a lightweight web server
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

# Optional: Copy custom nginx config if needed
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]