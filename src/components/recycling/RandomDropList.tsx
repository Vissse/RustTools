import { RecycleImg } from "./RecycleImg";
import type { RandomTotal } from "./types";

interface RandomDropListProps {
  randomTotals: RandomTotal[];
}

/** Minimalist "Plus a random amount of..." */
export function RandomDropList({ randomTotals }: RandomDropListProps) {
  if (randomTotals.length === 0) return null;

  return (
    <div className="sleek-rnd-wrap">
      <div className="sleek-rnd-title">Plus a random amount of...</div>
      <div className="sleek-rnd-list">
        {randomTotals.map((rt) => (
          <div className="sleek-rnd-row" key={rt.id}>
            {/* Levá část: Ikona a název */}
            <div className="sleek-rnd-left">
              <RecycleImg src={rt.img} alt={rt.name} data-tip={rt.name} />
              <span className="sleek-rnd-name">{rt.name}</span>
            </div>

            {/* Pravá část: Čisté statistiky */}
            <div className="sleek-rnd-stats">
              <div className="sleek-rnd-stat">
                <span className="sleek-rnd-lbl">Min</span>
                <span className="sleek-rnd-val">{rt.min}</span>
              </div>

              <div className="sleek-rnd-divider" />

              <div className="sleek-rnd-stat">
                <span className="sleek-rnd-lbl">Avg</span>
                <span className="sleek-rnd-val avg">
                  ~{Math.round(rt.avg * 10) / 10}
                </span>
              </div>

              <div className="sleek-rnd-divider" />

              <div className="sleek-rnd-stat">
                <span className="sleek-rnd-lbl">Max</span>
                <span className="sleek-rnd-val">{rt.max}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
