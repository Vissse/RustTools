import { CalcShell } from "./CalcShell";

export function DecayCalculator() {
  return (
    <CalcShell
      pageTitle={
        <>
          RUST <span>//</span> DECAY CALCULATOR
        </>
      }
      headerAccent="DECAY"
      headerRest="CALCULATOR"
      variant="cupboard"
    >
      <div className="panel-left" style={{ width: "100%", border: "none" }}>
        <div className="empty-state">
          <span className="icon">◈</span>
          DECAY CALCULATOR INCOMING
        </div>
      </div>
    </CalcShell>
  );
}
