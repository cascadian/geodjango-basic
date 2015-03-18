from node:0.12
RUN npm install nodemon -g
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app/web && cp -a /tmp/node_modules /opt/app
WORKDIR /opt/app
COPY . /opt/app/web
