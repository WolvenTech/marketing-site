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

| Path                                                                   | Role                                                                        |
| ---------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| [README.md](./README.md)                                               | Human onboarding and setup                                                  |
| [AGENTS.md](./AGENTS.md)                                               | Canonical agent contract (this file)                                        |
| [DESIGN.md](./DESIGN.md)                                               | Authoritative design token file — colors, type, spacing, radius, components |
| [docs/design.md](./docs/design.md)                                     | Design/architecture notes for this site                                     |
| `app/`                                                                 | Next.js App Router routes (`/`, `/about`, `/contact`, `/healthz`)           |
| `components/`                                                          | Shared UI components                                                        |
| `Dockerfile`                                                           | Multi-stage build producing the published runtime image                     |
| [`.github/workflows/`](./.github/workflows/)                           | CI: build, test, and image publish — never a production deploy trigger      |
| [CLAUDE.md](./CLAUDE.md)                                               | Thin Claude adapter → this file                                             |
| [.cursor/rules/marketing-site.mdc](./.cursor/rules/marketing-site.mdc) | Thin Cursor adapter → this file                                             |

## Agent Skills

Canonical project skills live under [`.agents/skills/`](./.agents/skills/); `.cursor/skills/` and `.claude/skills/` contain symlinks to them so each tool picks them up. Follow them when the task matches; do not restate their full text here.

| Skill                                                                                  | When to use                                                                                                 |
| -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| [`nextjs-app-router`](./.agents/skills/nextjs-app-router/)                             | General App Router patterns — route groups, layouts, parallel/intercepting routes, loading and error states |
| [`landing-page-generator`](./.agents/skills/landing-page-generator/)                   | Scaffolding or generating new landing-page sections/copy structure                                          |
| [`frontend-design`](./.agents/skills/frontend-design/)                                 | Building or editing any UI against this repo's `DESIGN.md` token system                                     |
| [`nextjs-marketing`](./.agents/skills/nextjs-marketing/)                               | This repo's specific Next.js contract — `/healthz`, `output: 'standalone'`, staging SEO                     |
| [`docker-image-contract`](./.agents/skills/docker-image-contract/)                     | Editing the `Dockerfile` or anything affecting the published runtime image                                  |
| [`coding-principles`](./.agents/skills/coding-principles/)                             | Writing, modifying, reviewing, or simplifying code                                                          |
| [`docs-writer`](./.agents/skills/docs-writer/)                                         | Writing, reviewing, or editing documentation, READMEs, and `/docs` content                                  |
| [`github-actions-workflow-writing`](./.agents/skills/github-actions-workflow-writing/) | Creating, editing, or reviewing GitHub Actions workflows under `.github/workflows/`                         |

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

## Wolven harness

| Where                     | What lives there                                                                    |
| ------------------------- | ----------------------------------------------------------------------------------- |
| `.agents/skills/`         | Agent skills, one folder per skill, each with a `SKILL.md`                          |
| `.agents/rules/`          | Standing rules agents load unconditionally                                          |
| `.agents/hooks/`          | Hook scripts and wiring (placeholder until the project needs one)                   |
| `docs/adrs/`              | Architecture decision records (profile ADRs), flat: `adr-NNN-<slug>.md`             |
| `docs/prds/<slug>/`       | Product requirement docs: `docs/prds/<slug>/<slug>-prd.md`                          |
| `docs/specs/<slug>/`      | Active specs: `docs/specs/<slug>/<slug>-spec.md` (plus `<slug>-plan.md`)            |
| `docs/maps/<slug>/`       | Maps of a large decision: `docs/maps/<slug>/<slug>-map.md` plus one file per ticket |
| `docs/notes/<slug>/`      | Research notes: `docs/notes/<slug>/<slug>-note.md`                                  |
| `docs/deferrals/<slug>/`  | Deferred scope with revisit triggers: `docs/deferrals/<slug>/<slug>-deferral.md`    |
| `docs/WRITING-PROFILE.md` | The four rules every `docs/**` markdown file follows                                |

Every doc-folder except `docs/adrs/` follows `docs/<folder>/<slug>/<slug>-<type>.md`.

### Before you answer from memory

Search this repo's knowledge before answering from memory or the web. ADRs are
the decisions you may depend on — search them first, then widen:

```
qmd query -c adrs "<question>"
qmd query "<question>"
```

### Skills

