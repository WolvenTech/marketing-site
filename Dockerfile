# syntax=docker/dockerfile:1

FROM node:24-alpine AS builder
WORKDIR /app
RUN corepack enable

COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM node:24-alpine AS runner
WORKDIR /app

# GNU-compatible wget for the parent deployment's Docker healthcheck:
# wget --quiet --tries=1 --spider http://127.0.0.1:3000/healthz
RUN apk add --no-cache wget

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

ENV PORT=3000 HOSTNAME=0.0.0.0 NODE_ENV=production
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1:3000/healthz || exit 1

CMD ["node", "server.js"]
