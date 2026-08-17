export type MonumentCard = { type: string; name: string; logic: string; };
export type MonumentIcon = { name: string; count: number; };
export type Monument = {
    id: string;
    name: string;
    subtitle: string | null;
    tier: string;
    cardsNeeded: MonumentCard[];
    cardsFound: MonumentCard[];
    utilities: MonumentIcon[];
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
      respawn: string;
    }[];
    spawns?: {
      name: string;
      count?: number;
      respawn?: string;
      text?: string;
      variants?: { name: string; chance: string }[];
    }[];
    scientists?: {
      name: string;
      count?: number;
      respawn?: string;
    }[];
    puzzle?: {
      bring: { name: string; count: number }[];
      activate: { name: string; count: number }[];
      rewards: { name: string; count?: number; text?: string }[];
      resetTime: string;
    };
};
/**
 * Accepted values of the guide's `?tier=` search param, in the order the filter
 * buttons render. A literal tuple because nuqs's parseAsStringLiteral needs one
 * to narrow the parsed type, which also makes an unknown value in a hand-edited
 * URL fall back to "All".
 *
 * `Monument.tier` is a plain string, so this can't be checked at compile time —
 * every distinct `tier` in the data below must appear here or it becomes
 * unfilterable. Verified complete as of 2026-08-16.
 */

