// Giant Excavator output, verified against Rust as of 2026-08.
//
// Extracted from GiantExcavatorCalculator so the same rates can be rendered as a
// static table on the page — the calculator is client-side, so its numbers never
// reach the HTML.
//
// One barrel of Diesel Fuel runs the excavator for MINUTES_PER_BARREL, and the
// yield below is the total for that run with the resource selected on the
// control panel. Only one resource is produced at a time.
export const MINUTES_PER_BARREL = 2

export interface ExcavatorRate {
  id: string
  name: string
  yieldPerBarrel: number
  img: string
}

export const EXCAVATOR_RATES: ExcavatorRate[] = [
  {
    id: 'hqm',
    name: 'High Quality Metal Ore',
    yieldPerBarrel: 100,
    img: '/images/hq.metal.ore.png',
  },
  {
    id: 'sulfur',
    name: 'Sulfur Ore',
    yieldPerBarrel: 2000,
    img: '/images/sulfur.ore.png',
  },
  {
    id: 'stone',
    name: 'Stones',
    yieldPerBarrel: 10000,
    img: '/images/stones.png',
  },
  {
    id: 'metal',
    name: 'Metal Fragments',
    yieldPerBarrel: 5000,
    img: '/images/metal.fragments.png',
  },
]
