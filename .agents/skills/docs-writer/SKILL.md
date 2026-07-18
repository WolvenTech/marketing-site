---
name: docs-writer
description: >-
  Write, review, and edit documentation files with consistent structure, tone,
  and technical accuracy. Use when creating docs, reviewing markdown files,
  writing READMEs, updating `/docs` directories, or when user says "write
  documentation", "review this doc", "improve this README", "create a guide",
  or "edit markdown". Do NOT use for code comments, inline JSDoc, or API
  reference generation.
metadata:
  version: '1.0.0'
  sources:
    - 'https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(development)/docs-writer'
---

# docs-writer

As an expert technical writer and editor, produce and refine documentation that
is accurate, clear, consistent, and easy for operators and contributors to
understand. Follow the repo policy in [AGENTS.md](../../../AGENTS.md) and the
style rules in [references/style-guide.md](references/style-guide.md).

## Step 1: Understand the goal and create a plan

1. **Clarify the request:** Fully understand the documentation request. Identify
   the core feature, command, or concept that needs work.
2. **Differentiate the task:** Determine if the request is primarily for
   **writing** new content or **editing** existing content. If ambiguous (e.g.,
   "fix the docs"), ask for clarification.
3. **Formulate a plan:** Create a clear, step-by-step plan for the required
   changes.

## Step 2: Investigate and gather information

1. **Read the code and scripts:** Examine the relevant implementation under
   `scripts/`, `stack/`, `services/`, `tests/`, and `.github/workflows/` so
   the docs match actual behavior.
2. **Identify files:** Locate the documentation files to change — typically
   under `docs/`, plus root `README.md`, `AGENTS.md`, and env examples when
   contracts change. Read the latest version before editing.
3. **Check for connections:** Consider related documentation. If a command or
   deploy step changes, check cross-references in `docs/deploy.md`,
   `docs/rollback.md`, and `docs/phased-rollout.md`. Keep links accurate.

## Step 3: Write or edit the documentation

1. **Follow the style guide:** Apply [references/style-guide.md](references/style-guide.md).
2. **Follow repo policy:** Documentation describes the repo and its operation
   only — never the user, session, conversation, or agent/prompt cues (see
   AGENTS.md Working Rules).
3. **Use precise names:** Apply the [`naming-precision`](../naming-precision/)
   skill for filenames, headings, and example identifiers.
4. Apply planned changes with the minimum surface needed.

### Editing existing documentation

- **Gaps:** Identify where docs are incomplete or no longer match the code.
- **Tone:** Keep the tone active and direct.
- **Clarity:** Fix awkward wording, spelling, and grammar.
- **Consistency:** Align terminology with AGENTS.md and existing docs.

## Step 4: Verify and finalize

1. **Review your work:** Re-read changed files for formatting and factual
   accuracy against the code or scripts they describe.
2. **Link verification:** Validate new and affected links.
3. **Scope check:** Do not invent services, compose stacks, or infrastructure
   beyond the keep list unless explicitly requested.
