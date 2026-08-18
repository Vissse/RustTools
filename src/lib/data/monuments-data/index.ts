// Re-export types
export type { Monument, MonumentCard, MonumentIcon } from '../../types';



const IMAGE_MAP: Record<string, string> = {
  'diesel fuel (collectable)': '/images/items/diesel-collectable.webp',
  'chair': '/images/recycle/chair.webp',
  'junkyard shredder': '/images/items/junkyard.shredder.webp',
  'shreddable pickuptruck': '/images/items/shreddable.pickuptruck.webp',
  'crate basic jungle': '/images/items/basic.jungle.crate.webp',
  "advanced blueprint fragment": "/images/recycle/advancedblueprintfragment.webp",
  "advanced blueprint fragments": "/images/recycle/advancedblueprintfragment.webp",
  "airfield scientist": "/images/thumbnails/airfield-scientist.webp",
  "ammunition crate": "/images/items/ammunition.crate.webp",
  "arctic research base scientist": "/images/thumbnails/arctic-research-base-scientist.webp",
  "attack helicopter": "/images/items/attack.helicopter.png",
  "barbecue": "/images/items/barbecue.png",
  "basic blueprint fragment": "/images/recycle/basicblueprintfragment.webp",
  "basic crate": "/images/items/basic.crate.webp",
  "bbq": "/images/items/bbq.png",
  "bicycle": "/images/items/bicycle.webp",
  "bike": "/images/items/bicycle.webp",
  "blue keycard": "/images/items/blue.keycard.png",
  "blue loot barrel": "/images/items/blue.loot.barrel.webp",
  "blueprint fragments": "/images/recycle/basicblueprintfragment.webp",
  "bradley apc": "/images/items/bradley.apc.png",
  "computer station": "/images/recycle/computerstation.webp",
  "diesel barrel": "/images/items/diesel.barrel.png",
  "diesel fuel": "/images/diesel_barrel.png",
  "diesel_barrel": "/images/items/diesel_barrel.png",
  "duo submarine": "/images/items/duo.submarine.webp",
  "electric fuse": "/images/items/electric.fuse.webp",
  "elevator": "/images/recycle/elevator.webp",
  "elite crate": "/images/items/elite.crate.webp",
  "excavator scientist": "/images/thumbnails/excavator-scientist.webp",
  "food crate": "/images/items/food.crate.webp",
  "foodbox": "/images/items/foodbox.webp",
  "fuel crate": "/images/items/fuel.crate.webp",
  "green keycard": "/images/items/green.keycard.png",
  "green recycler": "/images/items/recycler.png",
  "high quality metal ore": "/images/recycle/hq.metal.ore.webp",
  "hobo barrel": "/images/items/hobo.barrel.webp",
  "horse": "/images/items/horse.png",
  "hot air balloon": "/images/items/hot.air.balloon.png",
  "hqm ore": "/images/recycle/hq.metal.ore.webp",
  "locked crate": "/images/items/locked.crate.webp",
  "locked ghostship crate": "/images/items/locked.crate.webp",
  "loot barrel": "/images/items/blue.loot.barrel.webp",
  "medical crate": "/images/items/medical.crate.webp",
  "metal node": "/images/items/metal.node.webp",
  "metal ore": "/images/recycle/metal.ore.webp",
  "metal shop front": "/images/items/metal.shop.front.webp",
  "military crate": "/images/items/military.crate.webp",
  "military tunnel scientist": "/images/items/military.tunnel.scientist.png",
  "minecart": "/images/items/minecart.webp",
  "minicopter": "/images/items/minicopter.png",
  "mining quarry": "/images/items/mining.quarry.webp",
  "mlrs": "/images/recycle/mlrs.webp",
  "modular car lift": "/images/recycle/modularcarlift.webp",
  "motor rowboat": "/images/items/motor.rowboat.png",
  "motorbike": "/images/recycle/motorbike.webp",
  "normal crate - cave": "/images/items/normal.crate.webp",
  "normal crate food": "/images/items/normal.crate.food.webp",
  "normal crate medical": "/images/items/normal.crate.medical.webp",
  "normal crate": "/images/items/normal.crate.webp",
  "oil barrel": "/images/items/oil.barrel.webp",
  "oil refinery": "/images/items/oil.refinery.png",
  "patrol boat": "/images/rhib.png",
  "poker table": "/images/items/poker.table.webp",
  "portable boom box": "/images/recycle/fun.boomboxportable.webp",
  "pump jack": "/images/recycle/mining.pumpjack.webp",
  "recycler": "/images/items/recycler.png",
  "red keycard": "/images/items/red.keycard.png",
  "repair bench": "/images/recycle/box.repair.bench.webp",
  "research table": "/images/recycle/research.table.webp",
  "rhib": "/images/items/rhib.png",
  "ridable horse": "/images/items/ridable.horse.png",
  "road signs": "/images/items/road.signs.webp",
  "roadsign": "/images/items/roadsign.webp",
  "rowboat": "/images/items/rowboat.png",
  "satellite crate": "/images/items/satellite.crate.webp",
  "scientist drybox": "/images/items/scientist.drybox.webp",
  "scientist": "/images/items/scientist.png",
  "scrap transport helicopter": "/images/recycle/scrap.transport.helicopter.webp",
  "small oil refinery": "/images/items/small.oil.refinery.png",
  "snowmobile": "/images/recycle/snowmobile.webp",
  "sofa": "/images/items/sofa.webp",
  "solo submarine": "/images/items/solo.submarine.webp",
  "stone node": "/images/items/stone.node.webp",
  "stone": "/images/recycle/stones.webp",
  "stones": "/images/recycle/stones.webp",
  "sulfur node": "/images/items/sulfur.node.webp",
  "sulfur ore": "/images/recycle/sulfur.ore.webp",
  "supermarket freezer": "/images/items/supermarket.freezer.webp",
  "supply drop": "/images/items/supply.drop.webp",
  "supply drop signal computer": "/images/recycle/computerstation.webp",
  "switch": "/images/items/switch.webp",
  "telephone": "/images/items/telephone.webp",
  "tier 2 components": "/images/items/tier.2.components.webp",
  "tier 3 components": "/images/items/tier.3.components.webp",
  "timer": "/images/items/timer.webp",
  "toilet": "/images/recycle/toilet.webp",
  "tools crate": "/images/items/tools.crate.webp",
  "underwater advanced crate": "/images/items/underwater.advanced.crate.webp",
  "underwater lab - ammunition crate": "/images/items/ammunition.crate.webp",
  "underwater lab - food crate 1": "/images/items/food.crate.webp",
  "underwater lab - food crate 2": "/images/items/foodbox.webp",
  "underwater lab - fuel crate": "/images/items/fuel.crate.webp",
  "underwater lab - normal crate 1": "/images/items/underwater.lab.crate.1.webp",
  "underwater lab - normal crate 2": "/images/items/underwater.lab.crate.2.webp",
  "underwater lab - tier 3 components": "/images/items/tier.3.components.webp",
  "underwater lab crate 1": "/images/items/underwater.lab.crate.1.webp",
  "underwater lab crate 2": "/images/items/underwater.lab.crate.2.webp",
  "underwater lab medical crate": "/images/items/medical.crate.webp",
  "underwater lab tools crate": "/images/items/tools.crate.webp",
  "vehicle parts advanced": "/images/items/vehicle.parts.advanced.webp",
  "vehicle parts": "/images/items/vehicle.parts.webp",
  "vending machine": "/images/items/vending.machine.webp",
  "workbench level 1": "/images/recycle/workbench1.webp",
  "workbench level 2": "/images/recycle/workbench2.webp",
  "workbench level 3": "/images/recycle/workbench3.webp",
  "yellow loot barrel": "/images/items/yellow.loot.barrel.webp"
};

