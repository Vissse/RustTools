import { useState, useEffect } from "react";
import { RecycleImg } from "./RecycleImg";
import { QtyInput } from "./QtyInput";
import type { BreakdownRow } from "./types";

interface BreakdownProps {
  rows: BreakdownRow[];
  onSet: (id: string, value: number) => void;
}

function useAnimatedRows(rows: BreakdownRow[]) {
  const [rendered, setRendered] = useState(rows);
  const [removing, setRemoving] = useState<Set<string>>(new Set());

  useEffect(() => {
    const currentIds = new Set(rows.map((r) => r.id));
    const removed = rendered.filter((r) => !currentIds.has(r.id));

    if (removed.length > 0) {
      const removedIds = new Set(removed.map((r) => r.id));
      setRemoving((prev) => new Set([...prev, ...removedIds]));

      setRendered(() => {
        const next = [...rows];
        for (const r of removed) {
          next.push(r);
        }
        // Zachování původního pořadí, abychom zamezili poskakování prvků:
        return next.sort((a, b) => {
          const idxA = rendered.findIndex(x => x.id === a.id);
          const idxB = rendered.findIndex(x => x.id === b.id);
          return idxA - idxB;
        });
      });

      const timer = setTimeout(() => {
        setRendered(rows);
        setRemoving(new Set());
      }, 200);

      return () => clearTimeout(timer);
    } else {
      setRendered(rows);
    }
  }, [rows]);

  return { rendered, removing };
}

export function Breakdown({ rows, onSet }: BreakdownProps) {
  const { rendered, removing } = useAnimatedRows(rows);

  if (rendered.length === 0) return null;

  return (
    <div className="mt-8">
      {/* Použití nativní třídy sec-label pro sjednocení nadpisu */}
      <div className="sec-label">BREAKDOWN</div>

      <div>
        {rendered.map((row) => {
          // Rozdělení na jisté suroviny a suroviny s procentuální šancí
          const guaranteed = row.outputs.filter((o) => o.chancePct == null);
          const chance = row.outputs.filter((o) => o.chancePct != null);
          const isRemoving = removing.has(row.id);

          return (
            <div className={`raid-bd-row ${isRemoving ? 'fade-out-container' : 'fade-in-container'}`} key={row.id}>
              {/* 1. HORNÍ ŘÁDEK: Input, Ikona, Název a Tlačítko smazat */}
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-4">
                  {/* Kompaktní políčko (křížek 'x' odstraněn) */}
                  <QtyInput
                    className="invisible-num-input raid-qty-input"
                    value={row.count}
                    ariaLabel={`${row.name} quantity`}
                    deferZero
                    onChange={(n) => onSet(row.id, n)}
                  />

                  <div className="flex items-center gap-3">
                    <RecycleImg
                      src={row.img}
                      alt={row.name}
                      className="w-9 h-9 object-contain"
                    />
                    <span
                      className="text-[14px] font-bold text-[#e0e0e0] font-ui"
                    >
                      {row.name}
                    </span>
                  </div>
                </div>

                {/* Křížek na smazání */}
                <button
                  className="raid-remove-btn"
                  onClick={() => onSet(row.id, 0)}
                  title="Remove"
                >
                  ✕
                </button>
              </div>

              {/* HORIZONTÁLNÍ SEPARÁTOR (Do ztracena doprava) */}
              <div className="bd-horizontal-sep" />

              {/* 2. SPODNÍ ŘÁDEK: Výstupy z recyklace */}
              <div className="flex items-center justify-start gap-4 flex-wrap w-full">
                {/* Garantované suroviny */}
                {guaranteed.map((o) => (
                  <div
                    key={o.key}
                    data-tip={o.title}
                    className="flex items-center gap-2"
                  >
                    <RecycleImg
                      src={o.img}
                      alt={o.title}
                      className="w-6 h-6 object-contain"
                    />
                    <span
                      className="text-[15px] font-bold text-[#e0e0e0] font-ui"
                    >
                      {o.amount.toLocaleString("en-US").replace(/,/g, " ")}
                    </span>
                  </div>
                ))}

                {/* VERTIKÁLNÍ SEPARÁTOR (Zobrazí se pouze, když jsou obě skupiny) */}
                {guaranteed.length > 0 && chance.length > 0 && (
                  <div className="bd-vertical-sep" />
                )}

                {/* Šance na suroviny (Extra resources) - upraveno do moderní "pilulky" */}
                {chance.map((o) => (
                  <div
                    key={o.key}
                    data-tip={o.title}
                    className="flex items-center gap-1.5 bg-[rgba(205,65,43,0.08)] border border-[rgba(205,65,43,0.2)] pt-1 pr-2 pb-1 pl-1.5 rounded-md"
                  >
                    <RecycleImg
                      src={o.img}
                      alt={o.title}
                      className="w-5 h-5 object-contain"
                    />
                    <span
                      className="text-[14px] font-bold text-[#e0e0e0] font-ui"
                    >
                      {o.amount.toLocaleString("en-US").replace(/,/g, " ")}
                    </span>
                    <span
                      className="text-[11px] text-[#cd412b] font-bold ml-0.5"
                    >
                      {o.chancePct}%
                    </span>
                  </div>
                ))}

                {/* Penalizace (Safe zone) */}
                {row.penalty && (
                  <span
                    className="text-[10px] py-0.5 px-1.5 bg-[rgba(205,65,43,0.1)] text-[#cd412b] rounded-sm border border-[#cd412b] ml-auto uppercase font-ui"
                  >
                    -33% Safe Zone
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
