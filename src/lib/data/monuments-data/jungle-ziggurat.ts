import type { Monument } from '../../types';

export const JungleZigguratMonument: Monument = {
  "id": "18",
  "name": "Jungle Ziggurat",
  "subtitle": "Small",
  "tier": "T1/T2/T3",
  "cardsNeeded": [],
  "cardsFound": [],
  "utilities": [
    {
      "name": "Green Recycler",
      "count": 1
    }
  ],
  "vehicles": [],
  "cctv": "",
  "bpFrags": [],
  "advBp": [],
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
      "name": "loot barrel",
      "count": 6,
      "respawn": "30-36m",
      "variants": [
        { "name": "yellow loot barrel", "chance": "50%" },
        { "name": "blue loot barrel", "chance": "50%" }
      ]
    },
    {
      "name": "normal crate",
      "count": 6,
      "respawn": "30-36m"
    },
    {
      "name": "crate basic jungle",
      "count": 2,
      "respawn": "30-36m"
    }
  ]
};
