import type { Monument } from '../../types';

export const MiningOutpostMonument: Monument = {
  "id": "32",
  "name": "Mining Outpost",
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
};
