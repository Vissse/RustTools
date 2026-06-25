import {
  ALWAYS_RESOURCES,
  CATEGORIES,
  COMPONENT_INFO,
  ITEMS,
  OPTIONAL_RESOURCES,
  RESOURCE_ICONS,
  RESOURCE_LABELS,
  RES_MAP,
} from '../../lib/data/recycling-data'
import type { RecycleResource, RecyclerKind } from '../../lib/types'
import type {
  BreakdownRow,
  ItemCategory,
  OutputCell,
  RandomTotal,
  RecycleResults,
} from './types'

/** Compute totals, breakdown and timing for the given inventory + recycler. */
export function buildResults(
  inventory: Record<string, number>,
  recycler: RecyclerKind,
  order: string[] = []
): RecycleResults | null {
  let totalItems = 0
  for (const id in inventory) totalItems += inventory[id]
  if (totalItems === 0) return null

  // Recyclers process a whole "recycle stack" per cycle, so timing is billed per
  // cycle (ceil(count / stack)), not per item. Items without a recycleStack count
  // as one cycle each.
  let totalCycles = 0

  const isSafezone = recycler === 'safezone'
  const totals = Object.fromEntries(
    [...ALWAYS_RESOURCES, ...OPTIONAL_RESOURCES].map((r) => [r, 0])
  ) as Record<RecycleResource, number>
  const randomTotals: Record<string, RandomTotal> = {}
  // Guaranteed yield of component (non-resource) ids, summed across all items.
  // Folded into the matching random-drop lines so their Min/Avg/Max reflect the
  // guaranteed portion (resources are excluded — they show in the total cards).
  const componentGuaranteed: Record<string, number> = {}
  const rows: BreakdownRow[] = []

  for (const item of ITEMS) {
    const count = inventory[item.id]
    if (!count) continue

    totalCycles += Math.ceil(count / (item.recycleStack ?? 1))

    const hasSafezoneYield =
      !!item.safezone_yield && Object.keys(item.safezone_yield).length > 0
    // With a dedicated safezone yield we use it as-is; otherwise the standard
    // recycler is 100% and the safe zone takes the flat 2/3 (-33%) penalty.
    const currentYield =
      isSafezone && hasSafezoneYield ? item.safezone_yield : item.yield
    const multiplier = isSafezone && !hasSafezoneYield ? 2 / 3 : 1
    const currentRandom =
      isSafezone && item.safezone_random ? item.safezone_random : item.random

    const outputs: OutputCell[] = []

    // Guaranteed output.
    for (const [res, base] of Object.entries(currentYield)) {
      if (!base) continue
      const amount = Math.floor(base * count * multiplier) // Rust rounds down.
      const mapped = RES_MAP[res]
      if (mapped) totals[mapped] += amount
      else componentGuaranteed[res] = (componentGuaranteed[res] ?? 0) + amount
      outputs.push({
        key: res,
        img: mapped ? RESOURCE_ICONS[mapped] : (COMPONENT_INFO[res]?.img ?? ''),
        title: mapped
          ? RESOURCE_LABELS[mapped]
          : (COMPONENT_INFO[res]?.label ?? res),
        amount,
      })
    }

    // Chance-based output.
    if (currentRandom) {
      for (const rnd of currentRandom) {
        const chancePct = Math.round(rnd.chance * 100)
        const mapped = RES_MAP[rnd.id]
        const img = mapped
          ? RESOURCE_ICONS[mapped]
          : (COMPONENT_INFO[rnd.id]?.img ?? '')
        const name = mapped
          ? RESOURCE_LABELS[mapped]
          : (COMPONENT_INFO[rnd.id]?.label ?? rnd.id)
        const maxAmount = rnd.amount * count

        outputs.push({
          key: `rnd:${rnd.id}`,
          img,
          title: name,
          amount: maxAmount,
          chancePct: chancePct < 100 ? chancePct : undefined,
        })

        const acc = (randomTotals[rnd.id] ??= {
          id: rnd.id,
          img,
          name,
          min: 0,
          avg: 0,
          max: 0,
        })
        acc.max += maxAmount
        acc.avg += maxAmount * rnd.chance
        if (rnd.chance >= 1) acc.min += maxAmount // guaranteed roll
      }
    }

    rows.push({
      id: item.id,
      name: item.name,
      img: item.img,
      count,
      outputs,
      penalty: isSafezone && !hasSafezoneYield,
    })
  }

  // Seřazení chronologicky podle pořadí přidání
  if (order.length > 0) {
    rows.sort((a, b) => {
      const idxA = order.indexOf(a.id)
      const idxB = order.indexOf(b.id)
      return (idxA === -1 ? 9999 : idxA) - (idxB === -1 ? 9999 : idxB)
    })
  }

  // Fold guaranteed component amounts into their matching random-drop lines.
  for (const id in randomTotals) {
    const g = componentGuaranteed[id]
    if (g) {
      randomTotals[id].min += g
      randomTotals[id].avg += g
      randomTotals[id].max += g
    }
  }

  const timePerCycle = isSafezone ? 8 : 5
  const totalSeconds = totalCycles * timePerCycle
  const mins = Math.floor(totalSeconds / 60)
  const secs = totalSeconds % 60
  const time = mins > 0 ? `${mins}M ${secs}S` : `${secs}S`

  // Chronologické seřazení všech surovin podle toho, kdy byly přidány
  const orderedResources = new Set<RecycleResource>()
  for (const row of rows) {
    const item = ITEMS.find((i) => i.id === row.id)
    if (!item) continue
    const currentYield = isSafezone && item.safezone_yield ? item.safezone_yield : item.yield
    for (const res of Object.keys(currentYield)) {
      const mapped = RES_MAP[res]
      if (mapped) {
        orderedResources.add(mapped as RecycleResource)
      }
    }
  }
  const ALL_RESOURCES = [...ALWAYS_RESOURCES, ...OPTIONAL_RESOURCES]
  for (const r of ALL_RESOURCES) {
    if (totals[r] > 0) orderedResources.add(r)
  }

  const visibleResources = Array.from(orderedResources).filter((r) => totals[r] > 0)

  // Chronologické seřazení náhodných dropů
  const randomTotalsArray = Object.values(randomTotals)
  randomTotalsArray.sort((a, b) => {
    const getFirstRowIdx = (rndId: string) => {
      return rows.findIndex((row) => {
        const item = ITEMS.find((i) => i.id === row.id)
        if (!item) return false
        const currentRandom = isSafezone && item.safezone_random ? item.safezone_random : item.random
        return currentRandom?.some((r) => r.id === rndId)
      })
    }
    const idxA = getFirstRowIdx(a.id)
    const idxB = getFirstRowIdx(b.id)
    return (idxA === -1 ? 9999 : idxA) - (idxB === -1 ? 9999 : idxB)
  })

  return {
    totals,
    rows,
    time,
    visibleResources,
    randomTotals: randomTotalsArray,
  }
}

/** Items grouped by category, filtered by a lower-cased search query. */
export function filterCategories(query: string): ItemCategory[] {
  return CATEGORIES.map((cat) => ({
    cat,
    items: ITEMS.filter(
      (i) =>
        i.category === cat && (!query || i.name.toLowerCase().includes(query))
    ),
  })).filter((c) => c.items.length > 0)
}
