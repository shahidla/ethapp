FROM node:14
# Create app directory
WORKDIR /usr/src/mlservice
# Install app dependencies
COPY ./package.json ./
# COPY ./ ./
RUN npm install

# If you are building your code for production
# RUN npm ci --only=production
# Bundle app source
COPY ./ ./

EXPOSE 3050


CMD ["npm","start"]

