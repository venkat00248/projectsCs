FROM node:18.3.0
ENV TZ=Asia/Kolkata
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
WORKDIR /opt/backend
COPY . .
RUN npm install
RUN npm install forever -g
EXPOSE 3292
CMD ["forever","index.js"]
