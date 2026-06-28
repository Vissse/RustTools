"use client";

import { useState } from "react";
import { composterItems } from "@/lib/data/composter-data";

export function ComposterPopup() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <span
        onClick={() => setIsOpen(true)}
        className="text-rust underline cursor-pointer hover:text-rust-bright transition-colors font-medium"
      >
        Composter
      </span>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-panel border border-border max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col rounded shadow-2xl animate-fade-in-up">
            <div className="flex justify-between items-center p-6 border-b border-border bg-bg/50">
              <h3 className="text-2xl font-display text-text-bright uppercase tracking-wide">
                Fertilizer Yields
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-text-dim hover:text-red-cost transition-colors p-2"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            
            <div className="overflow-y-auto p-0 flex-1">
              <table className="w-full text-left border-collapse">
                <thead className="bg-bg/80 sticky top-0">
                  <tr>
                    <th className="py-3 px-6 text-text-dim font-display uppercase tracking-widest text-sm border-b border-border">
                      Item
                    </th>
                    <th className="py-3 px-6 text-text-dim font-display uppercase tracking-widest text-sm border-b border-border text-right">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {composterItems.map((item, i) => (
                    <tr
                      key={i}
                      className="hover:bg-bg/50 transition-colors border-b border-border/50 last:border-0"
                    >
                      <td className="py-4 px-6 text-text-bright font-medium">
                        {item.name}
                      </td>
                      <td className="py-4 px-6 text-rust text-right font-bold">
                        {item.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
