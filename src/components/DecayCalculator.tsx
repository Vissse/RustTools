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

      <div className="fade-in-container flex-1 w-full h-full flex flex-col items-center justify-center p-5">
        {/* 1. MATERIAL SELECTOR */}
        <div className="flex flex-col items-center">
          <div className="sec-label animate-[decaySlideUp_0.5s_cubic-bezier(0.2,0.8,0.2,1)_backwards] [animation-delay:0s] mb-4">
            BUILDING MATERIAL
          </div>
          <div className="flex gap-4 justify-center flex-nowrap mb-10 w-full max-[640px]:flex-wrap">
            {MATERIALS.map((m, index) => (
              <button
                key={m.id}
                className={`minimal-box-btn animate-[decaySlideUp_0.3s_cubic-bezier(0.34,1.56,0.64,1)_backwards] min-w-[100px] shrink-0${selectedMaterial === m.id ? " active" : ""}`}
                onClick={() => setSelectedMaterial(m.id)}
                style={{ animationDelay: `${index * 0.03}s` }}
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

        {/* 2. CENTRAL CARD */}
        <div className="bg-[linear-gradient(180deg,var(--panel2)_0%,var(--panel)_100%)] border border-border-2 border-t-0 rounded-xl p-[clamp(24px,6vw,40px)] flex flex-col items-center w-full max-w-[500px] shadow-[0_16px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.02)] relative before:content-[''] before:absolute before:top-0 before:inset-x-0 before:h-0.5 before:bg-[linear-gradient(90deg,transparent_0%,var(--rust)_15%,var(--rust)_85%,transparent_100%)] before:z-10 before:pointer-events-none before:rounded-t-xl animate-[decaySlideUp_0.5s_cubic-bezier(0.2,0.8,0.2,1)_backwards] [animation-delay:0.1s]">
          <div className="text-center">
            <div className="font-ui text-[11px] font-bold text-text-muted uppercase tracking-[0.15em] mb-2">Time Until Destroyed</div>
            <div className="font-display text-[clamp(48px,10vw,64px)] font-semibold text-rust leading-none [text-shadow:0_0_24px_rgba(206,66,43,0.2)] mb-8 tabular-nums tracking-[0.02em]">{timeString}</div>
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

            <div className="bg-black/25 border border-border rounded-md px-3 py-1.5 inline-flex items-center transition-[border-color] duration-200 focus-within:border-[rgba(206,66,43,0.4)]">
              <button
                className="bg-transparent border-0 text-text-dim text-lg font-light cursor-pointer w-8 h-8 flex items-center justify-center transition-[color,transform] duration-150 hover:text-text-bright active:scale-90"
                onClick={() =>
                  setCurrentHp((c) =>
                    Math.max(0, (c ?? activeMat.hp) - hpStep),
                  )
                }
              >
                −
              </button>
              <div className="w-px h-3.5 bg-border mx-2" />
              <input
                type="number"
                min="0"
                max={activeMat.hp}
                className="bg-transparent border-0 outline-none text-center w-20 font-display text-[26px] font-semibold text-text-bright tracking-wider [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0"
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
              <div className="w-px h-3.5 bg-border mx-2" />
              <button
                className="bg-transparent border-0 text-text-dim text-lg font-light cursor-pointer w-8 h-8 flex items-center justify-center transition-[color,transform] duration-150 hover:text-text-bright active:scale-90"
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

          <div className="animate-[decaySlideUp_0.5s_cubic-bezier(0.2,0.8,0.2,1)_backwards] [animation-delay:0.2s] w-full">
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
              className="relative w-full"
              style={{
                height: "4px",
                background: "var(--border)",
                borderRadius: "2px",
                overflow: "hidden",
              }}
            >
              <div
                className="absolute top-0 left-0 h-full"
                style={{
                  width: `${hpPercent}%`,
                  background: "var(--rust)",
                  transition: "width 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />
              <div
                className="absolute top-0 left-0 h-full"
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