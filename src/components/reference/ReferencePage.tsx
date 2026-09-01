import type { ReactNode } from 'react'
import Link from 'next/link'
import { ContentPageShell } from '@/components/content/ContentPageShell'
import { DATA_VERIFIED_LABEL } from '@/lib/seo'
import type { ReferenceContent } from '@/lib/reference-content'

/**
 * Body of a /reference/* page: lede, quick answers, data table, FAQ, provenance.
 *
 * These pages exist because the calculators can't do this job. A calculator
 * computes its answer on the client behind a Suspense boundary, so the
 * prerendered HTML is a heading and nothing else — fine for a tool, useless for
 * citation, since an answer engine can only quote what a page contains. Rather
 * than bolt prose onto the tools, the written half lives here and links back.
 *
 * Two rules hold the markup together:
 *
 * - **No `Reveal` wrapper.** The guides' scroll-reveal renders `opacity-0` until
 *   an IntersectionObserver fires, which is exactly the shape of text a crawler
 *   is entitled to discount. `animate-fade-in-up` (which ContentPageShell
 *   applies) is a keyframe that ends visible, so it is safe.
 * - **`faq` is the same array the page hands to `faqJsonLd`.** Schema for
 *   invisible Q&A is a guidelines violation, and an engine that fetches the page
 *   and can't find the claimed answer learns to distrust the whole graph.
 *
 * Headings run h1 (ContentPageShell) → h2 → h3, with no level skipped.
 */
export function ReferencePage({
  content,
  children,
}: {
  content: ReferenceContent
  /** The data table. Omit on pages whose data can't honestly be tabulated. */
  children?: ReactNode
}) {
  const {
    slug,
    crumb,
    heading,
    headingAccent,
    summary,
    facts,
    tableHeading,
    tableNote,
    faq,
    sourceNote,
    tool,
  } = content

  return (
    <ContentPageShell
      breadcrumbs={[
        { label: 'Reference', href: '/reference' },
        { label: crumb, href: `/reference/${slug}` },
      ]}
      headerAccent={heading}
      headerRest={headingAccent}
    >
      <div className="max-w-3xl flex flex-col gap-6">
        {summary.map((p) => (
          <p key={p} className="text-text-dim text-lg font-light leading-relaxed">
            {p}
          </p>
        ))}
      </div>

      {tool && (
        <p className="mt-8 text-base font-light">
          <span className="text-text-dim">Working out a specific case? </span>
          <Link
            href={tool.path}
            className="text-rust hover:text-text-bright transition-colors font-display uppercase tracking-wide"
          >
            {tool.label} →
          </Link>
        </p>
      )}

      <h2 className="font-display uppercase text-3xl md:text-4xl leading-none text-text-bright tracking-tight mt-16 mb-8">
        Quick answers
      </h2>
      {/* A <dl>, not cards: the term/value pairing is the whole point, and it is
          the one structure that survives being stripped to plain text. */}
      <dl className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-border border border-border">
        {facts.map((f) => (
          <div key={f.term} className="bg-panel p-6">
            <dt className="font-display uppercase text-xl text-text-bright tracking-wide leading-none mb-3">
              {f.term}
            </dt>
            <dd className="text-text-dim text-base font-light leading-relaxed m-0">
              {f.value}
            </dd>
          </div>
        ))}
      </dl>

      {children && tableHeading && (
        <>
          <h2
            id="table"
            className="font-display uppercase text-3xl md:text-4xl leading-none text-text-bright tracking-tight mt-16 mb-4 scroll-mt-24"
          >
            {tableHeading}
          </h2>
          {tableNote && (
            <p className="text-text-dim text-base font-light leading-relaxed max-w-3xl mb-8">
              {tableNote}
            </p>
          )}
          {children}
        </>
      )}

      <h2
        id="faq"
        className="font-display uppercase text-3xl md:text-4xl leading-none text-text-bright tracking-tight mt-16 mb-8 scroll-mt-24"
      >
        Frequently asked questions
      </h2>
      <div className="flex flex-col gap-4">
        {faq.map((f) => (
          <details key={f.q} className="group border border-border bg-panel">
            <summary className="cursor-pointer list-none flex items-center justify-between gap-6 p-6 hover:bg-white/[0.02] transition-colors">
              <h3 className="font-display uppercase text-xl text-text-bright tracking-wide leading-none">
                {f.q}
              </h3>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="text-rust flex-shrink-0 transition-transform duration-300 group-open:rotate-45"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </summary>
            <p className="text-text-dim text-base font-light leading-relaxed px-6 pb-6 max-w-3xl">
              {f.a}
            </p>
          </details>
        ))}
      </div>

      {/* Provenance. Answer engines weight a dated, sourced, self-identifying
          page over an anonymous one, and it is the honest thing to print beside
          numbers a balance patch can invalidate. */}
      <p className="text-text-muted text-sm font-light leading-relaxed max-w-3xl mt-16 pt-8 border-t border-border">
        {sourceNote} Data on this page was last verified against Rust in{' '}
        {DATA_VERIFIED_LABEL}. Facepunch balance patches can change these values —
        see the{' '}
        <Link href="/changelog" className="text-rust hover:underline">
          changelog
        </Link>{' '}
        for what has been re-checked. RustTools is an unofficial fan project and
        is not affiliated with or endorsed by Facepunch Studios.
      </p>
    </ContentPageShell>
  )
}
