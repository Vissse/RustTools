'use client'

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
    <div
      className="fade-in-container basis-[45%] grow-0 shrink-0 p-[22px] overflow-y-auto flex flex-col gap-6 @container/rcy-panel max-md:basis-auto max-md:grow max-md:overflow-y-visible max-md:border-r-0 max-md:p-1.5"
      {...tipProps}
    >
      <RecyclerToggle recycler={recycler} onChange={onRecyclerChange} />

      {results ? (
        <div className="fade-in-container mt-0">
          <div className="sec-label">TOTAL OUTPUT & TIME</div>

          <div className="bg-white/3 border border-white/5 rounded-lg px-5 py-4 mb-6">
            {/* Inner header: Total Yield + Time */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-[13px] text-[#a0a0a0] font-semibold">
                Total Yield
              </div>
              <div className="text-[13px] font-bold tracking-wider">
                <span className="text-[#666] mr-1.5">TIME:</span>
                <span className="text-[#cd412b]">{results.time}</span>
              </div>
            </div>

            {/* Resources laid out side by side */}
            <div className="flex flex-wrap gap-8 items-center max-[1024px]:justify-center">
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
        <div className="h-full flex items-center justify-center flex-col gap-2.5 font-display text-base font-normal tracking-[0.15em] text-text-muted uppercase text-center leading-[1.9] min-h-[200px] border border-border bg-black/25 mt-8">
          <span className="text-rust text-[28px] leading-none">◈</span>
          Select items to recycle
        </div>
      )}
    </div>
  )
}
