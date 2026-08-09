import {
  breadcrumbJsonLd,
  calculatorJsonLd,
  faqJsonLd,
} from '@/lib/seo'

export type Faq = { q: string; a: string }

interface CalcSeoProps {
  /** Calculator name as it should appear in structured data, e.g. "Rust Raid Calculator". */
  name: string
  /** Route path, e.g. "/raid". */
  path: string
  /** Breadcrumb label for this page, matching the visible trail in CalcShell. */
  crumb: string
  /** One-sentence description for the WebApplication node. */
  description: string
  /** Body copy. Each string is a paragraph. */
  intro: string[]
  /** Numbered "how to use" steps. */
  steps: string[]
  /** Shown on the page AND emitted as FAQPage schema — the two must match. */
  faqs: Faq[]
}

/**
 * Server-rendered copy that sits underneath a calculator widget.
 *
 * The calculators themselves are client components behind a Suspense boundary,
 * so their markup is effectively invisible to a crawler: the HTML Google
 * receives for /raid was a heading and an empty div. This block gives each page
 * real indexable text, an H2/H3 outline using the language people actually
 * search for, and the structured data (breadcrumb, app, FAQ) that makes the
 * result eligible for a richer snippet.
 *
 * It renders outside the Suspense boundary on purpose — content inside it would
 * be replaced by the fallback in the initial HTML.
 */
export function CalcSeo({
  name,
  path,
  crumb,
  description,
  intro,
  steps,
  faqs,
}: CalcSeoProps) {
  const jsonLd = [
    breadcrumbJsonLd([
      { name: 'Calculators', path: '/calculators' },
      { name: crumb, path },
    ]),
    calculatorJsonLd({ name, description, path }),
    faqJsonLd(faqs),
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 pb-24 text-text font-sans">
        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-text-bright leading-none font-display uppercase mb-6">
            About the <span className="text-rust">{crumb}</span>
          </h2>

          {intro.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="text-base leading-relaxed text-text-dim mb-4"
            >
              {paragraph}
            </p>
          ))}

          <h3 className="text-2xl font-bold tracking-tight text-text-bright font-display uppercase mt-12 mb-4">
            How to use it
          </h3>
          <ol className="list-decimal pl-5 space-y-2 text-base leading-relaxed text-text-dim">
            {steps.map((step) => (
              <li key={step.slice(0, 40)}>{step}</li>
            ))}
          </ol>

          <h3 className="text-2xl font-bold tracking-tight text-text-bright font-display uppercase mt-12 mb-4">
            Frequently asked questions
          </h3>
          <dl className="space-y-6">
            {faqs.map(({ q, a }) => (
              <div key={q}>
                <dt className="text-lg font-semibold text-text-bright mb-1">
                  {q}
                </dt>
                <dd className="text-base leading-relaxed text-text-dim">{a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  )
}
