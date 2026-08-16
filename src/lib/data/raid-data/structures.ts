import type { Explosive, Structure } from '../../types'

// Structure HP and explosive craft costs, verified against Rust as of 2026-08.
// Re-check after a Facepunch balance patch, then run `pnpm verify:raid`.
//
// Explosive DAMAGE is deliberately not here. It used to be a table keyed by
// material tier, which is wrong for every door/hatch/window/gate — Rust assigns
// damage per prefab, not per tier. Damage now comes from the per-structure
// raid-data-*.ts files via buildDamageMap() in ./explosive-rows.ts, which is the
// same data the tool lists render, so the two can no longer contradict.

// Destructible structures, keyed by display name. Each key must have an entry in
// LOADERS (see ./index.ts) so the calculator can pull the per-structure tool list.
export const STRUCTURES = {
  'Wooden Wall': { hp: 250, material: 'Wooden', img: '/images/wood-wall.png' },
  'Stone Wall': { hp: 500, material: 'Stone', img: '/images/stone-wall.png' },
  'Metal Wall': { hp: 1000, material: 'Metal', img: '/images/metal-wall.png' },
  'Armored Wall': {
    hp: 2000,
    material: 'Armored',
    img: '/images/armored-wall.png',
  },
  'Wooden Door': {
    hp: 200,
    material: 'Wooden',
    img: '/images/door.hinged.wood.png',
  },
  'Sheet Metal Door': {
    hp: 250,
    material: 'Metal',
    img: '/images/door.hinged.metal.png',
  },
  'Armored Door': {
    hp: 1000,
    material: 'Armored',
    img: '/images/door.hinged.toptier.png',
  },
  'Wood Double Door': {
    hp: 200,
    material: 'Wooden',
    img: '/images/door.double.hinged.wood.png',
  },
  'Sheet Metal Double Door': {
    hp: 250,
    material: 'Metal',
    img: '/images/door.double.hinged.metal.png',
  },
  'Armored Double Door': {
    hp: 1000,
    material: 'Armored',
    img: '/images/door.double.hinged.toptier.png',
  },
  'Garage Door': {
    hp: 600,
    material: 'Metal',
    img: '/images/wall.frame.garagedoor.png',
  },
  'Ladder Hatch': {
    hp: 250,
    material: 'Metal',
    img: '/images/floor.ladder.hatch.png',
  },
  'Armored Ladder Hatch': {
    hp: 1000,
    material: 'Armored',
    img: '/images/floor.ladder.hatch.toptier.png',
  },
  'Metal Shop Front': {
    hp: 750,
    material: 'Metal',
    img: '/images/wall.frame.shopfront.metal.png',
  },
  'Metal Window Bars': {
    hp: 500,
    material: 'Metal',
    img: '/images/wall.window.bars.metal.png',
  },
  'Wooden Window Bars': {
    hp: 250,
    material: 'Wooden',
    img: '/images/wall.window.bars.wood.png',
  },
  'Reinforced Glass Window': {
    hp: 500,
    material: 'Metal',
    img: '/images/wall.window.bars.toptier.png',
  },
  'Strengthened Glass Window': {
    hp: 250,
    material: 'Metal',
    img: '/images/wall.window.glass.reinforced.png',
  },
  'Metal Horizontal Embrasure': {
    hp: 500,
    material: 'Metal',
    img: '/images/shutter.metal.embrasure.a.png',
  },
  'Metal Vertical Embrasure': {
    hp: 500,
    material: 'Metal',
    img: '/images/shutter.metal.embrasure.b.png',
  },
  'High External Wooden Wall': {
    hp: 500,
    material: 'Wooden',
    img: '/images/wall.external.high.png',
  },
  'High External Stone Wall': {
    hp: 500,
    material: 'Stone',
    img: '/images/wall.external.high.stone.png',
  },
  'High External Wooden Gate': {
    hp: 500,
    material: 'Wooden',
    img: '/images/gates.external.high.wood.png',
  },
  'High External Stone Gate': {
    hp: 500,
    material: 'Stone',
    img: '/images/gates.external.high.stone.png',
  },
  'Metal Barricade': {
    hp: 500,
    material: 'Metal',
    img: '/images/barricade.metal.png',
  },
  'Tool Cupboard': {
    hp: 100,
    material: 'Wooden',
    img: '/images/cupboard.tool.png',
  },
} as const satisfies Record<string, Structure>

/** Display name of a structure the calculator knows about. */
export type StructureName = keyof typeof STRUCTURES

// Explosives the solver can combine. `cost` is per unit in sulfur (s) / metal
// fragments (m) / charcoal (c). Damage is NOT here — see the header comment.
// Each name must have an entry in EXPLOSIVE_ROW (./explosive-rows.ts) naming the
// raid-data row it draws its per-structure damage from.
export const EXPLOSIVES = [
  {
    name: 'C4',
    short: 'C4',
    img: '/images/explosive.timed.png',
    cost: { s: 2200, m: 200, c: 3000 },
  },
  {
    name: 'Rocket',
    short: 'Rocket',
    img: '/images/ammo.rocket.basic.png',
    cost: { s: 1400, m: 100, c: 1950 },
  },
  {
    name: 'Explosive 5.56 Rifle Ammo',
    short: 'Exp.Ammo',
    img: '/images/ammo.rifle.explosive.png',
    cost: { s: 25, m: 5, c: 30 },
  },
  {
    name: 'High Velocity Rocket',
    short: 'HV Rocket',
    img: '/images/ammo.rocket.hv.png',
    cost: { s: 200, m: 0, c: 300 },
  },
  {
    name: 'F1 Grenade',
    short: 'F1 Gren.',
    img: '/images/grenade.f1.png',
    cost: { s: 60, m: 25, c: 90 },
  },
  {
    name: 'Beancan Grenade',
    short: 'Beancan',
    img: '/images/grenade.beancan.png',
    cost: { s: 120, m: 20, c: 180 },
  },
  {
    name: 'Satchel',
    short: 'Satchel',
    img: '/images/explosive.satchel.png',
    cost: { s: 480, m: 80, c: 720 },
  },
] as const satisfies readonly Explosive[]

/** Name of an explosive the solver can combine. */
export type ExplosiveName = (typeof EXPLOSIVES)[number]['name']

export const RESOURCE_ICONS = {
  sulfur: '/images/sulfur.png',
  metal: '/images/metal.fragments.png',
  coal: '/images/charcoal.png',
} as const
