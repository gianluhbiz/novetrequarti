import { motion, useReducedMotion } from 'framer-motion'
import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { EASE_DRAWER, EASE_IN_OUT } from '../lib/motion'
import { TransitionContext, type Phase } from '../lib/transition'
import Badge from './Badge'

const ROWS = 12
const PER_HALF = 5
const BRICKS = ['#8e3a28', '#9c4430', '#a64c34', '#7f3324', '#b0563b', '#93412c']
const COVER = 0.55
const REVEAL = 0.75
const STEP = 0.035

const brickColor = (r: number, c: number) => BRICKS[(r * 7 + c * 13 + ((r * c) % 5)) % BRICKS.length]

function HalfRow({ row, side, phase }: { row: number; side: 'left' | 'right'; phase: Phase }) {
  const offset = row % 2 === 1
  const off = side === 'left' ? 'translateX(-101%)' : 'translateX(101%)'
  const mid = (ROWS - 1) / 2
  const delay = Math.abs(row - mid) * STEP
  const bricks = useMemo(() => {
    // Built outer edge → seam. Half bricks alternate sides so rows interlock (running bond).
    const fulls = Array.from({ length: PER_HALF }, (_, i) => ({ w: 1, c: brickColor(row, i + (side === 'left' ? 0 : 10)) }))
    // Same colour on both sides so the two seam halves read as one brick until the wall splits.
    const half = { w: 0.5, c: brickColor(row, offset ? (side === 'left' ? 77 : 99) : 99) }
    const list = offset ? [half, ...fulls] : [...fulls, half]
    return side === 'left' ? list : list.reverse()
  }, [row, side, offset])

  return (
    <motion.div
      className="flex h-full w-1/2 gap-[5px] bg-[#cdb99a] py-[2.5px]"
      style={{ justifyContent: side === 'left' ? 'flex-end' : 'flex-start' }}
      initial={{ transform: off }}
      animate={{ transform: phase === 'cover' ? 'translateX(0%)' : off }}
      transition={
        phase === 'cover'
          ? { duration: COVER, ease: EASE_IN_OUT, delay }
          : { duration: REVEAL, ease: EASE_DRAWER, delay: (mid - Math.abs(row - mid)) * STEP }
      }
    >
      {bricks.map((b, i) => (
        <span
          key={i}
          className="h-full shrink-0 rounded-[2px] shadow-[inset_0_-3px_0_rgba(0,0,0,.18),inset_0_2px_0_rgba(255,255,255,.08)]"
          style={{ background: b.c, width: `calc(${b.w * (100 / (PER_HALF + 0.5))}% - 5px)` }}
        />
      ))}
    </motion.div>
  )
}

/**
 * Route changes run "through the wall": bricks close from both sides,
 * the page swaps behind them, then the wall splits open.
 */
export default function WallTransition({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const location = useLocation()
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('idle')
  const busy = useRef(false)

  const go = useCallback(
    (to: string) => {
      if (busy.current || to === location.pathname) return
      if (reduce) {
        navigate(to)
        window.scrollTo({ top: 0 })
        return
      }
      busy.current = true
      setPhase('cover')
      const coverMs = (COVER + ((ROWS - 1) / 2) * STEP) * 1000 + 180
      window.setTimeout(() => {
        navigate(to)
        window.scrollTo({ top: 0, behavior: 'instant' })
        // Timers, not rAF: rAF pauses in background tabs and would leave the wall closed.
        window.setTimeout(() => {
          setPhase('reveal')
          window.setTimeout(() => {
            setPhase('idle')
            busy.current = false
          }, (REVEAL + ((ROWS - 1) / 2) * STEP) * 1000 + 50)
        }, 40)
      }, coverMs)
    },
    [location.pathname, navigate, reduce],
  )

  const value = useMemo(() => ({ go, phase }), [go, phase])

  return (
    <TransitionContext.Provider value={value}>
      {children}
      {phase !== 'idle' && (
        <div
          className={`fixed inset-0 z-[70] flex flex-col overflow-hidden ${phase === 'cover' ? 'pointer-events-auto' : 'pointer-events-none'}`}
          aria-hidden
        >
          {Array.from({ length: ROWS }, (_, r) => (
            <div key={r} className="flex flex-1">
              <HalfRow row={r} side="left" phase={phase} />
              <HalfRow row={r} side="right" phase={phase} />
            </div>
          ))}
          <motion.div
            className="absolute top-1/2 left-1/2 w-28 -translate-x-1/2 -translate-y-1/2 sm:w-36"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={phase === 'cover' ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.08 }}
            transition={phase === 'cover' ? { delay: COVER * 0.8, duration: 0.3, ease: EASE_DRAWER } : { duration: 0.2 }}
          >
            <Badge className="h-auto w-full drop-shadow-[0_12px_30px_rgba(0,0,0,.45)]" />
          </motion.div>
        </div>
      )}
    </TransitionContext.Provider>
  )
}
