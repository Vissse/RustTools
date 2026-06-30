'use client'

import { memo } from "react";
import { RecycleImg } from "./RecycleImg";
import { QtyInput } from "./QtyInput";

interface InvItemProps {
  id: string;
  name: string;
  img: string;
  count: number;
  onAdjust: (id: string, delta: number) => void;
  onSet: (id: string, value: number) => void;
}

export const InvItem = memo(function InvItem({
  id,
  name,
  img,
  count,
  onAdjust,
  onSet,
}: InvItemProps) {
  return (
    <div
      className={`group/inv flex flex-col relative select-none [content-visibility:auto] [contain-intrinsic-size:auto_96px]${count > 0 ? " active" : ""}`}
    >
      <div className="py-3 flex justify-center items-center mb-1.5" data-tip={name}>
        <RecycleImg
          src={img}
          alt={name}
          loading="lazy"
          decoding="async"
          className="w-12 h-12 object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]"
        />
      </div>

      <div className="w-4/5 h-px bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.15),transparent)] mx-auto mb-1.5 transition-all duration-300 group-[.active]/inv:bg-[linear-gradient(to_right,transparent,#cc422c,transparent)] group-[.active]/inv:shadow-[0px_-4px_10px_rgba(204,66,44,0.6)]" />

      <div className="flex items-center justify-center w-4/5 mx-auto">
        <button
          className="bg-transparent text-[#757575] text-base font-light cursor-pointer flex items-center justify-center w-5 h-5 transition-all duration-200 select-none p-0 shrink-0 hover:text-[#cc422c] hover:scale-[1.15] active:scale-[0.95]"
          onClick={() => onAdjust(id, -1)}
        >
          −
        </button>
        <div className="w-px min-w-px h-2.5 bg-[linear-gradient(to_bottom,transparent,#4a4a4a,transparent)] mx-1 shrink-0" />
        <QtyInput
          className="w-[26px] min-w-[26px] bg-transparent border-0 text-[#757575] text-[13px] font-bold text-center outline-none p-0 shadow-none transition-[color] duration-200 shrink-0 group-[.active]/inv:text-white [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0"
          value={count}
          ariaLabel={`${name} quantity`}
          onChange={(n) => onSet(id, n)}
        />
        <div className="w-px min-w-px h-2.5 bg-[linear-gradient(to_bottom,transparent,#4a4a4a,transparent)] mx-1 shrink-0" />
        <button
          className="bg-transparent text-[#757575] text-base font-light cursor-pointer flex items-center justify-center w-5 h-5 transition-all duration-200 select-none p-0 shrink-0 hover:text-[#cc422c] hover:scale-[1.15] active:scale-[0.95]"
          onClick={() => onAdjust(id, 1)}
        >
          +
        </button>
      </div>
    </div>
  );
});
