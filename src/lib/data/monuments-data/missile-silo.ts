import type { Monument } from '../../types';

export const MissileSiloMonument: Monument = {
  "id": "11",
  "name": "Missile Silo",
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
      "type": "red",
      "name": "red keycard",
      "logic": ""
    }
  ],
  "cardsFound": [],
  "utilities": [
    {
      "name": "Diesel Barrel x2",
      "count": 2
    }
  ],
  "vehicles": [],
  "cctv": "/rust/camera-codes#missile-silo",
  "bpFrags": [],
  "advBp": [
    {
      "name": "Advanced blueprint fragments",
      "count": 2
    }
  ],
  "guide": "https://youtu.be/lUPephY1j8U?si=wdM8CwrEuMfSLm_8",
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
