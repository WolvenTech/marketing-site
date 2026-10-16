---
title: Marketing website roadmap
description: Decides the delivery methodology and a Gantt plan for building Wolven's marketing website from scratch, in phases.
type: map
status: draft
---

## Destination

A written delivery methodology and a Gantt map for a from-scratch marketing website for Wolven, a services/agency company. The site's first job is to generate leads; its second job is to recruit talent. The methodology covers how each phase runs, what closes it, and how decisions are recorded, with positioning and messaging as an early phase. The Gantt shows the phases, their order and their sizing. Earlier ideas are set aside; this starts fresh.

## Notes

- The technical stack is already settled by the repo (Next.js App Router, `output: 'standalone'`, Docker image to GHCR, deploy lives in the separate `wolven-prod` repo). This map does not reopen it.
- Positioning and audience work will use the third-party Marketing Strategy & PMM skill (mcpmarket.com, by JantonioFC): April Dunford and Geoffrey Moore positioning, ICP and personas, go-to-market planning, competitor battlecards. It is installed (ticket 02).
- Proposed default for the Gantt, to be confirmed in ticket 10: a Mermaid `gantt` block in markdown.
- `docs/design.md` section 2 (audience) and its product framing predate this map and are not used here.
- The install is missing `WOLVEN.md`, so the router row for `docs/maps/<slug>/` has not been added.
- Company grounding lives in the private `one-man-team` repo, not here, because this repo is public: `docs/canon/company-context.md` (a 3/6/12/18/24-month timeline, each claim tagged as ingested or stated by the Human) and `docs/canon/growth/gtm-strategy/product-marketing-context.md` (the marketing-context skill's file, ticket 14). Both are drafts as of 2026-10-16. Tickets 04, 05, 06, 09, 11 and 12 read them before resolving.
- Company trajectory, per the Human: lean through 2026, rebuild in 2027. Staffing continues but is no longer the single focus; consulting, fixed-scope projects, UX design and prototyping are being explored.
- Positioning waits for the 2027 positioning proposal at the November 2026 quarterly strategy meeting. Three candidate offers are on record: AI adoption consulting and service design, commerce tech partner, and enterprise discovery and prototyping. Ticket 05 should not resolve before that meeting.
- Recruiting stays the site's second job, but lighter: a careers page that supports staffing hires, not a talent brand (input for ticket 09).
- A December 2025 Brand Book exists in Outline (voice, words to avoid). Its claims such as "350+ projects" are not yet verified. This is input for the design-and-brand fog patch below.

## Decisions so far

- [PMM skill vetted and installed; use its ICP, positioning and messaging parts only](02-vet-pmm-skill.md)
- [Audience: US startups and mid-market first, Brazil enterprise second; software engineers for recruiting; ICP is a hypothesis until client data and probes](03-audience-and-icp.md)
- [marketing-context skill vetted and installed in one-man-team; its context file in Growth canon is where positioning outputs come together](14-marketing-context-skill.md)

## Not yet specified

- Content production: who writes copy, case studies and recruiting material, and how long it takes.
- Design and brand: visual identity, design system, whether a brand already exists.
- Measurement: analytics, lead tracking and CRM handoff.
- Launch and post-launch: go-live checklist, iteration cadence.

## Out of scope
