import type { Monument } from '../../types';

export const ArcticResearchBaseMonument: Monument = {
  "id": "arctic-research-base",
  "name": "Arctic Research Base",
  "subtitle": null,
  "tier": "1/2/3",
  "features": {
    "isSafezone": false,
    "hasTunnelEntrance": false,
    "hasChinookDropZone": false,
    "allowsPatrolHeliCrash": true,
    "scientists": 10,
    "radiation": {
      "median": 3,
      "max": 11
    }
  },
  "lootDetails": {
    "militaryCrates": 0,
    "regularCrates": 0,
    "basicCrates": 0,
    "barrels": 0
  },
  "spawns": [
    {
      "name": "Loot Barrel (Random)",
      "variants": [
        {
          "name": "Blue Loot Barrel",
          "chance": "60%"
        },
        {
          "name": "Yellow Loot Barrel",
          "chance": "40%"
        }
      ],
      "count": 14,
      "respawn": "Never / Puzzle"
    },
    {
      "name": "Underwater Lab Crate (Random)",
      "variants": [
        {
          "name": "Underwater Lab - Normal Crate 1",
          "chance": "50%"
        },
        {
          "name": "Underwater Lab - Normal Crate 2",
          "chance": "50%"
        }
      ],
      "count": 6,
      "respawn": "Never / Puzzle"
    },
    {
      "name": "Loot Barrel (Random)",
      "variants": [
        {
          "name": "Yellow Loot Barrel",
          "chance": "50%"
        },
        {
          "name": "Blue Loot Barrel",
          "chance": "50%"
        }
      ],
      "count": 5,
      "respawn": "Never / Puzzle"
    },
    {
      "name": "Barrel (Random)",
      "variants": [
        {
          "name": "Oil Barrel",
          "chance": "88.2%"
        },
        {
          "name": "Yellow Loot Barrel",
          "chance": "5.9%"
        },
        {
          "name": "Blue Loot Barrel",
          "chance": "5.9%"
        }
      ],
      "count": 5,
      "respawn": "Never / Puzzle"
    },
    {
      "name": "Underwater Lab Tech/Ammo (Random)",
      "variants": [
        {
          "name": "Underwater Lab - Tier 3 Components",
          "chance": "50%"
        },
        {
          "name": "Underwater Lab - Ammunition Crate",
          "chance": "50%"
        }
      ],
      "count": 5,
      "respawn": "Never / Puzzle"
    },
    {
      "name": "Underwater Lab - Food Crate 1",
      "count": 4,
      "respawn": "Never / Puzzle"
    },
    {
      "name": "Underwater Lab - Fuel Crate",
      "count": 4,
      "respawn": "Never / Puzzle"
    },
    {
      "name": "Crate (Random)",
      "variants": [
        {
          "name": "Normal Crate",
          "chance": "50%"
        },
        {
          "name": "Military Crate",
          "chance": "50%"
        }
      ],
      "count": 4,
      "respawn": "Never / Puzzle"
    }
  ],
  "scientists": [
    {
      "name": "Arctic Research Base Scientist",
      "count": 10,
      "respawn": "Never / Puzzle"
    }
  ],
  "collectibles": [
    {
      "name": "Basic Blueprint Fragment",
      "count": 2,
      "respawn": "Never / Puzzle"
    },
    {
      "name": "Red Keycard",
      "count": 1,
      "respawn": "Never / Puzzle"
    }
  ],
  "vehicles": [
    {
      "name": "Snowmobile",
      "count": 1,
      "respawn": "Never / Puzzle"
    }
  ],
  "utilities": [
    {
      "name": "Heat Source",
      "count": 25
    },
    {
      "name": "Light Switch",
      "count": 11
    },
    {
      "name": "Zipline Target Point",
      "count": 2
    },
    {
      "name": "Sofa",
      "count": 1
    },
    {
      "name": "Toilet",
      "count": 1
    },
    {
      "name": "Green Recycler",
      "count": 1
    }
  ],
  "cctv": "",
  "puzzle": {
    "bring": [
      {
        "name": "Blue Keycard",
        "count": 2
      }
    ],
    "activate": [],
    "rewards": [
      {
        "name": "Red Keycard",
        "count": 1
      },
      {
        "name": "Basic Blueprint Fragment",
        "count": 2
      },
      {
        "name": "Military Crate / Normal Crate",
        "count": 4
      },
      {
        "name": "Snowmobile",
        "count": 1
      }
    ],
    "resetTime": "~30m / ~0m"
  },
  "cardsNeeded": [],
  "cardsFound": [],
  "bpFrags": [],
  "advBp": []
};
