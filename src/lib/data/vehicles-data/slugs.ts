import { VEHICLES_DATA, type VehicleEntry } from './index';

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/'/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export interface VehicleSlugEntry extends VehicleEntry {
  slug: string;
}

const seen = new Set<string>();

export const VEHICLE_SLUG_ENTRIES: VehicleSlugEntry[] = VEHICLES_DATA.map((vehicle) => {
  const base = toSlug(vehicle.name);
  const slug = seen.has(base) ? `${base}-2` : base;
  seen.add(slug);
  return { ...vehicle, slug };
});

export const VEHICLE_SLUGS: string[] = VEHICLE_SLUG_ENTRIES.map((e) => e.slug);

const bySlug = new Map(VEHICLE_SLUG_ENTRIES.map((e) => [e.slug, e]));

export function getVehicleBySlug(slug: string): VehicleSlugEntry | undefined {
  return bySlug.get(slug);
}
