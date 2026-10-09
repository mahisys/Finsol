# Production image for the Finsol website + CMS + CRM
# Build:  docker build -t finsol .
# Run:    see docker-compose.yml (persists the database and uploads in a volume)

FROM node:22-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# Pages render per request, so no database is needed at build time
RUN PAYLOAD_SECRET=build-only-secret DATABASE_URL=file:/tmp/build.db npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    DATABASE_URL=file:/app/data/finsol.db \
    MEDIA_DIR=/app/data/media \
    PRIVATE_UPLOADS_DIR=/app/data/private-uploads

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs \
  && mkdir -p /app/data && chown nextjs:nodejs /app/data

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
VOLUME ["/app/data"]
EXPOSE 3000
# Database migrations run automatically on start-up
CMD ["node", "server.js"]
