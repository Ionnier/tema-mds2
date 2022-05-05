FROM node:16.13.2-alpine

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

ARG PORT=3000
ENV PORT=$PORT

ARG JWT_SECRET=ASDSADASD
ENV JWT_SECRET=$JWT_SECRET

RUN npm i npm@latest -g

RUN mkdir /app/
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

CMD [ "node", "index.js" ]