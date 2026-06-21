import { RecycleImg } from "./RecycleImg";
import type { RecyclerKind } from "../../lib/types";

interface RecyclerToggleProps {
  recycler: RecyclerKind;
  onChange: (kind: RecyclerKind) => void;
}

/** Standard vs Safe Zone recycler selector (Modern Minimalist). */
export function RecyclerToggle({ recycler, onChange }: RecyclerToggleProps) {
  return (
    <div>
      <div className="sec-label">Recycler Type</div>
      <div className="sleek-toggle-wrap">
        <button
          className={`sleek-toggle-btn ${recycler === "radtown" ? "active" : ""}`}
          onClick={() => onChange("radtown")}
        >
          <span className="sleek-toggle-main">
            <RecycleImg src="/images/recycler.png" alt="Radtown Recycler" />
            <span>Radtown</span>
          </span>
          <span className="sleek-toggle-sub">60% Yield • 5s</span>
        </button>

        <button
          className={`sleek-toggle-btn ${recycler === "safezone" ? "active" : ""}`}
          onClick={() => onChange("safezone")}
        >
          <span className="sleek-toggle-main">
            <RecycleImg
              src="/images/safezone-recycler.png"
              alt="Safe Zone Recycler"
            />
            <span>Safe Zone</span>
          </span>
          <span className="sleek-toggle-sub">40% Yield • 8s</span>
        </button>
      </div>
    </div>
  );
}
