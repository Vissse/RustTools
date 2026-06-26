import { memo } from "react";
import { RecycleImg } from "./RecycleImg";
import { QtyInput } from "./QtyInput";

interface InvItemProps {
  id: string;
  name: string;
  img: string;
  count: number;
  onAdjust: (id: string, delta: number) => void;
  onSet: (id: string, value: number) => void;
}

export const InvItem = memo(function InvItem({
  id,
  name,
  img,
  count,
  onAdjust,
  onSet,
}: InvItemProps) {
  return (
    <div className={`inv-item${count > 0 ? " active" : ""}`}>
      <div
        className="inv-item-img mb-1.5"
        data-tip={name}
      >
        <RecycleImg src={img} alt={name} loading="lazy" decoding="async" />
      </div>

      {/* Horizontální separator s novou CSS třídou místo inline stylu */}
      <div className="item-separator" />

      {/* Zmenšený kalkulačkový counter */}
      <div className="free-counter-wrap">
        <button className="free-counter-btn" onClick={() => onAdjust(id, -1)}>
          −
        </button>
        <div className="free-separator" />
        <QtyInput
          className="free-counter-input invisible-num-input"
          value={count}
          ariaLabel={`${name} quantity`}
          onChange={(n) => onSet(id, n)}
        />
        <div className="free-separator" />
        <button className="free-counter-btn" onClick={() => onAdjust(id, 1)}>
          +
        </button>
      </div>
    </div>
  );
});
