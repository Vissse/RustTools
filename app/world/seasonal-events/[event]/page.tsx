import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { seoMetadata } from '@/lib/seo'
import { Img } from '@/components/Img'
import { SEASONAL_EVENT_SLUGS, getSeasonalEventBySlug } from '@/lib/data/seasonal-events-data/slugs'

type Props = {
  params: Promise<{ event: string }>
}

export function generateStaticParams() {
  return SEASONAL_EVENT_SLUGS.map((event) => ({ event }))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const event = getSeasonalEventBySlug(params.event)
  if (!event) return { title: 'Not Found' }

  return seoMetadata({
    title: `${event.name} — Rust Seasonal Event`,
    description: `${event.name} — Rust seasonal event page. Details coming soon.`,
    path: `/world/seasonal-events/${params.event}`,
    index: false,
  })
}

/** Name + image placeholder only — event items and details land once per-event data is in. */
export default async function SeasonalEventPage(props: Props) {
  const params = await props.params
  const event = getSeasonalEventBySlug(params.event)
  if (!event) return notFound()

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-20 text-text font-sans">
      <nav className="relative z-50 text-lg font-display uppercase text-text-dim mb-12 flex items-center space-x-3 tracking-widest animate-fade-in-up">
        <Link href="/" className="hover:text-text-bright transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/world" className="hover:text-text-bright transition-colors">
          World
        </Link>
        <span>/</span>
        <Link href="/world/seasonal-events" className="hover:text-text-bright transition-colors">
          Seasonal Events
        </Link>
        <span>/</span>
        <span className="text-rust font-medium">{event.name}</span>
      </nav>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 animate-fade-in-up">
        <div className="w-32 h-32 sm:w-40 sm:h-40 flex-none rounded-2xl bg-panel border border-white/5 flex items-center justify-center overflow-hidden">
          {event.image ? (
            <Img src={event.image} alt={event.name} width={128} height={128} className="w-20 h-20 sm:w-24 sm:h-24 object-contain" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-text-dim/40"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          )}
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-text-bright leading-none font-display uppercase">
          {event.name}
        </h1>
      </div>

      <div className="w-full h-[1px] bg-gradient-to-r from-white/20 to-transparent separator-gap animate-fade-in-up mt-12 mb-8" />

      <p className="text-text-dim max-w-2xl leading-relaxed animate-fade-in-up">
        Event items and details for {event.name} are coming soon.
      </p>
    </div>
  )
}
