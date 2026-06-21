import { useState, useMemo } from "react";
import { CalcShell } from "./CalcShell";
import { Img } from "./Img";

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
        id: "suspension",
        name: "Med Suspension",
        price: 150,
        qty: 1,
        img: "/images/recycle/engine.parts.webp",
      },
      {
        id: "car-lift",
        name: "Modular Car Lift",
        price: 70,
        qty: 1,
        img: "/images/recycle/modularcarlift.webp",
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
        img: "/images/recycle/antiradpills.webp",
      },
      {
        id: "sell-green-card",
        name: "Green Keycard",
        price: -30,
        qty: 1,
        img: "/images/recycle/keycard_green.webp",
      },
      {
        id: "sell-blue-card",
        name: "Blue Keycard",
        price: -80,
        qty: 1,
        img: "/images/recycle/keycard_blue.webp",
      },
      {
        id: "sell-red-card",
        name: "Red Keycard",
        price: -160,
        qty: 1,
        img: "/images/recycle/keycard_red.webp",
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
  const [activeMonumentId, setActiveMonumentId] = useState<string>("bandit");
  const [activeTab, setActiveTab] = useState<string>(
    BANDIT_CAMP_CATEGORIES[0].id,
  );

  // Změněno na number, ať se s tím lépe pracuje
  const [scrapInventory, setScrapInventory] = useState<number>(0);
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
        /* --- ANIMACE --- */
        @keyframes slideUpFade {
          0% { opacity: 0; transform: translateY(15px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.5); }
          80% { transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }

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
          padding: 24px 20px 12px;
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
          min-width: 150px;
          box-shadow: none;
        }

        .dash-label {
          font-family: var(--font-ui);
          font-size: 11px;
          color: #6a6a6a;
          text-transform: uppercase;
          font-weight: 800;
          letter-spacing: 0.15em;
          margin-bottom: 6px;
          cursor: default;
          user-select: none;
        }

        .dash-value-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .dash-value-row img { 
          width: 20px; 
          height: 20px; 
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
          transition: color 0.3s ease;
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
          height: 32px;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.08), transparent);
        }

        /* --- FADING SEPARÁTORY --- */
        .fading-separator {
          height: 1px;
          width: 75%;
          margin: 12px auto;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%);
        }

        /* --- LOKACE --- */
        .monument-swapper {
          display: flex;
          gap: 4px;
          padding: 8px 20px 0;
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
          font-size: 15px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 10px 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        .monument-btn:hover { color: #fff; transform: translateY(-1px); }
        .monument-btn.active {
          color: #cc422c;
          border-bottom-color: #cc422c;
          background: linear-gradient(to top, rgba(204, 66, 44, 0.15) 0%, transparent 100%);
        }

        /* --- TABS (Kategorie) --- */
        .bandit-tabs {
          display: flex;
          gap: 4px;
          padding: 4px 20px 0;
          overflow-x: auto;
          scrollbar-width: none;
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
          font-size: 13px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 10px 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        .tab-btn:hover { color: #fff; transform: translateY(-1px); }
        .tab-btn.active {
          color: #cc422c;
          border-bottom-color: #cc422c;
          background: linear-gradient(to top, rgba(204, 66, 44, 0.15) 0%, transparent 100%);
        }

        /* --- MŘÍŽKA PŘEDMĚTŮ & FOOTER --- */
        .items-grid-container {
          flex: 1;
          overflow-y: auto;
          padding: 20px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .items-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
          width: 100%;
          max-width: 1320px;
          align-content: flex-start;
        }

        .item-card {
          width: 145px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 14px 10px 18px;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          position: relative;
          
          /* Výchozí stav pro animaci (skryto a posunuto dolů) */
          opacity: 0;
          transform: translateY(15px);
          animation: slideUpFade 0.4s ease forwards;
        }
        
        .item-card:hover { 
          background: rgba(255, 255, 255, 0.05); 
          border-color: rgba(255, 255, 255, 0.15); 
          transform: translateY(-4px) !important; /* Nadzvednutí při hoveru */
          box-shadow: 0 8px 16px rgba(0,0,0,0.4);
        }
        
        .item-card.is-sell { border-top: 2px solid #8bafc8; }
        .item-card.is-buy { border-top: 2px solid #cc422c; }
        
        .item-img { 
          width: 56px; 
          height: 56px; 
          object-fit: contain; 
          margin-bottom: 10px; 
          filter: drop-shadow(0 4px 6px rgba(0,0,0,0.5)); 
          transition: transform 0.3s ease;
        }
        .item-card:hover .item-img { transform: scale(1.1); } /* Zvětšení obrázku při najetí */

        .item-name { font-family: var(--font-ui); font-size: 11px; font-weight: 700; color: #d0d0d0; text-align: center; margin-bottom: 4px; min-height: 28px; transition: color 0.3s ease; }
        .item-card:hover .item-name { color: #fff; }

        .item-price { font-family: var(--font-d); font-size: 16px; font-weight: 600; display: flex; align-items: center; gap: 6px; margin-bottom: 8px; }
        .item-price img { width: 14px; height: 14px; }
        .price-buy { color: #cc422c; }
        .price-sell { color: #8bafc8; }
        
        .in-cart-badge { 
          position: absolute; 
          top: -8px; 
          right: -8px; 
          background: #cc422c; 
          color: #fff; 
          font-family: var(--font-ui); 
          font-size: 10px; 
          font-weight: 800; 
          padding: 3px 7px; 
          border-radius: 12px; 
          box-shadow: 0 4px 8px rgba(0,0,0,0.6); 
          animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

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

        .free-counter-wrap { display: flex; align-items: center; justify-content: center; width: 80%; margin: 0 auto; }
        .free-counter-btn {
          background: transparent; border: none; color: #757575; font-size: 18px; font-weight: 300; cursor: pointer; 
          display: flex; align-items: center; justify-content: center; width: 20px; height: 20px; transition: all 0.2s ease; user-select: none; padding: 0; flex-shrink: 0;
        }
        .free-counter-btn:hover { color: #cc422c; transform: scale(1.2); }
        .free-counter-btn:active { transform: scale(0.9); }
        
        .free-separator { width: 1px; min-width: 1px; height: 10px; background: linear-gradient(to bottom, transparent, #4a4a4a, transparent); margin: 0 6px; flex-shrink: 0; }
        
        .free-counter-input {
          width: 30px !important; min-width: 30px !important; background: transparent !important; border: none !important; color: #757575 !important;
          font-size: 14px !important; font-weight: 700 !important; text-align: center; outline: none; font-family: inherit; padding: 0 !important; box-shadow: none !important;
          transition: color 0.3s ease, transform 0.2s ease; flex-shrink: 0; -moz-appearance: textfield; appearance: textfield;
        }
        .item-card.active .free-counter-input { color: #fff !important; transform: scale(1.1); }
        .invisible-num-input::-webkit-inner-spin-button, .invisible-num-input::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        .invisible-num-input { -moz-appearance: textfield; }

        /* --- SHOP FOOTER (Mapa a upozornění) --- */
        .shop-footer {
          width: 100%;
          max-width: 1200px;
          margin-top: 10px; /* Sníženo, protože tam máme nový separátor */
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .map-placeholder {
          width: 100%;
          max-width: 450px; 
          height: 180px; 
          background: rgba(0, 0, 0, 0.2);
          border: 1px dashed rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #555;
          font-family: var(--font-ui);
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: border-color 0.3s ease;
        }
        .map-placeholder:hover {
          border-color: rgba(255, 255, 255, 0.3);
        }

        .dynamic-pricing-info {
          text-align: center;
          font-size: 11px;
          color: #888;
          font-family: var(--font-ui);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          opacity: 0.8;
          margin-bottom: 8px;
        }

        /* --- PLACEHOLDER TRIKY PRO ZMIZENÍ NULY PO KLIKNUTÍ --- */
        .my-scrap-input::placeholder { color: #fff; opacity: 1; transition: color 0.2s; }
        .my-scrap-input:focus::placeholder { color: transparent; }

        .free-counter-input::placeholder { color: #757575; opacity: 1; transition: color 0.2s; }
        .item-card.active .free-counter-input::placeholder { color: #fff; opacity: 1; }
        .free-counter-input:focus::placeholder { color: transparent; }
      `}</style>

      <div className="bandit-wrapper">
        {/* TOP DASHBOARD */}
        <div className="top-dashboard">
          <div className="dash-block">
            <span className="dash-label">Your Scrap</span>
            <div className="dash-value-row">
              <Img src="/images/recycle/scrap.webp" alt="Scrap" />
              <input
                type="number"
                min="0"
                className="my-scrap-input"
                placeholder="0"
                // Pokud je scrapInventory 0, nastavíme hodnotu na "" (čímž se ukáže ten náš placeholder, co umí mizet)
                value={scrapInventory === 0 ? "" : scrapInventory}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "") setScrapInventory(0);
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
              <Img src="/images/recycle/scrap.webp" alt="Scrap" />
              <span
                className={`dash-val ${totals.finalBalance < 0 ? "negative" : ""}`}
              >
                {Math.abs(totals.finalBalance)}
              </span>
            </div>
          </div>
        </div>

        {/* Separátor 1 */}
        <div className="fading-separator" />

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

        {/* Separátor 2 */}
        <div
          className="fading-separator"
          style={{ width: "60%", opacity: 0.6 }}
        />

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

        {/* ITEMS GRID & FOOTER CONTAINER */}
        <div className="items-grid-container">
          {/* ITEMS GRID */}
          <div className="items-grid">
            {activeCategory.items.map((item, index) => {
              const isBuy = item.price > 0;
              const cartQty = cart[item.id] || 0;
              const isActive = cartQty > 0;

              return (
                <div
                  key={item.id}
                  className={`item-card ${isBuy ? "is-buy" : "is-sell"} ${isActive ? "active" : ""}`}
                  // Tímto se vytvoří krásný kaskádovitý slide-up efekt (postupné zobrazení zleva doprava)
                  style={{ animationDelay: `${index * 0.04}s` }}
                >
                  {isActive && (
                    <div className="in-cart-badge" key={cartQty}>
                      {cartQty}x
                    </div>
                  )}

                  <Img src={item.img} alt={item.name} className="item-img" />

                  <div className="item-name">
                    {item.qty > 1 ? `${item.qty}x ` : ""}
                    {item.name}
                  </div>

                  <div
                    className={`item-price ${isBuy ? "price-buy" : "price-sell"}`}
                  >
                    <Img src="/images/recycle/scrap.webp" alt="Scrap" />
                    {isBuy ? item.price : `+${Math.abs(item.price)}`}
                  </div>

                  {(item as any).fuel && (
                    <div
                      style={{
                        fontSize: "10px",
                        color: "#6a6a6a",
                        marginBottom: "8px",
                        opacity: 0.8,
                      }}
                    >
                      + {(item as any).fuel} Low Grade Fuel
                    </div>
                  )}

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
                      placeholder="0"
                      // Stejný trik: ukážeme jako výchozí stav "", placeholder zařídí tu nulu
                      value={cartQty === 0 ? "" : cartQty}
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

          {/* Separátor 3 (Nahrazuje ten hrubý border-top u footeru) */}
          <div
            className="fading-separator"
            style={{ marginTop: "40px", width: "50%", opacity: 0.5 }}
          />

          {/* SHOP FOOTER */}
          <div className="shop-footer">
            <div className="map-placeholder">Map Location Placeholder</div>

            <div className="dynamic-pricing-info">
              Rates fluctuate between 50% off and 100% markup based on demand.
            </div>
          </div>
        </div>
      </div>
    </CalcShell>
  );
}
