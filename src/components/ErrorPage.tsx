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
  const [copied, setCopied] = useState(false)

  const err = error instanceof Error ? error : undefined
  const message =
    err?.message ??
    (typeof error === 'string' ? error : 'An unexpected error occurred.')
  const details = err?.stack ?? String(error ?? '')

  const handleCopy = () => {
    navigator.clipboard.writeText(details)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-[calc(100vh-60px)] flex items-center justify-center px-4 py-8">
      <div className="relative z-[1] overflow-hidden rounded-2xl bg-panel backdrop-blur-[20px] border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.4),inset_0_-1px_0_rgba(255,255,255,0.03)] transition-all duration-300 p-8 w-full max-w-[720px] before:content-[''] before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-gradient-to-r before:from-transparent before:via-rust before:to-transparent before:opacity-80">
        
        <div className="flex flex-col items-center justify-center mb-8 text-center">
          <div className="w-16 h-16 rounded-full bg-rust/10 border border-rust/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(207,87,31,0.2)]">
            <svg className="w-8 h-8 text-rust" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="font-display font-bold text-3xl tracking-widest text-white uppercase drop-shadow-md">
            <span className="text-rust">{title.split(' ')[0]}</span> {title.split(' ').slice(1).join(' ')}
          </h2>
          <p className="font-ui text-lg mt-4 text-text-bright/80 max-w-[500px]">
            {message}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            type="button"
            className="group relative px-6 py-3 bg-panel border border-white/10 rounded-lg font-display uppercase tracking-widest text-text-bright hover:border-rust/50 hover:text-white transition-all overflow-hidden"
            onClick={() => (reset ? reset() : window.location.reload())}
          >
            <div className="absolute inset-0 bg-rust/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-4 h-4 text-rust" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Try again
            </span>
          </button>
          
          <button
            type="button"
            className="group relative px-6 py-3 bg-panel border border-white/10 rounded-lg font-display uppercase tracking-widest text-text-bright hover:border-white/30 hover:text-white transition-all overflow-hidden"
            onClick={() => window.history.back()}
          >
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-4 h-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Go back
            </span>
          </button>

          {isDev && (
            <button
              type="button"
              className="group relative px-6 py-3 bg-panel border border-white/10 rounded-lg font-display uppercase tracking-widest text-text-bright hover:border-white/30 hover:text-white transition-all overflow-hidden"
              onClick={() => setShowDetails((s) => !s)}
            >
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-4 h-4 text-white/50 group-hover:text-rust transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                {showDetails ? 'Hide details' : 'Show details'}
              </span>
            </button>
          )}
        </div>

        {isDev && showDetails && (
          <div className="relative rounded-xl border border-rust/30 bg-bg/80 overflow-hidden mt-6 animate-fade-in-up">
            <div className="flex items-center justify-between px-4 py-2 bg-rust/10 border-b border-rust/20">
              <span className="font-display text-xs tracking-widest uppercase text-rust">Error Stack Trace</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-panel hover:bg-white/5 border border-white/5 hover:border-white/20 transition-all font-ui text-[11px] text-text-bright"
              >
                {copied ? (
                  <>
                    <svg className="w-3 h-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-green-400 font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3 h-3 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
            <div className="p-4 overflow-auto max-h-[320px]">
              <pre className="m-0 font-mono text-[11px] leading-[1.6] text-text-dim whitespace-pre-wrap break-words">
                {details}
              </pre>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
