# create a docker container for a node app
FROM node:alpine
# copy the app
USER node
WORKDIR /usr/api
COPY --chown=node:node . .
# download the dependencies
RUN npm install
# download the files
RUN node ftp/download_files.js

ENV DEBUG=api:*

# start the app
CMD ["npm", "run", "dev"]