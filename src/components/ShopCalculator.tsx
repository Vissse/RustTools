import { useState, useMemo } from "react";
import { CalcShell } from "./CalcShell";
import { Img } from "./Img";

// 1. DATA PŘEDMĚTŮ PRO VŠECHNY LOKACE
// Kladná cena = stojí scrap (nákup)
// Záporná cena = získáš scrap (prodej/výměna)

const BANDIT_CAMP_CATEGORIES = [
  {
    id: "black-market",
    name: "Black Market",
    items: [
      {
        id: "lr300",
        name: "LR-300 Assault Rifle",
        price: 500,
        qty: 1,
        img: "lr300.item.png",
      },
      {
        id: "m39",
        name: "M39 Rifle",
        price: 400,
        qty: 1,
        img: "rifle.m39.png",
      },
      {
        id: "16x",
        name: "16x Zoom Scope",
        price: 300,
        qty: 1,
        img: "optic.nv.png",
      },
      {
        id: "m92",
        name: "M92 Pistol",
        price: 250,
        qty: 1,
        img: "pistol.m92.png",
      },
      {
        id: "spas12",
        name: "Spas-12 Shotgun",
        price: 250,
        qty: 1,
        img: "shotgun.spas12.png",
      },
      {
        id: "nvg",
        name: "Night Vision Goggles",
        price: 250,
        qty: 1,
        img: "nightvisiongoggles.png",
      },
      { id: "f1", name: "F1 Grenade", price: 8, qty: 1, img: "grenade.f1.png" },
    ],
  },
  {
    id: "building",
    name: "Building Supplies",
    items: [
      {
        id: "med-battery",
        name: "Medium Battery",
        price: 75,
        qty: 1,
        img: "battery.small.png",
      },
      {
        id: "wind-turbine",
        name: "Wind Turbine",
        price: 500,
        qty: 1,
        img: "generator.wind.scrap.png",
      },
      {
        id: "gloves",
        name: "Roadsign Gloves",
        price: 40,
        qty: 1,
        img: "roadsign.gloves.png",
      },
      {
        id: "locker",
        name: "Locker",
        price: 40,
        qty: 1,
        img: "locker.png",
      },
      {
        id: "tuna-lamp",
        name: "Tuna Can Lamp",
        price: 5,
        qty: 1,
        img: "tunalight.png",
      },
      {
        id: "shelves",
        name: "Salvaged Shelves",
        price: 25,
        qty: 1,
        img: "shelves.png",
      },
      {
        id: "drop-box",
        name: "Drop Box",
        price: 40,
        qty: 1,
        img: "dropbox.png",
      },
    ],
  },
  {
    id: "farming",
    name: "Farming",
    items: [
      {
        id: "composter",
        name: "Composter",
        price: 30,
        qty: 1,
        img: "composter.png",
      },
      {
        id: "planter",
        name: "Large Planter Box",
        price: 30,
        qty: 1,
        img: "planter.large.png",
      },
      {
        id: "water-barrel",
        name: "Water Barrel",
        price: 30,
        qty: 1,
        img: "water.barrel.png",
      },
      {
        id: "sprinkler",
        name: "Sprinkler",
        price: 15,
        qty: 1,
        img: "sprinkler.png",
      },
      {
        id: "fluid-pump",
        name: "Fluid Pump & Switch",
        price: 30,
        qty: 1,
        img: "fluid.pump.png",
      },
      {
        id: "fluid-splitter",
        name: "Fluid Splitter",
        price: 30,
        qty: 1,
        img: "fluid.splitter.png",
      },
      {
        id: "ceiling-light",
        name: "Ceiling Light",
        price: 30,
        qty: 1,
        img: "ceilinglight.png",
      },
    ],
  },
  {
    id: "food",
    name: "Food Market",
    items: [
      {
        id: "mixing-table",
        name: "Mixing Table",
        price: 175,
        qty: 1,
        img: "mixingtable.png",
      },
      {
        id: "corn-seed",
        name: "Corn Seed",
        price: 10,
        qty: 20,
        img: "seed.corn.png",
      },
      {
        id: "water-jug",
        name: "Water Jug",
        price: 5,
        qty: 1,
        img: "waterjug.png",
      },
      {
        id: "pickles",
        name: "Pickles",
        price: 1,
        qty: 6,
        img: "jar.pickle.png",
      },
      {
        id: "tuna",
        name: "Can of Tuna",
        price: 10,
        qty: 5,
        img: "can.tuna.png",
      },
    ],
  },
  {
    id: "vehicle",
    name: "Vehicle Parts",
    items: [
      {
        id: "pistons",
        name: "Med Pistons",
        price: 40,
        qty: 1,
        img: "engine.parts.png",
      },
      {
        id: "crankshaft",
        name: "Med Crankshaft",
        price: 65,
        qty: 1,
        img: "engine.parts.png",
      },
      {
        id: "valves",
        name: "Med Valves",
        price: 40,
        qty: 1,
        img: "engine.parts.png",
      },
      {
        id: "spark-plugs",
        name: "Med Spark Plugs",
        price: 40,
        qty: 1,
        img: "engine.parts.png",
      },
      {
        id: "carburetor",
        name: "Med Carburetor",
        price: 65,
        qty: 1,
        img: "engine.parts.png",
      },
      {
        id: "suspension",
        name: "Med Suspension",
        price: 150,
        qty: 1,
        img: "engine.parts.png",
      },
      {
        id: "car-lift",
        name: "Modular Car Lift",
        price: 70,
        qty: 1,
        img: "modularcarlift.png",
      },
    ],
  },
  {
    id: "exchange",
    name: "Produce Exchange (Sell)",
    items: [
      {
        id: "sell-pickle",
        name: "Pickle Jar",
        price: -4,
        qty: 1,
        img: "jar.pickle.png",
      },
      {
        id: "sell-fertilizer",
        name: "Fertilizer",
        price: -6,
        qty: 2,
        img: "fertilizer.png",
      },
      {
        id: "sell-trout",
        name: "Small Trout",
        price: -10,
        qty: 1,
        img: "trout.png",
      },
      {
        id: "sell-cloth",
        name: "Cloth",
        price: -20,
        qty: 80,
        img: "cloth.png",
      },
      {
        id: "sell-corn",
        name: "Corn",
        price: -20,
        qty: 15,
        img: "corn.png",
      },
    ],
  },
  {
    id: "scrap4sale",
    name: "Scrap 4 Sale (Sell)",
    items: [
      {
        id: "sell-oil",
        name: "Crude Oil",
        price: -2,
        qty: 6,
        img: "crude.oil.png",
      },
      {
        id: "sell-frags",
        name: "Metal Fragments",
        price: -2,
        qty: 20,
        img: "metal.fragments.png",
      },
      {
        id: "sell-hqm",
        name: "High Quality Metal",
        price: -4,
        qty: 1,
        img: "metal.refined.png",
      },
      {
        id: "sell-pills",
        name: "Anti-Rad Pills",
        price: -20,
        qty: 1,
        img: "antiradpills.png",
      },
      {
        id: "sell-green-card",
        name: "Green Keycard",
        price: -30,
        qty: 1,
        img: "keycard_green.png",
      },
      {
        id: "sell-blue-card",
        name: "Blue Keycard",
        price: -80,
        qty: 1,
        img: "keycard_blue.png",
      },
      {
        id: "sell-red-card",
        name: "Red Keycard",
        price: -160,
        qty: 1,
        img: "keycard_red.png",
      },
    ],
  },
  {
    id: "airwolf",
    name: "Airwolf Vendor",
    items: [
      {
        id: "hot-air-balloon",
        name: "Hot Air Balloon",
        price: 150,
        qty: 1,
        img: "hot.air.balloon.png",
        fuel: 75,
      },
      {
        id: "minicopter",
        name: "Minicopter",
        price: 750,
        qty: 1,
        img: "minicopter.png",
        fuel: 100,
      },
      {
        id: "scrap-heli",
        name: "Scrap Transport Heli",
        price: 1250,
        qty: 1,
        img: "scrap.transport.helicopter.png",
        fuel: 100,
      },
      {
        id: "attack-heli",
        name: "Attack Helicopter",
        price: 2250,
        qty: 1,
        img: "attack.helicopter.png",
        fuel: 100,
      },
    ],
  },
];

