import type { Monument } from '../../types';

export const MilitaryTunnelMonument: Monument = {
  "id": "05",
  "name": "Military Tunnel",
  "puzzle": {
    "bring": [
      {
        "name": "Electric Fuse",
        "count": 1
      },
      {
        "name": "Green keycard",
        "count": 1
      },
      {
        "name": "Blue keycard",
        "count": 1
      },
      {
        "name": "Red keycard",
        "count": 1
      }
    ],
    "activate": [
      {
        "name": "Timer",
        "count": 2
      },
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
        "name": "Advanced Blueprint Fragment",
        "count": 2
      },
      {
        "name": "Diesel Fuel",
        "count": 2
      },
      {
        "name": "Elite Crate",
        "count": 3
      },
      {
        "name": "Military Crate",
        "text": "50%",
        "count": 5
      },
      {
        "name": "Normal Crate",
        "text": "50%",
        "count": 5
      }
    ],
    "resetTime": "~30m"
  },
  "subtitle": null,
  "tier": "T3",
  "cardsNeeded": [],
  "cardsFound": [],
  "utilities": [
    {
      "name": "Hobo Barrel",
      "count": 2
    },
    {
      "name": "Toilet",
      "count": 1
    },
    {
      "name": "Elevator",
      "count": 1
    },
    {
      "name": "Recycler",
      "count": 1
    }
  ],
  "vehicles": [],
  "spawns": [
    {
      "name": "Stone Node",
      "count": 7,
      "respawn": "30-36m",
      "text": "45% / Metal 27% / Sulfur 27%"
    },
    {
      "name": "Roadsign",
      "count": 4,
      "respawn": "Never / Puzzle"
    }
  ],
  "collectibles": [
    {
      "name": "Diesel Fuel",
      "count": 3,
      "respawn": "Never / Puzzle"
    },
    {
      "name": "Advanced Blueprint Fragment",
      "count": 2,
      "respawn": "Never / Puzzle"
    }
  ],
  "guide": "",
  "cctv": "",
  "bpFrags": [],
  "advBp": [],
  "features": {
    "isSafezone": false,
    "hasTunnelEntrance": true,
    "hasChinookDropZone": false,
    "allowsPatrolHeliCrash": true,
    "scientists": 33,
    "radiation": {
      "median": 11,
      "max": 26
    }
  },
  "lootDetails": {
    "eliteCrates": 6,
    "militaryCrates": 10,
    "regularCrates": 2,
    "basicCrates": 0,
    "barrels": 14
  }
};