| Skill           | Description                                                                                                                                                                                                                                                                                                                                                |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| adr             | Creates, promotes, and supersedes architecture decision records (ADRs) under docs/adrs/, repointing claims when one supersedes another. Use when a durable choice about architecture, a dependency, or a convention needs a record, a draft ADR is confirmed, or a decision replaces an earlier one.                                                       |
| code-ci         | Drives an open pull request to merge-ready through conflicts, unresolved comments, and failing checks, in that order, and never merges. Use only when the Human explicitly asks to get an open PR merge-ready.                                                                                                                                             |
| code-commit     | Creates Conventional Commits for repo work. Use when the Human explicitly asks for a commit, or from code-execute only when the resolved commit-cadence opt says to commit.                                                                                                                                                                                |
| code-execute    | Executes ordered work units from a locked plan in-repo: implements, validates, and invokes code-commit only when the resolved commit-cadence opt says to commit. Use when a locked plan's units are ready to build; PRs, reviews, and CI babysitting are always a separate ask.                                                                            |
| code-plan       | Turns a locked spec into ordered work units for code-execute, with dependencies, owned paths, an observable Done when, wave stops, and an explicit Subagent value per unit. Use when a spec is locked and needs a plan before execution.                                                                                                                   |
| code-pr         | Pushes the branch and opens or amends a pull request for the current state, titled as a Conventional Commit and filled from the body template, and never merges. Use only when the Human explicitly asks to open or update a PR.                                                                                                                           |
| code-review     | Reviews an open PR's diff against the refs its description cites and posts blocking or nit findings, and never merges. Use when the Human asks for a review of an open PR.                                                                                                                                                                                 |
| code-spec       | Freezes design and requirements for a code initiative into a spec, from a PRD or a confirmed ask, with obligation-proof pairs, nine dimensions, and typed Unresolved rows. Use when an approved PRD or a confirmed code-shaped ask needs a spec before planning.                                                                                           |
| create-prd      | Grills a problem to one confirmed statement, challenges its key terms against local docs, drafts a lean PRD with user stories and Given/When/Then acceptance, and moves it from draft to stable only on explicit approval. Use when a rough ask, issue, or notes need to become a PRD.                                                                     |
| grilling        | Interviews relentlessly about a plan, decision, or idea, one question at a time, until every open branch is settled. Use when a plan still has open choices to settle with the Human before acting, or when the Human asks to be grilled.                                                                                                                  |
| handoff         | Save a handoff document to the OS temp directory so a fresh session can pick up the work — ask-only, never invoked automatically                                                                                                                                                                                                                           |
| harness-init    | Guides a repo through initial harness setup: folds the entry file into AGENTS.md, offers legacy ADR migration, discovers the repo, researches its decided tools, suggests skills, writes stubs, scores the harness, and closes with a session note. Use when a repo has just run `wolven-harness setup`, or has only a bare `.agents/skills/` tree.        |
| journey-map     | Draws a flow, a set of options, or a user journey as one interactive HTML page built from a JSON map tree, so the Human can walk it, answer it and send feedback back. Use when the Human asks for a journey map, a flow diagram to click through, or a decision map, or accepts a one-line offer of one.                                                  |
| pragmatic-guard | Enforces strict YAGNI — challenges over-build, refuses additions without a present need, and records deferrals with revisit triggers under docs/deferrals/. Use when adding features, abstractions, dependencies, or "we might need" work.                                                                                                                 |
| prototype       | Build a throwaway prototype that answers one question — a runnable program for logic and state, or a few switchable variations for UI — then discard or promote it deliberately                                                                                                                                                                            |
| qmd             | Searches local markdown knowledge bases, notes, docs, and wikis with QMD. Use when users ask to find notes, retrieve documents, inspect a wiki, answer from indexed markdown, or set up QMD access.                                                                                                                                                        |
| research        | Investigates a question against primary sources, cites every claim, and lands the answer as a note in the repository; refuses secondary-only summaries. Use when a question about a tool, API, library, spec, or standard needs an answer backed by evidence rather than memory.                                                                           |
| the-fool        | Challenge an idea, plan, or decision with structured critique — steelman, pick a mode, deliver 3–5 concrete challenges, wait for a response, then synthesize. Does not force a decision. Use for devil's advocate, pre-mortem, red team, or evidence audit.                                                                                                |
| the-jury        | Decide between options once the question and evidence are clear — spawn five distinct juror agents for a parallel isolated first round, deliberate with shared first-round verdicts, and return a dissent-preserving advisory verdict with confidence and one concrete test                                                                                |
| wayfinder       | Charts a decision that is too big to settle in one session as a map of tickets under docs/maps/, works one ticket per session through the right skill, and hands the settled decisions to a PRD or spec. Use when the Human asks to chart, map or work through a large unknown, to pick up the next ticket on a map, or accepts a one-line offer of a map. |

### Standing rules

- `.agents/rules/qmd-first.md` — QMD before web, ADRs first
- `.agents/rules/yagni-strict.md` — strict YAGNI; deferrals under `docs/deferrals/` only
- `.agents/rules/comments.md` — comment style for added lines; run `harness:comments` before handing work back
- `.agents/rules/project-skill-precedence.md` — before using a skill, check `.agents/skills/<name>/SKILL.md` and `.claude/skills/<name>/SKILL.md`; follow an available project copy, use the user-level copy only when neither exists, and resolve relative references from the selected skill directory

### Harness score

`harness:score` rates this repo's agent harness from its files alone, from L0
to L4. Checks the repo chooses not to build are dropped in
`.harness-score.json`, and every drop shows in the report.

### Architecture claims

Referencing an ADR as `ADR-NNN` or `adr-NNN-<slug>` anywhere in a tracked file
is a claim, not decoration. Each claim must resolve to exactly one **`stable`**
profile ADR under `docs/adrs/`:

- No matching profile ADR and no live legacy ADR — the claim **fails**, unless exactly one archived legacy ADR has that number, which **warns**.
- A **legacy** ADR (an ADR-shaped file outside `docs/adrs/`) — the claim
  **warns** until it is migrated into `docs/adrs/` via the `harness-init`
  skill.
- A `draft` or `deprecated` profile ADR, or more than one match — the claim
  **fails**.

This repo records its own architecture decisions as profile ADRs, starting
from `ADR-000` (see `docs/adrs/adr-000-record-architecture-decisions.md`).

### Validate

```
pnpm harness:validate
wolven-harness validate
```

Run validate after any change to `.agents/**` or `docs/**` — it enforces the
writing profile (`docs/WRITING-PROFILE.md`) and the architecture-claims rule
above.
