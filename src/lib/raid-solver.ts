import sortBy from "lodash/sortBy";
import sumBy from "lodash/sumBy";
import { EXPLOSIVES, STRUCTURES } from "./data/raid-data";
import type { ComboItem, Explosive } from "./types";

/**
 * Damage of explosive `e` against a structure: per-structure override if present,
 * otherwise the value for the structure's material.
 */
export function damageAgainst(e: Explosive, structureName: string): number {
  const material = STRUCTURES[structureName].material;
  return e.dmg[structureName] ?? e.dmg[material] ?? 0;
}

interface DpState {
  s: number;
  m: number;
  c: number;
  dmg: number;
  use: Map<string, number>;
}

/**
 * Find the cheapest-by-sulfur set of explosives that destroys a structure.
 *
 * Unbounded-knapsack-style DP over damage buckets: dp[bucket] holds the cheapest
 * way found so far to deal `bucket` units of damage. We sweep buckets in
 * increasing order and from each reachable bucket try adding one of every
 * explosive. Finally we scan all buckets that reach the target HP and pick the
 * cheapest (ties broken by least over-kill damage).
 *
 * Damage is scaled to integers before bucketing so the buckets are exact instead
 * of floor-truncated. `scale` is capped (up to centi-HP precision) so a large
 * structureCount can't allocate a huge array.
 */
export function cheapestCombo(
  totalHp: number,
  structureName: string,
  exps: Explosive[],
): ComboItem[] {
  const viable = exps.filter((e) => damageAgainst(e, structureName) > 0);
  if (!viable.length) return [];

  const scale = Math.max(
    1,
    Math.min(100, Math.floor(2_000_000 / (totalHp * 1.5))),
  );
  const target = Math.round(totalHp * scale);
  const MAX = Math.ceil(target * 1.5);

  const dp = new Array<DpState | null>(MAX + 1).fill(null);
  dp[0] = { s: 0, m: 0, c: 0, dmg: 0, use: new Map() };

  for (let d = 0; d <= MAX; d++) {
    const cur = dp[d];
    if (!cur) continue;
    for (const e of viable) {
      const dmg = Math.round(damageAgainst(e, structureName) * scale);
      const newDmg = cur.dmg + dmg;
      const bucket = Math.min(MAX, newDmg);
      const nextSulfur = cur.s + e.cost.s;
      const nextMetal = cur.m + e.cost.m;
      const nextCharcoal = cur.c + e.cost.c;
      const prev = dp[bucket];
      if (
        !prev ||
        nextSulfur < prev.s ||
        (nextSulfur === prev.s && newDmg > prev.dmg)
      ) {
        const nextUse = new Map(cur.use);
        nextUse.set(e.name, (nextUse.get(e.name) ?? 0) + 1);
        dp[bucket] = {
          s: nextSulfur,
          m: nextMetal,
          c: nextCharcoal,
          dmg: newDmg,
          use: nextUse,
        };
      }
    }
  }

  const valid: DpState[] = [];
  for (let i = 0; i <= MAX; i++) {
    const state = dp[i];
    if (state && state.dmg >= target) valid.push(state);
  }
  // Cheapest by sulfur, then least over-kill.
  const best = sortBy(valid, [(x) => x.s, (x) => x.dmg - target])[0];
  if (!best) return [];

  const combo: ComboItem[] = [];
  for (const [name, qty] of best.use) {
    const e = EXPLOSIVES.find((x) => x.name === name)!;
    combo.push({
      exp: e,
      qty,
      totalSulfur: e.cost.s * qty,
      totalMetal: e.cost.m * qty,
      totalCharcoal: e.cost.c * qty,
    });
  }
  return combo;
}

/** Sum a resource field across a combo (sulfur / metal / charcoal totals). */
export function comboTotal(
  combo: ComboItem[],
  field: "totalSulfur" | "totalMetal" | "totalCharcoal",
): number {
  return sumBy(combo, field);
}
