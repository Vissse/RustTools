import { useState, useMemo } from "react";
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
  const [target, setTarget] = useState<SalvagingTarget>("Bradley");

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
      <style>{`
        .target-card {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          padding: 10px 16px;
          gap: 16px;
          background-color: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        .target-card:hover {
          background-color: rgba(255, 255, 255, 0.06);
          transform: translateY(-2px);
        }
        .target-card.active {
          background-color: rgba(255, 255, 255, 0.08);
          border-color: #cc422c;
          box-shadow: 0 4px 20px rgba(204, 66, 44, 0.2);
        }
        .target-card.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(to right, transparent, #cc422c, transparent);
          box-shadow: 0px -4px 10px rgba(204, 66, 44, 0.6);
        }

        .target-img-wrap {
          height: 48px;
          width: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .calc-panel-full {
          display: flex;
          flex-direction: column;
          padding: 16px;
          gap: 16px;
          width: 100%;
          height: 100%;
          overflow-y: auto;
        }

        .table-row-styled {
          display: flex;
          align-items: center;
          padding: 8px 12px;
          background-color: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 6px;
          transition: border-color 0.2s ease;
        }
        .table-row-styled:hover {
          border-color: rgba(255, 255, 255, 0.08);
        }
        
        .bd-vertical-sep {
          width: 1px;
          height: 24px;
          margin: 0 12px;
          background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.15) 50%, transparent);
        }
      `}</style>

      <div className="calc-panel-full custom-scrollbar fade-in-container">
        {/* Top Panel: Target Selection Grid */}
        <div className="flex flex-wrap gap-3 justify-center mb-4">
          {TARGETS.map((t) => {
            // Pick image based on target
            let imgSrc = "/images/unknown.png";
            if (t === "Patrol Helicopter")
              imgSrc = "/images/patrol.helicopter.png";
            if (t === "Bradley") imgSrc = "/images/bradley.apc.png"; // Fallback handled by Img if missing

            return (
              <button
                key={t}
                onClick={() => setTarget(t)}
                className={`target-card w-[260px] ${target === t ? "active" : ""}`}
              >
                <div className="target-img-wrap">
                  <Img
                    src={imgSrc}
                    alt={t}
                    width={64}
                    height={48}
                    className="object-contain drop-shadow-lg"
                  />
                </div>
                <span className="text-white text-[14px] font-bold uppercase tracking-wider">
                  {t}
                </span>
              </button>
            );
          })}
        </div>

        {/* Minimalist Data Display */}
        <div className="mt-4">
          <h3 className="text-[#a4a4a4] text-xs font-bold uppercase tracking-wider mb-4 border-b border-[rgba(255,255,255,0.05)] pb-2">
            Yield Breakdown for {target}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {data.map((row, idx) => (
              <div key={idx} className="table-row-styled">
                <div className="flex items-center gap-3 w-[140px] flex-shrink-0">
                  <RecycleImg
                    src={getToolImage(row.tool)}
                    alt={row.tool}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                  <span className="text-white text-[14px] font-bold">
                    {row.tool}
                  </span>
                </div>

                <div className="bd-vertical-sep" />

                <div className="flex flex-wrap gap-4 flex-1">
                  {row.resources.map((res, ridx) => (
                    <div
                      key={ridx}
                      className="flex items-center gap-2 group relative"
                    >
                      <RecycleImg
                        src={getResourceImage(res.name)}
                        alt={res.name}
                        width={28}
                        height={28}
                        className="object-contain drop-shadow-md transition-transform group-hover:scale-110"
                      />
                      <div className="flex flex-col">
                        <span className="text-white font-bold text-base leading-tight">
                          {res.quantity}
                        </span>
                        <span className="text-[#888] text-[9px] font-bold uppercase tracking-wider">
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
