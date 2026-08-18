import type { Monument } from '../../types';

export const OilRigMonument: Monument = {
  "id": "31",
  "name": "Oil Rig",
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
  "tier": "Ocean",
  "cardsNeeded": [
    {
      "type": "green",
      "name": "green keycard",
      "logic": ""
    },
    {
      "type": "blue",
      "name": "blue keycard",
      "logic": ""
    },
    {
      "type": "red",
      "name": "red keycard",
      "logic": ""
    }
  ],
  "cardsFound": [],
  "utilities": [
    {
      "name": "Computer Station",
      "count": 1
    },
    {
      "name": "Diesel Barrel x3",
      "count": 3
    }
  ],
  "vehicles": [],
  "cctv": "/rust/camera-codes#oil-rig",
  "bpFrags": [],
  "advBp": [
    {
      "name": "Advanced blueprint fragments",
      "count": 2
    }
  ],
  "guide": "https://youtu.be/2lzGW8X5NcY?si=u-1WvsUxcdinPqGl",
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
