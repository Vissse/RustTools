import { RecycleImg } from "./RecycleImg";
import { RESOURCE_ICONS } from "../../lib/data/recycling-data";
import type { RecycleResource } from "../../lib/types";

interface ResCardProps {
  kind: RecycleResource;
  label: string;
  value: number;
}

// Mapování CSS tříd pro barvy podle typu suroviny
const COLOR_MAP: Record<string, string> = {
  scrap: "res-color-scrap",
  metal: "res-color-metal",
  hqm: "res-color-hqm",
  cloth: "res-color-cloth",
  sulfur: "res-color-sulfur",
};

export function ResCard({ kind, label, value }: ResCardProps) {
  const colorClass = COLOR_MAP[kind] || "res-color-default";

  return (
    <div className="raid-res-inline">
      <RecycleImg
        src={RESOURCE_ICONS[kind]}
        alt={label}
        style={{ width: "40px", height: "40px", objectFit: "contain" }}
      />
      <div className="raid-res-info">
        <span className={`raid-res-val ${colorClass}`}>
          {value.toLocaleString("en-US").replace(/,/g, " ")}
        </span>
        <span className="raid-res-lbl">{label}</span>
      </div>
    </div>
  );
}
