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
      <style>{`
        /* Kompletní vycentrování celé kalkulačky do jednoho sloupce */
        .furnace-container {
          flex: 1;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px 20px 40px;
          overflow-y: auto;
        }

        /* Nástupní animace prvků */
        @keyframes slideUpFade {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .anim-1 { animation: slideUpFade 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) backwards; animation-delay: 0.0s; }
        .anim-2 { animation: slideUpFade 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) backwards; animation-delay: 0.1s; }
        .anim-3 { animation: slideUpFade 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) backwards; animation-delay: 0.2s; }

        /* Zarovnání řad tlačítek na střed */
        .selector-row {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 24px;
          max-width: 800px;
        }

        /* ZAHUŠTĚNÝ řádek pro výběr procesu (aby se vešlo hodně položek jídla) */
        .dense-selector-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
          max-width: 840px;
          margin-bottom: 30px;
        }

        .dense-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 4px;
          padding: 8px 4px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: all 0.25s ease;
          opacity: 0.5;
          filter: grayscale(80%);
          width: 85px; 
        }
        .dense-btn:hover {
          opacity: 0.8;
          background: rgba(255, 255, 255, 0.02);
          border-color: rgba(255, 255, 255, 0.1);
        }
        .dense-btn.active {
          opacity: 1;
          filter: grayscale(0%);
          border-color: #cc422c;
          background: linear-gradient(to bottom, rgba(204, 66, 44, 0.08) 0%, transparent 100%);
        }
        .dense-btn img {
          width: 32px; 
          height: 32px;
          object-fit: contain;
          transition: transform 0.3s ease;
        }
        .dense-btn.active img {
          transform: scale(1.1);
        }
        .dense-btn .minimal-box-name {
          font-size: 9px;
          line-height: 1.15;
          text-align: center;
        }

        /* --- HORIZONTÁLNÍ KARTA (ZMENŠENO PRO MINIMALISMUS) --- */
        .furnace-main-card {
          background: linear-gradient(180deg, rgba(26, 25, 23, 0.95) 0%, rgba(18, 17, 15, 0.95) 100%);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          padding: 24px 36px; /* Zmenšen padding */
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 600px; /* Mírně zúženo */
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.6);
          position: relative;
        }
        .furnace-main-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, rgba(204, 66, 44, 0.5), transparent);
        }

        /* Tmavý Counter box */
        .dark-counter-box {
          display: flex;
          align-items: center;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 6px;
          padding: 4px 12px; /* Zmenšen padding */
          margin-bottom: 16px; /* Zmenšen margin */
        }

        /* Výsledky vedle sebe */
        .horizontal-results-grid {
          display: flex;
          gap: 12px; /* Zmenšená mezera */
          width: 100%;
          justify-content: center;
          margin-top: 12px; /* Zmenšen margin */
        }

        .h-result-box {
          background: rgba(255, 255, 255, 0.015);
          border: 1px solid transparent;
          border-radius: 8px;
          padding: 12px; /* Zmenšen padding boxu */
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1; 
          transition: background 0.2s ease;
        }
        .h-result-box:hover {
          background: rgba(255, 255, 255, 0.035);
        }

        .h-result-box img {
          width: 30px; /* Zmenšené ikony */
          height: 30px;
          object-fit: contain;
          margin-bottom: 8px; /* Menší mezera */
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
        }

        .h-result-val {
          font-family: var(--font-d);
          font-size: 22px; /* Zmenšený font čísel */
          font-weight: 600;
          line-height: 1;
          margin-bottom: 2px;
        }
        .h-result-lbl {
          font-family: var(--font-ui);
          font-size: 9px; /* Menší popisek */
          font-weight: 700;
          color: #757575;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        /* Skrytí nativního inputu */
        .invisible-num-input::-webkit-inner-spin-button,
        .invisible-num-input::-webkit-outer-spin-button {
          -webkit-appearance: none; margin: 0;
        }
        .invisible-num-input { -moz-appearance: textfield; }
      `}</style>

      <div className="furnace-container">
        {/* 1. VÝBĚR PECE */}
        <div
          className="anim-1"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div className="sec-label" style={{ marginBottom: "16px" }}>
            SMELTER TYPE
          </div>
          <div className="selector-row">
            {SMELTERS.map((s) => (
              <button
                key={s.id}
                className={`minimal-box-btn${selectedSmelterId === s.id ? " active" : ""}`}
                onClick={() => setSelectedSmelterId(s.id)}
                style={{ flexShrink: 0, minWidth: "90px" }}
              >
                <Img src={s.img} alt={s.name} />
                <span className="minimal-box-name">{s.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. VÝBĚR PROCESU (ZAHUŠTĚNÝ) */}
        <div
          className="anim-2"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div className="sec-label" style={{ marginBottom: "16px" }}>
            TARGET PROCESS
          </div>
          <div className="dense-selector-row">
            {activeSmelter.data.map((process, idx) => (
              <button
                key={idx}
                className={`dense-btn${selectedProcessIdx === idx ? " active" : ""}`}
                onClick={() => setSelectedProcessIdx(idx)}
                title={`${process.inputItem} -> ${process.outputItem}`}
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

        {/* 3. CENTRÁLNÍ KARTA (Zmenšená a minimalistická) */}
        <div className="furnace-main-card anim-3">
          {/* Label množstí */}
          <div
            style={{
              fontSize: "10px",
              color: "#757575",
              fontWeight: 700,
              letterSpacing: "0.1em",
              marginBottom: "8px",
              textTransform: "uppercase",
            }}
          >
            AMOUNT TO PROCESS
          </div>

          {/* Tmavý Counter box */}
          <div className="dark-counter-box">
            <button
              className="free-counter-btn"
              onClick={() =>
                setQuantity((c) =>
                  Math.max(0, (typeof c === "number" ? c : 0) - 100),
                )
              }
            >
              −
            </button>
            <div
              className="free-separator"
              style={{ background: "rgba(255,255,255,0.04)" }}
            />
            <input
              type="number"
              min="0"
              className="invisible-num-input free-counter-input"
              style={{ fontSize: "22px", width: "90px", color: "#fff" }}
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
            <div
              className="free-separator"
              style={{ background: "rgba(255,255,255,0.04)" }}
            />
            <button
              className="free-counter-btn"
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
                alignItems: "center",
                gap: "8px",
                margin: "4px 0",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: "10px",
                  color: "#757575",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                PROCESSING TIME:
              </span>
              <span
                style={{
                  fontFamily: "var(--font-d)",
                  fontSize: "24px" /* Zmenšený čas */,
                  fontWeight: 600,
                  color: "#cc422c",
                  lineHeight: 1,
                  letterSpacing: "0.02em",
                }}
              >
                {results.timeStr}
              </span>
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
                <span className="h-result-val" style={{ color: "#fff" }}>
                  {results.yieldAmount.toLocaleString()}
                </span>
                <span className="h-result-lbl">YIELD</span>
              </div>

              {/* 2. BOX: Potřebné dřevo (Fuel) */}
              {results.woodRequired > 0 && (
                <div className="h-result-box">
                  <Img src="/images/wood.png" alt="Wood" />
                  <span className="h-result-val" style={{ color: "#c9b07a" }}>
                    {results.woodRequired.toLocaleString()}
                  </span>
                  <span className="h-result-lbl">FUEL</span>
                </div>
              )}

              {/* 3. BOX: Vyprodukované uhlí (Byproduct) */}
              {results.charcoal > 0 && (
                <div className="h-result-box">
                  <Img src="/images/charcoal.png" alt="Charcoal" />
                  <span className="h-result-val" style={{ color: "#8a7d6e" }}>
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
                className="icon"
                style={{ fontSize: "24px", marginBottom: "8px", opacity: 0.5 }}
              >
                ◈
              </span>
              <div
                style={{
                  color: "#555",
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
