"use client"

import { CctvPopup } from './CctvPopup';
import Link from 'next/link'
import Image from 'next/image'
import { useState, useMemo, Suspense } from 'react'
import { useQueryStates, parseAsString, parseAsStringLiteral } from 'nuqs'
import { useTooltip } from '../useTooltip'
import {
  monumentsData,
  TIER_FILTERS,
  type MonumentCard,
  type TierFilter,
} from '@/lib/monumentsData'

const getImagePath = (name: string): string | null => {
  const cleanName = name.replace(/\s*x\d+$/, '') // Strip trailing " x2", " x3", etc.
  const map: Record<string, string> = {
    'green keycard': '/images/recycle/green.keycard.webp',
    'blue keycard': '/images/recycle/blue.keycard.webp',
    'red keycard': '/images/recycle/red.keycard.webp',
    'Recycler': '/images/recycle/recycler.webp',
    'Oil Refinery': '/images/recycle/small.oil.refinery.webp',
    'Diesel Barrel': '/images/recycle/diesel_barrel.webp',
    'Barbecue': '/images/recycle/bbq.webp',
    'Minicopter': '/images/recycle/minicopter.webp',
    'Scrap Transport Helicopter': '/images/recycle/scrap.transport.helicopter.webp',
    'RHIB': '/images/recycle/rhib.webp',
    'Motor Rowboat': '/images/recycle/rowboat.webp',
    'Attack Helicopter': '/images/recycle/attack.helicopter.webp',
    'Duo Submarine': '/images/recycle/duo.submarine.webp',
    'Solo Submarine': '/images/recycle/solo-submarine.webp',
    'Hot Air Balloon': '/images/recycle/hot.air.balloon.webp',
    'Horse': '/images/recycle/horse.webp',
    'Computer Station': '/images/recycle/computerstation.webp',
    'Repair Bench': '/images/recycle/repair.table.webp',
    'Research Table': '/images/recycle/research.table.webp',
    'Workbench Level 1': '/images/recycle/workbench1.webp',
    'Vending Machine': '/images/recycle/vending.machine.webp',
    'Blueprint fragments': '/images/recycle/basic.blueprint.fragment.webp',
    'Advanced blueprint fragments': '/images/recycle/advanced.blueprint.fragment.webp',
    'Bike': '/images/recycle/motorbike.webp',
    'Snowmobile': '/images/recycle/snowmobile.webp',
    'Patrol Boat': '/images/recycle/rhib.webp',
    'Pump Jack': '/images/recycle/pump.jack.webp',
    'Mining Quarry': '/images/recycle/mining.quarry.webp',
    'MLRS': '/images/recycle/mlrs.webp',
    'Modular Car Lift': '/images/recycle/modularcarlift.webp',
    'Ridable Horse': '/images/recycle/horse.webp',
    'Bradley APC': '/images/bradley.apc.png',
  }
  return map[cleanName] || null
}

const getDisplayName = (name: string): string => {
  const cleanName = name.replace(/\s*x\d+$/, '')
  const displayMap: Record<string, string> = {
    'Bike': 'Motorbike',
    'Ridable Horse': 'Horse',
    'Patrol Boat': 'RHIB',
    'green keycard': 'Green Keycard',
    'blue keycard': 'Blue Keycard',
    'red keycard': 'Red Keycard'
  }
  return displayMap[cleanName] || cleanName
}

// Fallback generic icons for items missing PNGs
const GenericIcon = ({ type }: { type: 'utility' | 'vehicle' | 'bp' | 'computer' | 'repair' }) => {
  switch (type) {
    case 'computer':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
          <rect width="14" height="8" x="5" y="2" rx="2" />
          <rect width="20" height="8" x="2" y="14" rx="2" />
          <path d="M6 18h2" />
          <path d="M12 18h6" />
        </svg>
      )
    case 'repair':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      )
    case 'bp':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" x2="8" y1="13" y2="13" />
          <line x1="16" x2="8" y1="17" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      )
    case 'vehicle':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      )
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-dim">
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M9 14v1" />
          <path d="M15 14v1" />
          <path d="M9 9h.01" />
          <path d="M15 9h.01" />
        </svg>
      )
  }
}

