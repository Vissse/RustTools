'use client'

import type { TooltipProps } from "../useTooltip";
import { InvItem } from "./InvItem";
import type { ItemCategory } from "./types";

interface ItemPickerProps {
  search: string;
  onSearch: (value: string) => void;
  onClear: () => void;
  categories: ItemCategory[];
  inventory: Record<string, number>;
  onAdjust: (id: string, delta: number) => void;
  onSet: (id: string, value: number) => void;
  tipProps: TooltipProps;
}

/** Left panel: search/clear toolbar + category-grouped item grid. */
export function ItemPicker({
  search,
  onSearch,
  onClear,
  categories,
  inventory,
  onAdjust,
  onSet,
  tipProps,
}: ItemPickerProps) {
  return (
    <div
      className="fade-in-container basis-[55%] grow-0 shrink-0 pb-[22px] flex flex-col gap-4 border-r border-border-2 overflow-y-auto max-md:basis-auto max-md:grow max-md:overflow-y-visible max-md:border-r-0 max-md:border-b max-md:border-border-2 max-md:p-1.5"
      {...tipProps}
    >
      {/* Sticky search/clear toolbar */}
      <div className="sticky top-0 z-50 bg-[rgba(19,18,16,0.9)] backdrop-blur-[8px] border-b border-white/4 flex gap-3 w-full px-[22px] pt-[18px] pb-4">
        <input
          type="text"
          className="flex-1 bg-white/2 border border-white/4 rounded-md text-text-bright font-ui text-sm px-3.5 py-2.5 outline-none transition-all duration-200 placeholder:text-[#666] placeholder:tracking-wider focus:bg-white/4 focus:border-[rgba(206,66,43,0.5)] focus:shadow-[0_0_12px_rgba(206,66,43,0.1)]"
          placeholder="Search items..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
        <button
          className="bg-transparent border-0 text-[#777] font-ui text-[11px] font-bold uppercase tracking-[0.15em] px-3 cursor-pointer transition-[color] duration-150 flex items-center hover:text-rust"
          onClick={onClear}
        >
          Remove All
        </button>
      </div>

      {categories.map(({ cat, items }, i) => (
        <div className={`relative z-40 px-[22px] pt-3${i > 0 ? " mt-1" : ""}`} key={cat}>
          <div className="sec-label">{cat.toUpperCase()}</div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-1.5">
            {items.map((item) => (
              <InvItem
                key={item.id}
                id={item.id}
                name={item.name}
                img={item.img}
                count={inventory[item.id]}
                onAdjust={onAdjust}
                onSet={onSet}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
