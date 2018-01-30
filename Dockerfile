# base image
FROM node:8.9.4  as build-node
RUN mkdir /app
WORKDIR /app
ADD . /app
RUN npm install
RUN yarn
RUN yarn build

FROM nginx
COPY --from=build-node /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]