'use client'

import { useMemo, useEffect, useRef } from "react";
import { useQueryStates, parseAsStringLiteral, parseAsInteger } from "nuqs";
import { CalcShell } from "./CalcShell";
import { Img } from "./Img";
import { Feature, useFeatureUsed } from "../lib/analytics";

// 1. Importy vygenerovaných dat
import { Barbeque as BarbequeData } from "../lib/data/smelting-data/smelting-data-barbeque";
import { Campfire as CampfireData } from "../lib/data/smelting-data/smelting-data-campfire";
import { Furnace as FurnaceData } from "../lib/data/smelting-data/smelting-data-furnace";
import { LargeFurnace as LargeFurnaceData } from "../lib/data/smelting-data/smelting-data-large-furnace";
import { SmallOilRefinery as OilRefineryData } from "../lib/data/smelting-data/smelting-data-small-oil-refinery";
import { SmallStoneFireplace as StoneFireplaceData } from "../lib/data/smelting-data/smelting-data-small-stone-fireplace";

export interface SmeltingProcess {
  inputItem: string;
  woodRequired: number;
  outputItem: string;
  outputQuantity: string | number;
  timeSeconds: number;
}

const SMELTERS = [
  {
    id: "furnace",
    name: "Furnace",
    slots: 3,
    img: "/images/furnace.png",
    data: FurnaceData,
  },
  {
    id: "large-furnace",
    name: "Large Furnace",
    slots: 15,
    img: "/images/furnace.large.png",
    data: LargeFurnaceData,
  },
  {
    id: "small-oil-refinery",
    name: "Oil Refinery",
    slots: 1,
    img: "/images/small.oil.refinery.png",
    data: OilRefineryData,
  },
  {
    id: "campfire",
    name: "Camp Fire",
    slots: 1,
    img: "/images/campfire.png",
    data: CampfireData,
  },
  {
    id: "barbeque",
    name: "Barbeque",
    slots: 1,
    img: "/images/bbq.png",
    data: BarbequeData,
  },
  {
    id: "small-stone-fireplace",
    name: "Stone Fireplace",
    slots: 1,
    img: "/images/fireplace.stone.png",
    data: StoneFireplaceData,
  },
];

function getImageFromName(name: string) {
  const map: Record<string, string> = {
    "Metal Ore": "metal.ore.png",
    "Sulfur Ore": "sulfur.ore.png",
    "High Quality Metal Ore": "hq.metal.ore.png",
    "Metal Fragments": "metal.fragments.png",
    Sulfur: "sulfur.png",
    "High Quality Metal": "metal.refined.png",
    Wood: "wood.png",
    Charcoal: "charcoal.png",
    "Crude Oil": "crude.oil.png",
    "Low Grade Fuel": "lowgradefuel.png",
    "Empty Can Of Beans": "can.beans.empty.png",
    "Empty Tuna Can": "can.tuna.empty.png",
    "Cooked Human Meat": "humanmeat.cooked.png",
    "Burnt Human Meat": "humanmeat.burned.png",
    "Cooked Wolf Meat": "wolfmeat.cooked.png",
    "Burnt Wolf Meat": "wolfmeat.burned.png",
    "Raw Bear Meat": "bearmeat.png",
    "Cooked Bear Meat": "bearmeat.cooked.png",
    "Burnt Bear Meat": "bearmeat.burned.png",
    "Raw Pork": "pork.raw.png",
    "Cooked Pork": "pork.cooked.png",
    "Burnt Pork": "pork.burned.png",
    Honeycomb: "honeycomb.png",
    "Jar of Honey": "honey.png",
    "Raw Big Cat Meat": "bigcatmeat.raw.png",
    "Cooked Big Cat Meat": "bigcatmeat.cooked.png",
    "Raw Chicken Breast": "chicken.raw.png",
    "Cooked Chicken": "chicken.cooked.png",
    "Raw Crocodile Meat": "crocodilemeat.raw.png",
    "Cooked Crocodile Meat": "crocodilemeat.cooked.png",
    "Raw Deer Meat": "deermeat.raw.png",
    "Cooked Deer Meat": "deermeat.cooked.png",
    "Raw Fish": "fish.raw.png",
    "Cooked Fish": "fish.cooked.png",
    "Raw Horse Meat": "horsemeat.raw.png",
    "Cooked Horse Meat": "horsemeat.cooked.png",
    "Raw Human Meat": "humanmeat.raw.png",
    "Raw Snake Meat": "snakemeat.raw.png",
    "Cooked Snake Meat": "snakemeat.cooked.png",
    "Raw Wolf Meat": "wolfmeat.raw.png",
  };
  return `/images/${map[name] || name.toLowerCase().replace(/ /g, ".") + ".png"}`;
}