const OUTPOST_CATEGORIES = [
  {
    id: "building",
    name: "Building",
    items: [
      {
        id: "oil-refinery",
        name: "Small Oil Refinery",
        price: 125,
        qty: 1,
        img: "small.oil.refinery.png",
      },
      {
        id: "large-furnace",
        name: "Large Furnace",
        price: 350,
        qty: 1,
        img: "furnace.large.png",
      },
      {
        id: "computer",
        name: "Computer Station",
        price: 300,
        qty: 1,
        img: "computerstation.png",
      },
      {
        id: "generator",
        name: "Small Generator",
        price: 125,
        qty: 1,
        img: "generator.small.png",
      },
      {
        id: "tesla-coil",
        name: "Tesla Coil",
        price: 75,
        qty: 1,
        img: "teslacoil.png",
      },
      {
        id: "solar-panel",
        name: "Large Solar Panel",
        price: 75,
        qty: 1,
        img: "solarpanel.large.png",
      },
      { id: "igniter", name: "Igniter", price: 50, qty: 1, img: "igniter.png" },
    ],
  },
  {
    id: "weapons",
    name: "Weapons",
    items: [
      {
        id: "shotgun-trap",
        name: "Shotgun Trap",
        price: 150,
        qty: 1,
        img: "shotgun.trap.png",
      },
      {
        id: "flame-turret",
        name: "Flame Turret",
        price: 250,
        qty: 1,
        img: "flameturret.png",
      },
      {
        id: "auto-turret",
        name: "Auto Turret",
        price: 400,
        qty: 1,
        img: "autoturret.png",
      },
      {
        id: "revolver",
        name: "Revolver",
        price: 200,
        qty: 1,
        img: "pistol.revolver.png",
      },
      {
        id: "db",
        name: "Double Barrel Shotgun",
        price: 250,
        qty: 1,
        img: "shotgun.double.png",
      },
      { id: "sam", name: "SAM Site", price: 500, qty: 1, img: "sam.site.png" },
      {
        id: "sam-ammo",
        name: "SAM Ammo",
        price: 75,
        qty: 6,
        img: "ammo.sam.png",
      },
    ],
  },
  {
    id: "tools-stuff",
    name: "Tools & Stuff",
    items: [
      { id: "pickaxe", name: "Pickaxe", price: 50, qty: 1, img: "pickaxe.png" },
      { id: "hatchet", name: "Hatchet", price: 40, qty: 1, img: "hatchet.png" },
      {
        id: "chainsaw",
        name: "Chainsaw",
        price: 125,
        qty: 1,
        img: "chainsaw.png",
      },
      {
        id: "rf-pager",
        name: "RF Pager",
        price: 75,
        qty: 1,
        img: "rf.pager.png",
      },
      {
        id: "jackhammer",
        name: "Jackhammer",
        price: 150,
        qty: 1,
        img: "jackhammer.png",
      },
      {
        id: "rf-transmitter",
        name: "RF Transmitter",
        price: 75,
        qty: 1,
        img: "rf.broadcaster.png",
      },
    ],
  },
  {
    id: "components",
    name: "Components",
    items: [
      {
        id: "sheet-metal",
        name: "Sheet Metal",
        price: 30,
        qty: 1,
        img: "sheetmetal.png",
      },
      { id: "gears", name: "Gears", price: 125, qty: 1, img: "gears.png" },
      {
        id: "spring",
        name: "Metal Spring",
        price: 60,
        qty: 1,
        img: "metalspring.png",
      },
      {
        id: "pipe",
        name: "Metal Pipe",
        price: 30,
        qty: 1,
        img: "metalpipe.png",
      },
      {
        id: "blade",
        name: "Metal Blade",
        price: 15,
        qty: 1,
        img: "metalblade.png",
      },
      {
        id: "rope",
        name: "Rope (Costs 30 Cloth)",
        price: 0,
        qty: 1,
        img: "rope.png",
      },
    ],
  },
  {
    id: "resource-exchange",
    name: "Resource Exchange",
    items: [
      {
        id: "buy-stone",
        name: "Stones",
        price: 50,
        qty: 1000,
        img: "stones.png",
      },
      { id: "buy-wood", name: "Wood", price: 20, qty: 1000, img: "wood.png" },
      {
        id: "buy-frags",
        name: "Metal Fragments",
        price: 25,
        qty: 250,
        img: "metal.fragments.png",
      },
      {
        id: "stone-for-wood",
        name: "Stones (Costs 500 Wood)",
        price: 0,
        qty: 150,
        img: "stones.png",
      },
      {
        id: "wood-for-stone",
        name: "Wood (Costs 150 Stones)",
        price: 0,
        qty: 500,
        img: "wood.png",
      },
      {
        id: "buy-lgf",
        name: "Low Grade Fuel",
        price: 10,
        qty: 20,
        img: "lowgradefuel.png",
      },
      {
        id: "buy-diesel",
        name: "Diesel Fuel (Costs 300 LGF)",
        price: 0,
        qty: 1,
        img: "diesel_barrel.png",
      },
    ],
  },
  {
    id: "farming",
    name: "Farming",
    items: [
      {
        id: "fluid-switch",
        name: "Fluid Switch & Pump",
        price: 30,
        qty: 1,
        img: "fluid.switch.png",
      },
      {
        id: "fluid-splitter",
        name: "Fluid Splitter",
        price: 30,
        qty: 1,
        img: "fluid.splitter.png",
      },
      {
        id: "water-pump",
        name: "Water Pump",
        price: 200,
        qty: 1,
        img: "water.pump.png",
      },
      {
        id: "fluid-combiner",
        name: "Fluid Combiner",
        price: 30,
        qty: 1,
        img: "fluid.combiner.png",
      },
      {
        id: "water-purifier",
        name: "Powered Water Purifier",
        price: 150,
        qty: 1,
        img: "water.purifier.powered.png",
      },
      {
        id: "electric-heater",
        name: "Electric Heater",
        price: 75,
        qty: 1,
        img: "electric.heater.png",
      },
      {
        id: "smoke-grenade",
        name: "Smoke Grenade",
        price: 5,
        qty: 1,
        img: "grenade.smoke.png",
      },
    ],
  },
  {
    id: "outfitters",
    name: "Output Outfitters",
    items: [
      { id: "tshirt", name: "T-Shirt", price: 5, qty: 1, img: "tshirt.png" },
      {
        id: "longsleeve",
        name: "Longsleeve T-Shirt",
        price: 10,
        qty: 1,
        img: "tshirt.long.png",
      },
      {
        id: "snow-jacket",
        name: "Snow Jacket",
        price: 20,
        qty: 1,
        img: "jacket.snow.png",
      },
      { id: "boots", name: "Boots", price: 20, qty: 1, img: "shoes.boots.png" },
      {
        id: "tactical-gloves",
        name: "Tactical Gloves",
        price: 40,
        qty: 1,
        img: "tactical.gloves.png",
      },
    ],
  },
];

