'use client'

import { createParser, parseAsArrayOf } from 'nuqs'

/**
 * URL parser for an ordered list of `id:qty` entries, used by calculators whose
 * state is a `Record<id, number>` (recycling inventory, shop cart). Encoding the
 * order in the array preserves the sequence in which the user added items, and
 * keeps the URL compact (`?i=cloth:80,scrap:200`).
 *
 * Quantities are clamped to a sane range and malformed segments are dropped on
 * parse so a hand-edited URL can never inject NaN/negative counts. Callers should
 * still validate that each `id` is a real item for their calculator.
 */
export interface Entry {
  id: string
  qty: number
}

const entry = createParser<Entry>({
  parse: (value) => {
    const sep = value.lastIndexOf(':')
    if (sep <= 0) return null
    const id = value.slice(0, sep)
    const qty = parseInt(value.slice(sep + 1), 10)
    if (!id || !Number.isFinite(qty) || qty <= 0) return null
    return { id, qty: Math.min(9999, qty) }
  },
  serialize: ({ id, qty }) => `${id}:${qty}`,
})

export const parseAsEntries = parseAsArrayOf(entry).withDefault([] as Entry[])

/**
 * Immutably set an item's quantity in an entries list, preserving insertion order
 * (new items append at the end, matching the order users add them). A quantity of
 * 0 or less removes the entry. Quantity is clamped to [0, 9999].
 */
export function setEntryQty(entries: Entry[], id: string, qty: number): Entry[] {
  const clamped = Math.min(9999, Math.max(0, Math.floor(qty)))
  const idx = entries.findIndex((e) => e.id === id)
  if (clamped <= 0) return idx === -1 ? entries : entries.filter((e) => e.id !== id)
  if (idx === -1) return [...entries, { id, qty: clamped }]
  const next = entries.slice()
  next[idx] = { id, qty: clamped }
  return next
}

