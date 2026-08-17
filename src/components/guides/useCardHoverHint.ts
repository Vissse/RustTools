'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * The guide card grids hide everything useful — tool pickers, keycards,
 * blueprints, detail links — behind a hover-only drawer, and a resting card
 * gives no sign of it. This drives a hint on the first card: it opens and
 * closes itself on a loop while a ghost cursor acts out the gesture, until the
 * user hovers any card and proves they've found it.
 *
 * The timings below are offsets into the same 4s cycle as the
 * `monumentHintCursor` keyframes in global.css — the drawer opens as the cursor
 * lands (25%) and closes as it leaves (70%). Change one and change the other.
 *
 * Wire it up as:
 *   - `gridRef` on the element wrapping the cards
 *   - `stopHint` on every card's `onPointerEnter`
 *   - `hintOn` to render <CardHintOverlay> on the first card
 *   - `hintOpen` to force that card's open state
 */
export function useCardHoverHint(enabled = true) {
  const [hintOn, setHintOn] = useState(false)
  const [hintOpen, setHintOpen] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  const started = useRef(false)
  const timers = useRef<number[]>([])
  const loop = useRef<number | null>(null)
  const gridRef = useRef<HTMLDivElement | null>(null)

  // Ends the hint for good — the card drops every trace of it and looks exactly
  // like its neighbours. `started` is never reset, so nothing restarts it.
  const stopHint = useCallback(() => {
    if (loop.current !== null) window.clearInterval(loop.current)
    loop.current = null
    timers.current.forEach(window.clearTimeout)
    timers.current = []
    setHintOpen(false)
    setHintOn(false)
  }, [])

  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none)').matches)
  }, [])

  useEffect(() => {
    if (!enabled || started.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // A pointer already resting on a card fires no pointerenter, so without this
    // check the loop would play on underneath a cursor that is already hovering
    // — exactly the state the hint exists to teach.
    if (gridRef.current?.querySelector('article:hover')) return

    started.current = true
    setHintOn(true)

    const cycle = () => {
      timers.current.push(
        window.setTimeout(() => setHintOpen(true), 1000),
        window.setTimeout(() => setHintOpen(false), 2800),
      )
    }
    cycle()
    loop.current = window.setInterval(cycle, 4000)

    // Deliberately no window-level listeners: moving or scrolling around the
    // page is not engagement with the cards, and killing the loop on the first
    // stray mouse move meant it was almost never seen. Only hovering a card
    // ends it — that is what `stopHint` is for.
    return () => {
      if (loop.current !== null) window.clearInterval(loop.current)
      timers.current.forEach(window.clearTimeout)
    }
  }, [enabled])

  return { hintOn, hintOpen, isTouch, gridRef, stopHint }
}
