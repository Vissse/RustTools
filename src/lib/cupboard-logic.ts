import sum from "lodash/sum";
import { MAX_SLOTS, STACKS } from "./data/cupboard-data";
import type { CupboardResult, Stack, StackType } from "./types";

/**
 * Find the maximum number of days (D) the base can stay protected such that the
 * upkeep resources for D days still fit into the 24 Tool Cupboard slots.
 *
 * Slot usage isn't linear in D (each resource ceils to whole stacks), so we can't
 * solve it directly. Instead we binary-search D: a larger D always needs at least
 * as many slots, so "fits in 24 slots" is monotonic in D and the search converges
 * on the exact fractional-day boundary.
 */
export function calculateOptimalTC(
  wood: number,
  stone: number,
  metal: number,
  hqm: number,
): CupboardResult | null {
  if (wood === 0 && stone === 0 && metal === 0 && hqm === 0) return null;

  let low = 0;
  let high = 100000;
  // Binary search for the exact fractional number of days.
  for (let i = 0; i < 100; i++) {
    const mid = (low + high) / 2;
    const slotsUsed = sum([
      wood > 0 ? Math.ceil((mid * wood) / STACKS.wood.max) : 0,
      stone > 0 ? Math.ceil((mid * stone) / STACKS.stone.max) : 0,
      metal > 0 ? Math.ceil((mid * metal) / STACKS.metal.max) : 0,
      hqm > 0 ? Math.ceil((mid * hqm) / STACKS.hqm.max) : 0,
    ]);

    if (slotsUsed <= MAX_SLOTS) {
      low = mid;
    } else {
      high = mid;
    }
  }

  const maxDays = low;
  return {
    daysFloat: maxDays,
    wood: Math.floor(maxDays * wood),
    stone: Math.floor(maxDays * stone),
    metal: Math.floor(maxDays * metal),
    hqm: Math.floor(maxDays * hqm),
  };
}

/** Human-readable "D days H hours M minutes S seconds" for a fractional day count. */
export function formatTime(daysFloat: number): string {
  let totalSeconds = Math.floor(daysFloat * 24 * 60 * 60);
  const days = Math.floor(totalSeconds / (24 * 3600));
  totalSeconds %= 24 * 3600;
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
}

/** Split a resource amount into whole stacks of its max size. */
export function generateStacks(amount: number, type: StackType): Stack[] {
  const stacks: Stack[] = [];
  let remaining = amount;
  const { max, img } = STACKS[type];
  while (remaining > 0) {
    const take = Math.min(remaining, max);
    stacks.push({ type, img, amount: take });
    remaining -= take;
  }
  return stacks;
}
