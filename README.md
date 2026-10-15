# marketing-site

App source for the Wolven marketing site — a stateless Next.js application. This repo builds and publishes a Docker image; it does not deploy anything itself.

## What this is

- The source code, Dockerfile, and CI workflow for Wolven's public marketing site (`/`, `/about`, `/contact`, `/healthz`).
- A publisher of a versioned container image to GHCR, consumed by the deployment repo (`wolven-prod`).

## What this is NOT

- **Not a deployment repo.** There are no deploy credentials, no SSH access, and no production trigger here. Deployment — staging or production — lives entirely in `wolven-prod`.
- **Not stateful.** No database, no CMS, no volumes, no host port bindings, no Vercel config. Every request is served from the built image with no external dependencies.

See [`docs/design.md`](docs/design.md) for the site's scope, brand direction, and design system.

## Dev setup

```bash
corepack enable
pnpm install
pnpm dev          # http://localhost:3000
pnpm lint
pnpm typecheck
pnpm build
```

Requires Node.js `>=24.0.0`. Package manager is pinned via `packageManager: pnpm@11.5.1` — `corepack enable` picks up the pin automatically.

## Docker

Build and run the production image locally:

```bash
docker build -t marketing-site .
docker run --rm -p 3000:3000 marketing-site
```

Smoke-test the health endpoint once it's running:

```bash
curl -f http://localhost:3000/healthz
# or, matching the parent repo's Docker healthcheck exactly:
wget --spider -q http://localhost:3000/healthz && echo OK
```

Expect a `200` with JSON body `{"status":"ok"}` and no authentication required.

The image is built to run within the parent deployment's runtime envelope: **0.50 CPU / 512 MiB**. Keep dependencies and runtime memory footprint lean with that ceiling in mind — this is enforced by `wolven-prod`, not by anything in this repo, so a change here that regresses memory/CPU usage won't be caught until it's deployed.

## Image tagging / how CI publishes

On every merge to `main`, a GitHub Actions workflow builds the image and pushes two tags to GHCR:

- `ghcr.io/wolventech/marketing-site:sha-<short7>`
- `ghcr.io/wolventech/marketing-site:sha-<full40>`

The package is **private**, published under the `WolvenTech` GitHub org.

### ⚠️ Casing note (read this before touching image references)

Docker image references must be all-lowercase — `docker pull` / `docker push` reject any repository path containing uppercase characters. The GitHub org itself is `WolvenTech` (mixed case — e.g. `https://github.com/WolvenTech/marketing-site`), but the **GHCR image path** this repo publishes to is lowercase: `ghcr.io/wolventech/marketing-site`.

This means:

- Anywhere you reference the _GitHub org/repo_, mixed case (`WolvenTech`) is correct.
- Anywhere you reference the _published image_, it must be lowercase (`wolventech`) — mixed case will fail to pull.

The parent repo (`wolven-prod`) currently has a **placeholder image pin using the mixed-case form**, which cannot actually be pulled as-is. Fixing that pin is explicitly a follow-up in `wolven-prod`, not something this repo can or should fix — this repo only controls what it publishes to, not how the parent references it.

## Handoff to `wolven-prod`

After the first successful image publish from this repo, someone needs to open a **reviewed PR in `wolven-prod`** that:

1. Updates `services/marketing-site/.env.example`'s `SERVICE_IMAGE` to the real published tag (see tagging scheme above).
2. Lowercases the org path everywhere that repo references the image — validators and docs alike (see the casing note above).
3. Updates `services/marketing-site/README.md` and `docs/marketing-v1-acceptance-packet.md` to match.

This repo cannot make that change itself — it has no visibility into or write access to `wolven-prod`'s deployment config.
