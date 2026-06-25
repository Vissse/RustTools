import { useState, useMemo } from "react";
import { CalcShell } from "./CalcShell";
import { RecycleImg } from "./recycling/RecycleImg";
import { SKINNING_DATA } from "../lib/data/skinning-data";
import type { SkinningTarget } from "../lib/data/skinning-data";
import type { SkinningData } from "../lib/types";

const TARGETS = Object.keys(SKINNING_DATA) as SkinningTarget[];

function getResourceImage(name: string): string {
  const map: Record<string, string> = {
    "Raw Bear Meat": "bearmeat.png",
    "Raw Big Cat Meat": "bigcatmeat.raw.png",
    "Raw Pork": "pork.raw.png",
    "Raw Chicken Breast": "chicken.raw.png",
    "Raw Crocodile Meat": "crocodilemeat.raw.png",
    "Raw Deer Meat": "deermeat.raw.png",
    "Raw Fish": "fish.raw.png",
    "Raw Horse Meat": "horsemeat.raw.png",
    "Raw Human Meat": "humanmeat.raw.png",
    "Raw Snake Meat": "snakemeat.raw.png",
    "Raw Wolf Meat": "wolfmeat.raw.png",
    "Animal Fat": "fat.animal.png",
    Cloth: "cloth.png",
    Leather: "leather.png",
    "Bone Fragments": "bone.fragments.png",
    "Head Bag": "head.bag.png",
    Skull: "skull.human.png",
    "Wolf Skull": "skull.wolf.png",
    "Snake Venom": "venom.snake.png",
  };

  const mapped = map[name];
  if (mapped) return `/images/${mapped}`;

  // Default fallback
  return `/images/${name.toLowerCase().replace(/ /g, ".")}.png`;
}

function getToolImage(name: string): string {
  const map: Record<string, string> = {
    "Skinning Knife": "knife.skinning.png",
    "Bone Knife": "knife.bone.png",
    "Combat Knife": "knife.combat.png",
    Hatchet: "hatchet.png",
    "Stone Hatchet": "stonehatchet.png",
    Machete: "machete.png",
    Chainsaw: "chainsaw.png",
    "Salvaged Axe": "axe.salvaged.png",
    Pickaxe: "pickaxe.png",
    "Stone Pickaxe": "stone.pickaxe.png",
    "Salvaged Icepick": "icepick.salvaged.png",
    Rock: "rock.png",
    "Salvaged Hammer": "hammer.salvaged.png",
    "Salvaged Cleaver": "salvaged.cleaver.png",
    Mace: "mace.png",
    Longsword: "longsword.png",
    "Salvaged Sword": "salvaged.sword.png",
  };

  const mapped = map[name];
  if (mapped) return `/images/${mapped}`;

  return `/images/${name.toLowerCase().replace(/ /g, ".")}.png`;
}

function getTargetImage(target: string): string {
  const map: Record<string, string> = {
    Bear: "bear.png",
    Boar: "boar.png",
    Chicken: "chicken.png",
    Crocodile: "crocodile.png",
    Horse: "horse.png",
    Newman: "skull.human.png",
    Panther: "panther.png",
    "Polar Bear": "polar.bear.png",
    Scientist: "scientist.png",
    Shark: "shark.png",
    Snake: "snake.png",
    Stag: "stag.png",
    Tiger: "tiger.png",
    Wolf: "wolf.png",
  };
  return `/images/${map[target] || "unknown.png"}`;
}

