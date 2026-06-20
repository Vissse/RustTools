/* Shared domain types for the RustTools calculators. */

export type Material = "Wooden" | "Stone" | "Metal" | "Armored";

export interface Structure {
  hp: number;
  material: Material;
  img: string;
}

/** Damage table keyed by material or by a specific structure name (override). */
export type DamageTable = Partial<Record<Material | string, number>>;

export interface Explosive {
  name: string;
  short: string;
  img: string;
  cost: { s: number; m: number; c: number };
  dmg: DamageTable;
}

/** One line of a raid combo: how many of an explosive, with its resource totals. */
export interface ComboItem {
  exp: Explosive;
  qty: number;
  totalSulfur: number;
  totalMetal: number;
  totalCharcoal: number;
}

export type RecycleResource =
  | "scrap"
  | "metal"
  | "hqm"
  | "cloth"
  | "wood"
  | "stone"
  | "lgf"
  | "gp"
  | "leather"
  | "sulfur";

/**
 * Raw recycler output keyed by JSON yield id. Keys are usually base resources
 * (normalized to a RecycleResource via RES_MAP) but may also be component item
 * ids (e.g. "gears", "metalpipe") that resolve to their own item image.
 */
export type RecycleYield = Record<string, number>;

/** A chance-based extra output produced by recycling an item. */
export interface RecycleRandomDrop {
  id: string;
  amount: number;
  chance: number;
}

export interface RecycleItem {
  id: string;
  name: string;
  category: string;
  img: string;
  yield: RecycleYield;
  safezone_yield: RecycleYield;
  random?: RecycleRandomDrop[];
  safezone_random?: RecycleRandomDrop[];
  /** Items recycled per cycle (one 5s/8s batch). Absent = 1 (one cycle per item). */
  recycleStack?: number;
}

export type RecyclerKind = "radtown" | "safezone";

export type StackType = "wood" | "stone" | "metal" | "hqm";

export interface CupboardResult {
  daysFloat: number;
  wood: number;
  stone: number;
  metal: number;
  hqm: number;
}

export interface Stack {
  type: StackType;
  img: string;
  amount: number;
}

export type RaidCategory =
  | "explosive"
  | "guns"
  | "melee"
  | "siege weapons"
  | "throw"
  | "torpedo";

export interface RaidItem {
  name: string;
  side: "soft" | "hard" | "both";
  category: RaidCategory;
  damage: number;
  quantity: number;
  time: string;
}

export interface CraftingRequirement {
  name: string;
  quantity: number;
}

export interface SmeltingProcess {
  inputItem: string;
  woodRequired: number;
  outputItem: string;
  outputQuantity: string | number;
  timeSeconds: number;
}
