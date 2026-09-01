import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { seoMetadata } from '@/lib/seo'
import { Img } from '@/components/Img'
import {
  CATEGORY_SLUGS,
  getCategoryBySlug,
  ITEMS_BY_CATEGORY_SLUG,
} from '@/lib/data/items-data/slugs'

type Props = {
  params: Promise<{ category: string }>
}

export function generateStaticParams() {
  return CATEGORY_SLUGS.map((category) => ({ category }))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const category = getCategoryBySlug(params.category)
  if (!category) return { title: 'Not Found' }

  return seoMetadata({
    title: `${category} — Rust Items`,
    description: `Every ${category} item in Rust.`,
    path: `/items/${params.category}`,
    index: false,
  })
}

/**
 * Flat name-only list for now. Some categories will eventually split into
 * subcategories (e.g. Ammo → Arrows / Launcher / Pistol Ammo / ...) once
 * that data comes in — the grouping isn't assigned per item yet.
 */
export default async function ItemCategoryPage(props: Props) {
  const params = await props.params
  const category = getCategoryBySlug(params.category)
  if (!category) return notFound()

  const items = ITEMS_BY_CATEGORY_SLUG[params.category]

  // Items with no subcategory yet render flat; the rest group under their
  // subcategory heading, in the order each subcategory first appears.
  const plain = items.filter((item) => !item.subcategory)
  const subcategories = [...new Set(items.map((item) => item.subcategory).filter(Boolean))] as string[]

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-20 text-text font-sans">
      <nav className="relative z-50 text-lg font-display uppercase text-text-dim mb-12 flex items-center space-x-3 tracking-widest animate-fade-in-up">
        <Link href="/" className="hover:text-text-bright transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/items" className="hover:text-text-bright transition-colors">
          Items
        </Link>
        <span>/</span>
        <span className="text-rust font-medium">{category}</span>
      </nav>

      <header className="mb-8 animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight m-0 text-text-bright leading-none font-display uppercase">
          {category}
        </h1>
        <p className="text-lg text-text-dim max-w-3xl leading-relaxed mt-6">
          {items.length} items. Names only for now.
        </p>
      </header>

      <div className="w-full h-[1px] bg-gradient-to-r from-white/20 to-transparent separator-gap animate-fade-in-up mb-12" />

      <div className="flex flex-col gap-10 animate-fade-in-up">
        {plain.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {plain.map(({ name, slug, image }) => (
              <Link
                key={slug}
                href={`/items/${params.category}/${slug}`}
                className="flex items-center gap-2 text-sm text-text-dim bg-white/[0.03] border border-white/5 rounded-full py-1.5 pl-1.5 pr-3.5 hover:border-rust/40 hover:text-text-bright transition-colors"
              >
                {image && <Img src={image} alt="" width={40} height={40} className="w-6 h-6 object-contain" />}
                {name}
              </Link>
            ))}
          </div>
        )}

        {subcategories.map((subcategory) => (
          <section key={subcategory}>
            <span className="sec-label">{subcategory}</span>
            <div className="flex flex-wrap gap-2 mt-4">
              {items
                .filter((item) => item.subcategory === subcategory)
                .map(({ name, slug, image }) => (
                  <Link
                    key={slug}
                    href={`/items/${params.category}/${slug}`}
                    className="flex items-center gap-2 text-sm text-text-dim bg-white/[0.03] border border-white/5 rounded-full py-1.5 pl-1.5 pr-3.5 hover:border-rust/40 hover:text-text-bright transition-colors"
                  >
                    {image && <Img src={image} alt="" width={40} height={40} className="w-6 h-6 object-contain" />}
                    {name}
                  </Link>
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
