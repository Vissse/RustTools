import { Link } from '@tanstack/react-router'

const CALCULATORS = [
  {
    id: 'raid',
    title: 'Raid Calculator',
    description:
      'Calculate exactly how much sulfur and explosives you need to raid a base.',
    path: '/raid',
    status: 'published',
  },
  {
    id: 'recycling',
    title: 'Recycling',
    description:
      'Find out how much scrap and resources you will get from recycling items.',
    path: '/recycling',
    status: 'published',
  },
  {
    id: 'furnace',
    title: 'Furnace',
    description:
      'Calculate wood and time required to smelt ores in different furnaces.',
    path: '/furnace',
    status: 'published',
  },
  {
    id: 'genetics',
    title: 'Genetics',
    description:
      'Determine the exact crossbreeding results for your perfect plant clones.',
    path: '/genetics',
    status: 'published',
  },
  {
    id: 'cupboard',
    title: 'Tool Cupboard',
    description: 'Calculate base upkeep and how long your resources will last.',
    path: '/cupboard',
    status: 'published',
  },
  {
    id: 'giant-excavator',
    title: 'Giant Excavator',
    description: 'Plan your diesel usage and calculate exact resource yields.',
    path: '/giant-excavator',
    status: 'published',
  },
  {
    id: 'decay',
    title: 'Decay',
    description:
      'Calculate how long it takes for different building blocks to decay.',
    path: '/decay',
    status: 'published',
  },
  {
    id: 'shops',
    title: 'Shop & Vending',
    description: 'Plan your vending machine prices and calculate profits.',
    path: '/shops',
    status: 'published',
  },
  {
    id: 'skinning',
    title: 'Skinning',
    description: 'Calculate animal harvesting yields with different tools.',
    path: '/skinning',
    status: 'published',
  },
  {
    id: 'salvaging',
    title: 'Salvaging',
    description:
      'Calculate resources gained from salvaging various components.',
    path: '/salvaging',
    status: 'published',
  },
]

export function CalculatorsHub() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 py-20 lg:py-32 text-text font-sans">
      {/* Breadcrumbs */}
      <div className="relative z-50 text-lg font-display uppercase text-text-dim mb-12 flex items-center space-x-3 tracking-widest animate-fade-in-up">
        <Link to="/" className="hover:text-text-bright transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-rust font-medium">Calculators</span>
      </div>

      {/* Header */}
      <header className="mb-8 animate-fade-in-up delay-100">
        <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-8 text-text-bright leading-none font-display uppercase">
          Rust <span className="text-rust">Calculators</span>
        </h1>
        <p className="text-xl text-text-dim font-light max-w-3xl leading-loose">
          Optimize your gameplay with our precision tools. Calculate raid costs,
          smelting times, and resource yields to dominate the wipe.
        </p>
      </header>

      {/* Separator */}
      <div className="w-full h-[1px] bg-gradient-to-r from-white/20 to-transparent separator-gap animate-fade-in-up delay-100" />

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CALCULATORS.map((calc, index) => (
          <CalcCard key={calc.id} calc={calc} index={index} />
        ))}
      </div>
    </div>
  )
}

function CalcCard({
  calc,
  index,
}: {
  calc: (typeof CALCULATORS)[0]
  index: number
}) {
  const isPublished = calc.status === 'published'

  const content = (
    <div
      className={`transition-all duration-300 h-full flex flex-col group animate-fade-in-up ${
        isPublished
          ? 'bg-panel hover:bg-[#1f1f1f] cursor-pointer hover:-translate-y-2 shadow-xl hover:shadow-2xl'
          : 'bg-panel/50 opacity-50 cursor-not-allowed'
      }`}
      style={{ animationDelay: `${200 + index * 50}ms` }}
    >
      {/* Obrazek (Floating Image Box Placeholder) */}
      <div className="w-full aspect-[16/9] bg-bg relative overflow-hidden">
        {/* Zde uzivatel vlozi img, napr: <img src="/images/calc-raid.jpg" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" /> */}
        <div className="absolute inset-0 flex items-center justify-center text-text-dim/20 font-display uppercase tracking-widest text-xl transition-transform duration-500 group-hover:scale-105">
          IMAGE PLACEHOLDER
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="mb-4 flex justify-between items-start">
          <h3 className="text-2xl font-bold text-text-bright tracking-wide font-display uppercase leading-tight">
            {calc.title}
          </h3>
          {!isPublished && (
            <span className="text-[10px] uppercase tracking-[0.2em] text-bg bg-rust font-bold px-2 py-1 ml-4 mt-1">
              Soon
            </span>
          )}
        </div>
        <p className="text-text-dim leading-relaxed text-sm font-light flex-1">
          {calc.description}
        </p>
      </div>
    </div>
  )

  if (isPublished) {
    return (
      <Link to={calc.path} className="block h-full">
        {content}
      </Link>
    )
  }

  return <div className="block h-full">{content}</div>
}