export const getImagePath = (name: string): string | null => {
  const cleanName = name.replace(/\s*x\d+$/, '').replace(/\s*\(.*\)$/, '').toLowerCase();
  return IMAGE_MAP[cleanName] || null;
}

export const getDisplayName = (name: string): string => {
  const cleanName = name.replace(/\s*x\d+$/, '')
  return cleanName.toLowerCase() === 'green keycard' ? 'Green Keycard' :
         cleanName.toLowerCase() === 'blue keycard' ? 'Blue Keycard' :
         cleanName.toLowerCase() === 'red keycard' ? 'Red Keycard' :
         cleanName
}


export const TIER_FILTERS = [
  'All',
  'T1',
  'T2',
  'T3',
  'Safe Zone',
  'Resources',
  'Vendor',
  'Deep Sea',
  'Ocean',
] as const;

export type TierFilter = (typeof TIER_FILTERS)[number];

import { AbandonedSupermarketMonument } from './abandoned-supermarket';
import { AirfieldMonument } from './airfield';
import { GiantExcavatorPitMonument } from './giant-excavator-pit';
import { LaunchSiteMonument } from './launch-site';
import { MilitaryTunnelMonument } from './military-tunnel';
import { PowerPlantMonument } from './power-plant';
import { TrainYardMonument } from './train-yard';
import { WaterTreatmentPlantMonument } from './water-treatment-plant';
import { AbandonedMilitaryBaseMonument } from './abandoned-military-base';
import { ArcticResearchBaseMonument } from './arctic-research-base';
import { MissileSiloMonument } from './missile-silo';
import { SewerBranchMonument } from './sewer-branch';
import { TheDomeMonument } from './the-dome';
import { JungleRuinsMonument } from './jungle-ruins';
import { QuarriesMonument } from './quarries';
import { WaterWellsMonument } from './water-wells';
import { AbandonedCabinsMonument } from './abandoned-cabins';
import { JungleZigguratMonument } from './jungle-ziggurat';
import { JunkyardMonument } from './junkyard';
import { SatelliteDishMonument } from './satellite-dish';
import { BanditCampMonument } from './bandit-camp';
import { OutpostMonument } from './outpost';
import { ApartmentComplexMonument } from './apartment-complex';
import { FishingVillagesMonument } from './fishing-villages';
import { StablesMonument } from './stables';
import { FerryTerminalMonument } from './ferry-terminal';
import { HarborLargeMonument } from './harbor-large';
import { HarborSmallMonument } from './harbor-small';
import { LighthouseMonument } from './lighthouse';
import { LargeOilRigMonument } from './large-oil-rig';
import { OilRigMonument } from './oil-rig';
import { MiningOutpostMonument } from './mining-outpost';
import { OxumsGasStationMonument } from './oxums-gas-station';
import { UnderwaterLabMonument } from './underwater-lab';
import { RadTownMonument } from './rad-town';
import { FloatingCitiesMonument } from './floating-cities';
import { GhostShipsMonument } from './ghost-ships';
import { IslandsMonument } from './islands';

export const monumentsData = [
  AbandonedSupermarketMonument,
  AirfieldMonument,
  GiantExcavatorPitMonument,
  LaunchSiteMonument,
  MilitaryTunnelMonument,
  PowerPlantMonument,
  TrainYardMonument,
  WaterTreatmentPlantMonument,
  AbandonedMilitaryBaseMonument,
  ArcticResearchBaseMonument,
  MissileSiloMonument,
  SewerBranchMonument,
  TheDomeMonument,
  JungleRuinsMonument,
  QuarriesMonument,
  WaterWellsMonument,
  AbandonedCabinsMonument,
  JungleZigguratMonument,
  JunkyardMonument,
  SatelliteDishMonument,
  BanditCampMonument,
  OutpostMonument,
  ApartmentComplexMonument,
  FishingVillagesMonument,
  StablesMonument,
  FerryTerminalMonument,
  HarborLargeMonument,
  HarborSmallMonument,
  LighthouseMonument,
  LargeOilRigMonument,
  OilRigMonument,
  MiningOutpostMonument,
  OxumsGasStationMonument,
  UnderwaterLabMonument,
  RadTownMonument,
  FloatingCitiesMonument,
  GhostShipsMonument,
  IslandsMonument,
];
