---
title: Marketing website roadmap
description: Decides the delivery methodology and a Gantt plan for building Wolven's marketing website from scratch, in phases, once positioning is settled in one-man-team.
type: map
status: draft
---

## Destination

A written delivery methodology and a Gantt map for a from-scratch marketing website for Wolven, a services/agency company. The site's first job is to generate leads; its second job is to recruit talent. The methodology covers how each phase runs, what closes it, and how decisions are recorded. The Gantt shows the phases, their order and their sizing. Positioning is settled first, in the one-man-team map `docs/maps/marketing-positioning/` (ticket 15). When it is, ticket 16 rewrites this destination around a measurable site goal.

## Notes

- This map stops at positioning. The audience, competitor, positioning, SEO and channel, service lineup, client data and probe tickets moved to the private one-man-team map `docs/maps/marketing-positioning/` on 2026-10-16, keeping their numbers. That map is the blocker, and ticket 15 tracks it. Work here resumes with design, copy and site planning.
- The technical stack is already settled by the repo (Next.js App Router, `output: 'standalone'`, Docker image to GHCR, deploy lives in the separate `wolven-prod` repo). This map does not reopen it.
- Proposed method, to be confirmed in ticket 07: design-first, as the Human prefers. Frame (ticket 16 goal, ticket 01 team), structure (08 scope and IA, 09 careers page), design (start from the Brand Book, then wireframes, prototype and design system), copy fitted to the designed pages, build, measure and launch, then the Gantt (10). Closed decisions flow into the repo's harness chain: `create-prd`, `code-spec`, `code-plan`, `code-execute`.
- Skill shortlist for the phases after the gate, each to be vetted like one-man-team tickets 02 and 14 before install. All come from `alirezarezvani/claude-skills` (MIT) and read the product marketing context. Structure and conversion: `site-architecture`, `page-cro`, `form-cro`. Copy: `copywriting`, `copy-editing`, `content-humanizer`. Brand: `brand-guidelines`. Measure and launch: `analytics-tracking`, `seo-audit`, `schema-markup`, `aeo`. Also shortlisted: `shape` (`shipshitdev/skills`), one design brief per page before build; at vetting, settle its license (MIT in `plugin.json`, Apache-2.0 upstream in `pbakaus/impeccable`) and point its `grill-me` step at `grilling`. From `owl-listener/designer-skills` (MIT): `information-architecture` (ticket 08; vetting picks it or `site-architecture`), `wireframe-spec` (design), `metrics-definition` (ticket 16) and `case-study` (proof points), each checked for depth at vetting. Already here: `frontend-design`, `landing-page-generator`, `prototype`, `nextjs-marketing`. The Human may add skills found on mcpmarket.com.
- Company grounding lives in the private one-man-team repo: `docs/canon/company-context.md` (a 3/6/12/18/24-month timeline, each claim tagged as ingested or stated by the Human) and `docs/canon/growth/gtm-strategy/product-marketing-context.md` (the marketing-context skill's file). Both are drafts as of 2026-10-16.
- The shortlisted skills expect `.claude/product-marketing-context.md` in this repo. The Human is making this repo private; how this repo reads the context file is decided once it is.
- Company trajectory, per the Human: lean through 2026, rebuild in 2027. Staffing continues but is no longer the single focus; consulting, fixed-scope projects, UX design and prototyping are being explored.
- Recruiting stays the site's second job, but lighter: a careers page that supports staffing hires, not a talent brand (input for ticket 09).
- A December 2025 Brand Book exists in Outline (voice, words to avoid). Its claims such as "350+ projects" are not yet verified. This is the design phase's starting point.
- Proposed default for the Gantt, to be confirmed in ticket 10: a Mermaid `gantt` block in markdown.
- `docs/design.md` section 2 (audience) and its product framing predate this map and are not used here.
- The install is missing `WOLVEN.md`, so the router row for `docs/maps/<slug>/` has not been added.

## Decisions so far

## Not yet specified

- Content production: who writes copy, case studies and recruiting material, how long it takes, and permission to use client logos.
- Design and brand: visual identity and design system, starting from the December 2025 Brand Book.
- Measurement: analytics, lead tracking and CRM handoff.
- Launch and post-launch: go-live checklist, iteration cadence.

## Out of scope

- [Vet and install the PMM skill](02-vet-pmm-skill.md): moved to the one-man-team positioning map; the skill lives there now.
- [Who must the site convince?](03-audience-and-icp.md): moved to the one-man-team positioning map.
- [What do comparable agency sites do well and badly?](04-competitor-sites.md): moved to the one-man-team positioning map.
- [Positioning and messaging](05-positioning-and-messaging.md): moved to the one-man-team positioning map, where it waits for the November 2026 positioning proposal.
- [How will visitors find the site?](06-seo-and-channels.md): moved to the one-man-team positioning map.
- [Service lineup and weights](11-service-lineup-weights.md): moved to the one-man-team positioning map.
- [Score the ICP against real client data](12-client-data-icp-scoring.md): moved to the one-man-team positioning map.
- [Design the audience probes](13-audience-probes.md): moved to the one-man-team positioning map.
- [Vet and install the marketing-context skill](14-marketing-context-skill.md): moved to the one-man-team positioning map; the skill lives there.
