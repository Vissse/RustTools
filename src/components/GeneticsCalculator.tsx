'use client'

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
      <div className="fade-in-container w-full p-[22px] flex flex-col gap-6 overflow-y-auto">
        <div className="h-full flex items-center justify-center flex-col gap-2.5 font-display text-base font-normal tracking-[0.15em] text-text-muted uppercase text-center leading-[1.9]">
          <span className="text-rust text-[28px] leading-none">◈</span>
          GENETICS CALCULATOR INCOMING
        </div>
      </div>
    </CalcShell>
  );
}