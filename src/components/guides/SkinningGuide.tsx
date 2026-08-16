'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTooltip } from '../useTooltip'
import { SKINNING_DATA } from '@/lib/data/skinning-data'
import type { SkinningTarget, SkinningData } from '@/lib/data/skinning-data'
import { RecycleImg } from '../recycling/RecycleImg'

const TARGETS = Object.keys(SKINNING_DATA) as SkinningTarget[]

function getResourceImage(name: string): string {
  const map: Record<string, string> = {
    "Raw Bear Meat": "bearmeat.png",
    "Raw Big Cat Meat": "bigcatmeat.raw.png",
    "Raw Pork": "pork.raw.png",
    "Raw Chicken Breast": "chicken.raw.png",
    "Raw Crocodile Meat": "crocodilemeat.raw.png",
    "Raw Deer Meat": "deermeat.raw.png",
    "Raw Fish": "fish.raw.png",
    "Raw Horse Meat": "horsemeat.raw.png",
    "Raw Human Meat": "humanmeat.raw.png",
    "Raw Snake Meat": "snakemeat.raw.png",
    "Raw Wolf Meat": "wolfmeat.raw.png",
    "Animal Fat": "fat.animal.png",
    Cloth: "cloth.png",
    Leather: "leather.png",
    "Bone Fragments": "bone.fragments.png",
    "Head Bag": "head.bag.png",
    Skull: "skull.human.png",
    "Wolf Skull": "skull.wolf.png",
    "Snake Venom": "venom.snake.png",
  }
  const mapped = map[name]
  if (mapped) return `/images/${mapped}`
  return `/images/${name.toLowerCase().replace(/ /g, ".")}.png`
}

function getToolImage(name: string): string {
  const map: Record<string, string> = {
    "Skinning Knife": "knife.skinning.png",
    "Bone Knife": "knife.bone.png",
    "Combat Knife": "knife.combat.png",
    Hatchet: "hatchet.png",
    "Stone Hatchet": "stonehatchet.png",
    Machete: "machete.png",
    Chainsaw: "chainsaw.png",
    "Salvaged Axe": "axe.salvaged.png",
    Pickaxe: "pickaxe.png",
    "Stone Pickaxe": "stone.pickaxe.png",
    "Salvaged Icepick": "icepick.salvaged.png", // corrected
    Rock: "rock.png",
    "Salvaged Hammer": "hammer.salvaged.png",
    "Salvaged Cleaver": "salvaged.cleaver.png",
    Mace: "mace.png",
    Longsword: "longsword.png",
    "Salvaged Sword": "salvaged.sword.png",
  }
  const mapped = map[name]
  if (mapped) return `/images/${mapped}`
  return `/images/${name.toLowerCase().replace(/ /g, ".")}.png`
}

function getTargetImage(target: string): string {
  const map: Record<string, string> = {
    Bear: "bear.png",
    Boar: "boar.png",
    Chicken: "chicken.png",
    Crocodile: "crocodile.png",
    Horse: "horse.png",
    Newman: "skull.human.png",
    Panther: "panther.png",
    "Polar Bear": "polar.bear.png",
    Scientist: "scientist.png",
    Shark: "shark.png",
    Snake: "snake.png",
    Stag: "stag.png",
    Tiger: "tiger.png",
    Wolf: "wolf.png",
  }
  return `/images/${map[target] || "unknown.png"}`
}

