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

      <div className="fade-in-container flex flex-col items-center px-5 py-10 h-full overflow-y-auto w-full">
        <div className="flex flex-col items-center gap-4 w-full">
          <Img
            src="/images/diesel_barrel.png"
            alt="Diesel Fuel"
            className="w-[120px] h-[120px] object-contain"
          />
          <div className="flex flex-col items-center gap-2">
            <div className="text-[#a0a0a0] font-ui text-sm font-bold tracking-widest uppercase">DIESEL BARRELS</div>
            <div className="inline-flex items-center mt-2">
              <button
                className="bg-transparent border-0 text-[#757575] text-xl font-light cursor-pointer flex items-center justify-center w-8 h-8 transition-all duration-200 select-none hover:text-[#cc422c] hover:scale-[1.15] active:scale-[0.95]"
                onClick={() => setDiesel((c) => Math.max(0, (c ?? 0) - 1) || null)}
              >
                −
              </button>
              <div className="w-px h-6 bg-[linear-gradient(to_bottom,transparent,#4a4a4a,transparent)] mx-1" />
              <input
                type="number"
                min="0"
                className="w-11 bg-transparent border-0 text-white text-[18px] font-bold text-center outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0"
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
              <div className="w-px h-6 bg-[linear-gradient(to_bottom,transparent,#4a4a4a,transparent)] mx-1" />
              <button
                className="bg-transparent border-0 text-[#757575] text-xl font-light cursor-pointer flex items-center justify-center w-8 h-8 transition-all duration-200 select-none hover:text-[#cc422c] hover:scale-[1.15] active:scale-[0.95]"
                onClick={() => setDiesel((c) => (c ?? 0) + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="metal-rule w-full my-10" />

        <div className="w-full max-w-[600px]">
          {safeDiesel > 0 ? (
            <div>
              <div className="flex items-baseline gap-3 pb-4 border-b border-white/5 mb-5 justify-center">
                <span className="font-ui text-[13px] font-bold text-[#757575] uppercase tracking-widest">
                  Total Extraction Time
                </span>
                <span className="font-display text-[32px] font-semibold text-rust leading-none [text-shadow:0_0_16px_var(--rust-glow)]">{timeString}</span>
              </div>

              <div className="flex flex-col gap-3">
                {RATES.map((item, index) => {
                  const total = safeDiesel * item.yieldPerBarrel;

                  return (
                    <div
                      key={item.id}
                      className="group/exc flex items-center justify-between px-4 py-3 bg-white/1.5 rounded-lg transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] relative overflow-hidden hover:bg-white/3 hover:translate-x-1 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-transparent before:transition-[background] before:duration-300 hover:before:bg-rust hover:before:shadow-[0_0_8px_var(--rust)] animate-[slideUpFade_0.4s_cubic-bezier(0.2,0.8,0.2,1)_backwards]"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="flex items-center gap-4">
                        <Img
                          src={item.img}
                          alt={item.name}
                          className="w-9 h-9 object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover/exc:scale-[1.15] group-hover/exc:rotate-[5deg]"
                        />
                        <span className="font-ui text-[15px] font-bold text-[#d0d0d0] tracking-[0.02em]">{item.name}</span>
                      </div>

                      <div className="flex flex-col items-end">
                        <span className="font-display text-2xl font-semibold text-white leading-none">
                          {total.toLocaleString()}
                        </span>
                        <span className="font-ui text-[11px] text-[#666] font-semibold mt-1 tracking-wider">
                          {item.yieldPerBarrel.toLocaleString()} / barrel
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center flex-col gap-2.5 font-display text-base font-normal tracking-[0.15em] text-text-muted uppercase text-center leading-[1.9] min-h-[200px]">
              <span className="text-rust text-[32px] leading-none mb-2 opacity-50">◈</span>
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