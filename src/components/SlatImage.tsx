import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { EASE_OUT } from '../lib/motion'
import SplitFlap from './SplitFlap'

const SLATS = 7

type Item = { src: string; label: string }

/**
 * Photos change like a split-flap board: the picture is cut into horizontal
 * slats and each slat flips down in sequence onto the next dish.
 */
export default function SlatImage({ items, play, interval = 4200 }: { items: Item[]; play: boolean; interval?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-10% 0px' })
  const reduce = useReducedMotion()
  const [state, setState] = useState({ cur: 0, prev: 0, n: 0 })

  useEffect(() => {
    if (!play || !inView) return
    const t = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return
      setState((s) => ({ prev: s.cur, cur: (s.cur + 1) % items.length, n: s.n + 1 }))
    }, interval)
    return () => window.clearInterval(t)
  }, [play, inView, items.length, interval])

  // Warm the cache for the next photo.
  useEffect(() => {
    const next = new Image()
    next.src = items[(state.cur + 1) % items.length].src
  }, [state.cur, items])

  const cur = items[state.cur]
  const prev = items[state.prev]

  return (
    <figure ref={ref} className="relative">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-ink [perspective:1400px] sm:aspect-[3/4]">
        {Array.from({ length: SLATS }, (_, i) => (
          <div key={i} className="absolute inset-x-0 overflow-hidden" style={{ top: `${(i * 100) / SLATS}%`, height: `${100 / SLATS + 0.2}%` }}>
            <img
              src={prev.src}
              alt=""
              aria-hidden
              className="absolute inset-x-0 w-full object-cover"
              style={{ height: `${SLATS * 100}%`, top: `-${i * 100}%` }}
            />
            <motion.div
              key={state.n}
              className="absolute inset-0 overflow-hidden"
              style={{ transformOrigin: '50% 0%', backfaceVisibility: 'hidden' }}
              initial={state.n === 0 || reduce ? false : { transform: 'rotateX(-92deg)' }}
              animate={{ transform: 'rotateX(0deg)' }}
              transition={{ duration: 0.62, ease: EASE_OUT, delay: i * 0.055 }}
            >
              <img
                src={cur.src}
                alt={i === 0 ? cur.label : ''}
                aria-hidden={i !== 0}
                className="absolute inset-x-0 w-full object-cover"
                style={{ height: `${SLATS * 100}%`, top: `-${i * 100}%` }}
              />
              <motion.span
                className="absolute inset-0 bg-ink"
                initial={state.n === 0 || reduce ? false : { opacity: 0.55 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.62, ease: EASE_OUT, delay: i * 0.055 }}
              />
            </motion.div>
          </div>
        ))}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        <figcaption className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 sm:inset-x-6 sm:bottom-6">
          <div>
            <p className="mb-2 font-mono text-[10px] tracking-[0.25em] text-cream/70 uppercase">Visti in cucina</p>
            <SplitFlap
              key={cur.label}
              text={cur.label}
              length={18}
              play={play}
              cellClassName="h-[1.7em] w-[1.05em] rounded-[3px] bg-ink/85 text-cream font-mono text-[11px] sm:text-[13px]"
            />
          </div>
          <p className="font-mono text-xs text-cream/70 tabular-nums">
            {String(state.cur + 1).padStart(2, '0')}/{String(items.length).padStart(2, '0')}
          </p>
        </figcaption>
      </div>
    </figure>
  )
}
