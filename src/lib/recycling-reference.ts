/**
 * Static recycler-yield rows rendered under the calculator.
 *
 * The full dataset is 770 items — far too many to publish as one table, and a
 * page that dumps all of them answers nothing in particular. Components are the
 * subset the question is almost always about ("what does a Tech Trash give
 * you"), they are the densest scrap source in the game, and they fit on a page.
 * The calculator still covers everything.
 */
import {
  ITEMS,
  RES_MAP,
  RESOURCE_LABELS,
  COMPONENT_INFO,
} from "./data/recycling-data";
import type { RecycleItem, RecycleYield } from "./types";

/**
 * A yield map as readable text: "75 Metal Fragments, 2 High Quality Metal".
 *
 * Keys are usually base resources but may be component ids (recycling a gun
 * returns gears, not metal), so both lookup tables are consulted before falling
 * back to the raw key. Order follows the data file, which lists the primary
 * output first.
 */
export function formatYield(y: RecycleYield): string {
  const parts = Object.entries(y).map(([key, amount]) => {
    const resource = RES_MAP[key];
    const label =
      (resource && FULL_RESOURCE_LABELS[resource]) ??
      COMPONENT_INFO[key]?.label ??
      key;
    return `${amount} ${label}`;
  });
  return parts.length ? parts.join(", ") : "Nothing";
}

/**
 * Spelled-out resource names for prose and tables. RESOURCE_LABELS is tuned for
 * the calculator's narrow output cards ("High Qual"), which reads as a typo once
 * it is lifted out of the UI and quoted somewhere else.
 */
const FULL_RESOURCE_LABELS: Record<string, string> = {
  ...RESOURCE_LABELS,
  hqm: "High Quality Metal",
  metal: "Metal Fragments",
  lgf: "Low Grade Fuel",
  gp: "Gunpowder",
};

/** Components, alphabetical — the table published on /recycling. */
export const COMPONENT_ITEMS: RecycleItem[] = ITEMS.filter(
  (i) => i.category === "components",
).sort((a, b) => a.name.localeCompare(b.name));

/** Scrap an item returns from a Radtown recycler, 0 if it returns none. */
function scrapOf(item: RecycleItem): number {
  return item.yield.scrap ?? 0;
}

/**
 * The highest-scrap items in the game, used for the "what should I recycle"
 * answer. Derived rather than written down so a balance patch can't leave the
 * prose contradicting the table below it.
 */
export const TOP_SCRAP_ITEMS: RecycleItem[] = [...ITEMS]
  .filter((i) => scrapOf(i) > 0)
  .sort((a, b) => scrapOf(b) - scrapOf(a) || a.name.localeCompare(b.name))
  .slice(0, 10);

export { scrapOf };
