import type { Monument } from '../../types';

export const FerryTerminalMonument: Monument = {
  "id": "26",
  "name": "Ferry Terminal",
  "subtitle": null,
  "tier": "T1/T2",
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
  "collectibles": [
    { "name": "green keycard", "count": 1, "respawn": "Never / Puzzle" },
    { "name": "blue keycard", "count": 1, "respawn": "Never / Puzzle" },
    { "name": "blueprint fragments", "count": 1, "respawn": "Never / Puzzle" }
  ],
  "utilities": [
    { "name": "green recycler", "count": 1 },
    { "name": "Research Table", "count": 1 },
    { "name": "Repair Bench", "count": 1 },
    { "name": "Modular Car Lift", "count": 1 },
    { "name": "Hobo Barrel", "count": 2 },
    { "name": "Telephone", "count": 1 },
    { "name": "Elevator", "count": 1 },
    { "name": "Heat Source", "count": 1 }
  ],
  "vehicles": [],
  "cctv": "/rust/camera-codes#ferry-terminal",
  "bpFrags": [
    { "name": "blueprint fragments", "count": 1 }
  ],
  "advBp": [],
  "guide": "https://youtu.be/2nvEJuNZZKg?si=UmFtNp9ga_SWeWBx",
  "features": {
    "isSafezone": false,
    "hasTunnelEntrance": true,
    "hasChinookDropZone": false,
    "allowsPatrolHeliCrash": true,
    "scientists": 0,
    "radiation": {
      "median": 0,
      "max": 0
    }
  },
  "puzzle": {
    "bring": [
      { "name": "Electric Fuse", "count": 1 },
      { "name": "Green keycard", "count": 1 }
    ],
    "activate": [
      { "name": "Switch", "count": 1 }
    ],
    "rewards": [
      { "name": "blue keycard", "count": 1 },
      { "name": "blueprint fragments", "count": 1 },
      { "name": "normal crate", "count": 2 }
    ],
    "resetTime": "~30m"
  },
  "spawns": [
    {
      "name": "loot barrel",
      "count": 26,
      "respawn": "30–36m",
      "variants": [
        { "name": "loot barrel", "chance": "50%" },
        { "name": "food crate", "chance": "50%" }
      ]
    },
    {
      "name": "normal crate",
      "count": 10,
      "respawn": "30–36m",
      "onlyInTier": "2",
      "variants": [
        { "name": "normal crate", "chance": "66.7%" },
        { "name": "military crate", "chance": "33.3%" }
      ]
    },
    {
      "name": "normal crate",
      "count": 9,
      "respawn": "30–36m",
      "onlyInTier": "1",
      "variants": [
        { "name": "normal crate", "chance": "85%" },
        { "name": "military crate", "chance": "15%" }
      ]
    },
    {
      "name": "oil barrel",
      "count": 6,
      "respawn": "30–36m"
    },
    {
      "name": "normal crate",
      "count": 2,
      "respawn": "Never / Puzzle"
    }
  ],
  "lootDetails": {
    "militaryCrates": 0,
    "regularCrates": 0,
    "basicCrates": 0,
    "barrels": 32
  }
};

