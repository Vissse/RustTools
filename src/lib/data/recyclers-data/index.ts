/** Name-only starter list for the World → Recyclers page. */
export interface RecyclerEntry {
  name: string;
  image?: string;
}

export const RECYCLERS_DATA: RecyclerEntry[] = [
  { name: "Green Recycler", image: "/images/items/recycler.png" },
  { name: "Green Recycler (powered)" },
  { name: "Red Recycler" },
  { name: "Yellow Recycler" },
];
