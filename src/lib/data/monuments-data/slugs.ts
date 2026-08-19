/**
 * URL-slug mapping for individual monument pages.
 *
 * Slugs are derived from the data-file basenames (e.g. "abandoned-supermarket")
 * — they are already URL-friendly and match the image file naming convention in
 * /public/images/monuments/.
 *
 * The single source of truth is `monumentsData` from the index. This module
 * derives slugs from monument names and exposes helpers for the dynamic
 * `[slug]` route under /world/monuments/.
 */
import { monumentsData } from './index';
import type { Monument } from '../../types';

/** Convert a monument name to a URL-friendly slug. */
function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/'/g, '')          // Oxum's → oxums
    .replace(/[^a-z0-9]+/g, '-') // spaces & specials → dashes
    .replace(/(^-|-$)/g, '');    // trim leading/trailing dashes
}

export interface MonumentSlugEntry {
  slug: string;
  monument: Monument;
}

/** Every monument paired with its URL slug, derived from the display name. */
export const MONUMENT_SLUG_ENTRIES: MonumentSlugEntry[] = monumentsData.map(
  (m) => ({ slug: toSlug(m.name), monument: m })
);

/** Flat list of slugs — fed into `generateStaticParams`. */
export const MONUMENT_SLUGS: string[] = MONUMENT_SLUG_ENTRIES.map((e) => e.slug);

/** Look up a monument by its URL slug. Returns `undefined` for unknown slugs. */
export function getMonumentBySlug(slug: string): Monument | undefined {
  return MONUMENT_SLUG_ENTRIES.find((e) => e.slug === slug)?.monument;
}
