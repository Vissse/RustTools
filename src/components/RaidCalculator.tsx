'use client'

import { useMemo, useState, useEffect, useRef, Fragment } from 'react'
import type { CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import {
  useQueryStates,
  parseAsString,
  parseAsInteger,
  parseAsBoolean,
  parseAsStringLiteral,
  parseAsArrayOf,
} from 'nuqs'
import { Img } from './Img'
import {
  buildDamageMap,
  EXPLOSIVES,
  loadRaidDataForStructure, // Původní RAID_DATA nahrazeno asynchronním getterem
  RESOURCE_ICONS,
  rowsForQuotedSide,
  STRUCTURES,
  type StructureName,
} from '../lib/data/raid-data'
import {
  bestCombo,
  comboTotal,
  damageAgainst,
  type ComboMode,
} from '../lib/raid-solver'
import { Feature, useFeatureUsed } from '../lib/analytics'
import type { RaidCategory, RaidItem } from '../lib/types'

// Explosives always drive the solver (bestCombo) and are the primary path.
// Everything else here is a secondary, non-optimized method: just quantity +
// time straight from the per-structure data, grouped under one "Other Methods"
// disclosure instead of competing with Explosives as equal-weight tabs.
const CATEGORY_MAP: Record<string, RaidCategory> = {
  'Siege Weapons': 'siege weapons',
  Melee: 'melee',
  'Throwing Attacks': 'throw',
  Guns: 'guns',
  Torpedos: 'torpedo',
}

const OTHER_METHOD_CATEGORIES = [
  'Siege Weapons',
  'Melee',
  'Throwing Attacks',
  'Guns',
  'Torpedos',
]

const COMBO_MODES = ['cheapest', 'fastest'] as const

const isStructureName = (v: string): v is StructureName => v in STRUCTURES

export function RaidCalculator() {
  // The whole raid setup lives in the URL so a combo can be shared with a link:
  //   ?s=Sheet+Metal+Door&e=C4,Rocket&n=20&d=true&m=fastest&f=Melee
  // Sets/structure are stored as plain arrays/strings here and sanitised against
  // the known data below, so a hand-edited URL can never inject invalid state.
  // `f` used to include 'Explosive' as a toggleable tab; that value is simply
  // ignored now (Explosives are always shown), so an old shared link still works.
  const [query, setQuery] = useQueryStates(
    {
      s: parseAsString,
      e: parseAsArrayOf(parseAsString).withDefault([]),
      n: parseAsInteger,
      d: parseAsBoolean.withDefault(false),
      m: parseAsStringLiteral(COMBO_MODES).withDefault('cheapest'),
      f: parseAsArrayOf(parseAsString).withDefault([]),
    },
    { history: 'replace' },
  )

  const selectedStructure: StructureName | null =
    query.s && isStructureName(query.s) ? query.s : null
  const structureCount = query.n
  const discountActive = query.d
  const comboMode: ComboMode = query.m

  const selectedExplosives = useMemo(
    () => new Set(query.e.filter((name) => EXPLOSIVES.some((x) => x.name === name))),
    [query.e],
  )
  const activeFilters = useMemo(
    () => new Set(query.f.filter((c) => OTHER_METHOD_CATEGORIES.includes(c))),
    [query.f],
  )

  const visibleStructures = useMemo(
    () => Object.entries(STRUCTURES).sort(([a], [b]) => a.localeCompare(b)),
    [],
  )

  // The full structure grid lives in a popup instead of inline — 26 icon
  // tiles don't need to sit on the page once a target is picked.
  const [structureModalOpen, setStructureModalOpen] = useState(false)

  const setSelectedStructure = (name: string) => setQuery({ s: name })
  const setStructureCount = (
    n: number | null | ((prev: number | null) => number | null),
  ) => setQuery((prev) => ({ n: typeof n === 'function' ? n(prev.n) : n }))

  const totalHp = useMemo(
    () =>
      selectedStructure
        ? STRUCTURES[selectedStructure].hp *
          (typeof structureCount === 'number' && structureCount > 0
            ? structureCount
            : 1)
        : 0,
    [selectedStructure, structureCount],
  )

  // The category tabs wrap onto multiple rows on narrow screens; when they do,
  // the vertical dividers between them would dangle at row edges. Detect the
  // wrap and hide the dividers via the `is-wrapped` class. We compute the width
  // a single row WOULD need (tabs + gaps + dividers) rather than reading the
  // current layout, so toggling the class can't feed back into the measurement.
  const filterRowRef = useRef<HTMLDivElement>(null)
  const [filtersWrapped, setFiltersWrapped] = useState(false)

  useEffect(() => {
    const el = filterRowRef.current
    if (!el) return
    const GAP = 12 // .filter-row gap
    const DIVIDER = 1 // .filter-separator width
    const measure = () => {
      const tabs = el.querySelectorAll<HTMLElement>('.filter-pure-text')
      if (!tabs.length) return
      let needed = 0
      // Sub-pixel widths: offsetWidth rounds down, which made `needed`
      // underestimate the row and fire the wrap detection a frame late.
      tabs.forEach((t) => (needed += t.getBoundingClientRect().width))
      // (n-1) dividers, each flanked by a gap on both sides.
      needed += (tabs.length - 1) * (DIVIDER + GAP * 2)
      // Hide the dividers a couple px BEFORE the true wrap point so they never
      // dangle at a row edge during the transition as the panel narrows.
      setFiltersWrapped(needed > el.clientWidth - 2)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // --- ASYNCHRONNÍ DATA (Gecko/Firefox optimalizace) ---
  // The loaded rows are stored WITH the structure they belong to. Tracking them
  // in separate state let a render see the previous structure's rows while the
  // loading flag was already false — harmless when it only drove the tool list,
  // but the solver now reads this data, so a stale frame would be a wrong combo.
  const [loaded, setLoaded] = useState<{
    structure: StructureName
    rows: RaidItem[]
  } | null>(null)
  const [loadFailed, setLoadFailed] = useState(false)

  useEffect(() => {
    if (!selectedStructure) {
      setLoadFailed(false)
      return
    }

    let isMounted = true
    setLoadFailed(false)

    loadRaidDataForStructure(selectedStructure)
      .then((rows) => {
        if (isMounted) setLoaded({ structure: selectedStructure, rows })
      })
      .catch((error) => {
        console.error('Chyba při načítání dat pro strukturu:', error)
        if (isMounted) setLoadFailed(true)
      })

    return () => {
      isMounted = false
    }
  }, [selectedStructure])

  // Rows are only usable if they are THIS structure's rows.
  const rows =
    loaded && loaded.structure === selectedStructure ? loaded.rows : null
  const isLoadingData = selectedStructure !== null && !rows && !loadFailed

  const sidedRows = useMemo(
    () => (rows ? rowsForQuotedSide(rows) : null),
    [rows]
  )

  // Per-explosive damage for this structure, from the same rows the tool lists
  // render. Explosives with no row for this structure are absent from the map.
  const damageMap = useMemo(
    () => (sidedRows ? buildDamageMap(sidedRows) : null),
    [sidedRows]
  )

  // Selected explosives split by whether this structure's data covers them. The
  // URL keeps every selection (so a shared link survives switching structures and
  // back); only the solver input is narrowed.
  const usableExplosives = useMemo(
    () =>
      EXPLOSIVES.filter(
        (e) => selectedExplosives.has(e.name) && damageMap?.has(e.name)
      ),
    [selectedExplosives, damageMap]
  )
  const ignoredExplosives = useMemo(
    () =>
      damageMap
        ? [...selectedExplosives].filter(
            (name) => !damageMap.has(name as (typeof EXPLOSIVES)[number]['name'])
          )
        : [],
    [selectedExplosives, damageMap]
  )

  const ready = selectedStructure !== null && selectedExplosives.size > 0

  const result = useMemo(() => {
    if (!selectedStructure || !damageMap || usableExplosives.length === 0)
      return null

    const safeCount =
      typeof structureCount === 'number' && structureCount > 0
        ? structureCount
        : 1

    // Raids happen door-by-door: solve the cheapest combo for ONE structure,
    // then scale that combo by the count. This keeps the per-door combo stable
    // regardless of count (20 vs 21 doors) instead of pooling all HP into one
    // giant knapsack.
    const singleHp = STRUCTURES[selectedStructure].hp
    const totalHp = singleHp * safeCount
    const perDoorCombo = bestCombo(
      singleHp,
      damageMap,
      usableExplosives,
      comboMode
    )
    const combo = perDoorCombo.map((c) => ({
      ...c,
      qty: c.qty * safeCount,
      totalSulfur: c.totalSulfur * safeCount,
      totalMetal: c.totalMetal * safeCount,
      totalCharcoal: c.totalCharcoal * safeCount,
    }))

    const totalDmg = combo.reduce(
      (s, c) => s + damageAgainst(c.exp, damageMap) * c.qty,
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
  }, [
    selectedStructure,
    damageMap,
    usableExplosives,
    structureCount,
    discountActive,
    comboMode,
  ])

  // Explosives are always the primary, always-visible path now — no tab gates it.
  // sidedRows already dropped the other face's duplicate rows, so a tool appears
  // once and the quoted numbers match the explosive solver's side.
  const toolGroups = useMemo(() => {
    if (!selectedStructure || !sidedRows) return []

    const safeCount =
      typeof structureCount === 'number' && structureCount > 0
        ? structureCount
        : 1

    return OTHER_METHOD_CATEGORIES.filter((label) => activeFilters.has(label))
      .map((label) => {
        const category = CATEGORY_MAP[label]
        const tools = sidedRows
          .filter((it) => it.category === category)
          .map((it) => ({ ...it, total: it.quantity * safeCount }))
          .sort((a, b) => a.total - b.total)
        return { label, tools }
      })
      .filter((g) => g.tools.length > 0)
  }, [selectedStructure, structureCount, activeFilters, sidedRows])

  const solverShown = ready && !isLoadingData && !loadFailed && result !== null

  useFeatureUsed(
    Feature.raid,
    `${selectedStructure}|${selectedExplosives.size}|${structureCount}|${activeFilters.size}`
  )

  function toggleExplosive(name: string) {
    setQuery((prev) => ({
      e: prev.e.includes(name)
        ? prev.e.filter((x) => x !== name)
        : [...prev.e, name],
    }))
  }

  function toggleFilter(cat: string) {
    setQuery((prev) => ({
      f: prev.f.includes(cat)
        ? prev.f.filter((x) => x !== cat)
        : [...prev.f, cat],
    }))
  }

  return (
    <>
      {/* Left column: Raiding Tools — Explosives is the always-on primary
          path (it's the only thing the solver optimizes); everything else is a
          secondary, non-optimized method tucked behind one disclosure so it
          doesn't compete with Explosives for attention. */}
      <div className="fade-in-container p-[22px] flex flex-col gap-6 overflow-y-auto max-md:p-1.5">
        {/* Target Structure — the full 26-icon grid lives in a popup instead
            of inline, so the page only ever shows the current pick. */}
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="sec-label leading-2 flex-1 mb-0!">TARGET STRUCTURE</div>
            <button
              className="shrink-0 text-[11px] font-bold uppercase tracking-wider text-text-dim hover:text-rust transition-colors cursor-pointer"
              onClick={() => setStructureModalOpen(true)}
            >
              Change Structure
            </button>
          </div>

          {selectedStructure ? (
            <div className="flex items-center gap-6 mt-2 flex-wrap">
              <div className="flex items-center gap-4">
                <img
                  src={STRUCTURES[selectedStructure].img}
                  alt={selectedStructure}
                  className="w-20 h-20 object-contain shrink-0 drop-shadow-[0px_8px_16px_rgba(0,0,0,0.7)]"
                  onError={(e) => (e.currentTarget.style.opacity = '0.3')}
                />
                <div className="flex flex-col gap-2.5">
                  <span className="text-text-bright font-bold font-display uppercase tracking-wide text-base">
                    {selectedStructure}
                  </span>
                  <div className="inline-flex items-center self-start bg-white/2 border border-white/6 rounded-md px-1 py-1 gap-1">
                    <button
                      className="bg-transparent text-[#757575] text-base font-light cursor-pointer flex items-center justify-center w-6 h-6 rounded transition-colors duration-200 select-none hover:text-rust hover:bg-white/5 active:scale-[0.9]"
                      onClick={() =>
                        setStructureCount((c) => Math.max(1, (c ?? 1) - 1))
                      }
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      className="w-8 bg-transparent border-0 text-text-bright text-sm font-bold text-center leading-none outline-none font-display tracking-wider [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0"
                      value={structureCount ?? 1}
                      onChange={(e) => {
                        const val = e.target.value
                        if (val === '') {
                          setStructureCount(null)
                        } else {
                          const parsed = parseInt(val, 10)
                          if (!isNaN(parsed) && parsed > 0) setStructureCount(parsed)
                        }
                      }}
                    />
                    <button
                      className="bg-transparent text-[#757575] text-base font-light cursor-pointer flex items-center justify-center w-6 h-6 rounded transition-colors duration-200 select-none hover:text-rust hover:bg-white/5 active:scale-[0.9]"
                      onClick={() => setStructureCount((c) => (c ?? 1) + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Structural Integrity — same label + sizing as the original
                  Results-column block, just relocated next to the structure
                  so it's visible as soon as a target is picked. Before an
                  explosive is chosen there's no combo yet, so it just shows
                  the full HP pool with an empty bar instead of hiding. */}
              <div className="w-px self-stretch bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.15),transparent)] max-[480px]:hidden" />
              <div className="flex-1 min-w-[220px]">
                <div className="flex gap-2.5 items-baseline mb-2">
                  <span className="text-[42px] font-extrabold text-text-bright leading-none">
                    {(solverShown && result
                      ? Math.round(result.dmgDone)
                      : totalHp
                    ).toLocaleString()}
                  </span>
                  <span className="text-sm text-[#555] font-semibold tracking-[0.02em]">
                    / {totalHp.toLocaleString()} HP
                  </span>
                </div>
                <div
                  className="relative w-full h-0.5 mt-2"
                  style={{ '--hp-pct': `${solverShown && result ? result.pct : 100}%` } as CSSProperties}
                >
                  <div className="absolute top-0 left-0 h-full w-[var(--hp-pct,0%)] bg-[linear-gradient(to_right,#cc422c_0%,#cc422c_20%,transparent_100%)] [transition:width_0.8s_cubic-bezier(0.22,1,0.36,1)] rounded-[2px] z-[2]" />
                  <div className="absolute top-0 left-0 h-full w-[var(--hp-pct,0%)] bg-[linear-gradient(to_right,#cc422c_0%,#cc422c_20%,transparent_100%)] [transition:width_0.8s_cubic-bezier(0.22,1,0.36,1)] blur-[5px] opacity-80 z-[1]" />
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setStructureModalOpen(true)}
              className="w-full mt-3 border border-dashed border-white/10 rounded-xl bg-white/1 flex items-center justify-center gap-2 px-6 py-6 font-display text-sm tracking-[0.15em] text-text-bright/40 uppercase hover:border-rust/30 hover:text-text-bright/60 transition-colors cursor-pointer"
            >
              Select a Target Structure
            </button>
          )}
        </div>

        {/* Structure picker popup — icon + label tiles with the shop-card
            hover "jump" (translate up + icon scale), same motion language
            used on the Shop Calculator's item cards. Portaled to <body>: the
            calculator card's own entrance animation (animate-fade-in-up, via
            animation-fill-mode: forwards) leaves a non-`none` `transform` on
            it forever, which makes it a containing block for `position:
            fixed` — without the portal this popup gets trapped and clipped
            inside the card instead of covering the viewport. */}
        {structureModalOpen &&
          typeof document !== 'undefined' &&
          createPortal(
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300"
              onClick={() => setStructureModalOpen(false)}
            >
              <div
                className="bg-[#151515] border border-white/10 rounded-xl w-full max-w-[760px] max-h-[85vh] shadow-2xl relative flex flex-col animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setStructureModalOpen(false)}
                  className="absolute top-4 right-4 text-text-dim hover:text-text-bright transition-colors cursor-pointer z-10"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>

                <div className="p-6 md:p-8 overflow-y-auto">
                  <h2 className="font-display text-2xl font-bold uppercase text-text-bright tracking-wide mb-6">
                    Select Target Structure
                  </h2>

                  <div className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-3">
                    {visibleStructures.map(([name, data]) => (
                      <button
                        key={name}
                        className={`group/box flex flex-col items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.4)]${selectedStructure === name ? ' bg-[linear-gradient(180deg,rgba(206,66,43,0.12)_0%,rgba(206,66,43,0.01)_100%)] border-rust/40' : ' bg-white/[0.015] border-white/5 hover:bg-white/3 hover:border-white/10'}`}
                        onClick={() => {
                          setSelectedStructure(name)
                          setStructureModalOpen(false)
                        }}
                      >
                        <Img src={data.img} alt={name} className="w-14 h-14 object-contain transition-transform duration-300 group-hover/box:scale-110" />
                        <span className="text-[11px] font-semibold text-text-dim text-center leading-[1.2] uppercase tracking-wider transition-colors duration-300 group-hover/box:text-text-bright">
                          {name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>,
            document.body,
          )}

        <div>
          <div className="sec-label">EXPLOSIVES</div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(95px,1fr))] gap-2.5 mt-1 pt-2 pb-3 pl-1 pr-2 overflow-y-auto [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_96%,rgba(0,0,0,0)_100%)] [-webkit-mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_96%,rgba(0,0,0,0)_100%)] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-white/2 [&::-webkit-scrollbar-track]:rounded [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb:hover]:bg-[#cc422c] max-h-[170px] min-[1025px]:max-h-[380px]">
            {EXPLOSIVES.map((e) => {
              // Disabled, not hidden: hiding would reflow the grid every time
              // the target changes. While data is loading nothing is known yet,
              // so leave everything enabled rather than flickering.
              const noData = damageMap !== null && !damageMap.has(e.name)
              return (
              <button
                key={e.name}
                disabled={noData}
                aria-disabled={noData}
                title={
                  noData
                    ? `No data for ${e.name} on ${selectedStructure}`
                    : undefined
                }
                className={`group/box border border-transparent rounded-lg px-1.5 py-3 flex flex-col items-center gap-2.5 cursor-pointer transition-all duration-250 ease-[cubic-bezier(0.2,0.8,0.2,1)] relative overflow-hidden hover:bg-white/3 hover:border-white/10 hover:-translate-y-0.5 hover:shadow-[0_6px_12px_rgba(0,0,0,0.4)]${selectedExplosives.has(e.name) ? ' active bg-[linear-gradient(180deg,rgba(206,66,43,0.12)_0%,rgba(206,66,43,0.01)_100%)] border-[rgba(206,66,43,0.4)] shadow-[0_8px_24px_rgba(206,66,43,0.15),inset_0_1px_0_rgba(206,66,43,0.2)] -translate-y-0.5' : ''}${noData ? ' opacity-30 cursor-not-allowed pointer-events-none grayscale' : ''}`}
                onClick={() => toggleExplosive(e.name)}
              >
                <Img src={e.img} alt={e.name} className="w-[50px] h-[50px] object-contain transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover/box:scale-[1.08] group-[.active]/box:scale-[1.15]" />
                <span className="text-[11px] font-semibold text-[#888] uppercase text-center leading-[1.2] tracking-wider transition-[color] duration-[250ms] group-hover/box:text-[#ccc] group-[.active]/box:text-text-bright group-[.active]/box:[text-shadow:0_0_8px_rgba(206,66,43,0.4)]">{e.short}</span>
              </button>
              )
            })}
          </div>

          {/* Other Methods — stands in for the 5 non-explosive categories,
              since none of them go through the solver: they're just a
              quantity + time lookup, not a comparable "combo". Always
              visible, styled like the other sections' headings. */}
          <div className="sec-label mt-6">Other Methods</div>

          <div>
            {/* Sub-category tabs with fade separators */}
              <div
                ref={filterRowRef}
                className={`group/filters flex items-center [justify-content:safe_center] flex-wrap gap-3 mb-4 border-b border-white/5 pb-2 w-full${filtersWrapped ? ' is-wrapped' : ''}`}
              >
                {OTHER_METHOD_CATEGORIES.map((cat, idx) => (
                  <Fragment key={cat}>
                    <button
                      className={`bg-transparent border-0 pb-1.5 text-text-dim text-sm font-semibold font-display uppercase tracking-[0.15em] cursor-pointer transition-[color] duration-300 relative outline-none whitespace-nowrap shrink-0 hover:text-[#c4c4c4] after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:bg-[linear-gradient(90deg,transparent_0%,var(--rust)_15%,var(--rust)_85%,transparent_100%)] after:transition-[width] after:duration-300 after:rounded-[2px] ${activeFilters.has(cat) ? 'text-text-bright after:w-full' : 'after:w-0'}`}
                      onClick={() => toggleFilter(cat)}
                    >
                      {cat}
                    </button>
                    {/* Separator between tabs, not after the last */}
                    {idx < OTHER_METHOD_CATEGORIES.length - 1 && (
                      <div className="w-px h-3 bg-[linear-gradient(to_bottom,transparent,#4a4a4a,transparent)] shrink-0 group-[.is-wrapped]/filters:hidden" />
                    )}
                  </Fragment>
                ))}
              </div>

              {isLoadingData ? (
                <div className="w-full h-[100px] border border-dashed border-white/10 rounded-xl bg-white/1 flex items-center justify-center font-display text-sm tracking-[0.15em] text-text-bright/30 uppercase text-center shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] opacity-50 py-4 text-xs">
                  LOADING DATA...
                </div>
              ) : (
                toolGroups.length === 0 && (
                  <div className="w-full h-[100px] border border-dashed border-white/10 rounded-xl bg-white/1 flex items-center justify-center font-display text-sm tracking-[0.15em] text-text-bright/30 uppercase text-center shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] opacity-50 py-4 text-xs">
                    {!selectedStructure
                      ? 'SELECT A TARGET FIRST'
                      : activeFilters.size === 0
                        ? 'PICK A CATEGORY ABOVE'
                        : 'NO TOOLS IN THE SELECTED CATEGORIES'}
                  </div>
                )
              )}

              {toolGroups.length > 0 && !isLoadingData && (
                <div className="max-h-[230px] overflow-y-auto pr-2 [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_96%,rgba(0,0,0,0)_100%)] [-webkit-mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_96%,rgba(0,0,0,0)_100%)] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-white/2 [&::-webkit-scrollbar-track]:rounded [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb:hover]:bg-[#cc422c] min-[1025px]:max-h-[380px]">
                  {toolGroups.map((group) => (
                    <div key={group.label} className="mb-[18px] last:mb-0">
                      <div className="text-[10px] font-bold text-[#757575] uppercase tracking-[0.08em] pb-1.5 mb-1.5 border-b border-white/5">
                        {group.label.toUpperCase()}
                      </div>
                      {group.tools.map((tool) => (
                        <div className="flex items-center gap-3 px-1 py-[7px] border-b border-white/3 transition-[background] duration-200 hover:bg-white/2" key={tool.name}>
                          <span className="flex-1 min-w-0 text-[#a5b4c0] text-xs font-semibold tracking-[0.02em]">{tool.name}</span>
                          <span className="shrink-0 text-[#757575] text-[11px] font-semibold tabular-nums whitespace-nowrap">{tool.time}</span>
                          <span className="shrink-0 text-[#cc422c] text-[15px] font-extrabold tabular-nums min-w-12 text-right">
                            {tool.total.toLocaleString()}
                            <span className="text-[11px] ml-0.5">x</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
          </div>
        </div>
      </div>

      <div className="fade-in-container p-[22px] flex flex-col gap-6 overflow-y-auto max-md:p-1.5">
        {/* Same box in every state so the panel never changes height mid-load. */}
        {!solverShown ? (
          <div className="h-full flex items-center justify-center flex-col gap-2.5 font-display text-base font-normal tracking-[0.15em] text-text-muted uppercase text-center leading-[1.9] min-h-[340px] border border-border bg-black/25 relative overflow-hidden">
            {loadFailed ? (
              <>
                <span className="text-rust text-[28px] leading-none">⚠</span>
                RAID DATA UNAVAILABLE
                <br />
                FOR THIS STRUCTURE
              </>
            ) : ready && isLoadingData ? (
              <>
                <span className="text-rust text-[28px] leading-none animate-pulse">
                  ◈
                </span>
                CALCULATING…
              </>
            ) : ready && usableExplosives.length === 0 ? (
              <>
                <span className="text-rust text-[28px] leading-none">◈</span>
                NO DATA FOR THE SELECTED
                <br />
                EXPLOSIVES ON THIS TARGET
              </>
            ) : (
              <>
                <span className="text-rust text-[28px] leading-none">◈</span>
                SELECT A TARGET
                <br />
                AND AT LEAST ONE
                <br />
                EXPLOSIVE TO PROCEED
              </>
            )}
          </div>
        ) : (
          <div className="fade-in-container flex flex-col gap-5">
            {solverShown && result && (
              <>
                {/* An explosive with no row for this structure is dropped from the
                    combo. Say so — silently excluding it is just another way to
                    show a number that doesn't add up. */}
                {ignoredExplosives.length > 0 && (
                  <div className="font-display text-[11px] font-normal tracking-widest text-text-muted border border-border bg-black/20 px-3 py-2 text-center uppercase leading-[1.6]">
                    NO DATA FOR {ignoredExplosives.join(', ')} ON{' '}
                    {selectedStructure} — EXCLUDED
                  </div>
                )}

                {/* Structural Integrity's HP readout now lives up in the
                    Target Structure row, next to the structure image — this
                    is just the combo-optimisation switch. */}
                <div>
                  <div className="sec-label mb-3">OPTIMIZATION MODE</div>
                  <div className="flex items-center justify-center flex-wrap gap-x-6 gap-y-3">
                    {/* Optimisation mode: cheapest sulfur vs fewest explosives */}
                    <div
                      className={`group/sw flex items-center gap-2.5${comboMode === 'fastest' ? ' active' : ''}`}
                    >
                      <span className={`text-[11px] font-bold tracking-wider transition-[color] duration-200 ${comboMode === 'cheapest' ? 'text-[#cc422c]' : 'text-[#757575]'}`}>
                        CHEAPEST
                      </span>
                      <div
                        className="relative w-9 h-5 bg-[#121212] border border-white/10 rounded-[10px] cursor-pointer shrink-0 transition-all duration-300 group-[.active]/sw:border-[rgba(204,66,44,0.5)]"
                        onClick={() =>
                          setQuery({
                            m: comboMode === 'cheapest' ? 'fastest' : 'cheapest',
                          })
                        }
                      >
                        <div className="absolute w-3 h-3 bg-[#555] rounded-full top-[3px] left-[3px] [transition:all_0.3s_cubic-bezier(0.4,0,0.2,1)] group-[.active]/sw:bg-[#cc422c] group-[.active]/sw:left-[19px]" />
                      </div>
                      <span className={`text-[11px] font-bold tracking-wider transition-[color] duration-200 ${comboMode === 'fastest' ? 'text-[#cc422c]' : 'text-[#757575]'}`}>
                        FASTEST
                      </span>
                    </div>

                    <div className="w-px h-4 bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.15),transparent)] shrink-0" />

                    {/* Crafting method toggle — same switch pattern as CHEAPEST/FASTEST.
                        Workbench and Mixing Table give the same charcoal discount, so
                        this is just "no bench" vs "bench", not a choice between the two. */}
                    <div
                      className={`group/sw flex items-center gap-2.5${discountActive ? ' active' : ''}`}
                    >
                      <span className={`text-[11px] font-bold tracking-wider transition-[color] duration-200 ${!discountActive ? 'text-[#cc422c]' : 'text-[#757575]'}`}>
                        NO BENCH
                      </span>
                      <div
                        className="relative w-9 h-5 bg-[#121212] border border-white/10 rounded-[10px] cursor-pointer shrink-0 transition-all duration-300 group-[.active]/sw:border-[rgba(204,66,44,0.5)]"
                        onClick={() => setQuery({ d: !discountActive })}
                      >
                        <div className="absolute w-3 h-3 bg-[#555] rounded-full top-[3px] left-[3px] [transition:all_0.3s_cubic-bezier(0.4,0,0.2,1)] group-[.active]/sw:bg-[#cc422c] group-[.active]/sw:left-[19px]" />
                      </div>
                      <span className={`text-[11px] font-bold tracking-wider transition-[color] duration-200 ${discountActive ? 'text-[#cc422c]' : 'text-[#757575]'}`}>
                        WORKBENCH / TABLE
                      </span>
                    </div>
                  </div>
                </div>

                {/* Explosives needed for the raid, with their sulfur/metal/coal
                    cost — heading moved up here (was above the totals card
                    below) since this list is the "how many do I need" answer. */}
                <div className="sec-label mb-3 mt-2">
                  EXPLOSIVES NEEDED FOR THIS RAID
                </div>
                <div className="@container">
                  {result.combo.length === 0 ? (
                    <div className="font-display text-xs font-normal tracking-[0.12em] text-text-muted border border-border bg-black/20 p-4 text-center leading-[1.8] uppercase">
                      NO COMBINATION FOUND
                    </div>
                  ) : (
                    result.combo.map((c) => (
                      <div className="flex items-center px-1 py-3 mb-4 last:mb-0 @max-[520px]:flex-wrap" key={c.exp.name}>
                        {/* Explosive icon */}
                        <Img
                          src={c.exp.img}
                          alt={c.exp.name}
                          className="w-10 h-10 object-contain shrink-0"
                        />

                        {/* Name + qty needed — same top/bottom layout as Target Structure */}
                        <div className="flex flex-col gap-0.5 flex-1 min-w-0 ml-4">
                          <span className="text-text-bright font-bold tracking-[0.02em] uppercase">{c.exp.name}</span>
                          <span className="text-[#cc422c] font-extrabold text-lg leading-none">
                            {c.qty}
                            <span className="text-sm ml-1 text-[#cc422c]">x</span>
                          </span>
                        </div>

                        {/* Separator */}
                        <div className="w-px h-9 bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.15),transparent)] mx-5 shrink-0 @max-[520px]:hidden" />

                        {/* Resources */}
                        <div className="flex items-start flex-wrap justify-end gap-x-4 gap-y-1.5 min-w-0 shrink-0 ml-auto @max-[520px]:basis-full @max-[520px]:mt-2.5">
                          {c.totalSulfur > 0 && (
                            <div className="flex flex-col items-center gap-1">
                              <Img src={RESOURCE_ICONS.sulfur} alt="Sulfur" className="w-6 h-6" />
                              <span className="font-bold text-[15px] text-text-bright">
                                {c.totalSulfur.toLocaleString()}
                              </span>
                            </div>
                          )}
                          {c.totalMetal > 0 && (
                            <div className="flex flex-col items-center gap-1">
                              <Img src={RESOURCE_ICONS.metal} alt="Metal" className="w-6 h-6" />
                              <span className="font-bold text-[15px] text-text-bright">
                                {c.totalMetal.toLocaleString()}
                              </span>
                            </div>
                          )}
                          {c.totalCharcoal > 0 && (
                            <div className="flex flex-col items-center gap-1">
                              <Img src={RESOURCE_ICONS.coal} alt="Coal" className="w-6 h-6" />
                              <span className="font-bold text-[15px] text-text-bright">
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

                {/* --- UNIFIED TOTAL RESOURCES & CRAFTING METHOD ---
                    The actual takeaway of the whole calculator — what to go
                    craft — so it's visually the heaviest card on the page,
                    not just another row under the per-explosive breakdown. */}
                <div>
                  <div className="sec-label mb-3 mt-2">TOTAL RESOURCES NEEDED</div>

                  <div className="flex items-center justify-center py-2 mb-4 last:mb-0 flex-wrap gap-x-6 gap-y-3">
                    {/* Resources */}
                    <div className="flex gap-x-4 gap-y-2 items-center flex-wrap min-w-0">
                      {/* Sulfur */}
                      <div className="flex items-center gap-2">
                        <Img src={RESOURCE_ICONS.sulfur} alt="Sulfur" className="w-[22px] h-[22px] shrink-0" />
                        <div className="flex flex-col">
                          <span className="text-xl font-extrabold leading-none whitespace-nowrap text-text-bright">
                            {result.totalSulfur.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-[#8b8c89] font-bold tracking-wider mt-0.5 whitespace-nowrap">SULFUR</span>
                        </div>
                      </div>

                      {/* Metal */}
                      <div className="flex items-center gap-2">
                        <Img src={RESOURCE_ICONS.metal} alt="Metal" className="w-[22px] h-[22px] shrink-0" />
                        <div className="flex flex-col">
                          <span className="text-xl font-extrabold leading-none whitespace-nowrap text-text-bright">
                            {result.totalMetal.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-[#8b8c89] font-bold tracking-wider mt-0.5 whitespace-nowrap">METAL</span>
                        </div>
                      </div>

                      {/* Coal */}
                      <div className="flex items-center gap-2">
                        <Img src={RESOURCE_ICONS.coal} alt="Coal" className="w-[22px] h-[22px] shrink-0" />
                        <div className="flex flex-col">
                          <span className="text-xl font-extrabold leading-none whitespace-nowrap text-text-bright">
                            {result.totalCharcoal.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-[#8b8c89] font-bold tracking-wider mt-0.5 whitespace-nowrap">COAL</span>
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
    </>
  )
}