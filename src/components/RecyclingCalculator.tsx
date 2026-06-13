import { memo, useCallback, useMemo, useState } from 'react'
import sumBy from 'lodash/sumBy'
import { CalcShell } from './CalcShell'
import { Img } from './Img'
import { useTooltip } from './useTooltip'
import {
  ALWAYS_RESOURCES,
  CATEGORIES,
  COMPONENT_INFO,
  ITEMS,
  OPTIONAL_RESOURCES,
  RESOURCE_ICONS,
  RESOURCE_LABELS,
  RES_MAP,
} from '../lib/data/recycling-data'
import type { RecycleResource, RecyclerKind } from '../lib/types'

interface OutputCell {
  key: string
  img: string
  title: string
  amount: number
  /** Drop chance in %, only set for sub-100% random drops (renders a badge). */
  chancePct?: number
}

interface BreakdownRow {
  id: string
  name: string
  img: string
  count: number
  outputs: OutputCell[]
  penalty: boolean
}

interface RandomTotal {
  id: string
  img: string
  name: string
  avg: number
  max: number
}

export function RecyclingCalculator() {
  const [inventory, setInventory] = useState<Record<string, number>>(() =>
    Object.fromEntries(ITEMS.map((i) => [i.id, 0]))
  )
  const [recycler, setRecycler] = useState<RecyclerKind>('radtown')
  const [search, setSearch] = useState('')
  const tip = useTooltip()

  const totalItems = useMemo(() => sumBy(Object.values(inventory)), [inventory])

  const results = useMemo(() => {
    if (totalItems === 0) return null

    const isSafezone = recycler === 'safezone'
    const totals = Object.fromEntries(
      [...ALWAYS_RESOURCES, ...OPTIONAL_RESOURCES].map((r) => [r, 0])
    ) as Record<RecycleResource, number>
    const randomTotals: Record<string, RandomTotal> = {}
    const rows: BreakdownRow[] = []

    for (const item of ITEMS) {
      const count = inventory[item.id]
      if (!count) continue

      const hasSafezoneYield =
        !!item.safezone_yield && Object.keys(item.safezone_yield).length > 0
      // With a dedicated safezone yield we use it as-is; otherwise the standard
      // recycler is 100% and the safe zone takes the flat 2/3 (-33%) penalty.
      const currentYield =
        isSafezone && hasSafezoneYield ? item.safezone_yield : item.yield
      const multiplier = isSafezone && !hasSafezoneYield ? 2 / 3 : 1
      const currentRandom =
        isSafezone && item.safezone_random ? item.safezone_random : item.random

      const outputs: OutputCell[] = []

      // Guaranteed output.
      for (const [res, base] of Object.entries(currentYield)) {
        if (!base) continue
        const amount = Math.floor(base * count * multiplier) // Rust rounds down.
        const mapped = RES_MAP[res]
        if (mapped) totals[mapped] += amount
        outputs.push({
          key: res,
          img: mapped
            ? RESOURCE_ICONS[mapped]
            : (COMPONENT_INFO[res]?.img ?? ''),
          title: mapped
            ? RESOURCE_LABELS[mapped]
            : (COMPONENT_INFO[res]?.label ?? res),
          amount,
        })
      }

      // Chance-based output.
      if (currentRandom) {
        for (const rnd of currentRandom) {
          const chancePct = Math.round(rnd.chance * 100)
          const mapped = RES_MAP[rnd.id]
          const img = mapped
            ? RESOURCE_ICONS[mapped]
            : (COMPONENT_INFO[rnd.id]?.img ?? '')
          const name = mapped
            ? RESOURCE_LABELS[mapped]
            : (COMPONENT_INFO[rnd.id]?.label ?? rnd.id)
          const maxAmount = rnd.amount * count

          outputs.push({
            key: `rnd:${rnd.id}`,
            img,
            title: name,
            amount: maxAmount,
            chancePct: chancePct < 100 ? chancePct : undefined,
          })

          if (chancePct < 100) {
            const acc = (randomTotals[rnd.id] ??= {
              id: rnd.id,
              img,
              name,
              avg: 0,
              max: 0,
            })
            acc.max += maxAmount
            acc.avg += maxAmount * rnd.chance
          }
        }
      }

      rows.push({
        id: item.id,
        name: item.name,
        img: item.img,
        count,
        outputs,
        penalty: isSafezone && !hasSafezoneYield,
      })
    }

    const timePerItem = isSafezone ? 8 : 5
    const totalSeconds = totalItems * timePerItem
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    const time = mins > 0 ? `${mins}M ${secs}S` : `${secs}S`

    const visibleResources = [
      ...ALWAYS_RESOURCES,
      ...OPTIONAL_RESOURCES.filter((r) => totals[r] > 0),
    ]

    return {
      totals,
      rows,
      time,
      visibleResources,
      randomTotals: Object.values(randomTotals),
    }
  }, [inventory, recycler, totalItems])

  const query = search.trim().toLowerCase()
  const categories = useMemo(
    () =>
      CATEGORIES.map((cat) => ({
        cat,
        items: ITEMS.filter(
          (i) =>
            i.category === cat &&
            (!query || i.name.toLowerCase().includes(query))
        ),
      })).filter((c) => c.items.length > 0),
    [query]
  )

  const adjust = useCallback((id: string, delta: number) => {
    setInventory((prev) => ({
      ...prev,
      [id]: Math.min(9999, Math.max(0, prev[id] + delta)),
    }))
  }, [])

  const setCount = useCallback((id: string, value: number) => {
    setInventory((prev) => ({ ...prev, [id]: value }))
  }, [])

  function clearAll() {
    setInventory(Object.fromEntries(ITEMS.map((i) => [i.id, 0])))
  }

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
      <div className="panel-left" {...tip}>
        <div className="input-toolbar">
          <input
            type="text"
            className="search-box"
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn-remove-all" onClick={clearAll}>
            Remove All
          </button>
        </div>
        {categories.map(({ cat, items }) => (
          <div className="cat-wrap" key={cat}>
            <div className="sec-label">{cat.toUpperCase()}</div>
            <div className="inv-grid">
              {items.map((item) => (
                <InvItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  img={item.img}
                  count={inventory[item.id]}
                  onAdjust={adjust}
                  onSet={setCount}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="panel-right" {...tip}>
        <div>
          <div className="sec-label">Recycler Type</div>
          <div className="recycler-toggle">
            <div
              className={`rec-btn${recycler === 'radtown' ? ' active' : ''}`}
              onClick={() => setRecycler('radtown')}
            >
              <Img
                src="/images/recycler.png"
                className="rec-icon-img"
                alt="Standard Recycler"
              />
              <span className="rec-name">Standard Recycler</span>
              <span className="rec-rate">60% YIELD • 5s / ITEM</span>
            </div>
            <div
              className={`rec-btn${recycler === 'safezone' ? ' active' : ''}`}
              onClick={() => setRecycler('safezone')}
            >
              <Img
                src="/images/safezone-recycler.png"
                className="rec-icon-img"
                alt="Safe Zone Recycler"
              />
              <span className="rec-name">Safe Zone Recycler</span>
              <span className="rec-rate">40% YIELD • 8s / ITEM</span>
            </div>
          </div>
        </div>

        {results ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <div className="sec-label-wrapper">
                <div className="sec-label" style={{ marginBottom: 0 }}>
                  Total Output
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: 11,
                    fontWeight: 700,
                    color: 'var(--rust)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  Time:{' '}
                  <span style={{ color: 'var(--text-bright)' }}>
                    {results.time}
                  </span>
                </div>
              </div>

              <div className="res-grid" style={{ marginTop: 10 }}>
                {results.visibleResources.map((res) => (
                  <ResCard
                    key={res}
                    kind={res}
                    label={RESOURCE_LABELS[res]}
                    value={results.totals[res]}
                  />
                ))}
              </div>

              {results.randomTotals.length > 0 && (
                <div className="rnd-wrap">
                  <div className="rnd-title">plus a random amount of...</div>
                  <div className="rnd-grid">
                    {results.randomTotals.map((rt) => (
                      <div className="rnd-row" key={rt.id}>
                        <Img className="rnd-icon" src={rt.img} alt={rt.name} />
                        <div className="rnd-stats">
                          <div className="stat-block">
                            <span className="stat-lbl">Min</span>
                            <span className="stat-val">0</span>
                          </div>
                          <div className="stat-line" />
                          <div className="stat-block">
                            <span className="stat-lbl">Avg</span>
                            <span className="stat-val">
                              ~{Math.round(rt.avg * 10) / 10}
                            </span>
                          </div>
                          <div className="stat-line" />
                          <div className="stat-block">
                            <span className="stat-lbl">Max</span>
                            <span className="stat-val">{rt.max}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <div className="sec-label">Breakdown</div>
              <div className="bd-list">
                {results.rows.map((row) => (
                  <div className="bd-row" key={row.id}>
                    <div className="bd-input">
                      <Img src={row.img} alt={row.name} />
                      <span className="bd-input-txt">{row.count}×</span>
                    </div>
                    <div className="bd-divider" />
                    <div className="bd-outputs">
                      {row.outputs.map((o) => (
                        <div
                          className="bd-out-item"
                          key={o.key}
                          data-tip={o.title}
                        >
                          {o.chancePct != null && (
                            <span className="rnd-badge">{o.chancePct}%</span>
                          )}
                          <Img src={o.img} alt={o.title} />
                          <span>×{o.amount}</span>
                        </div>
                      ))}
                      {row.penalty && <span className="penalty-tag">-33%</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <span className="icon">◈</span>
            Select items to recycle
            <br />
            to see the output
          </div>
        )}
      </div>
    </CalcShell>
  )
}

// Memoized so a +/- click only re-renders the one cell whose count changed,
// instead of all 700+ items. `onAdjust` must be a stable reference (useCallback).
const InvItem = memo(function InvItem({
  id,
  name,
  img,
  count,
  onAdjust,
  onSet,
}: {
  id: string
  name: string
  img: string
  count: number
  onAdjust: (id: string, delta: number) => void
  onSet: (id: string, value: number) => void
}) {
  return (
    <div className={`inv-item${count > 0 ? ' active' : ''}`}>
      <div className="inv-item-img" data-tip={name}>
        <Img src={img} alt={name} loading="lazy" decoding="async" />
      </div>
      <div className="inv-controls">
        <button className="ctrl-btn minus" onClick={() => onAdjust(id, -1)}>
          −
        </button>
        <input
          type="text"
          inputMode="numeric"
          className="ctrl-val"
          value={count}
          aria-label={`${name} quantity`}
          onChange={(e) => {
            // Integers 0–9999 only: strip everything non-digit, then clamp.
            const digits = e.target.value.replace(/\D/g, '')
            const n = digits === '' ? 0 : Math.min(9999, parseInt(digits, 10))
            onSet(id, n)
          }}
          onFocus={(e) => e.target.select()}
        />
        <button className="ctrl-btn plus" onClick={() => onAdjust(id, 1)}>
          +
        </button>
      </div>
    </div>
  )
})

function ResCard({
  kind,
  label,
  value,
}: {
  kind: RecycleResource
  label: string
  value: number
}) {
  return (
    <div className={`res-card ${kind}`}>
      <div className="res-header">
        <Img src={RESOURCE_ICONS[kind]} alt={label} />
        <span className="res-lbl">{label}</span>
      </div>
      <span className="res-val">{value}</span>
    </div>
  )
}
