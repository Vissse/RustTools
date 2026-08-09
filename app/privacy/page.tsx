import type { Metadata } from 'next'
import { seoMetadata } from '@/lib/seo'

export const metadata: Metadata = seoMetadata({
  title: 'Privacy Policy',
  description: 'Privacy Policy for RustTools.',
  path: '/privacy',
})

export default function PrivacyPage() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 py-20 text-text font-sans">
      <header className="mb-12 animate-fade-in-up">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-text-bright leading-none font-display uppercase">
          Privacy <span className="text-rust">Policy</span>
        </h1>
        <p className="text-lg text-text-dim max-w-3xl leading-relaxed">
          Last updated: August 2026
        </p>
      </header>

      <div className="w-full h-[1px] bg-gradient-to-r from-white/20 to-transparent separator-gap animate-fade-in-up mb-12" />

      <div className="max-w-3xl animate-fade-in-up flex flex-col gap-8 text-text-dim text-[15px] leading-[1.7]">
        <section>
          <h2 className="text-2xl font-bold text-text-bright mb-4 font-display uppercase tracking-wide">1. Overview</h2>
          <p>
            Welcome to RustTools. We respect your privacy and are committed to protecting it. This Privacy Policy explains how we handle any information collected when you use our website.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-text-bright mb-4 font-display uppercase tracking-wide">2. Data Collection & Analytics</h2>
          <p>
            We use <strong className="text-text-bright">PostHog</strong> to collect basic, anonymized analytics data. This helps us understand which calculators are used most frequently and allows us to improve the user experience. We do not track or store personally identifiable information (PII).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-bright mb-4 font-display uppercase tracking-wide">3. Local Storage</h2>
          <p>
            Some settings or preferences may be stored locally in your browser to improve your experience (e.g., your selected items in the recycling calculator). This data never leaves your device.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-text-bright mb-4 font-display uppercase tracking-wide">4. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please reach out to us via our upcoming Discord community.
          </p>
        </section>
      </div>
    </div>
  )
}
