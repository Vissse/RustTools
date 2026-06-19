import type { RaidItem } from '../../types'

import { RaidDataArmoredDoor } from './raid-data-armored-door'
import { RaidDataArmoredDoubleDoor } from './raid-data-armored-double-door'
import { RaidDataArmoredLadderHatch } from './raid-data-armored-ladder-hatch'
import { RaidDataArmoredWall } from './raid-data-armored-wall'
import { RaidDataGarageDoor } from './raid-data-garage-door'
import { RaidDataHighExternalStoneGate } from './raid-data-high-external-stone-gate'
import { RaidDataHighExternalStoneWall } from './raid-data-high-external-stone-wall'
import { RaidDataHighExternalWoodenGate } from './raid-data-high-external-wooden-gate'
import { RaidDataHighExternalWoodenWall } from './raid-data-high-external-wooden-wall'
import { RaidDataLadderHatch } from './raid-data-ladder-hatch'
import { RaidDataMetalBarricade } from './raid-data-metal-barricade'
import { RaidDataMetalHorizontalEmbrasure } from './raid-data-metal-horizontal-embrasure'
import { RaidDataMetalShopFront } from './raid-data-metal-shop-front'
import { RaidDataMetalVerticalEmbrasure } from './raid-data-metal-vertical-embrasure'
import { RaidDataMetalWall } from './raid-data-metal-wall'
import { RaidDataMetalWindowBars } from './raid-data-metal-window-bars'
import { RaidDataReinforcedGlassWindow } from './raid-data-reinforced-glass-window'
import { RaidDataSheetMetalDoor } from './raid-data-sheet-metal-door'
import { RaidDataSheetMetalDoubleDoor } from './raid-data-sheet-metal-double-door'
import { RaidDataStoneWall } from './raid-data-stone-wall'
import { RaidDataStrengthenedGlassWindow } from './raid-data-strengthened-glass-window'
import { RaidDataToolCupboard } from './raid-data-tool-cupboard'
import { RaidDataWoodDoubleDoor } from './raid-data-wood-double-door'
import { RaidDataWoodenDoor } from './raid-data-wooden-door'
import { RaidDataWoodenWall } from './raid-data-wooden-wall'
import { RaidDataWoodenWindowBars } from './raid-data-wooden-window-bars'

// Re-export structure HP table, explosive damage table, and resource icons so
// `../lib/data/raid-data` is the single entry point for all raid data.
export { STRUCTURES, EXPLOSIVES, RESOURCE_ICONS } from './structures'
export { RAID_TOOL_NAMES } from './raid-tool-names'

// Per-structure raiding-tool data: every viable weapon/tool against a structure,
// with the quantity and time needed to break it. Keyed by the same display names
// used in STRUCTURES so the calculator can look it up by the selected target.
export const RAID_DATA: Record<string, RaidItem[]> = {
  'Wooden Wall': RaidDataWoodenWall,
  'Stone Wall': RaidDataStoneWall,
  'Metal Wall': RaidDataMetalWall,
  'Armored Wall': RaidDataArmoredWall,
  'Wooden Door': RaidDataWoodenDoor,
  'Sheet Metal Door': RaidDataSheetMetalDoor,
  'Armored Door': RaidDataArmoredDoor,
  'Wood Double Door': RaidDataWoodDoubleDoor,
  'Sheet Metal Double Door': RaidDataSheetMetalDoubleDoor,
  'Armored Double Door': RaidDataArmoredDoubleDoor,
  'Garage Door': RaidDataGarageDoor,
  'Ladder Hatch': RaidDataLadderHatch,
  'Armored Ladder Hatch': RaidDataArmoredLadderHatch,
  'Metal Shop Front': RaidDataMetalShopFront,
  'Metal Window Bars': RaidDataMetalWindowBars,
  'Wooden Window Bars': RaidDataWoodenWindowBars,
  'Reinforced Glass Window': RaidDataReinforcedGlassWindow,
  'Strengthened Glass Window': RaidDataStrengthenedGlassWindow,
  'Metal Horizontal Embrasure': RaidDataMetalHorizontalEmbrasure,
  'Metal Vertical Embrasure': RaidDataMetalVerticalEmbrasure,
  'High External Wooden Wall': RaidDataHighExternalWoodenWall,
  'High External Stone Wall': RaidDataHighExternalStoneWall,
  'High External Wooden Gate': RaidDataHighExternalWoodenGate,
  'High External Stone Gate': RaidDataHighExternalStoneGate,
  'Metal Barricade': RaidDataMetalBarricade,
  'Tool Cupboard': RaidDataToolCupboard,
}

export {
  RaidDataArmoredDoor,
  RaidDataArmoredDoubleDoor,
  RaidDataArmoredLadderHatch,
  RaidDataArmoredWall,
  RaidDataGarageDoor,
  RaidDataHighExternalStoneGate,
  RaidDataHighExternalStoneWall,
  RaidDataHighExternalWoodenGate,
  RaidDataHighExternalWoodenWall,
  RaidDataLadderHatch,
  RaidDataMetalBarricade,
  RaidDataMetalHorizontalEmbrasure,
  RaidDataMetalShopFront,
  RaidDataMetalVerticalEmbrasure,
  RaidDataMetalWall,
  RaidDataMetalWindowBars,
  RaidDataReinforcedGlassWindow,
  RaidDataSheetMetalDoor,
  RaidDataSheetMetalDoubleDoor,
  RaidDataStoneWall,
  RaidDataStrengthenedGlassWindow,
  RaidDataToolCupboard,
  RaidDataWoodDoubleDoor,
  RaidDataWoodenDoor,
  RaidDataWoodenWall,
  RaidDataWoodenWindowBars,
}
