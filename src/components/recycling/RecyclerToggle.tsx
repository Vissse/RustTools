'use client'

import { RecycleImg } from "./RecycleImg";
import type { RecyclerKind } from "../../lib/types";

interface RecyclerToggleProps {
  recycler: RecyclerKind;
  onChange: (kind: RecyclerKind) => void;
}

const RECYCLERS = [
  { kind: "radtown" as const, name: "Radtown", sub: "60% Yield • 5s", img: "/images/recycler.png", alt: "Radtown Recycler" },
  { kind: "safezone" as const, name: "Safe Zone", sub: "40% Yield • 8s", img: "/images/safezone-recycler.png", alt: "Safe Zone Recycler" },
];

/** Standard vs Safe Zone recycler selector (Modern Minimalist). */
export function RecyclerToggle({ recycler, onChange }: RecyclerToggleProps) {
  return (
    <div>
      <div className="sec-label">Recycler Type</div>
      <div className="flex bg-black/30 border border-border-2 rounded-md p-1 gap-1 mb-6">
        {RECYCLERS.map((r) => (
          <button
            key={r.kind}
            className={`group/tog flex-1 flex items-center px-4 py-2.5 rounded bg-transparent text-text-dim font-display text-[15px] tracking-widest uppercase cursor-pointer whitespace-nowrap transition-all duration-100 ease-out hover:text-text-bright hover:bg-white/[0.02] @max-[540px]/rcy-panel:flex-col @max-[540px]/rcy-panel:gap-1 @max-[540px]/rcy-panel:px-1.5 @max-[540px]/rcy-panel:py-2 @max-[540px]/rcy-panel:text-[13px]${recycler === r.kind ? " active bg-[rgba(206,66,43,0.12)] text-text-bright shadow-[inset_0_0_0_1px_var(--rust)]" : ""}`}
            onClick={() => onChange(r.kind)}
          >
            <span className="flex-1 flex items-center justify-end gap-3 @max-[540px]/rcy-panel:flex-none @max-[540px]/rcy-panel:justify-center @max-[540px]/rcy-panel:gap-2">
              <RecycleImg
                src={r.img}
                alt={r.alt}
                className="w-[22px] h-[22px] object-contain grayscale opacity-60 transition-all duration-100 ease-out group-[.active]/tog:grayscale-0 group-[.active]/tog:opacity-100 group-[.active]/tog:drop-shadow-[0_0_6px_var(--rust-glow)] group-[.active]/tog:saturate-[1.2]"
              />
              <span>{r.name}</span>
            </span>
            <span className="flex-1 flex items-center justify-start font-ui text-[11px] font-bold text-text-muted tracking-wider ml-3 border-l border-border-2 pl-3 whitespace-nowrap group-[.active]/tog:text-rust group-[.active]/tog:border-l-[rgba(206,66,43,0.3)] @max-[540px]/rcy-panel:flex-none @max-[540px]/rcy-panel:justify-center @max-[540px]/rcy-panel:ml-0 @max-[540px]/rcy-panel:pl-0 @max-[540px]/rcy-panel:border-l-0">
              {r.sub}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
