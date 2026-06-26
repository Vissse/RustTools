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
        <div className="fade-in-container mt-0">
          {/* Použití nativní třídy sec-label pro sjednocení nadpisu */}
          <div className="sec-label">TOTAL OUTPUT & TIME</div>

          <div className="raid-box">
            {/* Vnitřní hlavička s Total Yield a Time */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-[13px] text-[#a0a0a0] font-semibold">
                Total Yield
              </div>
              <div className="text-[13px] font-bold tracking-[0.05em]">
                <span className="text-[#666] mr-1.5">TIME:</span>
                <span className="text-[#cd412b]">{results.time}</span>
              </div>
            </div>

            {/* Suroviny zarovnané vedle sebe s flexboxem */}
            <div
              className="rcy-res-resources flex flex-wrap gap-8 items-center"
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
              <div className="mt-6">
                <RandomDropList randomTotals={results.randomTotals} />
              </div>
            )}
          </div>

          <Breakdown rows={results.rows} onSet={onSet} />
        </div>
      ) : (
        <div className="empty-state raid-box text-center mt-8">
          <span className="icon">◈</span>
          Select items to recycle
        </div>
      )}
    </div>
  )
}
