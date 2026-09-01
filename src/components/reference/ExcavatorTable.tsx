import { DataTable, type Column } from './DataTable'
import {
  EXCAVATOR_RATES,
  MINUTES_PER_BARREL,
  type ExcavatorRate,
} from '@/lib/data/excavator-data'

const n = (v: number) => v.toLocaleString('en-US')

/**
 * Giant Excavator output per diesel barrel, with the two- and five-barrel
 * columns spelled out. Output scales linearly, but "how much for five barrels"
 * is the question actually being asked, and a table that answers it directly is
 * quotable where one that requires arithmetic is not.
 */
export function ExcavatorTable() {
  const columns: Column<ExcavatorRate>[] = [
    { key: 'name', label: 'Resource', rowHeader: true, render: (r) => r.name },
    {
      key: 'one',
      label: '1 barrel',
      align: 'right',
      render: (r) => n(r.yieldPerBarrel),
    },
    {
      key: 'two',
      label: '2 barrels',
      align: 'right',
      render: (r) => n(r.yieldPerBarrel * 2),
    },
    {
      key: 'five',
      label: '5 barrels',
      align: 'right',
      render: (r) => n(r.yieldPerBarrel * 5),
    },
    {
      key: 'time',
      label: 'Run time (1 barrel)',
      align: 'right',
      render: () => `${MINUTES_PER_BARREL} min`,
    },
  ]

  return (
    <DataTable
      caption={`Giant Excavator output by resource. One barrel of Diesel Fuel runs the excavator for ${MINUTES_PER_BARREL} minutes and produces only the resource selected in the control room.`}
      columns={columns}
      rows={EXCAVATOR_RATES}
      rowKey={(r) => r.id}
    />
  )
}
