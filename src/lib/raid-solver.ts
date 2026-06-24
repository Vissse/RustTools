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

/**
 * Optimisation target:
 * - "cheapest": fewest sulfur.
 * - "fastest":  fewest explosives to deploy (e.g. 1 rocket over 8 HV + 1 ammo),
 *   tie-broken by sulfur.
 */
export type ComboMode = "cheapest" | "fastest";

interface DpState {
  s: number;
  m: number;
  c: number;
  n: number;
  dmg: number;
  use: Map<string, number>;
}

/**
 * Is `a` a better state than `b` under the active objective? Lower is better;
 * the final tie-break keeps the state with more damage so higher buckets stay
 * reachable. Both objectives are additive (sulfur and count only grow as
 * explosives are added), which is what makes the per-bucket greedy DP valid.
 */
function isBetter(a: DpState, b: DpState | null, mode: ComboMode): boolean {
  if (!b) return true;
  if (mode === "fastest") {
    if (a.n !== b.n) return a.n < b.n;
    if (a.s !== b.s) return a.s < b.s;
    return a.dmg > b.dmg;
  }
  if (a.s !== b.s) return a.s < b.s;
  return a.dmg > b.dmg;
}

/**
 * Find the best set of explosives that destroys a single structure, under the
 * given `mode` (cheapest by sulfur, or fastest by explosive count). Raids happen
 * door-by-door, so callers solve for one structure's HP and scale the resulting
 * combo by the count themselves.
 *
 * Unbounded-knapsack-style DP over damage buckets: dp[bucket] holds the best
 * way found so far to deal `bucket` units of damage. We sweep buckets in
 * increasing order and from each reachable bucket try adding one of every
 * explosive. Finally we scan all buckets that reach the target HP and pick the
 * best (ties broken by least over-kill damage).
 *
 * Damage is scaled to integers before bucketing so the buckets are exact instead
 * of floor-truncated. `scale` is capped (up to centi-HP precision) to bound the
 * array size for high-HP structures.
 */
export function bestCombo(
  totalHp: number,
  structureName: string,
  exps: Explosive[],
  mode: ComboMode = "cheapest",
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
  dp[0] = { s: 0, m: 0, c: 0, n: 0, dmg: 0, use: new Map() };

  for (let d = 0; d <= MAX; d++) {
    const cur = dp[d];
    if (!cur) continue;
    for (const e of viable) {
      const dmg = Math.round(damageAgainst(e, structureName) * scale);
      const newDmg = cur.dmg + dmg;
      const bucket = Math.min(MAX, newDmg);
      const nextUse = new Map(cur.use);
      nextUse.set(e.name, (nextUse.get(e.name) ?? 0) + 1);
      const next: DpState = {
        s: cur.s + e.cost.s,
        m: cur.m + e.cost.m,
        c: cur.c + e.cost.c,
        n: cur.n + 1,
        dmg: newDmg,
        use: nextUse,
      };
      if (isBetter(next, dp[bucket], mode)) dp[bucket] = next;
    }
  }

  const valid: DpState[] = [];
  for (let i = 0; i <= MAX; i++) {
    const state = dp[i];
    if (state && state.dmg >= target) valid.push(state);
  }
  // Best per the active objective, then least over-kill.
  const best = sortBy(
    valid,
    mode === "fastest"
      ? [(x) => x.n, (x) => x.s, (x) => x.dmg - target]
      : [(x) => x.s, (x) => x.dmg - target],
  )[0];
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
