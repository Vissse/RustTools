/**
 * The visible half of `useCardHoverHint`: a breathing rust outline to pull the
 * eye to the card, a dimming wash so the artwork stops competing with it, and a
 * ghost cursor that glides in from the top-left corner to act out the hover.
 *
 * Drop it inside the card being demonstrated — it positions itself absolutely
 * and is inert to the pointer, so it changes nothing about how the card works.
 */
export function CardHintOverlay({ isTouch }: { isTouch: boolean }) {
  return (
    <>
      {/* Knocks the artwork back so the outline and cursor are the only things
          competing for attention. Sits above the image and its gradient but
          below the card text, which stays crisp. */}
      <div className="absolute inset-0 z-15 bg-bg/45 pointer-events-none" aria-hidden="true" />
      <div className="monument-hint-ring absolute inset-0 z-40 rounded-2xl border-2 border-rust pointer-events-none" aria-hidden="true" />
      {/* A cursor is meaningless on a touch screen — there, the card opening and
          closing by itself is the whole hint. */}
      {!isTouch && (
        <div className="monument-hint-cursor absolute left-[calc(50%-10px)] top-[46%] z-40 pointer-events-none" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="white" stroke="rgba(0,0,0,0.65)" strokeWidth="1.25" strokeLinejoin="round" className="drop-shadow-[0_3px_8px_rgba(0,0,0,0.9)]">
            <path d="M5.5 3.2 18.2 11.4a.6.6 0 0 1-.25 1.1l-5.05.7a.6.6 0 0 0-.44.3l-2.5 4.55a.6.6 0 0 1-1.12-.2L5.5 3.2Z" />
          </svg>
        </div>
      )}
    </>
  )
}