const FISHING_CATEGORIES = [
  {
    id: "boats",
    name: "Boat Vendor",
    items: [
      {
        id: "rowboat",
        name: "Rowboat",
        price: 125,
        qty: 1,
        img: "rowboat.png",
        fuel: 50,
      },
      {
        id: "rhib",
        name: "RHIB",
        price: 300,
        qty: 1,
        img: "rhib.png",
        fuel: 50,
      },
      {
        id: "solo-sub",
        name: "Solo Submarine",
        price: 200,
        qty: 1,
        img: "submarine.solo.png",
        fuel: 50,
      },
      {
        id: "duo-sub",
        name: "Duo Submarine",
        price: 300,
        qty: 1,
        img: "submarine.duo.png",
        fuel: 50,
      },
      {
        id: "kayak",
        name: "Kayak BP",
        price: 50,
        qty: 1,
        img: "kayak.bp.png",
      },
      {
        id: "paddle",
        name: "Paddle BP",
        price: 25,
        qty: 1,
        img: "paddle.bp.png",
      },
      {
        id: "torpedo",
        name: "Torpedo",
        price: 75,
        qty: 2,
        img: "submarine.torpedo.straight.png",
      },
      {
        id: "Diver propulsion vehicle",
        name: "Diver Propulsion Vehicle",
        price: 200,
        qty: 1,
        img: "diver.propulsion.vehicle.png",
      },
    ],
  },
  {
    id: "shop-keeper",
    name: "Shop Keeper",
    items: [
      {
        id: "diving-mask",
        name: "Diving Mask",
        price: 15,
        qty: 1,
        img: "diving.mask.png",
      },
      {
        id: "diving-tank",
        name: "Diving Tank",
        price: 35,
        qty: 1,
        img: "diving.tank.png",
      },
      {
        id: "diving-fins",
        name: "Diving Fins",
        price: 25,
        qty: 1,
        img: "diving.fins.png",
      },
      {
        id: "wetsuit",
        name: "Wetsuit",
        price: 20,
        qty: 1,
        img: "wetsuit.png",
      },
      {
        id: "worm",
        name: "Worm",
        price: 50,
        qty: 5,
        img: "worm.png",
      },
      {
        id: "fishing-rod",
        name: "Handmade Fishing Rod",
        price: 80,
        qty: 1,
        img: "fishingrod.handmade.png",
      },
    ],
  },
  {
    id: "fish-exchange",
    name: "Fish Exchange (Sell)",
    items: [
      {
        id: "sell-trout",
        name: "Small Trout",
        price: -30,
        qty: 5,
        img: "fish.trout.small.png",
      },
      {
        id: "sell-perch",
        name: "Yellow Perch",
        price: -50,
        qty: 5,
        img: "fish.yellowperch.png",
      },
      {
        id: "sell-shark",
        name: "Small Shark",
        price: -90,
        qty: 2,
        img: "fish.shark.png",
      },
      {
        id: "sell-salmon",
        name: "Salmon",
        price: -55,
        qty: 2,
        img: "fish.salmon.png",
      },
      {
        id: "sell-roughy",
        name: "Orange Roughy",
        price: -75,
        qty: 2,
        img: "fish.orangeroughy.png",
      },
      {
        id: "sell-catfish",
        name: "Catfish",
        price: -65,
        qty: 2,
        img: "fish.catfish.png",
      },
    ],
  },
];

