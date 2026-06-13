import { RecycleImg } from './RecycleImg'
import type { RecyclerKind } from '../../lib/types'

interface RecyclerToggleProps {
  recycler: RecyclerKind
  onChange: (kind: RecyclerKind) => void
}

/** Standard vs Safe Zone recycler selector. */
export function RecyclerToggle({ recycler, onChange }: RecyclerToggleProps) {
  return (
    <div>
      <div className="sec-label">Recycler Type</div>
      <div className="recycler-toggle">
        <div
          className={`rec-btn${recycler === 'radtown' ? ' active' : ''}`}
          onClick={() => onChange('radtown')}
        >
          <RecycleImg
            src="/images/recycler.png"
            className="rec-icon-img"
            alt="Standard Recycler"
          />
          <span className="rec-name">Standard Recycler</span>
          <span className="rec-rate">60% YIELD • 5s / ITEM</span>
        </div>
        <div
          className={`rec-btn${recycler === 'safezone' ? ' active' : ''}`}
          onClick={() => onChange('safezone')}
        >
          <RecycleImg
            src="/images/safezone-recycler.png"
            className="rec-icon-img"
            alt="Safe Zone Recycler"
          />
          <span className="rec-name">Safe Zone Recycler</span>
          <span className="rec-rate">40% YIELD • 8s / ITEM</span>
        </div>
      </div>
    </div>
  )
}
