import { memo } from 'react'
import { Img } from '../Img'
import { QtyInput } from './QtyInput'

interface InvItemProps {
  id: string
  name: string
  img: string
  count: number
  onAdjust: (id: string, delta: number) => void
  onSet: (id: string, value: number) => void
}

// Memoized so a +/- click only re-renders the one cell whose count changed,
// instead of all 700+ items. `onAdjust`/`onSet` must be stable (useCallback).
export const InvItem = memo(function InvItem({
  id,
  name,
  img,
  count,
  onAdjust,
  onSet,
}: InvItemProps) {
  return (
    <div className={`inv-item${count > 0 ? ' active' : ''}`}>
      <div className="inv-item-img" data-tip={name}>
        <Img src={img} alt={name} loading="lazy" decoding="async" />
      </div>
      <div className="inv-controls">
        <button className="ctrl-btn minus" onClick={() => onAdjust(id, -1)}>
          −
        </button>
        <QtyInput
          className="ctrl-val"
          value={count}
          ariaLabel={`${name} quantity`}
          onChange={(n) => onSet(id, n)}
        />
        <button className="ctrl-btn plus" onClick={() => onAdjust(id, 1)}>
          +
        </button>
      </div>
    </div>
  )
})
