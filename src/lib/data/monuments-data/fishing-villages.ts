import type { Monument } from '../../types';

export const FishingVillagesMonument: Monument = {
  "id": "24",
  "name": "Fishing Villages",
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
      "name": "Motor Rowboat",
      "count": 1
    },
    {
      "name": "RHIB",
      "count": 1
    },
    {
      "name": "Solo Submarine",
      "count": 1
    },
    {
      "name": "Duo Submarine",
      "count": 1
    }
  ],
  "cctv": "",
  "bpFrags": [],
  "advBp": [],
  "guide": "https://youtu.be/eUs4ddtVQYE?si=AYAFP2dQQV2a4mW7",
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
