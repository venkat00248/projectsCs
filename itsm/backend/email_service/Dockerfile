FROM node:18.13.0

RUN apt-get update
RUN apt install -y curl
RUN apt install -y nano
RUN mkdir -p  /usr/src/app
WORKDIR /usr/src/app


COPY . /usr/src/app
RUN npm install
RUN npm install nodemon@1.19.4 -g
RUN npm install express-gateway -g

EXPOSE 8082

CMD ["nodemon", "index.js", "--legacy-watch"]
