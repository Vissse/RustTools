import { useState, useMemo } from "react";
import { CalcShell } from "./CalcShell";
import { Img } from "./Img";
import { Feature, useFeatureUsed } from "../lib/analytics";

// Data podle Rust tabulky (odstraněny barvy)
const RATES = [
  {
    id: "hqm",
    name: "High Quality Metal Ore",
    yieldPerBarrel: 100,
    img: "/images/hq.metal.ore.png",
  },
  {
    id: "sulfur",
    name: "Sulfur Ore",
    yieldPerBarrel: 2000,
    img: "/images/sulfur.ore.png",
  },
  {
    id: "stone",
    name: "Stones",
    yieldPerBarrel: 10000,
    img: "/images/stones.png",
  },
  {
    id: "metal",
    name: "Metal Fragments",
    yieldPerBarrel: 5000,
    img: "/images/metal.fragments.png",
  },
];

export function GiantExcavatorCalculator() {
  const [diesel, setDiesel] = useState<number | "">(1);

  const safeDiesel = typeof diesel === "number" && diesel > 0 ? diesel : 0;

  useFeatureUsed(Feature.giantExcavator, `${diesel}`);

  const timeString = useMemo(() => {
    if (safeDiesel === 0) return "0 MIN";
    const totalMinutes = safeDiesel * 2;
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;

    if (hours > 0 && mins > 0) return `${hours}H ${mins}M`;
    if (hours > 0) return `${hours}H`;
    return `${mins} MIN`;
  }, [safeDiesel]);

  return (
    <CalcShell
      pageTitle={
        <>
          RUST <span>//</span> GIANT EXCAVATOR
        </>
      }
      headerAccent="GIANT"
      headerRest="EXCAVATOR"
      variant="cupboard"
    >
      <style>{`
        /* Skrytí nativních šipek inputu */
        .invisible-num-input::-webkit-inner-spin-button,
        .invisible-num-input::-webkit-outer-spin-button {
          -webkit-appearance: none; margin: 0;
        }
        .invisible-num-input { -moz-appearance: textfield; }

        /* Přesná kopie stylů počítadla z Raid kalkulačky */
        .free-counter-wrap {
          display: inline-flex; align-items: center;
        }
        .free-counter-btn {
          background: transparent; border: none; color: #757575;
          font-size: 20px; font-weight: 300; cursor: pointer; display: flex;
          align-items: center; justify-content: center; width: 32px; height: 32px;
          transition: all 0.2s ease; user-select: none;
        }
        .free-counter-btn:hover { color: #cc422c; transform: scale(1.15); }
        .free-counter-btn:active { transform: scale(0.95); }
        .free-separator {
          width: 1px; height: 24px;
          background: linear-gradient(to bottom, transparent, #4a4a4a, transparent);
          margin: 0 4px;
        }
        .free-counter-input {
          width: 44px; background: transparent; border: none; color: #fff;
          font-size: 18px; font-weight: 700; text-align: center; outline: none;
          font-family: inherit;
        }

        /* Nový minimalistický layout */
        .single-layout {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 20px;
          height: 100%;
          overflow-y: auto;
          width: 100%;
        }
        .input-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          width: 100%;
        }
        .barrel-icon {
          width: 120px;
          height: 120px;
          object-fit: contain;
          filter: drop-shadow(0 8px 16px rgba(0,0,0,0.6));
        }
        .input-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .input-label-text {
          color: #a0a0a0;
          font-family: var(--font-ui);
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .output-card {
          width: 100%;
          max-width: 600px;
        }
      `}</style>

      <div className="single-layout">
        <div className="input-section">
          <Img
            src="/images/diesel_barrel.png"
            alt="Diesel Fuel"
            className="barrel-icon"
          />
          <div className="input-info">
            <div className="input-label-text">DIESEL BARRELS</div>
            <div className="free-counter-wrap" style={{ marginTop: "8px" }}>
              <button
                className="free-counter-btn"
                onClick={() =>
                  setDiesel((c) =>
                    Math.max(0, (typeof c === "number" ? c : 0) - 1),
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
                value={diesel}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "") setDiesel("");
                  else {
                    const parsed = parseInt(val, 10);
                    if (!isNaN(parsed) && parsed >= 0) setDiesel(parsed);
                  }
                }}
              />
              <div className="free-separator" />
              <button
                className="free-counter-btn"
                onClick={() =>
                  setDiesel((c) => (typeof c === "number" ? c : 0) + 1)
                }
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="metal-rule" style={{ width: '100%', margin: '40px 0' }} />

        <div className="output-card">
          {safeDiesel > 0 ? (
            <div>
              <div className="excavator-time-display" style={{ marginBottom: '20px', justifyContent: 'center' }}>
                <span className="excavator-time-label">
                  Total Extraction Time
                </span>
                <span className="excavator-time-value">{timeString}</span>
              </div>

              <div className="excavator-list">
                {RATES.map((item, index) => {
                  const total = safeDiesel * item.yieldPerBarrel;

                  return (
                    <div
                      key={item.id}
                      className="excavator-row animate-yield"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="excavator-left">
                        <Img src={item.img} alt={item.name} />
                        <span className="excavator-name">{item.name}</span>
                      </div>

                      <div className="excavator-right">
                        <span className="excavator-total">
                          {total.toLocaleString()}
                        </span>
                        <span className="excavator-rate">
                          {item.yieldPerBarrel.toLocaleString()} / barrel
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="empty-state" style={{ minHeight: '200px' }}>
              <span
                className="icon"
                style={{ fontSize: "32px", marginBottom: "8px", opacity: 0.5 }}
              >
                ◈
              </span>
              <div style={{ color: "#888", lineHeight: 1.6, textAlign: 'center' }}>
                Enter the amount of Diesel Fuel
                <br />
                to calculate total yields
              </div>
            </div>
          )}
        </div>
      </div>
    </CalcShell>
  );
}
