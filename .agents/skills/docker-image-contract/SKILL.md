---
name: docker-image-contract
description: >-
  The runtime contract this repo's Docker image must satisfy, validated by
  tests in the separate `wolven-prod` deployment repo. Use when editing the
  `Dockerfile`, changing the listen port or host binding, adding runtime
  packages, choosing image tags, or setting the GHCR publish path. Do NOT use
  for application routing/config concerns (see `nextjs-marketing`).
metadata:
  version: '1.0.0'
  sources:
    - 'wolven-prod AGENTS.md and deploy/validate scripts (parent deployment repo, read-only reference)'
---

# Docker Image Contract

This repo builds and publishes a Docker image; it does not deploy it. The
separate `wolven-prod` repo consumes that image and enforces the following
contract against it. Every point below is a hard requirement — a violation
here fails silently in this repo (the image still builds) and only surfaces
as a deployment or healthcheck failure in `wolven-prod`, which this repo has
no visibility into.

## Network binding

- The app must listen on `0.0.0.0:3000` inside the container, not
  `127.0.0.1:3000` or `localhost:3000`. Binding to loopback-only makes the
  service unreachable from the parent's healthcheck and reverse proxy, which
  connect from outside the app's own network namespace.

## Healthcheck dependency: `wget` must be real

- The parent's Docker healthcheck runs, **inside this container**:
  ```
  wget --quiet --tries=1 --spider http://127.0.0.1:3000/healthz
  ```
- On an Alpine-based runtime stage, `wget` is not guaranteed to exist as a
  real binary (BusyBox provides a minimal one on some images, but don't rely
  on that implicitly) — install it explicitly: `apk add --no-cache wget` in
  the runtime stage.
- This is independent of the `/healthz` route contract itself (see
  `nextjs-marketing`) — the route must return 200 *and* the binary that
  probes it must exist in the image. Either one missing fails the
  healthcheck the same way.

## Image tagging

- Tags published on merge to `main` must match `sha-[0-9a-f]{7,40}` — a
  `sha-` prefix followed by 7 to 40 lowercase hex characters (a git commit
  SHA, short or full).
- Never publish or rely on `latest`, `stable`, a branch name, or any other
  mutable/floating tag. The parent repo deploys by exact reviewed SHA and has
  no mechanism to resolve or trust a mutable tag.

## GHCR path must be lowercase

- Publish to `ghcr.io/wolventech/marketing-site` — **all lowercase**, even
  though the GitHub organization itself is `WolvenTech` (mixed case). Docker
  registry paths reject uppercase characters in the repository path; using
  the org's display casing in the image reference will fail the push, not
  just look inconsistent.
- Don't "correct" this to match the org name — the lowercase path is
  required, not a style choice.

## Resource footprint

- Target well under 512 MiB memory at runtime. Avoid dependencies or
  build artifacts that bloat the runtime image — this is a static marketing
  site, not a service with heavy in-memory workloads, so a lean footprint is
  achievable and expected.

## Build and runtime hygiene

- Multi-stage builds only: a build stage with full dependencies/toolchain,
  and a minimal runtime stage that copies only the standalone output
  (see `nextjs-marketing` for the `output: 'standalone'` requirement) plus
  the packages the runtime actually needs (e.g. `wget` above).
- Run as a **non-root** user in the runtime stage — create and switch to a
  dedicated unprivileged user, don't run the Next.js server as root.
- Never bake secrets into image layers — this repo holds zero
  production/SSH/deploy secrets in the first place, so there should be
  nothing secret to bake in; if a build step appears to need one, that's a
  sign the step doesn't belong in this repo's build.
