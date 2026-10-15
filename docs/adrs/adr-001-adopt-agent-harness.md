---
type: adr
title: Adopt Wolven agent harness for development governance
description: Establish the Wolven agent harness as the canonical contract governing AI-assisted development, strict YAGNI enforcement, fail-closed validation, and stateless boundaries.
status: stable
---

# ADR-001 — Adopt Wolven agent harness for development governance

## Context

AI-assisted pair programming requires explicit, durable boundaries to prevent drift, speculative scaffolding, and accidental violation of infrastructure separation. Without an authoritative harness:
- Agents invent speculative abstractions, vanity stubs, or stateful mechanisms that violate repository constraints.
- Tool-specific rules (Cursor, Claude Code, Antigravity, Codex) diverge, creating inconsistent developer workflows.
- Crucial production contracts—such as the unauthenticated `/healthz` runtime check consumed by the downstream deployment repository `wolven-prod`—risk silent regression.

A unified, tool-agnostic harness is required to govern how assistants interact with this codebase, how decisions are recorded, and how quality is mechanically enforced.

## Decision

We adopt the **Wolven agent harness** as the authoritative operational contract for this repository, organized around four core pillars:

1. **Tool-Agnostic Canonical Authority (`AGENTS.md`)**
   - [`AGENTS.md`](file:///Users/rafael/Dev/wolven/marketing-site/AGENTS.md) is the single source of truth for agent behavior. All editor-specific adapters (`.cursor/`, `.claude/`, etc.) stay thin and point directly to `AGENTS.md` without duplicating or diverging from repository policy.
   - The repository maintains strict scope: it builds and publishes a stateless Next.js marketing container image to GHCR. It owns **zero deploy authority**, **zero secrets**, and **zero persisted state**. Production deployment concerns belong entirely to `wolven-prod`.

2. **Fail-Closed Verification & Architecture Claims**
   - Changes to harness configuration and profile documentation (`docs/**`) are validated via `wolven-harness validate` in pre-commit hooks and CI.
   - Any reference to an ADR (`ADR-NNN` or `adr-NNN-<slug>`) anywhere in the tree is a checkable claim that must resolve to a `stable` record under `docs/adrs/`.
   - Profile documents must adhere strictly to [`docs/WRITING-PROFILE.md`](file:///Users/rafael/Dev/wolven/marketing-site/docs/WRITING-PROFILE.md).

3. **Strict YAGNI and Deferral Registry**
   - Additions are evaluated through strict YAGNI (`pragmatic-guard`): present need (0–10) must be greater than or equal to complexity (0–10) to be approved.
   - Speculative features, upfront test infrastructure for placeholder code, and unready abstractions are refused.
   - Refused scope is formally recorded under `docs/deferrals/<slug>/<slug>-deferral.md` with concrete, observable trigger checkboxes (`- [ ]`).

4. **Deterministic Computational Sensors**
   - Quality gates rely on mechanical computational feedback rather than LLM memory or subjective inspection:
     - **TypeScript:** Strict compilation with `noUncheckedIndexedAccess`.
     - **ESLint:** Scoped exclusively to application code, treating unused variables as errors and enforcing `--max-warnings=0`.
     - **Vitest:** Automated unit tests verifying core UI components and the unauthenticated `/healthz` contract consumed by `wolven-prod`.
     - **Prettier & Git Hooks:** Formatted pre-commit enforcement via `simple-git-hooks`.
   - Harness maturity reflects honest, working automation rather than empty stubs.

## Consequences

- **Contrast Baseline:** Any new proposal (e.g., adding a database, CMS, custom deployment scripts, or speculative multi-agent abstractions) is immediately challenged against this decision: if it violates statelessness, introduces deploy authority, or fails strict YAGNI, it is refused.
- **Auditable Quality:** All PRs must satisfy the full validation suite (`pnpm validate`) locally and in CI before merge.
- **Zero Drift:** Tool configs remain thin adapters; core policy and skills reside centrally in the repository harness.
