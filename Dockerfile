# Stage 1
ARG NODE_VERSION=14.15.1

FROM node:${NODE_VERSION}-alpine3.11 as build

ARG VERSION="0.0.0"
ARG PROD="true"
ARG ENV="master"

# define build configs into:
# .env .env.xx.xx
#ARG ENV="env.dev"

ENV VERSION=${VERSION} \
    PROD=${PROD} \
    ENV=${ENV} \
    NODE_OPTIONS="--max-old-space-size=8192"

WORKDIR /app
COPY package.json ./
COPY . ./

# TODO: only for debug
RUN npm install

VOLUME /app/node_modules

RUN npm run build:${ENV} --prod=${PROD}

VOLUME /app/dist

# Stage 2 - the production environment
FROM nginx:alpine

RUN rm -fr \
    /etc/nginx/conf.d/default.conf
#   /etc/nginx/nginx.conf \
#   /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/client.conf

COPY --from=build /app/dist/client /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
