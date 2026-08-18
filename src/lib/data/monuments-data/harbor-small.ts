import type { Monument } from '../../types';

export const HarborSmallMonument: Monument = {
  "id": "28",
  "name": "Harbor Small",
  "subtitle": "Oceanside",
  "tier": "T1/T2",
  "cardsNeeded": [],
  "cardsFound": [],
  "puzzle": {
    "bring": [
      { "name": "Electric Fuse", "count": 1 },
      { "name": "Green Keycard", "count": 1 }
    ],
    "activate": [
      { "name": "Switch", "count": 1 }
    ],
    "rewards": [
      { "name": "Blue Keycard", "count": 1 },
      { "name": "Basic Blueprint Fragment", "count": 1 },
      { "name": "Normal Crate", "count": 2 }
    ],
    "resetTime": "~30m"
  },
  "collectibles": [
    { "name": "Blue Keycard", "count": 1, "respawn": "Never / Puzzle" },
    { "name": "Basic Blueprint Fragment", "count": 1, "respawn": "Never / Puzzle" }
  ],
  "utilities": [
    { "name": "Light Switch", "count": 6 },
    { "name": "Zipline Target Point", "count": 5 },
    { "name": "Zipline Launch Point", "count": 3 },
    { "name": "Telephone", "count": 1 },
    { "name": "Small Oil Refinery", "count": 1 },
    { "name": "Sofa", "count": 1 },
    { "name": "Elevator", "count": 1 },
    { "name": "Green Recycler", "count": 1 }
  ],
  "vehicles": [],
  "cctv": "",
  "bpFrags": [],
  "advBp": [],
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
  "lootDetails": {
    "militaryCrates": 0,
    "regularCrates": 0,
    "basicCrates": 0,
    "barrels": 0
  },
  "spawns": [
    {
      "name": "loot barrel",
      "count": 30,
      "respawn": "30-36m",
      "variants": [
        { "name": "yellow loot barrel", "chance": "50%" },
        { "name": "blue loot barrel", "chance": "50%" }
      ]
    },
    {
      "name": "military crate",
      "count": 10,
      "respawn": "30-36m",
      "onlyInTier": "2",
      "variants": [
        { "name": "military crate", "chance": "50%" },
        { "name": "normal crate", "chance": "50%" }
      ]
    },
    {
      "name": "oil barrel",
      "count": 10,
      "respawn": "30-36m"
    },
    {
      "name": "normal crate",
      "count": 8,
      "respawn": "30-36m",
      "onlyInTier": "1",
      "variants": [
        { "name": "normal crate", "chance": "90%" },
        { "name": "military crate", "chance": "10%" }
      ]
    },
    {
      "name": "normal crate",
      "count": 2,
      "respawn": "Never / Puzzle"
    }
  ]
};
