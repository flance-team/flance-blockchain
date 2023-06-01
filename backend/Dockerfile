#build stage
FROM node:lts-hydrogen AS build

WORKDIR /api

# copy deps yang ada di apps ke WORKDIR
COPY ["package*.json", "yarn*.lock", "./"]

RUN yarn install

COPY . .

RUN yarn build


#prod stage
FROM node:lts-hydrogen

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /api

COPY --from=build ./api/dist ./dist

COPY ["package*.json", "yarn*.lock", "./"]

RUN yarn install --production

RUN rm package*.json
RUN rm yarn*.lock

EXPOSE 3000

CMD [ "node", "dist/main.js" ]