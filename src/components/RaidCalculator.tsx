import { useMemo, useState } from "react";
import { CalcShell } from "./CalcShell";
import { Img } from "./Img";
import { EXPLOSIVES, RESOURCE_ICONS, STRUCTURES } from "../lib/data/raid-data";
import { cheapestCombo, comboTotal, damageAgainst } from "../lib/raid-solver";

export function RaidCalculator() {
  const [selectedStructure, setSelectedStructure] = useState<string | null>(
    null,
  );
  const [selectedExplosives, setSelectedExplosives] = useState<Set<string>>(
    () => new Set(),
  );
  const [structureCount, setStructureCount] = useState<number | "">(1);
  const [discountActive, setDiscountActive] = useState<boolean>(false);

  const ready = selectedStructure !== null && selectedExplosives.size > 0;

  const result = useMemo(() => {
    if (!selectedStructure || selectedExplosives.size === 0) return null;

    const safeCount =
      typeof structureCount === "number" && structureCount > 0
        ? structureCount
        : 1;

    const totalHp = STRUCTURES[selectedStructure].hp * safeCount;
    const exps = EXPLOSIVES.filter((e) => selectedExplosives.has(e.name));
    const combo = cheapestCombo(totalHp, selectedStructure, exps);

    const totalDmg = combo.reduce(
      (s, c) => s + damageAgainst(c.exp, selectedStructure) * c.qty,
      0,
    );
    const dmgDone = Math.min(totalDmg, totalHp);
    const pct = Math.min(100, (dmgDone / totalHp) * 100);
    const destroyed = totalDmg >= totalHp;

    const baseCharcoal = comboTotal(combo, "totalCharcoal");

    return {
      totalHp,
      combo,
      dmgDone,
      pct,
      destroyed,
      totalSulfur: comboTotal(combo, "totalSulfur"),
      totalMetal: comboTotal(combo, "totalMetal"),
      totalCharcoal: discountActive
        ? Math.round(baseCharcoal * (2 / 3))
        : baseCharcoal,
      segCount: Math.min(20, safeCount * 4),
    };
  }, [selectedStructure, selectedExplosives, structureCount, discountActive]);

  function toggleExplosive(name: string) {
    setSelectedExplosives((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  return (
    <CalcShell
      pageTitle={
        <>
          RUST <span>//</span> RAID CALCULATOR
        </>
      }
      headerAccent="RAID"
      headerRest="CALCULATOR"
      variant="raid"
    >
      <style>{`
        /* Skrytí výchozích prohlížečových šipek u čísla */
        .invisible-num-input::-webkit-inner-spin-button,
        .invisible-num-input::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .invisible-num-input {
          -moz-appearance: textfield;
        }

        /* Vertikální Slider Toggle (ON / OFF) */
        .vertical-craft-toggle {
          position: relative;
          width: 22px;
          height: 44px;
          background: #121212; /* Mírně tmavší pozadí při vypnutí */
          border: 1px solid #2a2a2a; /* Ztlumený rámeček */
          border-radius: 11px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex-shrink: 0;
          opacity: 0.5; /* Výrazné ztlumení celého slideru ve vypnutém stavu */
          transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
        }
        .vertical-craft-toggle.active {
          opacity: 1; /* Plná viditelnost při zapnutí */
          background: #181818;
          border-color: #333;
        }
        .vertical-craft-toggle-thumb {
          position: absolute;
          width: 14px;
          height: 14px;
          background: #555; /* Tmavší šedá pro neaktivní palec */
          border-radius: 50%;
          left: 3px;
          bottom: 4px; /* Výchozí pozice dole = OFF */
          transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
        }
        /* Pozice nahoře = ON */
        .vertical-craft-toggle.active .vertical-craft-toggle-thumb {
          bottom: 24px;
          background: #d25a32; /* Rozsvícená oranžová */
        }
      `}</style>

      <div className="panel-left">
        <div>
          <div className="sec-label">Target Structure</div>
          <div className="btn-grid">
            {Object.entries(STRUCTURES).map(([name, data]) => (
              <button
                key={name}
                className={`item-btn${selectedStructure === name ? " active" : ""}`}
                onClick={() => setSelectedStructure(name)}
              >
                <Img src={data.img} alt={name} />
                <span className="btn-name">{name}</span>
                <span className="btn-hp">{data.hp.toLocaleString()} HP</span>
              </button>
            ))}
          </div>
        </div>

        <div id="wall-preview">
          {selectedStructure ? (
            <img
              src={STRUCTURES[selectedStructure].img}
              alt={selectedStructure}
              style={{ width: 200, height: 200, objectFit: "contain" }}
              onError={(e) => (e.currentTarget.style.opacity = "0.3")}
            />
          ) : (
            <div className="wall-placeholder">
              No structure
              <br />
              selected
            </div>
          )}
        </div>

        <div>
          <div className="sec-label">Explosives</div>
          <div className="btn-grid">
            {EXPLOSIVES.map((e) => (
              <button
                key={e.name}
                className={`item-btn small${selectedExplosives.has(e.name) ? " active" : ""}`}
                onClick={() => toggleExplosive(e.name)}
              >
                <Img src={e.img} alt={e.name} />
                <span className="btn-name small">{e.short}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="panel-right">
        {!ready || !result ? (
          <div className="empty-state">
            <span className="icon">◈</span>
            Select a target
            <br />
            and at least one
            <br />
            explosive to proceed
          </div>
        ) : (
          <div id="results">
            <div style={{ display: "flex", gap: "20px" }}>
              <div style={{ flex: 1 }}>
                <div className="sec-label">Structure Count</div>
                <div className="counter-wrap">
                  <button
                    className="counter-btn"
                    onClick={() =>
                      setStructureCount((c) =>
                        Math.max(1, (typeof c === "number" ? c : 1) - 1),
                      )
                    }
                  >
                    −
                  </button>

                  <div
                    id="wall-count"
                    style={{
                      padding: 0,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <input
                      type="number"
                      min="1"
                      className="invisible-num-input"
                      value={structureCount}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === "") {
                          setStructureCount("");
                        } else {
                          const parsed = parseInt(val, 10);
                          if (!isNaN(parsed) && parsed > 0) {
                            setStructureCount(parsed);
                          }
                        }
                      }}
                      style={{
                        width: "60px",
                        background: "transparent",
                        border: "none",
                        color: "inherit",
                        textAlign: "center",
                        fontFamily: "inherit",
                        fontSize: "inherit",
                        fontWeight: "inherit",
                        outline: "none",
                        boxShadow: "none",
                      }}
                    />
                  </div>

                  <button
                    className="counter-btn"
                    onClick={() =>
                      setStructureCount(
                        (c) => (typeof c === "number" ? c : 1) + 1,
                      )
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Sekce Crafting Method s upravenou viditelností a třídou pro font */}
              <div style={{ flex: 1 }}>
                <div className="sec-label">Crafting Method</div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    paddingTop: "4px",
                  }}
                >
                  {/* Levá strana: Mixing Table */}
                  <div
                    onClick={() => setDiscountActive(!discountActive)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      cursor: "pointer",
                      opacity: discountActive ? 1 : 0.3,
                      transition: "opacity 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)",
                      flex: 1,
                    }}
                  >
                    <Img
                      src="images/mixingtable.png"
                      alt="Mixing Table"
                      style={{
                        width: "48px",
                        height: "48px",
                        objectFit: "contain",
                      }}
                    />
                    <span
                      className="btn-name"
                      style={{ marginTop: "6px", textAlign: "center" }}
                    >
                      MIXING TABLE
                    </span>
                  </div>

                  {/* Střed: Vertikální Slider */}
                  <div
                    className={`vertical-craft-toggle ${discountActive ? "active" : ""}`}
                    onClick={() => setDiscountActive(!discountActive)}
                  >
                    <div className="vertical-craft-toggle-thumb" />
                  </div>

                  {/* Pravá strana: Cooking Workbench */}
                  <div
                    onClick={() => setDiscountActive(!discountActive)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      cursor: "pointer",
                      opacity: discountActive ? 1 : 0.3,
                      transition: "opacity 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)",
                      flex: 1,
                    }}
                  >
                    <Img
                      src="images/cookingworkbench.png"
                      alt="Cooking Workbench"
                      style={{
                        width: "48px",
                        height: "48px",
                        objectFit: "contain",
                      }}
                    />
                    <span
                      className="btn-name"
                      style={{ marginTop: "6px", textAlign: "center" }}
                    >
                      COOKING WORKBENCH
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="sec-label" style={{ marginTop: "16px" }}>
                Structural Integrity
              </div>
              <div className="hp-readout">
                <span id="hp-value">
                  {Math.round(result.dmgDone).toLocaleString()}
                </span>
                <span id="hp-max">/ {result.totalHp.toLocaleString()} HP</span>
              </div>
              <div className="hp-bar-outer">
                <div id="hp-bar-fill" style={{ width: `${result.pct}%` }} />
                <div id="hp-segments">
                  {Array.from({ length: result.segCount }).map((_, i) => (
                    <span key={i} />
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="sec-label">Cheapest Combo</div>
              {result.combo.length === 0 ? (
                <div id="no-combo">No combination found</div>
              ) : (
                <div id="combo-list">
                  {result.combo.map((c) => (
                    <div className="combo-row" key={c.exp.name}>
                      <Img src={c.exp.img} alt={c.exp.name} />
                      <span className="combo-qty">{c.qty}×</span>
                      <span className="combo-name">{c.exp.name}</span>

                      <div
                        style={{
                          display: "flex",
                          gap: "16px",
                          marginLeft: "auto",
                          alignItems: "center",
                          fontSize: "13px",
                        }}
                      >
                        {c.totalSulfur > 0 && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                            }}
                            title="Sulfur"
                          >
                            <Img
                              src={RESOURCE_ICONS.sulfur}
                              alt="Sulfur"
                              style={{ width: "16px", height: "16px" }}
                            />
                            <span style={{ color: "#d25a32", fontWeight: 600 }}>
                              {c.totalSulfur.toLocaleString()}
                            </span>
                          </div>
                        )}

                        {c.totalMetal > 0 && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                            }}
                            title="Metal"
                          >
                            <Img
                              src={RESOURCE_ICONS.metal}
                              alt="Metal"
                              style={{ width: "16px", height: "16px" }}
                            />
                            <span style={{ color: "#a5b4c0", fontWeight: 600 }}>
                              {c.totalMetal.toLocaleString()}
                            </span>
                          </div>
                        )}

                        {c.totalCharcoal > 0 && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                            }}
                            title="Coal"
                          >
                            <Img
                              src={RESOURCE_ICONS.coal}
                              alt="Coal"
                              style={{ width: "16px", height: "16px" }}
                            />
                            <span style={{ color: "#8b8c89", fontWeight: 600 }}>
                              {(discountActive
                                ? Math.round(c.totalCharcoal * (2 / 3))
                                : c.totalCharcoal
                              ).toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div className="sec-label">Total Resources</div>
              <div className="res-grid">
                <div className="res-card sulfur">
                  <div className="res-header">
                    <Img src={RESOURCE_ICONS.sulfur} alt="Sulfur" />
                    <span className="res-lbl">Sulfur</span>
                  </div>
                  <span className="res-val">
                    {result.totalSulfur.toLocaleString()}
                  </span>
                </div>
                <div className="res-card metal">
                  <div className="res-header">
                    <Img src={RESOURCE_ICONS.metal} alt="Metal" />
                    <span className="res-lbl">Metal</span>
                  </div>
                  <span className="res-val">
                    {result.totalMetal.toLocaleString()}
                  </span>
                </div>
                <div className="res-card coal">
                  <div className="res-header">
                    <Img src={RESOURCE_ICONS.coal} alt="Coal" />
                    <span className="res-lbl">Coal</span>
                  </div>
                  <span className="res-val">
                    {result.totalCharcoal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalcShell>
  );
}
