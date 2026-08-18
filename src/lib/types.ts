/* Shared domain types for the RustTools calculators. */

/**
 * Build tier. Descriptive only — never key damage off this. Rust assigns damage
 * per prefab, not per tier: a Sheet Metal Door and a Metal Wall are both "Metal"
 * but take very different damage from the same explosive. Per-explosive damage
 * lives in the per-structure raid-data-*.ts files.
 */
export type Material = "Wooden" | "Stone" | "Metal" | "Armored";

export interface Structure {
  hp: number;
  material: Material;
  img: string;
}

export interface Explosive {
  name: string;
  short: string;
  img: string;
  cost: { s: number; m: number; c: number };
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

/**
 * Which face of the structure was hit. Only the wall files carry a real split;
 * everything else is "both". The calculator quotes the hard (outside) side.
 */
export type RaidSide = "soft" | "hard";

export interface RaidItem {
  name: string;
  side: RaidSide | "both";
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

export interface SkinningResource {
  name: string;
  quantity: string;
}

export interface SkinningData {
  tool: string;
  resources: SkinningResource[];
  time: string;
  conditionLoss: string;
}

export interface SalvagingResource {
  name: string;
  quantity: string;
}

export interface SalvagingData {
  tool: string;
  resources: SalvagingResource[];
  time: string;
  conditionLoss: string;
}
export type MonumentCard = { type: string; name: string; logic: string; };
export type MonumentIcon = { name: string; count: number; };
export type Monument = {
    id: string;
    name: string;
    subtitle: string | null;
    tier: string;
    cardsNeeded: MonumentCard[];
    cardsFound: MonumentCard[];
    variants?: string[];
    utilities: (MonumentIcon & { onlyInVariant?: string })[];
    vehicles: { name: string; count: number; respawn?: string; }[];
    cctv: string;
    bpFrags: MonumentIcon[];
    advBp: MonumentIcon[];
    guide?: string;
    description?: string;
    strategy?: string;
    features?: {
      isSafezone?: boolean;
      hasTunnelEntrance?: boolean;
      hasChinookDropZone?: boolean;
      allowsPatrolHeliCrash?: boolean;
      scientists?: number;
      radiation?: {
        median?: number;
        max?: number;
      };
    };
    lootDetails?: {
      eliteCrates?: number;
      militaryCrates?: number;
      regularCrates?: number;
      basicCrates?: number;
      barrels?: number;
    };
    collectibles?: {
      name: string;
      count: number;
      respawn?: string;
    }[];
    scientists?: {
      name: string;
      count: number;
      respawn?: string;
    }[];
    puzzle?: {
      bring?: { name: string; count: number; text?: string; }[];
      activate?: { name: string; count: number; text?: string; }[];
      rewards?: { name: string; count: number; text?: string; }[];
      resetTime?: string;
    };
    mining?: {
      input: { name: string; count: number; };
      time: string;
      outputs: { name: string; count: number; chance?: string; }[];
    }[];
    spawns?: {
      name: string;
      count?: number;
      respawn?: string;
      text?: string;
      onlyInTier?: string;
      onlyInVariant?: string;
      variants?: { name: string; chance: string; }[];
    }[];
};
