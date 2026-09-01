import { DataTable, type Column } from './DataTable'
import { SMELTERS } from '@/lib/data/smelting-data'

interface SmeltingRow {
  id: string
  smelter: string
  slots: number
  input: string
  output: string
  outputQuantity: string
  wood: number
  seconds: number
}

// Flattened once at module scope: every smelter × every process it accepts.
const ROWS: SmeltingRow[] = SMELTERS.flatMap((s) =>
  s.data.map((p) => ({
    id: `${s.id}-${p.inputItem}-${p.outputItem}`,
    smelter: s.name,
    slots: s.slots,
    input: p.inputItem,
    output: p.outputItem,
    outputQuantity: String(p.outputQuantity),
    wood: p.woodRequired,
    seconds: p.timeSeconds,
  })),
)

/**
 * Every smelting and cooking process in Rust, per smelter.
 *
 * Times and wood are per single item in one slot, which is the figure people
 * reason with; total throughput is that times the slot count, so the slot column
 * is carried on every row rather than left in the prose above.
 */
export function SmeltingTable() {
  const columns: Column<SmeltingRow>[] = [
    { key: 'smelter', label: 'Smelter', rowHeader: true, render: (r) => r.smelter },
    { key: 'slots', label: 'Slots', align: 'right', render: (r) => r.slots },
    { key: 'input', label: 'Input', render: (r) => r.input },
    {
      key: 'output',
      label: 'Output',
      render: (r) => `${r.outputQuantity}× ${r.output}`,
    },
    { key: 'wood', label: 'Wood', align: 'right', render: (r) => r.wood },
    {
      key: 'time',
      label: 'Time',
      align: 'right',
      render: (r) => `${r.seconds}s`,
    },
  ]

  return (
    <DataTable
      caption={`Smelting and cooking processes for all ${SMELTERS.length} smelters in Rust: what each one accepts, what it returns, and the wood and time cost per item in a single slot.`}
      columns={columns}
      rows={ROWS}
      rowKey={(r) => r.id}
    />
  )
}
