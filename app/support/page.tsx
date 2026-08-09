import type { Metadata } from 'next'
import { seoMetadata } from '@/lib/seo'
import { SupportCards } from '@/components/SupportCards'

export const metadata: Metadata = seoMetadata({
  title: 'Support Us',
  description: 'Support the development of RustTools.',
  path: '/support',
})

export default function SupportPage() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 py-20 text-text font-sans">
      <header className="mb-12 animate-fade-in-up">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-text-bright leading-none font-display uppercase">
          Support RUST<span className="text-rust">TOOLS</span>
        </h1>
        <p className="text-lg text-text-dim max-w-3xl leading-relaxed">
          RustTools is developed and maintained in our free time. If these tools have helped you save time in-game, consider supporting the project to keep the servers running and fuel future updates!
        </p>
      </header>

      <div className="w-full h-[1px] bg-gradient-to-r from-white/20 to-transparent separator-gap animate-fade-in-up mb-12" />

      <SupportCards />
    </div>
  )
}
