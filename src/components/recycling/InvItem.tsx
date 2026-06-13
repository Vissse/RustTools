import { memo } from 'react'
import { Img } from '../Img'

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
