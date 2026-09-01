/**
 * Static harvest tables for /guides/skinning and /guides/salvaging.
 *
 * Both pages render their numbers inside a hover drawer behind a tool picker
 * (`useState`), so a crawler receives the animal names and nothing else — the
 * yields, the whole point of the page, never exist in the HTML. These rows put
 * one representative line per target into the static markup without touching the
 * card UI.
 *
 * Row order in the data files is best-tool-first (Skinning Knife on every
 * animal, Jackhammer on every wreck), which is what `bestTool` relies on. It
 * looks the preferred tool up by name first so a reordered file degrades to a
 * still-correct row rather than a silently wrong one.
 */
import { SKINNING_DATA, type SkinningTarget } from "./data/skinning-data";
import { SALVAGING_DATA, type SalvagingTarget } from "./data/salvaging-data";
import type { SkinningData, SalvagingData } from "./types";

function bestTool<T extends { tool: string }>(
  rows: T[] | undefined,
  preferred: string,
): T | undefined {
  return rows?.find((r) => r.tool === preferred) ?? rows?.[0];
}

export const PREFERRED_SKINNING_TOOL = "Skinning Knife";
export const PREFERRED_SALVAGING_TOOL = "Jackhammer";

export interface HarvestRow {
  target: string;
  tool: string;
  /** "20 Raw Bear Meat, 100 Animal Fat, 100 Leather" — already display-ready. */
  resources: string;
  time: string;
  conditionLoss: string;
}

function toRow(target: string, data: SkinningData | SalvagingData): HarvestRow {
  return {
    target,
    tool: data.tool,
    resources: data.resources.map((r) => `${r.quantity} ${r.name}`).join(", "),
    time: data.time,
    conditionLoss: data.conditionLoss,
  };
}

export const SKINNING_ROWS: HarvestRow[] = (
  Object.keys(SKINNING_DATA) as SkinningTarget[]
)
  .map((target) => {
    const best = bestTool(SKINNING_DATA[target], PREFERRED_SKINNING_TOOL);
    return best ? toRow(target, best) : null;
  })
  .filter((r): r is HarvestRow => r !== null);

export const SALVAGING_ROWS: HarvestRow[] = (
  Object.keys(SALVAGING_DATA) as SalvagingTarget[]
)
  .map((target) => {
    const best = bestTool(SALVAGING_DATA[target], PREFERRED_SALVAGING_TOOL);
    return best ? toRow(target, best) : null;
  })
  .filter((r): r is HarvestRow => r !== null);

/** One resource's quantity for a target's best tool, for use in prose. */
export function skinningYield(
  target: SkinningTarget,
  resource: string,
): string | undefined {
  return bestTool(SKINNING_DATA[target], PREFERRED_SKINNING_TOOL)?.resources.find(
    (r) => r.name === resource,
  )?.quantity;
}

/** A salvage target's best-tool line, for use in prose. */
export function salvageBest(target: SalvagingTarget): SalvagingData | undefined {
  return bestTool(SALVAGING_DATA[target], PREFERRED_SALVAGING_TOOL);
}
