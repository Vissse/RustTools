import type { Monument } from '../../types';

export const BanditCampMonument: Monument = {
  "id": "21",
  "name": "Bandit Camp",
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
      "name": "Recycler",
      "count": 1
    },
    {
      "name": "Vending Machine",
      "count": 1
    },
    {
      "name": "Research Table",
      "count": 1
    },
    {
      "name": "Repair Bench",
      "count": 1
    },
    {
      "name": "Workbench Level 1",
      "count": 1
    }
  ],
  "vehicles": [
    {
      "name": "Attack Helicopter",
      "count": 1
    },
    {
      "name": "Scrap Transport Helicopter",
      "count": 1
    },
    {
      "name": "Minicopter",
      "count": 1
    },
    {
      "name": "Hot Air Balloon",
      "count": 1
    }
  ],
  "cctv": "/rust/camera-codes#bandit-camp",
  "bpFrags": [],
  "advBp": [],
  "guide": "https://youtu.be/IP_JtslXipY?si=xVRws8M9bubk9JxU",
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
