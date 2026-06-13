import { RecycleImg } from './RecycleImg'
import { QtyInput } from './QtyInput'
import type { BreakdownRow } from './types'

interface BreakdownProps {
  rows: BreakdownRow[]
  onSet: (id: string, value: number) => void
}

/** Per-item recycler output breakdown (only items currently selected). */
export function Breakdown({ rows, onSet }: BreakdownProps) {
  return (
    <div>
      <div className="sec-label">Breakdown</div>
      <div className="bd-list">
        {rows.map((row) => (
          <div className="bd-row" key={row.id}>
            <div className="bd-input">
              <RecycleImg src={row.img} alt={row.name} data-tip={row.name} />
              <QtyInput
                className="bd-qty"
                value={row.count}
                ariaLabel={`${row.name} quantity`}
                deferZero
                onChange={(n) => onSet(row.id, n)}
              />
              <button
                className="bd-remove"
                onClick={() => onSet(row.id, 0)}
                data-tip="Remove"
                aria-label={`Remove ${row.name}`}
              >
                ✕
              </button>
            </div>
            <div className="bd-divider" />
            <div className="bd-outputs">
              {row.outputs.map((o) => (
                <div className="bd-out-item" key={o.key} data-tip={o.title}>
                  {o.chancePct != null && (
                    <span className="rnd-badge">{o.chancePct}%</span>
                  )}
                  <RecycleImg src={o.img} alt={o.title} />
                  <span>×{o.amount}</span>
                </div>
              ))}
              {row.penalty && <span className="penalty-tag">-33%</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
