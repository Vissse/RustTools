'use client'

import { useCallback, useMemo, useState } from "react";
import { CalcShell } from "./CalcShell";
import { useTooltip } from "./useTooltip";
import { ITEMS } from "../lib/data/recycling-data";
import type { RecyclerKind } from "../lib/types";
import { ItemPicker } from "./recycling/ItemPicker";
import { ResultsPanel } from "./recycling/ResultsPanel";
import { buildResults, filterCategories } from "./recycling/results";
import { Feature, useFeatureUsed } from "../lib/analytics";

export function RecyclingCalculator() {
  const [inventory, setInventory] = useState<Record<string, number>>(() =>
    Object.fromEntries(ITEMS.map((i) => [i.id, 0])),
  );
  const [recycler, setRecycler] = useState<RecyclerKind>("radtown");
  const [order, setOrder] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const tip = useTooltip();

  const results = useMemo(
    () => buildResults(inventory, recycler, order),
    [inventory, recycler, order],
  );

  const query = search.trim().toLowerCase();
  const categories = useMemo(() => filterCategories(query), [query]);

  const itemTotal = useMemo(
    () => Object.values(inventory).reduce((sum, n) => sum + n, 0),
    [inventory],
  );
  useFeatureUsed(Feature.recycling, itemTotal);

  const adjust = useCallback((id: string, delta: number) => {
    setInventory((prev) => {
      const nextCount = Math.min(9999, Math.max(0, prev[id] + delta));
      if (nextCount !== prev[id]) {
        setOrder((o) => {
          if (nextCount > 0 && !o.includes(id)) return [...o, id];
          if (nextCount === 0 && o.includes(id)) return o.filter((x) => x !== id);
          return o;
        });
      }
      return { ...prev, [id]: nextCount };
    });
  }, []);

  const setCount = useCallback((id: string, value: number) => {
    setInventory((prev) => {
      const nextCount = Math.max(0, value);
      if (nextCount !== prev[id]) {
        setOrder((o) => {
          if (nextCount > 0 && !o.includes(id)) return [...o, id];
          if (nextCount === 0 && o.includes(id)) return o.filter((x) => x !== id);
          return o;
        });
      }
      return { ...prev, [id]: nextCount };
    });
  }, []);

  const clearAll = useCallback(() => {
    setInventory(Object.fromEntries(ITEMS.map((i) => [i.id, 0])));
    setOrder([]);
  }, []);

  return (
    <CalcShell
      pageTitle={
        <>
          RUST <span>//</span> RECYCLING CALCULATOR
        </>
      }
      headerAccent="RECYCLING"
      headerRest="CALCULATOR"
      variant="recycling"
    >

      <ItemPicker
        search={search}
        onSearch={setSearch}
        onClear={clearAll}
        categories={categories}
        inventory={inventory}
        onAdjust={adjust}
        onSet={setCount}
        tipProps={tip}
      />
      <ResultsPanel
        recycler={recycler}
        onRecyclerChange={setRecycler}
        results={results}
        onSet={setCount}
        tipProps={tip}
      />
    </CalcShell>
  );
}