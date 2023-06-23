# Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /app
COPY ./package.json ./
# COPY --from=deps /app/node_modules ./node_modules
COPY ./shared ./shared
COPY ./ui-toolkit ./ui-toolkit
COPY ./super-admin-app ./super-admin-app
RUN yarn install

# Next.js collects anonymous telemetry data about general usage, which we opt out from
# https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build:super

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

RUN apk add --no-cache bash
# Disable telemetry during runtime
ENV NEXT_TELEMETRY_DISABLED 1

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder /app/super-admin-app/.next ./.next

COPY --from=builder /app/super-admin-app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/super-admin-app/env.sh ./env.sh

COPY .buildinfo ./

EXPOSE 3000

ENV PORT 3000

RUN chmod +x ./env.sh
ENTRYPOINT ["./env.sh"]

CMD ["npx", "next", "start"]