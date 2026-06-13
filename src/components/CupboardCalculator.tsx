import { useMemo, useState } from 'react'
import { CalcShell } from './CalcShell'
import { Img } from './Img'
import { MAX_SLOTS } from '../lib/data/cupboard-data'
import {
  calculateOptimalTC,
  formatTime,
  generateStacks,
} from '../lib/cupboard-logic'
import type { Stack } from '../lib/types'

const RESOURCES = [
  { key: 'wood', img: '/images/wood.png', alt: 'Wood' },
  { key: 'stone', img: '/images/stones.png', alt: 'Stone' },
  { key: 'metal', img: '/images/metal.fragments.png', alt: 'Metal Fragments' },
  { key: 'hqm', img: '/images/metal.refined.png', alt: 'High Quality Metal' },
] as const

type Inputs = Record<(typeof RESOURCES)[number]['key'], string>

const EMPTY: Inputs = { wood: '', stone: '', metal: '', hqm: '' }

export function CupboardCalculator() {
  const [inputs, setInputs] = useState<Inputs>(EMPTY)

  const result = useMemo(() => {
    const wood = parseInt(inputs.wood) || 0
    const stone = parseInt(inputs.stone) || 0
    const metal = parseInt(inputs.metal) || 0
    const hqm = parseInt(inputs.hqm) || 0

    const tc = calculateOptimalTC(wood, stone, metal, hqm)
    if (!tc) return null

    const stacks: Stack[] = [
      ...generateStacks(tc.wood, 'wood'),
      ...generateStacks(tc.stone, 'stone'),
      ...generateStacks(tc.metal, 'metal'),
      ...generateStacks(tc.hqm, 'hqm'),
    ]
    return { time: formatTime(tc.daysFloat), stacks }
  }, [inputs])

  return (
    <CalcShell
      pageTitle={
        <>
          RUST <span>//</span> CUPBOARD CALCULATOR
        </>
      }
      headerAccent="CUPBOARD"
      headerRest="CALCULATOR"
      variant="cupboard"
    >
      <div className="panel-left">
        <div className="sec-label">Daily Upkeep Cost</div>

        <div className="input-group">
          {RESOURCES.map((r) => (
            <div className="input-row" key={r.key}>
              <div className="input-icon">
                <Img src={r.img} alt={r.alt} />
              </div>
              <input
                type="number"
                className="input-box"
                min="0"
                placeholder="0"
                value={inputs[r.key]}
                onChange={(e) =>
                  setInputs((prev) => ({ ...prev, [r.key]: e.target.value }))
                }
              />
            </div>
          ))}
        </div>

        <button className="btn-reset" onClick={() => setInputs(EMPTY)}>
          Reset Values
        </button>

        <div className="tc-image-container">
          <Img
            src="/images/cupboard.tool.png"
            alt="Tool Cupboard"
            className="tc-image"
          />
        </div>
      </div>

      <div className="panel-right">
        {result ? (
          <div>
            <div className="tc-status">
              Protected for <span>{result.time}</span>
            </div>
            <div className="tc-grid-container">
              <div className="tc-grid">
                {Array.from({ length: MAX_SLOTS }).map((_, i) => {
                  const stack = result.stacks[i]
                  return (
                    <div className="tc-slot" key={i}>
                      {stack && (
                        <>
                          <Img src={stack.img} alt={stack.type} />
                          <span className="tc-qty">
                            x{stack.amount.toLocaleString()}
                          </span>
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <span className="icon">◈</span>
            Enter your daily upkeep cost
            <br />
            to calculate capacity
          </div>
        )}
      </div>
    </CalcShell>
  )
}
