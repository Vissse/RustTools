import { RecycleImg } from "./RecycleImg";
import { QtyInput } from "./QtyInput";
import type { BreakdownRow } from "./types";

interface BreakdownProps {
  rows: BreakdownRow[];
  onSet: (id: string, value: number) => void;
}

export function Breakdown({ rows, onSet }: BreakdownProps) {
  if (rows.length === 0) return null;

  return (
    <div style={{ marginTop: "32px" }}>
      {/* Použití nativní třídy sec-label pro sjednocení nadpisu */}
      <div className="sec-label">BREAKDOWN</div>

      <div>
        {rows.map((row) => {
          // Rozdělení na jisté suroviny a suroviny s procentuální šancí
          const guaranteed = row.outputs.filter((o) => o.chancePct == null);
          const chance = row.outputs.filter((o) => o.chancePct != null);

          return (
            <div className="raid-bd-row" key={row.id}>
              {/* 1. HORNÍ ŘÁDEK: Input, Ikona, Název a Tlačítko smazat */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "16px" }}
                >
                  {/* Kompaktní políčko a "x" */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <QtyInput
                      className="invisible-num-input raid-qty-input"
                      value={row.count}
                      ariaLabel={`${row.name} quantity`}
                      deferZero
                      onChange={(n) => onSet(row.id, n)}
                    />
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#666",
                        fontWeight: 700,
                      }}
                    >
                      x
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <RecycleImg
                      src={row.img}
                      alt={row.name}
                      style={{
                        width: "36px",
                        height: "36px",
                        objectFit: "contain",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#e0e0e0",
                        fontFamily: "var(--font-ui), sans-serif",
                      }}
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: "16px",
                  flexWrap: "wrap",
                  width: "100%",
                }}
              >
                {/* Garantované suroviny */}
                {guaranteed.map((o) => (
                  <div
                    key={o.key}
                    data-tip={o.title}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <RecycleImg
                      src={o.img}
                      alt={o.title}
                      style={{
                        width: "24px",
                        height: "24px",
                        objectFit: "contain",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "#e0e0e0",
                        fontFamily: "var(--font-ui), sans-serif",
                      }}
                    >
                      {o.amount.toLocaleString("en-US").replace(/,/g, " ")}
                    </span>
                  </div>
                ))}

                {/* VERTIKÁLNÍ SEPARÁTOR (Zobrazí se pouze, když jsou obě skupiny) */}
                {guaranteed.length > 0 && chance.length > 0 && (
                  <div className="bd-vertical-sep" />
                )}

                {/* Šance na suroviny (Extra resources) */}
                {chance.map((o) => (
                  <div
                    key={o.key}
                    data-tip={o.title}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <RecycleImg
                      src={o.img}
                      alt={o.title}
                      style={{
                        width: "24px",
                        height: "24px",
                        objectFit: "contain",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "#e0e0e0",
                        fontFamily: "var(--font-ui), sans-serif",
                      }}
                    >
                      {o.amount.toLocaleString("en-US").replace(/,/g, " ")}
                    </span>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#cd412b",
                        fontWeight: 700,
                      }}
                    >
                      {o.chancePct}%
                    </span>
                  </div>
                ))}

                {/* Penalizace (Safe zone) */}
                {row.penalty && (
                  <span
                    style={{
                      fontSize: "10px",
                      padding: "2px 6px",
                      background: "rgba(205, 65, 43, 0.1)",
                      color: "#cd412b",
                      borderRadius: "4px",
                      border: "1px solid #cd412b",
                      marginLeft: "auto", // Odstrčí badge na pravý okraj
                      textTransform: "uppercase",
                      fontFamily: "var(--font-ui), sans-serif",
                    }}
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
