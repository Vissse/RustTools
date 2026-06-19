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
    <div className="panel-left" {...tipProps}>
      {/* Moderní Sticky hlavička */}
      <div className="search-box-b flex gap-3 w-full !px-[22px] !pt-[18px] !pb-[16px]">
        <input
          type="text"
          className="sleek-search"
          placeholder="Search items..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
        <button className="sleek-btn-remove" onClick={onClear}>
          Remove All
        </button>
      </div>

      {categories.map(({ cat, items }) => (
        <div className="cat-wrap z-40 !px-[22px] !pt-[12px]" key={cat}>
          <div className="sec-label">{cat.toUpperCase()}</div>
          <div className="inv-grid">
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
