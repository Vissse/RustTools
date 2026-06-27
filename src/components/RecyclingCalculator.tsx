'use client'

import { useCallback, useMemo, useState } from "react";
import { useQueryStates, parseAsStringLiteral } from "nuqs";
import { CalcShell } from "./CalcShell";
import { useTooltip } from "./useTooltip";
import { ITEMS } from "../lib/data/recycling-data";
import type { RecyclerKind } from "../lib/types";
import { ItemPicker } from "./recycling/ItemPicker";
import { ResultsPanel } from "./recycling/ResultsPanel";
import { buildResults, filterCategories } from "./recycling/results";
import { Feature, useFeatureUsed } from "../lib/analytics";
import { parseAsEntries, setEntryQty } from "../lib/url-entries";

const RECYCLERS = ["radtown", "safezone"] as const;

export function RecyclingCalculator() {
  // Recycler choice + item quantities live in the URL (?r=&i=cloth:80,scrap:200)
  // so a full inventory can be shared. The `i` entries list carries both the
  // quantities and the order the user added them in.
  const [{ r: recycler, i: entries }, setQuery] = useQueryStates(
    {
      r: parseAsStringLiteral(RECYCLERS).withDefault("radtown"),
      i: parseAsEntries,
    },
    { history: "replace" },
  );
  const setRecycler = (r: RecyclerKind) => setQuery({ r });

  const [search, setSearch] = useState("");
  const tip = useTooltip();

  // Drop any ids not in the dataset (e.g. from a hand-edited URL), then derive
  // the Record<id, qty> + ordered id list the rest of the calculator expects.
  const validEntries = useMemo(
    () => entries.filter((e) => ITEMS.some((it) => it.id === e.id)),
    [entries],
  );
  const inventory = useMemo(() => {
    const base: Record<string, number> = Object.fromEntries(
      ITEMS.map((i) => [i.id, 0]),
    );
    for (const e of validEntries) base[e.id] = e.qty;
    return base;
  }, [validEntries]);
  const order = useMemo(() => validEntries.map((e) => e.id), [validEntries]);

  const results = useMemo(
    () => buildResults(inventory, recycler, order),
    [inventory, recycler, order],
  );

  const searchQuery = search.trim().toLowerCase();
  const categories = useMemo(() => filterCategories(searchQuery), [searchQuery]);

  const itemTotal = useMemo(
    () => Object.values(inventory).reduce((sum, n) => sum + n, 0),
    [inventory],
  );
  useFeatureUsed(Feature.recycling, itemTotal);

  const adjust = useCallback(
    (id: string, delta: number) => {
      setQuery((prev) => {
        const cur = prev.i.find((e) => e.id === id)?.qty ?? 0;
        return { i: setEntryQty(prev.i, id, cur + delta) };
      });
    },
    [setQuery],
  );

  const setCount = useCallback(
    (id: string, value: number) => {
      setQuery((prev) => ({ i: setEntryQty(prev.i, id, value) }));
    },
    [setQuery],
  );

  const clearAll = useCallback(() => {
    setQuery({ i: [] });
  }, [setQuery]);

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