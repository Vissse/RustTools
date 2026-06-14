import { useCallback, useMemo, useState } from "react";
import { CalcShell } from "./CalcShell";
import { useTooltip } from "./useTooltip";
import { ITEMS } from "../lib/data/recycling-data";
import type { RecyclerKind } from "../lib/types";
import { ItemPicker } from "./recycling/ItemPicker";
import { ResultsPanel } from "./recycling/ResultsPanel";
import { buildResults, filterCategories } from "./recycling/results";

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
        /* --- Zrušení viditelného boxu u itemů --- */
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
        /* --- Horizontální separátor pod ikonou --- */
        .item-separator {
          width: 80%;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.15), transparent);
          margin: 0 auto 6px auto;
          transition: all 0.3s ease; /* Plynulá změna barvy a záře */
        }

        /* Efekt rozsvícení separátoru při vybrání předmětu (> 0) */
        .inv-item.active .item-separator {
          background: linear-gradient(to right, transparent, #cc422c, transparent);
          /* Záporné Y posune stín nahoru, vytvoří to fade efekt směrem k obrázku */
          box-shadow: 0px -4px 10px rgba(204, 66, 44, 0.6);
        }
        
        /* Skrytí nativních šipek inputu */
        .invisible-num-input::-webkit-inner-spin-button,
        .invisible-num-input::-webkit-outer-spin-button {
          -webkit-appearance: none; margin: 0;
        }
        .invisible-num-input { -moz-appearance: textfield; }

        /* --- Styl minimalistického počítadla --- */
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
          flex-shrink: 0; /* Pojistka proti deformaci */
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
          min-width: 1px; /* Vynucení minimální šířky */
          height: 10px; 
          background: linear-gradient(to bottom, transparent, #4a4a4a, transparent);
          margin: 0 4px;
          flex-shrink: 0; /* ZABRÁNÍ ZMIZENÍ SEPARÁTORU */
        }
        
        .free-counter-input {
          width: 26px !important; 
          min-width: 26px !important; /* Pojistka šířky */
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
          flex-shrink: 0; /* Pojistka proti deformaci */
        }
        
        /* Zvýraznění čísla, pokud je předmět aktivní (není na nule) */
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
