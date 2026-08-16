import type { RaidItem } from "../../types";
import type { StructureName } from "./structures";

export {
  STRUCTURES,
  EXPLOSIVES,
  RESOURCE_ICONS,
  type StructureName,
  type ExplosiveName,
} from "./structures";
export { RAID_TOOL_NAMES } from "./raid-tool-names";
export {
  EXPLOSIVE_ROW,
  buildDamageMap,
  rowsForQuotedSide,
  type DamageMap,
} from "./explosive-rows";

// OPTIMALIZACE PRO GECKO & MEMORY FOOTPRINT:
// Namísto synchronního držení megabajtových dat v paměti hned při startu,
// poskytujeme asynchronní getter pro načtení specifických dat struktury on-demand.
// Firefox tak nemusí alokovat paměť pro "Armored Wall" data, pokud uživatel počítá "Wooden Door".
//
// `satisfies Record<StructureName, ...>` makes a missing entry a compile error.
// The old switch had a `default: return []` that silently produced an empty tool
// list (and, since the solver now reads this data, would silently produce no combo).
const LOADERS = {
  "Wooden Wall": () =>
    import("./raid-data-wooden-wall").then((m) => m.RaidDataWoodenWall),
  "Stone Wall": () =>
    import("./raid-data-stone-wall").then((m) => m.RaidDataStoneWall),
  "Metal Wall": () =>
    import("./raid-data-metal-wall").then((m) => m.RaidDataMetalWall),
  "Armored Wall": () =>
    import("./raid-data-armored-wall").then((m) => m.RaidDataArmoredWall),
  "Wooden Door": () =>
    import("./raid-data-wooden-door").then((m) => m.RaidDataWoodenDoor),
  "Sheet Metal Door": () =>
    import("./raid-data-sheet-metal-door").then((m) => m.RaidDataSheetMetalDoor),
  "Armored Door": () =>
    import("./raid-data-armored-door").then((m) => m.RaidDataArmoredDoor),
  "Wood Double Door": () =>
    import("./raid-data-wood-double-door").then((m) => m.RaidDataWoodDoubleDoor),
  "Sheet Metal Double Door": () =>
    import("./raid-data-sheet-metal-double-door").then(
      (m) => m.RaidDataSheetMetalDoubleDoor,
    ),
  "Armored Double Door": () =>
    import("./raid-data-armored-double-door").then(
      (m) => m.RaidDataArmoredDoubleDoor,
    ),
  "Garage Door": () =>
    import("./raid-data-garage-door").then((m) => m.RaidDataGarageDoor),
  "Ladder Hatch": () =>
    import("./raid-data-ladder-hatch").then((m) => m.RaidDataLadderHatch),
  "Armored Ladder Hatch": () =>
    import("./raid-data-armored-ladder-hatch").then(
      (m) => m.RaidDataArmoredLadderHatch,
    ),
  "Metal Shop Front": () =>
    import("./raid-data-metal-shop-front").then((m) => m.RaidDataMetalShopFront),
  "Metal Window Bars": () =>
    import("./raid-data-metal-window-bars").then(
      (m) => m.RaidDataMetalWindowBars,
    ),
  "Wooden Window Bars": () =>
    import("./raid-data-wooden-window-bars").then(
      (m) => m.RaidDataWoodenWindowBars,
    ),
  "Reinforced Glass Window": () =>
    import("./raid-data-reinforced-glass-window").then(
      (m) => m.RaidDataReinforcedGlassWindow,
    ),
  "Strengthened Glass Window": () =>
    import("./raid-data-strengthened-glass-window").then(
      (m) => m.RaidDataStrengthenedGlassWindow,
    ),
  "Metal Horizontal Embrasure": () =>
    import("./raid-data-metal-horizontal-embrasure").then(
      (m) => m.RaidDataMetalHorizontalEmbrasure,
    ),
  "Metal Vertical Embrasure": () =>
    import("./raid-data-metal-vertical-embrasure").then(
      (m) => m.RaidDataMetalVerticalEmbrasure,
    ),
  "High External Wooden Wall": () =>
    import("./raid-data-high-external-wooden-wall").then(
      (m) => m.RaidDataHighExternalWoodenWall,
    ),
  "High External Stone Wall": () =>
    import("./raid-data-high-external-stone-wall").then(
      (m) => m.RaidDataHighExternalStoneWall,
    ),
  "High External Wooden Gate": () =>
    import("./raid-data-high-external-wooden-gate").then(
      (m) => m.RaidDataHighExternalWoodenGate,
    ),
  "High External Stone Gate": () =>
    import("./raid-data-high-external-stone-gate").then(
      (m) => m.RaidDataHighExternalStoneGate,
    ),
  "Metal Barricade": () =>
    import("./raid-data-metal-barricade").then((m) => m.RaidDataMetalBarricade),
  "Tool Cupboard": () =>
    import("./raid-data-tool-cupboard").then((m) => m.RaidDataToolCupboard),
} satisfies Record<StructureName, () => Promise<RaidItem[]>>;

// Re-selecting a structure shouldn't re-run the dynamic import.
const cache = new Map<StructureName, Promise<RaidItem[]>>();

export function loadRaidDataForStructure(
  structureName: StructureName,
): Promise<RaidItem[]> {
  let pending = cache.get(structureName);
  if (!pending) {
    pending = LOADERS[structureName]();
    cache.set(structureName, pending);
  }
  return pending;
}
