import { CalcShell } from "./CalcShell";

export function FurnaceCalculator() {
  return (
    <CalcShell
      pageTitle={
        <>
          RUST <span>//</span> FURNACE CALCULATOR
        </>
      }
      headerAccent="FURNACE"
      headerRest="CALCULATOR"
      variant="cupboard"
    >
      <div className="panel-left" style={{ width: "100%", border: "none" }}>
        <div className="empty-state">
          <span className="icon">◈</span>
          FURNACE CALCULATOR INCOMING
        </div>
      </div>
    </CalcShell>
  );
}
