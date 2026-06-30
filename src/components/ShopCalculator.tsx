'use client'

import { useMemo, Fragment } from "react";
import { useQueryStates, parseAsString, parseAsInteger } from "nuqs";
import { CalcShell } from "./CalcShell";
import { Img } from "./Img";
import { Feature, useFeatureUsed } from "../lib/analytics";
import { parseAsEntries, setEntryQty } from "../lib/url-entries";

// 1. DATA PŘEDMĚTŮ PRO VŠECHNY LOKACE
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
        img: "/images/recycle/rifle.lr300.webp",
      },
      {
        id: "m39",
        name: "M39 Rifle",
        price: 400,
        qty: 1,
        img: "/images/recycle/rifle.m39.webp",
      },
      {
        id: "16x",
        name: "Variable Zoom Scope",
        price: 300,
        qty: 1,
        img: "/images/recycle/variable.zoom.scope.webp",
      },
      {
        id: "m92",
        name: "M92 Pistol",
        price: 250,
        qty: 1,
        img: "/images/recycle/pistol.m92.webp",
      },
      {
        id: "spas12",
        name: "Spas-12 Shotgun",
        price: 250,
        qty: 1,
        img: "/images/recycle/shotgun.spas12.webp",
      },
      {
        id: "nvg",
        name: "Night Vision Goggles",
        price: 250,
        qty: 1,
        img: "/images/recycle/nightvisiongoggles.webp",
      },
      {
        id: "f1",
        name: "F1 Grenade",
        price: 8,
        qty: 1,
        img: "/images/recycle/grenade.f1.webp",
      },
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
        img: "/images/recycle/electric.battery.rechargable.medium.webp",
      },
      {
        id: "wind-turbine",
        name: "Wind Turbine",
        price: 500,
        qty: 1,
        img: "/images/recycle/generator.wind.scrap.webp",
      },
      {
        id: "gloves",
        name: "Roadsign Gloves",
        price: 40,
        qty: 1,
        img: "/images/recycle/roadsign.gloves.webp",
      },
      {
        id: "locker",
        name: "Locker",
        price: 40,
        qty: 1,
        img: "/images/recycle/locker.webp",
      },
      {
        id: "tuna-lamp",
        name: "Tuna Can Lamp",
        price: 5,
        qty: 1,
        img: "/images/recycle/tunalight.webp",
      },
      {
        id: "shelves",
        name: "Salvaged Shelves",
        price: 25,
        qty: 1,
        img: "/images/recycle/shelves.webp",
      },
      {
        id: "drop-box",
        name: "Drop Box",
        price: 40,
        qty: 1,
        img: "/images/recycle/dropbox.webp",
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
        img: "/images/recycle/composter.webp",
      },
      {
        id: "planter",
        name: "Large Planter Box",
        price: 30,
        qty: 1,
        img: "/images/recycle/planter.large.webp",
      },
      {
        id: "water-barrel",
        name: "Water Barrel",
        price: 30,
        qty: 1,
        img: "/images/recycle/water.barrel.webp",
      },
      {
        id: "sprinkler",
        name: "Sprinkler",
        price: 15,
        qty: 1,
        img: "/images/recycle/electric.sprinkler.webp",
      },
      {
        id: "fluid-pump",
        name: "Fluid Pump & Switch",
        price: 30,
        qty: 1,
        img: "/images/recycle/fluid.switch.webp",
      },
      {
        id: "fluid-splitter",
        name: "Fluid Splitter",
        price: 30,
        qty: 1,
        img: "/images/recycle/fluid.splitter.webp",
      },
      {
        id: "ceiling-light",
        name: "Ceiling Light",
        price: 30,
        qty: 1,
        img: "/images/recycle/ceilinglight.webp",
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
        img: "/images/recycle/mixingtable.webp",
      },
      {
        id: "corn-seed",
        name: "Corn Seed",
        price: 10,
        qty: 20,
        img: "/images/recycle/seed.corn.webp",
      },
      {
        id: "water-jug",
        name: "Water Jug",
        price: 5,
        qty: 1,
        img: "/images/recycle/waterjug.webp",
      },
      {
        id: "pickles",
        name: "Pickles",
        price: 1,
        qty: 6,
        img: "/images/recycle/jar.pickle.webp",
      },
      {
        id: "tuna",
        name: "Can of Tuna",
        price: 10,
        qty: 5,
        img: "/images/recycle/can.tuna.webp",
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
        img: "/images/recycle/piston2.webp",
      },
      {
        id: "crankshaft",
        name: "Med Crankshaft",
        price: 65,
        qty: 1,
        img: "/images/recycle/crankshaft2.webp",
      },
      {
        id: "valves",
        name: "Med Valves",
        price: 40,
        qty: 1,
        img: "/images/recycle/valve2.webp",
      },
      {
        id: "spark-plugs",
        name: "Med Spark Plugs",
        price: 40,
        qty: 1,
        img: "/images/recycle/sparkplug2.webp",
      },
      {
        id: "carburetor",
        name: "Med Carburetor",
        price: 65,
        qty: 1,
        img: "/images/recycle/carburetor2.webp",
      },
      {
        id: "car-lift",
        name: "Modular Car Lift",
        price: 150,
        qty: 1,
        img: "/images/recycle/modularcarlift.webp",
      },
      {
        id: "hot-air-balloon-armor",
        name: "Hot Air Balloon Armor",
        price: 70,
        qty: 1,
        img: "/images/recycle/hab.armor.webp",
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
        img: "/images/recycle/jar.pickle.webp",
      },
      {
        id: "sell-fertilizer",
        name: "Fertilizer",
        price: -6,
        qty: 2,
        img: "/images/recycle/fertilizer.webp",
      },
      {
        id: "sell-trout",
        name: "Small Trout",
        price: -10,
        qty: 1,
        img: "/images/recycle/fish.trout.small.webp",
      },
      {
        id: "sell-cloth",
        name: "Cloth",
        price: -20,
        qty: 80,
        img: "/images/recycle/cloth.webp",
      },
      {
        id: "sell-corn",
        name: "Corn",
        price: -20,
        qty: 15,
        img: "/images/recycle/corn.webp",
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
        img: "/images/recycle/crude.oil.webp",
      },
      {
        id: "sell-frags",
        name: "Metal Fragments",
        price: -2,
        qty: 20,
        img: "/images/recycle/metal.fragments.webp",
      },
      {
        id: "sell-hqm",
        name: "High Quality Metal",
        price: -4,
        qty: 1,
        img: "/images/recycle/metal.refined.webp",
      },
      {
        id: "sell-pills",
        name: "Anti-Rad Pills",
        price: -20,
        qty: 1,
        img: "/images/recycle/anti.rad.pills.webp",
      },
      {
        id: "sell-green-card",
        name: "Green Keycard",
        price: -30,
        qty: 1,
        img: "/images/recycle/green.keycard.webp",
      },
      {
        id: "sell-blue-card",
        name: "Blue Keycard",
        price: -80,
        qty: 1,
        img: "/images/recycle/blue.keycard.webp",
      },
      {
        id: "sell-red-card",
        name: "Red Keycard",
        price: -160,
        qty: 1,
        img: "/images/recycle/red.keycard.webp",
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
        img: "/images/recycle/hot.air.balloon.webp",
        fuel: 75,
      },
      {
        id: "minicopter",
        name: "Minicopter",
        price: 750,
        qty: 1,
        img: "/images/recycle/minicopter.webp",
        fuel: 100,
      },
      {
        id: "scrap-heli",
        name: "Scrap Transport Heli",
        price: 1250,
        qty: 1,
        img: "/images/recycle/scrap.transport.helicopter.webp",
        fuel: 100,
      },
      {
        id: "attack-heli",
        name: "Attack Helicopter",
        price: 2250,
        qty: 1,
        img: "/images/recycle/attack.helicopter.webp",
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
        img: "/images/recycle/small.oil.refinery.webp",
      },
      {
        id: "large-furnace",
        name: "Large Furnace",
        price: 350,
        qty: 1,
        img: "/images/recycle/furnace.large.webp",
      },
      {
        id: "computer",
        name: "Computer Station",
        price: 300,
        qty: 1,
        img: "/images/recycle/computerstation.webp",
      },
      {
        id: "generator",
        name: "Small Generator",
        price: 125,
        qty: 1,
        img: "/images/recycle/electric.fuelgenerator.small.webp",
      },
      {
        id: "tesla-coil",
        name: "Tesla Coil",
        price: 75,
        qty: 1,
        img: "/images/recycle/electric.teslacoil.webp",
      },
      {
        id: "solar-panel",
        name: "Large Solar Panel",
        price: 75,
        qty: 1,
        img: "/images/recycle/electric.solarpanel.large.webp",
      },
      {
        id: "igniter",
        name: "Igniter",
        price: 50,
        qty: 1,
        img: "/images/recycle/electric.igniter.webp",
      },
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
        img: "/images/recycle/guntrap.webp",
      },
      {
        id: "flame-turret",
        name: "Flame Turret",
        price: 250,
        qty: 1,
        img: "/images/recycle/flameturret.webp",
      },
      {
        id: "auto-turret",
        name: "Auto Turret",
        price: 400,
        qty: 1,
        img: "/images/recycle/autoturret.webp",
      },
      {
        id: "revolver",
        name: "Revolver",
        price: 200,
        qty: 1,
        img: "/images/recycle/pistol.revolver.webp",
      },
      {
        id: "db",
        name: "Double Barrel Shotgun",
        price: 250,
        qty: 1,
        img: "/images/recycle/shotgun.double.webp",
      },
      {
        id: "sam",
        name: "SAM Site",
        price: 500,
        qty: 1,
        img: "/images/recycle/samsite.webp",
      },
      {
        id: "sam-ammo",
        name: "SAM Ammo",
        price: 75,
        qty: 6,
        img: "/images/recycle/ammo.rocket.sam.webp",
      },
    ],
  },
  {
    id: "tools-stuff",
    name: "Tools & Stuff",
    items: [
      {
        id: "pickaxe",
        name: "Pickaxe",
        price: 50,
        qty: 1,
        img: "/images/recycle/pickaxe.webp",
      },
      {
        id: "hatchet",
        name: "Hatchet",
        price: 40,
        qty: 1,
        img: "/images/recycle/hatchet.webp",
      },
      {
        id: "chainsaw",
        name: "Chainsaw",
        price: 125,
        qty: 1,
        img: "/images/recycle/chainsaw.webp",
      },
      {
        id: "rf-pager",
        name: "RF Pager",
        price: 75,
        qty: 1,
        img: "/images/recycle/rf_pager.webp",
      },
      {
        id: "jackhammer",
        name: "Jackhammer",
        price: 150,
        qty: 1,
        img: "/images/recycle/jackhammer.webp",
      },
      {
        id: "rf-transmitter",
        name: "RF Transmitter",
        price: 75,
        qty: 1,
        img: "/images/recycle/rf.detonator.webp",
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
        img: "/images/recycle/sheetmetal.webp",
      },
      {
        id: "gears",
        name: "Gears",
        price: 125,
        qty: 1,
        img: "/images/recycle/gears.webp",
      },
      {
        id: "spring",
        name: "Metal Spring",
        price: 60,
        qty: 1,
        img: "/images/recycle/metalspring.webp",
      },
      {
        id: "pipe",
        name: "Metal Pipe",
        price: 30,
        qty: 1,
        img: "/images/recycle/metalpipe.webp",
      },
      {
        id: "blade",
        name: "Metal Blade",
        price: 15,
        qty: 1,
        img: "/images/recycle/metalblade.webp",
      },
      {
        id: "rope",
        name: "Rope (Costs 30 Cloth)",
        price: 0,
        qty: 1,
        img: "/images/recycle/rope.webp",
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
        img: "/images/recycle/stones.webp",
      },
      {
        id: "buy-wood",
        name: "Wood",
        price: 20,
        qty: 1000,
        img: "/images/recycle/wood.webp",
      },
      {
        id: "buy-frags",
        name: "Metal Fragments",
        price: 25,
        qty: 250,
        img: "/images/recycle/metal.fragments.webp",
      },
      {
        id: "stone-for-wood",
        name: "Stones (Costs 500 Wood)",
        price: 0,
        qty: 150,
        img: "/images/recycle/stones.webp",
      },
      {
        id: "wood-for-stone",
        name: "Wood (Costs 150 Stones)",
        price: 0,
        qty: 500,
        img: "/images/recycle/wood.webp",
      },
      {
        id: "buy-lgf",
        name: "Low Grade Fuel",
        price: 10,
        qty: 20,
        img: "/images/recycle/lowgradefuel.webp",
      },
      {
        id: "buy-diesel",
        name: "Diesel Fuel (Costs 300 LGF)",
        price: 0,
        qty: 1,
        img: "/images/recycle/diesel_barrel.webp",
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
        img: "/images/recycle/rowboat.webp",
        fuel: 50,
      },
      {
        id: "rhib",
        name: "RHIB",
        price: 300,
        qty: 1,
        img: "/images/recycle/rhib.webp",
        fuel: 50,
      },
      {
        id: "solo-sub",
        name: "Solo Submarine",
        price: 200,
        qty: 1,
        img: "/images/recycle/submarine.solo.webp",
        fuel: 50,
      },
      {
        id: "duo-sub",
        name: "Duo Submarine",
        price: 300,
        qty: 1,
        img: "/images/recycle/submarine.duo.webp",
        fuel: 50,
      },
      {
        id: "kayak",
        name: "Kayak BP",
        price: 50,
        qty: 1,
        img: "/images/recycle/kayak.webp",
      },
      {
        id: "paddle",
        name: "Paddle BP",
        price: 25,
        qty: 1,
        img: "/images/recycle/paddle.webp",
      },
      {
        id: "torpedo",
        name: "Torpedo",
        price: 75,
        qty: 2,
        img: "/images/recycle/submarine.torpedo.straight.webp",
      },
      {
        id: "Diver propulsion vehicle",
        name: "Diver Propulsion Vehicle",
        price: 200,
        qty: 1,
        img: "/images/recycle/skidoo.webp",
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
        img: "/images/recycle/diving.mask.webp",
      },
      {
        id: "diving-tank",
        name: "Diving Tank",
        price: 35,
        qty: 1,
        img: "/images/recycle/diving.tank.webp",
      },
      {
        id: "diving-fins",
        name: "Diving Fins",
        price: 25,
        qty: 1,
        img: "/images/recycle/diving.fins.webp",
      },
      {
        id: "wetsuit",
        name: "Wetsuit",
        price: 20,
        qty: 1,
        img: "/images/recycle/diving.wetsuit.webp",
      },
      {
        id: "worm",
        name: "Worm",
        price: 50,
        qty: 5,
        img: "/images/recycle/worm.webp",
      },
      {
        id: "fishing-rod",
        name: "Handmade Fishing Rod",
        price: 80,
        qty: 1,
        img: "/images/recycle/fishingrod.handmade.webp",
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
        img: "/images/recycle/fish.trout.small.webp",
      },
      {
        id: "sell-perch",
        name: "Yellow Perch",
        price: -50,
        qty: 5,
        img: "/images/recycle/fish.yellowperch.webp",
      },
      {
        id: "sell-shark",
        name: "Small Shark",
        price: -90,
        qty: 2,
        img: "/images/recycle/fish.shark.webp",
      },
      {
        id: "sell-salmon",
        name: "Salmon",
        price: -55,
        qty: 2,
        img: "/images/recycle/fish.salmon.webp",
      },
      {
        id: "sell-roughy",
        name: "Orange Roughy",
        price: -75,
        qty: 2,
        img: "/images/recycle/fish.orangeroughy.webp",
      },
      {
        id: "sell-catfish",
        name: "Catfish",
        price: -65,
        qty: 2,
        img: "/images/recycle/fish.catfish.webp",
      },
    ],
  },
];

