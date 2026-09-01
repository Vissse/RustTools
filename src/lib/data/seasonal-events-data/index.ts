/** Name-only starter list for the World → Seasonal Events page. */
export interface SeasonalEventEntry {
  name: string;
  image?: string;
}

export const SEASONAL_EVENTS_DATA: SeasonalEventEntry[] = [
  { name: "Easter Event" },
  { name: "Halloween Event" },
  { name: "Christmas Event" },
  { name: "Rust Birthday Event" },
];
