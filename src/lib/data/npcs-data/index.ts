/**
 * Name-only starter list for the World → NPCs page. `image` is a verified
 * path into /public/images where one was found — mostly animals, since the
 * icon library doesn't have scientist/vendor character portraits yet.
 */
export const NPC_SUBCATEGORIES = ["Scientists", "Vendors & Shopkeepers", "Animals", "Seasonal & Event"] as const;

export type NpcSubcategory = (typeof NPC_SUBCATEGORIES)[number];

export interface NpcEntry {
  name: string;
  subcategory: NpcSubcategory;
  image?: string;
}

export const NPCS_DATA: NpcEntry[] = [
  { name: "Abandoned Military Base Scientist", subcategory: "Scientists" },
  { name: "Airfield Scientist", subcategory: "Scientists" },
  { name: "Apartment Complex Security NPC", subcategory: "Scientists" },
  { name: "Arctic Research Base Scientist", subcategory: "Scientists" },
  { name: "Bradley Scientist", subcategory: "Scientists" },
  { name: "Bradley Heavy Flamethrower Scientist", subcategory: "Scientists" },
  { name: "Bradley Heavy M249 Scientist", subcategory: "Scientists" },
  { name: "Bradley Heavy Minigun Scientist", subcategory: "Scientists" },
  { name: "Bradley Heavy Spas-12 Scientist", subcategory: "Scientists" },
  { name: "Cargo Ship Scientist", subcategory: "Scientists" },
  { name: "Deep Sea Ghost Ship Scientist", subcategory: "Scientists" },
  { name: "Deep Sea Island Scientist", subcategory: "Scientists" },
  { name: "Excavator Scientist", subcategory: "Scientists" },
  { name: "Launch Site Scientist", subcategory: "Scientists" },
  { name: "Military Tunnel Scientist", subcategory: "Scientists", image: "/images/items/military.tunnel.scientist.png" },
  { name: "Missile Silo Inside Scientist", subcategory: "Scientists" },
  { name: "Missile Silo Outside Scientist", subcategory: "Scientists" },
  { name: "Oil Rig Scientist", subcategory: "Scientists" },
  { name: "Oil Rig Heavy Flamethrower Scientist", subcategory: "Scientists" },
  { name: "Oil Rig Heavy M249 Scientist", subcategory: "Scientists" },
  { name: "Oil Rig Heavy Minigun Scientist", subcategory: "Scientists" },
  { name: "Oil Rig Heavy Spas-12 Scientist", subcategory: "Scientists" },
  { name: "PT Boat Scientist", subcategory: "Scientists" },
  { name: "RHIB Scientist", subcategory: "Scientists" },
  { name: "Road Scientist", subcategory: "Scientists" },
  { name: "Trainyard Scientist", subcategory: "Scientists" },
  { name: "Tunnel Dweller", subcategory: "Scientists" },
  { name: "Underwater Lab Dweller", subcategory: "Scientists" },

  { name: "Airwolf Vendor", subcategory: "Vendors & Shopkeepers" },
  { name: "Boat Vendor", subcategory: "Vendors & Shopkeepers" },
  { name: "Travelling Vendor", subcategory: "Vendors & Shopkeepers" },
  { name: "Water Well Shopkeeper", subcategory: "Vendors & Shopkeepers" },

  { name: "Bear", subcategory: "Animals", image: "/images/recycle/bear.webp" },
  { name: "Boar", subcategory: "Animals", image: "/images/recycle/boar.webp" },
  { name: "Crocodile", subcategory: "Animals", image: "/images/recycle/crocodile.webp" },
  { name: "Horse", subcategory: "Animals", image: "/images/items/horse.png" },
  { name: "Chicken", subcategory: "Animals", image: "/images/recycle/chicken.webp" },
  { name: "Panther", subcategory: "Animals", image: "/images/recycle/panther.webp" },
  { name: "Polar Bear", subcategory: "Animals", image: "/images/recycle/polar.bear.webp" },
  { name: "Shark", subcategory: "Animals", image: "/images/recycle/shark.webp" },
  { name: "Snake", subcategory: "Animals", image: "/images/recycle/snake.webp" },
  { name: "Stag", subcategory: "Animals", image: "/images/recycle/stag.webp" },
  { name: "Tiger", subcategory: "Animals", image: "/images/recycle/tiger.webp" },
  { name: "Wolf", subcategory: "Animals", image: "/images/recycle/wolf.webp" },

  { name: "Gingerbread", subcategory: "Seasonal & Event" },
  { name: "Outbreak Sprayer", subcategory: "Seasonal & Event" },
  { name: "Scarecrow", subcategory: "Seasonal & Event", image: "/images/recycle/scarecrow.webp" },
];
