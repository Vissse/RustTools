import type { Monument } from '../../types';

export const UnderwaterLabMonument: Monument = {
  "id": "34",
  "name": "Underwater Lab",
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
      "name": "Computer Station",
      "count": 1
    }
  ],
  "vehicles": [],
  "cctv": "/rust/camera-codes#underwater-lab",
  "bpFrags": [
    {
      "name": "Blueprint fragments",
      "count": 2
    }
  ],
  "advBp": [
    {
      "name": "Advanced blueprint fragments",
      "count": 2
    }
  ],
  "guide": "https://youtu.be/Yj38XRHpD_o?si=eQ6NF0uLcKcX_pjp",
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
