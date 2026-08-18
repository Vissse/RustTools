import type { Monument } from '../../types';

export const StablesMonument: Monument = {
  "id": "25",
  "name": "Stables",
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
};
