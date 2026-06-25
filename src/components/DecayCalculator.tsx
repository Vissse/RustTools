import { useState, useMemo, useEffect } from "react";
import { CalcShell } from "./CalcShell";
import { Img } from "./Img";
import { Feature, useFeatureUsed } from "../lib/analytics";

const MATERIALS = [
  {
    id: "twig",
    name: "Twig",
    hp: 10,
    decayHours: 1,
    img: "/images/twig-wall.png",
  },
  {
    id: "wood",
    name: "Wood",
    hp: 250,
    decayHours: 3,
    img: "/images/wood-wall.png",
  },
  {
    id: "stone",
    name: "Stone",
    hp: 500,
    decayHours: 5,
    img: "/images/stone-wall.png",
  },
  {
    id: "metal",
    name: "Metal",
    hp: 1000,
    decayHours: 8,
    img: "/images/metal-wall.png",
  },
  {
    id: "armored",
    name: "Armored",
    hp: 2000,
    decayHours: 12,
    img: "/images/armored-wall.png",
  },
];

export function DecayCalculator() {
  const [selectedMaterial, setSelectedMaterial] = useState<string>("stone");
  const [currentHp, setCurrentHp] = useState<number | "">(500);

  const activeMat = MATERIALS.find((m) => m.id === selectedMaterial)!;

  useEffect(() => {
    setCurrentHp(activeMat.hp);
  }, [selectedMaterial, activeMat.hp]);

  const safeHp =
    typeof currentHp === "number" ? Math.min(currentHp, activeMat.hp) : 0;
  const hpPercent = Math.max(0, Math.min(100, (safeHp / activeMat.hp) * 100));
  const hpStep = activeMat.id === "twig" ? 1 : 10;

  const timeString = useMemo(() => {
    if (safeHp <= 0) return "0S";

    const totalSeconds = Math.round(
      (safeHp / activeMat.hp) * activeMat.decayHours * 3600,
    );
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    let str = "";
    if (hours > 0) str += `${hours}H `;
    if (mins > 0 || hours > 0) str += `${mins}M `;
    str += `${secs}S`;

    return str;
  }, [safeHp, activeMat]);

  useFeatureUsed(Feature.decay, `${selectedMaterial}|${currentHp}`);

  return (
    <CalcShell
      pageTitle={
        <>
          RUST <span>//</span> DECAY CALCULATOR
        </>
      }
      headerAccent="DECAY"
      headerRest="CALCULATOR"
      variant="recycling"
    >
      <style>{`
        .decay-container {
          flex: 1;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        @keyframes slideUpFade {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .decay-anim-1 { animation: slideUpFade 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) backwards; animation-delay: 0.0s; }
        .decay-anim-2 { animation: slideUpFade 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) backwards; animation-delay: 0.1s; }
        .decay-anim-3 { animation: slideUpFade 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) backwards; animation-delay: 0.2s; }
        .decay-anim-staggered { animation: slideUpFade 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) backwards; }

        .mat-selector-row {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: nowrap;
          margin-bottom: 40px;
          width: 100%;
        }

        @media (max-width: 640px) {
          .mat-selector-row {
            flex-wrap: wrap;
          }
        }

        /* --- KARTA S FADE LINKOU --- */
        .decay-card {
          background: linear-gradient(180deg, var(--panel2) 0%, var(--panel) 100%);
          border: 1px solid var(--border2);
          border-top: none; /* Smažeme tvrdou horní linku, nahradí ji fade */
          border-radius: 12px;
          padding: clamp(24px, 6vw, 40px);
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 500px;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.02);
          position: relative;
        }

        /* Tady je tvoje vysněná oranžová fade linka */
        .decay-card::before {
          content: '';
          position: absolute;
          top: 0; 
          left: 0; 
          right: 0; 
          height: 2px;
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

        .decay-time-title {
          font-family: var(--font-ui);
          font-size: 11px;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 8px;
        }

        .decay-time-value {
          font-family: var(--font-d);
          font-size: clamp(48px, 10vw, 64px);
          font-weight: 600;
          color: var(--rust);
          line-height: 1;
          text-shadow: 0 0 24px rgba(206, 66, 43, 0.2);
          margin-bottom: 32px;
          font-variant-numeric: tabular-nums;
          letter-spacing: 0.02em;
        }

        .decay-input-wrap {
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 6px 12px;
          display: inline-flex;
          align-items: center;
          transition: border-color 0.2s;
        }
        .decay-input-wrap:focus-within {
          border-color: rgba(206, 66, 43, 0.4);
        }

        .decay-btn {
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
        .decay-btn:hover { color: var(--text-bright); }
        .decay-btn:active { transform: scale(0.9); }

        .decay-input {
          background: transparent;
          border: none;
          outline: none;
          text-align: center;
          width: 80px;
          font-family: var(--font-d);
          font-size: 26px;
          font-weight: 600;
          color: var(--text-bright);
          letter-spacing: 0.05em;
        }
        .decay-input::-webkit-inner-spin-button,
        .decay-input::-webkit-outer-spin-button {
          -webkit-appearance: none; margin: 0;
        }
        .decay-input { -moz-appearance: textfield; }

        .decay-sep {
          width: 1px;
          height: 14px;
          background: var(--border);
          margin: 0 8px;
        }
      `}</style>

      <div className="decay-container fade-in-container">
        {/* 1. SELEKTOR MATERIÁLU */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="sec-label decay-anim-1" style={{ marginBottom: "16px" }}>
            BUILDING MATERIAL
          </div>
          <div className="mat-selector-row">
            {MATERIALS.map((m, index) => (
              <button
                key={m.id}
                className={`minimal-box-btn decay-anim-staggered${selectedMaterial === m.id ? " active" : ""}`}
                onClick={() => setSelectedMaterial(m.id)}
                style={{ 
                  minWidth: "100px", 
                  flexShrink: 0,
                  animationDelay: `${index * 0.03}s`
                }}
              >
                <Img
                  src={m.img}
                  alt={m.name}
                  style={m.id === "twig" ? { opacity: 0.6 } : {}}
                />
                <span className="minimal-box-name">{m.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. CENTRÁLNÍ KARTA */}
        <div className="decay-card decay-anim-2">
          <div style={{ textAlign: "center" }}>
            <div className="decay-time-title">Time Until Destroyed</div>
            <div className="decay-time-value">{timeString}</div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              marginBottom: "36px",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "10px",
                color: "var(--text-dim)",
                fontWeight: 700,
                letterSpacing: "0.15em",
                marginBottom: "8px",
              }}
            >
              CURRENT HP
            </div>

            <div className="decay-input-wrap">
              <button
                className="decay-btn"
                onClick={() =>
                  setCurrentHp((c) =>
                    Math.max(0, (typeof c === "number" ? c : 0) - hpStep),
                  )
                }
              >
                −
              </button>
              <div className="decay-sep" />
              <input
                type="number"
                min="0"
                max={activeMat.hp}
                className="decay-input"
                value={currentHp}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "") setCurrentHp("");
                  else {
                    const parsed = parseInt(val, 10);
                    if (!isNaN(parsed) && parsed >= 0) {
                      setCurrentHp(Math.min(parsed, activeMat.hp));
                    }
                  }
                }}
              />
              <div className="decay-sep" />
              <button
                className="decay-btn"
                onClick={() =>
                  setCurrentHp((c) =>
                    Math.min(
                      activeMat.hp,
                      (typeof c === "number" ? c : 0) + hpStep,
                    ),
                  )
                }
              >
                +
              </button>
            </div>
          </div>

          <div className="decay-anim-3" style={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
                fontFamily: "var(--font-ui)",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.05em",
              }}
            >
              <span style={{ color: "var(--text-bright)" }}>{safeHp} HP</span>
              <span style={{ color: "var(--text-dim)" }}>
                {activeMat.hp} HP
              </span>
            </div>

            <div
              className="modern-hp-wrapper"
              style={{
                height: "4px",
                background: "var(--border)",
                borderRadius: "2px",
                overflow: "hidden",
              }}
            >
              <div
                className="modern-hp-fill"
                style={{
                  width: `${hpPercent}%`,
                  background: "var(--rust)",
                  transition: "width 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />
              <div
                className="modern-hp-glow"
                style={{
                  width: `${hpPercent}%`,
                  background: "var(--rust)",
                  opacity: 0.3,
                  filter: "blur(4px)",
                  transition: "width 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </CalcShell>
  );
}
