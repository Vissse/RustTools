# RustTools ⛊

A small set of calculators for the survival game **Rust**, built as one fast web app:

- **Raid Calculator** — pick a structure and which explosives you have, and it works out
  the cheapest combo to break it (by sulfur), with the full resource cost.
- **Recycling Calculator** — drop items into a recycler and see exactly what you get back,
  for both the Radtown and Safe Zone recyclers.
- **Cupboard Calculator** — enter your daily upkeep and see how long your base stays
  protected, laid out across the 24 Tool Cupboard slots.

## Tech

Next.js (App Router) · React · TypeScript · Tailwind CSS · lodash.

## Getting started

You'll need [Node.js](https://nodejs.org) and [pnpm](https://pnpm.io).

```bash
pnpm install      # install dependencies
pnpm dev          # start the dev server (http://localhost:3000)
```

## Other commands

```bash
pnpm build        # production build into .next/
pnpm start        # run the production server locally
pnpm typecheck    # run the TypeScript type checker
```

## Project layout

```
app/              one folder per route (page.tsx), root layout.tsx,
                  sitemap.ts, robots.ts — App Router pages live here
src/
  components/   UI components (Navbar, CalcShell, the calculators)
  lib/          pure logic + game data (and seo.ts, analytics.ts)
    data/       structure HP, explosive damage, recycler yields, stack sizes
  styles/       global.css — the whole Rust-themed look
public/images/  item and resource icons
public/fonts/   self-hosted Teko + Inter webfonts
```

> Game values (HP, damage, yields) are accurate as of mid-2026 — they may need updating
> after a Facepunch balance patch. Look for the dated notes in `src/lib/data/`.
