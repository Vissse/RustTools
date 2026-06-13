import { useMemo, useState } from 'react'
import sumBy from 'lodash/sumBy'
import { CalcShell } from './CalcShell'
import { Img } from './Img'
import {
  ITEMS,
  RESOURCE_ICONS,
  RESOURCE_ORDER,
} from '../lib/data/recycling-data'
import type { RecycleResource, RecyclerKind } from '../lib/types'

interface BreakdownRow {
  id: string
  name: string
  img: string
  count: number
  outputs: { res: RecycleResource; amount: number }[]
}

export function RecyclingCalculator() {
  const [inventory, setInventory] = useState<Record<string, number>>(() =>
    Object.fromEntries(ITEMS.map((i) => [i.id, 0]))
  )
  const [recycler, setRecycler] = useState<RecyclerKind>('radtown')
  const [search, setSearch] = useState('')

  const totalItems = useMemo(() => sumBy(Object.values(inventory)), [inventory])

  const results = useMemo(() => {
    if (totalItems === 0) return null

    // Standard recycler = 1.0 (60% in-game yield); Safe Zone = 2/3 (40% yield).
    const multiplier = recycler === 'radtown' ? 1.0 : 2 / 3
    const totals: Record<RecycleResource, number> = {
      scrap: 0,
      metal: 0,
      hqm: 0,
      cloth: 0,
    }
    const rows: BreakdownRow[] = []

    for (const item of ITEMS) {
      const count = inventory[item.id]
      if (count === 0) continue

      const outputs: BreakdownRow['outputs'] = []
      for (const res of RESOURCE_ORDER) {
        const baseYield = item.yield[res]
        if (baseYield === 0) continue
        // Rust rounds recycler output down.
        const actualYield = Math.floor(baseYield * count * multiplier)
        totals[res] += actualYield
        outputs.push({ res, amount: actualYield })
      }
      rows.push({ id: item.id, name: item.name, img: item.img, count, outputs })
    }

    const timePerItem = recycler === 'radtown' ? 5 : 8
    const totalSeconds = totalItems * timePerItem
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    const time = mins > 0 ? `${mins}M ${secs}S` : `${secs}S`

    return { totals, rows, time }
  }, [inventory, recycler, totalItems])

  const visibleItems = ITEMS.filter(
    (item) => !search || item.name.toLowerCase().includes(search.toLowerCase())
  )

  function adjust(id: string, delta: number) {
    setInventory((prev) => ({
      ...prev,
      [id]: Math.max(0, prev[id] + delta),
    }))
  }

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
      <div className="panel-left">
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
        <div className="inv-grid">
          {visibleItems.map((item) => {
            const count = inventory[item.id]
            return (
              <div
                key={item.id}
                className={`inv-item${count > 0 ? ' active' : ''}`}
              >
                <div className="inv-item-img" title={item.name}>
                  <Img src={item.img} alt={item.name} />
                </div>
                <div className="inv-controls">
                  <button
                    className="ctrl-btn minus"
                    onClick={() => adjust(item.id, -1)}
                  >
                    −
                  </button>
                  <div className="ctrl-val">{count}</div>
                  <button
                    className="ctrl-btn plus"
                    onClick={() => adjust(item.id, 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="panel-right">
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
                alt="Radtown Recycler"
              />
              <span className="rec-name">Radtown Recycler</span>
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
                <ResCard
                  kind="scrap"
                  label="Scrap"
                  value={results.totals.scrap}
                />
                <ResCard
                  kind="metal"
                  label="Metal"
                  value={results.totals.metal}
                />
                <ResCard
                  kind="hqm"
                  label="High Qual"
                  value={results.totals.hqm}
                />
                <ResCard
                  kind="cloth"
                  label="Cloth"
                  value={results.totals.cloth}
                />
              </div>
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
                        <div className="bd-out-item" key={o.res}>
                          <Img src={RESOURCE_ICONS[o.res]} alt={o.res} />
                          <span>×{o.amount}</span>
                        </div>
                      ))}
                      {recycler === 'safezone' && (
                        <span className="penalty-tag">-33%</span>
                      )}
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
