import type { Monument } from '../../types';

export const ApartmentComplexMonument: Monument = {
  "id": "23",
  "name": "Apartment Complex",
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
  "subtitle": "Rent rooms and shops",
  "tier": "Safe Zone",
  "cardsNeeded": [],
  "cardsFound": [],
  "utilities": [
    {
      "name": "Workbench Level 1",
      "count": 1
    },
    {
      "name": "Barbecue",
      "count": 1
    },
    {
      "name": "Vending Machine",
      "count": 1
    }
  ],
  "vehicles": [],
  "cctv": "",
  "bpFrags": [],
  "advBp": [],
  "guide": "https://www.youtube.com/watch?v=Lb0jzj2QUZk",
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
