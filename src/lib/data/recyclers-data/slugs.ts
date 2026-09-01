import { RECYCLERS_DATA, type RecyclerEntry } from './index';

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/'/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export interface RecyclerSlugEntry extends RecyclerEntry {
  slug: string;
}

const seen = new Set<string>();

export const RECYCLER_SLUG_ENTRIES: RecyclerSlugEntry[] = RECYCLERS_DATA.map((recycler) => {
  const base = toSlug(recycler.name);
  const slug = seen.has(base) ? `${base}-2` : base;
  seen.add(slug);
  return { ...recycler, slug };
});

export const RECYCLER_SLUGS: string[] = RECYCLER_SLUG_ENTRIES.map((e) => e.slug);

const bySlug = new Map(RECYCLER_SLUG_ENTRIES.map((e) => [e.slug, e]));

export function getRecyclerBySlug(slug: string): RecyclerSlugEntry | undefined {
  return bySlug.get(slug);
}
