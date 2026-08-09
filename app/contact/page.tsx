import type { Metadata } from 'next'
import { seoMetadata } from '@/lib/seo'

import { ContactCards } from '@/components/ContactCards'

export const metadata: Metadata = seoMetadata({
  title: 'Contact & Support',
  description: 'Get in touch with the RustTools team, report bugs, or join our community.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 py-20 text-text font-sans">
      <header className="mb-12 animate-fade-in-up">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-text-bright leading-none font-display uppercase">
          Contact <span className="text-rust">Us</span>
        </h1>
        <p className="text-lg text-text-dim max-w-3xl leading-relaxed">
          Found a bug? Have a suggestion for a new calculator? Or just want to say hi? Here are the best ways to get in touch with us.
        </p>
      </header>

      <div className="w-full h-[1px] bg-gradient-to-r from-white/20 to-transparent separator-gap animate-fade-in-up mb-12" />

      <ContactCards />
    </div>
  )
}
