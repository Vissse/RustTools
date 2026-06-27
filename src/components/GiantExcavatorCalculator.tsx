'use client'

import { useMemo } from "react";
import { useQueryState, parseAsInteger } from "nuqs";
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
  // Diesel count lives in the URL (?b=) so a yield estimate can be shared.
  const [diesel, setDiesel] = useQueryState("b", parseAsInteger);

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

      <div className="single-layout fade-in-container">
        <div className="input-section">
          <Img
            src="/images/diesel_barrel.png"
            alt="Diesel Fuel"
            className="barrel-icon"
          />
          <div className="input-info">
            <div className="input-label-text">DIESEL BARRELS</div>
            <div className="free-counter-wrap mt-2">
              <button
                className="free-counter-btn"
                onClick={() => setDiesel((c) => Math.max(0, (c ?? 0) - 1) || null)}
              >
                −
              </button>
              <div className="free-separator" />
              <input
                type="number"
                min="0"
                className="invisible-num-input free-counter-input"
                value={diesel ?? ""}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "") setDiesel(null);
                  else {
                    const parsed = parseInt(val, 10);
                    if (!isNaN(parsed) && parsed >= 0) setDiesel(parsed);
                  }
                }}
              />
              <div className="free-separator" />
              <button
                className="free-counter-btn"
                onClick={() => setDiesel((c) => (c ?? 0) + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="metal-rule w-full my-10" />

        <div className="output-card">
          {safeDiesel > 0 ? (
            <div>
              <div className="excavator-time-display mb-5 justify-center">
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
            <div className="empty-state min-h-[200px]">
              <span
                className="icon text-[32px] mb-2 opacity-50"
              >
                ◈
              </span>
              <div className="text-[#888] leading-[1.6] text-center">
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