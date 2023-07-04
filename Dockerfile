FROM node:18 AS builder
WORKDIR /app
COPY . .

#ARGS
ARG backHost
ARG backPath
ARG frontHost
RUN echo window.dc_env = {backHost: \"$backHost\", \
    backPath: \"$backPath\", \
    frontHost: \"$frontHost\"}  \
    > public/env.js
#END ARGS
RUN npm i
RUN npm run build

FROM nginx
#COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]