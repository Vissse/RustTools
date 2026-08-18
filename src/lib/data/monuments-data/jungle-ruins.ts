import type { Monument } from '../../types';

export const JungleRuinsMonument: Monument = {
  "id": "14",
  "name": "Jungle Ruins",
  "subtitle": "Small",
  "tier": "T1/T2/T3",
  "variants": ["A", "B", "C", "D", "E"],
  "cardsNeeded": [],
  "cardsFound": [],
  "utilities": [
    { "name": "Zipline Launch Point", "count": 1, "onlyInVariant": "E" },
    { "name": "Zipline Target Point", "count": 1, "onlyInVariant": "E" }
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
      "count": 3,
      "respawn": "30-36m",
      "variants": [
        { "name": "yellow loot barrel", "chance": "50%" },
        { "name": "blue loot barrel", "chance": "50%" }
      ]
    },
    {
      "name": "normal crate",
      "count": 3,
      "respawn": "30-36m",
      "variants": [
        { "name": "normal crate", "chance": "90%" },
        { "name": "military crate", "chance": "10%" }
      ]
    }
  ]
};
