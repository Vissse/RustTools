import type { Monument } from '../../types';

export const GhostShipsMonument: Monument = {
  "id": "37",
  "name": "Ghost Ships",
  "subtitle": null,
  "tier": "T3",
  "variants": ["A", "B", "C", "D"],
  "cardsNeeded": [],
  "cardsFound": [],
  "utilities": [
    { "name": "Sofa", "count": 1, "onlyInVariant": "A" },
    { "name": "Sofa", "count": 2, "onlyInVariant": "B" }
  ],
  "vehicles": [],
  "cctv": "",
  "bpFrags": [],
  "advBp": [],
  "scientists": [
    { "name": "Deep Sea Ghost Ship Scientist", "count": 6, "respawn": "Never / Puzzle" }
  ],
  "features": {
    "isSafezone": false,
    "hasTunnelEntrance": false,
    "hasChinookDropZone": false,
    "allowsPatrolHeliCrash": false,
    "scientists": 6,
    "radiation": { "median": 0, "max": 11 }
  },
  "lootDetails": {
    "militaryCrates": 0,
    "regularCrates": 0,
    "basicCrates": 0,
    "barrels": 0
  },
  "spawns": [
    // COMMON SPAWNS (All variants)
    { "name": "elite crate", "count": 2, "respawn": "Never / Puzzle" },
    { "name": "locked ghostship crate", "count": 1, "respawn": "Never / Puzzle", "variants": [{ "name": "locked ghostship crate", "chance": "25%" }] },

    // VARIANT A & B SPAWNS
    { "name": "normal crate", "count": 11, "respawn": "Never / Puzzle", "onlyInVariant": "A", "variants": [{ "name": "normal crate", "chance": "50%" }, { "name": "military crate", "chance": "50%" }] },
    { "name": "oil barrel", "count": 8, "respawn": "Never / Puzzle", "onlyInVariant": "A", "variants": [{ "name": "oil barrel", "chance": "80%" }, { "name": "loot barrel", "chance": "10%" }, { "name": "food crate", "chance": "10%" }] },
    { "name": "normal crate", "count": 4, "respawn": "30–60m", "onlyInVariant": "A", "variants": [{ "name": "normal crate", "chance": "50%" }, { "name": "military crate", "chance": "50%" }] },
    { "name": "oil barrel", "count": 3, "respawn": "30–60m", "onlyInVariant": "A", "variants": [{ "name": "oil barrel", "chance": "80%" }, { "name": "loot barrel", "chance": "10%" }, { "name": "food crate", "chance": "10%" }] },
    
    { "name": "normal crate", "count": 11, "respawn": "Never / Puzzle", "onlyInVariant": "B", "variants": [{ "name": "normal crate", "chance": "50%" }, { "name": "military crate", "chance": "50%" }] },
    { "name": "oil barrel", "count": 6, "respawn": "Never / Puzzle", "onlyInVariant": "B", "variants": [{ "name": "oil barrel", "chance": "80%" }, { "name": "loot barrel", "chance": "10%" }, { "name": "food crate", "chance": "10%" }] },
    { "name": "normal crate", "count": 4, "respawn": "30–60m", "onlyInVariant": "B", "variants": [{ "name": "normal crate", "chance": "50%" }, { "name": "military crate", "chance": "50%" }] },
    { "name": "oil barrel", "count": 2, "respawn": "30–60m", "onlyInVariant": "B", "variants": [{ "name": "oil barrel", "chance": "80%" }, { "name": "loot barrel", "chance": "10%" }, { "name": "food crate", "chance": "10%" }] },

    // VARIANT C & D SPAWNS
    { "name": "oil barrel", "count": 11, "respawn": "Never / Puzzle", "onlyInVariant": "C", "variants": [{ "name": "oil barrel", "chance": "80%" }, { "name": "loot barrel", "chance": "10%" }, { "name": "food crate", "chance": "10%" }] },
    { "name": "normal crate", "count": 11, "respawn": "Never / Puzzle", "onlyInVariant": "C", "variants": [{ "name": "normal crate", "chance": "50%" }, { "name": "military crate", "chance": "50%" }] },
    { "name": "oil barrel", "count": 4, "respawn": "30–60m", "onlyInVariant": "C", "variants": [{ "name": "oil barrel", "chance": "80%" }, { "name": "loot barrel", "chance": "10%" }, { "name": "food crate", "chance": "10%" }] },
    { "name": "normal crate", "count": 4, "respawn": "30–60m", "onlyInVariant": "C", "variants": [{ "name": "normal crate", "chance": "50%" }, { "name": "military crate", "chance": "50%" }] },

    { "name": "oil barrel", "count": 11, "respawn": "Never / Puzzle", "onlyInVariant": "D", "variants": [{ "name": "oil barrel", "chance": "80%" }, { "name": "loot barrel", "chance": "10%" }, { "name": "food crate", "chance": "10%" }] },
    { "name": "normal crate", "count": 11, "respawn": "Never / Puzzle", "onlyInVariant": "D", "variants": [{ "name": "normal crate", "chance": "50%" }, { "name": "military crate", "chance": "50%" }] },
    { "name": "oil barrel", "count": 4, "respawn": "30–60m", "onlyInVariant": "D", "variants": [{ "name": "oil barrel", "chance": "80%" }, { "name": "loot barrel", "chance": "10%" }, { "name": "food crate", "chance": "10%" }] },
    { "name": "normal crate", "count": 4, "respawn": "30–60m", "onlyInVariant": "D", "variants": [{ "name": "normal crate", "chance": "50%" }, { "name": "military crate", "chance": "50%" }] }
  ]
};

