import { RESOURCE_LABELS } from '../../lib/data/recycling-data'
import type { RecyclerKind } from '../../lib/types'
import type { TooltipProps } from '../useTooltip'
import { Breakdown } from './Breakdown'
import { RandomDropList } from './RandomDropList'
import { RecyclerToggle } from './RecyclerToggle'
import { ResCard } from './ResCard'
import type { RecycleResults } from './types'

interface ResultsPanelProps {
  recycler: RecyclerKind
  onRecyclerChange: (kind: RecyclerKind) => void
  results: RecycleResults | null
  onSet: (id: string, value: number) => void
  tipProps: TooltipProps
}

/** Right panel: recycler selector, total output, random drops and breakdown. */
export function ResultsPanel({
  recycler,
  onRecyclerChange,
  results,
  onSet,
  tipProps,
}: ResultsPanelProps) {
  return (
    <div className="panel-right" {...tipProps}>
      <RecyclerToggle recycler={recycler} onChange={onRecyclerChange} />

      {results ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <div className="sec-label-wrapper">
              <div className="sec-label" style={{ marginBottom: 0 }}>
                Total Output
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 11,
                  fontWeight: 700,
                  color: 'var(--rust)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Time:{' '}
                <span style={{ color: 'var(--text-bright)' }}>
                  {results.time}
                </span>
              </div>
            </div>

            <div className="res-grid" style={{ marginTop: 10 }}>
              {results.visibleResources.map((res) => (
                <ResCard
                  key={res}
                  kind={res}
                  label={RESOURCE_LABELS[res]}
                  value={results.totals[res]}
                />
              ))}
            </div>

            <RandomDropList randomTotals={results.randomTotals} />
          </div>

          <Breakdown rows={results.rows} onSet={onSet} />
        </div>
      ) : (
        <div className="empty-state">
          <span className="icon">◈</span>
          Select items to recycle
          <br />
          to see the output
        </div>
      )}
    </div>
  )
}
