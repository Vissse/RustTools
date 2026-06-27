'use client'

import { useMemo, useEffect, useRef } from "react";
import { useQueryStates, parseAsStringLiteral, parseAsInteger } from "nuqs";
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

const MATERIAL_IDS = MATERIALS.map((m) => m.id);

export function DecayCalculator() {
  // Material + remaining HP live in the URL (?mat=&hp=) so a decay timer can be
  // shared. `hp` is nullable: when absent it falls back to the material's full HP,
  // which keeps the URL clean (no `hp` param) for the common "fresh wall" case.
  const [{ mat: selectedMaterial, hp: currentHp }, setQuery] = useQueryStates(
    {
      mat: parseAsStringLiteral(MATERIAL_IDS).withDefault("stone"),
      hp: parseAsInteger,
    },
    { history: "replace" },
  );
  const setSelectedMaterial = (mat: string) => setQuery({ mat });
  const setCurrentHp = (
    hp: number | null | ((prev: number | null) => number | null),
  ) =>
    setQuery((prev) => ({
      hp: typeof hp === "function" ? hp(prev.hp) : hp,
    }));

  const activeMat = MATERIALS.find((m) => m.id === selectedMaterial)!;

  // Reset HP to the new material's full when the user switches material. Guarded
  // by a ref so it doesn't fire on mount/hydration and clobber a shared `?hp=`.
  // Setting null (rather than the number) keeps the URL clean — display falls
  // back to full via `currentHp ?? activeMat.hp` below.
  const prevMat = useRef(selectedMaterial);
  useEffect(() => {
    if (prevMat.current === selectedMaterial) return;
    prevMat.current = selectedMaterial;
    setCurrentHp(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMaterial]);

  const safeHp = Math.max(
    0,
    Math.min(currentHp ?? activeMat.hp, activeMat.hp),
  );
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

      <div className="decay-container fade-in-container">
        {/* 1. SELEKTOR MATERIÁLU */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="sec-label decay-anim-1 mb-4">
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
          <div className="text-center">
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
                    Math.max(0, (c ?? activeMat.hp) - hpStep),
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
                value={currentHp ?? activeMat.hp}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "") setCurrentHp(null);
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
                    Math.min(activeMat.hp, (c ?? activeMat.hp) + hpStep),
                  )
                }
              >
                +
              </button>
            </div>
          </div>

          <div className="decay-anim-3 w-full">
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
              <span className="text-text-bright">{safeHp} HP</span>
              <span className="text-text-dim">
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