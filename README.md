# RustTools ⛊

A small set of calculators for the survival game **Rust**, built as one fast web app:

- **Raid Calculator** — pick a structure and which explosives you have, and it works out
  the cheapest combo to break it (by sulfur), with the full resource cost.
- **Recycling Calculator** — drop items into a recycler and see exactly what you get back,
  for both the Radtown and Safe Zone recyclers.
- **Cupboard Calculator** — enter your daily upkeep and see how long your base stays
  protected, laid out across the 24 Tool Cupboard slots.

## Tech

Vite · React · TanStack Router · TypeScript · Tailwind CSS · lodash.

## Getting started

You'll need [Node.js](https://nodejs.org) and [pnpm](https://pnpm.io).

```bash
pnpm install      # install dependencies
pnpm dev          # start the dev server (http://localhost:5173)
```

## Other commands

```bash
pnpm build        # production build into dist/
pnpm preview      # preview the production build locally
pnpm typecheck    # run the TypeScript type checker
```

## Project layout

```
src/
  components/   UI components (Navbar, CalcShell, the three calculators)
  lib/          pure logic + game data
    data/       structure HP, explosive damage, recycler yields, stack sizes
  routes/       one file per page (/, /recycling, /cupboard)
  styles/       global.css — the whole Rust-themed look
public/images/  item and resource icons
```

> Game values (HP, damage, yields) are accurate as of mid-2026 — they may need updating
> after a Facepunch balance patch. Look for the dated notes in `src/lib/data/`.
