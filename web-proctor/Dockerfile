FROM node:lts AS runtime
WORKDIR /app

COPY . .

ARG app_token
ENV ASTRO_STUDIO_APP_TOKEN=${app_token}

RUN npm install
RUN npm run build

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD node ./dist/server/entry.mjs