import type { Monument } from '../../types';

export const SewerBranchMonument: Monument = {
  "id": "12",
  "name": "Sewer Branch",
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
      "name": "Recycler x2",
      "count": 2
    },
    {
      "name": "Oil Refinery x2",
      "count": 2
    }
  ],
  "vehicles": [],
  "cctv": "",
  "bpFrags": [
    {
      "name": "Blueprint fragments",
      "count": 2
    }
  ],
  "advBp": [],
  "guide": "https://youtu.be/FICzFsiiA5k?si=NbnwFjPp4qBeA2Bn",
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