const SMALL_FISHING_CATEGORIES = [
  {
    id: "boats",
    name: "Boat Vendor",
    items: [
      {
        id: "rowboat",
        name: "Rowboat",
        price: 125,
        qty: 1,
        img: "rowboat.png",
        fuel: 50,
      },
      {
        id: "rhib",
        name: "RHIB",
        price: 300,
        qty: 1,
        img: "rhib.png",
        fuel: 50,
      },
      {
        id: "solo-sub",
        name: "Solo Submarine",
        price: 200,
        qty: 1,
        img: "submarine.solo.png",
        fuel: 50,
      },
      {
        id: "duo-sub",
        name: "Duo Submarine",
        price: 300,
        qty: 1,
        img: "submarine.duo.png",
        fuel: 50,
      },
      {
        id: "kayak",
        name: "Kayak BP",
        price: 50,
        qty: 1,
        img: "kayak.bp.png",
      },
      {
        id: "paddle",
        name: "Paddle BP",
        price: 25,
        qty: 1,
        img: "paddle.bp.png",
      },
      {
        id: "torpedo",
        name: "Torpedo",
        price: 75,
        qty: 2,
        img: "submarine.torpedo.straight.png",
      },
      {
        id: "Diver propulsion vehicle",
        name: "Diver Propulsion Vehicle",
        price: 200,
        qty: 1,
        img: "diver.propulsion.vehicle.png",
      },
    ],
  },
  {
    id: "shop-keeper",
    name: "Shop Keeper",
    items: [
      {
        id: "diving-mask",
        name: "Diving Mask",
        price: 15,
        qty: 1,
        img: "diving.mask.png",
      },
      {
        id: "diving-tank",
        name: "Diving Tank",
        price: 35,
        qty: 1,
        img: "diving.tank.png",
      },
      {
        id: "diving-fins",
        name: "Diving Fins",
        price: 25,
        qty: 1,
        img: "diving.fins.png",
      },
      { id: "wetsuit", name: "Wetsuit", price: 20, qty: 1, img: "wetsuit.png" },
      { id: "worm", name: "Worm", price: 50, qty: 5, img: "worm.png" },
      {
        id: "fishing-rod",
        name: "Handmade Fishing Rod",
        price: 80,
        qty: 1,
        img: "fishingrod.handmade.png",
      },
    ],
  },
  {
    id: "fish-exchange",
    name: "Fish Exchange (Sell)",
    items: [
      {
        id: "sell-trout",
        name: "Small Trout",
        price: -30,
        qty: 5,
        img: "fish.trout.small.png",
      },
      {
        id: "sell-perch",
        name: "Yellow Perch",
        price: -50,
        qty: 5,
        img: "fish.yellowperch.png",
      },
      {
        id: "sell-shark",
        name: "Small Shark",
        price: -90,
        qty: 2,
        img: "fish.shark.png",
      },
      {
        id: "sell-salmon",
        name: "Salmon",
        price: -55,
        qty: 2,
        img: "fish.salmon.png",
      },
      {
        id: "sell-roughy",
        name: "Orange Roughy",
        price: -75,
        qty: 2,
        img: "fish.orangeroughy.png",
      },
      {
        id: "sell-catfish",
        name: "Catfish",
        price: -65,
        qty: 2,
        img: "fish.catfish.png",
      },
    ],
  },
];

