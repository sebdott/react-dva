# base image
FROM node:8.9.4  as build-node
RUN mkdir /app
WORKDIR /app
ADD . /app
RUN npm install
RUN yarn
RUN yarn build
# EXPOSE 8000
# CMD yarn startP

# Stage 2 - the production environment
FROM nginx
COPY --from=build-node /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]