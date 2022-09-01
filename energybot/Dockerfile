# create a docker container for a node app
FROM node:alpine
# copy the app
WORKDIR /usr/api
COPY . .
# download the dependencies
RUN npm install
# download the files
RUN npm run download
# start the app
CMD ["npm", "run", "start"]