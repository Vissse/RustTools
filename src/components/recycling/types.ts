import type { RecycleItem, RecycleResource } from '../../lib/types'

/** One output icon (guaranteed resource/component or a chance-based drop). */
export interface OutputCell {
  key: string
  img: string
  title: string
  amount: number
  /** Drop chance in %, only set for sub-100% random drops (renders a badge). */
  chancePct?: number
}

/** One row of the per-item breakdown. */
export interface BreakdownRow {
  id: string
  name: string
  img: string
  count: number
  outputs: OutputCell[]
  penalty: boolean
}

/** Aggregated stats for a chance-based drop across the whole inventory. */
export interface RandomTotal {
  id: string
  img: string
  name: string
  avg: number
  max: number
}

/** Everything the results panel renders for the current inventory + recycler. */
export interface RecycleResults {
  totals: Record<RecycleResource, number>
  rows: BreakdownRow[]
  time: string
  visibleResources: RecycleResource[]
  randomTotals: RandomTotal[]
}

/** A category bucket of items shown in the left-hand picker. */
export interface ItemCategory {
  cat: string
  items: RecycleItem[]
}
