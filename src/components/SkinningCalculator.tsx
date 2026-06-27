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

      <div className="calc-panel-full custom-scrollbar fade-in-container px-6 pb-6 pt-4">
        {/* Minimalist Target Selection (Raid Style) */}
        <div className="flex justify-center mt-4">
          <div className="filter-row" style={{ flexWrap: 'wrap' }}>
            {TARGETS.map((t, idx) => (
              <Fragment key={t}>
                <button
                  onClick={() => setTarget(t)}
                  className={`filter-pure-text flex items-center gap-2 ${target === t ? "active" : ""}`}
                >
                  <RecycleImg 
                    src={getTargetImage(t)} 
                    alt={t} 
                    width={20} 
                    height={20} 
                    className="object-contain drop-shadow-md" 
                  />
                  <span>{t}</span>
                </button>
                {idx !== TARGETS.length - 1 && (
                  <div className="filter-separator" />
                )}
              </Fragment>
            ))}
          </div>
        </div>

        {/* Minimalist Data Display */}
        <div className="mt-4 max-w-5xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-3">
            <RecycleImg src={getTargetImage(target)} alt={target} width={28} height={28} className="object-contain opacity-80" />
            <h2 className="text-text-dim text-[13px] font-bold uppercase tracking-wider">{target} Yield Breakdown</h2>
          </div>

          <div className="flex flex-col gap-1">
            {data.length > 0 ? (
              data.map((row, idx) => (
                <div 
                  key={idx} 
                  className="flex flex-col sm:flex-row sm:items-center justify-between py-4 px-6 hover:bg-white/[0.02] transition-colors rounded-lg group"
                >
                  <div className="flex items-center gap-4 w-[240px] flex-shrink-0 mb-3 sm:mb-0">
                    <RecycleImg
                      src={getToolImage(row.tool)}
                      alt={row.tool}
                      width={24}
                      height={24}
                      className="object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                    <span className="text-text-bright text-[14px] tracking-wide font-light">
                      {row.tool}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3 flex-1">
                    {[...row.resources.filter(r => r.name !== "Head Bag"), ...row.resources.filter(r => r.name === "Head Bag")].map((res, ridx) => (
                      <div
                        key={ridx}
                        className="flex items-center gap-2"
                      >
                        <RecycleImg
                          src={getResourceImage(res.name)}
                          alt={res.name}
                          width={18}
                          height={18}
                          className="object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="flex flex-col">
                          <span className="text-text-bright text-sm font-medium">
                            {res.quantity}
                          </span>
                          <span className="text-white text-[9px] uppercase tracking-wider">
                            {res.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-text-dim text-sm py-8 text-center">No data available for {target}.</div>
            )}
          </div>
        </div>
      </div>
    </CalcShell>
  );
}