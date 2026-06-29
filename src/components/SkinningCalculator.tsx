'use client'

import { useMemo, Fragment } from "react";
import { useQueryState, parseAsStringLiteral } from "nuqs";
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
  // Selected animal lives in the URL (?a=) so a yield breakdown can be shared.
  const [target, setTarget] = useQueryState(
    "a",
    parseAsStringLiteral(TARGETS).withDefault("Bear"),
  );

  const data: SkinningData[] = useMemo(
    () => SKINNING_DATA[target] || [],
    [target],
  );

  const uniqueResources = useMemo(() => {
    if (!data || data.length === 0) return [];
    const resourceNames = new Set<string>();
    data.forEach(row => {
      row.resources.forEach(res => {
        resourceNames.add(res.name);
      });
    });
    const arr = Array.from(resourceNames);
    const headBagIndex = arr.indexOf("Head Bag");
    if (headBagIndex > -1) {
      arr.splice(headBagIndex, 1);
      arr.push("Head Bag");
    }
    return arr;
  }, [data]);

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

      <div className="flex flex-col h-full w-full fade-in-container">
        {/* Minimalist Target Selection (Fixed at top) */}
        <div className="flex justify-center pt-4 pb-4 px-6 border-b border-white/[0.05] flex-shrink-0 z-10 bg-panel">
          <div className="filter-row w-full max-w-5xl flex-wrap justify-center gap-y-3">
            {TARGETS.map((t, idx) => (
              <Fragment key={t}>
                <button
                  onClick={() => setTarget(t)}
                  className={`filter-pure-text flex items-center gap-2 group ${target === t ? "active" : ""}`}
                >
                  <RecycleImg 
                    src={getTargetImage(t)} 
                    alt={t} 
                    width={20} 
                    height={20} 
                    className={`object-contain drop-shadow-md transition-opacity duration-300 ${target === t ? "opacity-100" : "opacity-40 group-hover:opacity-70"}`} 
                  />
                  <span className={`transition-colors duration-300 ${target === t ? "text-white font-semibold" : "text-white/40 font-medium group-hover:text-white/70"}`}>
                    {t}
                  </span>
                </button>
                {idx !== TARGETS.length - 1 && (
                  <div className="w-[1px] h-6 bg-gradient-to-b from-transparent via-white/10 to-transparent flex-shrink-0 mx-2" />
                )}
              </Fragment>
            ))}
          </div>
        </div>

        {/* Breakdown Area (Scrollable) */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-6 pb-6 w-full">
          <div className="max-w-5xl mx-auto w-full pt-2">
          <div className="flex items-center gap-3 mb-4">
            <RecycleImg src={getTargetImage(target)} alt={target} width={24} height={24} className="object-contain opacity-80" />
            <h2 className="text-text-dim text-[13px] font-bold uppercase tracking-wider">{target} Yield Breakdown</h2>
          </div>

          {/* Header Row */}
          {uniqueResources.length > 0 && (
            <div className="hidden sm:flex flex-row items-center justify-between py-2 px-6 mb-2">
              <div className="w-[240px] flex-shrink-0">
                {/* Empty header for tools column */}
              </div>
              <div className="flex items-center gap-6">
                {uniqueResources.map((resName, ridx) => (
                  <div key={ridx} className="flex items-center justify-center gap-2 w-[70px]">
                    <RecycleImg
                      src={getResourceImage(resName)}
                      alt={resName}
                      width={18}
                      height={18}
                      className="object-contain opacity-90"
                    />
                    <span className="text-white/80 text-[10px] uppercase tracking-wider font-bold text-center leading-tight">
                      {resName}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1">
            {data.length > 0 ? (
              data.map((row, idx) => (
                <div 
                  key={idx} 
                  className="flex flex-col sm:flex-row sm:items-center justify-between py-3 px-6 hover:bg-white/[0.03] transition-colors rounded-lg group"
                >
                  <div className="flex items-center gap-4 w-[240px] flex-shrink-0 mb-3 sm:mb-0">
                    <RecycleImg
                      src={getToolImage(row.tool)}
                      alt={row.tool}
                      width={28}
                      height={28}
                      className="object-contain opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all"
                    />
                    <span className="text-white/90 group-hover:text-white font-medium text-[15px] tracking-wide transition-colors">
                      {row.tool}
                    </span>
                  </div>

                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-x-6 sm:gap-x-6 gap-y-3">
                    {uniqueResources.map((resName, ridx) => {
                      const res = row.resources.find(r => r.name === resName);
                      return (
                        <div
                          key={ridx}
                          className="flex items-center justify-center gap-3 w-[70px]"
                        >
                          {/* Mobile-only resource label/icon if it wraps, otherwise we just show number */}
                          <div className="flex sm:hidden items-center gap-2 mr-2">
                            <RecycleImg
                              src={getResourceImage(resName)}
                              alt={resName}
                              width={14}
                              height={14}
                              className="object-contain opacity-50"
                            />
                          </div>
                          <span className={`font-display text-[22px] font-medium tracking-wide tabular-nums text-center ${res ? "text-text-bright" : "text-white/10"}`}>
                            {res ? res.quantity : "-"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-text-dim text-sm py-8 text-center">No data available for {target}.</div>
            )}
          </div>
        </div>
        </div>
      </div>
    </CalcShell>
  );
}