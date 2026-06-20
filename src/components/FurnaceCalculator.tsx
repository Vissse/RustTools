import { useState, useMemo, useEffect } from "react";
import { CalcShell } from "./CalcShell";
import { Img } from "./Img";

// 1. Importy tvých vygenerovaných dat
import { Barbeque as BarbequeData } from "../lib/data/smelting-data/smelting-data-barbeque";
import { Campfire as CampfireData } from "../lib/data/smelting-data/smelting-data-campfire";
import { Furnace as FurnaceData } from "../lib/data/smelting-data/smelting-data-furnace";
import { LargeFurnace as LargeFurnaceData } from "../lib/data/smelting-data/smelting-data-large-furnace";
import { SmallOilRefinery as OilRefineryData } from "../lib/data/smelting-data/smelting-data-small-oil-refinery";
import { SmallStoneFireplace as StoneFireplaceData } from "../lib/data/smelting-data/smelting-data-small-stone-fireplace";

// Typ odpovídající tomu, co vygeneroval Python skript
export interface SmeltingProcess {
  inputItem: string;
  woodRequired: number;
  outputItem: string;
  outputQuantity: string | number;
  timeSeconds: number;
}

// 2. Definice všech tavení/vaření stanic
const SMELTERS = [
  {
    id: "furnace",
    name: "Furnace",
    slots: 3, // Běžně se ruda dělí na 3 stacky
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
    slots: 1, // Zpracovává se v jednom stacku
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
    img: "/images/barbeque.png",
    data: BarbequeData,
  },
  {
    id: "small-stone-fireplace",
    name: "Stone Fireplace",
    slots: 1,
    img: "/images/small.stone.fireplace.png",
    data: StoneFireplaceData,
  },
];

// Pomocná funkce pro spárování názvu s obrázkem (řeší mezery a velká písmena)
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
  };
  return `/images/${map[name] || name.toLowerCase().replace(/ /g, ".") + ".png"}`;
}

