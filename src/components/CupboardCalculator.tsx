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
      <style>{`
        .cupboard-single-layout {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          height: 100%;
          overflow-y: auto;
          width: 100%;
        }
        .cupboard-input-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          width: 100%;
          max-width: 500px;
        }
        .cupboard-inputs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          width: 100%;
        }
        .cupboard-output-section {
          width: 100%;
          max-width: 500px;
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }
      `}</style>

      <div className="cupboard-single-layout fade-in-container">
        <div className="cupboard-input-section">
          <div style={{ color: "#a0a0a0", fontFamily: "var(--font-ui)", fontSize: "14px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Daily Upkeep Cost
          </div>

          <div className="cupboard-inputs-grid">
            {RESOURCES.map((r) => (
              <div className="sleek-input-row" key={r.key} style={{ margin: 0, padding: '4px 12px' }}>
                <Img src={r.img} alt={r.alt} className="sleek-input-icon" style={{ width: '28px', height: '28px' }} />
                <input
                  type="number"
                  className="sleek-input-box"
                  min="0"
                  placeholder="0"
                  value={inputs[r.key]}
                  onChange={(e) =>
                    setInputs((prev) => ({ ...prev, [r.key]: e.target.value }))
                  }
                  style={{ fontSize: '16px' }}
                />
              </div>
            ))}
          </div>

          <button className="sleek-btn-reset" onClick={() => setInputs(EMPTY)} style={{ marginTop: '4px' }}>
            Reset Values
          </button>
        </div>

        <div className="metal-rule" style={{ width: '100%', margin: '24px 0' }} />

        <div className="cupboard-output-section">
          {result ? (
            <div>
              <div className="sleek-tc-status" style={{ justifyContent: 'center', marginBottom: '20px' }}>
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
            <div className="empty-state" style={{ minHeight: '160px' }}>
              <span
                className="icon"
                style={{ fontSize: "32px", marginBottom: "8px", opacity: 0.5 }}
              >
                ◈
              </span>
              <div style={{ color: "#888", lineHeight: 1.6, textAlign: 'center' }}>
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
