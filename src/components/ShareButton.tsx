'use client'

import { useState } from 'react'

/**
 * Copies the current page URL (including the calculator state encoded in the
 * query string by nuqs) to the clipboard. Calculator-agnostic — it just shares
 * whatever the address bar currently holds, so a single instance in CalcShell
 * works for every calculator.
 */
export function ShareButton() {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard can be blocked (insecure context / denied permission). Fail
      // silently — the user can still copy from the address bar.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="share-btn"
      aria-label="Copy shareable link to this calculation"
    >
      {copied ? 'Copied!' : 'Share'}
    </button>
  )
}
