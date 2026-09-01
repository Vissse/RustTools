import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { seoMetadata } from '@/lib/seo'
import { Img } from '@/components/Img'
import { WORLD_RESOURCE_SLUGS, getWorldResourceBySlug } from '@/lib/data/world-resources-data/slugs'

type Props = {
  params: Promise<{ resource: string }>
}

export function generateStaticParams() {
  return WORLD_RESOURCE_SLUGS.map((resource) => ({ resource }))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const resource = getWorldResourceBySlug(params.resource)
  if (!resource) return { title: 'Not Found' }

  return seoMetadata({
    title: `${resource.name} — Rust World Resource`,
    description: `${resource.name} — Rust resource page. Spawn info coming soon.`,
    path: `/world/resources/${params.resource}`,
    index: false,
  })
}

/** Name + image placeholder only — spawn locations and yields land once per-resource data is in. */
export default async function WorldResourcePage(props: Props) {
  const params = await props.params
  const resource = getWorldResourceBySlug(params.resource)
  if (!resource) return notFound()

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
        <Link href="/world/resources" className="hover:text-text-bright transition-colors">
          Resources
        </Link>
        <span>/</span>
        <span className="text-rust font-medium">{resource.name}</span>
      </nav>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 animate-fade-in-up">
        <div className="w-32 h-32 sm:w-40 sm:h-40 flex-none rounded-2xl bg-panel border border-white/5 flex items-center justify-center overflow-hidden">
          {resource.image ? (
            <Img src={resource.image} alt={resource.name} width={128} height={128} className="w-20 h-20 sm:w-24 sm:h-24 object-contain" />
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

        <div>
          <span className="text-sm font-bold text-rust uppercase tracking-wider mb-2 block">
            {resource.subcategory}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-text-bright leading-none font-display uppercase">
            {resource.name}
          </h1>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gradient-to-r from-white/20 to-transparent separator-gap animate-fade-in-up mt-12 mb-8" />

      <p className="text-text-dim max-w-2xl leading-relaxed animate-fade-in-up">
        Spawn locations and yields for {resource.name} are coming soon.
      </p>
    </div>
  )
}
