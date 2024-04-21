# Stage 1: Build stage
FROM node:21-alpine3.18 AS build
EXPOSE 80
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build -- --configuration production

# Stage 2: Production stage
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/test-task/browser /usr/share/nginx/html
RUN echo "mainFileName=\"\$(ls /usr/share/nginx/html/main*.js)\" && \
          envsubst '\$API_ROOM_URL \$API_BUILDING_URL ' < \${mainFileName} > main.tmp && \
          mv main.tmp  \${mainFileName} && nginx -g 'daemon off;'" > run.sh

ENTRYPOINT ["sh", "run.sh"]

# Replace API_URL placeholder in JavaScript files
