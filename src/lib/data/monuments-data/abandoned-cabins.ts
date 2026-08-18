import type { Monument } from '../../types';

export const AbandonedCabinsMonument: Monument = {
  "id": "17",
  "name": "Abandoned Cabins",
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
        {
          "name": "Normal Crate Medical",
          "chance": "33.3%"
        },
        {
          "name": "Normal Crate",
          "chance": "33.3%"
        },
        {
          "name": "Normal Crate Food",
          "chance": "33.3%"
        }
      ]
    },
    {
      "name": "Sulfur Node (Random)",
      "count": 15,
      "respawn": "30-33m",
      "variants": [
        {
          "name": "Sulfur Ore",
          "chance": "90%"
        },
        {
          "name": "Sulfur Node",
          "chance": "10%"
        }
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
};