const SMALL_FISHING_CATEGORIES = [...FISHING_CATEGORIES];

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
        img: "/images/recycle/horse.saddle.single.webp",
      },
      {
        id: "horse-saddle-double",
        name: "Double Horse Saddle",
        price: 90,
        qty: 1,
        img: "/images/recycle/horse.saddle.double.webp",
      },
      {
        id: "roadsign-horse-armor",
        name: "Roadsign Horse Armor",
        price: 100,
        qty: 1,
        img: "/images/recycle/horse.armor.roadsign.webp",
      },
      {
        id: "hq-horse-shoes",
        name: "High Quality Horse Shoes",
        price: 40,
        qty: 1,
        img: "/images/recycle/horse.shoes.advanced.webp",
      },
      {
        id: "sell-rose",
        name: "Rose (Sell)",
        price: -100,
        qty: 12,
        img: "/images/recycle/rose.webp",
      },
      {
        id: "sell-sunflower",
        name: "Sunflower (Sell)",
        price: -6,
        qty: 1,
        img: "/images/recycle/sunflower.webp",
      },
      {
        id: "sell-orchid",
        name: "Orchid (Sell)",
        price: -16,
        qty: 1,
        img: "/images/recycle/orchid.webp",
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
  // Monument, active tab, scrap balance and cart all live in the URL so a shop
  // run can be shared (?mon=outpost&scrap=500&c=auto-turret:2,gears:4).
  const [{ mon, tab, scrap, c: cartEntries }, setQuery] = useQueryStates(
    {
      mon: parseAsString.withDefault("bandit"),
      tab: parseAsString,
      scrap: parseAsInteger,
      c: parseAsEntries,
    },
    { history: "replace" },
  );

  // Sanitise against the data: unknown monument/tab fall back to the first valid
  // option so a hand-edited URL never breaks the page.
  const activeMonument = MONUMENTS.find((m) => m.id === mon) ?? MONUMENTS[0];
  const activeCategory =
    activeMonument.categories.find((c) => c.id === tab) ??
    activeMonument.categories[0];
  const activeMonumentId = activeMonument.id;
  const activeTab = activeCategory.id;
  const scrapInventory = scrap ?? 0;

  const cart = useMemo(() => {
    const map: Record<string, number> = {};
    for (const e of cartEntries) {
      const exists = MONUMENTS.some((m) =>
        m.categories.some((cat) => cat.items.some((it) => it.id === e.id)),
      );
      if (exists) map[e.id] = e.qty;
    }
    return map;
  }, [cartEntries]);

  const handleMonumentChange = (monId: string) => {
    // Reset to the new monument's first tab (null = default first tab → clean URL).
    setQuery({ mon: monId, tab: null });
  };

  const setActiveTab = (tabId: string) => {
    setQuery({
      tab: tabId === activeMonument.categories[0].id ? null : tabId,
    });
  };

  const adjustCart = (itemId: string, delta: number) => {
    setQuery((prev) => {
      const current = prev.c.find((e) => e.id === itemId)?.qty ?? 0;
      return { c: setEntryQty(prev.c, itemId, current + delta) };
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

  const cartCount = useMemo(
    () => Object.values(cart).reduce((sum, n) => sum + n, 0),
    [cart],
  );
  useFeatureUsed(Feature.shops, `${scrapInventory}|${cartCount}`);

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

      <div className="fade-in-container flex flex-col h-full w-full overflow-hidden relative">
        {/* TOP DASHBOARD */}
        <div className="flex justify-center items-center gap-6 px-5 pt-6 pb-3 max-[640px]:flex-wrap max-[640px]:gap-x-6 max-[640px]:gap-y-3 max-[640px]:px-3 max-[640px]:pt-4 max-[640px]:pb-3">
          <div className="flex flex-col items-center min-w-[150px] max-[640px]:min-w-[120px]">
            <span className="font-ui text-[11px] text-text-dim uppercase font-extrabold tracking-[0.15em] mb-1.5 cursor-default select-none">Your Scrap</span>
            <div className="flex items-center gap-2.5">
              <Img src="/images/recycle/scrap.webp" alt="Scrap" className="w-5 h-5 [filter:drop-shadow(0_2px_4px_rgba(0,0,0,0.4))] select-none" />
              <input
                type="number"
                min="0"
                className="bg-transparent border-0 text-text-bright text-xl w-20 text-center outline-none transition-all duration-200 [text-shadow:0_2px_8px_rgba(0,0,0,0.5)] cursor-text [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 hover:text-rust hover:scale-105 focus:text-rust focus:scale-105 placeholder:text-text-bright placeholder:opacity-100 focus:placeholder:text-transparent"
                placeholder="0"
                value={scrapInventory === 0 ? "" : scrapInventory}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "") setQuery({ scrap: null });
                  else {
                    const parsed = parseInt(val, 10);
                    if (!isNaN(parsed) && parsed >= 0)
                      setQuery({ scrap: parsed === 0 ? null : parsed });
                  }
                }}
              />
            </div>
          </div>

          <div className="w-px h-8 bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.08),transparent)] max-[640px]:hidden" />

          <div className="flex flex-col items-center min-w-[150px] max-[640px]:min-w-[120px]">
            <span className="font-ui text-[11px] text-text-dim uppercase font-extrabold tracking-[0.15em] mb-1.5 cursor-default select-none">Cart Change</span>
            <div className="flex items-center gap-2.5">
              {totals.totalCost === 0 && totals.totalGained === 0 && (
                <span className="text-xl font-semibold text-text-dim [text-shadow:0_2px_8px_rgba(0,0,0,0.5)] cursor-default select-none max-[640px]:text-lg">
                  0
                </span>
              )}
              {totals.totalCost > 0 && (
                <span className="text-xl font-semibold text-rust [text-shadow:0_2px_8px_rgba(0,0,0,0.5)] cursor-default select-none max-[640px]:text-lg">-{totals.totalCost}</span>
              )}
              {totals.totalGained > 0 && (
                <span className="text-xl font-semibold text-metal [text-shadow:0_2px_8px_rgba(0,0,0,0.5)] cursor-default select-none max-[640px]:text-lg">+{totals.totalGained}</span>
              )}
            </div>
          </div>

          <div className="w-px h-8 bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.08),transparent)] max-[640px]:hidden" />

          <div className="flex flex-col items-center min-w-[150px] max-[640px]:min-w-[120px]">
            <span className="font-ui text-[11px] text-text-dim uppercase font-extrabold tracking-[0.15em] mb-1.5 cursor-default select-none">
              {totals.finalBalance >= 0 ? "Remaining" : "Missing"}
            </span>
            <div className="flex items-center gap-2.5">
              <Img src="/images/recycle/scrap.webp" alt="Scrap" className="w-5 h-5 [filter:drop-shadow(0_2px_4px_rgba(0,0,0,0.4))] select-none" />
              <span className={`text-xl font-semibold [text-shadow:0_2px_8px_rgba(0,0,0,0.5)] cursor-default select-none max-[640px]:text-lg ${totals.finalBalance < 0 ? "text-rust" : "text-text-bright"}`}>
                {Math.abs(totals.finalBalance)}
              </span>
            </div>
          </div>
        </div>

        {/* MONUMENT SWAPPER */}
        <div className="flex justify-center mt-6">
          <div className="filter-row" style={{ flexWrap: 'wrap' }}>
            {MONUMENTS.map((monument, idx) => (
              <Fragment key={monument.id}>
                <button
                  className={`filter-pure-text ${activeMonumentId === monument.id ? "active" : ""}`}
                  onClick={() => handleMonumentChange(monument.id)}
                >
                  {monument.name}
                </button>
                {idx < MONUMENTS.length - 1 && (
                  <div className="filter-separator" />
                )}
              </Fragment>
            ))}
          </div>
        </div>

        {/* TABS */}
        <div className="flex justify-center mt-2">
          <div className="filter-row" style={{ flexWrap: 'wrap' }}>
            {activeMonument.categories.map((cat, idx) => (
              <Fragment key={cat.id}>
                <button
                  className={`filter-pure-text ${activeTab === cat.id ? "active" : ""}`}
                  onClick={() => setActiveTab(cat.id)}
                >
                  {cat.name}
                </button>
                {idx < activeMonument.categories.length - 1 && (
                  <div className="filter-separator" />
                )}
              </Fragment>
            ))}
          </div>
        </div>

        {/* ITEMS GRID & FOOTER CONTAINER */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col items-center">
          {/* ITEMS GRID */}
          <div className="flex flex-wrap justify-center gap-3 w-full max-w-[1320px] content-start">
            {activeCategory.items.map((item, index) => {
              const isBuy = item.price > 0;
              const cartQty = cart[item.id] || 0;
              const isActive = cartQty > 0;

              return (
                <div
                  key={item.id}
                  className={`group/card ${isBuy ? "is-buy" : "is-sell"} ${isActive ? "active" : ""} flex-[1_1_130px] min-w-[110px] max-w-[160px] bg-[linear-gradient(180deg,var(--panel3)_0%,var(--panel2)_100%)] border rounded-lg flex flex-col items-center px-2.5 pt-3.5 pb-[18px] transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] relative opacity-0 translate-y-[15px] animate-[shopSlideUp_0.4s_ease_forwards] hover:bg-white/3 hover:-translate-y-1! hover:shadow-[0_8px_16px_rgba(0,0,0,0.4)] before:content-[''] before:absolute before:-top-px before:-left-px before:-right-px before:h-0.5 before:rounded-t-lg before:z-[5] before:pointer-events-none ${
                    isBuy
                      ? `before:bg-[linear-gradient(90deg,transparent_0%,var(--rust)_50%,transparent_100%)] ${isActive ? "border-[rgba(206,66,43,0.3)] before:shadow-[0_0_12px_var(--rust)]" : "border-border-2 hover:border-white/10"}`
                      : `before:bg-[linear-gradient(90deg,transparent_0%,var(--metal-col)_50%,transparent_100%)] ${isActive ? "border-[rgba(139,175,200,0.3)] before:shadow-[0_0_12px_var(--metal-col)]" : "border-border-2 hover:border-white/10"}`
                  }`}
                  style={{ animationDelay: `${index * 0.04}s` }}
                >
                  {isActive && (
                    <div
                      className="absolute -top-2 -right-2 bg-rust group-[.is-sell]/card:bg-metal text-white font-ui text-[10px] font-extrabold px-[7px] py-[3px] rounded-xl shadow-[0_4px_8px_rgba(0,0,0,0.6)] animate-[shopPopIn_0.3s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards] z-10"
                      key={cartQty}
                    >
                      {cartQty}x
                    </div>
                  )}

                  {/* Image wrap (anchors the yield badge) */}
                  <div className="relative flex justify-center items-center mb-2.5 w-16 h-16">
                    <Img src={item.img} alt={item.name} className="w-14 h-14 object-contain [filter:drop-shadow(0_4px_6px_rgba(0,0,0,0.5))] transition-transform duration-300 group-hover/card:scale-110" />
                    {item.qty > 1 && (
                      <div className="absolute -bottom-1 -right-1 bg-black border border-white/10 text-white font-ui text-[10px] font-extrabold px-1 py-0.5 rounded z-10 shadow-[0_2px_4px_rgba(0,0,0,0.5)]">x{item.qty}</div>
                    )}
                  </div>

                  <div className="font-ui text-[11px] font-bold text-text-dim text-center mb-1 min-h-[28px] transition-[color] duration-300 flex items-center justify-center group-hover/card:text-text-bright">{item.name}</div>

                  <div className={`font-display text-base font-semibold flex items-center gap-1.5 mb-2 ${isBuy ? "text-rust" : "text-metal"}`}>
                    <Img src="/images/recycle/scrap.webp" alt="Scrap" className="w-3.5 h-3.5" />
                    {isBuy ? item.price : `+${Math.abs(item.price)}`}
                  </div>

                  {(item as any).fuel && (
                    <div className="text-[10px] text-text-dim mb-2 opacity-80">
                      + {(item as any).fuel} Low Grade Fuel
                    </div>
                  )}

                  <div className="w-4/5 h-px mt-1.5 mb-3 mx-auto bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.15),transparent)] transition-all duration-300 group-[.active.is-buy]/card:bg-[linear-gradient(to_right,transparent,var(--rust),transparent)] group-[.active.is-buy]/card:shadow-[0px_-4px_10px_rgba(206,66,43,0.6)] group-[.active.is-sell]/card:bg-[linear-gradient(to_right,transparent,var(--metal-col),transparent)] group-[.active.is-sell]/card:shadow-[0px_-4px_10px_rgba(139,175,200,0.6)]" />

                  <div className="flex items-center justify-center w-4/5 mx-auto">
                    <button
                      className="bg-transparent border-0 text-text-dim text-lg font-light cursor-pointer flex items-center justify-center w-5 h-5 transition-all duration-200 select-none p-0 shrink-0 hover:text-rust hover:scale-[1.2] active:scale-90"
                      onClick={() => adjustCart(item.id, -1)}
                    >
                      −
                    </button>
                    <div className="w-px min-w-px h-2.5 bg-[linear-gradient(to_bottom,transparent,var(--border-hi),transparent)] mx-1.5 shrink-0" />

                    <input
                      type="number"
                      className="w-[30px] min-w-[30px] bg-transparent border-0 text-text-dim text-sm font-bold text-center outline-none p-0 shadow-none transition-[color,transform] duration-300 shrink-0 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 placeholder:text-text-dim placeholder:opacity-100 focus:placeholder:text-transparent group-[.active]/card:text-text-bright group-[.active]/card:scale-110 group-[.active]/card:placeholder:text-text-bright"
                      placeholder="0"
                      value={cartQty === 0 ? "" : cartQty}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === "") {
                          setQuery((prev) => ({
                            c: setEntryQty(prev.c, item.id, 0),
                          }));
                        } else {
                          const parsed = parseInt(val, 10);
                          if (!isNaN(parsed) && parsed >= 0) {
                            setQuery((prev) => ({
                              c: setEntryQty(prev.c, item.id, parsed),
                            }));
                          }
                        }
                      }}
                    />

                    <div className="w-px min-w-px h-2.5 bg-[linear-gradient(to_bottom,transparent,var(--border-hi),transparent)] mx-1.5 shrink-0" />
                    <button
                      className="bg-transparent border-0 text-text-dim text-lg font-light cursor-pointer flex items-center justify-center w-5 h-5 transition-all duration-200 select-none p-0 shrink-0 hover:text-rust hover:scale-[1.2] active:scale-90"
                      onClick={() => adjustCart(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Fading separator */}
          <div className="h-px w-1/2 mt-10 mb-3 mx-auto opacity-50 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)]" />

          {/* SHOP FOOTER */}
          <div className="w-full max-w-[1200px] mt-2.5 flex flex-col items-center gap-3">
            <div className="w-full max-w-[450px] h-[180px] bg-black/20 border border-dashed border-white/10 rounded-lg flex items-center justify-center text-text-dim font-ui text-[11px] tracking-widest uppercase transition-[border-color] duration-300 hover:border-white/30">Map Location Placeholder</div>

            <div className="text-center text-[11px] text-text-muted font-ui uppercase tracking-wider opacity-80 mb-2">
              Rates fluctuate between 50% off and 100% markup based on demand.
            </div>
          </div>
        </div>
      </div>
    </CalcShell>
  );
}