import { useEffect, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";

/**
 * Sdílené utility pro sdílení stavu kalkulaček přes URL search params.
 *
 * Princip (jednosměrná synchronizace):
 *  - `readInitialSearch()` přečte URL jednou při mountu -> použij ve `useState`
 *    lazy initializeru pro nasazení stavu z odkazu od kamaráda.
 *  - `useSyncSearch()` zrcadlí aktuální stav zpět do adresního řádku (replace,
 *    aby každý úhoz neplnil historii prohlížeče).
 *
 * Stav zůstává jediným zdrojem pravdy; URL je jen jeho odraz pro sdílení.
 */

/** Přečte search params z aktuální URL (pro lazy useState initializery). */
export function readInitialSearch(): URLSearchParams {
  if (typeof window === "undefined") return new URLSearchParams();
  return new URLSearchParams(window.location.search);
}

/**
 * Zrcadlí ploché string-record do URL search params. Prázdné/`undefined`
 * hodnoty se vynechávají (default state -> krátká, čistá URL). Naviguje jen
 * když se serializace reálně změní, takže StrictMode dvojí render ani sdílený
 * odkaz nevyvolají zbytečnou navigaci.
 */
export function useSyncSearch(params: Record<string, string | undefined>) {
  const navigate = useNavigate();

  const cleaned: Record<string, string> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value != null && value !== "") cleaned[key] = value;
  }
  const serialized = new URLSearchParams(cleaned).toString();

  const lastSent = useRef<string | null>(null);
  useEffect(() => {
    if (lastSent.current === serialized) return;

    // Při prvním běhu nepřepisuj URL, pokud už odpovídá stavu (sdílený odkaz).
    const currentSearch = window.location.search.replace(/^\?/, "");
    if (lastSent.current === null && serialized === currentSearch) {
      lastSent.current = serialized;
      return;
    }

    lastSent.current = serialized;
    // navigate je typováno na konkrétní routy; sdílíme hook napříč routami,
    // takže search předáváme volně.
    (navigate as (opts: unknown) => void)({
      to: ".",
      search: cleaned,
      replace: true,
    });
  }, [serialized, navigate]); // eslint-disable-line react-hooks/exhaustive-deps
}
