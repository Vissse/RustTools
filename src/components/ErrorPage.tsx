'use client'

import { useState } from 'react'

interface ErrorPageProps {
  error?: unknown
  reset?: () => void
  title?: string
}

export function ErrorPage({
  error,
  reset,
  title = 'SOMETHING WENT WRONG',
}: ErrorPageProps) {
  const isDev = process.env.NODE_ENV !== 'production'
  const [showDetails, setShowDetails] = useState(isDev)

  const err = error instanceof Error ? error : undefined
  const message =
    err?.message ??
    (typeof error === 'string' ? error : 'An unexpected error occurred.')
  const details = err?.stack ?? String(error ?? '')

  return (
    <main className="min-h-[calc(100vh-60px)] flex items-center justify-center px-4 py-8">
      <div className="relative z-[1] overflow-hidden rounded-2xl bg-[rgba(19,18,16,0.65)] backdrop-blur-[20px] border border-white/[0.06] shadow-[0_16px_40px_rgba(0,0,0,0.4),inset_0_-1px_0_rgba(255,255,255,0.03)] transition-all duration-300 p-6 w-full max-w-[640px] before:content-[''] before:absolute before:top-0 before:inset-x-0 before:h-0.5 before:bg-[linear-gradient(90deg,transparent_0%,var(--rust)_15%,var(--rust)_85%,transparent_100%)] before:opacity-80">
        <div className="relative z-[1] flex items-center justify-between px-6 py-4 bg-transparent border-b border-border shrink-0 min-h-[56px]">
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 font-display font-semibold text-[clamp(20px,4vw,26px)] tracking-[0.2em] text-text-bright uppercase whitespace-nowrap">
            <h2 className="mt-1">{title}</h2>
          </div>
        </div>

        <div className="relative z-[1] flex flex-col pt-11 px-11 pb-12 gap-7">
          <p className="font-ui text-base leading-relaxed tracking-[0.02em] text-text m-0">{message}</p>

          <div className="flex flex-wrap gap-3.5 mt-1">
            <button
              type="button"
              className="bg-[linear-gradient(180deg,var(--panel3)_0%,var(--panel2)_100%)] border border-border-2 text-text-dim font-display text-base uppercase tracking-[0.15em] px-4 pt-2.5 pb-2 cursor-pointer transition-all duration-200 shadow-[0_2px_4px_rgba(0,0,0,0.5)] hover:text-rust hover:border-border-hi w-auto min-w-[130px]"
              onClick={() => (reset ? reset() : window.location.reload())}
            >
              Try again
            </button>
            <button
              type="button"
              className="bg-[linear-gradient(180deg,var(--panel3)_0%,var(--panel2)_100%)] border border-border-2 text-text-dim font-display text-base uppercase tracking-[0.15em] px-4 pt-2.5 pb-2 cursor-pointer transition-all duration-200 shadow-[0_2px_4px_rgba(0,0,0,0.5)] hover:text-rust hover:border-border-hi w-auto min-w-[130px]"
              onClick={() => window.history.back()}
            >
              Go back
            </button>
            {isDev && (
              <button
                type="button"
                className="bg-[linear-gradient(180deg,var(--panel3)_0%,var(--panel2)_100%)] border border-border-2 text-text-dim font-display text-base uppercase tracking-[0.15em] px-4 pt-2.5 pb-2 cursor-pointer transition-all duration-200 shadow-[0_2px_4px_rgba(0,0,0,0.5)] hover:text-rust hover:border-border-hi w-auto min-w-[130px]"
                onClick={() => setShowDetails((s) => !s)}
              >
                {showDetails ? 'Hide details' : 'Details'}
              </button>
            )}
          </div>

          {isDev && showDetails && (
            <pre className="m-0 bg-bg border border-border border-l-2 border-l-[#d44a30] rounded-[2px] px-4 py-3.5 max-h-[320px] overflow-auto font-mono text-xs leading-[1.55] text-text-dim whitespace-pre-wrap break-words">
              {details}
            </pre>
          )}
        </div>
      </div>
    </main>
  )
}
