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

export function ResultsPanel({
  recycler,
  onRecyclerChange,
  results,
  onSet,
  tipProps,
}: ResultsPanelProps) {
  return (
    <div className="panel-right fade-in-container" {...tipProps}>
      <RecyclerToggle recycler={recycler} onChange={onRecyclerChange} />

      {results ? (
        <div style={{ marginTop: '0px' }} className="fade-in-container">
          {/* Použití nativní třídy sec-label pro sjednocení nadpisu */}
          <div className="sec-label">TOTAL OUTPUT & TIME</div>

          <div className="raid-box">
            {/* Vnitřní hlavička s Total Yield a Time */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px',
              }}
            >
              <div
                style={{ fontSize: '13px', color: '#a0a0a0', fontWeight: 600 }}
              >
                Total Yield
              </div>
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                }}
              >
                <span style={{ color: '#666', marginRight: '6px' }}>TIME:</span>
                <span style={{ color: '#cd412b' }}>{results.time}</span>
              </div>
            </div>

            {/* Suroviny zarovnané vedle sebe s flexboxem */}
            <div
              className="rcy-res-resources"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '32px',
                alignItems: 'center',
              }}
            >
              {results.visibleResources.map((res) => (
                <div key={res} className="fade-in-container">
                  <ResCard
                    kind={res}
                    label={RESOURCE_LABELS[res]}
                    value={results.totals[res]}
                  />
                </div>
              ))}
            </div>

            {results.randomTotals.length > 0 && (
              <div style={{ marginTop: '24px' }}>
                <RandomDropList randomTotals={results.randomTotals} />
              </div>
            )}
          </div>

          <Breakdown rows={results.rows} onSet={onSet} />
        </div>
      ) : (
        <div
          className="empty-state raid-box"
          style={{ textAlign: 'center', marginTop: 32 }}
        >
          <span className="icon">◈</span>
          Select items to recycle
        </div>
      )}
    </div>
  )
}
