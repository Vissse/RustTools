import { SEASONAL_EVENTS_DATA, type SeasonalEventEntry } from './index';

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/'/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export interface SeasonalEventSlugEntry extends SeasonalEventEntry {
  slug: string;
}

const seen = new Set<string>();

export const SEASONAL_EVENT_SLUG_ENTRIES: SeasonalEventSlugEntry[] = SEASONAL_EVENTS_DATA.map((event) => {
  const base = toSlug(event.name);
  const slug = seen.has(base) ? `${base}-2` : base;
  seen.add(slug);
  return { ...event, slug };
});

export const SEASONAL_EVENT_SLUGS: string[] = SEASONAL_EVENT_SLUG_ENTRIES.map((e) => e.slug);

const bySlug = new Map(SEASONAL_EVENT_SLUG_ENTRIES.map((e) => [e.slug, e]));

export function getSeasonalEventBySlug(slug: string): SeasonalEventSlugEntry | undefined {
  return bySlug.get(slug);
}
