'use client'

import { useEffect, useRef } from 'react'
import type React from 'react'

/**
 * Lightweight hover tooltip for elements carrying a `data-tip="..."` attribute.
 *
 * Uses a single viewport-fixed element (so it is never clipped by scrolling
 * panels) plus delegated mouse handlers on a container — no per-item listeners
 * and no React state, so hovering never triggers a re-render.
 *
 * Spread the returned props onto any container whose descendants use `data-tip`.
 */
export function useTooltip() {
  const tipRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = document.createElement('div')
    el.className = 'tooltip-float'
    document.body.appendChild(el)
    tipRef.current = el

    // The fixed tooltip would otherwise stay frozen at a stale spot while the
    // user scrolls the list, so hide it on any scroll.
    const hide = () => el.classList.remove('visible')
    window.addEventListener('scroll', hide, true)

    return () => {
      window.removeEventListener('scroll', hide, true)
      el.remove()
      tipRef.current = null
    }
  }, [])

  function show(target: HTMLElement) {
    const el = tipRef.current
    if (!el) return
    const text = target.dataset.tip
    if (!text) return
    const r = target.getBoundingClientRect()
    el.textContent = text
    el.style.left = `${r.left + r.width / 2}px`
    el.style.top = `${r.top}px`
    el.classList.add('visible')
  }

  function hide() {
    tipRef.current?.classList.remove('visible')
  }

  return {
    onMouseOver: (e: React.MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>('[data-tip]')
      if (target) show(target)
      else hide()
    },
    onMouseOut: (e: React.MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>('[data-tip]')
      const related = e.relatedTarget as Node | null
      // Keep it visible while moving between children of the same tipped element.
      if (target && (!related || !target.contains(related))) hide()
    },
    onMouseLeave: hide,
  }
}

/** Handlers returned by {@link useTooltip}; spread onto a container element. */
export type TooltipProps = ReturnType<typeof useTooltip>