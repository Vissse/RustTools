import { DataTable, type Column } from './DataTable'
import { COMPONENT_ITEMS, formatYield } from '@/lib/recycling-reference'
import type { RecycleItem } from '@/lib/types'

/**
 * Recycler output for every component, both recycler types side by side.
 *
 * The comparison is the point: "is the Safe Zone recycler worse" is one of the
 * most asked questions about the system, and a table with both columns answers
 * it for 57 items at once in a way no prose summary can.
 */
export function RecyclerYieldTable() {
  const columns: Column<RecycleItem>[] = [
    { key: 'name', label: 'Component', rowHeader: true, render: (i) => i.name },
    {
      key: 'radtown',
      label: 'Radtown recycler',
      render: (i) => (
        <span className="whitespace-normal">{formatYield(i.yield)}</span>
      ),
    },
    {
      key: 'safezone',
      label: 'Safe Zone recycler',
      render: (i) => (
        <span className="whitespace-normal">
          {formatYield(i.safezone_yield)}
        </span>
      ),
    },
  ]

  return (
    <DataTable
      caption={`What each of the ${COMPONENT_ITEMS.length} components in Rust returns when recycled, at a monument (Radtown) recycler and at the reduced-yield Safe Zone recyclers in Outpost and Bandit Camp. Output is always rounded down.`}
      columns={columns}
      rows={COMPONENT_ITEMS}
      rowKey={(i) => i.id}
    />
  )
}
