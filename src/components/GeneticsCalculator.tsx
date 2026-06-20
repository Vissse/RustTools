import { CalcShell } from "./CalcShell";

export function GeneticsCalculator() {
  return (
    <CalcShell
      pageTitle={
        <>
          RUST <span>//</span> GENETICS CALCULATOR
        </>
      }
      headerAccent="GENETICS"
      headerRest="CALCULATOR"
      variant="cupboard"
    >
      <div className="panel-left" style={{ width: "100%", border: "none" }}>
        <div className="empty-state">
          <span className="icon">◈</span>
          GENETICS CALCULATOR INCOMING
        </div>
      </div>
    </CalcShell>
  );
}