const STABLES_CATEGORIES = [
  {
    id: "stables-shop",
    name: "Stables Shopkeeper",
    items: [
      {
        id: "horse-saddle-single",
        name: "Single Horse Saddle",
        price: 75,
        qty: 1,
        img: "horse.saddle.single.png",
      },
      {
        id: "horse-saddle-double",
        name: "Double Horse Saddle",
        price: 90,
        qty: 1,
        img: "horse.saddle.double.png",
      },
      {
        id: "roadsign-horse-armor",
        name: "Roadsign Horse Armor",
        price: 100,
        qty: 1,
        img: "horse.armor.roadsign.png",
      },
      {
        id: "hq-horse-shoes",
        name: "High Quality Horse Shoes",
        price: 40,
        qty: 1,
        img: "horse.shoes.hqm.png",
      },
      {
        id: "sell-rose",
        name: "Rose (Sell)",
        price: -100,
        qty: 12,
        img: "rose.png",
      },
      {
        id: "sell-sunflower",
        name: "Sunflower (Sell)",
        price: -6,
        qty: 1,
        img: "sunflower.png",
      },
      {
        id: "sell-orchid",
        name: "Orchid (Sell)",
        price: -16,
        qty: 1,
        img: "orchid.png",
      },
    ],
  },
];

const MONUMENTS = [
  { id: "bandit", name: "Bandit Camp", categories: BANDIT_CAMP_CATEGORIES },
  { id: "outpost", name: "Outpost", categories: OUTPOST_CATEGORIES },
  {
    id: "fishing-large",
    name: "Large Fishing Village",
    categories: FISHING_CATEGORIES,
  },
  {
    id: "fishing-small",
    name: "Fishing Village",
    categories: SMALL_FISHING_CATEGORIES,
  },
  { id: "ranch", name: "Ranch", categories: STABLES_CATEGORIES },
  { id: "large-barn", name: "Large Barn", categories: STABLES_CATEGORIES },
];

