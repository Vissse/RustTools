import type { Monument } from '../../types';

export const PowerPlantMonument: Monument = {
  "id": "06",
  "name": "Power Plant",
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
    },
    {
      "type": "blue",
      "name": "blue keycard",
      "logic": ""
    }
  ],
  "cardsFound": [
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
  "utilities": [
    {
      "name": "Recycler x3",
      "count": 3
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
      "name": "Oil Refinery x2",
      "count": 2
    },
    {
      "name": "Pump Jack",
      "count": 1
    },
    {
      "name": "Diesel Barrel x3",
      "count": 3
    }
  ],
  "vehicles": [],
  "cctv": "",
  "bpFrags": [
    {
      "name": "Blueprint fragments",
      "count": 3
    }
  ],
  "advBp": [],
  "guide": "https://youtu.be/FzJb9Vf_OGc?si=kPB1HnCRUxZmjRVf",
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
