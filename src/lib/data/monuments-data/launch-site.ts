import type { Monument } from '../../types';

export const LaunchSiteMonument: Monument = {
  "id": "04",
  "name": "Launch Site",
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
  "tier": "T3",
  "cardsNeeded": [
    {
      "type": "green",
      "name": "green keycard",
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
      "name": "Recycler",
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
      "name": "Oil Refinery",
      "count": 1
    }
  ],
  "vehicles": [
    {
      "name": "Bradley APC",
      "count": 1
    }
  ],
  "cctv": "",
  "bpFrags": [],
  "advBp": [
    {
      "name": "Advanced blueprint fragments",
      "count": 2
    }
  ],
  "guide": "https://youtu.be/AGtTjNOAE0s?si=CNFNSS3eoGrB1B5Y",
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
