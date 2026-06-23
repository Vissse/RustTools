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
  const [search, setSearch] = useState("");
  const tip = useTooltip();

  const results = useMemo(
    () => buildResults(inventory, recycler),
    [inventory, recycler],
  );

  const query = search.trim().toLowerCase();
  const categories = useMemo(() => filterCategories(query), [query]);

  const itemTotal = useMemo(
    () => Object.values(inventory).reduce((sum, n) => sum + n, 0),
    [inventory],
  );
  useFeatureUsed(Feature.recycling, itemTotal);

  const adjust = useCallback((id: string, delta: number) => {
    setInventory((prev) => ({
      ...prev,
      [id]: Math.min(9999, Math.max(0, prev[id] + delta)),
    }));
  }, []);

  const setCount = useCallback((id: string, value: number) => {
    setInventory((prev) => ({ ...prev, [id]: value }));
  }, []);

  const clearAll = useCallback(() => {
    setInventory(Object.fromEntries(ITEMS.map((i) => [i.id, 0])));
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
      <style>{`
        /* --- Zrušení viditelného boxu u itemů v levém panelu --- */
        .inv-item {
          background: transparent !important;
          border: 1px solid transparent !important;
          box-shadow: none !important;
        }
        .inv-item.active {
          background: transparent !important;
          border-color: transparent !important;
          box-shadow: none !important;
        }

        /* --- Sjednocený styl pro všechny hlavní boxy --- */
        /* Oba typy boxů teď sdílejí naprosto stejné pozadí a okraje jako na obrázku */
        .raid-box, .raid-bd-row {
          background-color: rgba(255, 255, 255, 0.03); 
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }

        /* Specifika pro horní velký box */
        .raid-box {
          padding: 16px 20px;
          margin-bottom: 24px;
        }

        /* Specifika pro kartičky v Breakdown */
        .raid-bd-row {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 14px 18px;
          margin-bottom: 12px;
          transition: border-color 0.2s ease;
        }
        .raid-bd-row:hover {
          border-color: rgba(255, 255, 255, 0.08);
        }

        /* --- Nové Separátory do ztracena (Gradienty) --- */
        .bd-horizontal-sep {
          width: 100%;
          height: 1px;
          margin: 14px 0;
          background: linear-gradient(to right, rgba(255, 255, 255, 0.08) 0%, transparent 80%);
        }

        .bd-vertical-sep {
          width: 1px;
          height: 24px;
          margin: 0 6px;
          background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.15) 50%, transparent);
        }

        /* --- Minimalistický Input v Breakdown --- */
        .raid-qty-input {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 4px;
          width: 56px; 
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          text-align: center;
          outline: none;
          padding: 6px 4px;
          transition: all 0.2s ease;
          font-family: var(--font-ui), sans-serif;
        }
        .raid-qty-input:hover,
        .raid-qty-input:focus {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
        }

        /* Tlačítko na odstranění řádku */
        .raid-remove-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          font-size: 16px;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.15s ease-out, text-shadow 0.15s ease-out;
        }
        .raid-remove-btn:hover {
          color: var(--rust);
          text-shadow: 0 0 8px var(--rust-glow);
        }

        /* --- Inline Resources --- */
        .raid-res-inline {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .raid-res-info {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }
        .raid-res-val {
          font-size: 24px;
          font-weight: 700;
          font-family: var(--font-ui), sans-serif;
        }
        .raid-res-lbl {
          font-size: 10px;
          font-weight: 700;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 4px;
        }

        /* Sjednocená bílá barva pro všechny hodnoty surovin */
        .res-color-sulfur,
        .res-color-metal,
        .res-color-hqm,
        .res-color-scrap,
        .res-color-cloth,
        .res-color-default { color: #ffffff; }

        /* Skrytí nativních šipek inputu */
        .invisible-num-input::-webkit-inner-spin-button,
        .invisible-num-input::-webkit-outer-spin-button {
          -webkit-appearance: none; margin: 0;
        }
        .invisible-num-input { -moz-appearance: textfield; }

        /* --- Horizontální separátor pod ikonou (v levém panelu s itemy) --- */
        .item-separator {
          width: 80%;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.15), transparent);
          margin: 0 auto 6px auto;
          transition: all 0.3s ease;
        }
        .inv-item.active .item-separator {
          background: linear-gradient(to right, transparent, #cc422c, transparent);
          box-shadow: 0px -4px 10px rgba(204, 66, 44, 0.6);
        }

        /* --- Styl minimalistického počítadla (v levém panelu) --- */
        .free-counter-wrap {
          display: flex; 
          align-items: center; 
          justify-content: center; 
          width: 80%; 
          margin: 0 auto;
        }
        .free-counter-btn {
          background: transparent; 
          border: none; 
          color: #757575;
          font-size: 16px; 
          font-weight: 300; 
          cursor: pointer; 
          display: flex;
          align-items: center; 
          justify-content: center; 
          width: 20px; 
          height: 20px; 
          transition: all 0.2s ease; 
          user-select: none;
          padding: 0;
          flex-shrink: 0;
        }
        .free-counter-btn:hover { 
          color: #cc422c; 
          transform: scale(1.15); 
        }
        .free-counter-btn:active { 
          transform: scale(0.95); 
        }
        .free-separator {
          width: 1px; 
          min-width: 1px; 
          height: 10px; 
          background: linear-gradient(to bottom, transparent, #4a4a4a, transparent);
          margin: 0 4px;
          flex-shrink: 0;
        }
        .free-counter-input {
          width: 26px !important; 
          min-width: 26px !important; 
          background: transparent !important; 
          border: none !important; 
          color: #757575 !important;
          font-size: 13px !important; 
          font-weight: 700 !important; 
          text-align: center; 
          outline: none;
          font-family: inherit; 
          padding: 0 !important; 
          box-shadow: none !important;
          transition: color 0.2s ease;
          flex-shrink: 0;
        }
        .inv-item.active .free-counter-input {
          color: #fff !important; 
        }
      `}</style>

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
