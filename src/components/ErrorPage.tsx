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
  const isDev = import.meta.env.DEV
  const [showDetails, setShowDetails] = useState(isDev)

  const err = error instanceof Error ? error : undefined
  const message =
    err?.message ??
    (typeof error === 'string' ? error : 'An unexpected error occurred.')
  const details = err?.stack ?? String(error ?? '')

  return (
    <main className="err-screen">
      <div className="calc-wrap err-wrap" data-variant="raid">
        <span className="rivet tl" />
        <span className="rivet tr" />
        <span className="rivet bl" />
        <span className="rivet br" />

        <div className="calc-header">
          <div className="header-left">
            <div className="header-bar" />
            <div className="header-title text-[22px] font-semibold leading-1 flex gap-2 justify-center items-center">
              <h2 className="!mt-1">{title}</h2>
            </div>
          </div>
          <div className="header-status">
            <span className="status-lbl">SYSTEM FAULT</span>
            <span className="status-dot err-dot" />
          </div>
        </div>
        <div className="metal-rule" />

        <div className="calc-body err-body">
          <p className="err-message">{message}</p>

          <div className="err-actions">
            <button
              type="button"
              className="btn-reset err-btn"
              onClick={() => (reset ? reset() : window.location.reload())}
            >
              Try again
            </button>
            <button
              type="button"
              className="btn-reset err-btn"
              onClick={() => window.history.back()}
            >
              Go back
            </button>
            {isDev && (
              <button
                type="button"
                className="btn-reset err-btn"
                onClick={() => setShowDetails((s) => !s)}
              >
                {showDetails ? 'Hide details' : 'Details'}
              </button>
            )}
          </div>

          {isDev && showDetails && <pre className="err-details">{details}</pre>}
        </div>
      </div>
    </main>
  )
}
