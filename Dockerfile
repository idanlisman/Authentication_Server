# Dockerfile following best practices from:
# https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/

# ------------------------------------
# Preparation build stage
FROM node:18.16.0-alpine3.17 as builder

ENV NODE_ENV build

# Don't run Node.js apps as root
RUN mkdir -p /usr/app && chown -R node:node /usr/app
USER node
WORKDIR /usr/app

COPY --chown=node:node . .

# Install only production dependencies
RUN npm ci \
    && npm run build \
    && npm prune --production

# -------------------------------------
# Actual final Docker image build stage
FROM node:18.16.0-alpine3.17

USER node
WORKDIR /usr/app

COPY --from=builder /usr/app/package*.json  /usr/app/
COPY --from=builder /usr/app/node_modules/  /usr/app/node_modules/
COPY --from=builder /usr/app/dist/          /usr/app/dist/

EXPOSE 3002

ENV NODE_ENV prod
CMD ["node", "dist/app"]