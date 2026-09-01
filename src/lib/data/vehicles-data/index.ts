/**
 * Name-only starter list for the World → Vehicles page, mirroring the
 * items-data module. `image` is a verified path into /public/images where
 * one was found; most vehicles don't have one yet.
 */
export const VEHICLE_SUBCATEGORIES = ["Air", "Land", "Siege Weapons", "Water"] as const;

export type VehicleSubcategory = (typeof VEHICLE_SUBCATEGORIES)[number];

export interface VehicleEntry {
  name: string;
  subcategory: VehicleSubcategory;
  image?: string;
}

export const VEHICLES_DATA: VehicleEntry[] = [
  { name: "Attack Helicopter", subcategory: "Air", image: "/images/recycle/attack.helicopter.webp" },
  { name: "Hot Air Balloon", subcategory: "Air", image: "/images/recycle/hot.air.balloon.webp" },
  { name: "Minicopter", subcategory: "Air", image: "/images/recycle/minicopter.webp" },
  { name: "Scrap Transport Helicopter", subcategory: "Air", image: "/images/recycle/scrap.transport.helicopter.webp" },

  { name: "Aboveground Work Cart", subcategory: "Land" },
  { name: "Aboveground Work Cart (Protected)", subcategory: "Land" },
  { name: "Bicycle", subcategory: "Land", image: "/images/items/bicycle.webp" },
  { name: "Locomotive", subcategory: "Land" },
  { name: "Magnetcrane", subcategory: "Land" },
  { name: "Modular Car", subcategory: "Land" },
  { name: "Motorbike", subcategory: "Land", image: "/images/recycle/motorbike.webp" },
  { name: "Motorbike With Sidecar", subcategory: "Land" },
  { name: "Snowmobile", subcategory: "Land", image: "/images/recycle/snowmobile.webp" },
  { name: "Trike", subcategory: "Land" },
  { name: "Work Cart", subcategory: "Land" },

  { name: "Battering Ram", subcategory: "Siege Weapons", image: "/images/recycle/batteringram.webp" },
  { name: "Catapult", subcategory: "Siege Weapons", image: "/images/recycle/catapult.webp" },
  { name: "Mounted Ballista", subcategory: "Siege Weapons", image: "/images/recycle/ballista.mounted.webp" },
  { name: "Siege Tower", subcategory: "Siege Weapons", image: "/images/recycle/siegetower.webp" },

  { name: "Boogie Board", subcategory: "Water", image: "/images/recycle/boogieboard.webp" },
  { name: "Diver Propulsion Vehicle", subcategory: "Water", image: "/images/recycle/skidoo.webp" },
  { name: "Duo Submarine", subcategory: "Water", image: "/images/recycle/duo.submarine.webp" },
  { name: "Inner Tube", subcategory: "Water", image: "/images/recycle/innertube.webp" },
  { name: "Kayak", subcategory: "Water", image: "/images/recycle/kayak.webp" },
  { name: "Modular Boat", subcategory: "Water" },
  { name: "PT Boat", subcategory: "Water" },
  { name: "RHIB", subcategory: "Water", image: "/images/recycle/rhib.webp" },
  { name: "Rowboat", subcategory: "Water", image: "/images/recycle/rowboat.webp" },
  { name: "Solo Submarine", subcategory: "Water", image: "/images/recycle/solo-submarine.webp" },
  { name: "Tugboat", subcategory: "Water" },
];
