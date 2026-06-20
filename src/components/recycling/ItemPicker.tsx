import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
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

type Item = ItemCategory["items"][number];

// One flattened virtual row is either a category label or a single grid row of
// up to `cols` items. Heights are measured at runtime; these are just initial
// estimates so the scrollbar starts out roughly right.
type Row = { kind: "header"; cat: string } | { kind: "items"; items: Item[] };
const HEADER_EST = 44;
const ITEMS_EST = 132;

// Grid metrics, mirrored from .inv-grid / .cat-wrap in global.css.
const CELL_MIN = 80;
const GRID_GAP = 6;
const SIDE_PAD = 22;

/** Left panel: search/clear toolbar + virtualized, category-grouped item grid. */
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Columns depend on the panel width (the CSS grid is responsive), so we
  // recompute the same way auto-fill would and re-chunk rows on resize.
  const [cols, setCols] = useState(1);
  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const compute = () => {
      const usable = el.clientWidth - SIDE_PAD * 2;
      setCols(Math.max(1, Math.floor((usable + GRID_GAP) / (CELL_MIN + GRID_GAP))));
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const rows = useMemo<Row[]>(() => {
    const out: Row[] = [];
    for (const { cat, items } of categories) {
      out.push({ kind: "header", cat });
      for (let i = 0; i < items.length; i += cols) {
        out.push({ kind: "items", items: items.slice(i, i + cols) });
      }
    }
    return out;
  }, [categories, cols]);

  // The sticky search header sits above the list inside the scroll container, so
  // tell the virtualizer how far down the list actually starts.
  const [scrollMargin, setScrollMargin] = useState(0);
  useLayoutEffect(() => {
    const c = scrollRef.current;
    const l = listRef.current;
    if (!c || !l) return;
    setScrollMargin(
      l.getBoundingClientRect().top - c.getBoundingClientRect().top + c.scrollTop,
    );
  }, [categories, cols]);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: (i) => (rows[i].kind === "header" ? HEADER_EST : ITEMS_EST),
    overscan: 6,
    scrollMargin,
  });

  // Jump back to the top whenever the filtered set changes (e.g. on search).
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [categories]);

  return (
    <div className="panel-left" ref={scrollRef} style={{ position: "relative" }} {...tipProps}>
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

      <div
        ref={listRef}
        style={{ height: virtualizer.getTotalSize(), position: "relative" }}
      >
        {virtualizer.getVirtualItems().map((vi) => {
          const row = rows[vi.index];
          return (
            <div
              key={vi.key}
              data-index={vi.index}
              ref={virtualizer.measureElement}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${vi.start - scrollMargin}px)`,
              }}
            >
              {row.kind === "header" ? (
                <div className="cat-wrap !px-[22px] !pt-[18px]">
                  <div className="sec-label">{row.cat.toUpperCase()}</div>
                </div>
              ) : (
                <div
                  className="inv-grid !px-[22px] !pb-[6px]"
                  style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
                >
                  {row.items.map((item) => (
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
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
