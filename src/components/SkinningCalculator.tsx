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
        .target-card {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: #888;
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .target-card:hover {
          background: rgba(255, 255, 255, 0.06);
          color: #ccc;
        }
        .target-card.active {
          background: rgba(255, 255, 255, 0.08);
          border-color: #cc422c;
          color: #fff;
        }
        .target-card.active img {
          filter: drop-shadow(0 0 6px rgba(206,66,43,0.6));
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
        .hz-sep {
          width: 100%;
          height: 1px;
          flex-shrink: 0;
          margin-top: 32px;
          margin-bottom: 32px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.02) 20%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0.02) 80%,
            transparent 100%
          );
        }
        .bd-vertical-sep {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent);
        }
      `}</style>

      <div className="flex flex-col h-full w-full relative z-10 px-6 pb-6 pt-8 custom-scrollbar overflow-y-auto fade-in-container">
        <div className="w-full flex justify-center" style={{ marginTop: '30px' }}>
          <div className="grid grid-cols-7 gap-2">
          {TARGETS.map((t) => (
            <button
              key={t}
              onClick={() => setTarget(t)}
              className={`target-card group ${target === t ? "active" : ""}`}
            >
              <RecycleImg 
                src={getTargetImage(t)} 
                alt={t} 
                width={24} 
                height={24} 
                className="object-contain transition-transform group-hover:scale-110" 
              />
              <span className="text-[12px] font-bold tracking-wide uppercase">{t}</span>
            </button>
          ))}
          </div>
        </div>

        <div className="hz-sep" />

        <div className="flex flex-col flex-1">
          <div className="flex items-center gap-3 mb-4">
            <RecycleImg src={getTargetImage(target)} alt={target} width={32} height={32} className="object-contain" />
            <h2 className="text-white text-lg font-bold uppercase tracking-wider">{target} Yield</h2>
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
