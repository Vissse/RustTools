'use client'

import { useMemo, Fragment } from "react";
import { useQueryState, parseAsStringLiteral } from "nuqs";
import { CalcShell } from "./CalcShell";
import { Img } from "./Img";
import { RecycleImg } from "./recycling/RecycleImg";
import { SALVAGING_DATA } from "../lib/data/salvaging-data";
import type { SalvagingTarget } from "../lib/data/salvaging-data";
import type { SalvagingData } from "../lib/types";

const TARGETS = Object.keys(SALVAGING_DATA) as SalvagingTarget[];

function getResourceImage(name: string): string {
  const map: Record<string, string> = {
    Charcoal: "charcoal.png",
    "Metal Fragments": "metal.fragments.png",
    "High Quality Metal": "metal.refined.png",
  };

  const mapped = map[name];
  if (mapped) return `/images/${mapped}`;

  return `/images/${name.toLowerCase().replace(/ /g, ".")}.png`;
}

function getToolImage(name: string): string {
  const map: Record<string, string> = {
    Jackhammer: "jackhammer.png",
    Pickaxe: "pickaxe.png",
    "Salvaged Icepick": "icepick.salvaged.png",
    "Stone Pickaxe": "stone.pickaxe.png",
    Rock: "rock.png",
    Hatchet: "hatchet.png",
    "Salvaged Axe": "axe.salvaged.png",
    "Salvaged Hammer": "hammer.salvaged.png",
    "Stone Hatchet": "stonehatchet.png",
    "Bone Club": "bone.club.png",
  };

  const mapped = map[name];
  if (mapped) return `/images/${mapped}`;

  return `/images/${name.toLowerCase().replace(/ /g, ".")}.png`;
}

export function SalvagingCalculator() {
  // Selected target lives in the URL (?t=) so a yield table can be shared.
  const [target, setTarget] = useQueryState(
    "t",
    parseAsStringLiteral(TARGETS).withDefault("Bradley"),
  );

  const data: SalvagingData[] = useMemo(
    () => SALVAGING_DATA[target] || [],
    [target],
  );

  return (
    <CalcShell
      pageTitle={
        <>
          RUST <span>//</span> SALVAGING CALCULATOR
        </>
      }
      headerAccent="SALVAGING"
      headerRest="CALCULATOR"
      variant="recycling"
    >

      <div className="calc-panel-full custom-scrollbar fade-in-container px-6 pb-6 pt-4">
        {/* Minimalist Target Selection (Raid Style) */}
        <div className="flex justify-center mt-4">
          <div className="filter-row">
            {TARGETS.map((t, idx) => {
              let imgSrc = "/images/unknown.png";
              if (t === "Patrol Helicopter") imgSrc = "/images/patrol.helicopter.png";
              if (t === "Bradley") imgSrc = "/images/bradley.apc.png";

              return (
                <Fragment key={t}>
                  <button
                    onClick={() => setTarget(t)}
                    className={`filter-pure-text flex items-center gap-4 ${target === t ? "active" : ""}`}
                  >
                    <Img
                      src={imgSrc}
                      alt={t}
                      width={64}
                      height={44}
                      className="object-contain drop-shadow-md"
                    />
                    <span className="text-[20px]">{t}</span>
                  </button>
                  {idx < TARGETS.length - 1 && (
                    <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent flex-shrink-0" />
                  )}
                </Fragment>
              );
            })}
          </div>
        </div>

        {/* Minimalist Data Display */}
        <div className="mt-4 max-w-4xl mx-auto">
          <div className="flex flex-col gap-1">
            {data.map((row, idx) => (
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

                <div className="flex items-center gap-8">
                  {row.resources.map((res, ridx) => (
                    <div
                      key={ridx}
                      className="flex items-center gap-3 w-[110px]"
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
            ))}
          </div>
          {data.length === 0 && (
            <div className="py-8 text-center text-[#a4a4a4]">
              No data available for {target}.
            </div>
          )}
        </div>
      </div>
    </CalcShell>
  );
}