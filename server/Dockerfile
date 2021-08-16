# a LTS version of node
FROM node:14

# because argon2 complains that glibc 2.25 is required
RUN echo "deb http://ftp.debian.org/debian sid main" >> /etc/apt/sources.list
RUN apt-get -y update && apt-get -yt sid install libc6 libc6-dev libc6-dbg

WORKDIR /app
COPY . .

RUN yarn
RUN yarn compile

EXPOSE 8000
USER node

ENTRYPOINT ["node", "dist/index.js"]
