---
type: note
title: Harness Init — 2026-10-15
description: Initial harness setup session note
status: stable
---

# Harness Init — 2026-10-15

## Entry integration

Asked "How much should we change your current AGENTS.md?". Recommended "A short section (light)" because AGENTS.md holds curated repo-specific rules. The Human selected "The whole guide (full)".

Step 0 checks:
- Existing content in AGENTS.md preserved.
- CLAUDE.md already points to AGENTS.md.
- No harness paths ignored in .gitignore.
- Existing doc folders checked; 000, Record architecture decisions is present and valid.

## ADR migration

skipped — no legacy ADRs

## Discovery

- Context: Stateless Next.js marketing site publishing runtime Docker image to GHCR for consumption by `wolven-prod`.
- Lifecycle: Prototype
- Decided tools: Next.js 16 (App Router), React 19, Tailwind CSS 4, TypeScript, pnpm, Docker, GitHub Actions, Wolven Harness, QMD.
- Decisions not yet in code: Project runtime image is consumed by `wolven-prod` as an exposed pod behind their router; CI is strictly limited to build, test, and GHCR publish with zero production host connectivity or deploy authority.

## Research

repo-only — web lookups not selected in coverage checklist.

## Suggestions

skipped — repo is well understood with existing curated project skills (`nextjs-app-router`, `landing-page-generator`, `frontend-design`, `nextjs-marketing`, `docker-image-contract`, `coding-principles`, `docs-writer`, `github-actions-workflow-writing`).

## Stubs

none — no new stubs requested; wired all 28 skills into `.cursor/skills` and `.claude/skills` runtime symlinks per Human instruction.

## Harness score

- Before: L2 · Guided, 67/108 (62%)
- After: L2 · Guided, 67/103 (65%)
- Dimensions:
  - Hooks & Guardrails: Kept as gaps (0/14 pts) to preserve future L4 eligibility.
  - Sensors & Feedback: Kept as gaps (SNS-01, SNS-04, SNS-05) to preserve future L3 eligibility.
  - Skills & Commands: Kept as gaps (SKL-03, AGT-01, AGT-02).
  - CI Feedback: Kept CI-04 (pre-commit checks) as gap.
  - Hygiene & Safety: Dropped HYG-05 (license) and HYG-08 (MCP config) per Human instruction ("drop mcp and license, keep others").

## Validate wiring

Asked "How should we check the harness?". Recommended "On every pull request (CI job)" because `.github/workflows/validate.yml` is active. Human selected "On every pull request (CI job)". Added `pnpm harness:validate` step to `lint-and-build` job in `.github/workflows/validate.yml`.

## Left for later

**Path:** The full tour (full)

**Goal:** none given

**Covered:** Move old decision records, Ask about the project's stage and plans, Check the harness score now, Set up automatic checks, adapt our skills to the current flow and remove stale/unused skills and workflows

| Step | Name | Remaining work |
| --- | --- | --- |
| 1 | ADR migration | None (no legacy ADRs existed) |
| 3 | Research | Primary-source web research for decided tools |
| 4 | Suggestions | None (well-understood repo with 8 project skills) |
| 5 | Stubs | None |

## Next steps for the Human

1. Address Sensors & Feedback gaps: configure test runner (`SNS-01`), test files (`SNS-05`), and auto-formatter (`SNS-04`) to reach L3.
2. Address Skills & Commands gaps: add explicit slash command entrypoints (`SKL-03`) and subagents (`AGT-01`, `AGT-02`).
3. Address CI gaps: configure pre-commit hooks (`CI-04`).
