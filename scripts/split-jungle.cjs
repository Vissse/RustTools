const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/lib/data/monuments-data');

const templateA = `import type { Monument } from '../../types';

export const JungleRuinsAMonument: Monument = {
  "id": "14",
  "name": "Jungle Ruins A",
  "subtitle": "Small",
  "tier": "T1/T2/T3",
  "cardsNeeded": [],
  "cardsFound": [],
  "utilities": [],
  "vehicles": [],
  "cctv": "",
  "bpFrags": [],
  "advBp": [],
  "features": {
    "isSafezone": false,
    "hasTunnelEntrance": false,
    "hasChinookDropZone": false,
    "allowsPatrolHeliCrash": false,
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
  },
  "spawns": [
    {
      "name": "loot barrel",
      "count": 3,
      "respawn": "30-36m",
      "variants": [
        { "name": "yellow loot barrel", "chance": "50%" },
        { "name": "blue loot barrel", "chance": "50%" }
      ]
    },
    {
      "name": "normal crate",
      "count": 3,
      "respawn": "30-36m",
      "variants": [
        { "name": "normal crate", "chance": "90%" },
        { "name": "military crate", "chance": "10%" }
      ]
    }
  ]
};
`;

const makeTemplate = (letter, id, utilities = []) => {
  return templateA
    .replace('JungleRuinsAMonument', `JungleRuins${letter}Monument`)
    .replace('"id": "14"', `"id": "${id}"`)
    .replace('"name": "Jungle Ruins A"', `"name": "Jungle Ruins ${letter}"`)
    .replace('"utilities": [],', `"utilities": ${JSON.stringify(utilities, null, 4)},`);
};

fs.writeFileSync(path.join(dir, 'jungle-ruins-a.ts'), templateA);

fs.writeFileSync(path.join(dir, 'jungle-ruins-b.ts'), makeTemplate('B', '39'));
fs.writeFileSync(path.join(dir, 'jungle-ruins-c.ts'), makeTemplate('C', '40'));
fs.writeFileSync(path.join(dir, 'jungle-ruins-d.ts'), makeTemplate('D', '41'));

const eUtils = [
  { "name": "Zipline Launch Point", "count": 1 },
  { "name": "Zipline Target Point", "count": 1 }
];
fs.writeFileSync(path.join(dir, 'jungle-ruins-e.ts'), makeTemplate('E', '42', eUtils));

// Update index.ts
let indexTs = fs.readFileSync(path.join(dir, 'index.ts'), 'utf-8');
indexTs = indexTs.replace("import { JungleRuinsMonument } from './jungle-ruins';", 
  `import { JungleRuinsAMonument } from './jungle-ruins-a';
import { JungleRuinsBMonument } from './jungle-ruins-b';
import { JungleRuinsCMonument } from './jungle-ruins-c';
import { JungleRuinsDMonument } from './jungle-ruins-d';
import { JungleRuinsEMonument } from './jungle-ruins-e';`
);

indexTs = indexTs.replace("  JungleRuinsMonument,",
  `  JungleRuinsAMonument,
  JungleRuinsBMonument,
  JungleRuinsCMonument,
  JungleRuinsDMonument,
  JungleRuinsEMonument,`
);
fs.writeFileSync(path.join(dir, 'index.ts'), indexTs);

if (fs.existsSync(path.join(dir, 'jungle-ruins.ts'))) {
  fs.unlinkSync(path.join(dir, 'jungle-ruins.ts'));
}

console.log("Done splitting.");