export function FurnaceCalculator() {
  const [selectedSmelterId, setSelectedSmelterId] = useState<string>("furnace");
  const [selectedProcessIdx, setSelectedProcessIdx] = useState<number>(0);
  const [quantity, setQuantity] = useState<number | "">(1000);

  const activeSmelter = SMELTERS.find((s) => s.id === selectedSmelterId)!;
  const safeQty = typeof quantity === "number" && quantity > 0 ? quantity : 0;

  // Když se změní typ pece, musíme resetovat index vybraného procesu,
  // abychom nesahali mimo pole nového datového souboru
  useEffect(() => {
    setSelectedProcessIdx(0);
  }, [selectedSmelterId]);

  const activeProcess = activeSmelter.data[selectedProcessIdx];

  // --- VÝPOČTY ---
  const results = useMemo(() => {
    if (safeQty === 0 || !activeProcess) return null;

    // Optimální čas (pokud pec dovoluje víc slotů, rozdělíme surovinu na části)
    const itemsPerSlot = Math.ceil(safeQty / activeSmelter.slots);
    const totalSeconds = Math.ceil(itemsPerSlot * activeProcess.timeSeconds);

    // Formátování času do textu
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    let timeStr = "";
    if (hours > 0) timeStr += `${hours}H `;
    if (mins > 0 || hours > 0) timeStr += `${mins}M `;
    timeStr += `${secs}S`;

    // Výstup (Yield)
    const outStr = String(activeProcess.outputQuantity);
    let yieldAmount = 0;
    if (outStr.includes("%")) {
      const pct = parseFloat(outStr.replace("%", ""));
      yieldAmount = Math.floor(safeQty * (pct / 100));
    } else {
      yieldAmount = safeQty * parseFloat(outStr);
    }

    // Spotřeba dřeva
    const woodRequired = Math.ceil(safeQty * activeProcess.woodRequired);

    // Uhlí jako vedlejší produkt (jen pokud samo dřevo není hlavním vstupem)
    let charcoal = 0;
    if (woodRequired > 0 && activeProcess.inputItem !== "Wood") {
      charcoal = Math.floor(woodRequired * 0.75); // 75% šance na uhlí za každé shořelé dřevo
    }

    return {
      timeStr,
      yieldAmount,
      woodRequired,
      charcoal,
    };
  }, [safeQty, activeSmelter, activeProcess]);

  return (
    <CalcShell
      pageTitle={
        <>
          RUST <span>//</span> SMELTING CALCULATOR
        </>
      }
      headerAccent="SMELTING"
      headerRest="CALCULATOR"
      variant="cupboard" // Využijeme rozvržení s levým a pravým panelem
    >
      {/* LEVÝ PANEL: Vstupy */}
      <div className="panel-left">
        {/* 1. Výběr stanice */}
        <div className="sec-label">SMELTER TYPE</div>
        <div
          className="minimal-btn-grid"
          style={{ maxHeight: "none", marginBottom: "24px" }}
        >
          {SMELTERS.map((s) => (
            <button
              key={s.id}
              className={`minimal-box-btn${selectedSmelterId === s.id ? " active" : ""}`}
              onClick={() => setSelectedSmelterId(s.id)}
            >
              <Img src={s.img} alt={s.name} />
              <span className="minimal-box-name">{s.name}</span>
            </button>
          ))}
        </div>

        {/* 2. Výběr procesu (na základě stanice) */}
        <div className="sec-label">TARGET PROCESS</div>
        <div
          className="minimal-btn-grid"
          style={{ maxHeight: "none", marginBottom: "24px" }}
        >
          {activeSmelter.data.map((process, idx) => (
            <button
              key={idx}
              className={`minimal-box-btn${selectedProcessIdx === idx ? " active" : ""}`}
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

        {/* 3. Množství (Counter) */}
        <div className="sec-label">AMOUNT TO PROCESS</div>
        <div
          className="free-counter-wrap"
          style={{
            background: "rgba(255,255,255,0.02)",
            padding: "8px 16px",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.05)",
            marginTop: "8px",
            alignSelf: "flex-start",
          }}
        >
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
          <div className="free-separator" />
          <input
            type="number"
            min="0"
            className="invisible-num-input free-counter-input"
            style={{ fontSize: "22px", width: "80px" }}
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
          <div className="free-separator" />
          <button
            className="free-counter-btn"
            onClick={() =>
              setQuantity((c) => (typeof c === "number" ? c : 0) + 100)
            }
          >
            +
          </button>
        </div>
      </div>

      {/* PRAVÝ PANEL: Výsledky */}
      <div className="panel-right">
        {results ? (
          <div>
            <div className="excavator-time-display">
              <span className="excavator-time-label">
                Total Processing Time
              </span>
              <span className="excavator-time-value">{results.timeStr}</span>
            </div>

            <div className="excavator-list">
              {/* VÝSTUP: Zpracovaný materiál */}
              <div
                className="excavator-row animate-yield"
                style={{ animationDelay: "0s" }}
              >
                <div className="excavator-left">
                  <Img
                    src={getImageFromName(activeProcess.outputItem)}
                    alt={activeProcess.outputItem}
                  />
                  <span className="excavator-name" style={{ color: "#fff" }}>
                    {activeProcess.outputItem}
                  </span>
                </div>
                <div className="excavator-right">
                  <span className="excavator-total" style={{ color: "#fff" }}>
                    {results.yieldAmount.toLocaleString()}
                  </span>
                  <span className="excavator-rate">YIELD</span>
                </div>
              </div>

              {/* VÝSTUP: Dřevo */}
              {results.woodRequired > 0 && (
                <div
                  className="excavator-row animate-yield"
                  style={{ animationDelay: "0.05s" }}
                >
                  <div className="excavator-left">
                    <Img src="/images/wood.png" alt="Wood" />
                    <span
                      className="excavator-name"
                      style={{ color: "#d0d0d0" }}
                    >
                      Wood Required
                    </span>
                  </div>
                  <div className="excavator-right">
                    <span
                      className="excavator-total"
                      style={{ color: "#c9b07a" }}
                    >
                      {results.woodRequired.toLocaleString()}
                    </span>
                    <span className="excavator-rate">FUEL</span>
                  </div>
                </div>
              )}

              {/* VÝSTUP: Uhlí */}
              {results.charcoal > 0 && (
                <div
                  className="excavator-row animate-yield"
                  style={{ animationDelay: "0.1s" }}
                >
                  <div className="excavator-left">
                    <Img src="/images/charcoal.png" alt="Charcoal" />
                    <span
                      className="excavator-name"
                      style={{ color: "#d0d0d0" }}
                    >
                      Charcoal Produced
                    </span>
                  </div>
                  <div className="excavator-right">
                    <span
                      className="excavator-total"
                      style={{ color: "#8a7d6e" }}
                    >
                      {results.charcoal.toLocaleString()}
                    </span>
                    <span className="excavator-rate">BYPRODUCT</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <span
              className="icon"
              style={{ fontSize: "32px", marginBottom: "8px", opacity: 0.5 }}
            >
              ◈
            </span>
            <div style={{ color: "#888", lineHeight: 1.6 }}>
              Select a process and enter an amount
              <br />
              to calculate the requirements
            </div>
          </div>
        )}
      </div>
    </CalcShell>
  );
}
