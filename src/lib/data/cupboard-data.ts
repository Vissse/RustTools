import type { StackType } from '../types'

// Stack sizes verified against Rust as of 2026-06.
// Re-check `max` (and the 24-slot Tool Cupboard limit) after a Facepunch patch.
export const MAX_SLOTS = 24

export const STACKS: Record<StackType, { max: number; img: string }> = {
  wood: { max: 1000, img: '/images/wood.png' },
  stone: { max: 1000, img: '/images/stones.png' },
  metal: { max: 1000, img: '/images/metal.fragments.png' },
  hqm: { max: 100, img: '/images/metal.refined.png' },
}
