'use client'

import { useState, useMemo, useEffect } from "react";
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

export function FurnaceCalculator() {
  const [selectedSmelterId, setSelectedSmelterId] = useState<string>("furnace");
  const [selectedProcessIdx, setSelectedProcessIdx] = useState<number>(0);
  const [quantity, setQuantity] = useState<number | "">(1000);

  const activeSmelter = SMELTERS.find((s) => s.id === selectedSmelterId)!;
  const safeQty = typeof quantity === "number" && quantity > 0 ? quantity : 0;

  useEffect(() => {
    setSelectedProcessIdx(0);
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

      <div className="furnace-container fade-in-container">
        {/* 1. VÝBĚR PECE */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div className="sec-label anim-1 mb-4">
            SMELTER TYPE
          </div>
          <div className="selector-row">
            {SMELTERS.map((s, index) => (
              <button
                key={s.id}
                className={`minimal-box-btn anim-staggered${selectedSmelterId === s.id ? " active" : ""}`}
                onClick={() => setSelectedSmelterId(s.id)}
                style={{ 
                  flexShrink: 0, 
                  minWidth: "90px",
                  animationDelay: `${index * 0.03}s` 
                }}
              >
                <Img src={s.img} alt={s.name} />
                <span className="minimal-box-name">{s.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. VÝBĚR PROCESU */}
        <div
          className="anim-2"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div className="sec-label mb-4">
            TARGET PROCESS
          </div>
          <div className="dense-selector-row" key={selectedSmelterId}>
            {activeSmelter.data.map((process, idx) => (
              <button
                key={idx}
                className={`dense-btn${selectedProcessIdx === idx ? " active" : ""}`}
                onClick={() => setSelectedProcessIdx(idx)}
                title={`${process.inputItem} -> ${process.outputItem}`}
                style={{ animationDelay: `${idx * 0.025}s` }}
              >
                <Img
                  src={getImageFromName(process.inputItem)}
                  alt={process.inputItem}
                />
                <span className="minimal-box-name">{process.inputItem}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3. CENTRÁLNÍ KARTA */}
        <div className="furnace-main-card anim-3">
          {/* Label nad Inputem */}
          <div
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "10px",
              color: "var(--text-dim)",
              fontWeight: 700,
              letterSpacing: "0.15em",
              marginBottom: "8px",
              textTransform: "uppercase",
            }}
          >
            AMOUNT TO PROCESS
          </div>

          {/* Minimalistický Input */}
          <div className="furnace-input-wrap">
            <button
              className="furnace-btn"
              onClick={() =>
                setQuantity((c) =>
                  Math.max(0, (typeof c === "number" ? c : 0) - 100),
                )
              }
            >
              −
            </button>
            <div className="furnace-sep" />
            <input
              type="number"
              min="0"
              className="furnace-input"
              value={quantity}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "") setQuantity("");
                else {
                  const parsed = parseInt(val, 10);
                  if (!isNaN(parsed) && parsed >= 0) setQuantity(parsed);
                }
              }}
            />
            <div className="furnace-sep" />
            <button
              className="furnace-btn"
              onClick={() =>
                setQuantity((c) => (typeof c === "number" ? c : 0) + 100)
              }
            >
              +
            </button>
          </div>

          {/* Čas zpracování */}
          {results && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "11px",
                  color: "var(--text-muted)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  marginBottom: "4px",
                }}
              >
                PROCESSING TIME
              </div>
              <div
                style={{
                  fontFamily: "var(--font-d)",
                  fontSize: "36px",
                  fontWeight: 600,
                  color: "var(--rust)",
                  lineHeight: 1,
                  letterSpacing: "0.02em",
                  textShadow: "0 0 16px var(--rust-glow)",
                }}
              >
                {results.timeStr}
              </div>
            </div>
          )}

          {/* Horizontální rozložení výsledků */}
          {results ? (
            <div className="horizontal-results-grid">
              {/* 1. BOX: Výtěžek (Yield) */}
              <div className="h-result-box">
                <Img
                  src={getImageFromName(activeProcess.outputItem)}
                  alt={activeProcess.outputItem}
                />
                <span
                  className="h-result-val text-text-bright"
                >
                  {results.yieldAmount.toLocaleString()}
                </span>
                <span className="h-result-lbl">YIELD</span>
              </div>

              {/* 2. BOX: Potřebné dřevo (Fuel) */}
              {results.woodRequired > 0 && (
                <div className="h-result-box">
                  <Img src="/images/wood.png" alt="Wood" />
                  <span
                    className="h-result-val text-[var(--wood-col)]"
                  >
                    {results.woodRequired.toLocaleString()}
                  </span>
                  <span className="h-result-lbl">FUEL</span>
                </div>
              )}

              {/* 3. BOX: Vyprodukované uhlí (Byproduct) */}
              {results.charcoal > 0 && (
                <div className="h-result-box">
                  <Img src="/images/charcoal.png" alt="Charcoal" />
                  <span
                    className="h-result-val text-coal"
                  >
                    {results.charcoal.toLocaleString()}
                  </span>
                  <span className="h-result-lbl">BYPRODUCT</span>
                </div>
              )}
            </div>
          ) : (
            <div
              className="empty-state"
              style={{
                padding: "20px 0",
                border: "none",
                background: "transparent",
              }}
            >
              <span
                className="icon text-[24px] mb-2 opacity-50"
              >
                ◈
              </span>
              <div
                style={{
                  color: "var(--text-dim)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  textAlign: "center",
                  textTransform: "uppercase",
                }}
              >
                Enter an amount to calculate
              </div>
            </div>
          )}
        </div>
      </div>
    </CalcShell>
  );
}