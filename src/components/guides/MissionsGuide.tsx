'use client'

import { Fragment, Suspense, useMemo } from 'react'
import { useQueryStates, parseAsString, parseAsStringLiteral } from 'nuqs'
import Link from 'next/link'
import { RecycleImg } from '../recycling/RecycleImg'
import { Reveal, Step, Tip } from './GuideComponents'
import {
  GIVER_FILTERS,
  GIVER_GROUPS,
  LINKED_MISSION_COUNT,
  MISSIONS,
  MISSION_FAQ,
  MISSION_COUNT,
  PROGRESSION_CHAINS,
  PROVIDER_COUNT,
  REWARD_ENTRY_COUNT,
  type GiverFilter,
  type Mission,
} from '@/lib/data/missions-data'

const pad = (n: number) => String(n).padStart(2, '0')

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-display text-6xl md:text-7xl leading-none text-rust drop-shadow-[0_0_18px_var(--rust-glow)]">
        {value}
      </span>
      <span className="font-display uppercase tracking-[0.18em] text-text-dim text-base mt-2">
        {label}
      </span>
    </div>
  )
}

function RewardChip({
  name,
  quantity,
  icon,
}: {
  name: string
  quantity?: number
  icon?: string
}) {
  return (
    <li className="flex items-center gap-3 bg-black/30 border border-white/[0.06] rounded-lg px-3 py-2">
      {icon ? (
        <RecycleImg
          src={`/images/${icon}.png`}
          alt=""
          width={26}
          height={26}
          className="w-[26px] h-[26px] object-contain flex-shrink-0"
        />
      ) : (
        <span className="w-[26px] h-[26px] flex-shrink-0 flex items-center justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-rust/70" />
        </span>
      )}
      <span className="text-sm text-text-bright">
        {quantity && quantity > 1 && (
          <span className="font-display text-base text-rust mr-1.5">
            {quantity}
          </span>
        )}
        {name}
      </span>
    </li>
  )
}

