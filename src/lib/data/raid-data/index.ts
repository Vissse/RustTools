import type { RaidItem } from "../../types";

export { STRUCTURES, EXPLOSIVES, RESOURCE_ICONS } from "./structures";
export { RAID_TOOL_NAMES } from "./raid-tool-names";

// OPTIMALIZACE PRO GECKO & MEMORY FOOTPRINT:
// Namísto synchronního držení megabajtových dat v paměti hned při startu,
// poskytujeme asynchronní getter pro načtení specifických dat struktury on-demand.
// Firefox tak nemusí alokovat paměť pro "Armored Wall" data, pokud uživatel počítá "Wooden Door".

export const loadRaidDataForStructure = async (
  structureName: string,
): Promise<RaidItem[]> => {
  switch (structureName) {
    case "Wooden Wall":
      return (await import("./raid-data-wooden-wall")).RaidDataWoodenWall;
    case "Stone Wall":
      return (await import("./raid-data-stone-wall")).RaidDataStoneWall;
    case "Metal Wall":
      return (await import("./raid-data-metal-wall")).RaidDataMetalWall;
    case "Armored Wall":
      return (await import("./raid-data-armored-wall")).RaidDataArmoredWall;
    case "Wooden Door":
      return (await import("./raid-data-wooden-door")).RaidDataWoodenDoor;
    case "Sheet Metal Door":
      return (await import("./raid-data-sheet-metal-door"))
        .RaidDataSheetMetalDoor;
    case "Armored Door":
      return (await import("./raid-data-armored-door")).RaidDataArmoredDoor;
    case "Wood Double Door":
      return (await import("./raid-data-wood-double-door"))
        .RaidDataWoodDoubleDoor;
    case "Sheet Metal Double Door":
      return (await import("./raid-data-sheet-metal-double-door"))
        .RaidDataSheetMetalDoubleDoor;
    case "Armored Double Door":
      return (await import("./raid-data-armored-double-door"))
        .RaidDataArmoredDoubleDoor;
    case "Garage Door":
      return (await import("./raid-data-garage-door")).RaidDataGarageDoor;
    case "Ladder Hatch":
      return (await import("./raid-data-ladder-hatch")).RaidDataLadderHatch;
    case "Armored Ladder Hatch":
      return (await import("./raid-data-armored-ladder-hatch"))
        .RaidDataArmoredLadderHatch;
    case "Metal Shop Front":
      return (await import("./raid-data-metal-shop-front"))
        .RaidDataMetalShopFront;
    case "Metal Window Bars":
      return (await import("./raid-data-metal-window-bars"))
        .RaidDataMetalWindowBars;
    case "Wooden Window Bars":
      return (await import("./raid-data-wooden-window-bars"))
        .RaidDataWoodenWindowBars;
    case "Reinforced Glass Window":
      return (await import("./raid-data-reinforced-glass-window"))
        .RaidDataReinforcedGlassWindow;
    case "Strengthened Glass Window":
      return (await import("./raid-data-strengthened-glass-window"))
        .RaidDataStrengthenedGlassWindow;
    case "Metal Horizontal Embrasure":
      return (await import("./raid-data-metal-horizontal-embrasure"))
        .RaidDataMetalHorizontalEmbrasure;
    case "Metal Vertical Embrasure":
      return (await import("./raid-data-metal-vertical-embrasure"))
        .RaidDataMetalVerticalEmbrasure;
    case "High External Wooden Wall":
      return (await import("./raid-data-high-external-wooden-wall"))
        .RaidDataHighExternalWoodenWall;
    case "High External Stone Wall":
      return (await import("./raid-data-high-external-stone-wall"))
        .RaidDataHighExternalStoneWall;
    case "High External Wooden Gate":
      return (await import("./raid-data-high-external-wooden-gate"))
        .RaidDataHighExternalWoodenGate;
    case "High External Stone Gate":
      return (await import("./raid-data-high-external-stone-gate"))
        .RaidDataHighExternalStoneGate;
    case "Metal Barricade":
      return (await import("./raid-data-metal-barricade"))
        .RaidDataMetalBarricade;
    case "Tool Cupboard":
      return (await import("./raid-data-tool-cupboard")).RaidDataToolCupboard;
    default:
      return [];
  }
};
