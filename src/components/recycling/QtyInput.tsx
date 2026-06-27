'use client'

import { useEffect, useRef, useState } from 'react'

interface QtyInputProps {
  value: number
  onChange: (value: number) => void
  className?: string
  ariaLabel?: string
  /**
   * Hold `0`/empty locally and only commit it on blur. Used by the breakdown
   * input so accidentally typing `0` doesn't immediately unmount the row —
   * positive values still commit live; the `0` is committed when focus leaves.
   */
  deferZero?: boolean
}

const clamp = (raw: string) => {
  const digits = raw.replace(/\D/g, '') // integers 0–9999 only
  return { digits, n: digits === '' ? 0 : Math.min(9999, parseInt(digits, 10)) }
}

/** Integer quantity field (0–9999). */
export function QtyInput({
  value,
  onChange,
  className,
  ariaLabel,
  deferZero,
}: QtyInputProps) {
  const [draft, setDraft] = useState(String(value))
  const focused = useRef(false)

  // Reflect external changes (e.g. +/- buttons) while not actively editing.
  useEffect(() => {
    if (!focused.current) setDraft(String(value))
  }, [value])

  return (
    <input
      type="text"
      inputMode="numeric"
      className={className}
      value={draft}
      aria-label={ariaLabel}
      onChange={(e) => {
        const { digits, n } = clamp(e.target.value)
        setDraft(digits === '' ? '' : String(n))
        if (!deferZero || n > 0) onChange(n)
      }}
      onFocus={(e) => {
        focused.current = true
        e.target.select()
      }}
      onBlur={() => {
        focused.current = false
        const { n } = clamp(draft)
        setDraft(String(n))
        if (deferZero) onChange(n) // commit the deferred 0 (or final value)
      }}
    />
  )
}