function SkinningCard({ target, data, idx }: { target: SkinningTarget, data: SkinningData[], idx: number }) {
  const [selectedTool, setSelectedTool] = useState<SkinningData | null>(null)

  return (
    <article 
      className="group relative flex flex-col bg-surface border border-transparent rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.8)] hover:border-rust/40 hover:shadow-[0_12px_40px_rgba(207,87,31,0.25)] transition-all duration-500 animate-fade-in-up h-[480px]"
      style={{ animationDelay: `${(idx % 10) * 50}ms`, animationFillMode: 'both' }}
      onMouseLeave={() => setSelectedTool(null)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-surface to-black/50 group-hover:opacity-100 transition-all duration-700 ease-out" />
      
      <div className="absolute inset-0 flex items-center justify-center pb-20 opacity-100 group-hover:opacity-50 transition-all duration-700 ease-out group-hover:scale-125 group-hover:blur-sm transform origin-center">
        <RecycleImg src={getTargetImage(target)} alt={target} width={200} height={200} className="object-contain" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

      <div className="relative z-20 h-full flex flex-col p-6">
        
        {/* Spacer that shrinks to 0 on hover, pushing content to the top */}
        <div className="flex-grow group-hover:flex-grow-0 transition-all duration-500 ease-[cubic-bezier(0.2,1,0.2,1)] basis-full group-hover:basis-0"></div>

        <div className="shrink-0 mb-4 transition-transform duration-500 ease-[cubic-bezier(0.2,1,0.2,1)]">
          <h2 className="text-3xl font-bold text-white font-display uppercase tracking-wide leading-tight drop-shadow-xl">
            {target}
          </h2>
        </div>

        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.2,1,0.2,1)]">
          <div className="overflow-hidden">
            <div className="pt-4 border-t border-white/10 grid">
              
              {/* Tool Grid (Step 1) */}
              <div className={`col-start-1 row-start-1 flex flex-col transition-all duration-300 ${selectedTool ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
                <h3 className="text-white text-[14px] font-bold font-display uppercase tracking-[0.15em] mb-4 drop-shadow-md">Select a Tool</h3>
                <div className="grid grid-cols-5 gap-3 pb-2">
                  {data.map((t, i) => (
                    <button 
                      key={i} 
                      onClick={() => setSelectedTool(t)}
                      className="aspect-square flex items-center justify-center hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] transition-all cursor-pointer"
                      data-tip={t.tool}
                    >
                      <RecycleImg src={getToolImage(t.tool)} alt={t.tool} width={42} height={42} className="object-contain drop-shadow-md" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Tool Detail (Step 2) */}
              <div className={`col-start-1 row-start-1 flex flex-col transition-all duration-300 ${selectedTool ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
                {selectedTool && (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setSelectedTool(null); }}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/20 text-white/60 hover:text-white transition-colors"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <div className="flex items-center gap-3">
                          <RecycleImg src={getToolImage(selectedTool.tool)} alt={selectedTool.tool} width={28} height={28} className="object-contain drop-shadow" />
                          <h3 className="text-white text-sm font-display uppercase tracking-wider">{selectedTool.tool}</h3>
                        </div>
                      </div>
                      <div className="text-[11px] font-mono text-white/40">{selectedTool.time}</div>
                    </div>
                    
                    <div className="flex flex-col gap-3 pb-2">
                      {selectedTool.resources.map((r, ri) => (
                        <div key={ri} className="flex items-center justify-between bg-black/40 px-4 py-3 rounded-lg border border-white/5">
                          <div className="flex items-center gap-3">
                            <RecycleImg src={getResourceImage(r.name)} alt={r.name} width={24} height={24} className="object-contain" />
                            <span className="text-[13px] text-white/80 font-medium">{r.name}</span>
                          </div>
                          <span className="text-base text-white font-mono font-bold tracking-wide">{r.quantity}</span>
                        </div>
                      ))}
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

export function SkinningGuide() {
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
        <span className="text-rust font-medium">Skinning</span>
      </div>

      {/* Hero Section */}
      <header className="pb-4 mb-8 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-[linear-gradient(to_right,rgba(255,255,255,0.2),transparent)] animate-fade-in-up">
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6 text-text-bright leading-none font-display uppercase">
              The Ultimate <span className="text-rust">Skinning</span> Guide
            </h1>
            <p className="text-2xl text-rust font-light tracking-wide max-w-3xl leading-relaxed font-display uppercase">
              Yield rates for harvesting animals and entities
            </p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TARGETS.map((target, idx) => (
          <SkinningCard key={target} target={target} data={SKINNING_DATA[target]} idx={idx} />
        ))}
      </div>
    </div>
  )
}
