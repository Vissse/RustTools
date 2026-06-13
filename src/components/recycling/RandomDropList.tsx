import { RecycleImg } from './RecycleImg'
import type { RandomTotal } from './types'

interface RandomDropListProps {
  randomTotals: RandomTotal[]
}

/** "Plus a random amount of..." — min/avg/max for each chance-based drop. */
export function RandomDropList({ randomTotals }: RandomDropListProps) {
  if (randomTotals.length === 0) return null

  return (
    <div className="rnd-wrap">
      <div className="rnd-title">plus a random amount of...</div>
      <div className="rnd-grid">
        {randomTotals.map((rt) => (
          <div className="rnd-row" key={rt.id}>
            <RecycleImg className="rnd-icon" src={rt.img} alt={rt.name} data-tip={rt.name} />
            <div className="rnd-stats">
              <div className="stat-block">
                <span className="stat-lbl">Min</span>
                <span className="stat-val">{rt.min}</span>
              </div>
              <div className="stat-line" />
              <div className="stat-block">
                <span className="stat-lbl">Avg</span>
                <span className="stat-val">~{Math.round(rt.avg * 10) / 10}</span>
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
  )
}