export function SkinningCalculator() {
  const [target, setTarget] = useState<SkinningTarget>("Bear");

  const data: SkinningData[] = useMemo(
    () => SKINNING_DATA[target] || [],
    [target],
  );

  return (
    <CalcShell
      pageTitle={
        <>
          RUST <span>//</span> SKINNING CALCULATOR
        </>
      }
      headerAccent="SKINNING"
      headerRest="CALCULATOR"
      variant="recycling"
    >
      <style>{`
        .target-row-btn {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.6rem 1rem;
          border-radius: 6px;
          background: transparent;
          color: #888;
          transition: all 0.2s ease;
          border-left: 3px solid transparent;
          cursor: pointer;
        }
        .target-row-btn:hover {
          background: rgba(255, 255, 255, 0.03);
          color: #ccc;
        }
        .target-row-btn.active {
          background: linear-gradient(to right, rgba(206, 66, 43, 0.15), rgba(255, 255, 255, 0.01));
          border-left: 3px solid #ce422b;
          color: #fff;
        }
        .target-row-btn.active img {
          filter: drop-shadow(0 0 6px rgba(206,66,43,0.6));
        }

        .calc-panel-left {
          flex: 0 0 240px;
          display: flex;
          flex-direction: column;
          background: rgba(0,0,0,0.2);
          border-right: 1px solid rgba(255,255,255,0.05);
        }

        .calc-panel-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 24px;
          overflow-y: auto;
        }

        .table-row-styled {
          background: rgba(255,255,255,0.02);
          border-radius: 8px;
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: background 0.2s;
        }
        .table-row-styled:hover {
          background: rgba(255,255,255,0.04);
        }
        .bd-vertical-sep {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent);
        }
      `}</style>

      <div className="flex flex-col lg:flex-row h-full w-full relative z-10">
        <div className="calc-panel-left custom-scrollbar overflow-y-auto">
          <div className="p-4 border-b border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] uppercase text-xs font-bold tracking-widest text-[#888]">
            Select Animal
          </div>
          <div className="flex flex-col gap-1 p-3">
            {TARGETS.map((t) => (
              <button
                key={t}
                onClick={() => setTarget(t)}
                className={`target-row-btn group ${target === t ? "active" : ""}`}
              >
                <RecycleImg 
                  src={getTargetImage(t)} 
                  alt={t} 
                  width={32} 
                  height={32} 
                  className="object-contain transition-transform group-hover:scale-110" 
                />
                <span className="text-[13px] font-bold tracking-wide uppercase">{t}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="calc-panel-right custom-scrollbar">
          <div className="flex items-center gap-3 mb-6">
            <RecycleImg src={getTargetImage(target)} alt={target} width={36} height={36} className="object-contain" />
            <h2 className="text-white text-xl font-bold uppercase tracking-wider">{target} Yield</h2>
          </div>

          <div className="flex flex-col gap-2">
            {data.length > 0 ? (
              data.map((row, idx) => (
                <div key={idx} className="table-row-styled">
                  <div className="flex items-center gap-3 w-[150px] flex-shrink-0">
                    <RecycleImg
                      src={getToolImage(row.tool)}
                      alt={row.tool}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                    <span className="text-white text-[15px] font-bold">{row.tool}</span>
                  </div>

                  <div className="bd-vertical-sep" />

                  <div className="flex flex-wrap gap-4 flex-1">
                    {[...row.resources.filter(r => r.name !== "Head Bag"), ...row.resources.filter(r => r.name === "Head Bag")].map((res, ridx) => (
                      <div
                        key={ridx}
                        className="flex items-center gap-2 group relative"
                      >
                        <RecycleImg
                          src={getResourceImage(res.name)}
                          alt={res.name}
                          width={32}
                          height={32}
                          className="object-contain drop-shadow-md transition-transform group-hover:scale-110"
                        />
                        <div className="flex flex-col">
                          <span className="text-white font-bold text-lg leading-tight">
                            {res.quantity}
                          </span>
                          <span className="text-[#888] text-[10px] font-bold uppercase tracking-wider">
                            {res.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bd-vertical-sep" />

                  <div className="flex flex-col items-end w-[60px] flex-shrink-0">
                    <span className="text-white font-bold text-lg leading-tight">{row.time}</span>
                    <span className="text-[#888] text-[10px] font-bold uppercase tracking-wider">Time</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-[#888] text-sm py-4">No data available for {target}.</div>
            )}
          </div>
        </div>
      </div>
    </CalcShell>
  );
}
