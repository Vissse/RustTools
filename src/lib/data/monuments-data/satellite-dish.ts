import type { Monument } from '../../types';

export const SatelliteDishMonument: Monument = {
  "id": "20",
  "name": "Satellite Dish",
  "puzzle": {
    "bring": [
      {
        "name": "Green keycard",
        "count": 1
      },
      {
        "name": "Electric Fuse",
        "count": 1
      }
    ],
    "activate": [
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
        "name": "Elite Crate",
        "count": 3
      }
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
};