/**
 * The guide body, driven entirely by props so it can render both inside the
 * URL-state wrapper below and as that wrapper's Suspense fallback. The fallback
 * pass is what puts the heading and the full monument list into the statically
 * prerendered HTML — reading search params opts a subtree out of static
 * rendering, so without it a crawler would receive an empty page.
 *
 * Omitting the setters (the fallback case) renders a read-only view.
 */
function MonumentsView({
  search,
  filter,
  onSearch,
  onFilter,
}: {
  search: string
  filter: TierFilter
  onSearch?: (value: string) => void
  onFilter?: (value: TierFilter) => void
}) {
  const [selectedCctvMonument, setSelectedCctvMonument] = useState<string | null>(null)
  const tooltip = useTooltip()

  const filteredMonuments = useMemo(() => {
    return monumentsData.filter(m => {
      const matchSearch = m.name.toLowerCase().includes(search.toLowerCase())
      const matchFilter = filter === 'All' || m.tier === filter
      return matchSearch && matchFilter
    }).sort((a, b) => a.name.localeCompare(b.name))
  }, [search, filter])

  const renderItemIcon = (rawName: string, count: number = 1, typeHint: 'utility' | 'vehicle' | 'bp' | 'computer' | 'repair' = 'utility') => {
    const name = rawName.replace(/\s*x\d+$/, '') // Strip trailing " x2", " x3", etc.
    const imgPath = getImagePath(name)
    
    // Auto-detect some types based on name for fallback SVGs
    if (!imgPath && name.includes('Computer')) typeHint = 'computer'
    if (!imgPath && name.includes('Repair')) typeHint = 'repair'
    if (!imgPath && name.includes('Blueprint')) typeHint = 'bp'

    return (
      <div 
        key={name} 
        data-tip={getDisplayName(name)}
        className="relative group flex items-center justify-center w-11 h-11 transition-all"
      >
        {imgPath ? (
          <Image src={imgPath} alt={name} width={40} height={40} className="object-contain drop-shadow-md" />
        ) : (
          <div>
            <GenericIcon type={typeHint} />
          </div>
        )}
        {count > 1 && (
          <span className="absolute -bottom-1 -right-1 bg-rust text-white text-[9px] font-bold font-mono px-1 rounded border border-black/50 shadow-md z-10">
            x{count}
          </span>
        )}
      </div>
    )
  }

  const renderKeycard = (card: MonumentCard, idx: number) => {
    const imgPath = getImagePath(card.name)
    return (
      <div 
        key={idx} 
        data-tip={getDisplayName(card.name) + (card.logic ? ` (${card.logic})` : '')}
        className="relative group flex items-center justify-center w-14 h-14 transition-all"
      >
        {imgPath && (
          <Image src={imgPath} alt={card.name} width={40} height={40} className="object-contain drop-shadow-md" />
        )}
        {card.logic && (
          <span className="absolute -top-2 -right-2 bg-surface text-text-bright text-[9px] font-mono px-1 rounded border border-white/20">
            {card.logic}
          </span>
        )}
      </div>
    )
  }

  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 py-20 text-text font-sans" {...tooltip}>
      {/* Breadcrumbs */}
      <div className="relative z-50 text-lg font-display uppercase text-text-dim mb-12 flex items-center space-x-3 tracking-widest animate-fade-in-up">
        <Link href="/" className="hover:text-text-bright transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/guides" className="hover:text-text-bright transition-colors">
          Guides
        </Link>
        <span>/</span>
        <span className="text-rust font-medium">Monument Puzzles</span>
      </div>

      {/* Hero Section */}
      <header className="pb-4 mb-8 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-[linear-gradient(to_right,rgba(255,255,255,0.2),transparent)] animate-fade-in-up">
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6 text-text-bright leading-none font-display uppercase">
              The Ultimate <span className="text-rust">Monuments</span> Guide
            </h1>
            <p className="text-2xl text-rust font-light tracking-wide max-w-3xl leading-relaxed font-display uppercase">
              Explore loot, access routes, and facilities
            </p>
          </div>
          
          {/* Search */}
          <div className="relative w-full md:w-80 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim" aria-hidden="true">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => onSearch?.(e.target.value)}
              readOnly={!onSearch}
              className="w-full bg-surface border border-white/10 rounded-xl pl-12 pr-4 py-3 text-text-bright focus:outline-none focus:border-rust focus:ring-1 focus:ring-rust transition-all shadow-lg placeholder:text-text-dim/50"
            />
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-12 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        {TIER_FILTERS.map(t => (
          <button
            key={t}
            onClick={() => onFilter?.(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
              filter === t
                ? 'bg-rust text-white shadow-[0_0_15px_rgba(207,87,31,0.4)] border border-rust'
                : 'bg-surface text-text-dim hover:text-text-bright hover:bg-white/5 border border-white/5 shadow-sm'
            }`}
          >
            {t}
          </button>
        ))}
        <span className="ml-auto text-text-dim text-sm font-medium bg-surface px-4 py-2 rounded-lg border border-white/5">
          {filteredMonuments.length} Found
        </span>
      </div>

      {/* Grid Layout */}
      <div key={filter + search} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        {filteredMonuments.map((m, idx) => (
          <article 
            key={m.id} 
            className="group relative flex flex-col bg-surface border border-transparent rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.8)] hover:border-rust/40 hover:shadow-[0_12px_40px_rgba(207,87,31,0.25)] transition-all duration-500 animate-fade-in-up h-[480px]"
            style={{ animationDelay: `${(idx % 15) * 50}ms`, animationFillMode: 'both' }}
          >
            {/* Full Background Image */}
            <div 
              className="absolute inset-0 opacity-70 group-hover:opacity-40 transition-all duration-700 ease-out group-hover:scale-110 group-hover:blur-[6px] transform origin-center"
              style={{
                backgroundImage: `url(/images/monuments/${m.name.toLowerCase().replace(/'/g, '').replace(/[^a-z0-9]+/g, '.')}.webp)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
            
            {/* Absolute Action Buttons */}
            <div className="absolute top-4 right-4 z-30 flex flex-col gap-2 transition-all duration-500 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
              
              {/* Map Button */}
              <button 
                data-tip="Monument Map" 
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-black/40 backdrop-blur-sm border border-white/20 hover:bg-rust hover:border-rust hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 text-white/80 shadow-lg cursor-pointer group/map"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/map:scale-110 transition-transform duration-300">
                  <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon>
                  <line x1="9" y1="3" x2="9" y2="18"></line>
                  <line x1="15" y1="6" x2="15" y2="21"></line>
                </svg>
              </button>

              {/* CCTV Button */}
              {m.cctv && (
                <button 
                  onClick={() => setSelectedCctvMonument(m.name)}
                  data-tip="CCTV Cameras" 
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-black/40 backdrop-blur-sm border border-white/20 hover:bg-rust hover:border-rust hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 text-white/80 shadow-lg cursor-pointer group/cctv"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/cctv:rotate-12 transition-transform duration-300">
                    <path d="M16.75 12h3.632a1 1 0 0 1 .894 1.447l-2.034 4.069a1 1 0 0 1-1.708.134l-2.124-2.97"></path>
                    <path d="M17.106 9.053a1 1 0 0 1 .447 1.341l-3.106 6.211a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.92 2.92 0 0 1 3.92-1.3z"></path>
                    <path d="M2 19h3.76a2 2 0 0 0 1.8-1.1L9 15"></path>
                    <path d="M2 21v-4"></path>
                    <path d="M7 9h.01"></path>
                  </svg>
                </button>
              )}
            </div>

            {/* Content Container pushed to bottom */}
            <div className="relative z-20 h-full flex flex-col justify-end p-6">
              
              {/* Permanent Header (Title) */}
              <div className="shrink-0 mb-4 group-hover:translate-y-[-8px] transition-transform duration-500 ease-[cubic-bezier(0.2,1,0.2,1)]">
                <div className="flex items-center gap-2 mb-2 drop-shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-rust shadow-[0_0_8px_rgba(206,66,43,0.6)]"></span>
                  <span className="text-[10px] font-medium tracking-widest text-white/90 uppercase">{m.tier}</span>
                </div>
                <h2 className="text-3xl font-bold text-white font-display uppercase tracking-wide leading-tight drop-shadow-xl">
                  {m.name}
                </h2>
              </div>

              {/* Expandable Drawer (Grid trick) */}
              <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.2,1,0.2,1)]">
                <div className="overflow-hidden">
                  
                  {/* Drawer Content */}
                  <div className="flex flex-col space-y-5 pt-4 border-t border-white/10">
                    
                    {/* Access Row & Blueprints */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-gray-300 text-[10px] font-display uppercase tracking-widest mb-3">Access Required</h3>
                        <div className="flex flex-wrap gap-2 items-center">
                          {m.cardsNeeded.length > 0 ? (
                            m.cardsNeeded.map((c, i) => renderKeycard(c, i))
                          ) : (
                            <div className="flex items-center h-11" data-tip="Cardless">
                              <span className="text-white/60 text-xs font-light italic">Cardless</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {(m.bpFrags.length > 0 || m.advBp.length > 0) && (
                        <div className="text-right">
                          <h3 className="text-gray-300 text-[10px] font-display uppercase tracking-widest mb-3">Blueprints</h3>
                          <div className="flex flex-wrap gap-2 justify-end items-center">
                            {m.bpFrags.map((b) => renderItemIcon(b.name, b.count, 'bp'))}
                            {m.advBp.map((b) => renderItemIcon(b.name, b.count, 'bp'))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Infrastructure */}
                    <div className="pt-3 border-t border-white/5">
                      <h3 className="text-gray-300 text-[10px] font-display uppercase tracking-widest mb-3">Facilities & Transport</h3>
                      <div className="flex flex-wrap gap-2">
                        {m.utilities.length === 0 && m.vehicles.length === 0 && (
                          <span className="text-white/60 text-xs font-light italic">Barren</span>
                        )}
                        {m.utilities.map((u) => renderItemIcon(u.name, u.count, 'utility'))}
                        {m.vehicles.map((v) => renderItemIcon(v.name, v.count, 'vehicle'))}
                      </div>
                    </div>

                    {/* Footer / Actions */}
                    <div className="pt-3">
                      <button 
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/5 text-white/50 border border-white/10 hover:bg-rust/20 hover:text-rust hover:border-rust/50 cursor-pointer transition-all font-display tracking-wider uppercase text-xs backdrop-blur-sm"
                        data-tip="Video guide coming soon"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
                          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                        </svg>
                        <span>Video Guide <span className="opacity-70 ml-1 font-mono text-[9px]">(SOON)</span></span>
                      </button>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </article>
        ))}
      </div>

      {filteredMonuments.length === 0 && (
          <div className="col-span-full py-20 text-center border border-white/5 rounded-2xl bg-white/[0.02]">
            <p className="text-text-dim text-lg">No monuments found matching your search.</p>
          </div>
        )}
      {selectedCctvMonument && (
        <CctvPopup
          monumentName={selectedCctvMonument}
          onClose={() => setSelectedCctvMonument(null)}
        />
      )}
    </div>
  )
}

/**
 * Search + tier filter in the URL (`?q=oil&tier=T3`) so a filtered view is
 * shareable. `history: 'replace'` keeps typing out of the back-button stack, and
 * `clearOnDefault` drops params at their default so an untouched page stays on a
 * clean `/guides/monuments`.
 */
function MonumentsWithUrlState() {
  const [{ q, tier }, setView] = useQueryStates(
    {
      q: parseAsString.withDefault(''),
      tier: parseAsStringLiteral(TIER_FILTERS).withDefault('All'),
    },
    { history: 'replace', clearOnDefault: true },
  )

  return (
    <MonumentsView
      search={q}
      filter={tier}
      onSearch={(value) => setView({ q: value })}
      onFilter={(value) => setView({ tier: value })}
    />
  )
}

export function MonumentsGuide() {
  // The fallback renders the same view at its default state, so the heading and
  // the full monument list are in the prerendered HTML for crawlers; the client
  // swaps in the URL-filtered view on hydration.
  return (
    <Suspense fallback={<MonumentsView search="" filter="All" />}>
      <MonumentsWithUrlState />
    </Suspense>
  )
}
