import type { RaidItem, RaidSide } from "../../types";
import type { RAID_TOOL_NAMES } from "./raid-tool-names";
import type { ExplosiveName } from "./structures";

type RaidToolName = (typeof RAID_TOOL_NAMES)[number];

/**
 * Which per-structure raid-data row supplies each explosive's damage.
 *
 * This map is the seam between the two datasets. The solver's explosives and the
 * raid-data tool lists name the same items differently ("C4" vs "Timed Explosive
 * Charge"), which is how they were able to drift apart in the first place: the
 * solver used to carry its own damage table keyed by material tier, and it
 * disagreed with these rows for 114 of 182 structure/explosive pairs.
 *
 * Both sides are compile-checked — keys against ExplosiveName, values against the
 * auto-generated RAID_TOOL_NAMES union — so a rename on either side is a build error.
 */
export const EXPLOSIVE_ROW = {
  C4: "Timed Explosive Charge",
  Rocket: "Rocket",
  // Explosive 5.56 damage genuinely differs per weapon, because each round also
  // deals that gun's own projectile damage on top of the explosion. On a Stone
  // Wall's hard side that spans 172 (Bolt Action) to 187 (M16A2) rounds.
  //
  // The row rustlabs lists on its Explosive tab — and therefore the number every
  // published raid chart quotes — is the Semi-Automatic Rifle one. Use it. The
  // per-weapon rows stay visible under the Guns filter.
  //
  // Mapping to the Assault Rifle row instead is wrong in a way that hides on
  // small targets and only shows up on big ones: both give 63 on a Sheet Metal
  // Door, but the AR row gives 182/399/9 on Stone Wall / Metal Wall / Tool
  // Cupboard where the published numbers are 185/400/10.
  "Explosive 5.56 Rifle Ammo": "Explosive 5.56 Rifle Ammo - Semi-Automatic Rifle",
  "High Velocity Rocket": "High Velocity Rocket",
  // Grenades are quoted stuck-to-the-target (right click); thrown-and-bounced
  // does less and isn't how anyone raids.
  "F1 Grenade": "F1 Grenade - Stuck (right click)",
  "Beancan Grenade": "Beancan Grenade - Stuck (right click)",
  Satchel: "Satchel Charge",
} as const satisfies Record<ExplosiveName, RaidToolName>;

export interface ExplosiveDamage {
  damage: number;
  /**
   * The data file's own count for this structure, equal to ceil(hp / damage).
   * Used to short-circuit the single-explosive case so the headline number never
   * depends on the solver's arithmetic.
   */
  quantity: number;
}

export type DamageMap = ReadonlyMap<ExplosiveName, ExplosiveDamage>;

/**
 * The face the calculator quotes. Only the four wall files and the armored ladder
 * hatch carry a real soft/hard split; everything else is "both". Hard is the
 * outside face — more hits needed, and what a raider has to actually budget for.
 * (The old code picked whichever row happened to come first, which was the soft
 * one for the walls, so it under-quoted them.)
 */
const QUOTED_SIDE: RaidSide = "hard";

/**
 * Per-explosive damage for one structure, read from that structure's raid-data rows.
 *
 * An explosive with no row is left OUT of the map rather than given a fallback
 * value. There is deliberately no material-tier fallback: that fallback is the bug
 * this module exists to remove. Callers must treat a missing key as "no data for
 * this structure" and exclude the explosive visibly.
 */
export function buildDamageMap(rows: readonly RaidItem[]): DamageMap {
  const map = new Map<ExplosiveName, ExplosiveDamage>();

  for (const [name, rowName] of Object.entries(EXPLOSIVE_ROW) as [
    ExplosiveName,
    RaidToolName,
  ][]) {
    const matches = rows.filter((r) => r.name === rowName);
    const row =
      matches.find((r) => r.side === QUOTED_SIDE) ??
      matches.find((r) => r.side === "both");

    if (row && row.damage > 0 && row.quantity > 0) {
      map.set(name, { damage: row.damage, quantity: row.quantity });
    }
  }

  return map;
}

/** Rows for the face the calculator quotes, with the other side's duplicates dropped. */
export function rowsForQuotedSide(rows: readonly RaidItem[]): RaidItem[] {
  return rows.filter((r) => r.side === QUOTED_SIDE || r.side === "both");
}
