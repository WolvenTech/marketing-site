# Canonical Workflow

This is the canonical instruction set for the repo. All assistant-facing adapters must point here and preserve these rules.

## Scope

- This repo builds and publishes a stateless Next.js marketing site as a Docker image. It **does not deploy** that image, hold production infrastructure, or run against production traffic.
- The image is consumed by a separate deployment repo, `wolven-prod`, which owns all deploy, SSH, and production-host concerns. This repo has no deploy authority and no visibility into production once an image is published.
- Do not invent new services, backends, databases, or deployment mechanisms beyond "build the app, build the image, publish the image" unless the user explicitly asks.

## Tool-Agnostic Agent Contract

- These instructions apply to every assistant surface, including Cursor, Claude, Codex, and any future agent adapter.
- Tool-specific files must stay thin. They may add local usage notes, but must not weaken or fork the canonical rules in this file.
- Policy lives only in `AGENTS.md`. Adapters point here; they do not duplicate or diverge from it.

## Source of Truth

| Path | Role |
|------|------|
| [README.md](./README.md) | Human onboarding and setup |
| [AGENTS.md](./AGENTS.md) | Canonical agent contract (this file) |
| [DESIGN.md](./DESIGN.md) | Authoritative design token file — colors, type, spacing, radius, components |
| [docs/design.md](./docs/design.md) | Design/architecture notes for this site |
| `app/` | Next.js App Router routes (`/`, `/about`, `/contact`, `/healthz`) |
| `components/` | Shared UI components |
| `Dockerfile` | Multi-stage build producing the published runtime image |
| [`.github/workflows/`](./.github/workflows/) | CI: build, test, and image publish — never a production deploy trigger |
| [CLAUDE.md](./CLAUDE.md) | Thin Claude adapter → this file |
| [.cursor/rules/marketing-site.mdc](./.cursor/rules/marketing-site.mdc) | Thin Cursor adapter → this file |

## Agent Skills

Canonical project skills live under [`.agents/skills/`](./.agents/skills/); `.cursor/skills/` and `.claude/skills/` contain symlinks to them so each tool picks them up. Follow them when the task matches; do not restate their full text here.

| Skill | When to use |
|-------|-------------|
| [`nextjs-app-router`](./.agents/skills/nextjs-app-router/) | General App Router patterns — route groups, layouts, parallel/intercepting routes, loading and error states |
| [`landing-page-generator`](./.agents/skills/landing-page-generator/) | Scaffolding or generating new landing-page sections/copy structure |
| [`frontend-design`](./.agents/skills/frontend-design/) | Building or editing any UI against this repo's `DESIGN.md` token system |
| [`nextjs-marketing`](./.agents/skills/nextjs-marketing/) | This repo's specific Next.js contract — `/healthz`, `output: 'standalone'`, staging SEO |
| [`docker-image-contract`](./.agents/skills/docker-image-contract/) | Editing the `Dockerfile` or anything affecting the published runtime image |
| [`coding-principles`](./.agents/skills/coding-principles/) | Writing, modifying, reviewing, or simplifying code |
| [`docs-writer`](./.agents/skills/docs-writer/) | Writing, reviewing, or editing documentation, READMEs, and `/docs` content |
| [`github-actions-workflow-writing`](./.agents/skills/github-actions-workflow-writing/) | Creating, editing, or reviewing GitHub Actions workflows under `.github/workflows/` |

## Working Rules

1. **This repo builds and publishes the app image; `wolven-prod` deploys it.** This repo has no deploy authority — never add tooling, scripts, or workflows that perform a production deployment, rollback, or host mutation.
2. Never commit secrets, SSH keys, or production credentials of any kind. This repo is designed to hold zero production/SSH/deploy secrets — if a task seems to need one, that's a sign the task belongs in `wolven-prod`, not here.
3. Never add a GitHub Actions workflow or script that connects to any production host, SSHes anywhere, or targets the `wolven-prod` deployment environment. CI in this repo is limited to build, test, and image publish.
4. Image tags on merge to `main` must be `sha-<git-sha>` (matching `sha-[0-9a-f]{7,40}`), published to the **lowercase** `ghcr.io/wolventech/marketing-site` path. The GitHub org is `WolvenTech`; the GHCR path must stay all-lowercase because Docker rejects uppercase repository paths — this is a registry requirement, not a style choice. See [`docker-image-contract`](./.agents/skills/docker-image-contract/) for the full runtime contract.
5. Staging content is synthetic/placeholder — never real customer data.
6. No database, CMS, or persisted state — this site is fully stateless. Don't introduce one to solve a problem; a task that seems to need persistence belongs elsewhere.
7. Follow the listed skills when a task matches their trigger; read [`DESIGN.md`](./DESIGN.md) before writing or editing any UI component.
8. Inspect before editing — read relevant docs and code before changing them. Change the minimum surface needed.
9. Verify before declaring done — confirm the app builds and, where applicable, the Docker image builds and satisfies the contract in [`docker-image-contract`](./.agents/skills/docker-image-contract/).

## Output Expectations

- Summarize what changed and why.
- Mention unresolved assumptions.
- If a request would add deploy authority, production connectivity, or persisted state to this repo, say so clearly and wait for direction.
