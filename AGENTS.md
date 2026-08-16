# AGENTS.md

Working rules for AI agents in this repo. `CLAUDE.md` points here — this file is
the single source of truth, so edit this one and leave `CLAUDE.md` alone.

**RustTools** ([www.rust-tools.eu](https://www.rust-tools.eu)) is a Next.js 16
(App Router) + React 19 + TypeScript site of calculators and guides for the game
Rust, styled with Tailwind v4, deployed on Vercel. Package manager is **pnpm**.

---

## 1. The gate: never report done on a red build

```bash
pnpm check      # typecheck && verify:raid && build — run this before you finish
```

| Command | What it does |
| --- | --- |
| `pnpm dev` | dev server on :3000 (check if one is already running before starting another) |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm verify:raid` | cross-checks raid damage data against the solver |
| `pnpm build` | production build — **runs `tsc` too**, so type errors fail the build |
| `pnpm images:recycle` | regenerates `/public/images/recycle/*.webp` (needs `cwebp` on PATH) |

If the build is already broken when you arrive, say so and confirm it's
pre-existing (stash your work and re-run) before blaming your own change. Never
leave the build red without flagging it explicitly.

## 2. Layout of the codebase

```
app/                     one folder per route: page.tsx + layout.tsx,
                         sitemap.ts, robots.ts, manifest.ts, opengraph-image.tsx
src/
  components/            UI. Calculators at top level, guides/ and recycling/ nested
    CalcShell.tsx        shared calculator frame (breadcrumb, h1, panel, layout variants)
    Img.tsx              next/image wrapper; dims to 0.3 opacity on load failure
    recycling/RecycleImg small WebP variant of Img for item icons
    guides/GuideComponents.tsx   Reveal / Step / Tip / ReqCard — reuse these in guides
    useTooltip.ts        delegated hover tooltips
  lib/
    seo.ts               SITE_URL, seoMetadata(), ROUTES, all JSON-LD builders
    calculator-seo.ts    per-calculator metadata for structured data
    types.ts             shared domain interfaces
    raid-solver.ts       the knapsack solver
    cupboard-logic.ts, monumentsData.ts, analytics.ts, url-entries.ts
    data/                game data (see §6)
scripts/                 verify-raid-data.mjs, gen-recycle-webp.mjs
public/images/           item icons (.png) + recycle/ (96px .webp) + monuments/
```

Import via the `@/` alias (`@/lib/data/…`, `@/components/…`), not deep relative
paths. Keep game data in `src/lib/data/`, pure logic in `src/lib/`, and
presentation in `src/components/`.

## 3. TypeScript is strict — these exact things fail the build

[tsconfig.json](tsconfig.json) sets `strict`, **`noUnusedLocals`**,
**`noUnusedParameters`**, `noFallthroughCasesInSwitch`,
`noUncheckedSideEffectImports`.

- **An unused function parameter is a build error.** If a helper ignores its
  argument, the helper is dead indirection — delete it and inline what it
  returned. Don't rename to `_arg` to dodge the check.
- **An unused import or local is a build error.** Clean up as you go.
- **Never use `any`, and never silence an error with `@ts-ignore`.** Implicit
  `any` on a callback param (`.map((r, i) => …)`) is almost always a symptom of
  a broken import above it — fix the import, not the callback.
- Prefer `satisfies Record<Key, …>` for exhaustiveness over a `default:` that
  silently returns empty, as [raid-data/index.ts](src/lib/data/raid-data/index.ts)
  does — a missing entry should be a compile error.

## 4. Module boundaries: export types from where the data is imported

Shared interfaces live in [src/lib/types.ts](src/lib/types.ts). A data
directory's `index.ts` is a **complete module boundary**: it re-exports the data,
the key union, *and* the row type, so a consumer imports all three from one path.

```ts
// src/lib/data/salvaging-data/index.ts
export const SALVAGING_DATA = { … };
export type SalvagingTarget = keyof typeof SALVAGING_DATA;
export type { SalvagingData, SalvagingResource } from "../../types";
```

## 5. Styling: tokens and inline utilities

All CSS config is in [src/styles/global.css](src/styles/global.css). **There is
no `tailwind.config` file** — `@theme` defines the palette and fonts. Dark theme
only; no light mode, no `prefers-color-scheme` branches.

- **Use the theme tokens:** `text-rust`, `text-text-bright`, `text-text-dim`,
  `text-text-muted`, `bg-bg`/`bg-panel`/`bg-panel-2`, `border-border`/
  `border-border-hi`, `font-display` (Teko), `font-ui`/`font-sans` (Inter), and
  the resource colors (`text-scrap`, `text-metal`, `text-sulfur`, `text-hqm`, …).
  Don't hardcode hexes — the accent is `#ce422b`, and stray `#cc422c`/`#cd412b`
  copies already exist; don't add more. Raw CSS vars (`var(--rust)`,
  `var(--rust-glow)`) are for arbitrary-value utilities like
  `shadow-[0_0_18px_var(--rust-glow)]`.
- **Write classes inline in JSX `className`.** Do **not** extract them into a
  `const` class string or a shared UI module. For repeated elements, `.map()` a
  data array so the inline string appears once.
- **No `<style>` blocks in components.** There are currently zero; keep it that way.
- **Bespoke CSS goes inside `@layer components`** in global.css so utilities keep
  winning without `!`. There is deliberately no hand-written reset — Preflight
  owns it, and an unlayered reset would beat every utility.
- Don't combine conflicting utilities (`mt-6` + `mt-auto`).
- Responsive work uses **max-width** breakpoints (`max-[1200px]` is the navbar's
  mobile threshold, then `max-[1024px]`, `max-[640px]`), not Tailwind's default
  min-width scale.

**Reuse these motifs rather than reinventing them:** the glass panel
(`bg-[rgba(19,18,16,0.65)] backdrop-blur-[20px] border border-white/[0.06]` plus
`shadow-[0_16px_40px_rgba(0,0,0,0.4),inset_0_-1px_0_rgba(255,255,255,0.03)]`),
the 2px rust hairline as a `before:`/`after:` gradient, and the
`WORD <span className="text-rust">WORD</span>` heading split. Shared classes kept
in CSS on purpose: `.sec-label`, `.filter-row`/`.filter-pure-text`/
`.filter-separator` (tab bars), `.animate-fade-in-up`, `.section-gap`,
`.separator-gap`, `.tooltip-float`, `.minimal-box-btn`.

Fonts are self-hosted variable Teko + Inter, preloaded in
[app/layout.tsx](app/layout.tsx) with `font-display: block` to avoid a FOUT
reflow. Don't add a webfont or a CDN font link.

## 6. Data: sources of truth

| Data | Location | How it's maintained |
| --- | --- | --- |
| Raid damage | `src/lib/data/raid-data/raid-data-*.ts` | **Hand-edited, one file per structure.** No generator. `pnpm verify:raid` must pass. |
| Recycling | `src/lib/data/recycling-data.ts` | Generated from `rust_recycling_data.json`; regenerate after a balance patch |
| Item icons (small) | `public/images/recycle/*.webp` | `pnpm images:recycle` |
| Monuments | `src/lib/monumentsData.ts` | Hand-edited |
| Missions, skinning, salvaging, smelting, crafting | `src/lib/data/*` | Hand-edited |

- **Derive anything countable from the data** — never hardcode "17 missions"
  beside a 17-row table. Export a derived const so the two can't drift.
- Don't hand-patch generated output; edit the source and regenerate.
- Never invent game numbers. If a value isn't verified, say so rather than
  guessing — these numbers are the product.

## 7. Domain rules that are easy to get wrong

- **Damage is per prefab, never per material tier.** A Sheet Metal Door and a
  Metal Wall are both `Material: "Metal"` and take very different damage.
  `Material` is descriptive only — never key damage off it. This exact bug once
  put 114 of 182 structure/explosive pairs wrong, which is why `verify:raid`
  exists.
- **Raid damage carries up to 4 decimals and they matter.** The solver scales by
  `UNIT = 10_000`; rounding F1 Grenade's 1.0075 to 1.01 quotes a combo that
  doesn't actually break the wall. When coarsening, **floor, never round** —
  under-stating damage over-quotes, which is the safe direction.
- **Rust rounds recycler output down** (`Math.floor`).
- **Safe Zone recyclers** use a dedicated `safezone_yield` when present,
  otherwise a flat 2/3 penalty; timing is 8s vs 5s per cycle, billed per
  *cycle* (`ceil(count / recycleStack)`), not per item.
- Raids are solved for **one** structure; callers scale the combo by the count.

## 8. Adding or changing a page — full checklist

**First: check whether the route already exists** (`ls app/…`, grep the Navbar).
Don't create a duplicate route for a page that's already there.

1. `app/<route>/page.tsx` — a **server** component exporting
   `metadata: Metadata = seoMetadata({ title, description, path })`. Pass
   `index: false` for a thin/placeholder page.
2. Nav entry in `CALC_ITEMS` / `GUIDE_ITEMS` in
   [Navbar.tsx](src/components/Navbar.tsx).
3. `ROUTES` in [src/lib/seo.ts](src/lib/seo.ts) if the page should be indexed —
   this is the sole input to `sitemap.xml`.
4. `<JsonLd data={breadcrumbJsonLd([…])} />`, plus `faqJsonLd()` **only if** the
   same Q&A is visibly rendered on the page.
5. A visible breadcrumb matching the JSON-LD trail.
6. For a calculator, also add a `CalcMeta` to
   [calculator-seo.ts](src/lib/calculator-seo.ts) and push it into
   `CALCULATOR_SEO_INDEX` (it feeds the ItemList on `/calculators`). Its `crumb`
   **must match** the breadcrumb CalcShell renders.

**Every `path` you write in `seo.ts` and `calculator-seo.ts` must correspond to a
real folder under `app/`.** Nothing validates this today, and a mismatch silently
publishes 404s to the sitemap and to structured data (see §12).

## 9. Server vs client components

- Default to server components. Add `'use client'` only for state, effects, or
  browser APIs.
- `JsonLd`, `metadata`, breadcrumbs and `<h1>` must render **outside** any
  Suspense boundary whose fallback would replace them — crawlers need them in the
  initial HTML. The canonical shape is [app/raid/page.tsx](app/raid/page.tsx):

  ```tsx
  <JsonLd data={calculatorPageJsonLd(RAID_SEO)} />
  <CalcShell headerAccent="RAID" headerRest="CALCULATOR" variant="raid">
    <Suspense fallback={<div className="min-h-screen" />}>
      <RaidCalculator />   {/* 'use client', reads search params */}
    </Suspense>
  </CalcShell>
  ```
- Size the Suspense fallback so the page doesn't jump when the calculator swaps in.

## 10. Calculator conventions

- **Shareable state goes in the URL via `nuqs`**; genuinely local UI state (an
  open popup) is plain `useState`. Use
  `{ history: 'replace', clearOnDefault: true }` so typing doesn't spam browser
  history and an untouched page keeps a clean URL.
- Parse enum-ish params with `parseAsStringLiteral(TUPLE)` over a `as const`
  tuple, so an unknown value in a hand-edited URL falls back to the default
  instead of rendering an empty list.
- **Reading search params opts a subtree out of static rendering**, so it needs a
  Suspense boundary. On a content page whose list *is* the SEO content, don't let
  the fallback be a spinner — split the view into a props-driven component and
  render it twice:

  ```tsx
  <Suspense fallback={<Board query="" giver="all" />}>   {/* full list → static HTML */}
    <BoardWithUrlState />                                 {/* URL-filtered on the client */}
  </Suspense>
  ```

  The fallback pass puts the heading and every card into the prerendered HTML
  (the route stays `○ Static` in the build output — check it), while the client
  swaps in the filtered view on hydration. Omitting the setters makes the
  fallback render read-only. See
  [MissionsGuide.tsx](src/components/guides/MissionsGuide.tsx) and
  [MonumentsGuide.tsx](src/components/guides/MonumentsGuide.tsx).
- For inventory-style calculators reuse `parseAsEntries` / `setEntryQty` from
  [url-entries.ts](src/lib/url-entries.ts) (`?i=cloth:80,scrap:200`, order
  preserved, quantities clamped to [0, 9999]).
- **Always re-validate ids parsed from the URL** against the dataset — a
  hand-edited URL is untrusted input.
- Wrap the calculator in `CalcShell` with the right `variant`
  (`raid` | `recycling` | `cupboard`) — it owns the breadcrumb, `<h1>`, share
  button and responsive grid.
- Record engagement with `useFeatureUsed(Feature.x, signal)` from
  [analytics.ts](src/lib/analytics.ts), where `signal` derives from user input.
  Add new event names to the `Feature` map — never inline a raw string.
- Hover labels: put `data-tip="…"` on the element and spread `useTooltip()` onto
  a container. No per-item listeners, no state.

## 11. Images, analytics, text

- **Verify an asset exists before referencing it.** A missing image doesn't
  throw — [Img.tsx](src/components/Img.tsx) dims it to 0.3 opacity, so broken
  icons ship silently. Most item icons exist **only** as
  `/public/images/recycle/<name>.webp`, not as `.png`. Use `<RecycleImg
  src="/images/<name>.png">` (it maps to the WebP copy and falls back). If no
  asset exists, render a text/dot fallback instead of a dead path.
- Analytics is PostHog, EU host, **cookieless** (`persistence: 'memory'`),
  gated on `NEXT_PUBLIC_POSTHOG_KEY` and fully inert without it. `posthog-js` is
  dynamically imported at idle — don't import it directly in a component, and
  don't move it into the critical bundle.
- Copy is **English**. Type real Unicode directly — `—`, `→`, `’` — and verify it
  survives the write; a mojibake title (`Guide ?" Jobs`) already shipped once.
  Older files contain Czech comments; don't add new ones.

## 12. Known issues — don't replicate, do fix if asked

- **`/salvaging` and `/skinning` 404.** `ROUTES` in `seo.ts` and
  `calculator-seo.ts` both point at these paths, but the pages actually live at
  `/guides/salvaging` and `/guides/skinning`. The sitemap and the `/calculators`
  structured data currently advertise two dead URLs.
- **`ROUTES` is missing real pages:** `/guides/missions`, `/guides/salvaging`,
  `/guides/skinning` are indexable but absent from the sitemap.
- `/guides/monuments` is `index: false` despite having full content — verify
  that's still intended before changing it.
- Three near-identical accent reds (`#ce422b`, `#cc422c`, `#cd412b`) and
  hardcoded greys are scattered through components instead of tokens.

## 13. Scope and communication

- Do what was asked. Don't opportunistically refactor unrelated files; if you
  spot a real problem outside scope, finish the task and flag it separately.
- Match the surrounding code's style, comment density, and idiom. Comments here
  explain **why**, not what — follow that, and keep the existing ones.
- Verify before claiming success: run the page, check the output, don't assume.
- Report honestly. If something is skipped, blocked, or pre-existing, say so
  plainly with evidence.
- Commit messages are `type: summary` (`feat:`, `fix:`). Only commit when asked.
