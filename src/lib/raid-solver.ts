import type { DamageMap } from "./data/raid-data/explosive-rows";
import type { ExplosiveName } from "./data/raid-data/structures";
import type { ComboItem, Explosive } from "./types";

/**
 * Damage of explosive `e` against the structure `dmg` was built for, or 0 if that
 * structure's data has no row for it.
 *
 * Callers pass a DamageMap from buildDamageMap() rather than a structure name:
 * damage is per-prefab data that lives in the lazily-loaded raid-data files, so
 * this module holds no data of its own.
 */
export function damageAgainst(e: Explosive, dmg: DamageMap): number {
  return dmg.get(e.name as ExplosiveName)?.damage ?? 0;
}

/**
 * Optimisation target:
 * - "cheapest": fewest sulfur.
 * - "fastest":  fewest explosives to deploy (e.g. 1 rocket over 8 HV + 1 ammo),
 *   tie-broken by sulfur.
 */
export type ComboMode = "cheapest" | "fastest";

/**
 * Damage is scaled to integers before bucketing. Raid data carries up to 4
 * decimals (1.0075, 2.5075, 4.0064, …), and those last digits decide real
 * answers: rounding F1 Grenade's 1.0075 to 1.01 quotes 1981 for an Armored Wall
 * instead of 1986 — a combo that does not actually break the wall.
 */
const UNIT = 10_000;

/** Safety valve; current data peaks around 1M buckets for a 2-explosive Armored Door. */
const MAX_BUCKETS = 2_000_000;

function gcd(a: number, b: number): number {
  while (b) [a, b] = [b, a % b];
  return a;
}

/**
 * Find the best set of explosives that destroys a single structure, under the
 * given `mode` (cheapest by sulfur, or fastest by explosive count). Raids happen
 * door-by-door, so callers solve for one structure's HP and scale the resulting
 * combo by the count themselves.
 *
 * Unbounded-knapsack-style DP over damage buckets: dp[bucket] holds the best way
 * found so far to deal `bucket` units of damage. We sweep buckets in increasing
 * order and from each reachable bucket try adding one of every explosive. Any
 * transition that reaches the target finalises against a running best instead of
 * being stored, so the table only needs to cover [0, target).
 *
 * Keeping a single state per bucket is exact, not a heuristic: buckets hold
 * exactly equal damage (the scaling is integral, nothing is clamped), and both
 * objectives are additive, so the lexicographic minimum at a bucket stays optimal
 * under appending any common suffix. Completeness holds because every optimal
 * combo is minimal — all sulfur costs are > 0 — so its prefix before the last
 * item is strictly below the target and therefore was stored.
 */
export function bestCombo(
  hp: number,
  dmg: DamageMap,
  exps: readonly Explosive[],
  mode: ComboMode = "cheapest",
): ComboItem[] {
  const viable = exps.filter((e) => damageAgainst(e, dmg) > 0);
  if (!viable.length || hp <= 0) return [];

  // One explosive: the answer is already in the data file. Taking it verbatim
  // keeps the common case (and every number the site is checked against) exact
  // and independent of everything below.
  if (viable.length === 1) {
    const only = viable[0];
    const qty = dmg.get(only.name as ExplosiveName)!.quantity;
    return [line(only, qty)];
  }

  // Exact integer damage, then divided down by the gcd of the SELECTED damages so
  // the bucket array stays as small as this particular subset allows.
  const scaled = viable.map((e) => Math.round(damageAgainst(e, dmg) * UNIT));
  const g = scaled.reduce(gcd);
  let step = scaled.map((d) => d / g);
  let target = Math.ceil((hp * UNIT) / g);

  if (target > MAX_BUCKETS) {
    // Coarsen with floor, never round: under-stating damage over-quotes the combo,
    // which is the safe direction to be wrong in.
    const shrink = Math.ceil(target / MAX_BUCKETS);
    step = step.map((d) => Math.max(1, Math.floor(d / shrink)));
    target = Math.ceil(target / shrink);
  }

  // Parallel arrays instead of objects carrying a cloned Map each: the old version
  // allocated one Map per transition (~2.1M for an Armored Wall) inside a render.
  const REACHED = -1;
  const sulfur = new Int32Array(target);
  const count = new Int32Array(target);
  const fromBucket = new Int32Array(target).fill(REACHED);
  const viaItem = new Int32Array(target).fill(REACHED);
  const reachable = new Uint8Array(target);
  reachable[0] = 1;

  let bestSulfur = 0;
  let bestCount = 0;
  let bestOverkill = 0;
  let bestFrom = REACHED;
  let bestItem = REACHED;
  let found = false;

  for (let d = 0; d < target; d++) {
    if (!reachable[d]) continue;
    const s = sulfur[d];
    const n = count[d];

    for (let i = 0; i < viable.length; i++) {
      const nextS = s + viable[i].cost.s;
      const nextN = n + 1;
      const nextD = d + step[i];

      if (nextD >= target) {
        const overkill = nextD - target;
        if (
          !found ||
          better(nextS, nextN, overkill, bestSulfur, bestCount, bestOverkill, mode)
        ) {
          found = true;
          bestSulfur = nextS;
          bestCount = nextN;
          bestOverkill = overkill;
          bestFrom = d;
          bestItem = i;
        }
        continue;
      }

      // Within the table every state has identical damage, so overkill can't
      // discriminate; a strict total order on (sulfur, count) keeps it deterministic.
      if (
        !reachable[nextD] ||
        better(nextS, nextN, 0, sulfur[nextD], count[nextD], 0, mode)
      ) {
        reachable[nextD] = 1;
        sulfur[nextD] = nextS;
        count[nextD] = nextN;
        fromBucket[nextD] = d;
        viaItem[nextD] = i;
      }
    }
  }

  if (!found) return [];

  // Walk the backpointers from the finalising transition down to bucket 0.
  const used = new Array<number>(viable.length).fill(0);
  used[bestItem]++;
  for (let d = bestFrom; d > 0; d = fromBucket[d]) {
    used[viaItem[d]]++;
  }

  return viable
    .map((e, i) => (used[i] > 0 ? line(e, used[i]) : null))
    .filter((c): c is ComboItem => c !== null);
}

/** Is (s, n, overkill) a better outcome than (bs, bn, bOverkill) under `mode`? */
function better(
  s: number,
  n: number,
  overkill: number,
  bs: number,
  bn: number,
  bOverkill: number,
  mode: ComboMode,
): boolean {
  if (mode === "fastest") {
    if (n !== bn) return n < bn;
    if (s !== bs) return s < bs;
  } else {
    if (s !== bs) return s < bs;
    if (n !== bn) return n < bn;
  }
  return overkill < bOverkill;
}

function line(exp: Explosive, qty: number): ComboItem {
  return {
    exp,
    qty,
    totalSulfur: exp.cost.s * qty,
    totalMetal: exp.cost.m * qty,
    totalCharcoal: exp.cost.c * qty,
  };
}

/** Sum a resource field across a combo (sulfur / metal / charcoal totals). */
export function comboTotal(
  combo: readonly ComboItem[],
  field: "totalSulfur" | "totalMetal" | "totalCharcoal",
): number {
  let total = 0;
  for (const c of combo) total += c[field];
  return total;
}
