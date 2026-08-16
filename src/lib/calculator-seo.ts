/**
 * Metadata describing each calculator route, used for structured data only —
 * nothing here is rendered as page copy.
 *
 * `crumb` must match the breadcrumb CalcShell renders visibly on the page, and
 * `description` feeds the WebApplication node (see calculatorPageJsonLd in
 * lib/seo.ts). Kept in one file so a new calculator is registered once and
 * picked up by both its own page and the ItemList on /calculators.
 */
export type CalcMeta = {
  /** Calculator name as it should appear in structured data. */
  name: string
  /** Route path, e.g. "/raid". */
  path: string
  /** Breadcrumb label, matching the visible trail in CalcShell. */
  crumb: string
  /** One-sentence description for the WebApplication node. */
  description: string
}

/** Populated at the bottom of this file — the ItemList on /calculators is
 *  built from it, so a new calculator only has to be added in one place. */
export const CALCULATOR_SEO_INDEX: CalcMeta[] = []

export const RAID_SEO: CalcMeta = {
  name: 'Rust Raid Calculator',
  path: '/raid',
  crumb: 'Raid Calculator',
  description:
    'Work out the cheapest way to break any structure in Rust, by sulfur cost or by explosive count.',
}

export const RECYCLING_SEO: CalcMeta = {
  name: 'Rust Recycling Calculator',
  path: '/recycling',
  crumb: 'Recycling Calculator',
  description:
    'See exactly what any item returns when recycled in Rust, for both Radtown and Safe Zone recyclers.',
}

export const CUPBOARD_SEO: CalcMeta = {
  name: 'Rust Cupboard Calculator',
  path: '/cupboard',
  crumb: 'Cupboard Calculator',
  description:
    'Work out how long a Rust base stays protected from the resources in its Tool Cupboard.',
}

export const DECAY_SEO: CalcMeta = {
  name: 'Rust Decay Calculator',
  path: '/decay',
  crumb: 'Decay Calculator',
  description:
    'Calculate how long any Rust structure survives without upkeep, by building material and current HP.',
}

export const FURNACE_SEO: CalcMeta = {
  name: 'Rust Furnace Calculator',
  path: '/furnace',
  crumb: 'Smelting Calculator',
  description:
    'Calculate smelting time, wood cost and output for every furnace and oven in Rust.',
}

export const SHOPS_SEO: CalcMeta = {
  name: 'Rust Shops Calculator',
  path: '/shops',
  crumb: 'Shops Calculator',
  description:
    'Calculate scrap costs and track purchases at Bandit Camp, Outpost and Fishing Village in Rust.',
}

export const GENETICS_SEO: CalcMeta = {
  name: 'Rust Genetics Calculator',
  path: '/genetics',
  crumb: 'Genetics Calculator',
  description:
    'Cross-breed plant genes in Rust to find the best crop genetics from your current seeds.',
}

// crumb is "Giant Excavator", not "…Calculator": it has to match the visible
// breadcrumb, which CalcShell derives from the page header.
export const GIANT_EXCAVATOR_SEO: CalcMeta = {
  name: 'Rust Giant Excavator Calculator',
  path: '/giant-excavator',
  crumb: 'Giant Excavator',
  description:
    'Calculate Giant Excavator output and diesel fuel consumption in Rust.',
}

export const SALVAGING_SEO: CalcMeta = {
  name: 'Rust Salvaging Calculator',
  path: '/salvaging',
  crumb: 'Salvaging Calculator',
  description:
    'Calculate what a destroyed Bradley APC or Patrol Helicopter returns when salvaged in Rust.',
}

export const SKINNING_SEO: CalcMeta = {
  name: 'Rust Skinning Calculator',
  path: '/skinning',
  crumb: 'Skinning Calculator',
  description:
    'See how much meat, fat, leather and bone you get from skinning each animal in Rust.',
}

CALCULATOR_SEO_INDEX.push(
  RAID_SEO,
  RECYCLING_SEO,
  CUPBOARD_SEO,
  FURNACE_SEO,
  DECAY_SEO,
  SHOPS_SEO,
  GENETICS_SEO,
  SKINNING_SEO,
  SALVAGING_SEO,
  GIANT_EXCAVATOR_SEO,
)