export function ShopCalculator() {
  const [activeMonumentId, setActiveMonumentId] = useState<string>("bandit");
  const [activeTab, setActiveTab] = useState<string>(
    BANDIT_CAMP_CATEGORIES[0].id,
  );
  const [scrapInventory, setScrapInventory] = useState<number | "">(0);
  const [cart, setCart] = useState<Record<string, number>>({});

  const activeMonument = MONUMENTS.find((m) => m.id === activeMonumentId)!;
  const activeCategory =
    activeMonument.categories.find((c) => c.id === activeTab) ||
    activeMonument.categories[0];

  const handleMonumentChange = (monId: string) => {
    setActiveMonumentId(monId);
    const newMon = MONUMENTS.find((m) => m.id === monId)!;
    setActiveTab(newMon.categories[0].id);
  };

  const adjustCart = (itemId: string, delta: number) => {
    setCart((prev) => {
      const current = prev[itemId] || 0;
      const next = Math.max(0, current + delta);
      const newCart = { ...prev };
      if (next === 0) {
        delete newCart[itemId];
      } else {
        newCart[itemId] = next;
      }
      return newCart;
    });
  };

  const totals = useMemo(() => {
    let totalCost = 0;
    let totalGained = 0;

    Object.entries(cart).forEach(([itemId, qty]) => {
      let itemDef;

      for (const mon of MONUMENTS) {
        for (const cat of mon.categories) {
          const found = cat.items.find((i) => i.id === itemId);
          if (found) {
            itemDef = found;
            break;
          }
        }
        if (itemDef) break;
      }

      if (itemDef) {
        if (itemDef.price > 0) {
          totalCost += itemDef.price * qty;
        } else {
          totalGained += Math.abs(itemDef.price) * qty;
        }
      }
    });

    const safeScrap = typeof scrapInventory === "number" ? scrapInventory : 0;
    const finalBalance = safeScrap + totalGained - totalCost;

    return { totalCost, totalGained, finalBalance };
  }, [cart, scrapInventory]);

  return (
    <CalcShell
      pageTitle={
        <>
          RUST <span>//</span> SHOP CALCULATOR
        </>
      }
      headerAccent="SHOPS"
      headerRest="CALCULATOR"
      variant="recycling"
    >
      <style>{`
        .bandit-wrapper {
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 100%;
          overflow: hidden;
          position: relative;
        }

        /* --- TOP DASHBOARD --- */
        .top-dashboard {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 24px;
          padding: 32px 20px 16px;
          background: transparent;
          border-bottom: none;
        }

        .dash-block {
          background: transparent;
          border: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 140px;
          box-shadow: none;
        }

        .dash-label {
          font-family: var(--font-ui);
          font-size: 11px;
          color: #6a6a6a;
          text-transform: uppercase;
          font-weight: 800;
          letter-spacing: 0.15em;
          margin-bottom: 8px;
          cursor: default;
          user-select: none;
        }

        .dash-value-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .dash-value-row img { 
          width: 22px; 
          height: 22px; 
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4)); 
          user-select: none;
        }

        .dash-val {
          font-family: var(--font-d);
          font-size: 28px;
          font-weight: 600;
          color: #fff;
          text-shadow: 0 2px 8px rgba(0,0,0,0.5);
          cursor: default;
          user-select: none;
        }

        .dash-val.negative { color: #cc422c; }
        .dash-val.positive { color: #8bafc8; }

        .my-scrap-input {
          background: transparent;
          border: none;
          color: #fff;
          font-family: var(--font-d);
          font-size: 28px;
          width: 80px;
          text-align: center;
          outline: none;
          transition: all 0.2s ease;
          text-shadow: 0 2px 8px rgba(0,0,0,0.5);
          cursor: text;
          
          /* Skrytí nativních šipek inputu */
          -moz-appearance: textfield;
          appearance: textfield;
        }
        .my-scrap-input:hover, .my-scrap-input:focus {
          color: #cc422c;
          transform: scale(1.05);
        }
        .my-scrap-input::-webkit-inner-spin-button, 
        .my-scrap-input::-webkit-outer-spin-button { 
          -webkit-appearance: none; 
          margin: 0; 
        }

        .dash-divider {
          width: 1px;
          height: 36px;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.08), transparent);
        }

        /* --- LOKACE --- */
        .monument-swapper {
          display: flex;
          gap: 4px;
          padding: 24px 20px 0;
          overflow-x: auto;
          scrollbar-width: none;
          flex-shrink: 0;
          justify-content: center;
        }
        .monument-swapper::-webkit-scrollbar { display: none; }
        
        .monument-btn {
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          color: #757575;
          font-family: var(--font-d);
          font-size: 16px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 10px 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .monument-btn:hover { color: #fff; }
        .monument-btn.active {
          color: #cc422c;
          border-bottom-color: #cc422c;
          background: linear-gradient(to top, rgba(204, 66, 44, 0.1) 0%, transparent 100%);
        }

        .fading-separator {
          height: 1px;
          width: 70%;
          margin: 20px auto 4px auto;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%);
        }

        /* --- TABS (Kategorie) --- */
        .bandit-tabs {
          display: flex;
          gap: 4px;
          padding: 16px 20px 0;
          overflow-x: auto;
          scrollbar-width: none;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          flex-shrink: 0;
          justify-content: center;
        }
        .bandit-tabs::-webkit-scrollbar { display: none; }
        
        .tab-btn {
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          color: #757575;
          font-family: var(--font-d);
          font-size: 14px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 10px 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .tab-btn:hover { color: #fff; }
        .tab-btn.active {
          color: #cc422c;
          border-bottom-color: #cc422c;
          background: linear-gradient(to top, rgba(204, 66, 44, 0.1) 0%, transparent 100%);
        }

        /* --- MŘÍŽKA PŘEDMĚTŮ (Nově flex pro lepší centrování malého počtu) --- */
        .items-grid-container {
          flex: 1;
          overflow-y: auto;
          padding: 24px 20px;
          display: flex;
          justify-content: center;
        }
        .items-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center; /* Tímto se i málo položek udrží na středu */
          gap: 12px;
          width: 100%;
          max-width: 1200px;
          align-content: flex-start;
        }

        .item-card {
          width: 140px; /* Pevná šířka karty */
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 12px 12px 16px;
          transition: all 0.2s ease;
          position: relative;
        }
        .item-card:hover { background: rgba(255, 255, 255, 0.04); border-color: rgba(255, 255, 255, 0.1); }
        .item-card.is-sell { border-top: 2px solid #8bafc8; }
        .item-card.is-buy { border-top: 2px solid #cc422c; }
        
        .item-img { width: 50px; height: 50px; object-fit: contain; margin-bottom: 8px; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.5)); }
        .item-name { font-family: var(--font-ui); font-size: 11px; font-weight: 700; color: #d0d0d0; text-align: center; margin-bottom: 4px; min-height: 26px; }
        
        .item-price { font-family: var(--font-d); font-size: 16px; font-weight: 600; display: flex; align-items: center; gap: 6px; margin-bottom: 8px; }
        .item-price img { width: 14px; height: 14px; }
        .price-buy { color: #cc422c; }
        .price-sell { color: #8bafc8; }
        
        .in-cart-badge { position: absolute; top: -6px; right: -6px; background: #cc422c; color: #fff; font-family: var(--font-ui); font-size: 10px; font-weight: 800; padding: 2px 6px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.5); }

        /* --- MINIMALISTICKÉ OVLÁDÁNÍ MNOŽSTVÍ --- */
        .item-separator {
          width: 80%;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.15), transparent);
          margin: 6px auto 12px auto;
          transition: all 0.3s ease;
        }
        .item-card.active .item-separator {
          background: linear-gradient(to right, transparent, #cc422c, transparent);
          box-shadow: 0px -4px 10px rgba(204, 66, 44, 0.6);
        }

        .free-counter-wrap {
          display: flex; 
          align-items: center; 
          justify-content: center; 
          width: 80%; 
          margin: 0 auto;
        }
        .free-counter-btn {
          background: transparent; 
          border: none; 
          color: #757575;
          font-size: 16px; 
          font-weight: 300; 
          cursor: pointer; 
          display: flex;
          align-items: center; 
          justify-content: center; 
          width: 20px; 
          height: 20px; 
          transition: all 0.2s ease; 
          user-select: none;
          padding: 0;
          flex-shrink: 0;
        }
        .free-counter-btn:hover { 
          color: #cc422c; 
          transform: scale(1.15); 
        }
        .free-counter-btn:active { 
          transform: scale(0.95); 
        }
        
        .free-separator {
          width: 1px; 
          min-width: 1px; 
          height: 10px; 
          background: linear-gradient(to bottom, transparent, #4a4a4a, transparent);
          margin: 0 6px;
          flex-shrink: 0;
        }
        
        .free-counter-input {
          width: 30px !important; 
          min-width: 30px !important; 
          background: transparent !important; 
          border: none !important; 
          color: #757575 !important;
          font-size: 14px !important; 
          font-weight: 700 !important; 
          text-align: center; 
          outline: none;
          font-family: inherit; 
          padding: 0 !important; 
          box-shadow: none !important;
          transition: color 0.2s ease;
          flex-shrink: 0;
          -moz-appearance: textfield;
          appearance: textfield;
        }
        .item-card.active .free-counter-input {
          color: #fff !important; 
        }

        .invisible-num-input::-webkit-inner-spin-button,
        .invisible-num-input::-webkit-outer-spin-button {
          -webkit-appearance: none; margin: 0;
        }
        .invisible-num-input { -moz-appearance: textfield; }
      `}</style>

      <div className="bandit-wrapper">
        {/* TOP DASHBOARD */}
        <div className="top-dashboard">
          <div className="dash-block">
            <span className="dash-label">Your Scrap</span>
            <div className="dash-value-row">
              <Img src="/images/scrap.png" alt="Scrap" />
              <input
                type="number"
                min="0"
                className="my-scrap-input"
                placeholder="0"
                value={scrapInventory}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "") setScrapInventory("");
                  else {
                    const parsed = parseInt(val, 10);
                    if (!isNaN(parsed) && parsed >= 0)
                      setScrapInventory(parsed);
                  }
                }}
              />
            </div>
          </div>

          <div className="dash-divider" />

          <div className="dash-block">
            <span className="dash-label">Cart Change</span>
            <div className="dash-value-row">
              {totals.totalCost === 0 && totals.totalGained === 0 && (
                <span className="dash-val" style={{ color: "#555" }}>
                  0
                </span>
              )}
              {totals.totalCost > 0 && (
                <span className="dash-val negative">-{totals.totalCost}</span>
              )}
              {totals.totalGained > 0 && (
                <span className="dash-val positive">+{totals.totalGained}</span>
              )}
            </div>
          </div>

          <div className="dash-divider" />

          <div className="dash-block highlight">
            <span className="dash-label">
              {totals.finalBalance >= 0 ? "Remaining" : "Missing"}
            </span>
            <div className="dash-value-row">
              <Img src="/images/scrap.png" alt="Scrap" />
              <span
                className={`dash-val ${totals.finalBalance < 0 ? "negative" : ""}`}
              >
                {Math.abs(totals.finalBalance)}
              </span>
            </div>
          </div>
        </div>

        {/* MONUMENT SWAPPER */}
        <div className="monument-swapper">
          {MONUMENTS.map((monument) => (
            <button
              key={monument.id}
              className={`monument-btn ${activeMonumentId === monument.id ? "active" : ""}`}
              onClick={() => handleMonumentChange(monument.id)}
            >
              {monument.name}
            </button>
          ))}
        </div>

        {/* MIZEJÍCÍ ODDĚLOVAČ */}
        <div className="fading-separator" />

        {/* TABS */}
        <div className="bandit-tabs">
          {activeMonument.categories.map((cat) => (
            <button
              key={cat.id}
              className={`tab-btn ${activeTab === cat.id ? "active" : ""}`}
              onClick={() => setActiveTab(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* ITEMS GRID */}
        <div className="items-grid-container">
          <div className="items-grid">
            {activeCategory.items.map((item) => {
              const isBuy = item.price > 0;
              const cartQty = cart[item.id] || 0;
              const isActive = cartQty > 0;

              return (
                <div
                  key={item.id}
                  className={`item-card ${isBuy ? "is-buy" : "is-sell"} ${isActive ? "active" : ""}`}
                >
                  {isActive && <div className="in-cart-badge">{cartQty}x</div>}

                  <Img
                    src={`/images/${item.img}`}
                    alt={item.name}
                    className="item-img"
                  />

                  <div className="item-name">
                    {item.qty > 1 ? `${item.qty}x ` : ""}
                    {item.name}
                  </div>

                  <div
                    className={`item-price ${isBuy ? "price-buy" : "price-sell"}`}
                  >
                    <Img src="/images/scrap.png" alt="Scrap" />
                    {isBuy ? item.price : `+${Math.abs(item.price)}`}
                  </div>

                  {/* Minimalistické počítadlo */}
                  <div className="item-separator" />

                  <div className="free-counter-wrap">
                    <button
                      className="free-counter-btn"
                      onClick={() => adjustCart(item.id, -1)}
                    >
                      −
                    </button>
                    <div className="free-separator" />

                    <input
                      type="number"
                      className="free-counter-input invisible-num-input"
                      value={cartQty}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === "") {
                          setCart((prev) => {
                            const next = { ...prev };
                            delete next[item.id];
                            return next;
                          });
                        } else {
                          const parsed = parseInt(val, 10);
                          if (!isNaN(parsed) && parsed >= 0) {
                            setCart((prev) => {
                              const next = { ...prev };
                              if (parsed === 0) delete next[item.id];
                              else next[item.id] = parsed;
                              return next;
                            });
                          }
                        }
                      }}
                    />

                    <div className="free-separator" />
                    <button
                      className="free-counter-btn"
                      onClick={() => adjustCart(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </CalcShell>
  );
}
