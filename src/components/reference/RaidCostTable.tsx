import { DataTable, type Column } from './DataTable'
import {
  REFERENCE_EXPLOSIVES,
  REFERENCE_EXPLOSIVE_LABELS,
  type RaidReferenceRow,
} from '@/lib/raid-reference'

const n = (v: number) => v.toLocaleString('en-US')

/**
 * The raid cost table. Rows are solved on the server at build time (see
 * lib/raid-reference.ts), so every figure here is in the static HTML.
 *
 * Missing explosive counts render as "—", never 0: an explosive with no row for
 * a structure means "no data for this pairing", and printing 0 would read as
 * "zero needed" — the most damaging possible way to be wrong on this page.
 */
export function RaidCostTable({ rows }: { rows: RaidReferenceRow[] }) {
  const columns: Column<RaidReferenceRow>[] = [
    {
      key: 'name',
      label: 'Structure',
      rowHeader: true,
      render: (r) => r.name,
    },
    { key: 'hp', label: 'Health', align: 'right', render: (r) => n(r.hp) },
    { key: 'material', label: 'Tier', render: (r) => r.material },
    ...REFERENCE_EXPLOSIVES.map(
      (e): Column<RaidReferenceRow> => ({
        key: e,
        label: REFERENCE_EXPLOSIVE_LABELS[e],
        align: 'right',
        render: (r) => {
          const count = r.counts[e]
          return count === undefined ? '—' : n(count)
        },
      }),
    ),
    {
      key: 'cheapest',
      label: 'Cheapest combo',
      render: (r) => r.cheapest.label || '—',
    },
    {
      key: 'sulfur',
      label: 'Sulfur',
      align: 'right',
      render: (r) => (
        <span className="text-sulfur">{n(r.cheapest.sulfur)}</span>
      ),
    },
  ]

  return (
    <DataTable
      caption={`Raid cost for every destructible structure in Rust: health, how many of each explosive it takes on its own, and the cheapest mixed combination by sulfur. Damage is quoted against the hard (outside) face.`}
      columns={columns}
      rows={rows}
      rowKey={(r) => r.name}
    />
  )
}
