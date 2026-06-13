import { Img } from '../Img'
import { RESOURCE_ICONS } from '../../lib/data/recycling-data'
import type { RecycleResource } from '../../lib/types'

interface ResCardProps {
  kind: RecycleResource
  label: string
  value: number
}

/** A single total-output resource card. */
export function ResCard({ kind, label, value }: ResCardProps) {
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
