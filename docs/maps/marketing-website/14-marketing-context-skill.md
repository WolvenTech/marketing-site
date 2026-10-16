---
title: Vet and install the marketing-context skill
ticket: task
status: out_of_scope
blocked_by: ["02"]
---

## Question

Review the Marketing Context Manager skill from mcpmarket.com (contents, security) and, if acceptable, install it. Decide where its context file lives, so the outputs of tickets 03, 04, 05 and 12 come together in one place.

## Resolution

Moved on 2026-10-16 to the private one-man-team repo as ticket 14 of `docs/maps/marketing-positioning/`, which keeps the original number. Positioning is solved there as the blocker for this map; ticket 15 here tracks it. This copy stays as a pointer and is no longer worked.

## Superseded resolution

Vetted and installed `marketing-context` (source: `alirezarezvani/claude-skills`, `marketing-skill/skills/marketing-context`, commit `aecfb8e0bb71dbf1413082f86b33a5c4c9b8f416`, MIT, last pushed 2026-08-30). No skill was used to resolve this ticket. The Human asked for the install and settled the placement through the question tool.

Vetting: I read all three files. `SKILL.md` and the template are plain markdown. `scripts/context_validator.py` only reads a local markdown file and prints a 0–100 score from section labels; it makes no network calls and runs no shell commands. The score checks that labels are present, not what is in them, so a draft full of open items still scores high (97/100 on the first draft). Its own docs say it complements `company-context.md` rather than replacing it, and it names `marketing-strategy-pmm` (ticket 02) as a sibling skill.

Placement: this repo is public, so the skill and its file live in the private `one-man-team` repo:

- Skill: `.agents/skills/marketing-context/`, copied unmodified, with the hashes checked after the copy.
- Context file: `docs/canon/growth/gtm-strategy/product-marketing-context.md`. It is Growth canon, prose in pt-BR (one-man-team's canon language rule), with customer language and copy-ready phrases kept in English. `.claude/product-marketing-context.md` is a symlink to it, so the skill finds it at its default path.
- Grounding: `docs/canon/company-context.md`, the company timeline written alongside it.
- A deferral there records the option of a separate positioning repo, with its revisit trigger: an agency or contractor needs positioning access without seeing finance or payroll canon.

The context file is a v1 auto-draft. Positioning, differentiation and brand voice stay open until the November 2026 positioning proposal; tickets 05, 12 and 13 fill them. One-man-team's AGENTS.md bans Python scripts and the skill ships one. It was kept because the Human asked for the files unmodified. Nothing is committed in either repo.
