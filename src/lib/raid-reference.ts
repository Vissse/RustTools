/**
 * The static raid cost table rendered under the calculator.
 *
 * The calculator itself is a client component behind a Suspense boundary, so
 * none of its numbers exist in the HTML a crawler — or an answer engine that
 * doesn't run JavaScript — receives. This module rebuilds the same answers on
 * the server at build time, from the same data and the same solver, so the page
 * *contains* the raid costs instead of merely offering to compute them.
 *
 * Nothing here is a second source of truth: the per-explosive counts are taken
 * verbatim from each structure's raid-data file (the field the tool quotes), and
 * the cheapest combo comes from bestCombo(). If the data changes, both the tool
 * and this table change with it.
 */
import { bestCombo, comboTotal } from "./raid-solver";
import {
  STRUCTURES,
  EXPLOSIVES,
  buildDamageMap,
  loadRaidDataForStructure,
  type StructureName,
  type ExplosiveName,
  type DamageMap,
} from "./data/raid-data";
import type { Material } from "./types";

/**
 * The columns of the published table. Not every explosive: these four are what
 * people actually ask for ("how many rockets for an armored door"), and a table
 * narrow enough to read is worth more than one that is complete and unusable.
 * The calculator still covers all seven.
 */
export const REFERENCE_EXPLOSIVES = [
  "C4",
  "Rocket",
  "Satchel",
  "Explosive 5.56 Rifle Ammo",
] as const satisfies readonly ExplosiveName[];

/** Short column headers, in REFERENCE_EXPLOSIVES order. */
export const REFERENCE_EXPLOSIVE_LABELS: Record<
  (typeof REFERENCE_EXPLOSIVES)[number],
  string
> = {
  C4: "C4",
  Rocket: "Rockets",
  Satchel: "Satchels",
  "Explosive 5.56 Rifle Ammo": "Explo. Ammo",
};

/**
 * Spelled-out names for prose. The solver's `short` field ("Exp.Ammo",
 * "F1 Gren.") is sized for a button and reads as an abbreviation nobody outside
 * the UI would recognise once a sentence containing it is quoted elsewhere.
 */
const PROSE_NAMES: Record<string, string> = {
  C4: "C4",
  Rocket: "rockets",
  "High Velocity Rocket": "high velocity rockets",
  Satchel: "satchel charges",
  "Explosive 5.56 Rifle Ammo": "explosive 5.56 rounds",
  "F1 Grenade": "F1 grenades",
  "Beancan Grenade": "beancan grenades",
};

export interface RaidReferenceRow {
  name: StructureName;
  hp: number;
  material: Material;
  /**
   * Solo count per explosive — the structure's own `quantity` field, i.e.
   * ceil(hp / damage) against the hard (outside) face. Absent when that
   * explosive has no row for the structure; render it as "—", never as 0.
   */
  counts: Partial<Record<(typeof REFERENCE_EXPLOSIVES)[number], number>>;
  /** Cheapest mixed combo by sulfur, using short UI names, e.g. "2× C4 + 30× Exp.Ammo". */
  cheapest: { label: string; sulfur: number };
  /** The same combo spelled out for prose: "2 C4 and 30 explosive 5.56 rounds". */
  cheapestProse: string;
}

export interface RaidReference {
  /** Structures whose published figures are internally consistent. */
  rows: RaidReferenceRow[];
  /**
   * Structures held back from the table because their own data disagrees with
   * itself — see `isConsistent`. Named on the page rather than silently dropped.
   */
  withheld: StructureName[];
}

/**
 * Does a structure's data agree with itself?
 *
 * Each raid-data row carries both a `damage` and a `quantity`, where quantity is
 * meant to be `ceil(hp / damage)` for the HP in structures.ts. For 24 of the 26
 * structures it is. For Metal Barricade and Strengthened Glass Window it is not:
 * Strengthened Glass Window's four quantities all resolve exactly at 500 HP
 * while structures.ts records 250, and Metal Barricade's disagree among
 * themselves.
 *
 * The calculator tolerates this because it quotes `quantity` only when a single
 * explosive is selected and otherwise solves from HP. A published table cannot:
 * it would print "98 explosive rounds" in one column and "49× Exp.Ammo" as the
 * cheapest combo in the next, on the same row. Which of the two is right is a
 * question about Rust, not about this code, so the row is withheld rather than
 * guessed at (AGENTS.md §6: never invent game numbers).
 */
function isConsistent(row: RaidReferenceRow, dmg: DamageMap): boolean {
  return REFERENCE_EXPLOSIVES.every((e) => {
    const d = dmg.get(e);
    return d === undefined || d.quantity === Math.ceil(row.hp / d.damage);
  });
}

export async function buildRaidReference(): Promise<RaidReference> {
  const names = Object.keys(STRUCTURES) as StructureName[];

  const built = await Promise.all(
    names.map(async (name) => {
      const dmg = buildDamageMap(await loadRaidDataForStructure(name));
      const { hp, material } = STRUCTURES[name];

      const counts: RaidReferenceRow["counts"] = {};
      for (const e of REFERENCE_EXPLOSIVES) {
        const d = dmg.get(e);
        if (d) counts[e] = d.quantity;
      }

      const combo = bestCombo(hp, dmg, EXPLOSIVES, "cheapest");

      const row: RaidReferenceRow = {
        name,
        hp,
        material,
        counts,
        cheapest: {
          label: combo.map((c) => `${c.qty}× ${c.exp.short}`).join(" + "),
          sulfur: comboTotal(combo, "totalSulfur"),
        },
        cheapestProse: combo
          .map((c) => `${c.qty} ${PROSE_NAMES[c.exp.name] ?? c.exp.name}`)
          .join(" and "),
      };

      return { row, ok: isConsistent(row, dmg) };
    }),
  );

  return {
    // Cheapest first: the table doubles as an answer to "what is the cheapest
    // thing to raid", which the insertion order of STRUCTURES buries.
    rows: built
      .filter((b) => b.ok)
      .map((b) => b.row)
      .sort((a, b) => a.cheapest.sulfur - b.cheapest.sulfur),
    withheld: built.filter((b) => !b.ok).map((b) => b.row.name),
  };
}
