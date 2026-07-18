---
name: nextjs-marketing
description: >-
  This repo's specific Next.js contract — the unauthenticated `/healthz`
  route, `output: 'standalone'`, and staging SEO conventions. Use when
  touching `middleware.ts`, `next.config.ts`, route handlers, or page
  metadata. For general App Router patterns (route groups, layouts, parallel
  routes), use `nextjs-app-router` instead — this skill does not repeat that
  content.
metadata:
  version: '1.0.0'
  sources:
    - 'AGENTS.md (this repo)'
    - '.agents/skills/docker-image-contract/ (this repo)'
---

# Next.js Marketing Site Contract

This skill covers only what is specific to *this repo*. For App Router
mechanics — route groups, parallel/intercepting routes, layouts, loading and
error boundaries — use the already-installed `nextjs-app-router` skill; don't
duplicate that guidance here.

## `/healthz` must stay open and return 200

The `wolven-prod` deployment repo's Docker healthcheck runs
`wget --quiet --tries=1 --spider http://127.0.0.1:3000/healthz` inside the
running container (see `docker-image-contract`). If this route ever fails or
requires auth, the container is reported unhealthy and the parent deployment
will not promote or will roll back the release — with no visibility from this
repo into that failure.

Rules:

- `/healthz` must be a Route Handler (e.g. `app/healthz/route.ts`) that
  returns HTTP 200 with no required auth, cookies, or headers.
- If `middleware.ts` exists or is ever added, its `matcher` must explicitly
  exclude `/healthz` (and any other health/status path). Never let a
  catch-all matcher silently start intercepting it — this is the single most
  dangerous regression in this repo, because it fails silently in dev and
  only shows up as a production healthcheck outage.
- Keep the handler trivial — no downstream calls, no environment checks that
  could throw. It should be able to return 200 even if every other part of
  the app is degraded.

## `next.config.ts` must keep `output: 'standalone'`

The Docker image is a multi-stage build that copies the standalone output
into the runtime stage (see `docker-image-contract`). Removing or
conditionally disabling `output: 'standalone'` breaks the image build
contract that `wolven-prod` depends on. Treat this config line as load-bearing
infrastructure, not a stylistic default — don't remove it while chasing an
unrelated build issue.

## Metadata / SEO for a staging site

This site currently serves a staging audience, not production search
traffic:

- Set `robots: { index: false, follow: false }` (or an equivalent
  `noindex, nofollow` meta/robots.txt) at the root layout/metadata level
  until an explicit production-promotion decision says otherwise.
- Don't hand-roll per-page SEO polish (canonical URLs, OG image pipelines,
  structured data) beyond what's needed to keep the site functionally
  correct — it's premature while the site is marked `noindex`.
- When production promotion does happen, flipping `robots` back to indexable
  is a deliberate, explicit change — not a default to leave toggled off
  quietly or flip casually as a side effect of unrelated work.

## No backend, no database, fully stateless

This is a static/stateless marketing site:

- No data fetching from any backend service or API beyond what's needed to
  render static/staging content (e.g. build-time content, static assets).
- No database, ORM, or persisted state of any kind — don't introduce one to
  solve a problem; if a task seems to need persistence, that's a signal the
  task belongs in a different repo, not a lower-tier alternative in this one.
- Server Components and static rendering are the default; reach for
  client-side state only for genuine UI interactivity, never for data that
  should come from a store.
