
'use client';

import { useState } from 'react';
import { getImagePath, getDisplayName } from '@/lib/data/monuments-data';
import type { Monument } from '@/lib/types';

type Props = { monument: Monument; };

export function MonumentSpawns({ monument }: Props) {
  const rawTiers = monument.tier ? monument.tier.split('/') : [];
  const availableTiers = rawTiers.map((t) => t.replace('T', ''));
  const hasTierVariants = (monument.spawns || []).some((s) => s.onlyInTier);
  const hasMultipleTiers = availableTiers.length > 1 && hasTierVariants;
  const [activeTier, setActiveTier] = useState<string>(hasMultipleTiers ? availableTiers[0] : '');

  const availableVariants = monument.variants || [];
  const hasVariants = availableVariants.length > 0;
  const [activeVariant, setActiveVariant] = useState<string>(hasVariants ? availableVariants[0] : '');

  const renderItemCard = (item: any, key: React.Key, isSmall: boolean = false) => {
    const imgPath = getImagePath(item.icon) || '';
    const displayName = item.label || getDisplayName(item.icon);
    
    return (
      <div key={key} className={`group relative flex flex-col bg-panel border border-white/5 rounded-2xl overflow-hidden shadow-xl hover:border-rust/40 hover:shadow-[0_8px_30px_rgba(207,87,31,0.25)] transition-all duration-500 aspect-square shrink-0 flex-none ${isSmall ? 'w-[130px] sm:w-[140px]' : 'w-[160px] sm:w-[180px]'}`}>
        
        {/* Image Container */}
        <div className="absolute inset-0 flex items-center justify-center p-4 pb-12 transition-all duration-500 group-hover:scale-110 group-hover:blur-[2px] group-hover:opacity-30">
          {imgPath ? (
            <img src={imgPath} alt={displayName} className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]" />
          ) : (
            <span className="text-white/20 text-4xl">?</span>
          )}
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Text Container */}
        <div className="relative z-20 h-full flex flex-col justify-end p-4 text-center">
          <div className="shrink-0 group-hover:translate-y-[-4px] transition-transform duration-500 ease-[cubic-bezier(0.2,1,0.2,1)]">
            <span className="text-2xl font-bold text-white drop-shadow-md font-display tracking-wider">
              {item.chance ? item.chance : `×${item.count || 1}`}
            </span>
          </div>
          
          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.2,1,0.2,1)]">
            <div className="overflow-hidden">
              <div className="pt-2 border-t border-rust/30 mt-2 flex flex-col">
                <span className="text-xs font-display uppercase tracking-widest text-rust leading-tight block mb-1">{displayName}</span>
                {item.respawn && (
                  <span className="text-[10px] text-white/70 font-sans leading-tight"><strong className="text-white/40 uppercase tracking-widest text-[9px] mr-1">Respawn:</strong> {item.respawn}</span>
                )}
                {item.text && (
                  <span className="text-[10px] text-white/70 font-sans leading-tight mt-0.5">{item.text}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCardGroup = (items: any[]) => {
    if (items.length === 0) return null;
    
    const filterFn = (c: any) => {
      if (hasMultipleTiers && activeTier && c.onlyInTier && c.onlyInTier !== activeTier) return false;
      if (hasVariants && activeVariant && c.onlyInVariant && c.onlyInVariant !== activeVariant) return false;
      return true;
    };
    
    const guaranteed = items.filter((c: any) => filterFn(c) && (!c.variants || c.variants.length === 0));
    const randomized = items.filter((c: any) => filterFn(c) && (c.variants && c.variants.length > 0));

    if (guaranteed.length === 0 && randomized.length === 0) return null;

    return (
      <div className="flex flex-col gap-10 w-full">
        {guaranteed.length > 0 && (
          <div className="flex flex-wrap items-end gap-x-10 gap-y-8 w-full">
            {guaranteed.map((c, i) => renderItemCard(c, `g-${i}`))}
          </div>
        )}
        
        {randomized.length > 0 && (
          <div className="flex flex-wrap items-end gap-x-10 gap-y-8 w-full">
            {randomized.map((group, groupIdx) => {
              const groupCards = group.variants!.map((v: any) => ({
                ...group,
                label: getDisplayName(v.name),
                icon: v.name,
                chance: v.chance,
                variants: undefined
              }));

              return (
                <div key={`random-group-${groupIdx}`} className="relative flex flex-col w-full xl:w-auto mt-2 xl:mt-0 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-rust/5 before:to-transparent before:opacity-0 before:pointer-events-none before:rounded-2xl">
                  <div className="flex items-center gap-3 pt-2 pl-1 pr-2 w-full mb-4">
                    <span className="text-xs font-display uppercase tracking-[0.2em] text-rust drop-shadow-md flex items-center whitespace-nowrap">
                      RANDOMIZED
                      <span className="ml-2.5 px-1.5 py-0.5 rounded border border-rust/20 bg-rust/10 text-white font-sans font-bold text-[10px] tracking-widest drop-shadow-sm">×{group.count} SPAWNS</span>
                    </span>
                    <div className="h-px bg-gradient-to-r from-rust/50 to-transparent flex-1 opacity-70 min-w-[40px]" />
                  </div>
                  
                  <div className="flex flex-wrap gap-6">
                    {groupCards.map((crate: any, idx: number) => renderItemCard(crate, `rg-${groupIdx}-c-${idx}`, true))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const legacyCrates = monument.lootDetails ? [
    { key: "eliteCrates", label: "Elite Crate", icon: "elite crate" },
    { key: "militaryCrates", label: "Military Crate", icon: "military crate" },
    { key: "regularCrates", label: "Normal Crate", icon: "normal crate" },
    { key: "basicCrates", label: "Basic Crate", icon: "basic crate" },
    { key: "barrels", label: "Loot Barrel", icon: "loot barrel" },
  ].map(({ key, label, icon }) => {
    const count = monument.lootDetails![key as keyof typeof monument.lootDetails];
    return count ? { label, count, icon, respawn: undefined, text: undefined, variants: undefined } : null;
  }).filter((c): c is NonNullable<typeof c> => c !== null) : [];

  const spawnCrates = (monument.spawns || [])
    .filter((s: any) => s.name.toLowerCase().includes("crate") || s.name.toLowerCase().includes("barrel"))
    .map((s: any) => ({
      label: getDisplayName(s.name),
      count: s.count || 1,
      icon: s.name,
      respawn: s.respawn,
      text: s.text,
      variants: s.variants, 
      onlyInTier: s.onlyInTier,
      onlyInVariant: s.onlyInVariant
    }));

  const allCrates = [...legacyCrates, ...spawnCrates];
  
  const otherSpawns = (monument.spawns || [])
    .filter((s: any) => !s.name.toLowerCase().includes("crate") && !s.name.toLowerCase().includes("barrel"))
    .map((s: any) => ({
      label: getDisplayName(s.name),
      count: s.count || 1,
      icon: s.name,
      respawn: s.respawn,
      text: s.text,
      variants: s.variants,
      onlyInTier: s.onlyInTier,
      onlyInVariant: s.onlyInVariant
    }));

  const visibleUtilities = (monument.utilities || []).filter((u: any) => {
    if (hasVariants && activeVariant && u.onlyInVariant && u.onlyInVariant !== activeVariant) return false;
    return true;
  });

  return (
    <div className="flex flex-col gap-12 w-full">
      <div className="flex flex-wrap gap-4 items-center self-start">
        {hasMultipleTiers && (
          <div className="flex bg-panel-2 border border-border p-1 rounded-lg">
            {availableTiers.map((t: string) => (
              <button
                key={t}
                onClick={() => setActiveTier(t)}
                className={`px-4 py-1.5 rounded-md text-sm font-bold tracking-widest uppercase transition-all ${
                  activeTier === t 
                    ? 'bg-rust text-white shadow-[0_0_15px_rgba(207,87,31,0.3)]' 
                    : 'text-text-dim hover:text-white hover:bg-white/5'
                }`}
              >
                Tier {t}
              </button>
            ))}
          </div>
        )}
        
        {hasVariants && (
          <div className="flex bg-panel-2 border border-border p-1 rounded-lg">
            {availableVariants.map((v: string) => (
              <button
                key={v}
                onClick={() => setActiveVariant(v)}
                className={`px-4 py-1.5 rounded-md text-sm font-bold tracking-widest uppercase transition-all ${
                  activeVariant === v 
                    ? 'bg-rust text-white shadow-[0_0_15px_rgba(207,87,31,0.3)]' 
                    : 'text-text-dim hover:text-white hover:bg-white/5'
                }`}
              >
                Variant {v}
              </button>
            ))}
          </div>
        )}
      </div>

      {allCrates.length > 0 ? renderCardGroup(allCrates) : (
        <p className="text-text-dim italic">Specific crate counts are currently being verified for this monument.</p>
      )}

      {otherSpawns.length > 0 && (
        <section>
          <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-3">
            <span className="w-1 h-6 bg-rust rounded-full"></span>
            Spawn
          </h2>
          {renderCardGroup(otherSpawns)}
        </section>
      )}

      {visibleUtilities.length > 0 && (
        <section>
          <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-3">
            <span className="w-1 h-6 bg-rust rounded-full"></span>
            Utilities
          </h2>
          <div className="flex flex-wrap gap-4 items-end">
            {visibleUtilities.map((u: any, idx: number) => {
              const imgPath = getImagePath(u.name);
              return (
                <div key={`util-${idx}`} className="flex flex-col items-center gap-1">
                  <div className="relative w-[130px] sm:w-[140px] aspect-square bg-panel border border-white/5 rounded-2xl flex items-center justify-center p-4 shadow-xl">
                    {imgPath
                      ? <img src={imgPath} alt={u.name} className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]" />
                      : <span className="text-white/30 text-xs font-display uppercase text-center leading-tight">{getDisplayName(u.name)}</span>
                    }
                  </div>
                  <span className="text-sm font-bold text-white font-display tracking-wider">
                    {u.count > 1 ? `×${u.count}` : getDisplayName(u.name)}
                  </span>
                  {u.count > 1 && (
                    <span className="text-[10px] text-white/50 font-display uppercase tracking-widest -mt-0.5">{getDisplayName(u.name)}</span>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {(monument.mining || []).length > 0 && (
        <section>
          <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-3">
            <span className="w-1 h-6 bg-rust rounded-full"></span>
            Mining
          </h2>
          <div className="flex flex-col gap-10 w-full">
            {monument.mining!.map((m, idx) => (
              <div key={`mining-${idx}`} className="flex flex-col xl:flex-row items-center xl:items-start gap-8 w-full p-6 bg-panel-2 rounded-2xl border border-white/5">
                
                {/* Input */}
                <div className="flex flex-col items-center gap-4 shrink-0">
                  <span className="text-xs font-display uppercase tracking-widest text-rust">Cost</span>
                  {renderItemCard({ label: getDisplayName(m.input.name), icon: m.input.name, count: m.input.count }, `m-in-${idx}`, true)}
                </div>

                {/* Arrow / Time */}
                <div className="flex flex-col items-center justify-center pt-8 xl:pt-14 shrink-0">
                  <div className="flex items-center gap-2 text-text-dim">
                    <div className="h-px w-8 bg-text-dim/30"></div>
                    <span className="text-sm font-bold font-display uppercase tracking-widest text-rust">{m.time}</span>
                    <div className="h-px w-8 bg-text-dim/30"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </div>
                </div>

                {/* Outputs */}
                <div className="flex flex-col items-center xl:items-start gap-4 w-full">
                  <span className="text-xs font-display uppercase tracking-widest text-rust">Yield (Choose One)</span>
                  <div className="flex flex-wrap justify-center xl:justify-start gap-x-10 gap-y-8 w-full">
                    {m.outputs.map((out, outIdx) => (
                      <div key={`m-out-${idx}-${outIdx}`} className="relative flex items-center">
                        {outIdx > 0 && (
                          <div className="absolute -left-6 xl:-left-7 top-1/2 -translate-y-1/2 text-text-dim/50 font-display font-bold text-xl italic uppercase">OR</div>
                        )}
                        {renderItemCard({ label: getDisplayName(out.name), icon: out.name, chance: out.chance || `×${out.count}`, count: out.count }, `m-out-card-${idx}-${outIdx}`, true)}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