const IMAGE_MAP: Record<string, string> = {
  "recycler": "/images/items/recycler.png",
  "bike": "/images/recycle/motorbike.webp",
  "bicycle": "/images/recycle/motorbike.webp",
  "motorbike": "/images/recycle/motorbike.webp",
  "green keycard": "/images/items/green.keycard.png",
  "blue keycard": "/images/items/blue.keycard.png",
  "red keycard": "/images/items/red.keycard.png",
  "electric fuse": "/images/items/electric.fuse.webp",
  "switch": "/images/items/switch.webp",
  "military tunnel scientist": "/images/items/military.tunnel.scientist.png",
  "elite crate": "/images/items/elite.crate.webp",
  "military crate": "/images/items/military.crate.webp",
  "normal crate": "/images/items/normal.crate.webp",
  "basic crate": "/images/items/basic.crate.webp",
  "loot barrel": "/images/items/blue.loot.barrel.webp",
  "stone node": "/images/items/stone.node.webp",
  "roadsign": "/images/items/roadsign.webp",
  "research table": "/images/recycle/research.table.webp",
  "repair bench": "/images/recycle/box.repair.bench.webp",
  "oil refinery": "/images/items/oil.refinery.png",
  "diesel barrel": "/images/items/diesel.barrel.png",
  "diesel fuel": "/images/diesel_barrel.png",
  "blueprint fragments": "/images/recycle/basicblueprintfragment.webp",
  "advanced blueprint fragments": "/images/recycle/advancedblueprintfragment.webp",
  "advanced blueprint fragment": "/images/recycle/advancedblueprintfragment.webp",
  "bradley apc": "/images/items/bradley.apc.png",
  "hobo barrel": "/images/items/hobo.barrel.webp",
  "toilet": "/images/recycle/toilet.webp",
  "elevator": "/images/recycle/elevator.webp",
  "timer": "/images/items/timer.webp",
  "pump jack": "/images/recycle/mining.pumpjack.webp",
  "mlrs": "/images/recycle/mlrs.webp",
  "snowmobile": "/images/recycle/snowmobile.webp",
  "mining quarry": "/images/items/mining.quarry.webp",
  "vending machine": "/images/items/vending.machine.webp",
  "modular car lift": "/images/recycle/modularcarlift.webp",
  "workbench level 1": "/images/recycle/workbench1.webp",
  "workbench level 2": "/images/recycle/workbench2.webp",
  "workbench level 3": "/images/recycle/workbench3.webp",
  "attack helicopter": "/images/items/attack.helicopter.png",
  "scrap transport helicopter": "/images/recycle/scrap.transport.helicopter.webp",
  "minicopter": "/images/items/minicopter.png",
  "hot air balloon": "/images/items/hot.air.balloon.png",
  "barbecue": "/images/items/barbecue.png",
  "motor rowboat": "/images/items/motor.rowboat.png",
  "rhib": "/images/items/rhib.png",
  "patrol boat": "/images/rhib.png",
  "solo submarine": "/images/items/solo.submarine.webp",
  "duo submarine": "/images/items/duo.submarine.webp",
  "ridable horse": "/images/items/ridable.horse.png",
  "computer station": "/images/recycle/computerstation.webp",
  "ammunition crate": "/images/items/ammunition.crate.webp",
  "bbq": "/images/items/bbq.png",
  "blue loot barrel": "/images/items/blue.loot.barrel.webp",
  "diesel_barrel": "/images/items/diesel_barrel.png",
  "food crate": "/images/items/food.crate.webp",
  "foodbox": "/images/items/foodbox.webp",
  "fuel crate": "/images/items/fuel.crate.webp",
  "horse": "/images/items/horse.png",
  "locked crate": "/images/items/locked.crate.webp",
  "medical crate": "/images/items/medical.crate.webp",
  "metal node": "/images/items/metal.node.webp",
  "minecart": "/images/items/minecart.webp",
  "normal crate food": "/images/items/normal.crate.food.webp",
  "normal crate medical": "/images/items/normal.crate.medical.webp",
  "normal crate - cave": "/images/thumbnails/radtown-crate-mine.webp",
  "oil barrel": "/images/items/oil.barrel.webp",
  "road signs": "/images/items/road.signs.webp",
  "rowboat": "/images/items/rowboat.png",
  "satellite crate": "/images/items/satellite.crate.webp",
  "scientist drybox": "/images/items/scientist.drybox.webp",
  "scientist": "/images/items/scientist.png",
  "airfield scientist": "/images/thumbnails/airfield-scientist.webp",
  "small oil refinery": "/images/items/small.oil.refinery.png",
  "sulfur node": "/images/items/sulfur.node.webp",
  "supermarket freezer": "/images/items/supermarket.freezer.webp",
  "supply drop": "/images/items/supply.drop.webp",
  "sofa": "/images/thumbnails/sofa.webp",
  "telephone": "/images/thumbnails/telephone.webp",
  "basic blueprint fragment": "/images/recycle/basicblueprintfragment.webp",
  "underwater lab - normal crate 1": "/images/thumbnails/radtown-underwater-labs-crate-normal.webp",
  "underwater lab - normal crate 2": "/images/thumbnails/radtown-underwater-labs-crate-normal-2.webp",
  "underwater lab - tier 3 components": "/images/thumbnails/radtown-underwater-labs-tech-parts-2.webp",
  "underwater lab - ammunition crate": "/images/thumbnails/radtown-underwater-labs-crate-ammunition.webp",
  "underwater lab - food crate 1": "/images/thumbnails/radtown-underwater-labs-crate-food-1.webp",
  "underwater lab - fuel crate": "/images/thumbnails/radtown-underwater-labs-crate-fuel.webp",
  "arctic research base scientist": "/images/thumbnails/arctic-research-base-scientist.webp",
  "tier 2 components": "/images/items/tier.2.components.webp",
  "tier 3 components": "/images/items/tier.3.components.webp",
  "tools crate": "/images/items/tools.crate.webp",
  "underwater advanced crate": "/images/items/underwater.advanced.crate.webp",
  "underwater lab crate 1": "/images/items/underwater.lab.crate.1.webp",
  "underwater lab medical crate": "/images/items/underwater.lab.crate.1.webp",
  "underwater lab tools crate": "/images/items/underwater.advanced.crate.webp",
  "underwater lab crate 2": "/images/items/underwater.lab.crate.2.webp",
  "vehicle parts advanced": "/images/items/vehicle.parts.advanced.webp",
  "vehicle parts": "/images/items/vehicle.parts.webp",
  "yellow loot barrel": "/images/items/yellow.loot.barrel.webp",
  "sulfur ore": "/images/recycle/sulfur.ore.webp",
  "metal ore": "/images/recycle/metal.ore.webp",
  "high quality metal ore": "/images/recycle/hq.metal.ore.webp",
  "hqm ore": "/images/recycle/hq.metal.ore.webp",
  "stones": "/images/recycle/stones.webp",
  "stone": "/images/recycle/stones.webp",
  "portable boom box": "/images/recycle/fun.boomboxportable.webp"
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

export const monumentsData: Monument[] = [
  {
    "id": "01",
    "name": "Abandoned Supermarket",
    "puzzle": undefined,
    "subtitle": null,
    "tier": "T1/T2/T3",
    "cardsNeeded": [],
    "cardsFound": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      }
    ],
    "utilities": [
      {
        "name": "Light Switch",
        "count": 2
      },
      {
        "name": "Zipline Target Point",
        "count": 2
      },
      {
        "name": "Telephone",
        "count": 1
      },
      {
        "name": "Hobo Barrel",
        "count": 1
      },
      {
        "name": "Recycler",
        "count": 1
      }
    ],
    "collectibles": [
      {
        "name": "Green keycard",
        "count": 1,
        "respawn": "Never / Puzzle"
      }
    ],
    "vehicles": [
      {
        "name": "Bicycle",
        "count": 1,
        "respawn": "Never / Puzzle"
      },
      {
        "name": "Motorbike",
        "count": 1,
        "respawn": "Never / Puzzle"
      }
    ],
    "cctv": "",
    "bpFrags": [],
    "advBp": [],
    "guide": undefined,
    "features": {
      "isSafezone": false,
      "hasTunnelEntrance": false,
      "hasChinookDropZone": false,
      "allowsPatrolHeliCrash": true,
      "scientists": 0,
      "radiation": {
        "median": 0,
        "max": 0
      }
    },
    "spawns": [
      {
        "name": "Crate (Random)",
        "count": 5,
        "respawn": "30-36m",
        "variants": [
          { "name": "Basic Crate", "chance": "50%" },
          { "name": "Normal Crate", "chance": "45%" },
          { "name": "Military Crate", "chance": "5%" }
        ]
      },
      {
        "name": "Crate (Random)",
        "count": 5,
        "respawn": "30-36m",
        "variants": [
          { "name": "Normal Crate", "chance": "95%" },
          { "name": "Military Crate", "chance": "5%" }
        ]
      },
      {
        "name": "Crate (Random)",
        "count": 5,
        "respawn": "30-36m",
        "variants": [
          { "name": "Normal Crate", "chance": "90%" },
          { "name": "Military Crate", "chance": "10%" }
        ]
      },
      {
        "name": "Foodbox",
        "count": 5,
        "respawn": "30-36m"
      },
      {
        "name": "Loot Barrel (Random)",
        "count": 3,
        "respawn": "30-36m",
        "variants": [
          { "name": "Yellow Loot Barrel", "chance": "50%" },
          { "name": "Blue Loot Barrel", "chance": "50%" }
        ]
      },
      {
        "name": "Vehicle Parts",
        "count": 2,
        "respawn": "30-36m"
      },
      {
        "name": "Military Crate",
        "count": 1,
        "respawn": "Never / Puzzle"
      }
    ],
    "lootDetails": {
      "militaryCrates": 0,
      "regularCrates": 0,
      "basicCrates": 0,
      "barrels": 0
    }
  },
  {
    "id": "airfield",
    "name": "Airfield",
    "subtitle": null,
    "tier": "2",
    "features": {
      "isSafezone": false,
      "hasTunnelEntrance": true,
      "hasChinookDropZone": true,
      "allowsPatrolHeliCrash": true,
      "scientists": 3,
      "radiation": {
        "median": 11,
        "max": 11
      }
    },
    "lootDetails": {
      "militaryCrates": 0,
      "regularCrates": 0,
      "basicCrates": 0,
      "barrels": 0
    },
    "spawns": [
      {
        "name": "Crate (Random)",
        "variants": [
          { "name": "Normal Crate", "chance": "60%" },
          { "name": "Military Crate", "chance": "40%" }
        ],
        "count": 18,
        "respawn": "30-36m"
      },
      {
        "name": "Crate (Random)",
        "variants": [
          { "name": "Normal Crate", "chance": "60%" },
          { "name": "Military Crate", "chance": "40%" }
        ],
        "count": 8,
        "respawn": "Never / Puzzle"
      },
      {
        "name": "Oil Barrel",
        "count": 6,
        "respawn": "15-20m"
      },
      {
        "name": "Loot Barrel (Random)",
        "variants": [
          { "name": "Yellow Loot Barrel", "chance": "50%" },
          { "name": "Blue Loot Barrel", "chance": "50%" }
        ],
        "count": 5,
        "respawn": "15-20m"
      },
      {
        "name": "Normal Crate - Cave",
        "count": 3,
        "respawn": "30-36m"
      },
      {
        "name": "Node (Random)",
        "variants": [
          { "name": "Stone Node", "chance": "45.5%" },
          { "name": "Metal Node", "chance": "27.3%" },
          { "name": "Sulfur Node", "chance": "27.3%" }
        ],
        "count": 5,
        "respawn": "30-36m"
      }
    ],
    "scientists": [
      {
        "name": "Airfield Scientist",
        "count": 3,
        "respawn": "Never / Puzzle"
      }
    ],
    "collectibles": [
      {
        "name": "Diesel Fuel",
        "count": 3,
        "respawn": "Never / Puzzle"
      },
      {
        "name": "Basic Blueprint Fragment",
        "count": 2,
        "respawn": "Never / Puzzle"
      },
      {
        "name": "Red Keycard",
        "count": 1,
        "respawn": "Never / Puzzle"
      }
    ],
    "vehicles": [
      {
        "name": "Motorbike",
        "count": 3,
        "respawn": "Never / Puzzle"
      }
    ],
    "utilities": [
      { "name": "Light Switch", "count": 16 },
      { "name": "Heat Source", "count": 5 },
      { "name": "Zipline Target Point", "count": 4 },
      { "name": "Sofa", "count": 3 },
      { "name": "Green Recycler", "count": 2 },
      { "name": "Telephone", "count": 1 },
      { "name": "Repair Bench", "count": 1 },
      { "name": "Research Table", "count": 1 },
      { "name": "Small Oil Refinery", "count": 1 },
      { "name": "Elevator", "count": 1 }
    ],
    "cctv": "AIRFIELDHELIPAD",
    "puzzle": {
      "bring": [
        { "name": "Electric Fuse", "count": 2 },
        { "name": "Green Keycard", "count": 1 },
        { "name": "Blue Keycard", "count": 1 }
      ],
      "activate": [
        { "name": "Timer", "count": 1 }
      ],
      "rewards": [
        { "name": "Airfield Scientist", "count": 3 },
        { "name": "Red Keycard", "count": 1 },
        { "name": "Basic Blueprint Fragment", "count": 2 },
        { "name": "Diesel Fuel", "count": 3 },
        { "name": "Normal Crate", "count": 7 },
        { "name": "Yellow Loot Barrel", "count": 1 }
      ],
      "resetTime": "~30m"
    },
    "cardsNeeded": [],
    "cardsFound": [],
    "bpFrags": [],
    "advBp": []
  },
  {
    "id": "03",
    "name": "Giant Excavator Pit",
    "puzzle": {
      "bring": [
        { "name": "Green keycard", "count": 1 },
        { "name": "Electric Fuse", "count": 1 }
      ],
      "activate": [
        { "name": "Switch", "count": 1 }
      ],
      "rewards": [
        { "name": "Military Tunnel Scientist", "count": 11 },
        { "name": "Elite Crate", "count": 3 }
      ],
      "resetTime": "~30m"
    },
    "subtitle": null,
    "tier": "Resources",
    "cardsNeeded": [],
    "cardsFound": [],
    "utilities": [
      {
        "name": "Recycler",
        "count": 1
      }
    ],
    "vehicles": [],
    "cctv": "",
    "bpFrags": [],
    "advBp": [],
    "guide": "https://youtu.be/H7eMgAUkR-U?si=YeRhSWSGFhDL-F3M",
    "features": {
      "isSafezone": false,
      "hasTunnelEntrance": false,
      "hasChinookDropZone": false,
      "allowsPatrolHeliCrash": true,
      "scientists": 0,
      "radiation": {
        "median": 0,
        "max": 0
      }
    },
    "lootDetails": {
      "militaryCrates": 0,
      "regularCrates": 0,
      "basicCrates": 0,
      "barrels": 0
    }
  },
  {
    "id": "04",
    "name": "Launch Site",
    "puzzle": {
      "bring": [
        { "name": "Green keycard", "count": 1 },
        { "name": "Electric Fuse", "count": 1 }
      ],
      "activate": [
        { "name": "Switch", "count": 1 }
      ],
      "rewards": [
        { "name": "Military Tunnel Scientist", "count": 11 },
        { "name": "Elite Crate", "count": 3 }
      ],
      "resetTime": "~30m"
    },
    "subtitle": null,
    "tier": "T3",
    "cardsNeeded": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      },
      {
        "type": "red",
        "name": "red keycard",
        "logic": ""
      }
    ],
    "cardsFound": [],
    "utilities": [
      {
        "name": "Recycler",
        "count": 1
      },
      {
        "name": "Research Table",
        "count": 1
      },
      {
        "name": "Repair Bench",
        "count": 1
      },
      {
        "name": "Oil Refinery",
        "count": 1
      }
    ],
    "vehicles": [
      {
        "name": "Bradley APC",
        "count": 1
      }
    ],
    "cctv": "",
    "bpFrags": [],
    "advBp": [
      {
        "name": "Advanced blueprint fragments",
        "count": 2
      }
    ],
    "guide": "https://youtu.be/AGtTjNOAE0s?si=CNFNSS3eoGrB1B5Y",
    "features": {
      "isSafezone": false,
      "hasTunnelEntrance": false,
      "hasChinookDropZone": false,
      "allowsPatrolHeliCrash": true,
      "scientists": 0,
      "radiation": {
        "median": 0,
        "max": 0
      }
    },
    "lootDetails": {
      "militaryCrates": 0,
      "regularCrates": 0,
      "basicCrates": 0,
      "barrels": 0
    }
  },
  {
      "id": "05",
      "name": "Military Tunnel",
      "puzzle": {
          "bring": [
              {
                  "name": "Electric Fuse",
                  "count": 1
              },
              {
                  "name": "Green keycard",
                  "count": 1
              },
              {
                  "name": "Blue keycard",
                  "count": 1
              },
              {
                  "name": "Red keycard",
                  "count": 1
              }
          ],
          "activate": [
              {
                  "name": "Timer",
                  "count": 2
              },
              {
                  "name": "Switch",
                  "count": 1
              }
          ],
          "rewards": [
              {
                  "name": "Military Tunnel Scientist",
                  "count": 11
              },
              {
                  "name": "Advanced Blueprint Fragment",
                  "count": 2
              },
              {
                  "name": "Diesel Fuel",
                  "count": 2
              },
              {
                  "name": "Elite Crate",
                  "count": 3
              },
              {
                  "name": "Military Crate",
                  "text": "50%",
                  "count": 5
              },
              {
                  "name": "Normal Crate",
                  "text": "50%",
                  "count": 5
              }
          ],
          "resetTime": "~30m"
      },
      "subtitle": null,
      "tier": "T3",
      "cardsNeeded": [],
      "cardsFound": [],
      "utilities": [
          {
              "name": "Hobo Barrel",
              "count": 2
          },
          {
              "name": "Toilet",
              "count": 1
          },
          {
              "name": "Elevator",
              "count": 1
          },
          {
              "name": "Recycler",
              "count": 1
          }
      ],
      "vehicles": [],
      "spawns": [
          {
              "name": "Stone Node",
              "count": 7,
              "respawn": "30-36m",
              "text": "45% / Metal 27% / Sulfur 27%"
          },
          {
              "name": "Roadsign",
              "count": 4,
              "respawn": "Never / Puzzle"
          }
      ],
      "collectibles": [
          {
              "name": "Diesel Fuel",
              "count": 3,
              "respawn": "Never / Puzzle"
          },
          {
              "name": "Advanced Blueprint Fragment",
              "count": 2,
              "respawn": "Never / Puzzle"
          }
      ],
      "guide": "",
      "cctv": "",
      "bpFrags": [],
      "advBp": [],
      "features": {
          "isSafezone": false,
          "hasTunnelEntrance": true,
          "hasChinookDropZone": false,
          "allowsPatrolHeliCrash": true,
          "scientists": 33,
          "radiation": {
              "median": 11,
              "max": 26
          }
      },
      "lootDetails": {
          "eliteCrates": 6,
          "militaryCrates": 10,
          "regularCrates": 2,
          "basicCrates": 0,
          "barrels": 14
      }
  },
  {
    "id": "06",
    "name": "Power Plant",
    "puzzle": {
      "bring": [
        { "name": "Green keycard", "count": 1 },
        { "name": "Electric Fuse", "count": 1 }
      ],
      "activate": [
        { "name": "Switch", "count": 1 }
      ],
      "rewards": [
        { "name": "Military Tunnel Scientist", "count": 11 },
        { "name": "Elite Crate", "count": 3 }
      ],
      "resetTime": "~30m"
    },
    "subtitle": null,
    "tier": "T2",
    "cardsNeeded": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      },
      {
        "type": "blue",
        "name": "blue keycard",
        "logic": ""
      }
    ],
    "cardsFound": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      },
      {
        "type": "red",
        "name": "red keycard",
        "logic": ""
      }
    ],
    "utilities": [
      {
        "name": "Recycler x3",
        "count": 3
      },
      {
        "name": "Research Table",
        "count": 1
      },
      {
        "name": "Repair Bench",
        "count": 1
      },
      {
        "name": "Oil Refinery x2",
        "count": 2
      },
      {
        "name": "Pump Jack",
        "count": 1
      },
      {
        "name": "Diesel Barrel x3",
        "count": 3
      }
    ],
    "vehicles": [],
    "cctv": "",
    "bpFrags": [
      {
        "name": "Blueprint fragments",
        "count": 3
      }
    ],
    "advBp": [],
    "guide": "https://youtu.be/FzJb9Vf_OGc?si=kPB1HnCRUxZmjRVf",
    "features": {
      "isSafezone": false,
      "hasTunnelEntrance": false,
      "hasChinookDropZone": false,
      "allowsPatrolHeliCrash": true,
      "scientists": 0,
      "radiation": {
        "median": 0,
        "max": 0
      }
    },
    "lootDetails": {
      "militaryCrates": 0,
      "regularCrates": 0,
      "basicCrates": 0,
      "barrels": 0
    }
  },
  {
    "id": "07",
    "name": "Train Yard",
    "puzzle": {
      "bring": [
        { "name": "Green keycard", "count": 1 },
        { "name": "Electric Fuse", "count": 1 }
      ],
      "activate": [
        { "name": "Switch", "count": 1 }
      ],
      "rewards": [
        { "name": "Military Tunnel Scientist", "count": 11 },
        { "name": "Elite Crate", "count": 3 }
      ],
      "resetTime": "~30m"
    },
    "subtitle": null,
    "tier": "T2",
    "cardsNeeded": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      },
      {
        "type": "blue",
        "name": "blue keycard",
        "logic": ""
      }
    ],
    "cardsFound": [
      {
        "type": "red",
        "name": "red keycard",
        "logic": ""
      }
    ],
    "utilities": [
      {
        "name": "Recycler",
        "count": 1
      },
      {
        "name": "Repair Bench",
        "count": 1
      },
      {
        "name": "Oil Refinery x2",
        "count": 2
      },
      {
        "name": "Pump Jack",
        "count": 1
      },
      {
        "name": "Diesel Barrel x3",
        "count": 3
      }
    ],
    "vehicles": [
      {
        "name": "Bike",
        "count": 1
      }
    ],
    "cctv": "",
    "bpFrags": [
      {
        "name": "Blueprint fragments",
        "count": 3
      }
    ],
    "advBp": [],
    "guide": "https://youtu.be/a30ETOIV4Ss?si=wZTBmv0QNjo_I-i8",
    "features": {
      "isSafezone": false,
      "hasTunnelEntrance": false,
      "hasChinookDropZone": false,
      "allowsPatrolHeliCrash": true,
      "scientists": 0,
      "radiation": {
        "median": 0,
        "max": 0
      }
    },
    "lootDetails": {
      "militaryCrates": 0,
      "regularCrates": 0,
      "basicCrates": 0,
      "barrels": 0
    }
  },
  {
    "id": "08",
    "name": "Water Treatment Plant",
    "puzzle": {
      "bring": [
        { "name": "Green keycard", "count": 1 },
        { "name": "Electric Fuse", "count": 1 }
      ],
      "activate": [
        { "name": "Switch", "count": 1 }
      ],
      "rewards": [
        { "name": "Military Tunnel Scientist", "count": 11 },
        { "name": "Elite Crate", "count": 3 }
      ],
      "resetTime": "~30m"
    },
    "subtitle": null,
    "tier": "T2",
    "cardsNeeded": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      },
      {
        "type": "blue",
        "name": "blue keycard",
        "logic": ""
      }
    ],
    "cardsFound": [
      {
        "type": "red",
        "name": "red keycard",
        "logic": ""
      }
    ],
    "utilities": [
      {
        "name": "Recycler",
        "count": 1
      },
      {
        "name": "Repair Bench",
        "count": 1
      },
      {
        "name": "Oil Refinery x2",
        "count": 2
      },
      {
        "name": "Pump Jack",
        "count": 1
      },
      {
        "name": "Diesel Barrel x3",
        "count": 3
      }
    ],
    "vehicles": [
      {
        "name": "Bike",
        "count": 1
      }
    ],
    "cctv": "",
    "bpFrags": [
      {
        "name": "Blueprint fragments",
        "count": 3
      }
    ],
    "advBp": [],
    "guide": "https://youtu.be/GLZaepYwJdo?si=VPfsU_4HwoqJ7-m1",
    "features": {
      "isSafezone": false,
      "hasTunnelEntrance": false,
      "hasChinookDropZone": false,
      "allowsPatrolHeliCrash": true,
      "scientists": 0,
      "radiation": {
        "median": 0,
        "max": 0
      }
    },
    "lootDetails": {
      "militaryCrates": 0,
      "regularCrates": 0,
      "basicCrates": 0,
      "barrels": 0
    }
  },
  {
    "id": "09",
    "name": "Abandoned Military Base",
    "puzzle": undefined,
    "subtitle": null,
    "tier": "T1/T2/T3",
    "cardsNeeded": [],
    "cardsFound": [],
    "utilities": [
      {
        "name": "Portable Boom Box",
        "count": 1
      }
    ],
    "vehicles": [
      {
        "name": "MLRS",
        "count": 1
      }
    ],
    "cctv": "COMPOUND****",
    "bpFrags": [],
    "advBp": [],
    "guide": undefined,
    "features": {
      "isSafezone": false,
      "hasTunnelEntrance": false,
      "hasChinookDropZone": false,
      "allowsPatrolHeliCrash": false,
      "scientists": 6,
      "radiation": {
        "median": 0,
        "max": 0
      }
    },
    "spawns": [
      {
        "name": "Crate (Random)",
        "count": 7,
        "respawn": "20-30m",
        "variants": [
          { "name": "Normal Crate", "chance": "60%" },
          { "name": "Military Crate", "chance": "40%" }
        ]
      },
      {
        "name": "Food Crate (Random)",
        "count": 4,
        "respawn": "20-30m",
        "variants": [
          { "name": "Underwater Lab Crate 1", "chance": "50%" },
          { "name": "Underwater Lab Crate 2", "chance": "50%" }
        ]
      },
      {
        "name": "Oil Barrel",
        "count": 2,
        "respawn": "20-30m"
      },
      {
        "name": "Underwater Lab Medical Crate",
        "count": 1,
        "respawn": "20-30m"
      },
      {
        "name": "Underwater Lab Tools Crate",
        "count": 1,
        "respawn": "20-30m"
      }
    ],
    "lootDetails": {
      "militaryCrates": 0,
      "regularCrates": 0,
      "basicCrates": 0,
      "barrels": 0
    }
  },
  {
    "id": "arctic-research-base",
    "name": "Arctic Research Base",
    "subtitle": null,
    "tier": "1/2/3",
    "features": {
      "isSafezone": false,
      "hasTunnelEntrance": false,
      "hasChinookDropZone": false,
      "allowsPatrolHeliCrash": true,
      "scientists": 10,
      "radiation": {
        "median": 3,
        "max": 11
      }
    },
    "lootDetails": {
      "militaryCrates": 0,
      "regularCrates": 0,
      "basicCrates": 0,
      "barrels": 0
    },
    "spawns": [
      {
        "name": "Loot Barrel (Random)",
        "variants": [
          { "name": "Blue Loot Barrel", "chance": "60%" },
          { "name": "Yellow Loot Barrel", "chance": "40%" }
        ],
        "count": 14,
        "respawn": "Never / Puzzle"
      },
      {
        "name": "Underwater Lab Crate (Random)",
        "variants": [
          { "name": "Underwater Lab - Normal Crate 1", "chance": "50%" },
          { "name": "Underwater Lab - Normal Crate 2", "chance": "50%" }
        ],
        "count": 6,
        "respawn": "Never / Puzzle"
      },
      {
        "name": "Loot Barrel (Random)",
        "variants": [
          { "name": "Yellow Loot Barrel", "chance": "50%" },
          { "name": "Blue Loot Barrel", "chance": "50%" }
        ],
        "count": 5,
        "respawn": "Never / Puzzle"
      },
      {
        "name": "Barrel (Random)",
        "variants": [
          { "name": "Oil Barrel", "chance": "88.2%" },
          { "name": "Yellow Loot Barrel", "chance": "5.9%" },
          { "name": "Blue Loot Barrel", "chance": "5.9%" }
        ],
        "count": 5,
        "respawn": "Never / Puzzle"
      },
      {
        "name": "Underwater Lab Tech/Ammo (Random)",
        "variants": [
          { "name": "Underwater Lab - Tier 3 Components", "chance": "50%" },
          { "name": "Underwater Lab - Ammunition Crate", "chance": "50%" }
        ],
        "count": 5,
        "respawn": "Never / Puzzle"
      },
      {
        "name": "Underwater Lab - Food Crate 1",
        "count": 4,
        "respawn": "Never / Puzzle"
      },
      {
        "name": "Underwater Lab - Fuel Crate",
        "count": 4,
        "respawn": "Never / Puzzle"
      },
      {
        "name": "Crate (Random)",
        "variants": [
          { "name": "Normal Crate", "chance": "50%" },
          { "name": "Military Crate", "chance": "50%" }
        ],
        "count": 4,
        "respawn": "Never / Puzzle"
      }
    ],
    "scientists": [
      {
        "name": "Arctic Research Base Scientist",
        "count": 10,
        "respawn": "Never / Puzzle"
      }
    ],
    "collectibles": [
      {
        "name": "Basic Blueprint Fragment",
        "count": 2,
        "respawn": "Never / Puzzle"
      },
      {
        "name": "Red Keycard",
        "count": 1,
        "respawn": "Never / Puzzle"
      }
    ],
    "vehicles": [
      {
        "name": "Snowmobile",
        "count": 1,
        "respawn": "Never / Puzzle"
      }
    ],
    "utilities": [
      { "name": "Heat Source", "count": 25 },
      { "name": "Light Switch", "count": 11 },
      { "name": "Zipline Target Point", "count": 2 },
      { "name": "Sofa", "count": 1 },
      { "name": "Toilet", "count": 1 },
      { "name": "Green Recycler", "count": 1 }
    ],
    "cctv": "",
    "puzzle": {
      "bring": [
        { "name": "Blue Keycard", "count": 2 }
      ],
      "activate": [],
      "rewards": [
        { "name": "Red Keycard", "count": 1 },
        { "name": "Basic Blueprint Fragment", "count": 2 },
        { "name": "Military Crate / Normal Crate", "count": 4 },
        { "name": "Snowmobile", "count": 1 }
      ],
      "resetTime": "~30m / ~0m"
    },
    "cardsNeeded": [],
    "cardsFound": [],
    "bpFrags": [],
    "advBp": []
  },
  {
    "id": "11",
    "name": "Missile Silo",
    "puzzle": {
      "bring": [
        { "name": "Green keycard", "count": 1 },
        { "name": "Electric Fuse", "count": 1 }
      ],
      "activate": [
        { "name": "Switch", "count": 1 }
      ],
      "rewards": [
        { "name": "Military Tunnel Scientist", "count": 11 },
        { "name": "Elite Crate", "count": 3 }
      ],
      "resetTime": "~30m"
    },
    "subtitle": null,
    "tier": "T3",
    "cardsNeeded": [
      {
        "type": "red",
        "name": "red keycard",
        "logic": ""
      }
    ],
    "cardsFound": [],
    "utilities": [
      {
        "name": "Diesel Barrel x2",
        "count": 2
      }
    ],
    "vehicles": [],
    "cctv": "/rust/camera-codes#missile-silo",
    "bpFrags": [],
    "advBp": [
      {
        "name": "Advanced blueprint fragments",
        "count": 2
      }
    ],
    "guide": "https://youtu.be/lUPephY1j8U?si=wdM8CwrEuMfSLm_8",
    "features": {
      "isSafezone": false,
      "hasTunnelEntrance": false,
      "hasChinookDropZone": false,
      "allowsPatrolHeliCrash": true,
      "scientists": 0,
      "radiation": {
        "median": 0,
        "max": 0
      }
    },
    "lootDetails": {
      "militaryCrates": 0,
      "regularCrates": 0,
      "basicCrates": 0,
      "barrels": 0
    }
  },
  {
    "id": "12",
    "name": "Sewer Branch",
    "puzzle": {
      "bring": [
        { "name": "Green keycard", "count": 1 },
        { "name": "Electric Fuse", "count": 1 }
      ],
      "activate": [
        { "name": "Switch", "count": 1 }
      ],
      "rewards": [
        { "name": "Military Tunnel Scientist", "count": 11 },
        { "name": "Elite Crate", "count": 3 }
      ],
      "resetTime": "~30m"
    },
    "subtitle": null,
    "tier": "T2",
    "cardsNeeded": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      }
    ],
    "cardsFound": [
      {
        "type": "blue",
        "name": "blue keycard",
        "logic": ""
      }
    ],
    "utilities": [
      {
        "name": "Recycler x2",
        "count": 2
      },
      {
        "name": "Oil Refinery x2",
        "count": 2
      }
    ],
    "vehicles": [],
    "cctv": "",
    "bpFrags": [
      {
        "name": "Blueprint fragments",
        "count": 2
      }
    ],
    "advBp": [],
    "guide": "https://youtu.be/FICzFsiiA5k?si=NbnwFjPp4qBeA2Bn",
    "features": {
      "isSafezone": false,
      "hasTunnelEntrance": false,
      "hasChinookDropZone": false,
      "allowsPatrolHeliCrash": true,
      "scientists": 0,
      "radiation": {
        "median": 0,
        "max": 0
      }
    },
    "lootDetails": {
      "militaryCrates": 0,
      "regularCrates": 0,
      "basicCrates": 0,
      "barrels": 0
    }
  },
  {
    "id": "13",
    "name": "The Dome",
    "puzzle": {
      "bring": [
        { "name": "Green keycard", "count": 1 },
        { "name": "Electric Fuse", "count": 1 }
      ],
      "activate": [
        { "name": "Switch", "count": 1 }
      ],
      "rewards": [
        { "name": "Military Tunnel Scientist", "count": 11 },
        { "name": "Elite Crate", "count": 3 }
      ],
      "resetTime": "~30m"
    },
    "subtitle": null,
    "tier": "T2",
    "cardsNeeded": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      }
    ],
    "cardsFound": [
      {
        "type": "blue",
        "name": "blue keycard",
        "logic": ""
      }
    ],
    "utilities": [
      {
        "name": "Recycler",
        "count": 1
      },
      {
        "name": "Oil Refinery x2",
        "count": 2
      },
      {
        "name": "Diesel Barrel x2",
        "count": 2
      }
    ],
    "vehicles": [
      {
        "name": "Bike",
        "count": 1
      }
    ],
    "cctv": "/rust/camera-codes#the-dome",
    "bpFrags": [
      {
        "name": "Blueprint fragments",
        "count": 1
      }
    ],
    "advBp": [],
    "guide": "https://youtu.be/81X1T1mbJxc?si=i3bB81LJ414aTELb",
    "features": {
      "isSafezone": false,
      "hasTunnelEntrance": false,
      "hasChinookDropZone": false,
      "allowsPatrolHeliCrash": true,
      "scientists": 0,
      "radiation": {
        "median": 0,
        "max": 0
      }
    },
    "lootDetails": {
      "militaryCrates": 0,
      "regularCrates": 0,
      "basicCrates": 0,
      "barrels": 0
    }
  },
  {
    "id": "14",
    "name": "Jungle Ruins",
    "puzzle": {
      "bring": [
        { "name": "Green keycard", "count": 1 },
        { "name": "Electric Fuse", "count": 1 }
      ],
      "activate": [
        { "name": "Switch", "count": 1 }
      ],
      "rewards": [
        { "name": "Military Tunnel Scientist", "count": 11 },
        { "name": "Elite Crate", "count": 3 }
      ],
      "resetTime": "~30m"
    },
    "subtitle": null,
    "tier": "T1",
    "cardsNeeded": [],
    "cardsFound": [],
    "utilities": [],
    "vehicles": [],
    "cctv": "",
    "bpFrags": [],
    "advBp": [],
    "guide": "",
    "features": {
      "isSafezone": false,
      "hasTunnelEntrance": false,
      "hasChinookDropZone": false,
      "allowsPatrolHeliCrash": true,
      "scientists": 0,
      "radiation": {
        "median": 0,
        "max": 0
      }
    },
    "lootDetails": {
      "militaryCrates": 0,
      "regularCrates": 0,
      "basicCrates": 0,
      "barrels": 0
    }
  },
  {
    "id": "15",
    "name": "Quarries",
    "puzzle": {
      "bring": [
        { "name": "Green keycard", "count": 1 },
        { "name": "Electric Fuse", "count": 1 }
      ],
      "activate": [
        { "name": "Switch", "count": 1 }
      ],
      "rewards": [
        { "name": "Military Tunnel Scientist", "count": 11 },
        { "name": "Elite Crate", "count": 3 }
      ],
      "resetTime": "~30m"
    },
    "subtitle": null,
    "tier": "Resources",
    "cardsNeeded": [],
    "cardsFound": [],
    "utilities": [
      {
        "name": "Mining Quarry",
        "count": 1
      }
    ],
    "vehicles": [],
    "cctv": "",
    "bpFrags": [],
    "advBp": [],
    "guide": "",
    "features": {
      "isSafezone": false,
      "hasTunnelEntrance": false,
      "hasChinookDropZone": false,
      "allowsPatrolHeliCrash": true,
      "scientists": 0,
      "radiation": {
        "median": 0,
        "max": 0
      }
    },
    "lootDetails": {
      "militaryCrates": 0,
      "regularCrates": 0,
      "basicCrates": 0,
      "barrels": 0
    }
  },
  {
    "id": "16",
    "name": "Water Wells",
    "puzzle": {
      "bring": [
        { "name": "Green keycard", "count": 1 },
        { "name": "Electric Fuse", "count": 1 }
      ],
      "activate": [
        { "name": "Switch", "count": 1 }
      ],
      "rewards": [
        { "name": "Military Tunnel Scientist", "count": 11 },
        { "name": "Elite Crate", "count": 3 }
      ],
      "resetTime": "~30m"
    },
    "subtitle": null,
    "tier": "Vendor",
    "cardsNeeded": [],
    "cardsFound": [],
    "utilities": [
      {
        "name": "Vending Machine",
        "count": 1
      }
    ],
    "vehicles": [],
    "cctv": "",
    "bpFrags": [],
    "advBp": [],
    "guide": "",
    "features": {
      "isSafezone": false,
      "hasTunnelEntrance": false,
      "hasChinookDropZone": false,
      "allowsPatrolHeliCrash": true,
      "scientists": 0,
      "radiation": {
        "median": 0,
        "max": 0
      }
    },
    "lootDetails": {
      "militaryCrates": 0,
      "regularCrates": 0,
      "basicCrates": 0,
      "barrels": 0
    }
  },
  {
    "id": "17",
    "name": "Abandoned Cabins",
    "puzzle": undefined,
    "subtitle": null,
    "tier": "T1",
    "cardsNeeded": [],
    "cardsFound": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      }
    ],
    "utilities": [
      {
        "name": "Sofa",
        "count": 1
      },
      {
        "name": "Metal Shop Front",
        "count": 1
      },
      {
        "name": "Poker Table",
        "count": 1
      }
    ],
    "vehicles": [],
    "spawns": [
      {
        "name": "Normal Crate",
        "count": 2,
        "respawn": "15-20m"
      },
      {
        "name": "Normal Crate (Random)",
        "count": 2,
        "respawn": "28-30m",
        "variants": [
          { "name": "Normal Crate Medical", "chance": "33.3%" },
          { "name": "Normal Crate", "chance": "33.3%" },
          { "name": "Normal Crate Food", "chance": "33.3%" }
        ]
      },
      {
        "name": "Sulfur Node (Random)",
        "count": 15,
        "respawn": "30-33m",
        "variants": [
          { "name": "Sulfur Ore", "chance": "90%" },
          { "name": "Sulfur Node", "chance": "10%" }
        ]
      }
    ],
    "collectibles": [
      {
        "name": "Green keycard",
        "count": 1,
        "respawn": "Never / Puzzle"
      }
    ],
    "cctv": "",
    "bpFrags": [],
    "advBp": [],
    "guide": "",
    "features": {
      "isSafezone": false,
      "hasTunnelEntrance": false,
      "hasChinookDropZone": false,
      "allowsPatrolHeliCrash": true
    },
    "lootDetails": {
      "eliteCrates": 0,
      "militaryCrates": 0,
      "regularCrates": 0,
      "basicCrates": 0,
      "barrels": 0
    }
  },
  {
    "id": "18",
    "name": "Jungle Ziggurat",
    "puzzle": {
      "bring": [
        { "name": "Green keycard", "count": 1 },
        { "name": "Electric Fuse", "count": 1 }
      ],
      "activate": [
        { "name": "Switch", "count": 1 }
      ],
      "rewards": [
        { "name": "Military Tunnel Scientist", "count": 11 },
        { "name": "Elite Crate", "count": 3 }
      ],
      "resetTime": "~30m"
    },
    "subtitle": null,
    "tier": "T1",
    "cardsNeeded": [],
    "cardsFound": [],
    "utilities": [
      {
        "name": "Recycler",
        "count": 1
      }
    ],
    "vehicles": [],
    "cctv": "",
    "bpFrags": [],
    "advBp": [],
    "guide": "",
    "features": {
      "isSafezone": false,
      "hasTunnelEntrance": false,
      "hasChinookDropZone": false,
      "allowsPatrolHeliCrash": true,
      "scientists": 0,
      "radiation": {
        "median": 0,
        "max": 0
      }
    },
    "lootDetails": {
      "militaryCrates": 0,
      "regularCrates": 0,
      "basicCrates": 0,
      "barrels": 0
    }
  },
  {
    "id": "19",
    "name": "Junkyard",
    "puzzle": {
      "bring": [
        { "name": "Green keycard", "count": 1 },
        { "name": "Electric Fuse", "count": 1 }
      ],
      "activate": [
        { "name": "Switch", "count": 1 }
      ],
      "rewards": [
        { "name": "Military Tunnel Scientist", "count": 11 },
        { "name": "Elite Crate", "count": 3 }
      ],
      "resetTime": "~30m"
    },
    "subtitle": null,
    "tier": "T1",
    "cardsNeeded": [],
    "cardsFound": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      }
    ],
    "utilities": [
      {
        "name": "Recycler",
        "count": 1
      },
      {
        "name": "Modular Car Lift",
        "count": 1
      }
    ],
    "vehicles": [
      {
        "name": "Bike",
        "count": 1
      }
    ],
    "cctv": "",
    "bpFrags": [],
    "advBp": [],
    "guide": "https://youtu.be/Wmkm5LwZ2rU?si=r_SjxayqDwU1_eIX",
    "features": {
      "isSafezone": false,
      "hasTunnelEntrance": false,
      "hasChinookDropZone": false,
      "allowsPatrolHeliCrash": true,
      "scientists": 0,
      "radiation": {
        "median": 0,
        "max": 0
      }
    },
    "lootDetails": {
      "militaryCrates": 0,
      "regularCrates": 0,
      "basicCrates": 0,
      "barrels": 0
    }
  },
  {
    "id": "20",
    "name": "Satellite Dish",
    "puzzle": {
      "bring": [
        { "name": "Green keycard", "count": 1 },
        { "name": "Electric Fuse", "count": 1 }
      ],
      "activate": [
        { "name": "Switch", "count": 1 }
      ],
      "rewards": [
        { "name": "Military Tunnel Scientist", "count": 11 },
        { "name": "Elite Crate", "count": 3 }
      ],
      "resetTime": "~30m"
    },
    "subtitle": null,
    "tier": "T2",
    "cardsNeeded": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      }
    ],
    "cardsFound": [
      {
        "type": "blue",
        "name": "blue keycard",
        "logic": ""
      }
    ],
    "utilities": [
      {
        "name": "Recycler",
        "count": 1
      },
      {
        "name": "Research Table",
        "count": 1
      }
    ],
    "vehicles": [
      {
        "name": "Bike",
        "count": 1
      }
    ],
    "cctv": "",
    "bpFrags": [
      {
        "name": "Blueprint fragments",
        "count": 1
      }
    ],
    "advBp": [],
    "guide": "https://youtu.be/kYaHqiU_uRc?si=hunTjgwXZ9doUr6A",
    "features": {
      "isSafezone": false,
      "hasTunnelEntrance": false,
      "hasChinookDropZone": false,
      "allowsPatrolHeliCrash": true,
      "scientists": 0,
      "radiation": {
        "median": 0,
        "max": 0
      }
    },
    "lootDetails": {
      "militaryCrates": 0,
      "regularCrates": 0,
      "basicCrates": 0,
      "barrels": 0
    }
  },
  {
    "id": "21",
    "name": "Bandit Camp",
    "puzzle": {
      "bring": [
        { "name": "Green keycard", "count": 1 },
        { "name": "Electric Fuse", "count": 1 }
      ],
      "activate": [
        { "name": "Switch", "count": 1 }
      ],
      "rewards": [
        { "name": "Military Tunnel Scientist", "count": 11 },
        { "name": "Elite Crate", "count": 3 }
      ],
      "resetTime": "~30m"
    },
    "subtitle": null,
    "tier": "Safe Zone",
    "cardsNeeded": [],
    "cardsFound": [],
    "utilities": [
      {
        "name": "Recycler",
        "count": 1
      },
      {
        "name": "Vending Machine",
        "count": 1
      },
      {
        "name": "Research Table",
        "count": 1
      },
      {
        "name": "Repair Bench",
        "count": 1
      },
      {
        "name": "Workbench Level 1",
        "count": 1
      }
    ],
    "vehicles": [
      {
        "name": "Attack Helicopter",
        "count": 1
      },
      {
        "name": "Scrap Transport Helicopter",
        "count": 1
      },
      {
        "name": "Minicopter",
        "count": 1
      },
      {
        "name": "Hot Air Balloon",
        "count": 1
      }
    ],
    "cctv": "/rust/camera-codes#bandit-camp",
    "bpFrags": [],
    "advBp": [],
    "guide": "https://youtu.be/IP_JtslXipY?si=xVRws8M9bubk9JxU",
    "features": {
      "isSafezone": false,
      "hasTunnelEntrance": false,
      "hasChinookDropZone": false,
      "allowsPatrolHeliCrash": true,
      "scientists": 0,
      "radiation": {
        "median": 0,
        "max": 0
      }
    },
    "lootDetails": {
      "militaryCrates": 0,
      "regularCrates": 0,
      "basicCrates": 0,
      "barrels": 0
    }
  },
  {
    "id": "22",
    "name": "Outpost",
    "puzzle": {
      "bring": [
        { "name": "Green keycard", "count": 1 },
        { "name": "Electric Fuse", "count": 1 }
      ],
      "activate": [
        { "name": "Switch", "count": 1 }
      ],
      "rewards": [
        { "name": "Military Tunnel Scientist", "count": 11 },
        { "name": "Elite Crate", "count": 3 }
      ],
      "resetTime": "~30m"
    },
    "subtitle": null,
    "tier": "Safe Zone",
    "cardsNeeded": [],
    "cardsFound": [],
    "utilities": [
      {
        "name": "Recycler",
        "count": 1
      },
      {
        "name": "Vending Machine",
        "count": 1
      },
      {
        "name": "Oil Refinery",
        "count": 1
      },
      {
        "name": "Research Table",
        "count": 1
      },
      {
        "name": "Repair Bench",
        "count": 1
      },
      {
        "name": "Barbecue",
        "count": 1
      },
      {
        "name": "Workbench Level 1",
        "count": 1
      }
    ],
    "vehicles": [],
    "cctv": "/rust/camera-codes#outpost",
    "bpFrags": [],
    "advBp": [],
    "guide": "https://youtu.be/djkTqITluyo?si=BFNLNf2xJYWFnWTs",
    "features": {
      "isSafezone": false,
      "hasTunnelEntrance": false,
      "hasChinookDropZone": false,
      "allowsPatrolHeliCrash": true,
      "scientists": 0,
      "radiation": {
        "median": 0,
        "max": 0
      }
    },
    "lootDetails": {
      "militaryCrates": 0,
      "regularCrates": 0,
      "basicCrates": 0,
      "barrels": 0
    }
  },
  {
    "id": "23",
    "name": "Apartment Complex",
    "puzzle": {
      "bring": [
        { "name": "Green keycard", "count": 1 },
        { "name": "Electric Fuse", "count": 1 }
      ],
      "activate": [
        { "name": "Switch", "count": 1 }
      ],
      "rewards": [
        { "name": "Military Tunnel Scientist", "count": 11 },
        { "name": "Elite Crate", "count": 3 }
      ],
      "resetTime": "~30m"
    },
    "subtitle": "Rent rooms and shops",
    "tier": "Safe Zone",
    "cardsNeeded": [],
    "cardsFound": [],
    "utilities": [
      {
        "name": "Workbench Level 1",
        "count": 1
      },
      {
        "name": "Barbecue",
        "count": 1
      },
      {
        "name": "Vending Machine",
        "count": 1
      }
    ],
    "vehicles": [],
    "cctv": "",
    "bpFrags": [],
    "advBp": [],
    "guide": "https://www.youtube.com/watch?v=Lb0jzj2QUZk",
    "features": {
      "isSafezone": false,
      "hasTunnelEntrance": false,
      "hasChinookDropZone": false,
      "allowsPatrolHeliCrash": true,
      "scientists": 0,
      "radiation": {
        "median": 0,
        "max": 0
      }
    },
    "lootDetails": {
      "militaryCrates": 0,
      "regularCrates": 0,
      "basicCrates": 0,
      "barrels": 0
    }
  },
  {
    "id": "24",
    "name": "Fishing Villages",
    "puzzle": {
      "bring": [
        { "name": "Green keycard", "count": 1 },
        { "name": "Electric Fuse", "count": 1 }
      ],
      "activate": [
        { "name": "Switch", "count": 1 }
      ],
      "rewards": [
        { "name": "Military Tunnel Scientist", "count": 11 },
        { "name": "Elite Crate", "count": 3 }
      ],
      "resetTime": "~30m"
    },
    "subtitle": null,
    "tier": "Safe Zone",
    "cardsNeeded": [],
    "cardsFound": [],
    "utilities": [
      {
        "name": "Vending Machine",
        "count": 1
      }
    ],
    "vehicles": [
      {
        "name": "Motor Rowboat",
        "count": 1
      },
      {
        "name": "RHIB",
        "count": 1
      },
      {
        "name": "Solo Submarine",
        "count": 1
      },
      {
        "name": "Duo Submarine",
        "count": 1
      }
    ],
    "cctv": "",
    "bpFrags": [],
    "advBp": [],
    "guide": "https://youtu.be/eUs4ddtVQYE?si=AYAFP2dQQV2a4mW7",
    "features": {
      "isSafezone": false,
      "hasTunnelEntrance": false,
      "hasChinookDropZone": false,
      "allowsPatrolHeliCrash": true,
      "scientists": 0,
      "radiation": {
        "median": 0,
        "max": 0
      }
    },
    "lootDetails": {
      "militaryCrates": 0,
      "regularCrates": 0,
      "basicCrates": 0,
      "barrels": 0
    }
  },
  {
    "id": "25",
    "name": "Stables",
    "puzzle": {
      "bring": [
        { "name": "Green keycard", "count": 1 },
        { "name": "Electric Fuse", "count": 1 }
      ],
      "activate": [
        { "name": "Switch", "count": 1 }
      ],
      "rewards": [
        { "name": "Military Tunnel Scientist", "count": 11 },
        { "name": "Elite Crate", "count": 3 }
      ],
      "resetTime": "~30m"
    },
    "subtitle": null,
    "tier": "Safe Zone",
    "cardsNeeded": [],
    "cardsFound": [],
    "utilities": [
      {
        "name": "Vending Machine",
        "count": 1
      }
    ],
    "vehicles": [
      {
        "name": "Ridable Horse",
        "count": 1
      }
    ],
    "cctv": "",
    "bpFrags": [],
    "advBp": [],
    "guide": "https://youtu.be/KC0mXozXrv0?si=XjA79lGRivL-RaeW",
    "features": {
      "isSafezone": false,
      "hasTunnelEntrance": false,
      "hasChinookDropZone": false,
      "allowsPatrolHeliCrash": true,
      "scientists": 0,
      "radiation": {
        "median": 0,
        "max": 0
      }
    },
    "lootDetails": {
      "militaryCrates": 0,
      "regularCrates": 0,
      "basicCrates": 0,
      "barrels": 0
    }
  },
  {
    "id": "26",
    "name": "Ferry Terminal",
    "puzzle": {
      "bring": [
        { "name": "Green keycard", "count": 1 },
        { "name": "Electric Fuse", "count": 1 }
      ],
      "activate": [
        { "name": "Switch", "count": 1 }
      ],
      "rewards": [
        { "name": "Military Tunnel Scientist", "count": 11 },
        { "name": "Elite Crate", "count": 3 }
      ],
      "resetTime": "~30m"
    },
    "subtitle": null,
    "tier": "T1",
    "cardsNeeded": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      }
    ],
    "cardsFound": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      },
      {
        "type": "blue",
        "name": "blue keycard",
        "logic": ""
      }
    ],
    "utilities": [
      {
        "name": "Recycler",
        "count": 1
      },
      {
        "name": "Research Table",
        "count": 1
      },
      {
        "name": "Repair Bench",
        "count": 1
      },
      {
        "name": "Modular Car Lift",
        "count": 1
      }
    ],
    "vehicles": [],
    "cctv": "/rust/camera-codes#ferry-terminal",
    "bpFrags": [
      {
        "name": "Blueprint fragments",
        "count": 1
      }
    ],
    "advBp": [],
    "guide": "https://youtu.be/2nvEJuNZZKg?si=UmFtNp9ga_SWeWBx",
    "features": {
      "isSafezone": false,
      "hasTunnelEntrance": false,
      "hasChinookDropZone": false,
      "allowsPatrolHeliCrash": true,
      "scientists": 0,
      "radiation": {
        "median": 0,
        "max": 0
      }
    },
    "lootDetails": {
      "militaryCrates": 0,
      "regularCrates": 0,
      "basicCrates": 0,
      "barrels": 0
    }
  },
  {
    "id": "27",
    "name": "Harbor Large",
    "puzzle": {
      "bring": [
        { "name": "Green keycard", "count": 1 },
        { "name": "Electric Fuse", "count": 1 }
      ],
      "activate": [
        { "name": "Switch", "count": 1 }
      ],
      "rewards": [
        { "name": "Military Tunnel Scientist", "count": 11 },
        { "name": "Elite Crate", "count": 3 }
      ],
      "resetTime": "~30m"
    },
    "subtitle": null,
    "tier": "T1",
    "cardsNeeded": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      }
    ],
    "cardsFound": [
      {
        "type": "blue",
        "name": "blue keycard",
        "logic": ""
      }
    ],
    "utilities": [
      {
        "name": "Recycler",
        "count": 1
      },
      {
        "name": "Oil Refinery",
        "count": 1
      }
    ],
    "vehicles": [],
    "cctv": "",
    "bpFrags": [
      {
        "name": "Blueprint fragments",
        "count": 1
      }
    ],
    "advBp": [],
    "guide": "https://youtu.be/iMYODoGRNss?si=OVO9bh6Y473Wadmv",
    "features": {
      "isSafezone": false,
      "hasTunnelEntrance": false,
      "hasChinookDropZone": false,
      "allowsPatrolHeliCrash": true,
      "scientists": 0,
      "radiation": {
        "median": 0,
        "max": 0
      }
    },
    "lootDetails": {
      "militaryCrates": 0,
      "regularCrates": 0,
      "basicCrates": 0,
      "barrels": 0
    }
  },
  {
    "id": "28",
    "name": "Harbor Small",
    "puzzle": {
      "bring": [
        { "name": "Green keycard", "count": 1 },
        { "name": "Electric Fuse", "count": 1 }
      ],
      "activate": [
        { "name": "Switch", "count": 1 }
      ],
      "rewards": [
        { "name": "Military Tunnel Scientist", "count": 11 },
        { "name": "Elite Crate", "count": 3 }
      ],
      "resetTime": "~30m"
    },
    "subtitle": null,
    "tier": "T1",
    "cardsNeeded": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      }
    ],
    "cardsFound": [
      {
        "type": "blue",
        "name": "blue keycard",
        "logic": ""
      }
    ],
    "utilities": [
      {
        "name": "Recycler",
        "count": 1
      },
      {
        "name": "Oil Refinery",
        "count": 1
      }
    ],
    "vehicles": [],
    "cctv": "",
    "bpFrags": [
      {
        "name": "Blueprint fragments",
        "count": 1
      }
    ],
    "advBp": [],
    "guide": "https://youtu.be/iMYODoGRNss?si=OVO9bh6Y473Wadmv",
    "features": {
      "isSafezone": false,
      "hasTunnelEntrance": false,
      "hasChinookDropZone": false,
      "allowsPatrolHeliCrash": true,
      "scientists": 0,
      "radiation": {
        "median": 0,
        "max": 0
      }
    },
    "lootDetails": {
      "militaryCrates": 0,
      "regularCrates": 0,
      "basicCrates": 0,
      "barrels": 0
    }
  },
  {
    "id": "29",
    "name": "Lighthouse",
    "puzzle": {
      "bring": [
        { "name": "Green keycard", "count": 1 },
        { "name": "Electric Fuse", "count": 1 }
      ],
      "activate": [
        { "name": "Switch", "count": 1 }
      ],
      "rewards": [
        { "name": "Military Tunnel Scientist", "count": 11 },
        { "name": "Elite Crate", "count": 3 }
      ],
      "resetTime": "~30m"
    },
    "subtitle": null,
    "tier": "T1",
    "cardsNeeded": [],
    "cardsFound": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      }
    ],
    "utilities": [
      {
        "name": "Recycler",
        "count": 1
      }
    ],
    "vehicles": [],
    "cctv": "",
    "bpFrags": [],
    "advBp": [],
    "guide": "",
    "features": {
      "isSafezone": false,
      "hasTunnelEntrance": false,
      "hasChinookDropZone": false,
      "allowsPatrolHeliCrash": true,
      "scientists": 0,
      "radiation": {
        "median": 0,
        "max": 0
      }
    },
    "lootDetails": {
      "militaryCrates": 0,
      "regularCrates": 0,
      "basicCrates": 0,
      "barrels": 0
    }
  },
  {
    "id": "30",
    "name": "Large Oil Rig",
    "puzzle": {
      "bring": [
        { "name": "Green keycard", "count": 1 },
        { "name": "Electric Fuse", "count": 1 }
      ],
      "activate": [
        { "name": "Switch", "count": 1 }
      ],
      "rewards": [
        { "name": "Military Tunnel Scientist", "count": 11 },
        { "name": "Elite Crate", "count": 3 }
      ],
      "resetTime": "~30m"
    },
    "subtitle": null,
    "tier": "Ocean",
    "cardsNeeded": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      },
      {
        "type": "blue",
        "name": "blue keycard",
        "logic": ""
      },
      {
        "type": "red",
        "name": "red keycard",
        "logic": ""
      }
    ],
    "cardsFound": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      }
    ],
    "utilities": [
      {
        "name": "Research Table",
        "count": 1
      },
      {
        "name": "Barbecue",
        "count": 1
      },
      {
        "name": "Computer Station",
        "count": 1
      },
      {
        "name": "Diesel Barrel x3",
        "count": 3
      }
    ],
    "vehicles": [],
    "cctv": "/rust/camera-codes#large-oil-rig",
    "bpFrags": [],
    "advBp": [
      {
        "name": "Advanced blueprint fragments",
        "count": 2
      }
    ],
    "guide": "https://youtu.be/GN4khDsR6z4?si=qFODYv6Q86xAvJIQ",
    "features": {
      "isSafezone": false,
      "hasTunnelEntrance": false,
      "hasChinookDropZone": false,
      "allowsPatrolHeliCrash": true,
      "scientists": 0,
      "radiation": {
        "median": 0,
        "max": 0
      }
    },
    "lootDetails": {
      "militaryCrates": 0,
      "regularCrates": 0,
      "basicCrates": 0,
      "barrels": 0
    }
  },
  {
    "id": "31",
    "name": "Oil Rig",
    "puzzle": {
      "bring": [
        { "name": "Green keycard", "count": 1 },
        { "name": "Electric Fuse", "count": 1 }
      ],
      "activate": [
        { "name": "Switch", "count": 1 }
      ],
      "rewards": [
        { "name": "Military Tunnel Scientist", "count": 11 },
        { "name": "Elite Crate", "count": 3 }
      ],
      "resetTime": "~30m"
    },
    "subtitle": null,
    "tier": "Ocean",
    "cardsNeeded": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      },
      {
        "type": "blue",
        "name": "blue keycard",
        "logic": ""
      },
      {
        "type": "red",
        "name": "red keycard",
        "logic": ""
      }
    ],
    "cardsFound": [],
    "utilities": [
      {
        "name": "Computer Station",
        "count": 1
      },
      {
        "name": "Diesel Barrel x3",
        "count": 3
      }
    ],
    "vehicles": [],
    "cctv": "/rust/camera-codes#oil-rig",
    "bpFrags": [],
    "advBp": [
      {
        "name": "Advanced blueprint fragments",
        "count": 2
      }
    ],
    "guide": "https://youtu.be/2lzGW8X5NcY?si=u-1WvsUxcdinPqGl",
    "features": {
      "isSafezone": false,
      "hasTunnelEntrance": false,
      "hasChinookDropZone": false,
      "allowsPatrolHeliCrash": true,
      "scientists": 0,
      "radiation": {
        "median": 0,
        "max": 0
      }
    },
    "lootDetails": {
      "militaryCrates": 0,
      "regularCrates": 0,
      "basicCrates": 0,
      "barrels": 0
    }
  },
  {
    "id": "32",
    "name": "Mining Outpost",
    "puzzle": {
      "bring": [
        { "name": "Green keycard", "count": 1 },
        { "name": "Electric Fuse", "count": 1 }
      ],
      "activate": [
        { "name": "Switch", "count": 1 }
      ],
      "rewards": [
        { "name": "Military Tunnel Scientist", "count": 11 },
        { "name": "Elite Crate", "count": 3 }
      ],
      "resetTime": "~30m"
    },
    "subtitle": null,
    "tier": "T1",
    "cardsNeeded": [],
    "cardsFound": [],
    "utilities": [
      {
        "name": "Recycler",
        "count": 1
      },
      {
        "name": "Repair Bench",
        "count": 1
      }
    ],
    "vehicles": [
      {
        "name": "Bike",
        "count": 1
      }
    ],
    "cctv": "",
    "bpFrags": [],
    "advBp": [],
    "guide": "",
    "features": {
      "isSafezone": false,
      "hasTunnelEntrance": false,
      "hasChinookDropZone": false,
      "allowsPatrolHeliCrash": true,
      "scientists": 0,
      "radiation": {
        "median": 0,
        "max": 0
      }
    },
    "lootDetails": {
      "militaryCrates": 0,
      "regularCrates": 0,
      "basicCrates": 0,
      "barrels": 0
    }
  },
  {
    "id": "33",
    "name": "Oxum's Gas Station",
    "puzzle": {
      "bring": [
        { "name": "Green keycard", "count": 1 },
        { "name": "Electric Fuse", "count": 1 }
      ],
      "activate": [
        { "name": "Switch", "count": 1 }
      ],
      "rewards": [
        { "name": "Military Tunnel Scientist", "count": 11 },
        { "name": "Elite Crate", "count": 3 }
      ],
      "resetTime": "~30m"
    },
    "subtitle": null,
    "tier": "T1",
    "cardsNeeded": [],
    "cardsFound": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      }
    ],
    "utilities": [
      {
        "name": "Recycler",
        "count": 1
      }
    ],
    "vehicles": [
      {
        "name": "Bike",
        "count": 1
      }
    ],
    "cctv": "",
    "bpFrags": [],
    "advBp": [],
    "guide": "",
    "features": {
      "isSafezone": false,
      "hasTunnelEntrance": false,
      "hasChinookDropZone": false,
      "allowsPatrolHeliCrash": true,
      "scientists": 0,
      "radiation": {
        "median": 0,
        "max": 0
      }
    },
    "lootDetails": {
      "militaryCrates": 0,
      "regularCrates": 0,
      "basicCrates": 0,
      "barrels": 0
    }
  },
  {
    "id": "34",
    "name": "Underwater Lab",
    "puzzle": {
      "bring": [
        { "name": "Green keycard", "count": 1 },
        { "name": "Electric Fuse", "count": 1 }
      ],
      "activate": [
        { "name": "Switch", "count": 1 }
      ],
      "rewards": [
        { "name": "Military Tunnel Scientist", "count": 11 },
        { "name": "Elite Crate", "count": 3 }
      ],
      "resetTime": "~30m"
    },
    "subtitle": null,
    "tier": "Ocean",
    "cardsNeeded": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      },
      {
        "type": "blue",
        "name": "blue keycard",
        "logic": ""
      },
      {
        "type": "red",
        "name": "red keycard",
        "logic": ""
      }
    ],
    "cardsFound": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      }
    ],
    "utilities": [
      {
        "name": "Computer Station",
        "count": 1
      }
    ],
    "vehicles": [],
    "cctv": "/rust/camera-codes#underwater-lab",
    "bpFrags": [
      {
        "name": "Blueprint fragments",
        "count": 2
      }
    ],
    "advBp": [
      {
        "name": "Advanced blueprint fragments",
        "count": 2
      }
    ],
    "guide": "https://youtu.be/Yj38XRHpD_o?si=eQ6NF0uLcKcX_pjp",
    "features": {
      "isSafezone": false,
      "hasTunnelEntrance": false,
      "hasChinookDropZone": false,
      "allowsPatrolHeliCrash": true,
      "scientists": 0,
      "radiation": {
        "median": 0,
        "max": 0
      }
    },
    "lootDetails": {
      "militaryCrates": 0,
      "regularCrates": 0,
      "basicCrates": 0,
      "barrels": 0
    }
  },
  {
    "id": "35",
    "name": "Rad Town",
    "puzzle": {
      "bring": [
        { "name": "Green keycard", "count": 1 },
        { "name": "Electric Fuse", "count": 1 }
      ],
      "activate": [
        { "name": "Switch", "count": 1 }
      ],
      "rewards": [
        { "name": "Military Tunnel Scientist", "count": 11 },
        { "name": "Elite Crate", "count": 3 }
      ],
      "resetTime": "~30m"
    },
    "subtitle": null,
    "tier": "T1",
    "cardsNeeded": [
      {
        "type": "green",
        "name": "green keycard",
        "logic": ""
      }
    ],
    "cardsFound": [
      {
        "type": "blue",
        "name": "blue keycard",
        "logic": ""
      }
    ],
    "utilities": [
      {
        "name": "Recycler",
        "count": 1
      },
      {
        "name": "Diesel Barrel x2",
        "count": 2
      }
    ],
    "vehicles": [],
    "cctv": "/rust/camera-codes#rad-town",
    "bpFrags": [
      {
        "name": "Blueprint fragments",
        "count": 1
      }
    ],
    "advBp": [],
    "guide": "https://youtu.be/QRQBytskSUU?si=UO-baHobz1mowujn",
    "features": {
      "isSafezone": false,
      "hasTunnelEntrance": false,
      "hasChinookDropZone": false,
      "allowsPatrolHeliCrash": true,
      "scientists": 0,
      "radiation": {
        "median": 0,
        "max": 0
      }
    },
    "lootDetails": {
      "militaryCrates": 0,
      "regularCrates": 0,
      "basicCrates": 0,
      "barrels": 0
    }
  },
  {
    "id": "36",
    "name": "Floating Cities",
    "puzzle": {
      "bring": [
        { "name": "Green keycard", "count": 1 },
        { "name": "Electric Fuse", "count": 1 }
      ],
      "activate": [
        { "name": "Switch", "count": 1 }
      ],
      "rewards": [
        { "name": "Military Tunnel Scientist", "count": 11 },
        { "name": "Elite Crate", "count": 3 }
      ],
      "resetTime": "~30m"
    },
    "subtitle": null,
    "tier": "Safe Zone",
    "cardsNeeded": [],
    "cardsFound": [],
    "utilities": [
      {
        "name": "Recycler",
        "count": 1
      },
      {
        "name": "Vending Machine",
        "count": 1
      },
      {
        "name": "Oil Refinery",
        "count": 1
      },
      {
        "name": "Research Table",
        "count": 1
      },
      {
        "name": "Workbench Level 1",
        "count": 1
      }
    ],
    "vehicles": [],
    "cctv": "",
    "bpFrags": [],
    "advBp": [],
    "guide": "",
    "features": {
      "isSafezone": false,
      "hasTunnelEntrance": false,
      "hasChinookDropZone": false,
      "allowsPatrolHeliCrash": true,
      "scientists": 0,
      "radiation": {
        "median": 0,
        "max": 0
      }
    },
    "lootDetails": {
      "militaryCrates": 0,
      "regularCrates": 0,
      "basicCrates": 0,
      "barrels": 0
    }
  },
  {
    "id": "37",
    "name": "Ghost Ships",
    "puzzle": {
      "bring": [
        { "name": "Green keycard", "count": 1 },
        { "name": "Electric Fuse", "count": 1 }
      ],
      "activate": [
        { "name": "Switch", "count": 1 }
      ],
      "rewards": [
        { "name": "Military Tunnel Scientist", "count": 11 },
        { "name": "Elite Crate", "count": 3 }
      ],
      "resetTime": "~30m"
    },
    "subtitle": null,
    "tier": "Deep Sea",
    "cardsNeeded": [],
    "cardsFound": [],
    "utilities": [
      {
        "name": "Vending Machine",
        "count": 1
      }
    ],
    "vehicles": [
      {
        "name": "Patrol Boat",
        "count": 1
      }
    ],
    "cctv": "",
    "bpFrags": [],
    "advBp": [],
    "guide": "",
    "features": {
      "isSafezone": false,
      "hasTunnelEntrance": false,
      "hasChinookDropZone": false,
      "allowsPatrolHeliCrash": true,
      "scientists": 0,
      "radiation": {
        "median": 0,
        "max": 0
      }
    },
    "lootDetails": {
      "militaryCrates": 0,
      "regularCrates": 0,
      "basicCrates": 0,
      "barrels": 0
    }
  },
  {
    "id": "38",
    "name": "Islands",
    "puzzle": {
      "bring": [
        { "name": "Green keycard", "count": 1 },
        { "name": "Electric Fuse", "count": 1 }
      ],
      "activate": [
        { "name": "Switch", "count": 1 }
      ],
      "rewards": [
        { "name": "Military Tunnel Scientist", "count": 11 },
        { "name": "Elite Crate", "count": 3 }
      ],
      "resetTime": "~30m"
    },
    "subtitle": null,
    "tier": "Deep Sea",
    "cardsNeeded": [],
    "cardsFound": [],
    "utilities": [
      {
        "name": "Vending Machine",
        "count": 1
      }
    ],
    "vehicles": [
      {
        "name": "Patrol Boat",
        "count": 1
      }
    ],
    "cctv": "",
    "bpFrags": [],
    "advBp": [],
    "guide": "",
    "features": {
      "isSafezone": false,
      "hasTunnelEntrance": false,
      "hasChinookDropZone": false,
      "allowsPatrolHeliCrash": true,
      "scientists": 0,
      "radiation": {
        "median": 0,
        "max": 0
      }
    },
    "lootDetails": {
      "militaryCrates": 0,
      "regularCrates": 0,
      "basicCrates": 0,
      "barrels": 0
    }
  }
];

