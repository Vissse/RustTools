import { RecycleImg } from "./RecycleImg";
import type { RandomTotal } from "./types";

interface RandomDropListProps {
  randomTotals: RandomTotal[];
}

/** Minimalist "Plus a random amount of..." */
export function RandomDropList({ randomTotals }: RandomDropListProps) {
  if (randomTotals.length === 0) return null;

  return (
    <div className="mt-6 border-t border-dashed border-white/[0.08] pt-4">
      <div className="font-ui text-[11px] text-text-dim mb-3 font-semibold uppercase tracking-widest">
        Plus a random amount of...
      </div>
      <div className="flex flex-col gap-2">
        {randomTotals.map((rt) => (
          <div
            className="fade-in-container flex items-center justify-between px-3 py-1.5 bg-white/[0.015] rounded transition-[background] duration-200 hover:bg-white/[0.03] @max-[500px]/rcy-panel:flex-col @max-[500px]/rcy-panel:items-stretch @max-[500px]/rcy-panel:gap-2"
            key={rt.id}
          >
            <div className="flex items-center gap-3 flex-auto min-w-0">
              <RecycleImg src={rt.img} alt={rt.name} data-tip={rt.name} className="w-6 h-6 object-contain" />
              <span className="font-ui text-sm font-bold text-[#d0d0d0] min-w-0">{rt.name}</span>
            </div>

            <div className="flex items-center gap-4 font-ui shrink-0 @max-[500px]/rcy-panel:justify-start">
              <div className="flex items-baseline gap-1.5 min-w-[45px] justify-end">
                <span className="text-[10px] text-[#666] uppercase tracking-wider font-semibold">Min</span>
                <span className="text-[15px] font-bold text-[#e0e0e0]">{rt.min}</span>
              </div>

              <div className="w-px h-3 bg-white/10" />

              <div className="flex items-baseline gap-1.5 min-w-[45px] justify-end">
                <span className="text-[10px] text-[#666] uppercase tracking-wider font-semibold">Avg</span>
                <span className="text-[15px] font-bold text-white">~{Math.round(rt.avg * 10) / 10}</span>
              </div>

              <div className="w-px h-3 bg-white/10" />

              <div className="flex items-baseline gap-1.5 min-w-[45px] justify-end">
                <span className="text-[10px] text-[#666] uppercase tracking-wider font-semibold">Max</span>
                <span className="text-[15px] font-bold text-[#e0e0e0]">{rt.max}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
