FROM strapi/base

WORKDIR /usr/src/app/client

# Install client dependencies
COPY ./client/package.json .
COPY ./client/yarn.lock .
RUN yarn install

# Build client
COPY ./client .
RUN PUBLIC_URL=/frontend yarn build

WORKDIR /usr/src/app

# Install app dependencies
COPY ./server/package.json .
COPY ./server/yarn.lock .
RUN yarn install

# Bundle app source
COPY ./server .
RUN rm -rf ./public/frontend \
    mkdir ./public/frontend \
    mv ./client/build/* ./public/frontend/ \
    rm -rf ./client

# Set the env to prod for build
ENV NODE_ENV production

# Build admin
RUN yarn build

# Port mapping
EXPOSE 1337

# Run when the container is started
CMD yarn start