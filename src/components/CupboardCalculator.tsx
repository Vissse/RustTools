import { useMemo, useState } from "react";
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

const RESOURCES = [
  { key: "wood", img: "/images/wood.png", alt: "Wood" },
  { key: "stone", img: "/images/stones.png", alt: "Stone" },
  { key: "metal", img: "/images/metal.fragments.png", alt: "Metal Fragments" },
  { key: "hqm", img: "/images/metal.refined.png", alt: "High Quality Metal" },
] as const;

type Inputs = Record<(typeof RESOURCES)[number]["key"], string>;

const EMPTY: Inputs = { wood: "", stone: "", metal: "", hqm: "" };

export function CupboardCalculator() {
  const [inputs, setInputs] = useState<Inputs>(EMPTY);

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
          <div className="text-[#a0a0a0] font-ui text-[14px] font-bold tracking-[0.1em] uppercase">
            Daily Upkeep Cost
          </div>

          <div className="cupboard-inputs-grid">
            {RESOURCES.map((r) => (
              <div className="sleek-input-row m-0 px-3 py-1" key={r.key}>
                <Img src={r.img} alt={r.alt} className="sleek-input-icon w-7 h-7" />
                <input
                  type="number"
                  className="sleek-input-box text-[16px]"
                  min="0"
                  placeholder="0"
                  value={inputs[r.key]}
                  onChange={(e) =>
                    setInputs((prev) => ({ ...prev, [r.key]: e.target.value }))
                  }
                />
              </div>
            ))}
          </div>

          <button className="sleek-btn-reset mt-1" onClick={() => setInputs(EMPTY)}>
            Reset Values
          </button>
        </div>

        <div className="metal-rule w-full my-6" />

        <div className="cupboard-output-section">
          {result ? (
            <div>
              <div className="sleek-tc-status justify-center mb-5">
                Protected for <span>{result.time}</span>
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
