import type { Monument } from '../../types';

export const AbandonedSupermarketMonument: Monument = {
  "id": "01",
  "name": "Abandoned Supermarket",
  "subtitle": null,
  "tier": "T1/T2/T3",
  "cardsNeeded": [],
  "cardsFound": [
    {
      "type": "green",
      "name": "green keycard",
      "logic": ""
    }
  ],
  "utilities": [
    {
      "name": "Light Switch",
      "count": 2
    },
    {
      "name": "Zipline Target Point",
      "count": 2
    },
    {
      "name": "Telephone",
      "count": 1
    },
    {
      "name": "Hobo Barrel",
      "count": 1
    },
    {
      "name": "Recycler",
      "count": 1
    }
  ],
  "collectibles": [
    {
      "name": "Green keycard",
      "count": 1,
      "respawn": "Never / Puzzle"
    }
  ],
  "vehicles": [
    {
      "name": "Bicycle",
      "count": 1,
      "respawn": "Never / Puzzle"
    },
    {
      "name": "Motorbike",
      "count": 1,
      "respawn": "Never / Puzzle"
    }
  ],
  "cctv": "",
  "bpFrags": [],
  "advBp": [],
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
  "spawns": [
    {
      "name": "Crate (Random)",
      "count": 5,
      "respawn": "30-36m",
      "onlyInTier": "1",
      "variants": [
        {
          "name": "Basic Crate",
          "chance": "50%"
        },
        {
          "name": "Normal Crate",
          "chance": "45%"
        },
        {
          "name": "Military Crate",
          "chance": "5%"
        }
      ]
    },
    {
      "name": "Crate (Random)",
      "count": 5,
      "respawn": "30-36m",
      "onlyInTier": "2",
      "variants": [
        {
          "name": "Normal Crate",
          "chance": "95%"
        },
        {
          "name": "Military Crate",
          "chance": "5%"
        }
      ]
    },
    {
      "name": "Crate (Random)",
      "count": 5,
      "respawn": "30-36m",
      "onlyInTier": "3",
      "variants": [
        {
          "name": "Normal Crate",
          "chance": "90%"
        },
        {
          "name": "Military Crate",
          "chance": "10%"
        }
      ]
    },
    {
      "name": "Foodbox",
      "count": 5,
      "respawn": "30-36m"
    },
    {
      "name": "Loot Barrel (Random)",
      "count": 3,
      "respawn": "30-36m",
      "variants": [
        {
          "name": "Yellow Loot Barrel",
          "chance": "50%"
        },
        {
          "name": "Blue Loot Barrel",
          "chance": "50%"
        }
      ]
    },
    {
      "name": "Vehicle Parts",
      "count": 2,
      "respawn": "30-36m"
    },
    {
      "name": "Military Crate",
      "count": 1,
      "respawn": "Never / Puzzle"
    }
  ],
  "lootDetails": {
    "militaryCrates": 0,
    "regularCrates": 0,
    "basicCrates": 0,
    "barrels": 0
  }
};
