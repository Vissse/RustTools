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
        .furnace-container {
          flex: 1;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 24px 16px;
          overflow-y: auto;
        }

        @keyframes slideUpFade {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .anim-1 { animation: slideUpFade 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) backwards; animation-delay: 0.0s; }
        .anim-2 { animation: slideUpFade 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) backwards; animation-delay: 0.1s; }
        .anim-3 { animation: slideUpFade 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) backwards; animation-delay: 0.2s; }

        .selector-row {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 24px;
          max-width: 800px;
        }

        .dense-selector-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
          max-width: 840px;
          margin-bottom: 36px;
        }

        @keyframes popInProcess {
          0% { opacity: 0; transform: translateY(15px) scale(0.8); }
          100% { opacity: var(--btn-op); transform: translateY(0) scale(1); }
        }

        .dense-btn {
          --btn-op: 0.5;
          opacity: var(--btn-op);
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
          filter: grayscale(80%);
          width: 85px; 
          animation: popInProcess 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
        }

        .dense-btn:hover {
          --btn-op: 0.8;
          background: rgba(255, 255, 255, 0.02);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .dense-btn.active {
          --btn-op: 1;
          filter: grayscale(0%);
          border-color: var(--rust);
          background: linear-gradient(to bottom, rgba(206, 66, 43, 0.08) 0%, transparent 100%);
        }

        .dense-btn img {
          width: 32px; 
          height: 32px;
          object-fit: contain;
          transition: transform 0.3s ease;
        }
        
        .dense-btn.active img {
          transform: scale(1.1);
          filter: drop-shadow(0 4px 8px var(--rust-glow)); 
        }
        
        .dense-btn .minimal-box-name {
          font-size: 9px;
          line-height: 1.15;
          text-align: center;
        }

        /* --- KARTA S FADE LINKOU --- */
        .furnace-main-card {
          background: linear-gradient(180deg, var(--panel2) 0%, var(--panel) 100%);
          border: 1px solid var(--border2);
          border-top: none;
          border-radius: 12px;
          padding: 24px 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 500px;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.02);
          position: relative;
        }

        .furnace-main-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            var(--rust) 15%,
            var(--rust) 85%,
            transparent 100%
          );
          z-index: 10;
          pointer-events: none;
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
        }

        /* --- INPUT WRAPPER --- */
        .furnace-input-wrap {
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 6px 12px;
          display: inline-flex;
          align-items: center;
          margin-bottom: 24px;
          transition: border-color 0.2s;
        }
        .furnace-input-wrap:focus-within {
          border-color: rgba(206, 66, 43, 0.4);
        }

        .furnace-btn {
          background: transparent;
          border: none;
          color: var(--text-dim);
          font-size: 18px;
          font-weight: 300;
          cursor: pointer;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.15s, transform 0.1s;
        }
        .furnace-btn:hover { color: var(--text-bright); }
        .furnace-btn:active { transform: scale(0.9); }

        .furnace-input {
          background: transparent;
          border: none;
          outline: none;
          text-align: center;
          width: 90px;
          font-family: var(--font-d);
          font-size: 26px;
          font-weight: 600;
          color: var(--text-bright);
          letter-spacing: 0.05em;
        }
        .furnace-input::-webkit-inner-spin-button,
        .furnace-input::-webkit-outer-spin-button {
          -webkit-appearance: none; margin: 0;
        }
        .furnace-input { -moz-appearance: textfield; }

        .furnace-sep {
          width: 1px;
          height: 14px;
          background: var(--border);
          margin: 0 8px;
        }

        /* --- VÝSLEDKY --- */
        .horizontal-results-grid {
          display: flex;
          gap: 8px;
          width: 100%;
          justify-content: center;
          margin-top: 8px;
        }

        .h-result-box {
          background: rgba(255, 255, 255, 0.015);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 8px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .h-result-box:hover {
          background: rgba(255, 255, 255, 0.03);
          border-color: rgba(255, 255, 255, 0.08);
        }

        .h-result-box img {
          width: 28px;
          height: 28px;
          object-fit: contain;
          margin-bottom: 8px;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
        }

        .h-result-val {
          font-family: var(--font-d);
          font-size: 22px;
          font-weight: 600;
          line-height: 1;
          margin-bottom: 2px;
        }
        
        .h-result-lbl {
          font-family: var(--font-ui);
          font-size: 9px;
          font-weight: 700;
          color: var(--text-dim);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
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
          <div className="sec-label" style={{ marginBottom: "16px" }}>
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
                  className="h-result-val"
                  style={{ color: "var(--text-bright)" }}
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
                    className="h-result-val"
                    style={{ color: "var(--wood-col)" }}
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
                    className="h-result-val"
                    style={{ color: "var(--coal-col)" }}
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
                className="icon"
                style={{ fontSize: "24px", marginBottom: "8px", opacity: 0.5 }}
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