function MissionCard({ mission, index }: { mission: Mission; index: number }) {
  return (
    <article className="relative overflow-hidden rounded-2xl bg-[rgba(19,18,16,0.65)] backdrop-blur-[20px] border border-white/[0.06] shadow-[0_16px_40px_rgba(0,0,0,0.4),inset_0_-1px_0_rgba(255,255,255,0.03)] before:content-[''] before:absolute before:top-0 before:inset-x-0 before:h-0.5 before:bg-[linear-gradient(90deg,transparent_0%,var(--rust)_15%,var(--rust)_85%,transparent_100%)] before:opacity-80 flex flex-col p-6 transition-colors duration-300 hover:border-white/[0.14]">
      {/* Index + provider */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <span className="font-display text-4xl leading-none text-text-muted">
          {pad(index + 1)}
        </span>
        <div className="text-right">
          <div className="font-display uppercase tracking-[0.18em] text-[11px] text-text-dim">
            Mission Giver
          </div>
          <div className="font-display uppercase tracking-[0.1em] text-lg text-text-bright leading-tight">
            {mission.provider}
          </div>
        </div>
      </div>

      <h3 className="font-display uppercase text-3xl leading-none text-text-bright tracking-wide">
        {mission.name}
      </h3>
      <div className="flex items-center gap-2 mt-2 text-rust text-sm">
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="flex-shrink-0"
        >
          <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        {mission.location}
      </div>

      <p className="text-text-dim text-base font-light leading-relaxed mt-4">
        {mission.objective}
      </p>

      <div className="mt-6">
        <div className="sec-label">Prerequisites</div>
        {mission.prerequisites.length === 0 ? (
          <p className="text-sm text-text-dim font-light">
            None — available immediately
          </p>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {mission.prerequisites.map((p) => (
              <li
                key={p}
                className="text-xs font-display uppercase tracking-[0.1em] text-rust bg-rust/10 border border-rust/25 rounded px-2.5 py-1"
              >
                {p}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Rewards pinned to the card bottom so cards in a row line up. */}
      <div className="mt-auto pt-6">
        <div className="sec-label">Mission Rewards</div>
        {mission.rewardNote ? (
          <p className="text-sm text-text-bright font-light">
            {mission.rewardNote}
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {mission.rewards?.map((r) => (
              <RewardChip key={r.name} {...r} />
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}

/**
 * The board itself, driven entirely by props so it can render both inside the
 * URL-state wrapper below and as that wrapper's Suspense fallback. The fallback
 * pass is what puts all 17 cards into the statically prerendered HTML — reading
 * search params opts a subtree out of static rendering, so without it a crawler
 * would receive an empty board.
 *
 * Omitting the setters (the fallback case) renders a read-only board.
 */
function MissionBoard({
  query,
  giver,
  onQuery,
  onGiver,
}: {
  query: string
  giver: GiverFilter
  onQuery?: (q: string) => void
  onGiver?: (g: GiverFilter) => void
}) {
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return MISSIONS.filter((m) => {
      if (giver !== 'all' && m.giver !== giver) return false
      if (!q) return true
      // Search covers everything the card shows, so a reward or prerequisite
      // name finds its mission just as well as the mission's own name.
      return [
        m.name,
        m.provider,
        m.location,
        m.objective,
        ...m.prerequisites,
        ...(m.rewards?.map((r) => r.name) ?? []),
        m.rewardNote ?? '',
      ]
        .join(' ')
        .toLowerCase()
        .includes(q)
    })
  }, [query, giver])

  return (
    <section className="section-gap">
      <div className="sec-label">Mission Board</div>
      <h2 className="font-display uppercase text-5xl md:text-6xl leading-none text-text-bright tracking-tight mb-4">
        Choose your <span className="text-rust">next job</span>
      </h2>
      <p className="text-text-dim text-lg font-light leading-relaxed max-w-3xl mb-10">
        Search by mission, location, objective, prerequisite, or reward.
      </p>

      <div className="flex flex-col gap-6 mb-10">
        <div className="flex flex-wrap items-center gap-4 justify-between">
          <label className="relative flex-1 min-w-[260px]">
            <span className="sr-only">Search missions</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim pointer-events-none"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => onQuery?.(e.target.value)}
              readOnly={!onQuery}
              placeholder="Search missions, rewards, or locations"
              className="w-full bg-black/30 border border-white/[0.08] rounded-lg pl-11 pr-4 py-3 text-base text-text-bright placeholder:text-text-muted outline-none transition-colors focus:border-rust/50"
            />
          </label>
          <span className="font-display uppercase tracking-[0.15em] text-text-dim text-base whitespace-nowrap">
            {visible.length} of {MISSION_COUNT} missions
          </span>
        </div>

        <div className="filter-row" style={{ flexWrap: 'wrap' }}>
          <button
            className={`filter-pure-text ${giver === 'all' ? 'active' : ''}`}
            onClick={() => onGiver?.('all')}
          >
            All givers
          </button>
          <div className="filter-separator" />
          {GIVER_GROUPS.map((g, idx) => (
            <Fragment key={g.id}>
              <button
                className={`filter-pure-text ${giver === g.id ? 'active' : ''}`}
                onClick={() => onGiver?.(g.id)}
              >
                {g.label}
              </button>
              {idx < GIVER_GROUPS.length - 1 && (
                <div className="filter-separator" />
              )}
            </Fragment>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="border border-dashed border-border-hi rounded-2xl py-24 px-12 text-center">
          <p className="font-display uppercase tracking-[0.2em] text-text-dim text-xl">
            No missions match that search
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {visible.map((m) => (
            <MissionCard
              key={m.name}
              mission={m}
              // Numbering follows the full directory order, so a card keeps its
              // number when the list is filtered.
              index={MISSIONS.indexOf(m)}
            />
          ))}
        </div>
      )}
    </section>
  )
}

/**
 * Board state in the URL (`?q=fish&giver=fishing_village`) so a filtered view is
 * shareable. `history: 'replace'` keeps typing out of the back-button stack, and
 * `clearOnDefault` drops params at their default so an untouched board stays on
 * a clean `/guides/missions`.
 */
function MissionBoardWithUrlState() {
  const [{ q, giver }, setBoard] = useQueryStates(
    {
      q: parseAsString.withDefault(''),
      giver: parseAsStringLiteral(GIVER_FILTERS).withDefault('all'),
    },
    { history: 'replace', clearOnDefault: true },
  )

  return (
    <MissionBoard
      query={q}
      giver={giver}
      onQuery={(value) => setBoard({ q: value })}
      onGiver={(value) => setBoard({ giver: value })}
    />
  )
}

const FIELDS = [
  {
    title: 'Mission giver',
    desc: 'Identify the NPC who provides the mission so you know who to speak with before and after completing the objective.',
  },
  {
    title: 'Provider location',
    desc: 'Check which safe-zone monument contains the mission giver and whether that location appears on the current map.',
  },
  {
    title: 'Objective',
    desc: 'Review exactly what must be gathered, caught, hunted, delivered, discovered, or otherwise completed.',
  },
  {
    title: 'Prerequisite',
    desc: 'See whether a previous mission or another requirement must be completed before the mission becomes available.',
  },
  {
    title: 'Reward',
    desc: 'Compare the items, resources, scrap, equipment, or progression benefits awarded for completing the mission.',
  },
  {
    title: 'Preparation',
    desc: 'Plan the tools, weapons, bait, transportation, storage space, and other supplies needed for the objective.',
  },
]

const HOW_IT_WORKS = [
  {
    title: 'Missions begin with an NPC',
    desc: 'Speak with an available mission provider to review the tasks they currently offer. The provider and mission selection depend on the monument and your progression.',
  },
  {
    title: 'Each mission has an objective',
    desc: 'Objectives can involve collecting resources, catching fish, hunting wildlife, finding locations, delivering items, or performing another specific action.',
  },
  {
    title: 'Some missions form a sequence',
    desc: 'When a prerequisite is listed, complete that requirement before expecting the next mission to become available from the provider.',
  },
  {
    title: 'Rewards vary by task',
    desc: 'Compare the reward with the time, travel, equipment, and risk involved before deciding which mission to complete.',
  },
]

const BEFORE_ACCEPTING = [
  {
    title: 'Mission location',
    desc: 'Check where the provider is located and whether the monument appears on the current server map.',
  },
  {
    title: 'Required progression',
    desc: 'Confirm that all listed prerequisite missions or other requirements have already been completed.',
  },
  {
    title: 'Needed equipment',
    desc: 'Prepare fishing equipment, tools, weapons, transportation, clothing, healing supplies, or storage space when needed.',
  },
  {
    title: 'Travel risk',
    desc: 'Consider the distance, surrounding monuments, nearby bases, terrain, server population, and likely player traffic.',
  },
  {
    title: 'Reward value',
    desc: 'Decide whether the reward is useful for your current stage of the wipe and worth the required time and equipment.',
  },
]

export function MissionsGuide() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 py-20 text-text font-sans">
      {/* Breadcrumbs */}
      <div className="relative z-50 text-lg font-display uppercase text-text-dim mb-12 flex items-center space-x-3 tracking-widest animate-fade-in-up">
        <Link href="/" className="hover:text-text-bright transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          href="/guides"
          className="hover:text-text-bright transition-colors"
        >
          Guides
        </Link>
        <span>/</span>
        <span className="text-rust font-medium">Missions</span>
      </div>

      {/* Hero */}
      <header className="pb-4 mb-8 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-[linear-gradient(to_right,rgba(255,255,255,0.2),transparent)] animate-fade-in-up">
        <div className="sec-label">Rust mission directory</div>
        <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6 text-text-bright leading-none font-display uppercase">
          Take the job. <span className="text-rust">Know the route.</span>
        </h1>
        <p className="text-xl text-text-dim font-light tracking-wide max-w-3xl leading-relaxed">
          Find every listed Rust mission, where it starts, what it requires, and
          what you receive when the work is done.
        </p>
      </header>

      {/* Headline counts */}
      <div className="flex flex-wrap gap-12 md:gap-24 separator-gap animate-fade-in-up">
        <Stat value={MISSION_COUNT} label="Missions" />
        <Stat value={PROVIDER_COUNT} label="Mission givers" />
        <Stat value={REWARD_ENTRY_COUNT} label="Reward entries" />
      </div>

      {/* Progression + loop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Reveal className="relative overflow-hidden rounded-2xl bg-[rgba(19,18,16,0.65)] backdrop-blur-[20px] border border-white/[0.06] shadow-[0_16px_40px_rgba(0,0,0,0.4),inset_0_-1px_0_rgba(255,255,255,0.03)] before:content-[''] before:absolute before:top-0 before:inset-x-0 before:h-0.5 before:bg-[linear-gradient(90deg,transparent_0%,var(--rust)_15%,var(--rust)_85%,transparent_100%)] before:opacity-80 p-8">
          <div className="sec-label">Mission progression</div>
          <h2 className="font-display uppercase text-3xl text-text-bright tracking-wide leading-none mb-8">
            {LINKED_MISSION_COUNT} linked jobs
          </h2>

          <div className="flex flex-col gap-8">
            {PROGRESSION_CHAINS.map((chain) => (
              <div key={chain.provider}>
                <div className="font-display uppercase tracking-[0.18em] text-rust text-base mb-4">
                  {chain.provider}
                </div>
                <ol className="flex flex-col">
                  {chain.steps.map((s, i) => (
                    <li key={s} className="flex items-stretch gap-4">
                      <div className="flex flex-col items-center flex-shrink-0">
                        <span className="w-2.5 h-2.5 rounded-full bg-rust mt-2 flex-shrink-0" />
                        {i < chain.steps.length - 1 && (
                          <span className="w-px flex-1 min-h-6 bg-gradient-to-b from-rust to-border" />
                        )}
                      </div>
                      <span className="text-text-bright text-lg pb-4 leading-tight">
                        {s}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>

          <p className="text-sm text-text-dim font-light mt-4">
            Complete earlier jobs to unlock linked missions.
          </p>
        </Reveal>

        <Reveal className="relative overflow-hidden rounded-2xl bg-[rgba(19,18,16,0.65)] backdrop-blur-[20px] border border-white/[0.06] shadow-[0_16px_40px_rgba(0,0,0,0.4),inset_0_-1px_0_rgba(255,255,255,0.03)] before:content-[''] before:absolute before:top-0 before:inset-x-0 before:h-0.5 before:bg-[linear-gradient(90deg,transparent_0%,var(--rust)_15%,var(--rust)_85%,transparent_100%)] before:opacity-80 p-8">
          <div className="sec-label">Mission loop</div>
          <h2 className="font-display uppercase text-3xl text-text-bright tracking-wide leading-none mb-8">
            From contact to reward
          </h2>

          <ol className="flex flex-col gap-8">
            {[
              {
                title: 'Find the mission giver',
                desc: 'Use the giver and location details to choose the right safe zone or settlement.',
              },
              {
                title: 'Check prerequisites',
                desc: 'Some jobs unlock only after earlier missions in the same progression chain.',
              },
              {
                title: 'Complete and collect',
                desc: 'Finish the objective, return when required, and collect every listed reward.',
              },
            ].map((s, i) => (
              <li key={s.title} className="flex gap-6">
                <span className="font-display text-3xl leading-none text-rust flex-shrink-0 w-10">
                  {pad(i + 1)}
                </span>
                <div>
                  <h3 className="font-display uppercase text-xl text-text-bright tracking-wide leading-none mb-2">
                    {s.title}
                  </h3>
                  <p className="text-text-dim text-base font-light leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>

      {/* The fallback renders the same board at its default state, so the full
          17-card list is in the prerendered HTML for crawlers; the client swaps
          in the URL-filtered view on hydration. */}
      <Suspense fallback={<MissionBoard query="" giver="all" />}>
        <MissionBoardWithUrlState />
      </Suspense>

      {/* Editorial: what the directory columns mean */}
      <section>
        <div className="sec-label">Rust mission directory</div>
        <h2 className="font-display uppercase text-5xl md:text-6xl leading-none text-text-bright tracking-tight mb-8">
          Rust missions, objectives,{' '}
          <span className="text-rust">and rewards</span>
        </h2>
        <div className="max-w-3xl flex flex-col gap-6 mb-12">
          <p className="text-text-dim text-lg font-light leading-relaxed">
            Rust missions are tasks offered by NPCs found at certain monuments
            and safe zones. Missions can introduce useful gameplay systems,
            provide early progression opportunities, and reward players for
            completing objectives such as fishing, gathering, hunting,
            delivering items, or exploring.
          </p>
          <p className="text-text-dim text-lg font-light leading-relaxed">
            Use the mission directory above to compare providers, locations,
            prerequisites, objectives, and rewards. Mission availability can vary
            depending on the current map, server configuration, plugins, and
            changes made in Rust updates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {FIELDS.map((f) => (
            <Reveal
              key={f.title}
              className="border border-border border-l-[3px] border-l-rust bg-panel p-8"
            >
              <h3 className="font-display uppercase text-2xl text-text-bright tracking-wide leading-none mb-3">
                {f.title}
              </h3>
              <p className="text-text-dim text-base font-light leading-relaxed">
                {f.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How missions work */}
      <section className="section-gap">
        <div className="sec-label">Mission system</div>
        <h2 className="font-display uppercase text-5xl md:text-6xl leading-none text-text-bright tracking-tight mb-12">
          How missions <span className="text-rust">work in Rust</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {HOW_IT_WORKS.map((h) => (
            <Reveal key={h.title} className="relative overflow-hidden rounded-2xl bg-[rgba(19,18,16,0.65)] backdrop-blur-[20px] border border-white/[0.06] shadow-[0_16px_40px_rgba(0,0,0,0.4),inset_0_-1px_0_rgba(255,255,255,0.03)] before:content-[''] before:absolute before:top-0 before:inset-x-0 before:h-0.5 before:bg-[linear-gradient(90deg,transparent_0%,var(--rust)_15%,var(--rust)_85%,transparent_100%)] before:opacity-80 p-8">
              <h3 className="font-display uppercase text-2xl text-text-bright tracking-wide leading-none mb-3">
                {h.title}
              </h3>
              <p className="text-text-dim text-base font-light leading-relaxed">
                {h.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Before accepting */}
      <section className="section-gap">
        <div className="sec-label">Before accepting</div>
        <h2 className="font-display uppercase text-5xl md:text-6xl leading-none text-text-bright tracking-tight mb-12">
          What to check <span className="text-rust">before starting</span>
        </h2>
        <div className="flex flex-col">
          {BEFORE_ACCEPTING.map((b) => (
            <Reveal
              key={b.title}
              className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 py-6 border-b border-border"
            >
              <h3 className="font-display uppercase text-xl text-text-bright tracking-wide sm:w-64 flex-shrink-0 leading-none">
                {b.title}
              </h3>
              <p className="text-text-dim text-base font-light leading-relaxed">
                {b.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Step-by-step */}
      <section className="section-gap">
        <div className="sec-label">Step-by-step</div>
        <h2 className="font-display uppercase text-5xl md:text-6xl leading-none text-text-bright tracking-tight mb-8">
          How to complete <span className="text-rust">a Rust mission</span>
        </h2>
        <p className="text-text-dim text-lg font-light leading-relaxed max-w-3xl mb-16">
          Read the complete objective before accepting a mission. Some tasks
          require preparation or travel that may not be obvious from the mission
          name alone.
        </p>

        <div className="flex flex-col gap-16">
          <Step number={1} title="Find the mission provider">
            <p className="text-text-dim text-base font-light leading-relaxed">
              Use the mission directory to identify the NPC and safe-zone
              location associated with the mission.
            </p>
          </Step>
          <Step number={2} title="Check the prerequisite">
            <p className="text-text-dim text-base font-light leading-relaxed">
              Confirm whether another mission or progression requirement must be
              completed before the mission becomes available.
            </p>
          </Step>
          <Step number={3} title="Review the objective">
            <p className="text-text-dim text-base font-light leading-relaxed">
              Read the full objective and prepare any equipment, transportation,
              bait, tools, weapons, or inventory space you may need.
            </p>
          </Step>
          <Step number={4} title="Accept and complete the mission">
            <p className="text-text-dim text-base font-light leading-relaxed">
              Speak with the provider, accept the mission, and complete the
              requested objective while tracking its progress.
            </p>
          </Step>
          <Step number={5} title="Collect the reward" isLast>
            <p className="text-text-dim text-base font-light leading-relaxed">
              Complete the listed return or completion requirement and confirm
              that the mission reward has been received.
            </p>
          </Step>
        </div>
      </section>

      {/* Finding givers */}
      <section className="section-gap">
        <div className="sec-label">Safe-zone providers</div>
        <h2 className="font-display uppercase text-5xl md:text-6xl leading-none text-text-bright tracking-tight mb-8">
          Finding mission givers{' '}
          <span className="text-rust">on the map</span>
        </h2>
        <p className="text-text-dim text-lg font-light leading-relaxed max-w-3xl mb-10">
          Mission providers are commonly found at safe-zone monuments, including
          locations connected to fishing, farming, trading, and transportation.
          Check the map before traveling because procedural generation may not
          place every eligible monument on every server.
        </p>
        <Tip title="Custom and modded servers" type="warning">
          Custom maps and modded servers may relocate NPCs, change available
          missions, introduce custom objectives, or disable standard providers
          entirely.
        </Tip>
      </section>

      {/* FAQ */}
      <section className="section-gap">
        <div className="sec-label">Common questions</div>
        <h2 className="font-display uppercase text-5xl md:text-6xl leading-none text-text-bright tracking-tight mb-12">
          Rust mission <span className="text-rust">FAQ</span>
        </h2>
        <div className="flex flex-col gap-4">
          {MISSION_FAQ.map((f) => (
            <Reveal key={f.q}>
              <details className="group border border-border bg-panel">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-6 p-6 hover:bg-white/[0.02] transition-colors">
                  <h3 className="font-display uppercase text-xl text-text-bright tracking-wide leading-none">
                    {f.q}
                  </h3>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="text-rust flex-shrink-0 transition-transform duration-300 group-open:rotate-45"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </summary>
                <p className="text-text-dim text-base font-light leading-relaxed px-6 pb-6 max-w-3xl">
                  {f.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}
