import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { monumentsData, getImagePath, getDisplayName } from '@/lib/data/monuments-data'
import { MonumentSpawns } from '@/components/guides/MonumentSpawns'

type Props = {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return monumentsData.map((m) => ({
    id: m.name.toLowerCase().replace(/'/g, '').replace(/[^a-z0-9]+/g, '-'),
  }))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const monument = monumentsData.find(
    (m) => m.name.toLowerCase().replace(/'/g, '').replace(/[^a-z0-9]+/g, '-') === params.id
  )

  if (!monument) return { title: 'Not Found' }

  return {
    title: `${monument.name} Guide | RustTools`,
    description: monument.description || `Loot and layout guide for ${monument.name} in Rust.`,
  }
}

export default async function MonumentPage(props: Props) {
  const params = await props.params
  const monument = monumentsData.find(
    (m) => m.name.toLowerCase().replace(/'/g, '').replace(/[^a-z0-9]+/g, '-') === params.id
  )

  if (!monument) return notFound()

  const bgImage = `/images/monuments/${monument.name.toLowerCase().replace(/'/g, '').replace(/[^a-z0-9]+/g, '.')}.webp`

  return (
    <div className="w-full max-w-[1400px] mx-auto text-text-bright font-sans pb-20">
      {/* Hero Header with Background */}
      <div className="relative h-[400px] md:h-[450px] w-full flex items-end mt-0 mb-8 rounded-2xl overflow-hidden before:content-[''] before:absolute before:top-0 before:inset-x-0 before:h-0.5 before:bg-[linear-gradient(90deg,transparent_0%,var(--rust)_15%,var(--rust)_85%,transparent_100%)] before:z-20 before:pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${bgImage})`,
            WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 100%)',
            maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 100%)'
          }}
        >
          {/* Additional bottom gradient to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-transparent" />
        </div>
        
        <div className="relative z-10 w-full px-6 md:px-10 pb-10 flex flex-col md:flex-row justify-between md:items-end gap-6">
          <div>
            {/* Breadcrumbs */}
            <div className="text-sm font-display uppercase text-text-dim mb-6 flex items-center space-x-2 tracking-widest">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/guides/monuments" className="hover:text-white transition-colors">Monuments</Link>
              <span>/</span>
              <span className="text-rust">{monument.name}</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-5">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white font-display uppercase drop-shadow-xl">
                {monument.name}
              </h1>
              
              <div className="flex flex-wrap items-center gap-2 mt-1 md:mt-2">
                {monument.features?.isSafezone && (
                  <span className="px-2.5 py-1 rounded bg-rust/20 border border-rust text-rust text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(207,87,31,0.5)]">
                    Safezone
                  </span>
                )}
                <span className="px-2.5 py-1 rounded bg-rust/20 border border-rust text-rust text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(207,87,31,0.5)]">
                  {monument.tier.split('/').map((t) => t.match(/^\d+$/) ? `T${t}` : t).join('/')}
                </span>
                {monument.cardsNeeded.length === 0 && (!monument.puzzle?.bring || !monument.puzzle.bring.some(item => item.name.toLowerCase().includes('keycard'))) && (
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/70 text-xs font-bold uppercase tracking-widest">
                    Cardless
                  </span>
                )}
              </div>
            </div>

            {monument.features && (
              <div className="mt-4 flex flex-col gap-3">
                {/* Stats Row */}
                <div className="flex flex-wrap items-center gap-6 text-sm font-medium">
                  <div className={`flex items-center gap-2.5 transition-all ${(monument.features.scientists ?? 0) > 0 ? "text-white/90" : "text-white/30"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={(monument.features.scientists ?? 0) > 0 ? "text-rust" : "text-white/30"}>
                      <circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><path d="M8 20v2h8v-2"/><path d="m12.5 17-.5-1-.5 1h1z"/><path d="M16 20a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20"/>
                    </svg>
                    <span className={`font-display tracking-widest uppercase text-sm ${(monument.features.scientists ?? 0) === 0 ? "line-through decoration-white/30" : ""}`}>
                      Scientists: <span className={`${(monument.features.scientists ?? 0) > 0 ? "text-rust" : ""} font-bold text-lg`}>{(monument.features.scientists ?? 0) > 0 ? monument.features.scientists : "0"}</span>
                    </span>
                  </div>

                  <div className={`flex items-center gap-2.5 transition-all ${(monument.features.radiation?.max ?? 0) > 0 ? "text-white/90" : "text-white/30"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={(monument.features.radiation?.max ?? 0) > 0 ? "text-rust" : "text-white/30"}>
                      <path d="M12 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5z"/><path d="M12 12V2"/><path d="M12 12 3.3 7"/><path d="m12 12 8.7-5"/>
                    </svg>
                    <span className={`font-display tracking-widest uppercase text-sm ${(monument.features.radiation?.max ?? 0) === 0 ? "line-through decoration-white/30" : ""}`}>
                      Radiation: <span className={`${(monument.features.radiation?.max ?? 0) > 0 ? "text-rust" : ""} font-bold text-lg`}>
                        {(monument.features.radiation?.max ?? 0) > 0 
                          ? `${monument.features.radiation!.median} - ${monument.features.radiation!.max}` 
                          : "None"}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="h-px w-full max-w-lg bg-gradient-to-r from-rust/50 via-white/10 to-transparent my-0.5" />

                {/* Boolean Badges Row */}
                <div className="flex flex-wrap items-center gap-5">
                  {monument.features.isSafezone === false && (
                    <div className="flex items-center gap-1.5 transition-all text-white/30">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      </svg>
                      <span className="text-xs font-bold uppercase tracking-wider line-through decoration-white/30">Safezone</span>
                    </div>
                  )}

                  {monument.features.hasTunnelEntrance !== undefined && (
                    <div className={`flex items-center gap-1.5 transition-all ${
                      monument.features.hasTunnelEntrance ? "text-white" : "text-white/30"
                    }`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 10v9M20 10v9M6 9h12M6 14h12M6 19h12M12 4v5M8 4h8"/>
                      </svg>
                      <span className={`text-xs font-bold uppercase tracking-wider ${!monument.features.hasTunnelEntrance ? "line-through decoration-white/30" : ""}`}>Tunnel Entrance</span>
                    </div>
                  )}

                  {monument.features.hasChinookDropZone !== undefined && (
                    <div className={`flex items-center gap-1.5 transition-all ${
                      monument.features.hasChinookDropZone ? "text-white" : "text-white/30"
                    }`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
                      </svg>
                      <span className={`text-xs font-bold uppercase tracking-wider ${!monument.features.hasChinookDropZone ? "line-through decoration-white/30" : ""}`}>Chinook Drop</span>
                    </div>
                  )}

                  {monument.features.allowsPatrolHeliCrash !== undefined && (
                    <div className={`flex items-center gap-1.5 transition-all ${
                      monument.features.allowsPatrolHeliCrash ? "text-white" : "text-white/30"
                    }`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24M14.83 14.83l4.24 4.24M14.83 9.17l4.24-4.24M14.83 9.17 9.17 14.83M9.17 9.17l5.66 5.66"/>
                      </svg>
                      <span className={`text-xs font-bold uppercase tracking-wider ${!monument.features.allowsPatrolHeliCrash ? "line-through decoration-white/30" : ""}`}>Heli Crash Zone</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Side info inside Hero */}
          <div className="flex flex-col gap-6 pb-2">
            <div className="flex gap-8 items-start">
              {/* Access Required */}
              {((monument.puzzle?.bring && monument.puzzle.bring.length > 0) || (monument.cardsNeeded && monument.cardsNeeded.length > 0)) && (
                <div className="flex flex-col gap-3 border-l-2 border-rust/80 pl-4">
                  <span className="text-xs font-display uppercase tracking-widest text-white/80 leading-none drop-shadow-md">Access Required</span>
                  <div className="flex flex-wrap gap-2 items-center">
                    {monument.puzzle?.bring && monument.puzzle.bring.length > 0 ? (
                      monument.puzzle.bring.map((item, idx) => {
                        const imgPath = getImagePath(item.name)
                        return (
                          <div key={`bring-${idx}`} className="relative" title={item.name}>
                            {imgPath && <img src={imgPath} alt={item.name} className="w-10 h-10 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]" />}
                          </div>
                        )
                      })
                    ) : (
                      monument.cardsNeeded.map((card, idx) => {
                        const cardName = `${card.type} keycard`
                        const imgPath = getImagePath(cardName)
                        return (
                          <div key={`card-${idx}`} className="relative" title={card.name}>
                            {imgPath && <img src={imgPath} alt={cardName} className="w-10 h-10 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]" />}
                          </div>
                        )
                      })
                    )}
                  </div>
                </div>
              )}

            </div>

            {/* Row 2: Collectable & Vehicles */}
            {((monument.collectibles && monument.collectibles.length > 0) || (monument.vehicles && monument.vehicles.length > 0)) && (
              <div className="flex gap-8 items-start">
                {/* Collectable */}
                {monument.collectibles && monument.collectibles.length > 0 && (
                  <div className="flex flex-col gap-3 border-l-2 border-rust/80 pl-4">
                    <span className="text-xs font-display uppercase tracking-widest text-white/80 leading-none drop-shadow-md">Collectable</span>
                    <div className="flex flex-wrap gap-2 items-center">
                      {monument.collectibles.map((c, idx) => {
                        const imgPath = getImagePath(c.name)
                        return (
                          <div key={`collect-${idx}`} className="relative" title={getDisplayName(c.name)}>
                            {imgPath && <img src={imgPath} alt={c.name} className="w-10 h-10 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]" />}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Vehicles */}
                {monument.vehicles && monument.vehicles.length > 0 && (
                  <div className="flex flex-col gap-3 border-l-2 border-rust/80 pl-4">
                    <span className="text-xs font-display uppercase tracking-widest text-white/80 leading-none drop-shadow-md">Vehicles</span>
                    <div className="flex flex-wrap gap-2 items-center">
                      {monument.vehicles.map((v, idx) => {
                        const imgPath = getImagePath(v.name)
                        return (
                          <div key={`vehicle-${idx}`} className="relative" title={getDisplayName(v.name)}>
                            {imgPath && <img src={imgPath} alt={v.name} className="w-10 h-10 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]" />}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full px-6 md:px-10 space-y-12 max-w-7xl mx-auto">
        {/* Main Content Area */}
        <div className="w-full space-y-12">
          {/* Description & Strategy */}
          {(monument.description || monument.strategy) && (
            <section className="bg-panel border border-white/5 p-8 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-3">
                <span className="w-1 h-6 bg-rust rounded-full"></span>
                Overview
              </h2>
              {monument.description && (
                <p className="text-lg text-text-dim leading-relaxed mb-6">
                  {monument.description}
                </p>
              )}
              {monument.strategy && (
                <div className="bg-rust/5 border border-rust/20 rounded-xl p-6">
                  <h3 className="text-sm font-bold text-rust uppercase tracking-widest mb-3">Strategy & Tips</h3>
                  <p className="text-text-bright leading-relaxed">{monument.strategy}</p>
                </div>
              )}
            </section>
          )}          {/* Loot Breakdown */}
          <section>
            <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-3">
              <span className="w-1 h-6 bg-rust rounded-full"></span>
              Loot Potential
            </h2>
            <MonumentSpawns monument={monument} />
          </section>


          {/* Map Placeholder */}
          <section className="bg-panel border border-white/5 p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-3">
              <span className="w-1 h-6 bg-rust rounded-full"></span>
              Monument Map
            </h2>
            <div className="aspect-video w-full bg-surface border border-white/10 rounded-xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0idHJhbnNwYXJlbnQiLz4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSIvPgo8L3N2Zz4=')] opacity-50"></div>
              <p className="text-text-dim uppercase tracking-widest font-display text-xl z-10 flex flex-col items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rust/50 mb-2">
                  <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon>
                  <line x1="9" y1="3" x2="9" y2="18"></line>
                  <line x1="15" y1="6" x2="15" y2="21"></line>
                </svg>
                Detailed Map Coming Soon
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
