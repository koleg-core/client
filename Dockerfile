# Stage 1
ARG NODE_VERSION=14.15.1

FROM node:${NODE_VERSION}-alpine3.11 as build

ARG VERSION="0.0.0"
ARG PROD="true"

# define build configs into:
# .env .env.xx.xx
#ARG ENV="env.dev"

ENV VERSION=${VERSION} \
    PROD=${PROD} \
    NODE_OPTIONS="--max-old-space-size=8192"

WORKDIR /app
COPY package.json ./
COPY . ./

# TODO: only for debug
RUN npm install

VOLUME /app/node_modules

RUN npm run build --prod=${PROD}

VOLUME /app/dist

# Stage 2 - the production environment
FROM nginx:alpine

ENV NODE_OPTIONS="--max-old-space-size=8192"

# RUN rm -fr \
#   /etc/nginx/nginx.conf \
#   /usr/share/nginx/html

COPY nginx.conf /etc/nginx/

COPY --from=build /app/dist/client /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
