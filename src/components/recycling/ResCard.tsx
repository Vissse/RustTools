import { RecycleImg } from "./RecycleImg";
import { RESOURCE_ICONS } from "../../lib/data/recycling-data";
import type { RecycleResource } from "../../lib/types";

interface ResCardProps {
  kind: RecycleResource;
  label: string;
  value: number;
}

export function ResCard({ kind, label, value }: ResCardProps) {
  return (
    <div className="flex items-center gap-3">
      <RecycleImg
        src={RESOURCE_ICONS[kind]}
        alt={label}
        className="w-10 h-10 object-contain"
      />
      <div className="flex flex-col leading-[1.1]">
        <span className="text-2xl font-bold font-ui text-white">
          {value.toLocaleString("en-US").replace(/,/g, " ")}
        </span>
        <span className="text-[10px] font-bold text-[#888] uppercase tracking-[0.05em] mt-1">
          {label}
        </span>
      </div>
    </div>
  );
}
