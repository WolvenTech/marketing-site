---
name: frontend-design
description: >-
  Marketing-site UI guidance built on this repo's own DESIGN.md token file
  (dark-mode-default, black/white/NVIDIA-green editorial system). Use when
  building or editing any page, layout, or component under `app/` or
  `components/` — new sections, hero treatments, cards, forms, nav. Do NOT use
  for backend/routing logic (see `nextjs-marketing`) or general App Router
  mechanics (see `nextjs-app-router`).
metadata:
  version: '1.0.0'
  sources:
    - 'DESIGN.md (repo root, getdesign NVIDIA-derived token file)'
---

# Frontend Design

This repo has a single source of visual truth: **[`DESIGN.md`](../../../DESIGN.md)**
at the repo root. It is a getdesign, NVIDIA-derived design system — dark-mode
default, black/white/`#76b900`-green, sharply angular, editorial. Every
component, page, and layout must be built against its tokens, not against
generic instinct or whatever a component library defaults to.

## Step 1: Always read DESIGN.md first

Before writing or editing any component, read `DESIGN.md` in full (colors,
typography, `rounded`, `spacing`, `components` sections). Do not guess at hex
values, radii, or spacing — pull them from the file. If a component you need
isn't defined there (e.g. `product-card`, `cta-strip-dark`, `pill-tab`), the
existing token entries are the pattern to extend from — same radius scale,
same color roles, same padding rhythm — not a license to invent a new visual
language.

Key tokens to internalize:

- **Accent**: `#76b900` (`colors.primary`) is the only green in the system.
  `primary-dark` (`#5a8d00`) is its pressed/active state.
- **Radius**: angular. `rounded.sm` = **2px** is the default for interactive
  surfaces (buttons, inputs, cards). `rounded.none` = 0px is used for large
  structural blocks (`hero-card-dark`, `cta-strip-dark`, `corner-square`).
  Never use `rounded.full` outside a literal pill/tab shape — this is not a
  soft, bubbly system.
- **Surfaces**: pure black (`surface-dark` `#000000`) and pure white
  (`canvas` `#ffffff`) are both legitimate — this system uses true black,
  unlike most modern design systems that tint their neutrals. Don't "fix"
  this by tinting toward gray.
- **Rules, not shadows**: `hairline` (`#cccccc`) and `hairline-strong`
  (`#5e5e5e`) are how this system separates content — thin 1px borders, not
  elevation. There is no shadow token because there is no shadow in this
  system.
- **Type**: `NVIDIA-EMEA` family, tight weights (700 for headings/buttons,
  400 for body), zero letter-spacing except uppercase captions. No font
  fallback decisions — use what the token file specifies.

## Step 2: Avoid generic AI-landing-page patterns

This system's whole point is that it does **not** look like a default AI
scaffold. Concretely avoid:

- **Purple/blue gradients or gradient text** — there is no gradient token
  anywhere in `DESIGN.md`; the system is flat color blocks only.
- **Default Inter/system-ui font** — the token file specifies `NVIDIA-EMEA`;
  don't silently fall back to a system font stack.
- **"Hero metric + 3 identical cards"** — the default AI-landing-page
  template (big centered number, three evenly-sized feature cards with
  icon + heading + text). `DESIGN.md` gives you `feature-card`,
  `resource-card`, `product-card`, and `callout-stat` as distinct
  components with different padding and typography — use them
  asymmetrically and mixed, not as one repeated grid cell.
- **Soft drop shadows / glassmorphism / glow** — none of these exist in the
  token set. Depth comes from black/white contrast and hairline rules only.
- **Centered, evenly-padded everything** — the source system (`display-xl`
  at 48px sitting next to `caption-xs` at 11px) is built for strong
  hierarchy and asymmetric composition, not uniform centered blocks.

## Step 3: Prefer asymmetric layouts and Server Components

- Default to **Server Components**. Only reach for `'use client'` when a
  component genuinely needs interactivity (form state, hover-driven reveal,
  tab switching) — this is a stateless marketing site with no client-side
  data dependency, so most of the UI has no reason to hydrate.
- Break the grid intentionally: pair a large dark `hero-card-dark` block
  against a narrow white sidebar column, offset a `callout-stat` against
  body copy, let a `utility-bar` run full-bleed against contained content
  above it. Look at the surface-mode split in `DESIGN.md`'s own description
  (deep black chapters vs. flat white body) as the model for how sections
  should alternate, not just stack uniformly.
- Respect the `spacing` scale (`xxs` 2px through `section` 64px) for
  rhythm — vary spacing deliberately (tight within a card, generous between
  sections) rather than applying one padding value everywhere.

## Step 4: Reserve green for CTAs and active states only

`#76b900` is a signal, not a decoration. Use it for:

- Primary buttons (`button-primary`, `button-primary-active`)
- Active/selected states (`pill-tab-active` uses black+white, but any
  "currently selected" affordance elsewhere should reach for green first)
- The `corner-square` accent mark on cards — a small, fixed 12px square,
  not a background wash

Do **not** use green for: body text, decorative background tints, icon
fills that aren't tied to an actionable element, or large surface areas.
If more than a small fraction of a viewport is green, that's a signal the
component has drifted from an editorial accent color into decoration.

## Step 5: Verify against the token file, not intuition

Before considering a component done, cross-check:

- Every color used traces to a `colors.*` token.
- Every radius traces to `rounded.*` (almost always `none` or `sm`).
- Every spacing value traces to `spacing.*`.
- Typography uses one of the named type styles (`display-xl`,
  `heading-lg`, `body-md`, etc.) rather than an arbitrary font-size.

If a design decision isn't answered by `DESIGN.md`, extend it consistently
with the nearest existing token rather than introducing a new visual
primitive (new radius value, new shadow, new gradient, new font).
