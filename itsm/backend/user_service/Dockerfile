FROM ubuntu:22.04

RUN apt-get update
ENV NODE_VERSION=18.13.0
RUN apt install -y curl
RUN apt install -y nano 
RUN apt install -y iputils-ping 
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN node --version
RUN npm --version


RUN mkdir -p  /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN npm install

RUN npm install nodemon -g

RUN npm run build

EXPOSE 8080 8081

#CMD ["nodemon", "server.js", "--legacy-watch"]

# CMD ["npm", "run", "dev"]        #working

CMD ["nodemon", "dist/tsc/src/index.js", "--legacy-watch"]     #working
