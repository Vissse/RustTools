import { useCallback, useMemo, useState } from 'react'
import { CalcShell } from './CalcShell'
import { useTooltip } from './useTooltip'
import { ITEMS } from '../lib/data/recycling-data'
import type { RecyclerKind } from '../lib/types'
import { ItemPicker } from './recycling/ItemPicker'
import { ResultsPanel } from './recycling/ResultsPanel'
import { buildResults, filterCategories } from './recycling/results'

export function RecyclingCalculator() {
  const [inventory, setInventory] = useState<Record<string, number>>(() =>
    Object.fromEntries(ITEMS.map((i) => [i.id, 0]))
  )
  const [recycler, setRecycler] = useState<RecyclerKind>('radtown')
  const [search, setSearch] = useState('')
  const tip = useTooltip()

  const results = useMemo(
    () => buildResults(inventory, recycler),
    [inventory, recycler]
  )

  const query = search.trim().toLowerCase()
  const categories = useMemo(() => filterCategories(query), [query])

  const adjust = useCallback((id: string, delta: number) => {
    setInventory((prev) => ({
      ...prev,
      [id]: Math.min(9999, Math.max(0, prev[id] + delta)),
    }))
  }, [])

  const setCount = useCallback((id: string, value: number) => {
    setInventory((prev) => ({ ...prev, [id]: value }))
  }, [])

  const clearAll = useCallback(() => {
    setInventory(Object.fromEntries(ITEMS.map((i) => [i.id, 0])))
  }, [])

  return (
    <CalcShell
      pageTitle={
        <>
          RUST <span>//</span> RECYCLING CALCULATOR
        </>
      }
      headerAccent="RECYCLING"
      headerRest="CALCULATOR"
      variant="recycling"
    >
      <ItemPicker
        search={search}
        onSearch={setSearch}
        onClear={clearAll}
        categories={categories}
        inventory={inventory}
        onAdjust={adjust}
        onSet={setCount}
        tipProps={tip}
      />
      <ResultsPanel
        recycler={recycler}
        onRecyclerChange={setRecycler}
        results={results}
        tipProps={tip}
      />
    </CalcShell>
  )
}
