import type { Explosive, Structure } from "../types";

// Game data (structure HP / explosive damage) verified against Rust as of 2026-06.
// Re-check these values after a Facepunch balance patch.

// Destructible structures, keyed by display name.
// `material` selects the damage column in each explosive's `dmg` table;
// some structures (e.g. Garage Door, Tool Cupboard) get a per-structure override.
export const STRUCTURES: Record<string, Structure> = {
  "Wooden Wall": { hp: 250, material: "Wooden", img: "/images/wood-wall.png" },
  "Stone Wall": { hp: 500, material: "Stone", img: "/images/stone-wall.png" },
  "Metal Wall": { hp: 1000, material: "Metal", img: "/images/metal-wall.png" },
  "Armored Wall": {
    hp: 2000,
    material: "Armored",
    img: "/images/armored-wall.png",
  },
  "Wood Double Door": {
    hp: 200,
    material: "Wooden",
    img: "/images/wood-double-door.png",
  },
  "Sheet Metal Double Door": {
    hp: 250,
    material: "Metal",
    img: "/images/sheet-metal-double-door.png",
  },
  "Armored Double Door": {
    hp: 800,
    material: "Armored",
    img: "/images/armored-double-door.png",
  },
  "Garage Door": { hp: 600, material: "Metal", img: "/images/garage-door.png" },
  "Ladder Hatch": {
    hp: 250,
    material: "Metal",
    img: "/images/ladder-hatch.png",
  },
  "Metal Shop Front": {
    hp: 750,
    material: "Metal",
    img: "/images/metal-shop-front.png",
  },
  "Metal Window Bars": {
    hp: 500,
    material: "Metal",
    img: "/images/metal-window-bars.png",
  },
  "Reinforced Glass Window": {
    hp: 500,
    material: "Metal",
    img: "/images/reinforced-glass-window.png",
  },
  "Metal H|V Embrasure": {
    hp: 500,
    material: "Metal",
    img: "/images/metal-embrasure.png",
  },
  "Strengthened Glass Window": {
    hp: 250,
    material: "Metal",
    img: "/images/strengthened-glass-window.png",
  },
  "High External Wooden Wall": {
    hp: 500,
    material: "Wooden",
    img: "/images/high-external-wooden-wall.png",
  },
  "High External Stone Wall": {
    hp: 500,
    material: "Stone",
    img: "/images/high-external-stone-wall.png",
  },
  "Metal Barricade": {
    hp: 500,
    material: "Metal",
    img: "/images/metal-barricade.png",
  },
  "Tool Cupboard": {
    hp: 100,
    material: "Wooden",
    img: "/images/tool-cupboard.png",
  },
};

// Explosives. `cost` is per unit in sulfur (s) / metal fragments (m) / charcoal (c).
// `dmg` maps a structure material (or a specific structure name) to damage per hit.
export const EXPLOSIVES: Explosive[] = [
  {
    name: "C4",
    short: "C4",
    img: "/images/c4.png",
    cost: { s: 2200, m: 200, c: 3000 },
    dmg: {
      Wooden: 495,
      Stone: 275,
      Metal: 275,
      Armored: 275,
      "Garage Door": 440,
      "Tool Cupboard": 100,
    },
  },
  {
    name: "Rocket",
    short: "Rocket",
    img: "/images/rocket.png",
    cost: { s: 1400, m: 100, c: 1950 },
    dmg: { Wooden: 247.6, Stone: 137.6, Metal: 137.6, Armored: 137.6 },
  },
  {
    name: "Explosive 5.56 Rifle Ammo",
    short: "Exp.Ammo",
    img: "/images/ammo-rifle-explosive.png",
    cost: { s: 25, m: 5, c: 30 },
    dmg: { Wooden: 5, Stone: 3.937, Metal: 2.5, Armored: 2.5 },
  },
  {
    name: "High Velocity Rocket",
    short: "HV Rocket",
    img: "/images/ammo-rocket-hv.png",
    cost: { s: 200, m: 0, c: 300 },
    dmg: { Wooden: 90, Stone: 31, Metal: 31, Armored: 31 },
  },
  {
    name: "F1 Grenade",
    short: "F1 Gren.",
    img: "/images/grenade-f1.png",
    cost: { s: 60, m: 25, c: 90 },
    dmg: { Wooden: 2, Stone: 2, Metal: 1, Armored: 1 },
  },
  {
    name: "Beancan Grenade",
    short: "Beancan",
    img: "/images/grenade-beancan.png",
    cost: { s: 120, m: 20, c: 180 },
    dmg: { Wooden: 19.5, Stone: 11, Metal: 9, Armored: 9 },
  },
  {
    name: "Satchel",
    short: "Satchel",
    img: "/images/explosive-satchel.png",
    cost: { s: 480, m: 80, c: 720 },
    dmg: {
      Wooden: 91.5,
      Stone: 51.6,
      Metal: 43.5,
      Armored: 43.5,
      "Tool Cupboard": 100,
    },
  },
];

export const RESOURCE_ICONS = {
  sulfur: "/images/sulfur.png",
  metal: "/images/metal-fragments.png",
  coal: "/images/charcoal.png",
} as const;