const SMELTER_IDS = SMELTERS.map((s) => s.id);

export function FurnaceCalculator() {
  // Smelter, target process and amount live in the URL (?sm=&p=&q=) so a smelt
  // estimate can be shared.
  const [
    { sm: selectedSmelterId, p: selectedProcessIdx, q: quantity },
    setQuery,
  ] = useQueryStates(
    {
      sm: parseAsStringLiteral(SMELTER_IDS).withDefault("furnace"),
      p: parseAsInteger.withDefault(0),
      q: parseAsInteger,
    },
    { history: "replace" },
  );
  const setSelectedSmelterId = (sm: string) => setQuery({ sm });
  const setSelectedProcessIdx = (p: number) => setQuery({ p });
  const setQuantity = (
    q: number | null | ((prev: number | null) => number | null),
  ) =>
    setQuery((prev) => ({ q: typeof q === "function" ? q(prev.q) : q }));

  const activeSmelter = SMELTERS.find((s) => s.id === selectedSmelterId)!;
  const safeQty = typeof quantity === "number" && quantity > 0 ? quantity : 0;

  // Reset the process to the first when the user switches smelter. Guarded by a
  // ref so it doesn't fire on mount/hydration and clobber a shared `?p=`.
  const prevSmelter = useRef(selectedSmelterId);
  useEffect(() => {
    if (prevSmelter.current === selectedSmelterId) return;
    prevSmelter.current = selectedSmelterId;
    setSelectedProcessIdx(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSmelterId]);

  const activeProcess = activeSmelter.data[selectedProcessIdx];

  const results = useMemo(() => {
    if (safeQty === 0 || !activeProcess) return null;

    const itemsPerSlot = Math.ceil(safeQty / activeSmelter.slots);
    const totalSeconds = Math.ceil(itemsPerSlot * activeProcess.timeSeconds);

    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    let timeStr = "";
    if (hours > 0) timeStr += `${hours}H `;
    if (mins > 0 || hours > 0) timeStr += `${mins}M `;
    timeStr += `${secs}S`;

    const outStr = String(activeProcess.outputQuantity);
    let yieldAmount = 0;
    if (outStr.includes("%")) {
      const pct = parseFloat(outStr.replace("%", ""));
      yieldAmount = Math.floor(safeQty * (pct / 100));
    } else {
      yieldAmount = safeQty * parseFloat(outStr);
    }

    const woodRequired = Math.ceil(safeQty * activeProcess.woodRequired);
    let charcoal = 0;
    if (woodRequired > 0 && activeProcess.inputItem !== "Wood") {
      charcoal = Math.floor(woodRequired * 0.75);
    }

    return { timeStr, yieldAmount, woodRequired, charcoal };
  }, [safeQty, activeSmelter, activeProcess]);

  useFeatureUsed(
    Feature.furnace,
    `${selectedSmelterId}|${selectedProcessIdx}|${quantity}`,
  );

  return (
    <CalcShell
      pageTitle={
        <>
          RUST <span>//</span> SMELTING CALCULATOR
        </>
      }
      headerAccent="SMELTING"
      headerRest="CALCULATOR"
      variant="recycling"
    >

      <div className="fade-in-container flex-1 w-full flex flex-col items-center px-4 py-6 overflow-y-auto">
        {/* 1. SMELTER SELECTOR */}
        <div className="flex flex-col items-center w-full">
          <div className="sec-label animate-[furnaceSlideUp_0.4s_cubic-bezier(0.2,0.8,0.2,1)_backwards] [animation-delay:0s] mb-4">
            SMELTER TYPE
          </div>
          <div className="flex gap-3 justify-center flex-wrap mb-6 max-w-[800px]">
            {SMELTERS.map((s, index) => (
              <button
                key={s.id}
                className={`minimal-box-btn animate-[furnaceSlideUp_0.3s_cubic-bezier(0.34,1.56,0.64,1)_backwards] shrink-0 min-w-[90px]${selectedSmelterId === s.id ? " active" : ""}`}
                onClick={() => setSelectedSmelterId(s.id)}
                style={{ animationDelay: `${index * 0.03}s` }}
              >
                <Img src={s.img} alt={s.name} />
                <span className="minimal-box-name">{s.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. PROCESS SELECTOR */}
        <div className="animate-[furnaceSlideUp_0.4s_cubic-bezier(0.2,0.8,0.2,1)_backwards] [animation-delay:0.1s] flex flex-col items-center w-full">
          <div className="sec-label mb-4">
            TARGET PROCESS
          </div>
          <div className="flex flex-wrap justify-center gap-2 max-w-[840px] mb-9" key={selectedSmelterId}>
            {activeSmelter.data.map((process, idx) => (
              <button
                key={idx}
                className={`group/db [--btn-op:0.5] opacity-[var(--btn-op)] bg-transparent border rounded px-1 py-2 flex flex-col items-center gap-1.5 cursor-pointer transition-all duration-[250ms] w-[85px] animate-[furnacePopInProcess_0.3s_cubic-bezier(0.34,1.56,0.64,1)_backwards] hover:[--btn-op:0.8] hover:bg-white/2 hover:border-white/10 ${selectedProcessIdx === idx ? "active [--btn-op:1] grayscale-0 border-rust bg-[linear-gradient(to_bottom,rgba(206,66,43,0.08)_0%,transparent_100%)]" : "grayscale-[80%] border-white/3"}`}
                onClick={() => setSelectedProcessIdx(idx)}
                title={`${process.inputItem} -> ${process.outputItem}`}
                style={{ animationDelay: `${idx * 0.025}s` }}
              >
                <Img
                  src={getImageFromName(process.inputItem)}
                  alt={process.inputItem}
                  className="w-8 h-8 object-contain transition-transform duration-300 group-[.active]/db:scale-110 group-[.active]/db:drop-shadow-[0_4px_8px_var(--rust-glow)]"
                />
                <span className="minimal-box-name text-[9px] leading-[1.15] text-center">{process.inputItem}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3. CENTRAL CARD */}
        <div className="bg-[linear-gradient(180deg,var(--panel2)_0%,var(--panel)_100%)] border border-border-2 border-t-0 rounded-xl px-8 py-6 flex flex-col items-center w-full max-w-[500px] shadow-[0_16px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.02)] relative before:content-[''] before:absolute before:top-0 before:inset-x-0 before:h-0.5 before:bg-[linear-gradient(90deg,transparent_0%,var(--rust)_15%,var(--rust)_85%,transparent_100%)] before:z-10 before:pointer-events-none before:rounded-t-xl animate-[furnaceSlideUp_0.4s_cubic-bezier(0.2,0.8,0.2,1)_backwards] [animation-delay:0.2s]">
          {/* Input label */}
          <div className="font-ui text-[10px] text-text-dim font-bold tracking-[0.15em] mb-2 uppercase">
            AMOUNT TO PROCESS
          </div>

          {/* Minimal input */}
          <div className="bg-black/25 border border-border rounded-md px-3 py-1.5 inline-flex items-center mb-6 transition-[border-color] duration-200 focus-within:border-[rgba(206,66,43,0.4)]">
            <button
              className="bg-transparent border-0 text-text-dim text-lg font-light cursor-pointer w-8 h-8 flex items-center justify-center transition-[color,transform] duration-150 hover:text-text-bright active:scale-90"
              onClick={() => setQuantity((c) => Math.max(0, (c ?? 0) - 100) || null)}
            >
              −
            </button>
            <div className="w-px h-3.5 bg-border mx-2" />
            <input
              type="number"
              min="0"
              className="bg-transparent border-0 outline-none text-center w-[90px] font-display text-[26px] font-semibold text-text-bright tracking-wider [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0"
              value={quantity ?? ""}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "") setQuantity(null);
                else {
                  const parsed = parseInt(val, 10);
                  if (!isNaN(parsed) && parsed >= 0) setQuantity(parsed);
                }
              }}
            />
            <div className="w-px h-3.5 bg-border mx-2" />
            <button
              className="bg-transparent border-0 text-text-dim text-lg font-light cursor-pointer w-8 h-8 flex items-center justify-center transition-[color,transform] duration-150 hover:text-text-bright active:scale-90"
              onClick={() => setQuantity((c) => (c ?? 0) + 100)}
            >
              +
            </button>
          </div>

          {/* Processing time */}
          {results && (
            <div className="flex flex-col items-center mb-4">
              <div className="font-ui text-[11px] text-text-muted font-bold uppercase tracking-[0.15em] mb-1">
                PROCESSING TIME
              </div>
              <div className="font-display text-[36px] font-semibold text-rust leading-none tracking-[0.02em] [text-shadow:0_0_16px_var(--rust-glow)]">
                {results.timeStr}
              </div>
            </div>
          )}

          {/* Horizontal results */}
          {results ? (
            <div className="flex gap-2 w-full justify-center mt-2">
              {/* Yield */}
              <div className="flex flex-col items-center flex-1 bg-white/1.5 border border-white/3 rounded-lg p-3 transition-[background,border-color] duration-200 hover:bg-white/3 hover:border-white/8">
                <Img
                  src={getImageFromName(activeProcess.outputItem)}
                  alt={activeProcess.outputItem}
                  className="w-7 h-7 object-contain mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                />
                <span className="font-display text-[22px] font-semibold leading-none mb-0.5 text-text-bright">
                  {results.yieldAmount.toLocaleString()}
                </span>
                <span className="font-ui text-[9px] font-bold text-text-dim uppercase tracking-widest">YIELD</span>
              </div>

              {/* Fuel */}
              {results.woodRequired > 0 && (
                <div className="flex flex-col items-center flex-1 bg-white/1.5 border border-white/3 rounded-lg p-3 transition-[background,border-color] duration-200 hover:bg-white/3 hover:border-white/8">
                  <Img src="/images/wood.png" alt="Wood" className="w-7 h-7 object-contain mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
                  <span className="font-display text-[22px] font-semibold leading-none mb-0.5 text-[var(--wood-col)]">
                    {results.woodRequired.toLocaleString()}
                  </span>
                  <span className="font-ui text-[9px] font-bold text-text-dim uppercase tracking-widest">FUEL</span>
                </div>
              )}

              {/* Byproduct */}
              {results.charcoal > 0 && (
                <div className="flex flex-col items-center flex-1 bg-white/1.5 border border-white/3 rounded-lg p-3 transition-[background,border-color] duration-200 hover:bg-white/3 hover:border-white/8">
                  <Img src="/images/charcoal.png" alt="Charcoal" className="w-7 h-7 object-contain mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
                  <span className="font-display text-[22px] font-semibold leading-none mb-0.5 text-coal">
                    {results.charcoal.toLocaleString()}
                  </span>
                  <span className="font-ui text-[9px] font-bold text-text-dim uppercase tracking-widest">BYPRODUCT</span>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center flex-col gap-2.5 font-display text-base font-normal tracking-[0.15em] text-text-muted uppercase text-center leading-[1.9] min-h-[200px] py-5">
              <span className="text-rust text-[24px] leading-none mb-2 opacity-50">◈</span>
              <div className="text-text-dim text-[11px] font-bold tracking-wider text-center uppercase">
                Enter an amount to calculate
              </div>
            </div>
          )}
        </div>
      </div>
    </CalcShell>
  );
}