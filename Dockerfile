FROM node:lts-alpine
RUN apk update && apk upgrade
WORKDIR /home/node
COPY . .
RUN chmod +x start.sh
EXPOSE 3000
EXPOSE 3001
ENTRYPOINT ["./start.sh"]
