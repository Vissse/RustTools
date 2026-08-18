import type { Monument } from '../../types';

export const JunkyardMonument: Monument = {
  "id": "19",
  "name": "Junkyard",
  "subtitle": "Small",
  "tier": "T1/T2",
  "cardsNeeded": [],
  "cardsFound": [],
  "utilities": [
    {
      "name": "Hobo Barrel",
      "count": 2
    },
    {
      "name": "Chair",
      "count": 1
    },
    {
      "name": "Modular Car Lift",
      "count": 1
    },
    {
      "name": "Junkyard Shredder",
      "count": 1
    },
    {
      "name": "Green Recycler",
      "count": 1
    }
  ],
  "vehicles": [
    {
      "name": "Motorbike",
      "count": 7,
      "respawn": "Never / Puzzle"
    }
  ],
  "collectibles": [
    {
      "name": "Diesel Fuel (collectable)",
      "count": 2,
      "respawn": "Never / Puzzle"
    },
    {
      "name": "Green Keycard",
      "count": 1,
      "respawn": "Never / Puzzle"
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
    "allowsPatrolHeliCrash": false,
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
      "name": "normal crate",
      "count": 10,
      "respawn": "15-20m",
      "onlyInTier": "1"
    },
    {
      "name": "normal crate",
      "count": 10,
      "respawn": "15-20m",
      "onlyInTier": "2",
      "variants": [
        { "name": "normal crate", "chance": "50%" },
        { "name": "military crate", "chance": "50%" }
      ]
    },
    {
      "name": "loot barrel",
      "count": 10,
      "respawn": "15-20m",
      "variants": [
        { "name": "yellow loot barrel", "chance": "45%" },
        { "name": "blue loot barrel", "chance": "45%" },
        { "name": "diesel fuel (collectable)", "chance": "10%" }
      ]
    },
    {
      "name": "shreddable pickuptruck",
      "count": 8,
      "respawn": "10-20m"
    },
    {
      "name": "roadsign",
      "count": 3,
      "respawn": "Never / Puzzle"
    }
  ]
};
