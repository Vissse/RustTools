import type { Monument } from '../../types';

export const LargeOilRigMonument: Monument = {
  "id": "30",
  "name": "Large Oil Rig",
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
  "cardsFound": [
    {
      "type": "green",
      "name": "green keycard",
      "logic": ""
    }
  ],
  "utilities": [
    {
      "name": "Research Table",
      "count": 1
    },
    {
      "name": "Barbecue",
      "count": 1
    },
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
  "cctv": "/rust/camera-codes#large-oil-rig",
  "bpFrags": [],
  "advBp": [
    {
      "name": "Advanced blueprint fragments",
      "count": 2
    }
  ],
  "guide": "https://youtu.be/GN4khDsR6z4?si=qFODYv6Q86xAvJIQ",
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
