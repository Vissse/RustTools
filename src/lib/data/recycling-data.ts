import type { RecycleItem, RecycleResource } from "../types";

// Recycler yields verified against Rust as of 2026-06.
// Re-check these values after a Facepunch balance patch.
// `yield` is the full (100%) output per item; the recycler multiplier is applied later.
export const ITEMS: RecycleItem[] = [
  {
    id: "sheetmetal",
    name: "Sheet Metal",
    img: "/images/sheet-metal.png",
    yield: { metal: 100, scrap: 8, hqm: 0, cloth: 0 },
  },
  {
    id: "gears",
    name: "Gears",
    img: "/images/gears.png",
    yield: { metal: 50, scrap: 10, hqm: 0, cloth: 0 },
  },
  {
    id: "metalpipe",
    name: "Metal Pipe",
    img: "/images/metal-pipe.png",
    yield: { metal: 50, scrap: 5, hqm: 0, cloth: 0 },
  },
  {
    id: "propanetank",
    name: "Empty Propane Tank",
    img: "/images/propane-tank.png",
    yield: { metal: 50, scrap: 1, hqm: 0, cloth: 0 },
  },
  {
    id: "roadsigns",
    name: "Road Signs",
    img: "/images/road-signs.png",
    yield: { metal: 50, scrap: 5, hqm: 1, cloth: 0 },
  },
  {
    id: "spring",
    name: "Metal Spring",
    img: "/images/metal-spring.png",
    yield: { metal: 50, scrap: 10, hqm: 0, cloth: 0 },
  },
  {
    id: "semibody",
    name: "Semi-Auto Body",
    img: "/images/semi-auto-body.png",
    yield: { metal: 75, scrap: 15, hqm: 2, cloth: 0 },
  },
  {
    id: "smgbody",
    name: "SMG Body",
    img: "/images/smg-body.png",
    yield: { metal: 75, scrap: 15, hqm: 2, cloth: 0 },
  },
  {
    id: "riflebody",
    name: "Rifle Body",
    img: "/images/rifle-body.png",
    yield: { metal: 250, scrap: 25, hqm: 2, cloth: 0 },
  },
  {
    id: "techtrash",
    name: "Tech Trash",
    img: "/images/tech-trash.png",
    yield: { metal: 0, scrap: 20, hqm: 1, cloth: 0 },
  },
  {
    id: "tarp",
    name: "Tarp",
    img: "/images/tarp.png",
    yield: { metal: 0, scrap: 0, hqm: 0, cloth: 50 },
  },
  {
    id: "sewingkit",
    name: "Sewing Kit",
    img: "/images/sewing-kit.png",
    yield: { metal: 0, scrap: 0, hqm: 0, cloth: 10 },
  },
  {
    id: "rope",
    name: "Rope",
    img: "/images/rope.png",
    yield: { metal: 0, scrap: 0, hqm: 0, cloth: 15 },
  },
  {
    id: "blade",
    name: "Metal Blade",
    img: "/images/metal-blade.png",
    yield: { metal: 15, scrap: 2, hqm: 0, cloth: 0 },
  },
  {
    id: "cctv",
    name: "CCTV Camera",
    img: "/images/cctv-camera.png",
    yield: { metal: 0, scrap: 40, hqm: 4, cloth: 0 },
  },
  {
    id: "fuse",
    name: "Electric Fuse",
    img: "/images/electric-fuse.png",
    yield: { metal: 0, scrap: 20, hqm: 0, cloth: 0 },
  },
  {
    id: "computer",
    name: "Targeting Computer",
    img: "/images/targeting-computer.png",
    yield: { metal: 50, scrap: 70, hqm: 4, cloth: 0 },
  },
];

export const RESOURCE_ICONS: Record<RecycleResource, string> = {
  scrap: "/images/scrap.png",
  metal: "/images/metal-fragments.png",
  hqm: "/images/hq-metal.png",
  cloth: "/images/cloth.png",
};

// Output order for the breakdown rows (matches the original object key order).
export const RESOURCE_ORDER: RecycleResource[] = [
  "metal",
  "scrap",
  "hqm",
  "cloth",
];
