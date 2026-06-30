'use client'

import { useMemo } from "react";
import { useQueryStates, parseAsString } from "nuqs";
import { CalcShell } from "./CalcShell";
import { Img } from "./Img";
import { MAX_SLOTS } from "../lib/data/cupboard-data";
import {
  calculateOptimalTC,
  formatTime,
  generateStacks,
} from "../lib/cupboard-logic";
import { Feature, useFeatureUsed } from "../lib/analytics";
import type { Stack } from "../lib/types";

// `urlKey` is the short query-string key shared in URLs (e.g. ?w=1000&s=500).
const RESOURCES = [
  { key: "wood", urlKey: "w", img: "/images/wood.png", alt: "Wood" },
  { key: "stone", urlKey: "s", img: "/images/stones.png", alt: "Stone" },
  { key: "metal", urlKey: "m", img: "/images/metal.fragments.png", alt: "Metal Fragments" },
  { key: "hqm", urlKey: "h", img: "/images/metal.refined.png", alt: "High Quality Metal" },
] as const;

export function CupboardCalculator() {
  // Inputs live in the URL so a filled-in upkeep cost can be shared. Kept as
  // strings to preserve the empty-while-typing UX; blanks are dropped from the URL.
  const [q, setQ] = useQueryStates(
    {
      w: parseAsString.withDefault(""),
      s: parseAsString.withDefault(""),
      m: parseAsString.withDefault(""),
      h: parseAsString.withDefault(""),
    },
    { history: "replace" },
  );
  const inputs = { wood: q.w, stone: q.s, metal: q.m, hqm: q.h };

  const result = useMemo(() => {
    const wood = parseInt(inputs.wood) || 0;
    const stone = parseInt(inputs.stone) || 0;
    const metal = parseInt(inputs.metal) || 0;
    const hqm = parseInt(inputs.hqm) || 0;

    const tc = calculateOptimalTC(wood, stone, metal, hqm);
    if (!tc) return null;

    const stacks: Stack[] = [
      ...generateStacks(tc.wood, "wood"),
      ...generateStacks(tc.stone, "stone"),
      ...generateStacks(tc.metal, "metal"),
      ...generateStacks(tc.hqm, "hqm"),
    ];
    return { time: formatTime(tc.daysFloat), stacks };
  }, [inputs]);

  useFeatureUsed(
    Feature.cupboard,
    `${inputs.wood}|${inputs.stone}|${inputs.metal}|${inputs.hqm}`,
  );

  return (
    <CalcShell
      pageTitle={
        <>
          RUST <span>//</span> CUPBOARD CALCULATOR
        </>
      }
      headerAccent="CUPBOARD"
      headerRest="CALCULATOR"
      variant="cupboard"
    >

      <div className="fade-in-container flex flex-col items-center p-5 h-full overflow-y-auto w-full">
        <div className="flex flex-col items-center gap-4 w-full max-w-[520px]">
          <div className="text-[#a0a0a0] font-ui text-[18px] font-bold tracking-widest uppercase">
            Daily Upkeep Cost
          </div>

          <div className="grid grid-cols-2 w-full gap-4 mt-2">
            {RESOURCES.map((r) => (
              <div
                className="group/inp flex items-center gap-4 bg-white/1.5 border border-white/4 rounded-lg transition-all duration-200 focus-within:border-[rgba(206,66,43,0.4)] focus-within:bg-white/3 focus-within:shadow-[0_0_16px_rgba(206,66,43,0.08)] focus-within:translate-x-1 m-0 px-4 py-2"
                key={r.key}
              >
                <Img
                  src={r.img}
                  alt={r.alt}
                  className="object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] transition-transform duration-200 group-focus-within/inp:scale-110 w-10 h-10"
                />
                <input
                  type="number"
                  className="flex-1 bg-transparent border-0 text-text-bright font-display tracking-wider outline-none text-right p-0 placeholder:text-white/15 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 text-[20px]"
                  min="0"
                  placeholder="0"
                  value={inputs[r.key]}
                  onChange={(e) => setQ({ [r.urlKey]: e.target.value })}
                />
              </div>
            ))}
          </div>

          <button
            className="w-full p-3 bg-transparent border border-dashed border-white/15 rounded-lg text-[#888] font-display text-[15px] tracking-[0.15em] uppercase cursor-pointer transition-all duration-200 hover:text-rust hover:border-[rgba(206,66,43,0.4)] hover:bg-[rgba(206,66,43,0.05)] mt-1"
            onClick={() => setQ(null)}
          >
            Reset Values
          </button>
        </div>

        <div className="metal-rule w-full my-4" />

        <div className="w-full max-w-[520px] flex flex-col items-stretch">
          {result ? (
            <div>
              <div className="font-ui font-semibold text-[#a0a0a0] flex items-center gap-2.5 uppercase tracking-wider justify-center mb-3 text-[18px]">
                Protected for{" "}
                <span className="text-text-bright font-bold bg-[rgba(206,66,43,0.15)] px-2.5 py-1 rounded-md border border-[rgba(206,66,43,0.3)] shadow-[0_0_10px_rgba(206,66,43,0.1)] text-[22px] ml-2">
                  {result.time}
                </span>
              </div>

              <div className="bg-black/25 border border-white/3 rounded-xl p-4">
                <div className="grid grid-cols-6 gap-2 max-[480px]:grid-cols-3">
                  {Array.from({ length: MAX_SLOTS }).map((_, i) => {
                    const stack = result.stacks[i];
                    return (
                      <div
                        className={`group/slot bg-white/2 border border-white/4 rounded-md aspect-square relative flex items-center justify-center transition-all duration-200 hover:bg-white/6 hover:-translate-y-0.5 hover:scale-105 hover:z-[2] hover:shadow-[0_8px_16px_rgba(0,0,0,0.5)] hover:border-white/10 ${stack ? "animate-[popIn_0.3s_cubic-bezier(0.2,0.8,0.2,1)_backwards]" : ""}`}
                        key={i}
                        style={
                          stack ? { animationDelay: `${i * 0.025}s` } : undefined
                        }
                      >
                        {stack && (
                          <>
                            <Img
                              src={stack.img}
                              alt={stack.type}
                              className="w-[55%] h-[55%] object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)] transition-transform duration-200 group-hover/slot:scale-[1.15] group-hover/slot:drop-shadow-[0_6px_8px_rgba(0,0,0,0.8)]"
                            />
                            <span className="absolute bottom-0.5 right-1 font-ui text-[15px] font-bold text-[#e0e0e0] [text-shadow:1px_1px_0_#000,-1px_-1px_0_#000,1px_-1px_0_#000,-1px_1px_0_#000,0_2px_4px_rgba(0,0,0,0.8)] tracking-wider pointer-events-none">
                              x{stack.amount.toLocaleString()}
                            </span>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center flex-col gap-2.5 font-display text-base font-normal tracking-[0.15em] text-text-muted uppercase text-center leading-[1.9] min-h-[160px]">
              <span className="text-rust text-[32px] leading-none mb-2 opacity-50">◈</span>
              <div className="text-[#888] leading-[1.6] text-center">
                Enter your daily upkeep cost
                <br />
                to calculate optimal capacity
              </div>
            </div>
          )}
        </div>
      </div>
    </CalcShell>
  );
}