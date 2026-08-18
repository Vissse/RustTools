import type { Monument } from '../../types';

export const AbandonedMilitaryBaseMonument: Monument = {
  "id": "09",
  "name": "Abandoned Military Base",
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
        {
          "name": "Normal Crate",
          "chance": "60%"
        },
        {
          "name": "Military Crate",
          "chance": "40%"
        }
      ]
    },
    {
      "name": "Food Crate (Random)",
      "count": 4,
      "respawn": "20-30m",
      "variants": [
        {
          "name": "Underwater Lab - Food Crate 1",
          "chance": "50%"
        },
        {
          "name": "Underwater Lab - Food Crate 2",
          "chance": "50%"
        }
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
};
