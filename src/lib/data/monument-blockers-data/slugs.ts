import { MONUMENT_BLOCKERS_DATA, type MonumentBlockerEntry } from './index';

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/'/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export interface MonumentBlockerSlugEntry extends MonumentBlockerEntry {
  slug: string;
}

const seen = new Set<string>();

export const MONUMENT_BLOCKER_SLUG_ENTRIES: MonumentBlockerSlugEntry[] = MONUMENT_BLOCKERS_DATA.map((blocker) => {
  const base = toSlug(blocker.name);
  const slug = seen.has(base) ? `${base}-2` : base;
  seen.add(slug);
  return { ...blocker, slug };
});

export const MONUMENT_BLOCKER_SLUGS: string[] = MONUMENT_BLOCKER_SLUG_ENTRIES.map((e) => e.slug);

const bySlug = new Map(MONUMENT_BLOCKER_SLUG_ENTRIES.map((e) => [e.slug, e]));

export function getMonumentBlockerBySlug(slug: string): MonumentBlockerSlugEntry | undefined {
  return bySlug.get(slug);
}
