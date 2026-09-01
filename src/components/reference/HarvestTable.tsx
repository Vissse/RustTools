import { DataTable, type Column } from './DataTable'
import type { HarvestRow } from '@/lib/harvest-reference'

/**
 * Skinning and salvaging yields. Shared by both guides — the two data sets have
 * the same shape (target, tool, resources, time, condition), so they get the
 * same table rather than two that drift apart.
 *
 * The resources column wraps instead of scrolling: these are long lists, and a
 * row that has to be scrolled sideways to read is a row that gets truncated by
 * anything extracting text from the page.
 */
export function HarvestTable({
  rows,
  caption,
  targetLabel,
}: {
  rows: HarvestRow[]
  caption: string
  /** Column header for the first column, e.g. "Animal" or "Wreck". */
  targetLabel: string
}) {
  const columns: Column<HarvestRow>[] = [
    { key: 'target', label: targetLabel, rowHeader: true, render: (r) => r.target },
    { key: 'tool', label: 'Tool', render: (r) => r.tool },
    {
      key: 'resources',
      label: 'Resources returned',
      render: (r) => (
        <span className="whitespace-normal">{r.resources}</span>
      ),
    },
    { key: 'time', label: 'Time', align: 'right', render: (r) => r.time },
    {
      key: 'condition',
      label: 'Condition loss',
      align: 'right',
      render: (r) => r.conditionLoss,
    },
  ]

  return (
    <DataTable
      caption={caption}
      columns={columns}
      rows={rows}
      rowKey={(r) => r.target}
    />
  )
}
