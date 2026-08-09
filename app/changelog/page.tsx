import type { Metadata } from 'next'
import { seoMetadata } from '@/lib/seo'

export const metadata: Metadata = seoMetadata({
  title: 'Changelog',
  description: 'Recent updates and changes to RustTools.',
  path: '/changelog',
})

const UPDATES = [
  {
    date: 'August 2026',
    title: 'Recycling Calculator Overhaul',
    changes: [
      'Added dynamic breakdown of recycling yields.',
      'Improved layout for better mobile responsiveness.',
      'Added support for Safe Zone recycling penalties.'
    ]
  },
  {
    date: 'July 2026',
    title: 'Initial Release',
    changes: [
      'Launched Raid, Furnace, and basic Recycling calculators.',
      'Dark mode and immersive Rust theme introduced.'
    ]
  }
]

export default function ChangelogPage() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 py-20 text-text font-sans">
      <header className="mb-12 animate-fade-in-up">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-text-bright leading-none font-display uppercase">
          Change<span className="text-rust">log</span>
        </h1>
        <p className="text-lg text-text-dim max-w-3xl leading-relaxed">
          Stay up to date with the latest changes, features, and fixes across RustTools.
        </p>
      </header>

      <div className="w-full h-[1px] bg-gradient-to-r from-white/20 to-transparent separator-gap animate-fade-in-up mb-12" />

      <div className="max-w-3xl animate-fade-in-up flex flex-col gap-12">
        {UPDATES.map((update, idx) => (
          <div key={idx} className="relative pl-8 border-l border-white/10">
            {/* Timeline dot */}
            <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-rust shadow-[0_0_8px_var(--rust-glow)]" />
            
            <span className="text-sm font-bold text-rust uppercase tracking-wider mb-2 block">{update.date}</span>
            <h2 className="text-2xl font-bold text-text-bright mb-4 font-display uppercase tracking-wide">
              {update.title}
            </h2>
            <ul className="flex flex-col gap-2">
              {update.changes.map((change, cIdx) => (
                <li key={cIdx} className="text-text-dim text-[15px] flex items-start gap-3">
                  <span className="text-white/20 mt-1">-</span>
                  <span>{change}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
