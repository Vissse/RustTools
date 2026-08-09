'use client'

import { useMemo, useState, useEffect } from "react";
import { useQueryStates, parseAsString } from "nuqs";
import { CalcShell } from "./CalcShell";
import { Img } from "./Img";
import { MAX_SLOTS } from "../lib/data/cupboard-data";
import {
  calculateOptimalTC,
  parseTime,
  generateStacks,
} from "../lib/cupboard-logic";
import { Feature, useFeatureUsed } from "../lib/analytics";
import type { Stack } from "../lib/types";

function TimeBlock({ value, label, className = "" }: { value: number; label: string; className?: string }) {
  return (
    <div className={`flex flex-col items-center min-w-[45px] ${className}`}>
      <span className="font-display font-bold text-text-bright text-[24px] md:text-[28px] leading-none [text-shadow:0_2px_10px_rgba(255,255,255,0.15)]">
        {value}
      </span>
      <span className="font-ui text-text-dim text-[10px] font-bold tracking-widest mt-0.5">
        {label}
      </span>
    </div>
  )
}

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
    return { parsedTime: parseTime(tc.daysFloat), stacks };
  }, [inputs]);

  const [delayedResult, setDelayedResult] = useState(result);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (result) {
      setDelayedResult(result);
      setIsExiting(false);
    } else if (delayedResult && !isExiting) {
      setIsExiting(true);
      const timer = setTimeout(() => {
        setDelayedResult(null);
        setIsExiting(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [result, delayedResult, isExiting]);

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

      <div className="fade-in-container flex flex-col items-center p-2 md:p-3 h-full overflow-y-auto w-full">
        <div className="flex flex-col items-center gap-2 w-full max-w-[520px]">
          <div className="text-[#a0a0a0] font-ui text-[15px] md:text-[16px] font-bold tracking-widest uppercase">
            Daily Upkeep Cost
          </div>

          <div className="grid grid-cols-2 w-full gap-2 mt-0">
            {RESOURCES.map((r) => (
              <div
                className="group/inp flex items-center gap-3 bg-white/1.5 border border-white/4 rounded-lg transition-all duration-200 focus-within:border-[rgba(206,66,43,0.4)] focus-within:bg-white/3 focus-within:shadow-[0_0_16px_rgba(206,66,43,0.08)] focus-within:translate-x-1 m-0 px-3 py-1.5"
                key={r.key}
              >
                <Img
                  src={r.img}
                  alt={r.alt}
                  className="object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] transition-transform duration-200 group-focus-within/inp:scale-110 w-8 h-8"
                />
                <input
                  type="number"
                  className="flex-1 bg-transparent border-0 text-text-bright font-display tracking-wider outline-none text-right p-0 placeholder:text-white/15 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 text-[18px]"
                  min="0"
                  placeholder="0"
                  value={inputs[r.key]}
                  onChange={(e) => setQ({ [r.urlKey]: e.target.value })}
                />
              </div>
            ))}
          </div>

          <button
            className="w-full p-2 bg-transparent border border-dashed border-white/15 rounded-lg text-[#888] font-display text-[13px] tracking-[0.15em] uppercase cursor-pointer transition-all duration-200 hover:text-rust hover:border-[rgba(206,66,43,0.4)] hover:bg-[rgba(206,66,43,0.05)] mt-0"
            onClick={() => setQ(null)}
          >
            Reset Values
          </button>
        </div>

        <div className="w-full max-w-[520px] flex flex-col items-stretch pb-2 mt-4 relative min-h-[300px]">
          <div className={`transition-all duration-300 ease-in-out origin-top w-full ${delayedResult ? (isExiting ? "opacity-0 scale-95 blur-[2px] pointer-events-none absolute inset-x-0" : "opacity-100 scale-100 blur-0 relative") : "hidden"}`}>
            {delayedResult && (
              <div>
                <div className="flex flex-col items-center justify-center mb-3 md:mb-4 bg-black/25 border border-[rgba(206,66,43,0.3)] shadow-[inset_0_0_20px_rgba(206,66,43,0.05),0_0_15px_rgba(206,66,43,0.1)] rounded-xl py-2.5 px-4 relative overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,transparent_0%,var(--rust)_50%,transparent_100%)] opacity-70" />
                  
                  <span className="font-display font-semibold text-text-dim uppercase tracking-[0.2em] text-[12px] md:text-[13px] mb-1.5">
                    Protected For
                  </span>
                  
                  <div className="flex items-center justify-center gap-1.5 md:gap-3">
                    <TimeBlock value={delayedResult.parsedTime.days} label="DAYS" />
                    <span className="text-rust/40 text-lg font-bold -mt-2">:</span>
                    <TimeBlock value={delayedResult.parsedTime.hours} label="HRS" />
                    <span className="text-rust/40 text-lg font-bold -mt-2">:</span>
                    <TimeBlock value={delayedResult.parsedTime.minutes} label="MIN" />
                    <span className="text-rust/40 text-lg font-bold -mt-2 hidden min-[400px]:block">:</span>
                    <TimeBlock value={delayedResult.parsedTime.seconds} label="SEC" className="hidden min-[400px]:flex" />
                  </div>
                </div>

                <div className="bg-black/25 border border-white/3 rounded-xl p-2.5">
                  <div className="grid grid-cols-6 gap-1 max-[480px]:grid-cols-3">
                    {Array.from({ length: MAX_SLOTS }).map((_, i) => {
                      const stack = delayedResult.stacks[i];
                      const itemKey = stack ? `${i}-${stack.type}-${stack.amount}` : `empty-${i}`;
                      return (
                        <div
                          className={`group/slot bg-white/2 border border-white/4 rounded-md aspect-square relative flex items-center justify-center transition-all duration-200 hover:bg-white/6 hover:-translate-y-0.5 hover:scale-105 hover:z-[2] hover:shadow-[0_8px_16px_rgba(0,0,0,0.5)] hover:border-white/10 ${stack && !isExiting ? "animate-[popIn_0.3s_cubic-bezier(0.2,0.8,0.2,1)_backwards]" : ""}`}
                          key={itemKey}
                          style={
                            stack && !isExiting ? { animationDelay: `${(i % 6) * 0.03}s` } : undefined
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
            )}
          </div>

          <div className={`transition-all duration-500 ease-in-out flex items-center justify-center flex-col gap-2.5 font-display text-base font-normal tracking-[0.15em] text-text-muted uppercase text-center leading-[1.9] absolute inset-0 pt-10 ${(!delayedResult || isExiting) ? "opacity-100 translate-y-0 delay-150" : "opacity-0 translate-y-4 pointer-events-none"}`}>
            <span className="text-rust text-[32px] leading-none mb-2 opacity-50">◈</span>
            <div className="text-[#888] leading-[1.6] text-center">
              Enter your daily upkeep cost
              <br />
              to calculate optimal capacity
            </div>
          </div>
        </div>
      </div>
    </CalcShell>
  );
}