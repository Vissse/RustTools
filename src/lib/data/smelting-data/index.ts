import type { SmeltingProcess } from "../../types";
import { Barbeque } from "./smelting-data-barbeque";
import { Campfire } from "./smelting-data-campfire";
import { Furnace } from "./smelting-data-furnace";
import { LargeFurnace } from "./smelting-data-large-furnace";
import { SmallOilRefinery } from "./smelting-data-small-oil-refinery";
import { SmallStoneFireplace } from "./smelting-data-small-stone-fireplace";

/**
 * Every smelter the calculator knows about, with its slot count.
 *
 * Extracted from FurnaceCalculator so the static smelting table on the page can
 * be built from the same list — the calculator is client-side, so its rows never
 * reach the HTML. Slot counts verified against Rust as of 2026-08.
 */
export const SMELTERS = [
  {
    id: "furnace",
    name: "Furnace",
    slots: 3,
    img: "/images/furnace.png",
    data: Furnace,
  },
  {
    id: "large-furnace",
    name: "Large Furnace",
    slots: 15,
    img: "/images/furnace.large.png",
    data: LargeFurnace,
  },
  {
    id: "small-oil-refinery",
    name: "Oil Refinery",
    slots: 1,
    img: "/images/small.oil.refinery.png",
    data: SmallOilRefinery,
  },
  {
    id: "campfire",
    name: "Camp Fire",
    slots: 1,
    img: "/images/campfire.png",
    data: Campfire,
  },
  {
    id: "barbeque",
    name: "Barbeque",
    slots: 1,
    img: "/images/bbq.png",
    data: Barbeque,
  },
  {
    id: "small-stone-fireplace",
    name: "Stone Fireplace",
    slots: 1,
    img: "/images/fireplace.stone.png",
    data: SmallStoneFireplace,
  },
] satisfies readonly {
  id: string;
  name: string;
  slots: number;
  img: string;
  data: SmeltingProcess[];
}[];

/**
 * The ores, as opposed to the cookables. These are the rows anyone asking about
 * smelting means, and the only ones common to every furnace-class smelter.
 */
export const ORE_INPUTS = [
  "Metal Ore",
  "Sulfur Ore",
  "High Quality Metal Ore",
] as const;

export type { SmeltingProcess } from "../../types";
