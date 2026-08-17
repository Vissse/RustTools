// Validates the raid calculator's data and solver against each other.
//
// Why this exists: the calculator used to carry TWO damage datasets — a table in
// structures.ts keyed by material tier, and the per-structure raid-data-*.ts files
// — and they disagreed for 114 of 182 structure/explosive pairs. A Sheet Metal
// Door was quoted at 100 explosive ammo instead of 63. The tier table is gone and
// the raid-data files are now the single source of truth; this script is what
// keeps them honest.
//
// Node 24 strips TypeScript natively, so this runs with no test framework and no
// dependency. Imports need explicit .ts extensions; the raid-data modules are
// imported directly because Node ESM can't resolve index.ts's extensionless
// dynamic imports (the loader map's completeness is a typecheck concern instead).
//
//   node scripts/verify-raid-data.mjs

import { readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import {
  STRUCTURES,
  EXPLOSIVES,
} from "../src/lib/data/raid-data/structures.ts";
import {
  EXPLOSIVE_ROW,
  buildDamageMap,
  rowsForQuotedSide,
} from "../src/lib/data/raid-data/explosive-rows.ts";
import { RAID_TOOL_NAMES } from "../src/lib/data/raid-data/raid-tool-names.ts";
import { bestCombo, comboTotal } from "../src/lib/raid-solver.ts";

const DATA_DIR = join(
  dirname(fileURLToPath(import.meta.url)),
  "../src/lib/data/raid-data",
);

/** Structures whose data is known-wrong and awaiting verified numbers. */
const KNOWN_BAD = new Set(["Strengthened Glass Window", "Metal Barricade"]);

/**
 * Structures that legitimately share a table: same HP, same tier, so identical
 * numbers are correct rather than a copy-paste slip.
 */
const LEGIT_DUPLICATES = [
  ["Sheet Metal Door", "Sheet Metal Double Door", "Ladder Hatch"],
  ["Wooden Door", "Wood Double Door"],
  ["Metal Window Bars", "Reinforced Glass Window"],
  ["Metal Horizontal Embrasure", "Metal Vertical Embrasure"],
  ["Armored Door", "Armored Double Door"],
];

/**
 * Hard-side quantities verified against an EXTERNAL source, Aug 2026: rustlabs
 * (rustlabs.com now redirects to wiki.rustclash.com) and rustly, which agreed
 * with rustlabs on every structure where both could be read.
 *
 * This table exists because no internal check can catch a wrong ROW being
 * selected. Explosive 5.56 has one row per weapon — each round adds that gun's
 * own projectile damage — and every one of those rows is internally consistent.
 * Mapping to the Assault Rifle row instead of the Semi-Automatic Rifle row that
 * rustlabs treats as canonical passed every other check in this file while
 * quoting 182 for a Stone Wall where every published chart says 185.
 *
 * Only add numbers from a source that publishes a complete per-structure table
 * with no "approximate" disclaimer. rustly's deployable and external-wall pages
 * carry one and are visibly wrong (they list 4 C4 for a 500 HP High External
 * Stone Wall, which is Metal Wall's number, and 8 satchels for Metal Window Bars
 * where the metal-tier satchel damage of 43.5 requires 12). Those structures are
 * covered by DAMAGE_SNAPSHOT below instead.
 */
const GROUND_TRUTH = {
  "Wooden Wall": { C4: 1, Rocket: 2, "Explosive 5.56 Rifle Ammo": 49, "High Velocity Rocket": 9, Satchel: 3, "Beancan Grenade": 13, "F1 Grenade": 59 },
  "Stone Wall": { C4: 2, Rocket: 4, "Explosive 5.56 Rifle Ammo": 185, "High Velocity Rocket": 32, Satchel: 10, "Beancan Grenade": 46, "F1 Grenade": 182 },
  "Metal Wall": { C4: 4, Rocket: 8, "Explosive 5.56 Rifle Ammo": 400, "High Velocity Rocket": 67, Satchel: 23, "Beancan Grenade": 112, "F1 Grenade": 993 },
  "Armored Wall": { C4: 8, Rocket: 15, "Explosive 5.56 Rifle Ammo": 799, Satchel: 46 },
  "Wooden Door": { C4: 1, Rocket: 1, "Explosive 5.56 Rifle Ammo": 19, "High Velocity Rocket": 4, Satchel: 2, "Beancan Grenade": 6, "F1 Grenade": 23 },
  "Sheet Metal Door": { C4: 1, Rocket: 2, "Explosive 5.56 Rifle Ammo": 63, "High Velocity Rocket": 11, Satchel: 4, "Beancan Grenade": 18, "F1 Grenade": 50 },
  "Sheet Metal Double Door": { C4: 1, Rocket: 2, "Explosive 5.56 Rifle Ammo": 63, Satchel: 4 },
  "Armored Door": { C4: 3, Rocket: 5, "Explosive 5.56 Rifle Ammo": 250, Satchel: 15 },
  "Armored Double Door": { C4: 3, Rocket: 5, "Explosive 5.56 Rifle Ammo": 250, "High Velocity Rocket": 42, Satchel: 15, "Beancan Grenade": 69, "F1 Grenade": 200 },
  "Garage Door": { C4: 2, Rocket: 3, "Explosive 5.56 Rifle Ammo": 150, "High Velocity Rocket": 25, Satchel: 9, "Beancan Grenade": 42, "F1 Grenade": 120 },
  // rustly's ladder-hatch page is flagged approximate and states 200 HP, but its
  // explosive counts are the 250 HP metal-door set and match ours. Taking only
  // the three it agrees on.
  "Ladder Hatch": { C4: 1, Rocket: 2, Satchel: 4 },
  "Tool Cupboard": { C4: 1, Rocket: 1, "Explosive 5.56 Rifle Ammo": 10, Satchel: 1 },
};

/**
 * Every (structure, explosive) pair the calculator can quote, locked to its
 * current [damage, quantity]. Hard side, i.e. exactly what buildDamageMap returns.
 *
 * This is a regression lock, NOT a claim of correctness — unlike GROUND_TRUTH,
 * nothing here was checked against Rust. Its job is to make any change to the
 * numbers the site publishes deliberate and reviewable, including for the 14
 * structures no trustworthy external source covers. If you edit a raid-data file
 * or the EXPLOSIVE_ROW mapping, this fails and you update it in the same commit.
 *
 * Regenerate with: node scripts/verify-raid-data.mjs --print-snapshot
 */
const DAMAGE_SNAPSHOT = {
  "Wooden Wall": { "C4": [495, 1], "Rocket": [247.65, 2], "Explosive 5.56 Rifle Ammo": [5.1072, 49], "High Velocity Rocket": [29.25, 9], "F1 Grenade": [4.25, 59], "Beancan Grenade": [19.5, 13], "Satchel": [91.5, 3] },
  "Stone Wall": { "C4": [275, 2], "Rocket": [137.65, 4], "Explosive 5.56 Rifle Ammo": [2.704, 185], "High Velocity Rocket": [15.75, 32], "F1 Grenade": [2.75, 182], "Beancan Grenade": [11, 46], "Satchel": [51.5, 10] },
  "Metal Wall": { "C4": [275, 4], "Rocket": [137.575, 8], "Explosive 5.56 Rifle Ammo": [2.506, 400], "High Velocity Rocket": [15.0075, 67], "F1 Grenade": [1.0075, 993], "Beancan Grenade": [9, 112], "Satchel": [43.5, 23] },
  "Armored Wall": { "C4": [275, 8], "Rocket": [137.575, 15], "Explosive 5.56 Rifle Ammo": [2.506, 799], "High Velocity Rocket": [15.0075, 134], "F1 Grenade": [1.0075, 1986], "Beancan Grenade": [9, 223], "Satchel": [43.5, 46] },
  "Wooden Door": { "C4": [1100, 1], "Rocket": [550.375, 1], "Explosive 5.56 Rifle Ammo": [11.016, 19], "High Velocity Rocket": [63.75, 4], "F1 Grenade": [8.75, 23], "Beancan Grenade": [35, 6], "Satchel": [170, 2] },
  "Sheet Metal Door": { "C4": [440, 1], "Rocket": [220.375, 2], "Explosive 5.56 Rifle Ammo": [4.0064, 63], "High Velocity Rocket": [24, 11], "F1 Grenade": [5, 50], "Beancan Grenade": [14.5, 18], "Satchel": [70, 4] },
  "Armored Door": { "C4": [440, 3], "Rocket": [220.375, 5], "Explosive 5.56 Rifle Ammo": [4.0064, 250], "High Velocity Rocket": [24, 42], "F1 Grenade": [5, 200], "Beancan Grenade": [14.5, 69], "Satchel": [70, 15] },
  "Wood Double Door": { "C4": [1100, 1], "Rocket": [550.375, 1], "Explosive 5.56 Rifle Ammo": [11.016, 19], "High Velocity Rocket": [63.75, 4], "F1 Grenade": [8.75, 23], "Beancan Grenade": [35, 6], "Satchel": [170, 2] },
  "Sheet Metal Double Door": { "C4": [440, 1], "Rocket": [220.375, 2], "Explosive 5.56 Rifle Ammo": [4.0064, 63], "High Velocity Rocket": [24, 11], "F1 Grenade": [5, 50], "Beancan Grenade": [14.5, 18], "Satchel": [70, 4] },
  "Armored Double Door": { "C4": [440, 3], "Rocket": [220.375, 5], "Explosive 5.56 Rifle Ammo": [4.0064, 250], "High Velocity Rocket": [24, 42], "F1 Grenade": [5, 200], "Beancan Grenade": [14.5, 69], "Satchel": [70, 15] },
  "Garage Door": { "C4": [440, 2], "Rocket": [220.375, 3], "Explosive 5.56 Rifle Ammo": [4.0064, 150], "High Velocity Rocket": [24, 25], "F1 Grenade": [5, 120], "Beancan Grenade": [14.5, 42], "Satchel": [70, 9] },
  "Ladder Hatch": { "C4": [440, 1], "Rocket": [220.375, 2], "Explosive 5.56 Rifle Ammo": [4.0064, 63], "High Velocity Rocket": [24, 11], "F1 Grenade": [5, 50], "Beancan Grenade": [14.5, 18], "Satchel": [70, 4] },
  "Armored Ladder Hatch": { "C4": [440, 3], "Rocket": [220.375, 5], "Explosive 5.56 Rifle Ammo": [4.0064, 250], "High Velocity Rocket": [24, 42], "F1 Grenade": [5, 200], "Beancan Grenade": [14.5, 69], "Satchel": [70, 15] },
  "Metal Shop Front": { "C4": [275, 3], "Rocket": [137.575, 6], "Explosive 5.56 Rifle Ammo": [2.506, 300], "High Velocity Rocket": [15.0075, 50], "Satchel": [43.5, 18] },
  "Metal Window Bars": { "C4": [275, 2], "Rocket": [137.575, 4], "Explosive 5.56 Rifle Ammo": [2.506, 200], "High Velocity Rocket": [15.0075, 34], "F1 Grenade": [1.0075, 497], "Beancan Grenade": [9, 56], "Satchel": [43.5, 12] },
  "Wooden Window Bars": { "C4": [495, 1], "Rocket": [247.65, 2], "Explosive 5.56 Rifle Ammo": [5.1072, 49], "High Velocity Rocket": [29.25, 9], "F1 Grenade": [4.25, 59], "Beancan Grenade": [19.5, 13], "Satchel": [91.5, 3] },
  "Reinforced Glass Window": { "C4": [275, 2], "Rocket": [137.575, 4], "Explosive 5.56 Rifle Ammo": [2.506, 200], "High Velocity Rocket": [15.0075, 34], "F1 Grenade": [1.0075, 497], "Beancan Grenade": [9, 56], "Satchel": [43.5, 12] },
  "Strengthened Glass Window": { "C4": [495, 2], "Rocket": [247.65, 3], "Explosive 5.56 Rifle Ammo": [5.1072, 98], "High Velocity Rocket": [29.25, 18], "F1 Grenade": [4.25, 118], "Beancan Grenade": [19.5, 26], "Satchel": [91.5, 6] },
  "Metal Horizontal Embrasure": { "C4": [275, 2], "Rocket": [138.25, 4], "Explosive 5.56 Rifle Ammo": [2.904, 173], "High Velocity Rocket": [16.5, 31], "F1 Grenade": [1.75, 286], "Beancan Grenade": [8.5, 59], "Satchel": [41.5, 13] },
  "Metal Vertical Embrasure": { "C4": [275, 2], "Rocket": [138.25, 4], "Explosive 5.56 Rifle Ammo": [2.904, 173], "High Velocity Rocket": [16.5, 31], "F1 Grenade": [1.75, 286], "Beancan Grenade": [8.5, 59], "Satchel": [41.5, 13] },
  "High External Wooden Wall": { "C4": [495, 2], "Rocket": [247.65, 3], "Explosive 5.56 Rifle Ammo": [5.1072, 98], "High Velocity Rocket": [29.25, 18], "F1 Grenade": [4.25, 118], "Beancan Grenade": [19.5, 26], "Satchel": [91.5, 6] },
  "High External Stone Wall": { "C4": [275, 2], "Rocket": [137.65, 4], "Explosive 5.56 Rifle Ammo": [2.704, 185], "High Velocity Rocket": [15.75, 32], "F1 Grenade": [2.75, 182], "Beancan Grenade": [11, 46], "Satchel": [51.5, 10] },
  "High External Wooden Gate": { "C4": [495, 2], "Rocket": [247.65, 3], "Explosive 5.56 Rifle Ammo": [5.1072, 98], "High Velocity Rocket": [29.25, 18], "F1 Grenade": [4.25, 118], "Beancan Grenade": [19.5, 26], "Satchel": [91.5, 6] },
  "High External Stone Gate": { "C4": [275, 2], "Rocket": [137.65, 4], "Explosive 5.56 Rifle Ammo": [2.704, 185], "High Velocity Rocket": [15.75, 32], "F1 Grenade": [2.75, 182], "Beancan Grenade": [11, 46], "Satchel": [51.5, 10] },
  "Metal Barricade": { "C4": [1100, 1], "Rocket": [275.75, 3], "Explosive 5.56 Rifle Ammo": [5.408, 111], "High Velocity Rocket": [31.5, 20], "Satchel": [158, 4] },
  "Tool Cupboard": { "C4": [2200, 1], "Rocket": [550.375, 1], "Explosive 5.56 Rifle Ammo": [11.016, 10], "High Velocity Rocket": [63.75, 2], "Satchel": [322, 1] },
};

const failures = [];
const warnings = [];
const fail = (msg) => failures.push(msg);
const warn = (msg) => warnings.push(msg);

const slug = (name) =>
  "raid-data-" + name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + ".ts";

// Load every structure's rows up front.
const rowsByStructure = new Map();
for (const name of Object.keys(STRUCTURES)) {
  const { pathToFileURL } = await import('node:url');
  const mod = await import(pathToFileURL(join(DATA_DIR, slug(name))).href);
  const exported = Object.values(mod).find(Array.isArray);
  if (!exported || exported.length === 0) {
    fail(`${name}: ${slug(name)} exports no non-empty RaidItem[]`);
    continue;
  }
  rowsByStructure.set(name, exported);
}

// ---------------------------------------------------------------- 1. mapping
{
  const toolNames = new Set(RAID_TOOL_NAMES);
  for (const [exp, row] of Object.entries(EXPLOSIVE_ROW)) {
    if (!toolNames.has(row))
      fail(`EXPLOSIVE_ROW['${exp}'] -> '${row}' is not in RAID_TOOL_NAMES`);
  }
  for (const e of EXPLOSIVES) {
    if (!(e.name in EXPLOSIVE_ROW))
      fail(`EXPLOSIVES entry '${e.name}' has no EXPLOSIVE_ROW mapping`);
  }
}

// --------------------------------------------------------------- 2. coverage
{
  const dataFiles = new Set(
    readdirSync(DATA_DIR).filter(
      (f) => f.startsWith("raid-data-") && f.endsWith(".ts"),
    ),
  );
  const expected = new Set(Object.keys(STRUCTURES).map(slug));
  for (const f of dataFiles)
    if (!expected.has(f)) warn(`orphan data file with no STRUCTURES entry: ${f}`);
  for (const f of expected)
    if (!dataFiles.has(f)) fail(`missing data file: ${f}`);
}

// ------------------------------------------------------- 3. data internally consistent
// quantity must equal ceil(hp / damage). This is the check that caught all three
// corrupt files (armored-double-door, strengthened-glass-window, metal-barricade).
for (const [name, { hp }] of Object.entries(STRUCTURES)) {
  const rows = rowsByStructure.get(name);
  if (!rows) continue;
  for (const [exp, rowName] of Object.entries(EXPLOSIVE_ROW)) {
    for (const row of rows.filter((r) => r.name === rowName)) {
      const expected = Math.ceil(hp / row.damage);
      if (row.quantity !== expected) {
        const msg = `${name} / ${exp} (${row.side}): quantity ${row.quantity} but ceil(${hp} / ${row.damage}) = ${expected}`;
        KNOWN_BAD.has(name) ? warn(`[known-bad] ${msg}`) : fail(msg);
      }
    }
  }
}

// ------------------------------------------------- 4. solver reproduces the data
// The headline invariant: one explosive selected must return the data file's own
// count. This is what makes /raid?s=Sheet+Metal+Door&e=Explosive+5.56... say 63.
const missingPairs = [];
for (const [name, { hp }] of Object.entries(STRUCTURES)) {
  const rows = rowsByStructure.get(name);
  if (!rows) continue;
  const map = buildDamageMap(rowsForQuotedSide(rows));

  for (const e of EXPLOSIVES) {
    const entry = map.get(e.name);
    if (!entry) {
      missingPairs.push(`${name} / ${e.name}`);
      continue;
    }
    for (const mode of ["cheapest", "fastest"]) {
      const combo = bestCombo(hp, map, [e], mode);
      if (combo.length !== 1 || combo[0].qty !== entry.quantity) {
        const got = combo.length === 1 ? combo[0].qty : `${combo.length} lines`;
        const msg = `${name} / ${e.name} (${mode}): solver says ${got}, data says ${entry.quantity}`;
        KNOWN_BAD.has(name) ? warn(`[known-bad] ${msg}`) : fail(msg);
      }
    }
  }
}

// ------------------------------------------ 4b. solver matches published charts
for (const [name, expected] of Object.entries(GROUND_TRUTH)) {
  const rows = rowsByStructure.get(name);
  if (!rows) {
    fail(`GROUND_TRUTH names '${name}', which has no data`);
    continue;
  }
  const map = buildDamageMap(rowsForQuotedSide(rows));
  for (const [expName, want] of Object.entries(expected)) {
    const e = EXPLOSIVES.find((x) => x.name === expName);
    if (!e) {
      fail(`GROUND_TRUTH['${name}'] names unknown explosive '${expName}'`);
      continue;
    }
    const combo = bestCombo(STRUCTURES[name].hp, map, [e], "cheapest");
    const got = combo[0]?.qty;
    if (got !== want)
      fail(`${name} / ${expName}: solver says ${got}, rustlabs says ${want}`);
  }
}

// ------------------------------- 4c. nothing changed without someone deciding to
{
  const printing = process.argv.includes("--print-snapshot");
  const lines = [];
  for (const name of Object.keys(STRUCTURES)) {
    const rows = rowsByStructure.get(name);
    if (!rows) continue;
    const map = buildDamageMap(rowsForQuotedSide(rows));
    const expected = DAMAGE_SNAPSHOT[name];

    if (printing) {
      const parts = EXPLOSIVES.filter((e) => map.has(e.name)).map((e) => {
        const d = map.get(e.name);
        return `${JSON.stringify(e.name)}: [${d.damage}, ${d.quantity}]`;
      });
      lines.push(`  ${JSON.stringify(name)}: { ${parts.join(", ")} },`);
      continue;
    }

    if (!expected) {
      fail(`${name}: no DAMAGE_SNAPSHOT entry — regenerate with --print-snapshot`);
      continue;
    }
    for (const e of EXPLOSIVES) {
      const got = map.get(e.name);
      const want = expected[e.name];
      if (!got && !want) continue;
      if (!got) {
        fail(`${name} / ${e.name}: snapshot expects [${want}], data now has no row`);
      } else if (!want) {
        fail(`${name} / ${e.name}: new row [${got.damage}, ${got.quantity}] not in snapshot`);
      } else if (got.damage !== want[0] || got.quantity !== want[1]) {
        fail(
          `${name} / ${e.name}: [${got.damage}, ${got.quantity}] but snapshot says [${want[0]}, ${want[1]}]`,
        );
      }
    }
  }
  for (const name of Object.keys(DAMAGE_SNAPSHOT))
    if (!(name in STRUCTURES))
      fail(`DAMAGE_SNAPSHOT has '${name}', which is not a structure`);

  if (printing) {
    console.log("const DAMAGE_SNAPSHOT = {");
    console.log(lines.join("\n"));
    console.log("};");
    process.exit(0);
  }
}

// --------------------------------------------- 5. multi-explosive combos hold up
let slowest = { ms: 0, label: "-" };
for (const [name, { hp }] of Object.entries(STRUCTURES)) {
  const rows = rowsByStructure.get(name);
  if (!rows) continue;
  // Known-bad data makes every combo invariant fail for uninteresting reasons
  // (quantities don't match the HP), which would drown out real regressions.
  // Section 3 already reports these structures in detail.
  if (KNOWN_BAD.has(name)) continue;
  const map = buildDamageMap(rowsForQuotedSide(rows));
  const available = EXPLOSIVES.filter((e) => map.has(e.name));

  for (let mask = 1; mask < 1 << available.length; mask++) {
    const subset = available.filter((_, i) => mask & (1 << i));

    for (const mode of ["cheapest", "fastest"]) {
      const started = performance.now();
      const combo = bestCombo(hp, map, subset, mode);
      const ms = performance.now() - started;
      if (ms > slowest.ms)
        slowest = { ms, label: `${name} / ${subset.length} exps / ${mode}` };

      const label = `${name} / [${subset.map((e) => e.name).join(", ")}] / ${mode}`;
      if (combo.length === 0) {
        fail(`${label}: no combo found`);
        continue;
      }

      const damage = combo.reduce(
        (sum, c) => sum + map.get(c.exp.name).damage * c.qty,
        0,
      );
      if (damage < hp)
        fail(`${label}: deals ${damage.toFixed(2)} vs ${hp} HP — does not destroy`);

      // Minimal: dropping any single unit must fall short.
      for (const c of combo) {
        if (damage - map.get(c.exp.name).damage >= hp)
          fail(`${label}: one ${c.exp.name} too many`);
      }

      // Never worse than just spamming the best single explosive in the subset.
      const bestSingle = Math.min(
        ...subset.map((e) => map.get(e.name).quantity * e.cost.s),
      );
      const sulfur = comboTotal(combo, "totalSulfur");
      if (mode === "cheapest" && sulfur > bestSingle)
        fail(
          `${label}: ${sulfur} sulfur, worse than the best single explosive (${bestSingle})`,
        );

      // Deterministic: the comparator must be a strict total order.
      const again = bestCombo(hp, map, subset, mode);
      if (JSON.stringify(again.map((c) => [c.exp.name, c.qty])) !==
          JSON.stringify(combo.map((c) => [c.exp.name, c.qty])))
        fail(`${label}: not deterministic`);
    }
  }
}

// ------------------------------------------------------ 6. brute-force cross-check
// Independent exhaustive search on the small structures. Catches domination-logic
// errors in the DP that the invariants above would happily accept.
for (const name of ["Tool Cupboard", "Wooden Door", "Sheet Metal Door"]) {
  const rows = rowsByStructure.get(name);
  if (!rows) continue;
  const { hp } = STRUCTURES[name];
  const map = buildDamageMap(rowsForQuotedSide(rows));
  const available = EXPLOSIVES.filter((e) => map.has(e.name));

  for (let mask = 1; mask < 1 << available.length; mask++) {
    const subset = available.filter((_, i) => mask & (1 << i));
    if (subset.length > 3) continue; // exhaustive search stays tractable

    const caps = subset.map((e) => map.get(e.name).quantity);
    let bruteSulfur = Infinity;
    const walk = (i, damage, sulfur) => {
      if (sulfur >= bruteSulfur) return;
      if (damage >= hp) {
        bruteSulfur = sulfur;
        return;
      }
      if (i === subset.length) return;
      for (let n = 0; n <= caps[i]; n++) {
        walk(
          i + 1,
          damage + map.get(subset[i].name).damage * n,
          sulfur + subset[i].cost.s * n,
        );
      }
    };
    walk(0, 0, 0);

    const dpSulfur = comboTotal(bestCombo(hp, map, subset, "cheapest"), "totalSulfur");
    if (dpSulfur !== bruteSulfur)
      fail(
        `${name} / [${subset.map((e) => e.name).join(", ")}]: DP ${dpSulfur} sulfur, brute force ${bruteSulfur}`,
      );
  }
}

// ------------------------------------------------------------ 7. duplicate payloads
{
  const payload = (rows) =>
    rows
      .map((r) => `${r.name}|${r.category}|${r.side}|${r.damage}|${r.quantity}`)
      .join("\n");
  const groups = new Map();
  for (const [name, rows] of rowsByStructure) {
    const key = payload(rows);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(name);
  }
  for (const names of groups.values()) {
    if (names.length < 2) continue;
    const known = LEGIT_DUPLICATES.some(
      (g) => names.every((n) => g.includes(n)) && names.length <= g.length,
    );
    if (known) continue;
    const msg = `structures share an identical table but are not known duplicates: ${names.join(" == ")} — likely a copy-paste`;
    names.some((n) => KNOWN_BAD.has(n)) ? warn(`[known-bad] ${msg}`) : fail(msg);
  }
}

// -------------------------------------------------------------------- report
if (missingPairs.length)
  warn(`no data row for ${missingPairs.length} pair(s): ${missingPairs.join(", ")}`);
if (slowest.ms > 250)
  fail(`slowest solve took ${slowest.ms.toFixed(0)}ms (${slowest.label})`);

console.log(
  `raid data: ${rowsByStructure.size} structures x ${EXPLOSIVES.length} explosives`,
);
console.log(`slowest solve: ${slowest.ms.toFixed(1)}ms (${slowest.label})`);

for (const w of warnings) console.warn(`  warn  ${w}`);
for (const f of failures) console.error(`  FAIL  ${f}`);

if (failures.length) {
  console.error(`\n${failures.length} failure(s).`);
  process.exit(1);
}
console.log(`\nOK — ${warnings.length} warning(s), no failures.`);
