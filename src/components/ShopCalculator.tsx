import { useState, useMemo } from "react";
import { CalcShell } from "./CalcShell";
import { Img } from "./Img";
import { Feature, useFeatureUsed } from "../lib/analytics";

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
  const [activeMonumentId, setActiveMonumentId] = useState<string>("bandit");
  const [activeTab, setActiveTab] = useState<string>(
    BANDIT_CAMP_CATEGORIES[0].id,
  );

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

      <div className="bandit-wrapper fade-in-container">
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
                <span className="dash-val text-text-dim">
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
          className="fading-separator w-3/5 opacity-60"
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
                  style={{ animationDelay: `${index * 0.04}s` }}
                >
                  {isActive && (
                    <div className="in-cart-badge" key={cartQty}>
                      {cartQty}x
                    </div>
                  )}

                  {/* Obal obrázku pro správné pozicování odznáčku množství */}
                  <div className="item-img-wrap">
                    <Img src={item.img} alt={item.name} className="item-img" />
                    {item.qty > 1 && (
                      <div className="item-yield-badge">x{item.qty}</div>
                    )}
                  </div>

                  <div className="item-name">{item.name}</div>

                  <div
                    className={`item-price ${isBuy ? "price-buy" : "price-sell"}`}
                  >
                    <Img src="/images/recycle/scrap.webp" alt="Scrap" />
                    {isBuy ? item.price : `+${Math.abs(item.price)}`}
                  </div>

                  {(item as any).fuel && (
                    <div
                      className="text-[10px] text-text-dim mb-2 opacity-80"
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

          {/* Separátor 3 */}
          <div
            className="fading-separator mt-10 w-1/2 opacity-50"
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
