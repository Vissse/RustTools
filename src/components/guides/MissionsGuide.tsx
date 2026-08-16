'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTooltip } from '../useTooltip'
import { MISSIONS_DATA, GIVERS } from '@/lib/data/missions-data'
import type { MissionGiver, Mission } from '@/lib/data/missions-data'
import { RecycleImg } from '../recycling/RecycleImg'
import Image from 'next/image'

function getRewardImage(name: string): string {
  const map: Record<string, string> = {
    'Scrap': 'scrap.png',
    'Double Diving Tank': 'diving.tank.png',
    'Basic Ore Tea': 'ore.tea.png',
    'Crossbow': 'crossbow.png',
    'Wooden Arrow': 'arrow.wooden.png',
    'Lumberjack Hoodie': 'lumberjack.hoodie.png',
    'Pants': 'pants.png',
    'Bucket Helmet': 'bucket.helmet.png',
    'Basic Wood Tea': 'wood.tea.png',
    'Permanent Outpost spawn point': 'gift.png',
    'Handmade Fishing Rod': 'fishingrod.handmade.png',
    'Grub': 'grub.png',
    'Basic Harvesting Tea': 'harvestingtea.png',
    'Kayak': 'kayak.png',
    'Paddle': 'paddle.png',
    'Fish Pie': 'pie.fish.png',
    'Jackhammer': 'jackhammer.png',
    'Medical Syringe': 'syringe.medical.png',
    'Pump Shotgun': 'shotgun.pump.png',
    'Buckshot': 'ammo.shotgun.png',
    'Basic Scrap Tea': 'scrap.tea.png',
    'Tier 2 Loot': 'box.wooden.png',
    'Rocket Launcher': 'rocket.launcher.png',
    'High Velocity Rocket': 'ammo.rocket.hv.png',
    'Hatchet': 'hatchet.png',
  }
  const mapped = map[name]
  if (mapped) return `/images/${mapped}`
  return `/images/${name.toLowerCase().replace(/ /g, ".")}.png`
}

function getGiverImage(giver: MissionGiver): string {
  const map: Record<MissionGiver, string> = {
    bandit_camp: '/images/monuments/bandit.camp.webp',
    outpost: '/images/monuments/outpost.webp',
    fishing_village: '/images/monuments/fishing.villages.webp',
    ranch: '/images/monuments/stables.webp',
    floating_city: '/images/monuments/floating.cities.webp',
  }
  return map[giver]
}

function getGiverName(giver: MissionGiver): string {
  const map: Record<MissionGiver, string> = {
    bandit_camp: 'Bandit Camp',
    outpost: 'Outpost',
    fishing_village: 'Fishing Village',
    ranch: 'Ranch & Barn',
    floating_city: 'Floating City',
  }
  return map[giver]
}

