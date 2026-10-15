---
type: deferral
title: Editor Execution and Feedback Hooks
description: Defer editor-level beforeShellExecution and afterFileEdit hooks in favor of pre-commit hooks and CI pipelines.
status: stable
---

# Editor Execution and Feedback Hooks Deferral

## Context

During harness setup, hook scripts (`gate.sh`, `feedback.sh`) and `.cursor/hooks.json` were added to satisfy `HKS-01` through `HKS-05`. Inspection revealed that:
1. `feedback.sh` swallowed TypeScript diagnostics to `/dev/null`, failing to provide meaningful editor feedback while adding latency.
2. `gate.sh` used rudimentary bash regex checks that duplicate existing Git branch protections and repository boundaries defined in `AGENTS.md`.
3. Editor-level hooks are vendor-specific and add maintenance overhead.

Under strict YAGNI (`pragmatic-guard` and `.agents/rules/yagni-strict.md`), deterministic checks belong in reproducible environments: `simple-git-hooks` for local pre-commit and GitHub Actions for CI.

## Revisit triggers

Revisit configuring editor-level hooks when:

- [ ] The team standardizes on an editor hook runner for active interactive developer workflows.
- [ ] A concrete security or compliance policy requires pre-execution command interception that cannot be enforced via branch protection or CI gates.
- [ ] Language server feedback in IDEs proves insufficient and requires asynchronous background diagnostics.
