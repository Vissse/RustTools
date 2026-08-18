import type { Monument } from '../../types';

export const GiantExcavatorPitMonument: Monument = {
  "id": "03",
  "name": "Giant Excavator Pit",
  "subtitle": null,
  "tier": "T1/T2/T3",
  "cardsNeeded": [],
  "cardsFound": [],
  "utilities": [
    { "name": "Zipline Target Point", "count": 3 },
    { "name": "Sofa", "count": 1 },
    { "name": "Elevator", "count": 1 },
    { "name": "Green Recycler", "count": 1 },
    { "name": "Supply Drop Signal Computer", "count": 1 }
  ],
  "vehicles": [],
  "cctv": "",
  "bpFrags": [],
  "advBp": [],
  "scientists": [
    { "name": "Excavator Scientist", "count": 18, "respawn": "Never / Puzzle" }
  ],
  "features": {
    "isSafezone": false,
    "hasTunnelEntrance": true,
    "hasChinookDropZone": false,
    "allowsPatrolHeliCrash": true,
    "scientists": 18,
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
      "name": "basic crate",
      "count": 10,
      "respawn": "15-30m",
      "variants": [
        { "name": "basic crate", "chance": "50%" },
        { "name": "normal crate", "chance": "35%" },
        { "name": "military crate", "chance": "15%" }
      ]
    },
    {
      "name": "foodbox",
      "count": 5,
      "respawn": "30-36m"
    },
    {
      "name": "normal crate - cave",
      "count": 3,
      "respawn": "30-36m",
      "variants": [
        { "name": "normal crate - cave", "chance": "60%" },
        { "name": "basic crate", "chance": "40%" }
      ]
    },
  ],
  "mining": [
    {
      "input": { "name": "diesel fuel", "count": 1 },
      "time": "2m",
      "outputs": [
        { "name": "stones", "count": 10000, "chance": "×10,000" },
        { "name": "metal fragments", "count": 5000, "chance": "×5,000" },
        { "name": "sulfur ore", "count": 2000, "chance": "×2,000" },
        { "name": "hqm ore", "count": 100, "chance": "×100" }
      ]
    }
  ]
};
