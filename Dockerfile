FROM node:14.17.0-alpine

# speed up npm install a little on docker
# RUN npm config set registry http://registry.npmjs.org/

# install webpack and forever globally
# RUN npm install webpack -g
# RUN npm install forever -g
# RUN yarn
# Create app directory
# WORKDIR /usr/src/app
WORKDIR /app

# Install app dependencies
COPY package.json .
RUN npm install

# Bundle app source
COPY . .

# build production app w/ webpack
# RUN ["npm", "build"]
# EXPOSE 80
EXPOSE 3001
CMD ["npm", "start" ]