import { Link } from "@tanstack/react-router";

const GUIDES = [
  {
    id: "farming",
    title: "Farming & Genetics",
    description: "Learn how to build a highly efficient farm, crossbreed perfect genetics, and brew teas for massive buffs.",
    path: "/guides/farming",
    status: "published"
  },
  {
    id: "electricity",
    title: "Advanced Electricity",
    description: "Master logical circuits, automated defense systems, smart alarms, and efficient power management.",
    path: "/guides/electricity",
    status: "coming_soon"
  },
  {
    id: "base-building",
    title: "Base Building Patterns",
    description: "Discover the most effective base footprints, honeycombing, pixel gaps, and unraidable bunker designs.",
    path: "/guides/base-building",
    status: "published"
  },
  {
    id: "monuments",
    title: "Monument Puzzles",
    description: "Step-by-step walkthroughs for every keycard puzzle and monument puzzle in the game.",
    path: "/guides/monuments",
    status: "published"
  }
];

export function GuidesHub() {
  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-20 lg:py-32 text-text font-sans">
      {/* Breadcrumbs */}
      <div className="text-lg font-display uppercase text-text-dim mb-12 flex items-center space-x-3 tracking-widest animate-fade-in-up">
        <Link to="/" className="hover:text-text-bright transition-colors">Home</Link>
        <span>/</span>
        <span className="text-rust font-medium">Guides</span>
      </div>

      {/* Header */}
      <header className="mb-24 border-b border-border pb-16 animate-fade-in-up delay-100">
        <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-8 text-text-bright leading-none font-display uppercase">
          Strategy <span className="text-rust">Guides</span>
        </h1>
        <p className="text-xl text-text-dim font-light max-w-3xl leading-loose">
          In-depth tutorials and advanced strategies to help you dominate your wipe. From basic survival and farming to complex electrical systems and unraidable bunkers.
        </p>
      </header>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {GUIDES.map((guide, index) => (
          <GuideCard key={guide.id} guide={guide} index={index} />
        ))}
      </div>
    </div>
  );
}

function GuideCard({ guide, index }: { guide: typeof GUIDES[0]; index: number }) {
  const isPublished = guide.status === "published";
  
  const content = (
    <div 
      className={`transition-all duration-300 h-full flex flex-col group animate-fade-in-up ${
        isPublished 
          ? "bg-panel hover:bg-[#1f1f1f] cursor-pointer hover:-translate-y-2 shadow-xl hover:shadow-2xl" 
          : "bg-panel/50 opacity-50 cursor-not-allowed"
      }`}
      style={{ animationDelay: `${200 + index * 50}ms` }}
    >
      {/* Obrazek (Floating Image Box Placeholder) */}
      <div className="w-full aspect-[16/9] bg-bg relative overflow-hidden">
        {/* Zde uzivatel vlozi img, napr: <img src="/images/guide-farming.jpg" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" /> */}
        <div className="absolute inset-0 flex items-center justify-center text-text-dim/20 font-display uppercase tracking-widest text-xl transition-transform duration-500 group-hover:scale-105">
          IMAGE PLACEHOLDER
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-1">
        <div className="mb-4 flex justify-between items-start">
          <h3 className="text-2xl font-bold text-text-bright tracking-wide font-display uppercase leading-tight">{guide.title}</h3>
          {!isPublished && (
            <span className="text-[10px] uppercase tracking-[0.2em] text-bg bg-rust font-bold px-2 py-1 ml-4 mt-1">
              Soon
            </span>
          )}
        </div>
        <p className="text-text-dim leading-relaxed text-sm font-light flex-1">
          {guide.description}
        </p>
      </div>
    </div>
  );

  if (isPublished) {
    return <Link to={guide.path} className="block h-full">{content}</Link>;
  }

  return <div className="block h-full">{content}</div>;
}
