# create a docker container for a node app
FROM node:alpine
# copy the app
WORKDIR /usr/api
# copy the package.json
COPY . .
# download the dependencies
RUN npm install
# download the files
# RUN node ftp/download_files.js
# start the app
CMD ["npm", "run", "start"]