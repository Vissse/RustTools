import { useState, useMemo, useEffect } from "react";
import { CalcShell } from "./CalcShell";
import { Img } from "./Img";

// Data vytažená z tvých screenshotů
const MATERIALS = [
  {
    id: "twig",
    name: "Twig",
    hp: 10,
    decayHours: 1,
    img: "/images/wood.png", // Twig obvykle nemá vlastní ikonu suroviny, použijeme dřevo
    color: "#a08b6c",
  },
  {
    id: "wood",
    name: "Wood",
    hp: 250,
    decayHours: 3,
    img: "/images/wood.png",
    color: "#c9b07a",
  },
  {
    id: "stone",
    name: "Stone",
    hp: 500,
    decayHours: 5,
    img: "/images/stones.png",
    color: "#a9a9a9",
  },
  {
    id: "metal",
    name: "Metal",
    hp: 1000,
    decayHours: 8,
    img: "/images/metal.fragments.png",
    color: "#a4b3c6",
  },
  {
    id: "armored",
    name: "Armored",
    hp: 2000,
    decayHours: 12,
    img: "/images/metal.refined.png",
    color: "#ffffff",
  },
];

export function DecayCalculator() {
  const [selectedMaterial, setSelectedMaterial] = useState<string>("stone");
  const [currentHp, setCurrentHp] = useState<number | "">(500);

  const activeMat = MATERIALS.find((m) => m.id === selectedMaterial)!;

  // Při změně materiálu automaticky upravíme HP, pokud přesahuje nové maximum,
  // nebo pokud je pole prázdné, nastavíme ho na maximum nového materiálu.
  useEffect(() => {
    setCurrentHp((prev) => {
      if (prev === "") return activeMat.hp;
      if (prev > activeMat.hp) return activeMat.hp;
      return prev;
    });
  }, [activeMat.hp]);

  const safeHp =
    typeof currentHp === "number" ? Math.min(currentHp, activeMat.hp) : 0;
  const hpPercent = (safeHp / activeMat.hp) * 100;

  // Výpočet zbývajícího času
  const timeString = useMemo(() => {
    if (safeHp <= 0) return "0S";

    // Zlomek životů vynásobíme celkovým časem rozpadu v sekundách
    const totalSeconds = Math.round(
      (safeHp / activeMat.hp) * activeMat.decayHours * 3600,
    );

    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    let str = "";
    if (hours > 0) str += `${hours}H `;
    if (mins > 0 || hours > 0) str += `${mins}M `;
    str += `${secs}S`;

    return str;
  }, [safeHp, activeMat]);

  return (
    <CalcShell
      pageTitle={
        <>
          RUST <span>//</span> DECAY CALCULATOR
        </>
      }
      headerAccent="DECAY"
      headerRest="CALCULATOR"
      variant="cupboard" // Využijeme rozvržení 45% vlevo / 55% vpravo
    >
      {/* LEVÝ PANEL: Vstupy */}
      <div className="panel-left">
        {/* 1. Výběr Materiálu */}
        <div className="sec-label">BUILDING MATERIAL</div>
        <div
          className="minimal-btn-grid"
          style={{ maxHeight: "none", marginBottom: "32px" }}
        >
          {MATERIALS.map((m) => (
            <button
              key={m.id}
              className={`minimal-box-btn${selectedMaterial === m.id ? " active" : ""}`}
              onClick={() => setSelectedMaterial(m.id)}
            >
              <Img
                src={m.img}
                alt={m.name}
                style={m.id === "twig" ? { opacity: 0.5 } : {}}
              />
              <span className="minimal-box-name">{m.name}</span>
            </button>
          ))}
        </div>

        {/* 2. Zadání vlastního HP */}
        <div className="sec-label">CURRENT HP</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div
            className="free-counter-wrap"
            style={{
              background: "rgba(255,255,255,0.02)",
              padding: "12px 16px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.05)",
              alignSelf: "flex-start",
            }}
          >
            <button
              className="free-counter-btn"
              onClick={() =>
                setCurrentHp((c) =>
                  Math.max(0, (typeof c === "number" ? c : 0) - 10),
                )
              }
            >
              −
            </button>
            <div className="free-separator" />
            <input
              type="number"
              min="0"
              max={activeMat.hp}
              className="invisible-num-input free-counter-input"
              style={{
                fontSize: "26px",
                width: "80px",
                color: activeMat.color,
              }}
              value={currentHp}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "") setCurrentHp("");
                else {
                  const parsed = parseInt(val, 10);
                  if (!isNaN(parsed) && parsed >= 0) {
                    setCurrentHp(Math.min(parsed, activeMat.hp)); // Zabrání napsání většího HP než je max
                  }
                }
              }}
            />
            <div className="free-separator" />
            <button
              className="free-counter-btn"
              onClick={() =>
                setCurrentHp((c) =>
                  Math.min(activeMat.hp, (typeof c === "number" ? c : 0) + 10),
                )
              }
            >
              +
            </button>
          </div>

          <div
            style={{
              fontSize: "11px",
              color: "#666",
              fontWeight: 600,
              letterSpacing: "0.05em",
              marginTop: "4px",
            }}
          >
            MAX HP: <span style={{ color: "#a0a0a0" }}>{activeMat.hp}</span>
          </div>
        </div>
      </div>

      {/* PRAVÝ PANEL: Výsledky */}
      <div
        className="panel-right"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingBottom: "64px",
        }}
      >
        {/* Zobrazení Času */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: "#757575",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              marginBottom: "12px",
            }}
          >
            Time Until Destroyed
          </div>
          <div
            style={{
              fontSize: "56px",
              fontWeight: 800,
              color: "#cc422c",
              lineHeight: 1,
              textShadow: "0 0 24px rgba(204, 66, 44, 0.4)",
            }}
          >
            {timeString}
          </div>
        </div>

        {/* Vizuální HP Bar (Převzatý a upravený z Raid Calculatoru) */}
        <div style={{ width: "80%", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
          >
            <span style={{ color: activeMat.color }}>{safeHp} HP</span>
            <span style={{ color: "#666" }}>{activeMat.hp} HP</span>
          </div>

          <div
            className="modern-hp-wrapper"
            style={{
              height: "6px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "3px",
              overflow: "hidden",
            }}
          >
            {/* Samotná výplň */}
            <div
              className="modern-hp-fill"
              style={{
                width: `${hpPercent}%`,
                background: `linear-gradient(to right, ${activeMat.color}40 0%, ${activeMat.color} 100%)`,
                transition:
                  "width 0.4s cubic-bezier(0.22, 1, 0.36, 1), background 0.4s ease",
              }}
            />
            {/* Glow efekt */}
            <div
              className="modern-hp-glow"
              style={{
                width: `${hpPercent}%`,
                background: activeMat.color,
                opacity: 0.5,
                transition:
                  "width 0.4s cubic-bezier(0.22, 1, 0.36, 1), background 0.4s ease",
              }}
            />
          </div>
        </div>
      </div>
    </CalcShell>
  );
}
