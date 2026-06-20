import { useMemo, useState, Fragment } from 'react'
import type { CSSProperties } from 'react'
import { CalcShell } from './CalcShell'
import { Img } from './Img'
import {
  EXPLOSIVES,
  RAID_DATA,
  RESOURCE_ICONS,
  STRUCTURES,
} from '../lib/data/raid-data'
import { cheapestCombo, comboTotal, damageAgainst } from '../lib/raid-solver'
import type { RaidCategory } from '../lib/types'

// Filtr -> kategorie v RAID_DATA. 'Explosive' řeší vlastní solver (cheapestCombo),
// ostatní kategorie jen vypisují potřebné množství + čas z per-structure dat.
const CATEGORY_MAP: Record<string, RaidCategory> = {
  'Siege Weapons': 'siege weapons',
  Melee: 'melee',
  'Throwing Attacks': 'throw',
  Guns: 'guns',
  Torpedos: 'torpedo',
}

// Seznam kategorií pro filtr
const FILTER_CATEGORIES = [
  'Explosive',
  'Siege Weapons',
  'Melee',
  'Throwing Attacks',
  'Guns',
  'Torpedos',
]

export function RaidCalculator() {
  const [selectedStructure, setSelectedStructure] = useState<string | null>(
    null
  )
  const [selectedExplosives, setSelectedExplosives] = useState<Set<string>>(
    () => new Set()
  )
  const [structureCount, setStructureCount] = useState<number | ''>(1)
  const [discountActive, setDiscountActive] = useState<boolean>(false)

  const [activeFilters, setActiveFilters] = useState<Set<string>>(
    () => new Set(['Explosive'])
  )

  const ready = selectedStructure !== null && selectedExplosives.size > 0

  const result = useMemo(() => {
    if (!selectedStructure || selectedExplosives.size === 0) return null

    const safeCount =
      typeof structureCount === 'number' && structureCount > 0
        ? structureCount
        : 1

    const totalHp = STRUCTURES[selectedStructure].hp * safeCount
    const exps = EXPLOSIVES.filter((e) => selectedExplosives.has(e.name))
    const combo = cheapestCombo(totalHp, selectedStructure, exps)

    const totalDmg = combo.reduce(
      (s, c) => s + damageAgainst(c.exp, selectedStructure) * c.qty,
      0
    )
    const dmgDone = Math.min(totalDmg, totalHp)
    const pct = Math.min(100, (dmgDone / totalHp) * 100)
    const destroyed = totalDmg >= totalHp

    const baseCharcoal = comboTotal(combo, 'totalCharcoal')

    return {
      totalHp,
      combo,
      dmgDone,
      pct,
      destroyed,
      totalSulfur: comboTotal(combo, 'totalSulfur'),
      totalMetal: comboTotal(combo, 'totalMetal'),
      totalCharcoal: discountActive
        ? Math.round(baseCharcoal * (2 / 3))
        : baseCharcoal,
      segCount: Math.min(20, safeCount * 4),
    }
  }, [selectedStructure, selectedExplosives, structureCount, discountActive])

  const explosiveActive = activeFilters.has('Explosive')

  // Per-structure raiding tools for the active non-explosive categories,
  // grouped by category, with quantities scaled by the structure count.
  const toolGroups = useMemo(() => {
    if (!selectedStructure) return []
    const items = RAID_DATA[selectedStructure]
    if (!items) return []

    const safeCount =
      typeof structureCount === 'number' && structureCount > 0
        ? structureCount
        : 1

    return FILTER_CATEGORIES.filter(
      (label) => label !== 'Explosive' && activeFilters.has(label)
    )
      .map((label) => {
        const category = CATEGORY_MAP[label]
        const tools = items
          .filter((it) => it.category === category)
          .map((it) => ({ ...it, total: it.quantity * safeCount }))
          .sort((a, b) => a.total - b.total)
        return { label, tools }
      })
      .filter((g) => g.tools.length > 0)
  }, [selectedStructure, structureCount, activeFilters])

  const solverShown = explosiveActive && ready && result !== null

  function toggleExplosive(name: string) {
    setSelectedExplosives((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  function toggleFilter(cat: string) {
    setActiveFilters((prev) => {
      const next = new Set(prev)
      if (next.has(cat)) next.delete(cat)
      else next.add(cat)
      return next
    })
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
      {/* Column 1: Target Structure picker + preview + counter */}
      <div className="panel-left">
        {/* Sekce 1: Target Structure */}
        <div className="min-h-72">
          <div className="sec-label leading-2">TARGET STRUCTURE</div>
          <div className="minimal-btn-grid structure-grid">
            {Object.entries(STRUCTURES).map(([name, data]) => (
              <button
                key={name}
                className={`minimal-box-btn${selectedStructure === name ? ' active' : ''}`}
                onClick={() => setSelectedStructure(name)}
              >
                <Img src={data.img} alt={name} />
                <span className="minimal-box-name">{name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sekce 2: Dynamický plovoucí náhled zdi + Counter */}
        <div className="structure-preview">
          {selectedStructure ? (
            <>
              <img
                src={STRUCTURES[selectedStructure].img}
                alt={selectedStructure}
                className="structure-preview-img"
                onError={(e) => (e.currentTarget.style.opacity = '0.3')}
              />
              <div className="free-counter-wrap">
                <button
                  className="free-counter-btn"
                  onClick={() =>
                    setStructureCount((c) =>
                      Math.max(1, (typeof c === 'number' ? c : 1) - 1)
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
                    const val = e.target.value
                    if (val === '') {
                      setStructureCount('')
                    } else {
                      const parsed = parseInt(val, 10)
                      if (!isNaN(parsed) && parsed > 0)
                        setStructureCount(parsed)
                    }
                  }}
                />
                <div className="free-separator" />
                <button
                  className="free-counter-btn"
                  onClick={() =>
                    setStructureCount(
                      (c) => (typeof c === 'number' ? c : 1) + 1
                    )
                  }
                >
                  +
                </button>
              </div>
            </>
          ) : (
            <div className="wall-placeholder opacity-50">
              NO STRUCTURE SELECTED
            </div>
          )}
        </div>
      </div>

      {/* Column 2: Raiding Tools (filters, explosives grid, tool list) */}
      <div className="panel-mid">
        <div>
          <div className="sec-label">RAIDING TOOLS</div>

          {/* ULTRA MINIMALISTICKÁ SEKCE KATEGORIÍ SE SEPARÁTORY */}
          <div className="filter-row">
            {FILTER_CATEGORIES.map((cat, idx) => (
              <Fragment key={cat}>
                <button
                  className={`filter-pure-text ${activeFilters.has(cat) ? 'active' : ''}`}
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

          {explosiveActive && (
            <div className="minimal-btn-grid">
              {EXPLOSIVES.map((e) => (
                <button
                  key={e.name}
                  className={`minimal-box-btn${selectedExplosives.has(e.name) ? ' active' : ''}`}
                  onClick={() => toggleExplosive(e.name)}
                >
                  <Img src={e.img} alt={e.name} />
                  <span className="minimal-box-name">{e.short}</span>
                </button>
              ))}
            </div>
          )}
          {!explosiveActive && toolGroups.length === 0 && (
            <div className="wall-placeholder opacity-50 py-4 text-xs">
              {selectedStructure
                ? 'NO TOOLS IN THE SELECTED CATEGORIES'
                : 'SELECT A TARGET AND A RAIDING TOOL CATEGORY'}
            </div>
          )}

          {toolGroups.length > 0 && (
            <div className="tool-list">
              {toolGroups.map((group) => (
                <div key={group.label} className="tool-group">
                  <div className="tool-group-label">
                    {group.label.toUpperCase()}
                  </div>
                  {group.tools.map((tool) => (
                    <div className="tool-row" key={tool.name}>
                      <span className="tool-name">{tool.name}</span>
                      <span className="tool-time">{tool.time}</span>
                      <span className="tool-qty">
                        {tool.total.toLocaleString()}
                        <span className="tool-qty-x">x</span>
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="panel-right">
        {!solverShown ? (
          <div className="empty-state">
            <span className="icon">◈</span>
            SELECT A TARGET
            <br />
            AND AT LEAST ONE
            <br />
            EXPLOSIVE TO PROCEED
          </div>
        ) : (
          <div id="results" className="fade-in-container raid-results">
            {solverShown && result && (
              <>
                {/* Integrity */}
                <div>
                  <div className="sec-label">STRUCTURAL INTEGRITY</div>
                  <div className="integrity-row">
                    <span className="integrity-value">
                      {Math.round(result.dmgDone).toLocaleString()}
                    </span>
                    <span className="integrity-total">
                      / {result.totalHp.toLocaleString()} HP
                    </span>
                  </div>
                  <div
                    className="modern-hp-wrapper"
                    style={{ '--hp-pct': `${result.pct}%` } as CSSProperties}
                  >
                    <div className="modern-hp-fill" />
                    <div className="modern-hp-glow" />
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
                          className="combo-icon"
                        />

                        {/* 2. ČÁST: Množství a Název */}
                        <div className="combo-info">
                          <span className="combo-qty">
                            {c.qty}
                            <span className="combo-qty-x">x</span>
                          </span>
                          <span className="combo-name">{c.exp.name}</span>
                        </div>

                        {/* 3. ČÁST: Oddělovač */}
                        <div className="combo-separator" />

                        {/* 4. ČÁST: Suroviny napravo */}
                        <div className="combo-resources">
                          {c.totalSulfur > 0 && (
                            <div className="combo-res">
                              <Img
                                src={RESOURCE_ICONS.sulfur}
                                alt="Sulfur"
                                className="combo-res-icon"
                              />
                              <span className="combo-res-val res-sulfur">
                                {c.totalSulfur.toLocaleString()}
                              </span>
                            </div>
                          )}
                          {c.totalMetal > 0 && (
                            <div className="combo-res">
                              <Img
                                src={RESOURCE_ICONS.metal}
                                alt="Metal"
                                className="combo-res-icon"
                              />
                              <span className="combo-res-val res-metal">
                                {c.totalMetal.toLocaleString()}
                              </span>
                            </div>
                          )}
                          {c.totalCharcoal > 0 && (
                            <div className="combo-res">
                              <Img
                                src={RESOURCE_ICONS.coal}
                                alt="Coal"
                                className="combo-res-icon"
                              />
                              <span className="combo-res-val res-coal">
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
                  <div className="sec-label mb-3 mt-2">
                    TOTAL RESOURCES & CRAFTING
                  </div>

                  <div className="minimal-combo-row totals-row">
                    {/* Levá část: Suroviny */}
                    <div className="totals-group">
                      {/* Sulfur */}
                      <div className="totals-item">
                        <Img
                          src={RESOURCE_ICONS.sulfur}
                          alt="Sulfur"
                          className="totals-icon"
                        />
                        <div className="totals-text">
                          <span className="totals-val res-sulfur">
                            {result.totalSulfur.toLocaleString()}
                          </span>
                          <span className="totals-label">SULFUR</span>
                        </div>
                      </div>

                      {/* Metal */}
                      <div className="totals-item">
                        <Img
                          src={RESOURCE_ICONS.metal}
                          alt="Metal"
                          className="totals-icon"
                        />
                        <div className="totals-text">
                          <span className="totals-val res-metal">
                            {result.totalMetal.toLocaleString()}
                          </span>
                          <span className="totals-label">METAL</span>
                        </div>
                      </div>

                      {/* Coal */}
                      <div className="totals-item">
                        <Img
                          src={RESOURCE_ICONS.coal}
                          alt="Coal"
                          className="totals-icon"
                        />
                        <div className="totals-text">
                          <span className="totals-val res-coal">
                            {result.totalCharcoal.toLocaleString()}
                          </span>
                          <span className="totals-label">COAL</span>
                        </div>
                      </div>
                    </div>

                    {/* Pravá část: ODDĚLOVAČ + PŘEPÍNAČ (Pevný blok) */}
                    <div className="ml-auto craft-toggle-side ">
                      {/* <div className="craft-divider" /> */}

                      {/* Spínač a nápisy */}
                      <div
                        className={`craft-switch-group${discountActive ? ' active' : ''}`}
                      >
                        {/* Přepínač (Slider) */}
                        <div
                          className="craft-switch"
                          onClick={() => setDiscountActive(!discountActive)}
                        >
                          <div className="craft-switch-thumb" />
                        </div>

                        {/* Nápisy a separator na středu */}
                        <div className="craft-labels">
                          <span className="craft-label">MIXING TABLE</span>
                          <div className="craft-label-sep" />
                          <span className="craft-label">COOKING WORKBENCH</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </CalcShell>
  )
}
