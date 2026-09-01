/**
 * Name-only starter list for the World → Resources page (gatherable nodes and
 * collectables scattered around the map — not the crafting-material category
 * under /items/resources). `image` is a verified path into /public/images
 * where one was found.
 */
export const WORLD_RESOURCE_SUBCATEGORIES = [
  "Ore Nodes",
  "Ground Collectables",
  "Trees & Wood",
  "Plants & Crops",
  "Berry Bushes",
  "Halloween Collectables",
  "Misc",
] as const;

export type WorldResourceSubcategory = (typeof WORLD_RESOURCE_SUBCATEGORIES)[number];

export interface WorldResourceEntry {
  name: string;
  subcategory: WorldResourceSubcategory;
  image?: string;
}

export const WORLD_RESOURCES_DATA: WorldResourceEntry[] = [
  { name: "Hqm Node", subcategory: "Ore Nodes" },
  { name: "Metal Node", subcategory: "Ore Nodes", image: "/images/items/metal.node.webp" },
  { name: "Stone Node", subcategory: "Ore Nodes", image: "/images/items/stone.node.webp" },
  { name: "Sulfur Node", subcategory: "Ore Nodes", image: "/images/items/sulfur.node.webp" },

  { name: "Coconut (collectable)", subcategory: "Ground Collectables" },
  { name: "Hqm Collectable", subcategory: "Ground Collectables" },
  { name: "Metal (collectable)", subcategory: "Ground Collectables" },
  { name: "Mushroom (collectable)", subcategory: "Ground Collectables" },
  { name: "Orchid (collectable)", subcategory: "Ground Collectables", image: "/images/recycle/orchid.webp" },
  { name: "Potato (collectable)", subcategory: "Ground Collectables" },
  { name: "Rose (collectable)", subcategory: "Ground Collectables", image: "/images/recycle/rose.webp" },
  { name: "Stone (collectable)", subcategory: "Ground Collectables" },
  { name: "Sulfur (collectable)", subcategory: "Ground Collectables", image: "/images/recycle/sulfur.webp" },
  { name: "Sunflower (collectable)", subcategory: "Ground Collectables", image: "/images/recycle/sunflower.webp" },
  { name: "Wheat (collectable)", subcategory: "Ground Collectables" },

  { name: "Tree", subcategory: "Trees & Wood" },
  { name: "Wood", subcategory: "Trees & Wood", image: "/images/recycle/wood.webp" },
  { name: "Wood Pile", subcategory: "Trees & Wood" },
  { name: "Cactus", subcategory: "Trees & Wood" },

  { name: "Corn Plant", subcategory: "Plants & Crops" },
  { name: "Pumpkin Plant", subcategory: "Plants & Crops" },
  { name: "Hemp", subcategory: "Plants & Crops" },

  { name: "Blue Berry Bush", subcategory: "Berry Bushes" },
  { name: "Green Berry Bush", subcategory: "Berry Bushes" },
  { name: "Red Berry Bush", subcategory: "Berry Bushes" },
  { name: "White Berry Bush", subcategory: "Berry Bushes" },
  { name: "Yellow Berry Bush", subcategory: "Berry Bushes" },

  { name: "Halloween Bone (collectable)", subcategory: "Halloween Collectables" },
  { name: "Halloween Metal (collectable)", subcategory: "Halloween Collectables" },
  { name: "Halloween Stone (collectable)", subcategory: "Halloween Collectables" },
  { name: "Halloween Sulfur (collectable)", subcategory: "Halloween Collectables" },
  { name: "Halloween Wood (collectable)", subcategory: "Halloween Collectables" },

  { name: "Diesel Fuel", subcategory: "Misc", image: "/images/diesel_barrel.png" },
];
