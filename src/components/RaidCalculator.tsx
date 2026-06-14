import { useMemo, useState, Fragment } from "react";
import { CalcShell } from "./CalcShell";
import { Img } from "./Img";
import { EXPLOSIVES, RESOURCE_ICONS, STRUCTURES } from "../lib/data/raid-data";
import { cheapestCombo, comboTotal, damageAgainst } from "../lib/raid-solver";

// Seznam kategorií pro filtr
const FILTER_CATEGORIES = [
  "Explosive",
  "Siege Weapons",
  "Melee",
  "Throwing Attacks",
  "Guns",
  "Torpedos",
];

export function RaidCalculator() {
  const [selectedStructure, setSelectedStructure] = useState<string | null>(
    null,
  );
  const [selectedExplosives, setSelectedExplosives] = useState<Set<string>>(
    () => new Set(),
  );
  const [structureCount, setStructureCount] = useState<number | "">(1);
  const [discountActive, setDiscountActive] = useState<boolean>(false);

  const [activeFilters, setActiveFilters] = useState<Set<string>>(
    () => new Set(["Explosive"]),
  );

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

  function toggleFilter(cat: string) {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
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
        /* Skrytí šipek */
        .invisible-num-input::-webkit-inner-spin-button,
        .invisible-num-input::-webkit-outer-spin-button {
          -webkit-appearance: none; margin: 0;
        }
        .invisible-num-input { -moz-appearance: textfield; }

        /* --- NOVÝ MINIMALISTICKÝ GRID PRO STRUKTURY S OMEZENOU VÝŠKOU --- */
        .minimal-btn-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(95px, 1fr));
          gap: 10px;
          margin-top: 12px;
          /* Omezení výšky pro zobrazení cca 3.5 řádku (upraveno pro menší boxy) */
          max-height: 170px; 
          overflow-y: auto;
          padding-right: 8px; /* Místo pro scrollbar */
          
          /* --- PŘIDANÝ FADE EFEKT SPODNÍ HRANY --- */
          -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%);
          mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%);
        }

        /* Nastylování vlastního scrollbaru */
        .minimal-btn-grid::-webkit-scrollbar {
          width: 6px;
        }
        .minimal-btn-grid::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 4px;
        }
        .minimal-btn-grid::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .minimal-btn-grid::-webkit-scrollbar-thumb:hover {
          background: #cc422c;
        }

        .minimal-box-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 4px;
          padding: 12px 6px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.25s ease;
          position: relative;
          opacity: 0.5;
          filter: grayscale(80%);
          font-family: inherit;
        }
        .minimal-box-btn:hover {
          opacity: 0.8;
          background: rgba(255, 255, 255, 0.02);
          border-color: rgba(255, 255, 255, 0.1);
        }
        .minimal-box-btn.active {
          opacity: 1;
          filter: grayscale(0%);
          border-color: #cc422c;
          background: linear-gradient(to bottom, rgba(204, 66, 44, 0.08) 0%, transparent 100%);
        }

        .minimal-box-btn img {
          width: 50px;
          height: 50px;
          object-fit: contain;
          transition: transform 0.3s ease;
        }
        .minimal-box-btn.active img {
          transform: scale(1.1);
        }

        .minimal-box-name {
          font-size: 11px;
          font-weight: 600;
          color: #a5b4c0;
          text-transform: uppercase;
          text-align: center;
          line-height: 1.2;
          letter-spacing: 0.05em;
        }
        .minimal-box-btn.active .minimal-box-name {
          color: #fff;
        }
        /* ---------------------------------------------- */

        /* ULTRA MINIMALISTICKÝ VÝBĚR KATEGORIÍ (Jeden řádek, separátory) */
        .filter-row {
          display: flex;
          align-items: center;
          justify-content: space-between; /* Rozprostře rovnoměrně na jeden řádek */
          margin-bottom: 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 8px;
          width: 100%;
        }
        
        .filter-pure-text {
          background: transparent;
          border: none;
          padding: 0 0 6px 0;
          color: #757575; /* Sladěno do šedé barvy ostatních neaktivních prvků */
          font-size: 11px; /* Velikost upravena pro zaručení 1 řádku */
          font-weight: 700;
          font-family: inherit;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: color 0.3s ease;
          position: relative;
          outline: none;
          white-space: nowrap; /* Zabrání zalamování textu na další řádek */
        }
        .filter-pure-text:hover {
          color: #c4c4c4; /* Světlejší při najetí */
        }
        .filter-pure-text.active {
          color: #fff;
        }
        
        /* Jemná podtrhávací animace pro aktivní stav */
        .filter-pure-text::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0%;
          height: 2px;
          background: #cc422c;
          transition: width 0.3s ease;
          border-radius: 2px;
        }
        .filter-pure-text.active::after {
          width: 100%;
        }

        /* Separátor identický s tím u counteru */
        .filter-separator {
          width: 1px;
          height: 14px;
          background: linear-gradient(to bottom, transparent, #4a4a4a, transparent);
          flex-shrink: 0;
        }

        /* Moderní Counter */
        .free-counter-wrap {
          display: inline-flex; align-items: center;
        }
        .free-counter-btn {
          background: transparent; border: none; color: #757575;
          font-size: 20px; font-weight: 300; cursor: pointer; display: flex;
          align-items: center; justify-content: center; width: 32px; height: 32px;
          transition: all 0.2s ease; user-select: none;
        }
        .free-counter-btn:hover { color: #cc422c; transform: scale(1.15); }
        .free-counter-btn:active { transform: scale(0.95); }
        .free-separator {
          width: 1px; height: 24px;
          background: linear-gradient(to bottom, transparent, #4a4a4a, transparent);
          margin: 0 4px;
        }
        .free-counter-input {
          width: 44px; background: transparent; border: none; color: #fff;
          font-size: 18px; font-weight: 700; text-align: center; outline: none;
          font-family: inherit;
        }

        /* Vertikální přepínač Crafting */
        .vertical-craft-toggle {
          position: relative; width: 20px; height: 40px; background: #121212;
          border: 1px solid #2a2a2a; border-radius: 10px; cursor: pointer;
          flex-shrink: 0; opacity: 0.7; transition: all 0.3s ease;
        }
        .vertical-craft-toggle.active { border-color: #444; opacity: 1; }
        .vertical-craft-toggle-thumb {
          position: absolute; width: 12px; height: 12px; background: #555;
          border-radius: 50%; left: 3px; bottom: 3px; transition: all 0.3s ease;
        }
        .vertical-craft-toggle.active .vertical-craft-toggle-thumb {
          bottom: 23px; background: #cc422c;
        }

        /* Animace a Fading HP */
        .fade-in-container { animation: fadeInUp 0.4s ease-out forwards; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .modern-hp-wrapper {
          position: relative; width: 100%; height: 2px; margin-top: 8px;
        }
        .modern-hp-fill {
          position: absolute; top: 0; left: 0; height: 100%;
          background: linear-gradient(to right, #cc422c 0%, #cc422c 20%, transparent 100%);
          border-radius: 2px; transition: width 0.8s cubic-bezier(0.22, 1, 0.36, 1); z-index: 2;
        }
        .modern-hp-glow {
          position: absolute; top: 0; left: 0; height: 100%;
          background: linear-gradient(to right, #cc422c 0%, #cc422c 20%, transparent 100%);
          filter: blur(5px); opacity: 0.8; z-index: 1; transition: width 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* --- MINIMALISTICKÝ BOX STYL (Pro Combo a Resources) --- */
        .minimal-combo-row {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 6px;
          padding: 12px 16px;
          /* Větší odsazení zamezí natlačení položek na sebe */
          margin-bottom: 16px; 
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .minimal-combo-row:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(255, 255, 255, 0.1);
        }
        .minimal-combo-row:last-child {
          margin-bottom: 0;
        }

        /* Nový vertikální oddělovač */
        .combo-separator {
          width: 1px;
          height: 36px;
          background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.15), transparent);
          margin: 0 20px;
          flex-shrink: 0;
        }
      `}</style>

      <div
        className="panel-left"
        style={{ display: "flex", flexDirection: "column" }}
      >
        {/* Sekce 1: Target Structure */}
        <div>
          <div className="sec-label">TARGET STRUCTURE</div>
          <div className="minimal-btn-grid">
            {Object.entries(STRUCTURES).map(([name, data]) => (
              <button
                key={name}
                className={`minimal-box-btn${selectedStructure === name ? " active" : ""}`}
                onClick={() => setSelectedStructure(name)}
              >
                <Img src={data.img} alt={name} />
                <span className="minimal-box-name">{name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sekce 2: Dynamický plovoucí náhled zdi + Counter */}
        <div
          style={{
            height: "200px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "0px 0 8px 0",
            gap: "12px",
          }}
        >
          {selectedStructure ? (
            <>
              <img
                src={STRUCTURES[selectedStructure].img}
                alt={selectedStructure}
                style={{
                  maxHeight: "130px",
                  maxWidth: "80%",
                  objectFit: "contain",
                  filter: "drop-shadow(0px 8px 16px rgba(0,0,0,0.6))",
                }}
                onError={(e) => (e.currentTarget.style.opacity = "0.3")}
              />
              <div className="free-counter-wrap">
                <button
                  className="free-counter-btn"
                  onClick={() =>
                    setStructureCount((c) =>
                      Math.max(1, (typeof c === "number" ? c : 1) - 1),
                    )
                  }
                >
                  −
                </button>
                <div className="free-separator" />
                <input
                  type="number"
                  min="1"
                  className="invisible-num-input free-counter-input"
                  value={structureCount}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "") {
                      setStructureCount("");
                    } else {
                      const parsed = parseInt(val, 10);
                      if (!isNaN(parsed) && parsed > 0)
                        setStructureCount(parsed);
                    }
                  }}
                />
                <div className="free-separator" />
                <button
                  className="free-counter-btn"
                  onClick={() =>
                    setStructureCount(
                      (c) => (typeof c === "number" ? c : 1) + 1,
                    )
                  }
                >
                  +
                </button>
              </div>
            </>
          ) : (
            <div className="wall-placeholder" style={{ opacity: 0.5 }}>
              NO STRUCTURE SELECTED
            </div>
          )}
        </div>

        {/* Sekce 3: Nástroje a filtry */}
        <div style={{ marginTop: "-20px" }}>
          <div className="sec-label">RAIDING TOOLS</div>

          {/* ULTRA MINIMALISTICKÁ SEKCE KATEGORIÍ SE SEPARÁTORY */}
          <div className="filter-row">
            {FILTER_CATEGORIES.map((cat, idx) => (
              <Fragment key={cat}>
                <button
                  className={`filter-pure-text ${activeFilters.has(cat) ? "active" : ""}`}
                  onClick={() => toggleFilter(cat)}
                >
                  {cat}
                </button>
                {/* Přidání separátoru všude, kromě úplně poslední položky */}
                {idx < FILTER_CATEGORIES.length - 1 && (
                  <div className="filter-separator" />
                )}
              </Fragment>
            ))}
          </div>

          <div className="minimal-btn-grid">
            {EXPLOSIVES.map((e) => (
              <button
                key={e.name}
                className={`minimal-box-btn${selectedExplosives.has(e.name) ? " active" : ""}`}
                onClick={() => toggleExplosive(e.name)}
              >
                <Img src={e.img} alt={e.name} />
                <span className="minimal-box-name">{e.short}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="panel-right">
        {!ready || !result ? (
          <div className="empty-state">
            <span className="icon">◈</span>
            SELECT A TARGET
            <br />
            AND AT LEAST ONE
            <br />
            EXPLOSIVE TO PROCEED
          </div>
        ) : (
          <div
            id="results"
            className="fade-in-container"
            style={{ display: "flex", flexDirection: "column", gap: "32px" }}
          >
            {/* Integrity */}
            <div>
              <div className="sec-label">STRUCTURAL INTEGRITY</div>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "baseline",
                  margin: "16px 0 8px 0",
                }}
              >
                <span
                  style={{
                    fontSize: "42px",
                    fontWeight: 800,
                    color: "#fff",
                    lineHeight: 1,
                  }}
                >
                  {Math.round(result.dmgDone).toLocaleString()}
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    color: "#555",
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                  }}
                >
                  / {result.totalHp.toLocaleString()} HP
                </span>
              </div>
              <div className="modern-hp-wrapper">
                <div
                  className="modern-hp-fill"
                  style={{ width: `${result.pct}%` }}
                />
                <div
                  className="modern-hp-glow"
                  style={{ width: `${result.pct}%` }}
                />
              </div>
            </div>

            {/* Cheapest Combo */}
            <div>
              {result.combo.length === 0 ? (
                <div id="no-combo">NO COMBINATION FOUND</div>
              ) : (
                result.combo.map((c) => (
                  <div className="minimal-combo-row" key={c.exp.name}>
                    {/* 1. ČÁST: Ikona výbušniny */}
                    <Img
                      src={c.exp.img}
                      alt={c.exp.name}
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "contain",
                        flexShrink: 0,
                      }}
                    />

                    {/* 2. ČÁST: Množství a Název */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                        flex: 1,
                        marginLeft: "16px",
                      }}
                    >
                      <span
                        style={{
                          color: "#cc422c",
                          fontWeight: 800,
                          fontSize: "18px",
                          lineHeight: 1,
                        }}
                      >
                        {c.qty}
                        <span
                          style={{
                            fontSize: "14px",
                            marginLeft: "4px",
                            color: "#cc422c",
                          }}
                        >
                          x
                        </span>
                      </span>
                      <span
                        style={{
                          color: "#e0e0e0",
                          fontSize: "13px",
                          fontWeight: 700,
                          letterSpacing: "0.02em",
                          textTransform: "uppercase",
                        }}
                      >
                        {c.exp.name}
                      </span>
                    </div>

                    {/* 3. ČÁST: Oddělovač */}
                    <div className="combo-separator" />

                    {/* 4. ČÁST: Suroviny napravo */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        flexShrink: 0,
                      }}
                    >
                      {c.totalSulfur > 0 && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <Img
                            src={RESOURCE_ICONS.sulfur}
                            alt="Sulfur"
                            style={{ width: "16px", height: "16px" }}
                          />
                          <span
                            style={{
                              color: "#cc422c",
                              fontWeight: 700,
                              fontSize: "15px",
                            }}
                          >
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
                        >
                          <Img
                            src={RESOURCE_ICONS.metal}
                            alt="Metal"
                            style={{ width: "16px", height: "16px" }}
                          />
                          <span
                            style={{
                              color: "#a5b4c0",
                              fontWeight: 700,
                              fontSize: "15px",
                            }}
                          >
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
                        >
                          <Img
                            src={RESOURCE_ICONS.coal}
                            alt="Coal"
                            style={{ width: "16px", height: "16px" }}
                          />
                          <span
                            style={{
                              color: "#8b8c89",
                              fontWeight: 700,
                              fontSize: "15px",
                            }}
                          >
                            {(discountActive
                              ? Math.round(c.totalCharcoal * (2 / 3))
                              : c.totalCharcoal
                            ).toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* --- UNIFIED TOTAL RESOURCES & CRAFTING METHOD --- */}
            <div>
              <div
                className="sec-label"
                style={{ marginBottom: "12px", marginTop: "8px" }}
              >
                TOTAL RESOURCES & CRAFTING
              </div>

              <div
                className="minimal-combo-row"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px 20px",
                  margin: 0,
                  flexWrap: "nowrap" /* STRIKTNĚ zakázáno zalamování */,
                  gap: "12px",
                  overflow:
                    "hidden" /* Kdyby náhodou, ať nerozbije zbytek stránky */,
                }}
              >
                {/* Levá část: Suroviny */}
                <div
                  style={{
                    display: "flex",
                    gap: "16px" /* Mírně zmenšená mezera pro víc místa u velkých čísel */,
                    alignItems: "center",
                    flexWrap: "nowrap" /* Striktně bez zalamování */,
                  }}
                >
                  {/* Sulfur */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <Img
                      src={RESOURCE_ICONS.sulfur}
                      alt="Sulfur"
                      style={{ width: "22px", height: "22px", flexShrink: 0 }}
                    />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span
                        style={{
                          fontSize: "20px",
                          fontWeight: 800,
                          color: "#cc422c",
                          lineHeight: 1,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {result.totalSulfur.toLocaleString()}
                      </span>
                      <span
                        style={{
                          fontSize: "10px",
                          color: "#8b8c89",
                          fontWeight: 700,
                          letterSpacing: "0.05em",
                          marginTop: "2px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        SULFUR
                      </span>
                    </div>
                  </div>

                  {/* Metal */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <Img
                      src={RESOURCE_ICONS.metal}
                      alt="Metal"
                      style={{ width: "22px", height: "22px", flexShrink: 0 }}
                    />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span
                        style={{
                          fontSize: "20px",
                          fontWeight: 800,
                          color: "#a5b4c0",
                          lineHeight: 1,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {result.totalMetal.toLocaleString()}
                      </span>
                      <span
                        style={{
                          fontSize: "10px",
                          color: "#8b8c89",
                          fontWeight: 700,
                          letterSpacing: "0.05em",
                          marginTop: "2px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        METAL
                      </span>
                    </div>
                  </div>

                  {/* Coal */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <Img
                      src={RESOURCE_ICONS.coal}
                      alt="Coal"
                      style={{ width: "22px", height: "22px", flexShrink: 0 }}
                    />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span
                        style={{
                          fontSize: "20px",
                          fontWeight: 800,
                          color: "#8b8c89",
                          lineHeight: 1,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {result.totalCharcoal.toLocaleString()}
                      </span>
                      <span
                        style={{
                          fontSize: "10px",
                          color: "#8b8c89",
                          fontWeight: 700,
                          letterSpacing: "0.05em",
                          marginTop: "2px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        COAL
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pravá část: ODDĚLOVAČ + PŘEPÍNAČ (Pevný blok) */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexShrink: 0,
                  }}
                >
                  {/* --- VERTIKÁLNÍ ODDĚLOVAČ --- */}
                  <div
                    style={{
                      width: "1px",
                      height: "40px",
                      background:
                        "linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.15), transparent)",
                      margin: "0 14px",
                      flexShrink: 0,
                    }}
                  />

                  {/* Spínač a nápisy */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    {/* Přepínač (Slider) */}
                    <div
                      onClick={() => setDiscountActive(!discountActive)}
                      style={{
                        position: "relative",
                        width: "36px",
                        height: "20px",
                        background: "#121212",
                        border: `1px solid ${discountActive ? "rgba(204, 66, 44, 0.5)" : "rgba(255, 255, 255, 0.1)"}`,
                        borderRadius: "10px",
                        cursor: "pointer",
                        flexShrink: 0,
                        transition: "all 0.3s ease",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          width: "12px",
                          height: "12px",
                          background: discountActive ? "#cc422c" : "#555",
                          borderRadius: "50%",
                          top: "3px",
                          left: discountActive ? "19px" : "3px",
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      />
                    </div>

                    {/* Nápisy a separator na středu */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          color: discountActive ? "#cc422c" : "#757575",
                          transition: "color 0.2s",
                          lineHeight: 1,
                        }}
                      >
                        MIXING TABLE
                      </span>

                      {/* Horizontální Separator textu */}
                      <div
                        style={{
                          width: "100%",
                          height: "1px",
                          background:
                            "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)",
                          margin: "4px 0",
                        }}
                      />

                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          color: discountActive ? "#cc422c" : "#757575",
                          transition: "color 0.2s",
                          lineHeight: 1,
                        }}
                      >
                        COOKING WORKBENCH
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalcShell>
  );
}
