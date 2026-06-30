'use client'

import { useMemo, useState, useEffect, useRef, Fragment } from 'react'
import type { CSSProperties } from 'react'
import {
  useQueryStates,
  parseAsString,
  parseAsInteger,
  parseAsBoolean,
  parseAsStringLiteral,
  parseAsArrayOf,
} from 'nuqs'
import { CalcShell } from './CalcShell'
import { Img } from './Img'
import {
  EXPLOSIVES,
  loadRaidDataForStructure, // Původní RAID_DATA nahrazeno asynchronním getterem
  RESOURCE_ICONS,
  STRUCTURES,
} from '../lib/data/raid-data'
import {
  bestCombo,
  comboTotal,
  damageAgainst,
  type ComboMode,
} from '../lib/raid-solver'
import { Feature, useFeatureUsed } from '../lib/analytics'
import type { RaidCategory, RaidItem } from '../lib/types'

// Filtr -> kategorie v dynamických datech. 'Explosive' řeší vlastní solver (bestCombo),
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

const COMBO_MODES = ['cheapest', 'fastest'] as const

export function RaidCalculator() {
  // The whole raid setup lives in the URL so a combo can be shared with a link:
  //   ?s=Sheet+Metal+Door&e=C4,Rocket&n=20&d=true&m=fastest&f=Explosive,Melee
  // Sets/structure are stored as plain arrays/strings here and sanitised against
  // the known data below, so a hand-edited URL can never inject invalid state.
  const [query, setQuery] = useQueryStates(
    {
      s: parseAsString,
      e: parseAsArrayOf(parseAsString).withDefault([]),
      n: parseAsInteger,
      d: parseAsBoolean.withDefault(false),
      m: parseAsStringLiteral(COMBO_MODES).withDefault('cheapest'),
      f: parseAsArrayOf(parseAsString).withDefault(['Explosive']),
    },
    { history: 'replace' },
  )

  const selectedStructure = query.s && STRUCTURES[query.s] ? query.s : null
  const structureCount = query.n
  const discountActive = query.d
  const comboMode: ComboMode = query.m

  const selectedExplosives = useMemo(
    () => new Set(query.e.filter((name) => EXPLOSIVES.some((x) => x.name === name))),
    [query.e],
  )
  const activeFilters = useMemo(
    () => new Set(query.f.filter((c) => FILTER_CATEGORIES.includes(c))),
    [query.f],
  )

  const setSelectedStructure = (name: string) => setQuery({ s: name })
  const setStructureCount = (
    n: number | null | ((prev: number | null) => number | null),
  ) => setQuery((prev) => ({ n: typeof n === 'function' ? n(prev.n) : n }))

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

  // --- NOVÉ STAVY PRO ASYNCHRONNÍ DATA (Gecko/Firefox optimalizace) ---
  const [currentRaidData, setCurrentRaidData] = useState<RaidItem[]>([])
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false)

  // --- EFEKT PRO NAČÍTÁNÍ DATOVÝCH CHUNKŮ ---
  useEffect(() => {
    if (!selectedStructure) {
      setCurrentRaidData([])
      return
    }

    let isMounted = true
    setIsLoadingData(true)

    loadRaidDataForStructure(selectedStructure)
      .then((data) => {
        if (isMounted) {
          setCurrentRaidData(data)
          setIsLoadingData(false)
        }
      })
      .catch((error) => {
        console.error('Chyba při načítání dat pro strukturu:', error)
        if (isMounted) {
          setCurrentRaidData([])
          setIsLoadingData(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [selectedStructure])

  const ready = selectedStructure !== null && selectedExplosives.size > 0

  const result = useMemo(() => {
    if (!selectedStructure || selectedExplosives.size === 0) return null

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
    const exps = EXPLOSIVES.filter((e) => selectedExplosives.has(e.name))
    const perDoorCombo = bestCombo(singleHp, selectedStructure, exps, comboMode)
    const combo = perDoorCombo.map((c) => ({
      ...c,
      qty: c.qty * safeCount,
      totalSulfur: c.totalSulfur * safeCount,
      totalMetal: c.totalMetal * safeCount,
      totalCharcoal: c.totalCharcoal * safeCount,
    }))

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
  }, [
    selectedStructure,
    selectedExplosives,
    structureCount,
    discountActive,
    comboMode,
  ])

  const explosiveActive = activeFilters.has('Explosive')

  // Využití dynamicky načtených 'currentRaidData' místo monolitického objektu RAID_DATA
  const toolGroups = useMemo(() => {
    if (!selectedStructure || currentRaidData.length === 0) return []

    const safeCount =
      typeof structureCount === 'number' && structureCount > 0
        ? structureCount
        : 1

    return FILTER_CATEGORIES.filter(
      (label) => label !== 'Explosive' && activeFilters.has(label)
    )
      .map((label) => {
        const category = CATEGORY_MAP[label]
        const tools = currentRaidData
          .filter((it) => it.category === category)
          .map((it) => ({ ...it, total: it.quantity * safeCount }))
          .sort((a, b) => a.total - b.total)
        return { label, tools }
      })
      .filter((g) => g.tools.length > 0)
  }, [selectedStructure, structureCount, activeFilters, currentRaidData])

  const solverShown = explosiveActive && ready && result !== null

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
      <div className="fade-in-container p-[22px] flex flex-col gap-6 overflow-y-auto max-md:p-1.5 max-[1024px]:border-r-0 max-[1024px]:border-b max-[1024px]:border-border-2 max-[1024px]:overflow-y-visible min-[1025px]:max-[1280px]:border-b min-[1025px]:max-[1280px]:overflow-y-visible border-r border-border-2 max-[1024px]:order-1 min-[1025px]:max-[1280px]:order-1 min-[1025px]:max-[1280px]:border-r">
        {/* Section 1: Target Structure */}
        <div className="min-h-72">
          <div className="sec-label leading-2">TARGET STRUCTURE</div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(95px,1fr))] gap-2.5 mt-1 pt-2 pb-3 pl-1 pr-2 overflow-y-auto [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_96%,rgba(0,0,0,0)_100%)] [-webkit-mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_96%,rgba(0,0,0,0)_100%)] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-white/2 [&::-webkit-scrollbar-track]:rounded [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb:hover]:bg-[#cc422c] max-h-[280px] min-[1025px]:max-h-[440px]">
            {Object.entries(STRUCTURES).map(([name, data]) => (
              <button
                key={name}
                className={`group/box bg-white/1.5 border border-white/4 rounded-lg px-1.5 py-3 flex flex-col items-center gap-2.5 cursor-pointer transition-all duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] relative overflow-hidden hover:bg-white/3 hover:border-white/10 hover:-translate-y-0.5 hover:shadow-[0_6px_12px_rgba(0,0,0,0.4)]${selectedStructure === name ? ' active bg-[linear-gradient(180deg,rgba(206,66,43,0.12)_0%,rgba(206,66,43,0.01)_100%)] border-[rgba(206,66,43,0.4)] shadow-[0_8px_24px_rgba(206,66,43,0.15),inset_0_1px_0_rgba(206,66,43,0.2)] -translate-y-0.5' : ''}`}
                onClick={() => setSelectedStructure(name)}
              >
                <Img src={data.img} alt={name} className="w-[50px] h-[50px] object-contain [filter:drop-shadow(0_4px_6px_rgba(0,0,0,0.4))_grayscale(40%)_opacity(0.7)] transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover/box:[filter:drop-shadow(0_6px_8px_rgba(0,0,0,0.6))_grayscale(0%)_opacity(1)] group-hover/box:scale-[1.08] group-[.active]/box:[filter:drop-shadow(0_8px_16px_rgba(206,66,43,0.4))_grayscale(0%)_opacity(1)] group-[.active]/box:scale-[1.15]" />
                <span className="text-[11px] font-semibold text-[#888] uppercase text-center leading-[1.2] tracking-wider transition-[color] duration-[250ms] group-hover/box:text-[#ccc] group-[.active]/box:text-white group-[.active]/box:[text-shadow:0_0_8px_rgba(206,66,43,0.4)]">{name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Section 2: floating structure preview + counter */}
        <div className="h-[170px] flex flex-col items-center justify-center mb-2 gap-3">
          {selectedStructure ? (
            <>
              <img
                src={STRUCTURES[selectedStructure].img}
                alt={selectedStructure}
                className="max-h-[120px] max-w-[80%] object-contain drop-shadow-[0px_12px_24px_rgba(0,0,0,0.8)] transition-all duration-300 animate-[popInStructure_0.4s_cubic-bezier(0.2,0.8,0.2,1)_backwards]"
                onError={(e) => (e.currentTarget.style.opacity = '0.3')}
              />
              <div className="inline-flex items-center bg-transparent p-0">
                <button
                  className="bg-transparent text-[#757575] text-[22px] font-light cursor-pointer flex items-center justify-center w-8 h-8 transition-[color,transform] duration-200 select-none will-change-transform hover:text-rust hover:scale-[1.2] active:scale-[0.85] active:duration-[50ms]"
                  onClick={() =>
                    setStructureCount((c) => Math.max(1, (c ?? 1) - 1))
                  }
                >
                  −
                </button>
                <div className="w-px h-6 bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.15),transparent)] mx-1" />
                <input
                  type="number"
                  min="1"
                  className="w-11 bg-transparent border-0 text-white text-xl font-bold text-center outline-none font-display tracking-wider [text-shadow:0_2px_8px_rgba(0,0,0,0.8)] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0"
                  value={structureCount ?? 1}
                  onChange={(e) => {
                    const val = e.target.value
                    if (val === '') {
                      setStructureCount(null)
                    } else {
                      const parsed = parseInt(val, 10)
                      if (!isNaN(parsed) && parsed > 0)
                        setStructureCount(parsed)
                    }
                  }}
                />
                <div className="w-px h-6 bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.15),transparent)] mx-1" />
                <button
                  className="bg-transparent text-[#757575] text-[22px] font-light cursor-pointer flex items-center justify-center w-8 h-8 transition-[color,transform] duration-200 select-none will-change-transform hover:text-rust hover:scale-[1.2] active:scale-[0.85] active:duration-[50ms]"
                  onClick={() => setStructureCount((c) => (c ?? 1) + 1)}
                >
                  +
                </button>
              </div>
            </>
          ) : (
            <div className="w-full h-[150px] border border-dashed border-white/10 rounded-xl bg-white/1 flex items-center justify-center font-display text-sm tracking-[0.15em] text-white/30 uppercase text-center shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] opacity-50">
              NO STRUCTURE SELECTED
            </div>
          )}
        </div>
      </div>

      {/* Column 2: Raiding Tools (filters, explosives grid, tool list) */}
      <div className="fade-in-container p-[22px] flex flex-col gap-6 overflow-y-auto max-md:p-1.5 max-[1024px]:border-r-0 max-[1024px]:border-b max-[1024px]:border-border-2 max-[1024px]:overflow-y-visible min-[1025px]:max-[1280px]:border-b min-[1025px]:max-[1280px]:overflow-y-visible border-r border-border-2 max-[1024px]:order-3 min-[1025px]:max-[1280px]:order-2 min-[1025px]:max-[1280px]:border-r-0">
        <div>
          <div className="sec-label">RAIDING TOOLS</div>

          {/* Category tabs with fade separators */}
          <div
            ref={filterRowRef}
            className={`group/filters flex items-center [justify-content:safe_center] flex-wrap gap-3 mb-6 border-b border-white/5 pb-2 w-full${filtersWrapped ? ' is-wrapped' : ''}`}
          >
            {FILTER_CATEGORIES.map((cat, idx) => (
              <Fragment key={cat}>
                <button
                  className={`bg-transparent border-0 pb-1.5 text-text-dim text-base font-semibold font-display uppercase tracking-[0.15em] cursor-pointer transition-[color] duration-300 relative outline-none whitespace-nowrap shrink-0 hover:text-[#c4c4c4] after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:bg-[linear-gradient(90deg,transparent_0%,var(--rust)_15%,var(--rust)_85%,transparent_100%)] after:transition-[width] after:duration-300 after:rounded-[2px] ${activeFilters.has(cat) ? 'text-white after:w-full' : 'after:w-0'}`}
                  onClick={() => toggleFilter(cat)}
                >
                  {cat}
                </button>
                {/* Separator between tabs, not after the last */}
                {idx < FILTER_CATEGORIES.length - 1 && (
                  <div className="w-px h-3 bg-[linear-gradient(to_bottom,transparent,#4a4a4a,transparent)] shrink-0 group-[.is-wrapped]/filters:hidden" />
                )}
              </Fragment>
            ))}
          </div>

          {explosiveActive && (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(95px,1fr))] gap-2.5 mt-1 pt-2 pb-3 pl-1 pr-2 overflow-y-auto [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_96%,rgba(0,0,0,0)_100%)] [-webkit-mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_96%,rgba(0,0,0,0)_100%)] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-white/2 [&::-webkit-scrollbar-track]:rounded [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb:hover]:bg-[#cc422c] max-h-[170px] min-[1025px]:max-h-[380px]">
              {EXPLOSIVES.map((e) => (
                <button
                  key={e.name}
                  className={`group/box bg-white/1.5 border border-white/4 rounded-lg px-1.5 py-3 flex flex-col items-center gap-2.5 cursor-pointer transition-all duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] relative overflow-hidden hover:bg-white/3 hover:border-white/10 hover:-translate-y-0.5 hover:shadow-[0_6px_12px_rgba(0,0,0,0.4)]${selectedExplosives.has(e.name) ? ' active bg-[linear-gradient(180deg,rgba(206,66,43,0.12)_0%,rgba(206,66,43,0.01)_100%)] border-[rgba(206,66,43,0.4)] shadow-[0_8px_24px_rgba(206,66,43,0.15),inset_0_1px_0_rgba(206,66,43,0.2)] -translate-y-0.5' : ''}`}
                  onClick={() => toggleExplosive(e.name)}
                >
                  <Img src={e.img} alt={e.name} className="w-[50px] h-[50px] object-contain [filter:drop-shadow(0_4px_6px_rgba(0,0,0,0.4))_grayscale(40%)_opacity(0.7)] transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover/box:[filter:drop-shadow(0_6px_8px_rgba(0,0,0,0.6))_grayscale(0%)_opacity(1)] group-hover/box:scale-[1.08] group-[.active]/box:[filter:drop-shadow(0_8px_16px_rgba(206,66,43,0.4))_grayscale(0%)_opacity(1)] group-[.active]/box:scale-[1.15]" />
                  <span className="text-[11px] font-semibold text-[#888] uppercase text-center leading-[1.2] tracking-wider transition-[color] duration-[250ms] group-hover/box:text-[#ccc] group-[.active]/box:text-white group-[.active]/box:[text-shadow:0_0_8px_rgba(206,66,43,0.4)]">{e.short}</span>
                </button>
              ))}
            </div>
          )}

          {isLoadingData ? (
            <div className="w-full h-[150px] border border-dashed border-white/10 rounded-xl bg-white/1 flex items-center justify-center font-display text-sm tracking-[0.15em] text-white/30 uppercase text-center shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] opacity-50 py-4 text-xs">
              LOADING DATA...
            </div>
          ) : (
            !explosiveActive &&
            toolGroups.length === 0 && (
              <div className="w-full h-[150px] border border-dashed border-white/10 rounded-xl bg-white/1 flex items-center justify-center font-display text-sm tracking-[0.15em] text-white/30 uppercase text-center shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] opacity-50 py-4 text-xs">
                {selectedStructure
                  ? 'NO TOOLS IN THE SELECTED CATEGORIES'
                  : 'SELECT A TARGET AND A RAIDING TOOL CATEGORY'}
              </div>
            )
          )}

          {toolGroups.length > 0 && !isLoadingData && (
            <div className="mt-3 max-h-[230px] overflow-y-auto pr-2 [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_96%,rgba(0,0,0,0)_100%)] [-webkit-mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_96%,rgba(0,0,0,0)_100%)] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-white/2 [&::-webkit-scrollbar-track]:rounded [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb:hover]:bg-[#cc422c] min-[1025px]:max-h-[440px]">
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

      <div className="fade-in-container p-[22px] flex flex-col gap-6 overflow-y-auto max-md:p-1.5 max-[1024px]:border-r-0 max-[1024px]:border-b max-[1024px]:border-border-2 max-[1024px]:overflow-y-visible min-[1025px]:max-[1280px]:border-b min-[1025px]:max-[1280px]:overflow-y-visible max-[1024px]:order-2 min-[1025px]:max-[1280px]:order-3 min-[1025px]:max-[1280px]:col-span-2">
        {!solverShown ? (
          <div className="h-full flex items-center justify-center flex-col gap-2.5 font-display text-base font-normal tracking-[0.15em] text-text-muted uppercase text-center leading-[1.9] min-h-[340px] border border-border bg-black/25 relative overflow-hidden">
            <span className="text-rust text-[28px] leading-none">◈</span>
            SELECT A TARGET
            <br />
            AND AT LEAST ONE
            <br />
            EXPLOSIVE TO PROCEED
          </div>
        ) : (
          <div className="fade-in-container flex flex-col gap-5">
            {solverShown && result && (
              <>
                {/* Integrity */}
                <div>
                  <div className="sec-label">STRUCTURAL INTEGRITY</div>
                  <div className="flex gap-2.5 items-baseline mt-4 mb-2">
                    <span className="text-[42px] font-extrabold text-white leading-none">
                      {Math.round(result.dmgDone).toLocaleString()}
                    </span>
                    <span className="text-sm text-[#555] font-semibold tracking-[0.02em]">
                      / {result.totalHp.toLocaleString()} HP
                    </span>
                  </div>
                  <div
                    className="relative w-full h-0.5 mt-2"
                    style={{ '--hp-pct': `${result.pct}%` } as CSSProperties}
                  >
                    <div className="absolute top-0 left-0 h-full w-[var(--hp-pct,0%)] bg-[linear-gradient(to_right,#cc422c_0%,#cc422c_20%,transparent_100%)] [transition:width_0.8s_cubic-bezier(0.22,1,0.36,1)] rounded-[2px] z-[2]" />
                    <div className="absolute top-0 left-0 h-full w-[var(--hp-pct,0%)] bg-[linear-gradient(to_right,#cc422c_0%,#cc422c_20%,transparent_100%)] [transition:width_0.8s_cubic-bezier(0.22,1,0.36,1)] blur-[5px] opacity-80 z-[1]" />
                  </div>

                  {/* Optimisation mode: cheapest sulfur vs fewest explosives */}
                  <div
                    className={`group/sw flex items-center gap-2.5 justify-center mt-3.5${comboMode === 'fastest' ? ' active' : ''}`}
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
                </div>

                {/* Cheapest Combo */}
                <div>
                  {result.combo.length === 0 ? (
                    <div className="font-display text-xs font-normal tracking-[0.12em] text-text-muted border border-border bg-black/20 p-4 text-center leading-[1.8] uppercase">
                      NO COMBINATION FOUND
                    </div>
                  ) : (
                    result.combo.map((c) => (
                      <div className="flex items-center bg-white/2 border border-white/6 rounded-md px-4 py-3 mb-4 transition-[background,border-color] duration-200 hover:bg-white/4 hover:border-white/10 last:mb-0 max-[432px]:flex-wrap" key={c.exp.name}>
                        {/* Explosive icon */}
                        <Img
                          src={c.exp.img}
                          alt={c.exp.name}
                          className="w-10 h-10 object-contain shrink-0"
                        />

                        {/* Qty + name */}
                        <div className="flex flex-col gap-0.5 flex-1 ml-4">
                          <span className="text-[#cc422c] font-extrabold text-lg leading-none">
                            {c.qty}
                            <span className="text-sm ml-1 text-[#cc422c]">x</span>
                          </span>
                          <span className="text-[#e0e0e0] text-[13px] font-bold tracking-[0.02em] uppercase">{c.exp.name}</span>
                        </div>

                        {/* Separator */}
                        <div className="w-px h-9 bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.15),transparent)] mx-5 shrink-0 max-[432px]:hidden" />

                        {/* Resources */}
                        <div className="flex items-center gap-4 shrink-0 max-[432px]:basis-full max-[432px]:flex-wrap max-[432px]:justify-start max-[432px]:gap-x-4 max-[432px]:gap-y-1.5 max-[432px]:mt-2.5">
                          {c.totalSulfur > 0 && (
                            <div className="flex items-center gap-1.5">
                              <Img src={RESOURCE_ICONS.sulfur} alt="Sulfur" className="w-4 h-4" />
                              <span className="font-bold text-[15px] text-[#cc422c]">
                                {c.totalSulfur.toLocaleString()}
                              </span>
                            </div>
                          )}
                          {c.totalMetal > 0 && (
                            <div className="flex items-center gap-1.5">
                              <Img src={RESOURCE_ICONS.metal} alt="Metal" className="w-4 h-4" />
                              <span className="font-bold text-[15px] text-[#a5b4c0]">
                                {c.totalMetal.toLocaleString()}
                              </span>
                            </div>
                          )}
                          {c.totalCharcoal > 0 && (
                            <div className="flex items-center gap-1.5">
                              <Img src={RESOURCE_ICONS.coal} alt="Coal" className="w-4 h-4" />
                              <span className="font-bold text-[15px] text-[#8b8c89]">
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

                  <div className="flex items-center bg-white/2 border border-white/6 rounded-md px-4 py-3 mb-4 transition-[background,border-color] duration-200 hover:bg-white/4 hover:border-white/10 last:mb-0 max-[432px]:flex-wrap justify-between px-5 py-4 flex-wrap gap-3">
                    {/* Resources */}
                    <div className="flex gap-4 items-center flex-nowrap">
                      {/* Sulfur */}
                      <div className="flex items-center gap-2">
                        <Img src={RESOURCE_ICONS.sulfur} alt="Sulfur" className="w-[22px] h-[22px] shrink-0" />
                        <div className="flex flex-col">
                          <span className="text-xl font-extrabold leading-none whitespace-nowrap text-[#cc422c]">
                            {result.totalSulfur.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-[#8b8c89] font-bold tracking-wider mt-0.5 whitespace-nowrap">SULFUR</span>
                        </div>
                      </div>

                      {/* Metal */}
                      <div className="flex items-center gap-2">
                        <Img src={RESOURCE_ICONS.metal} alt="Metal" className="w-[22px] h-[22px] shrink-0" />
                        <div className="flex flex-col">
                          <span className="text-xl font-extrabold leading-none whitespace-nowrap text-[#a5b4c0]">
                            {result.totalMetal.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-[#8b8c89] font-bold tracking-wider mt-0.5 whitespace-nowrap">METAL</span>
                        </div>
                      </div>

                      {/* Coal */}
                      <div className="flex items-center gap-2">
                        <Img src={RESOURCE_ICONS.coal} alt="Coal" className="w-[22px] h-[22px] shrink-0" />
                        <div className="flex flex-col">
                          <span className="text-xl font-extrabold leading-none whitespace-nowrap text-[#8b8c89]">
                            {result.totalCharcoal.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-[#8b8c89] font-bold tracking-wider mt-0.5 whitespace-nowrap">COAL</span>
                        </div>
                      </div>
                    </div>

                    {/* Divider + crafting toggle */}
                    <div className="flex items-center shrink-0 ml-auto">
                      <div
                        className={`group/sw flex items-center gap-2.5${discountActive ? ' active' : ''}`}
                      >
                        {/* Slider */}
                        <div
                          className="relative w-9 h-5 bg-[#121212] border border-white/10 rounded-[10px] cursor-pointer shrink-0 transition-all duration-300 group-[.active]/sw:border-[rgba(204,66,44,0.5)]"
                          onClick={() => setQuery({ d: !discountActive })}
                        >
                          <div className="absolute w-3 h-3 bg-[#555] rounded-full top-[3px] left-[3px] [transition:all_0.3s_cubic-bezier(0.4,0,0.2,1)] group-[.active]/sw:bg-[#cc422c] group-[.active]/sw:left-[19px]" />
                        </div>

                        {/* Labels with center separator */}
                        <div className="flex flex-col items-center">
                          <span className="text-[11px] font-bold text-[#757575] transition-[color] duration-200 leading-[1.1] text-center break-words group-[.active]/sw:text-[#cc422c]">MIXING TABLE</span>
                          <div className="w-full h-px bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.1),transparent)] my-1" />
                          <span className="text-[11px] font-bold text-[#757575] transition-[color] duration-200 leading-[1.1] text-center break-words group-[.active]/sw:text-[#cc422c]">COOKING WORKBENCH</span>
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