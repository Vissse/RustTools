"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState, useMemo } from 'react'
import { monumentsData, MonumentCard } from '@/lib/monumentsData'

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

export function MonumentsGuide() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const tiers = ['All', 'T1', 'T2', 'T3', 'Safe Zone', 'Resources', 'Vendor', 'Deep Sea', 'Ocean']

  const filteredMonuments = useMemo(() => {
    return monumentsData.filter(m => {
      const matchSearch = m.name.toLowerCase().includes(search.toLowerCase())
      const matchFilter = filter === 'All' || m.tier === filter
      return matchSearch && matchFilter
    }).sort((a, b) => a.name.localeCompare(b.name))
  }, [search, filter])

  const getTierStyle = (tier: string) => {
    // Solid background for maximum visibility over images
    return 'bg-rust text-white border-rust shadow-[0_2px_10px_rgba(0,0,0,0.5)] font-display'
  }

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
        title={name}
        className="relative group flex items-center justify-center w-12 h-12 transition-all"
      >
        {imgPath ? (
          <Image src={imgPath} alt={name} width={32} height={32} className="object-contain drop-shadow-md" />
        ) : (
          <div>
            <GenericIcon type={typeHint} />
          </div>
        )}
        {count > 1 && (
          <span className="absolute -bottom-1 -right-1 text-rust text-[11px] font-bold font-display drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
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
        title={card.name + (card.logic ? ` (${card.logic})` : '')}
        className="relative group flex items-center justify-center w-12 h-12 transition-all"
      >
        {imgPath && (
          <Image src={imgPath} alt={card.name} width={32} height={32} className="object-contain drop-shadow-md" />
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
    <div className="w-full max-w-[1600px] mx-auto px-6 py-20 text-text font-sans">
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
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-4 text-text-bright leading-none font-display uppercase">
              Monuments <span className="text-rust text-5xl">Database</span>
            </h1>
            <p className="text-xl text-rust font-light tracking-wide max-w-3xl leading-relaxed font-display uppercase">
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
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface border border-white/10 rounded-xl pl-12 pr-4 py-3 text-text-bright focus:outline-none focus:border-rust focus:ring-1 focus:ring-rust transition-all shadow-lg placeholder:text-text-dim/50"
            />
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-12 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        {tiers.map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        {filteredMonuments.map((m, idx) => (
          <article 
            key={m.id} 
            className="group flex flex-col bg-surface border border-white/10 rounded-2xl overflow-hidden shadow-2xl hover:border-rust/40 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-all duration-300"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/5 bg-white/[0.02] relative overflow-hidden">
              {/* Background Image pro Monument */}
              <div 
                className="absolute inset-0 opacity-50 group-hover:opacity-70 transition-all duration-500 group-hover:scale-105 transform origin-center"
                style={{
                  backgroundImage: `url(/images/monuments/${m.name.toLowerCase().replace(/'/g, '').replace(/[^a-z0-9]+/g, '.')}.webp)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
              
              {m.cctv && (
                <Link href={m.cctv} title="CCTV Cameras" className="absolute top-4 right-4 z-20 flex items-center justify-center w-10 h-10 rounded-xl bg-black/40 backdrop-blur-sm border border-white/20 hover:bg-rust hover:border-rust hover:text-white transition-all text-white/80 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16.75 12h3.632a1 1 0 0 1 .894 1.447l-2.034 4.069a1 1 0 0 1-1.708.134l-2.124-2.97"></path>
                    <path d="M17.106 9.053a1 1 0 0 1 .447 1.341l-3.106 6.211a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.92 2.92 0 0 1 3.92-1.3z"></path>
                    <path d="M2 19h3.76a2 2 0 0 0 1.8-1.1L9 15"></path>
                    <path d="M2 21v-4"></path>
                    <path d="M7 9h.01"></path>
                  </svg>
                </Link>
              )}

              <div className="relative z-10">
                <span className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border mb-3 ${getTierStyle(m.tier)}`}>
                  {m.tier}
                </span>
                <h2 className="text-2xl font-bold text-text-bright font-display uppercase tracking-wide leading-tight group-hover:text-rust transition-colors relative z-10">
                  {m.name}
                </h2>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col space-y-6">
              
              {/* Access Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-gray-400 text-xs font-display uppercase tracking-widest mb-3">Access Required</h3>
                  <div className="flex flex-wrap gap-2">
                    {m.cardsNeeded.length > 0 ? (
                      m.cardsNeeded.map((c, i) => renderKeycard(c, i))
                    ) : (
                      <span className="text-text-dim/40 text-sm font-light italic">None</span>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-gray-400 text-xs font-display uppercase tracking-widest mb-3">Lootable Access</h3>
                  <div className="flex flex-wrap gap-2">
                    {m.cardsFound.length > 0 ? (
                      m.cardsFound.map((c, i) => renderKeycard(c, i))
                    ) : (
                      <span className="text-text-dim/40 text-sm font-light italic">None</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Infrastructure */}
              {/* Infrastructure */}
              <div className="pt-4 border-t border-white/5">
                <h3 className="text-gray-400 text-xs font-display uppercase tracking-widest mb-3">Facilities & Transport</h3>
                <div className="flex flex-wrap gap-2">
                  {m.utilities.length === 0 && m.vehicles.length === 0 && (
                    <span className="text-text-dim/40 text-sm font-light italic">Barren</span>
                  )}
                  {m.utilities.map((u) => renderItemIcon(u.name, u.count, 'utility'))}
                  {m.vehicles.map((v) => renderItemIcon(v.name, v.count, 'vehicle'))}
                </div>
              </div>

              {/* Blueprint & Intel Footer */}
              <div className="mt-auto pt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {m.bpFrags.map((b) => renderItemIcon(b.name, b.count, 'bp'))}
                  {m.advBp.map((b) => renderItemIcon(b.name, b.count, 'bp'))}
                </div>
                
                <div className="flex space-x-2">
                </div>
              </div>
            </div>

            {/* Footer / Actions */}
            <div className="p-5 border-t border-white/5 bg-black/20 mt-auto">
              <button 
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-rust/5 text-rust/50 border border-rust/10 cursor-not-allowed transition-all font-display tracking-wider uppercase text-sm"
                title="Video guide coming soon"
                disabled
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0 opacity-50">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
                <span>Video Guide <span className="text-[10px] tracking-widest opacity-70 ml-1">(SOON)</span></span>
              </button>
            </div>
          </article>
        ))}

        {filteredMonuments.length === 0 && (
          <div className="col-span-full py-20 text-center border border-white/5 rounded-2xl bg-white/[0.02]">
            <p className="text-text-dim text-lg">No monuments found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
