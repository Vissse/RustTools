import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { monumentsData, getImagePath, getDisplayName } from '@/lib/monumentsData'

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
        
        <div className="relative z-10 w-full px-6 md:px-10 pb-10">
          {/* Breadcrumbs */}
          <div className="text-sm font-display uppercase text-text-dim mb-6 flex items-center space-x-2 tracking-widest">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/guides/monuments" className="hover:text-white transition-colors">Monuments</Link>
            <span>/</span>
            <span className="text-rust">{monument.name}</span>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <span className="px-2.5 py-1 rounded bg-rust/20 border border-rust text-rust text-xs font-bold uppercase tracking-widest">
              {monument.tier}
            </span>
            {monument.cardsNeeded.length === 0 && (
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/70 text-xs font-bold uppercase tracking-widest">
                Cardless
              </span>
            )}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white font-display uppercase drop-shadow-xl">
            {monument.name}
          </h1>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-12">
          {/* Description & Strategy */}
          <section className="bg-panel border border-white/5 p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-3">
              <span className="w-1 h-6 bg-rust rounded-full"></span>
              Overview
            </h2>
            <p className="text-lg text-text-dim leading-relaxed mb-6">
              {monument.description || "Detailed description coming soon."}
            </p>
            {monument.strategy && (
              <div className="bg-rust/5 border border-rust/20 rounded-xl p-6">
                <h3 className="text-sm font-bold text-rust uppercase tracking-widest mb-3">Strategy & Tips</h3>
                <p className="text-text-bright leading-relaxed">{monument.strategy}</p>
              </div>
            )}
          </section>
          {/* Loot Breakdown */}
          <section className="bg-panel border border-white/5 p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-3">
              <span className="w-1 h-6 bg-rust rounded-full"></span>
              Loot Potential
            </h2>
            
            {monument.lootDetails ? (
              <div className="flex flex-wrap gap-4 items-center">
                {monument.lootDetails.eliteCrates !== undefined && monument.lootDetails.eliteCrates > 0 && (
                  <div className="flex flex-col items-center gap-1.5" title="Elite Crate">
                    <img src={getImagePath('elite crate') || ''} alt="Elite Crate" className="w-8 h-8 object-contain drop-shadow-md" />
                    {monument.lootDetails.eliteCrates > 1 && (
                      <span className="text-white font-bold text-xs bg-white/5 px-1.5 rounded">×{monument.lootDetails.eliteCrates}</span>
                    )}
                  </div>
                )}
                {monument.lootDetails.militaryCrates !== undefined && monument.lootDetails.militaryCrates > 0 && (
                  <div className="flex flex-col items-center gap-1.5" title="Military Crate">
                    <img src={getImagePath('military crate') || ''} alt="Military Crate" className="w-8 h-8 object-contain drop-shadow-md" />
                    {monument.lootDetails.militaryCrates > 1 && (
                      <span className="text-white font-bold text-xs bg-white/5 px-1.5 rounded">×{monument.lootDetails.militaryCrates}</span>
                    )}
                  </div>
                )}
                {monument.lootDetails.regularCrates !== undefined && monument.lootDetails.regularCrates > 0 && (
                  <div className="flex flex-col items-center gap-1.5" title="Normal Crate">
                    <img src={getImagePath('normal crate') || ''} alt="Normal Crate" className="w-8 h-8 object-contain drop-shadow-md" />
                    {monument.lootDetails.regularCrates > 1 && (
                      <span className="text-white font-bold text-xs bg-white/5 px-1.5 rounded">×{monument.lootDetails.regularCrates}</span>
                    )}
                  </div>
                )}
                {monument.lootDetails.basicCrates !== undefined && monument.lootDetails.basicCrates > 0 && (
                  <div className="flex flex-col items-center gap-1.5" title="Basic Crate">
                    <img src={getImagePath('basic crate') || ''} alt="Basic Crate" className="w-8 h-8 object-contain drop-shadow-md" />
                    {monument.lootDetails.basicCrates > 1 && (
                      <span className="text-white font-bold text-xs bg-white/5 px-1.5 rounded">×{monument.lootDetails.basicCrates}</span>
                    )}
                  </div>
                )}
                {monument.lootDetails.barrels !== undefined && monument.lootDetails.barrels > 0 && (
                  <div className="flex flex-col items-center gap-1.5" title="Loot Barrel">
                    <img src={getImagePath('loot barrel') || ''} alt="Loot Barrel" className="w-8 h-8 object-contain drop-shadow-md" />
                    {monument.lootDetails.barrels > 1 && (
                      <span className="text-white font-bold text-xs bg-white/5 px-1.5 rounded">×{monument.lootDetails.barrels}</span>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-text-dim italic">Specific crate counts are currently being verified for this monument.</p>
            )}
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

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Features & Hazards */}
          {monument.features && (
            <div className="bg-panel border border-white/5 p-6 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-3">
                <span className="w-1 h-6 bg-rust rounded-full"></span>
                Profile & Hazards
              </h2>
              <div className="flex flex-col gap-2">
                {monument.features.isSafezone !== undefined && (
                  <div className="flex items-center justify-between bg-surface p-2.5 rounded-lg border border-white/5">
                    <div className="flex items-center gap-2.5 text-text-dim">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      </svg>
                      <span className="text-sm font-medium">Safezone</span>
                    </div>
                    <span className={`text-sm font-bold text-text-bright`}>{monument.features.isSafezone ? "Yes" : "No"}</span>
                  </div>
                )}
                {monument.features.hasTunnelEntrance !== undefined && (
                  <div className="flex items-center justify-between bg-surface p-2.5 rounded-lg border border-white/5">
                    <div className="flex items-center gap-2.5 text-text-dim">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 10v9M20 10v9M6 9h12M6 14h12M6 19h12M12 4v5M8 4h8"/>
                      </svg>
                      <span className="text-sm font-medium">Tunnel Entrance</span>
                    </div>
                    <span className={`text-sm font-bold text-text-bright`}>{monument.features.hasTunnelEntrance ? "Yes" : "No"}</span>
                  </div>
                )}
                {monument.features.hasChinookDropZone !== undefined && (
                  <div className="flex items-center justify-between bg-surface p-2.5 rounded-lg border border-white/5">
                    <div className="flex items-center gap-2.5 text-text-dim">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                        <line x1="12" y1="22.08" x2="12" y2="12"/>
                      </svg>
                      <span className="text-sm font-medium">Chinook Drop</span>
                    </div>
                    <span className={`text-sm font-bold text-text-bright`}>{monument.features.hasChinookDropZone ? "Yes" : "No"}</span>
                  </div>
                )}
                {monument.features.allowsPatrolHeliCrash !== undefined && (
                  <div className="flex items-center justify-between bg-surface p-2.5 rounded-lg border border-white/5">
                    <div className="flex items-center gap-2.5 text-text-dim">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="m4.93 4.93 4.24 4.24M14.83 14.83l4.24 4.24M14.83 9.17l4.24-4.24M14.83 9.17 9.17 14.83M9.17 9.17l5.66 5.66"/>
                      </svg>
                      <span className="text-sm font-medium">Heli Crash Zone</span>
                    </div>
                    <span className={`text-sm font-bold text-text-bright`}>{monument.features.allowsPatrolHeliCrash ? "Yes" : "No"}</span>
                  </div>
                )}
                {monument.features.scientists !== undefined && (
                  <div className="flex items-center justify-between bg-surface p-2.5 rounded-lg border border-white/5">
                    <div className="flex items-center gap-2.5 text-text-dim">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="12" r="1"/>
                        <circle cx="15" cy="12" r="1"/>
                        <path d="M8 20v2h8v-2"/>
                        <path d="m12.5 17-.5-1-.5 1h1z"/>
                        <path d="M16 20a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20"/>
                      </svg>
                      <span className="text-sm font-medium">Scientists</span>
                    </div>
                    <span className="text-sm font-bold text-text-bright">{monument.features.scientists}</span>
                  </div>
                )}
                {monument.features.radiation && (
                  <div className="flex items-center justify-between bg-surface p-2.5 rounded-lg border border-white/5">
                    <div className="flex items-center gap-2.5 text-text-dim">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5z"/>
                        <path d="M12 12V2"/>
                        <path d="M12 12 3.3 7"/>
                        <path d="m12 12 8.7-5"/>
                      </svg>
                      <span className="text-sm font-medium">Radiation Level</span>
                    </div>
                    <span className="text-sm font-bold text-text-bright">{monument.features.radiation.median} - {monument.features.radiation.max}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Keycards Panel */}
          <div className="bg-panel border border-white/5 p-6 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-3">
              <span className="w-1 h-6 bg-rust rounded-full"></span>
              Access Required
            </h2>
            {monument.puzzle && monument.puzzle.bring.length > 0 ? (
              <div className="flex flex-wrap gap-4 items-center">
                {monument.puzzle.bring.map((item, idx) => {
                  const imgPath = getImagePath(item.name)
                  return (
                    <div key={`bring-${idx}`} className="flex flex-col items-center gap-1.5" title={item.name}>
                      {imgPath ? (
                        <img src={imgPath} alt={item.name} className="w-8 h-8 object-contain drop-shadow-md" />
                      ) : (
                        <span className="w-8 h-8 flex items-center justify-center text-text-dim">-</span>
                      )}
                      {item.count > 1 && (
                        <span className="text-white font-bold text-xs bg-white/5 px-1.5 rounded">×{item.count}</span>
                      )}
                    </div>
                  )
                })}

              </div>
            ) : monument.cardsNeeded.length > 0 ? (
              <div className="flex flex-wrap gap-4 items-center">
                {monument.cardsNeeded.map((card, idx) => {
                  const cardName = `${card.type} keycard`
                  const imgPath = getImagePath(cardName)
                  return (
                    <div key={idx} className="flex flex-col items-center gap-1.5" title={card.name}>
                      {imgPath ? (
                        <img src={imgPath} alt={cardName} className="w-8 h-8 object-contain drop-shadow-md" />
                      ) : (
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center ${card.type === 'green' ? 'bg-green-500/20' : card.type === 'blue' ? 'bg-blue-500/20' : card.type === 'red' ? 'bg-red-500/20' : 'bg-gray-500/20'}`}>
                          <span className={`w-3 h-3 rounded-full ${card.type === 'green' ? 'bg-green-500' : card.type === 'blue' ? 'bg-blue-500' : card.type === 'red' ? 'bg-red-500' : 'bg-gray-500'}`}></span>
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-text-dim text-sm">No items required to enter.</p>
            )}

            <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wider mb-6 mt-8 flex items-center gap-3">
              <span className="w-1 h-6 bg-rust rounded-full"></span>
              Cards Found Inside
            </h2>
            {monument.cardsFound.length > 0 ? (
              <div className="flex flex-col gap-3">
                {monument.cardsFound.map((card, idx) => {
                  const cardName = `${card.type} keycard`
                  const imgPath = getImagePath(cardName)
                  return (
                    <div key={idx} className="flex items-center gap-3 bg-surface p-3 rounded-lg border border-white/5">
                      {imgPath ? (
                        <img src={imgPath} alt={cardName} className="w-8 h-8 object-contain drop-shadow-md" />
                      ) : (
                        <span className={`w-3 h-3 rounded-full ${card.type === 'green' ? 'bg-green-500' : card.type === 'blue' ? 'bg-blue-500' : card.type === 'red' ? 'bg-red-500' : 'bg-gray-500'}`}></span>
                      )}
                      <span className="text-white capitalize">{card.name}</span>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-text-dim text-sm">No keycards spawn here.</p>
            )}
          </div>

          {/* Infrastructure */}
          <div className="bg-panel border border-white/5 p-6 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-3">
              <span className="w-1 h-6 bg-rust rounded-full"></span>
              Usable Entities
            </h2>
            {monument.utilities.length > 0 ? (
              <div className="border border-white/5 rounded-lg overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-surface border-b border-white/5">
                    <tr>
                      <th className="px-4 py-3 font-bold text-white">Entity</th>
                      <th className="px-4 py-3 font-bold text-white w-24">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {monument.utilities.map((u, i) => {
                      const imgPath = getImagePath(u.name)
                      const displayName = getDisplayName(u.name)
                      return (
                        <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-4 py-3 flex items-center gap-4">
                            {imgPath ? (
                              <img src={imgPath} alt={displayName} className="w-8 h-8 object-contain drop-shadow-md" />
                            ) : (
                              <span className="w-8 h-8 flex items-center justify-center text-text-dim">-</span>
                            )}
                            <span className="text-rust capitalize font-medium">{displayName}</span>
                          </td>
                          <td className="px-4 py-3 text-white">x{u.count}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-text-dim text-sm">No usable entities available.</p>
            )}
            
            <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wider mb-6 mt-8 flex items-center gap-3">
              <span className="w-1 h-6 bg-rust rounded-full"></span>
              Collectable
            </h2>
            {monument.collectibles && monument.collectibles.length > 0 ? (
              <div className="border border-white/5 rounded-lg overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-surface border-b border-white/5">
                    <tr>
                      <th className="px-4 py-3 font-bold text-white">Spawn</th>
                      <th className="px-4 py-3 font-bold text-white w-24">Amount</th>
                      <th className="px-4 py-3 font-bold text-white w-32">Respawn</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {monument.collectibles.map((c, i) => {
                      const imgPath = getImagePath(c.name)
                      const displayName = getDisplayName(c.name)
                      return (
                        <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-4 py-3 flex items-center gap-4">
                            {imgPath ? (
                              <img src={imgPath} alt={displayName} className="w-8 h-8 object-contain drop-shadow-md" />
                            ) : (
                              <span className="w-8 h-8 flex items-center justify-center text-text-dim">-</span>
                            )}
                            <span className="text-rust capitalize font-medium">{displayName}</span>
                          </td>
                          <td className="px-4 py-3 text-white">x{c.count}</td>
                          <td className="px-4 py-3 text-text-dim">{c.respawn}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-text-dim text-sm mb-4">No collectibles available.</p>
            )}
            
            <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wider mb-6 mt-8 flex items-center gap-3">
              <span className="w-1 h-6 bg-rust rounded-full"></span>
              Spawn
            </h2>
            {monument.spawns && monument.spawns.length > 0 ? (
              <div className="border border-white/5 rounded-lg overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-surface border-b border-white/5">
                    <tr>
                      <th className="px-4 py-3 font-bold text-white">Entity</th>
                      <th className="px-4 py-3 font-bold text-white w-24">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {monument.spawns.map((s, i) => {
                      const imgPath = getImagePath(s.name)
                      const displayName = getDisplayName(s.name)
                      return (
                        <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-4 py-3 flex items-center gap-4">
                            {imgPath ? (
                              <img src={imgPath} alt={displayName} className="w-8 h-8 object-contain drop-shadow-md" />
                            ) : (
                              <span className="w-8 h-8 flex items-center justify-center text-text-dim">-</span>
                            )}
                            <span className="text-rust capitalize font-medium">{displayName}</span>
                          </td>
                          <td className="px-4 py-3 text-white">{s.count !== undefined ? `x${s.count}` : '-'}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-text-dim text-sm mb-4">No specific spawns available.</p>
            )}
            
            <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wider mb-6 mt-8 flex items-center gap-3">
              <span className="w-1 h-6 bg-rust rounded-full"></span>
              Vehicles
            </h2>
            {monument.vehicles.length > 0 ? (
              <ul className="space-y-3">
                {monument.vehicles.map((v, i) => {
                  const imgPath = getImagePath(v.name)
                  const displayName = getDisplayName(v.name)
                  return (
                    <li key={i} className="flex items-center justify-between text-text-bright bg-surface p-3 rounded-lg border border-white/5">
                      <div className="flex items-center gap-3">
                        {imgPath && <img src={imgPath} alt={displayName} className="w-8 h-8 object-contain drop-shadow-md" />}
                        <span className="capitalize">{displayName}</span>
                      </div>
                      {v.count > 1 && <span className="text-rust font-bold">x{v.count}</span>}
                    </li>
                  )
                })}
              </ul>
            ) : (
              <p className="text-text-dim text-sm">No vehicles spawn here.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
