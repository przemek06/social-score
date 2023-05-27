FROM node:18.16.0

# install app dependencies
COPY package.json /app/
COPY package-lock.json /app/
COPY index.js /app/
COPY src /app/src

WORKDIR /app
RUN npm install --silent

# start app
CMD ["node", "index.js"]