function MissionCard({ giver, data, idx }: { giver: MissionGiver, data: Mission[], idx: number }) {
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null)

  return (
    <article 
      className="group relative flex flex-col bg-surface border border-transparent rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.8)] hover:border-rust/40 hover:shadow-[0_12px_40px_rgba(207,87,31,0.25)] transition-all duration-500 animate-fade-in-up h-[480px]"
      style={{ animationDelay: `${(idx % 10) * 50}ms`, animationFillMode: 'both' }}
      onMouseLeave={() => setSelectedMission(null)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-surface to-black/50 group-hover:opacity-100 transition-all duration-700 ease-out" />
      
      <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-50 transition-all duration-700 ease-out group-hover:scale-110 group-hover:blur-sm transform origin-center">
        {/* We use Image here assuming these are monument screenshots. Fallback to generic if missing. */}
        <Image src={getGiverImage(giver)} alt={giver} fill className="object-cover object-center" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

      <div className="relative z-20 h-full flex flex-col p-6">
        
        {/* Spacer that shrinks to 0 on hover, pushing content to the top */}
        <div className="flex-grow group-hover:flex-grow-0 transition-all duration-500 ease-[cubic-bezier(0.2,1,0.2,1)] basis-full group-hover:basis-0"></div>

        <div className="shrink-0 mb-4 transition-transform duration-500 ease-[cubic-bezier(0.2,1,0.2,1)]">
          <h2 className="text-3xl font-bold text-white font-display uppercase tracking-wide leading-tight drop-shadow-xl">
            {getGiverName(giver)}
          </h2>
          <div className="text-rust/80 font-mono text-sm tracking-widest mt-1">
            {data.length} Missions
          </div>
        </div>

        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.2,1,0.2,1)]">
          <div className="overflow-hidden">
            <div className="pt-4 border-t border-white/10 grid">
              
              {/* Mission List (Step 1) */}
              <div className={`col-start-1 row-start-1 flex flex-col transition-all duration-300 ${selectedMission ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
                <h3 className="text-white text-[14px] font-bold font-display uppercase tracking-[0.15em] mb-4 drop-shadow-md">Select a Mission</h3>
                <div className="flex flex-col gap-2 pb-2">
                  {data.map((m, i) => (
                    <button 
                      key={i} 
                      onClick={() => setSelectedMission(m)}
                      className="w-full flex items-center justify-between text-left px-4 py-3 bg-black/40 rounded-lg border border-white/10 hover:border-rust/60 hover:bg-white/5 transition-all"
                    >
                      <span className="text-white/90 font-medium">{m.name}</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/30">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mission Detail (Step 2) */}
              <div className={`col-start-1 row-start-1 flex flex-col transition-all duration-300 ${selectedMission ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
                {selectedMission && (
                  <>
                    <div className="flex items-center gap-4 mb-4">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setSelectedMission(null); }}
                        className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/20 text-white/60 hover:text-white transition-colors"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <div>
                        <h3 className="text-white text-base font-bold font-display tracking-wider leading-tight">{selectedMission.name}</h3>
                        <div className="text-rust/80 text-[11px] font-mono uppercase mt-1 flex items-center gap-1">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          {selectedMission.location}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-4 pb-2">
                      <p className="text-sm text-white/70 leading-relaxed bg-black/20 p-3 rounded-lg border border-white/5">
                        {selectedMission.description}
                      </p>

                      {selectedMission.prerequisites !== 'None — available immediately' && (
                        <div>
                          <div className="text-[10px] font-mono text-white/40 uppercase mb-2 flex items-center gap-2">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                            Prerequisites
                          </div>
                          <div className="text-xs text-rust font-medium bg-rust/10 px-3 py-2 rounded border border-rust/20">
                            {selectedMission.prerequisites}
                          </div>
                        </div>
                      )}
                      
                      <div>
                        <div className="text-[10px] font-mono text-white/40 uppercase mb-2 flex items-center gap-2">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 12 20 22 4 22 4 12" />
                            <rect x="2" y="7" width="20" height="5" />
                            <line x1="12" y1="22" x2="12" y2="7" />
                            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                          </svg>
                          Rewards
                        </div>
                        <div className="flex flex-col gap-2">
                          {selectedMission.rewards.map((r, ri) => (
                            <div key={ri} className="flex items-center justify-between bg-black/40 px-4 py-3 rounded-lg border border-white/5">
                              <div className="flex items-center gap-3">
                                <RecycleImg src={getRewardImage(r.name)} alt={r.name} width={24} height={24} className="object-contain" />
                                <span className="text-[13px] text-white/80 font-medium">{r.name}</span>
                              </div>
                              <span className="text-base text-white font-mono font-bold tracking-wide">{r.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export function MissionsGuide() {
  const tooltip = useTooltip()

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
        <span className="text-rust font-medium">Missions</span>
      </div>

      {/* Hero Section */}
      <header className="pb-4 mb-8 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-[linear-gradient(to_right,rgba(255,255,255,0.2),transparent)] animate-fade-in-up">
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6 text-text-bright leading-none font-display uppercase">
              The Ultimate <span className="text-rust">Missions</span> Guide
            </h1>
            <p className="text-2xl text-rust font-light tracking-wide max-w-3xl leading-relaxed font-display uppercase">
              Take the job. Know the route.
            </p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GIVERS.map((giver, idx) => (
          <MissionCard key={giver} giver={giver} data={MISSIONS_DATA[giver]} idx={idx} />
        ))}
      </div>
    </div>
  )
}
