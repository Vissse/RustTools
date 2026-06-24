import { useState, useMemo, useEffect } from "react";
import { CalcShell } from "./CalcShell";
import { Img } from "./Img";
import { Feature, useFeatureUsed } from "../lib/analytics";

// Data vytažená z tvých screenshotů
const MATERIALS = [
  {
    id: "twig",
    name: "Twig",
    hp: 10,
    decayHours: 1,
    img: "/images/twig-wall.png",
    color: "#a08b6c",
  },
  {
    id: "wood",
    name: "Wood",
    hp: 250,
    decayHours: 3,
    img: "/images/wood-wall.png",
    color: "#c9b07a",
  },
  {
    id: "stone",
    name: "Stone",
    hp: 500,
    decayHours: 5,
    img: "/images/stone-wall.png",
    color: "#a9a9a9",
  },
  {
    id: "metal",
    name: "Metal",
    hp: 1000,
    decayHours: 8,
    img: "/images/metal-wall.png",
    color: "#a4b3c6",
  },
  {
    id: "armored",
    name: "Armored",
    hp: 2000,
    decayHours: 12,
    img: "/images/armored-wall.png",
    color: "#ffffff",
  },
];

export function DecayCalculator() {
  const [selectedMaterial, setSelectedMaterial] = useState<string>("stone");
  const [currentHp, setCurrentHp] = useState<number | "">(500);

  const activeMat = MATERIALS.find((m) => m.id === selectedMaterial)!;

  // Při změně materiálu resetujeme HP (input i stav) na max HP zvoleného materiálu
  useEffect(() => {
    setCurrentHp(activeMat.hp);
  }, [selectedMaterial, activeMat.hp]);

  const safeHp =
    typeof currentHp === "number" ? Math.min(currentHp, activeMat.hp) : 0;
  const hpPercent = Math.max(0, Math.min(100, (safeHp / activeMat.hp) * 100));

  // Výpočet zbývajícího času
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
      variant="recycling" // Používáme "recycling" protože má flexibilní tělo přes celou výšku (85vh)
    >
      <style>{`
        /* Kompletní vycentrování celého obsahu */
        .decay-container {
          flex: 1;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center; /* Střed obrazovky vertikálně i horizontálně */
          padding: 20px;
        }

        /* Nástupní animace prvků */
        @keyframes slideUpFade {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .decay-anim-1 { animation: slideUpFade 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) backwards; animation-delay: 0.0s; }
        .decay-anim-2 { animation: slideUpFade 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) backwards; animation-delay: 0.1s; }
        .decay-anim-3 { animation: slideUpFade 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) backwards; animation-delay: 0.2s; }

        /* Centrování materiálů na 1 řádek */
        .mat-selector-row {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: nowrap; /* STRIKTNĚ VYNUCENÝ JEDEN ŘÁDEK */
          margin-bottom: 40px;
          width: 100%;
        }
        /* Below 640px the buttons no longer fit on one row and were spilling out
           of the viewport — let them wrap onto multiple lines. */
        @media (max-width: 640px) {
          .mat-selector-row {
            flex-wrap: wrap;
          }
        }

        /* Hlavní karta výsledků */
        .decay-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: clamp(20px, 6vw, 48px);
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 600px; /* Trošku rozšířeno pro hezčí proporce */
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4);
          position: relative;
          overflow: hidden;
        }

        /* Jemný vrchní highlight karty */
        .decay-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, var(--rust), transparent);
          opacity: 0.5;
        }

        .decay-time-title {
          font-size: 11px;
          font-weight: 700;
          color: #757575;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          margin-bottom: 12px;
        }

        .decay-time-value {
          font-size: 72px; /* Zvětšeno pro wow efekt */
          font-weight: 800;
          color: var(--rust);
          line-height: 1;
          text-shadow: 0 0 32px rgba(204, 66, 44, 0.3);
          margin-bottom: 40px;
          font-variant-numeric: tabular-nums;
        }

        /* Skrytí šipek u inputu */
        .decay-input::-webkit-inner-spin-button,
        .decay-input::-webkit-outer-spin-button {
          -webkit-appearance: none; margin: 0;
        }
        .decay-input { -moz-appearance: textfield; }
      `}</style>

      {/* ŽÁDNÝ .panel-left / .panel-right! Čistý obal. */}
      <div className="decay-container">
        {/* 1. SELEKTOR MATERIÁLU */}
        <div
          className="decay-anim-1"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="sec-label" style={{ marginBottom: "16px" }}>
            BUILDING MATERIAL
          </div>
          <div className="mat-selector-row">
            {MATERIALS.map((m) => (
              <button
                key={m.id}
                className={`minimal-box-btn${selectedMaterial === m.id ? " active" : ""}`}
                onClick={() => setSelectedMaterial(m.id)}
                style={{ minWidth: "100px", flexShrink: 0 }}
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

        {/* 2. CENTRÁLNÍ KARTA (Input + Výsledek) */}
        <div className="decay-card decay-anim-2">
          {/* Výsledný čas */}
          <div style={{ textAlign: "center" }}>
            <div className="decay-time-title">Time Until Destroyed</div>
            <div className="decay-time-value">{timeString}</div>
          </div>

          {/* Vstupní Input pro HP */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                color: "#666",
                fontWeight: 700,
                letterSpacing: "0.1em",
                marginBottom: "8px",
              }}
            >
              CURRENT HP
            </div>

            <div
              className="free-counter-wrap"
              style={{
                background: "rgba(0,0,0,0.4)",
                padding: "8px 16px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <button
                className="free-counter-btn"
                onClick={() =>
                  setCurrentHp((c) =>
                    Math.max(0, (typeof c === "number" ? c : 0) - 10),
                  )
                }
              >
                −
              </button>
              <div className="free-separator" />
              <input
                type="number"
                min="0"
                max={activeMat.hp}
                className="decay-input free-counter-input"
                style={{
                  fontSize: "28px",
                  width: "100px",
                  color: activeMat.color,
                  transition: "color 0.3s ease",
                }}
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
              <div className="free-separator" />
              <button
                className="free-counter-btn"
                onClick={() =>
                  setCurrentHp((c) =>
                    Math.min(
                      activeMat.hp,
                      (typeof c === "number" ? c : 0) + 10,
                    ),
                  )
                }
              >
                +
              </button>
            </div>
          </div>

          {/* HP Bar */}
          <div className="decay-anim-3" style={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.05em",
              }}
            >
              <span
                style={{
                  color: activeMat.color,
                  transition: "color 0.3s ease",
                }}
              >
                {safeHp} HP
              </span>
              <span style={{ color: "#666" }}>{activeMat.hp} HP</span>
            </div>

            <div
              className="modern-hp-wrapper"
              style={{
                height: "6px",
                background: "rgba(255,255,255,0.05)",
                borderRadius: "3px",
                overflow: "hidden",
              }}
            >
              <div
                className="modern-hp-fill"
                style={{
                  width: `${hpPercent}%`,
                  background: `linear-gradient(to right, ${activeMat.color}40 0%, ${activeMat.color} 100%)`,
                  transition:
                    "width 0.4s cubic-bezier(0.22, 1, 0.36, 1), background 0.4s ease",
                }}
              />
              <div
                className="modern-hp-glow"
                style={{
                  width: `${hpPercent}%`,
                  background: activeMat.color,
                  opacity: 0.5,
                  transition:
                    "width 0.4s cubic-bezier(0.22, 1, 0.36, 1), background 0.4s ease",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </CalcShell>
  );
}
