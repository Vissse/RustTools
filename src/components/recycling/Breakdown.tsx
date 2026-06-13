import { Img } from '../Img'
import type { BreakdownRow } from './types'

interface BreakdownProps {
  rows: BreakdownRow[]
}

/** Per-item recycler output breakdown. */
export function Breakdown({ rows }: BreakdownProps) {
  return (
    <div>
      <div className="sec-label">Breakdown</div>
      <div className="bd-list">
        {rows.map((row) => (
          <div className="bd-row" key={row.id}>
            <div className="bd-input">
              <Img src={row.img} alt={row.name} data-tip={row.name} />
              <span className="bd-input-txt">{row.count}×</span>
            </div>
            <div className="bd-divider" />
            <div className="bd-outputs">
              {row.outputs.map((o) => (
                <div className="bd-out-item" key={o.key} data-tip={o.title}>
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
  )
}
