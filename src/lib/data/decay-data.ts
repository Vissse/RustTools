// Decay rates by building tier, verified against Rust as of 2026-08.
// `decayHours` is the time a full-HP block of that tier takes to decay to zero
// once it is outside Tool Cupboard range; damage is linear over that window.
//
// Extracted from DecayCalculator so the same numbers can be rendered as a static
// table on the page (the calculator is client-side and never reaches the HTML).
// Edit here, not in the component.
export interface DecayMaterial {
  id: string
  name: string
  hp: number
  decayHours: number
  img: string
}

export const DECAY_MATERIALS: DecayMaterial[] = [
  {
    id: 'twig',
    name: 'Twig',
    hp: 10,
    decayHours: 1,
    img: '/images/twig-wall.png',
  },
  {
    id: 'wood',
    name: 'Wood',
    hp: 250,
    decayHours: 3,
    img: '/images/wood-wall.png',
  },
  {
    id: 'stone',
    name: 'Stone',
    hp: 500,
    decayHours: 5,
    img: '/images/stone-wall.png',
  },
  {
    id: 'metal',
    name: 'Metal',
    hp: 1000,
    decayHours: 8,
    img: '/images/metal-wall.png',
  },
  {
    id: 'armored',
    name: 'Armored',
    hp: 2000,
    decayHours: 12,
    img: '/images/armored-wall.png',
  },
]

export const DECAY_MATERIAL_IDS = DECAY_MATERIALS.map((m) => m.id)
