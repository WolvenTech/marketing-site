# Design

This document describes the visual language, scope, and quality bars for the Wolven marketing site. It is the reference for anyone building or reviewing UI in this repo.

## 1. Purpose

This repo builds the public marketing face for Wolven — the front door to the `*.wolven.com.br` ecosystem for people who have not yet touched the product.

The site is deployed to staging at `staging-marketing-site.wolven.com.br`. All content there is synthetic and placeholder: it exists to prove the build, deploy, and routing pipeline end to end, not to represent Wolven's real public messaging. A future promotion to a live production hostname (`marketing-site.wolven.com.br` is currently dry-run/validation-only in the parent deployment repo) is explicitly out of scope for V1 and will be handled as a separate, later effort once real brand content exists.

## 2. Audience

Three groups read this site:

- **Prospects** — people evaluating whether Wolven is worth a conversation.
- **Partners** — organizations assessing Wolven as an integration or business partner.
- **Operators** — technical evaluators (e.g., platform/infra reviewers) checking that Wolven looks and runs like a serious, stable product.

Brand voice and messaging are placeholder for V1. Copy on every route should read as structurally correct (right sections, right hierarchy, right calls to action) without claiming to be final marketing language.

## 3. V1 scope

- `/` — home
- `/about`
- `/contact` — static page with a `mailto:` link; no form, no backend, no submission handling
- `/healthz` — Route Handler for infrastructure health checks (see [Section 14](#14-health-endpoint))

Nothing behind authentication. No content management system — all copy lives in source.

## 4. Out of scope (V1)

- CMS or any headless-content integration
- Blog / articles / news
- Internationalization (i18n) — English/Portuguese switching, locale routing, etc.
- Production hostname go-live (`marketing-site.wolven.com.br`)
- Any form backend (contact stays `mailto:`-only)
- Real customer logos, testimonials, or metrics — anything resembling a customer claim is fabricated placeholder and must read as such

## 5. Brand direction

This repo does not invent a visual identity from a blank canvas. It bootstraps its design tokens from `npx getdesign@latest add nvidia`, which produced the root [`DESIGN.md`](../DESIGN.md) — an extracted, engineering-grade editorial system: black/white/gray monochrome, a single saturated green accent (`#76b900`), 2px-radius angular surfaces, hairline rules, and no gradients or soft shadows.

**One deliberate deviation from DESIGN.md:** the source spec's default rhythm alternates a black hero/footer chapter against a white/paper body (`{colors.canvas}` for content, `{colors.surface-dark}` for hero and footer bookends). This site inverts that split — **dark surfaces are the default canvas site-wide**, not just the hero and footer bookends. Body content, cards, and interior sections sit on black/near-black (`{colors.surface-dark}` / `{colors.surface-elevated}`) rather than `{colors.canvas}` white. The green accent, the 2px angular grid, the hairline-rule discipline, and the corner-square motif carry over unchanged from DESIGN.md — only the light/dark balance is inverted.

Why this satisfies "no generic AI aesthetic" without a custom palette: DESIGN.md is a real, opinionated system extracted from a shipping product, not a synthesized template. It has actual constraints (single accent color, hairline-only elevation, weight-based type hierarchy, no pill shapes) that a generic purple-gradient/Inter-on-white AI template does not carry. Adopting it — even with the dark-default inversion — means every screen in this repo has to justify itself against a real rulebook, which is a materially different design posture than "pick a nice-looking Tailwind starter."

**Follow-up task (explicitly tracked, not done here):** once real Wolven brand assets exist — logo, exact palette, verified brand voice — layer Wolven-specific tokens *on top of* this DESIGN.md base (swap `{colors.primary}`, typography family, wordmark, imagery) rather than replacing the system wholesale. The angular-editorial-grid discipline this repo establishes is worth keeping regardless of final palette.

## 6. Typography

Type hierarchy follows DESIGN.md's 12-tier scale, from `{typography.utility-xs}` (10px, legal fine print) up to `{typography.display-xl}` (48px, hero headline). Selected tiers relevant to V1's three content routes:

| Token | Size | Weight | Use |
|---|---|---|---|
| `display-xl` | 48px | 700 | Hero headline |
| `display-lg` | 36px | 700 | Section headline, large stat callouts |
| `heading-xl` | 24px | 700 | Sub-section title, CTA-strip headline |
| `heading-md` | 20px | 700 | Card group title |
| `body-md` | 16px | 400 | Default paragraph copy |
| `body-strong` | 16px | 700 | Inline emphasis, nav links |
| `button-md` | 16px | 700 | Standard buttons |
| `caption-md` | 14px | 700 | Eyebrows, breadcrumbs (uppercase) |

DESIGN.md specifies the proprietary `NVIDIA-EMEA` face for every text role. Since that font is not available for use here, the app substitutes a real, licensable pairing chosen to preserve the same *intent*: a tight, bold geometric sans for display and heading roles, paired with a clean, highly legible body sans for paragraph and UI text. Hierarchy is still built primarily from weight (400 vs. 700) and size — never from color — matching DESIGN.md's "editorial newspaper" approach to type.

Sizing scales fluidly via CSS `clamp()` between mobile and desktop breakpoints rather than jumping at fixed media-query steps, so display and heading sizes shrink smoothly on narrow viewports instead of snapping between two fixed values.

## 7. Color system

Core tokens, carried directly from DESIGN.md:

| Token | Value | Role |
|---|---|---|
| `primary` (NVIDIA Green) | `#76b900` | The single accent — every CTA, active state, corner-square, link-on-dark |
| `primary-dark` | `#5a8d00` | Pressed/active state for primary buttons |
| `surface-dark` | `#000000` | **Default canvas site-wide** (inverted from DESIGN.md's hero/footer-only usage) |
| `surface-elevated` | `#1a1a1a` | Nested dark panels, card surfaces on the dark canvas |
| `on-dark` | `#ffffff` | Primary text on dark surfaces |
| `on-dark-mute` | `rgba(255,255,255,0.7)` | Secondary text on dark surfaces |
| `hairline-strong` | `#5e5e5e` | 1px dividers and card borders on dark surfaces |
| `canvas` / `ink` | `#ffffff` / `#000000` | Reserved for contrast accents only (inverted panels, high-contrast callouts) — not the default body background |
| `error` / `warning` / `success-deep` | `#e52020` / `#df6500` / `#3f8500` | Semantic states, used exactly as DESIGN.md defines them |

The accent stays scarce, per DESIGN.md's own rule: no more than one solid-green CTA per viewport/fold. White and light-gray surfaces are the exception, not the rule — used only where a deliberate contrast panel is needed, not as the default page background.

**V1 is dark-mode-only.** There is no light-mode toggle and no `prefers-color-scheme` branching for a light theme — the site renders the inverted-dark treatment unconditionally.

## 8. Layout

Layout follows DESIGN.md's editorial grid: an asymmetric hero (copy hugs one side, imagery/negative space fills the rest — never centered and symmetric), multi-column content grids separated by hairline rules rather than shadows or cards-with-gaps, and `{spacing.section}` (64px) vertical rhythm between major blocks.

Pages should explicitly avoid the generic "hero metric + 3 identical feature cards" template. Sections vary in structure — a stat callout, a two-column text+visual split, a dense multi-item grid — the way DESIGN.md's source pages do, rather than repeating one card shape down the page.

## 9. Components

Shared building blocks used across all V1 routes:

- **Header** — dark surface, wordmark, and route nav; angular (`{rounded.none}` on the bar itself).
- **Footer** — dark surface, link/contact info in a structured column layout with hairline dividers, matching DESIGN.md's `footer-section`.
- **Section** — the generic content wrapper enforcing `{spacing.section}` rhythm and hairline-rule separation between blocks.
- **CTA** — `button-primary` (green fill) for the single primary action per view; `button-outline` (green 2px border, transparent fill) for secondary actions. Green fill is reserved for CTAs and active states only — never used as decorative color.

All card-like surfaces use `{rounded.sm}` (2px) — never 0, never above 2px, except avatar/icon circles which use `{rounded.full}` per DESIGN.md.

## 10. Content rules

All staging content — company name, product claims, testimonials, numbers — is synthetic placeholder and must be clearly identifiable as such in source (e.g., obviously fictional names, no real logos, no real metrics). No real PII and no real customer data appear anywhere in this repo, including in test fixtures or seed content.

## 11. Accessibility

Target: WCAG 2.1 AA.

- **Contrast** — because this site inverts DESIGN.md to a dark-default canvas, every dark-on-black text and accent combination needs explicit contrast verification rather than inheriting DESIGN.md's assumption that dark surfaces are the exception. The green accent (`#76b900`) in particular must be checked at each size/weight it's used at against `surface-dark`/`surface-elevated` — DESIGN.md validated its ratios for occasional hero/footer/CTA use, not as a pervasive body-text-adjacent color.
- **Focus states** — every interactive element has a visible focus indicator (DESIGN.md's convention: a 2px solid green border on focus, distinct from hover).
- **Landmarks** — semantic HTML landmarks (`header`, `nav`, `main`, `footer`) on every route; heading levels follow document order, not visual size.
- **Motion** — respect `prefers-reduced-motion`; any transition or animation must have a reduced/no-motion fallback.

## 12. Performance budget

The site runs in a small production container (see the parent repo's 0.50 CPU / 512 MiB runtime envelope for this service). The build should target:

- Fast LCP on constrained CPU — favor React Server Components and minimal client-side JavaScript on all three content routes; only hydrate interactive islands that need it.
- Font loading optimized via subsetting and `font-display: swap` so text is never blocked on webfont load.
- Images served through `next/image` for automatic sizing, format negotiation, and lazy loading.

## 13. SEO baseline

- Root layout defines metadata via Next.js's `metadata` API (title, description).
- Open Graph and Twitter card tags are present but placeholder — real social preview copy/imagery is a future task once real brand assets land.
- `robots: noindex` is set site-wide while the deployment remains staging-only. This must be flipped only as part of the (separately scoped) production promotion.

## 14. Health endpoint

`/healthz` is a Route Handler, not a page. Contract:

- `GET /healthz` → `200` with JSON body `{ "status": "ok" }`.
- Unauthenticated — no session, no API key, no cookie required.
- Not intercepted by any middleware (auth guards, locale redirects, etc.) — it must resolve directly regardless of any middleware added later.

This is the exact endpoint the parent deployment repo's Docker healthcheck polls via `wget --spider`. If this contract changes (path, method, response shape, or auth requirement), the corresponding healthcheck configuration in `wolven-prod` must be updated in the same change — this repo cannot silently change the contract without breaking the parent's container health status.
