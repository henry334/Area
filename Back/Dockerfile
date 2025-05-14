FROM node:18

WORKDIR /usr/src/app

COPY . .

RUN npm install

COPY prisma/schema.prisma ./prisma/

RUN npx prisma generate
COPY setupDb.sh /docker-entrypoint-initdb.d/

EXPOSE 8080

CMD ["npm", "start"]
