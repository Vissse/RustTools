import type { Monument } from '../../types';

export const JunkyardMonument: Monument = {
  "id": "19",
  "name": "Junkyard",
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
  "cardsFound": [
    {
      "type": "green",
      "name": "green keycard",
      "logic": ""
    }
  ],
  "utilities": [
    {
      "name": "Recycler",
      "count": 1
    },
    {
      "name": "Modular Car Lift",
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
  "guide": "https://youtu.be/Wmkm5LwZ2rU?si=r_SjxayqDwU1_eIX",
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
