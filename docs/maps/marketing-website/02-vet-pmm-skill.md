---
title: Vet and install the PMM skill
ticket: task
status: out_of_scope
blocked_by: []
---

## Question

Review the Marketing Strategy & PMM skill from mcpmarket.com (contents, security scan) and, if acceptable, install it into the repo's skills. Record the outcome the Human reports.

## Resolution

Moved on 2026-10-16 to the private one-man-team repo as ticket 02 of `docs/maps/marketing-positioning/`, which keeps the original number. Positioning is solved there as the blocker for this map; ticket 15 here tracks it. This copy stays as a pointer and is no longer worked.

## Superseded resolution

Vetted and installed `marketing-strategy-pmm` (source: `jantoniofc/skillsbank`, `skills/marketing-strategy-pmm`, MIT, community-authored, 9 stars, last pushed 2026-08-04). No skill was used to resolve this ticket; the Human asked for the install.

Vetting: I read all five files (`SKILL.md` plus four references, about 50 KB). They are plain markdown with no scripts, shell commands, URLs, credentials or instructions to act outside the conversation. Its own frontmatter says `risk: safe`, which is the author's claim, not a check.

Fit: it is written for SaaS product launches (Series A budgets, sales enablement, international rollout). For this map, use the ICP workflow, the April Dunford positioning process, the messaging hierarchy and the competitor tiering. Ignore sales enablement, international expansion and the budget tables. It asks for 10+ customer interviews and customer data for validation, which Wolven may not have yet; tickets 03 and 05 should say so rather than invent evidence.

Installed at `.agents/skills/marketing-strategy-pmm/`, with symlinks in `.claude/skills/` and `.cursor/skills/`. `harness:validate` passes. Not committed.
