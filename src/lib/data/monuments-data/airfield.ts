import type { Monument } from '../../types';

export const AirfieldMonument: Monument = {
  "id": "airfield",
  "name": "Airfield",
  "subtitle": null,
  "tier": "2",
  "features": {
    "isSafezone": false,
    "hasTunnelEntrance": true,
    "hasChinookDropZone": true,
    "allowsPatrolHeliCrash": true,
    "scientists": 3,
    "radiation": {
      "median": 11,
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
      "name": "Crate (Random)",
      "variants": [
        {
          "name": "Normal Crate",
          "chance": "60%"
        },
        {
          "name": "Military Crate",
          "chance": "40%"
        }
      ],
      "count": 18,
      "respawn": "30-36m"
    },
    {
      "name": "Crate (Random)",
      "variants": [
        {
          "name": "Normal Crate",
          "chance": "60%"
        },
        {
          "name": "Military Crate",
          "chance": "40%"
        }
      ],
      "count": 8,
      "respawn": "Never / Puzzle"
    },
    {
      "name": "Oil Barrel",
      "count": 6,
      "respawn": "15-20m"
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
      "respawn": "15-20m"
    },
    {
      "name": "Normal Crate - Cave",
      "count": 3,
      "respawn": "30-36m"
    },
    {
      "name": "Node (Random)",
      "variants": [
        {
          "name": "Stone Node",
          "chance": "45.5%"
        },
        {
          "name": "Metal Node",
          "chance": "27.3%"
        },
        {
          "name": "Sulfur Node",
          "chance": "27.3%"
        }
      ],
      "count": 5,
      "respawn": "30-36m"
    }
  ],
  "scientists": [
    {
      "name": "Airfield Scientist",
      "count": 3,
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
      "name": "Motorbike",
      "count": 3,
      "respawn": "Never / Puzzle"
    }
  ],
  "utilities": [
    {
      "name": "Light Switch",
      "count": 16
    },
    {
      "name": "Heat Source",
      "count": 5
    },
    {
      "name": "Zipline Target Point",
      "count": 4
    },
    {
      "name": "Sofa",
      "count": 3
    },
    {
      "name": "Green Recycler",
      "count": 2
    },
    {
      "name": "Telephone",
      "count": 1
    },
    {
      "name": "Repair Bench",
      "count": 1
    },
    {
      "name": "Research Table",
      "count": 1
    },
    {
      "name": "Small Oil Refinery",
      "count": 1
    },
    {
      "name": "Elevator",
      "count": 1
    }
  ],
  "cctv": "AIRFIELDHELIPAD",
  "puzzle": {
    "bring": [
      {
        "name": "Electric Fuse",
        "count": 2
      },
      {
        "name": "Green Keycard",
        "count": 1
      },
      {
        "name": "Blue Keycard",
        "count": 1
      }
    ],
    "activate": [
      {
        "name": "Timer",
        "count": 1
      }
    ],
    "rewards": [
      {
        "name": "Airfield Scientist",
        "count": 3
      },
      {
        "name": "Red Keycard",
        "count": 1
      },
      {
        "name": "Basic Blueprint Fragment",
        "count": 2
      },
      {
        "name": "Diesel Fuel",
        "count": 3
      },
      {
        "name": "Normal Crate",
        "count": 7
      },
      {
        "name": "Yellow Loot Barrel",
        "count": 1
      }
    ],
    "resetTime": "~30m"
  },
  "cardsNeeded": [],
  "cardsFound": [],
  "bpFrags": [],
  "advBp": []
};
