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

      <div className="cupboard-single-layout fade-in-container">
        <div className="cupboard-input-section">
          <div className="text-[#a0a0a0] font-ui text-[18px] font-bold tracking-[0.1em] uppercase">
            Daily Upkeep Cost
          </div>

          <div className="cupboard-inputs-grid gap-4 mt-2">
            {RESOURCES.map((r) => (
              <div className="sleek-input-row m-0 px-4 py-2" key={r.key}>
                <Img src={r.img} alt={r.alt} className="sleek-input-icon w-10 h-10" />
                <input
                  type="number"
                  className="sleek-input-box text-[20px]"
                  min="0"
                  placeholder="0"
                  value={inputs[r.key]}
                  onChange={(e) => setQ({ [r.urlKey]: e.target.value })}
                />
              </div>
            ))}
          </div>

          <button className="sleek-btn-reset mt-1" onClick={() => setQ(null)}>
            Reset Values
          </button>
        </div>

        <div className="metal-rule w-full my-4" />

        <div className="cupboard-output-section">
          {result ? (
            <div>
              <div className="sleek-tc-status justify-center mb-3 text-[18px]">
                Protected for <span className="text-[22px] ml-2">{result.time}</span>
              </div>

              <div className="sleek-tc-grid-container">
                <div className="sleek-tc-grid">
                  {Array.from({ length: MAX_SLOTS }).map((_, i) => {
                    const stack = result.stacks[i];
                    return (
                      <div
                        className={`sleek-tc-slot ${stack ? "has-item" : ""}`}
                        key={i}
                        style={
                          stack ? { animationDelay: `${i * 0.025}s` } : undefined
                        }
                      >
                        {stack && (
                          <>
                            <Img src={stack.img} alt={stack.type} />
                            <span className="sleek-tc-qty">
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
            <div className="empty-state min-h-[160px]">
              <span
                className="icon text-[32px] mb-2 opacity-50"
              >
                ◈
              </span>
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