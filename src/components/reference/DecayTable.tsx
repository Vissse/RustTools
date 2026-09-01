import { DataTable, type Column } from './DataTable'
import { DECAY_MATERIALS, type DecayMaterial } from '@/lib/data/decay-data'

/**
 * Decay time per building tier. Small enough to publish whole, and the "HP lost
 * per hour" column is derived rather than stored so it can't drift from the two
 * columns it comes from.
 */
export function DecayTable() {
  const columns: Column<DecayMaterial>[] = [
    { key: 'name', label: 'Building tier', rowHeader: true, render: (m) => m.name },
    {
      key: 'hp',
      label: 'Block health',
      align: 'right',
      render: (m) => m.hp.toLocaleString('en-US'),
    },
    {
      key: 'decay',
      label: 'Full decay',
      align: 'right',
      render: (m) => `${m.decayHours} h`,
    },
    {
      key: 'rate',
      label: 'HP lost per hour',
      align: 'right',
      render: (m) => Math.round(m.hp / m.decayHours).toLocaleString('en-US'),
    },
  ]

  return (
    <DataTable
      caption="How long each Rust building tier takes to decay from full health with no Tool Cupboard in range. Decay damage is applied gradually, so a partially damaged block has proportionally less time left."
      columns={columns}
      rows={DECAY_MATERIALS}
      rowKey={(m) => m.id}
    />
  )
}
