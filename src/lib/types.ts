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

export type RecycleResource = "scrap" | "metal" | "hqm" | "cloth";

export type ResourceYield = Record<RecycleResource, number>;

export interface RecycleItem {
  id: string;
  name: string;
  img: string;
  yield: ResourceYield;
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
