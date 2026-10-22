import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { gins } from '../data/site'
import { EASE_OUT, euro } from '../lib/motion'

/** All 61 gins as one wall of type. Hover or tap a name to read the bottle notes. */
export default function GinWall() {
  const [active, setActive] = useState<number | null>(null)
  const gin = active !== null ? gins[active] : null

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <p className="font-mono text-[11px] tracking-[0.25em] text-amber uppercase">Gin tonic</p>
        <p className="mt-2 font-display text-[clamp(7rem,18vw,13rem)] leading-[0.8] font-semibold text-transparent [-webkit-text-stroke:2px_#f4ead8]">
          {gins.length}
        </p>
        <p className="mt-3 font-display text-3xl italic">gin, tutti con tonica premium.</p>
        <div className="mt-6 min-h-[150px] rounded-2xl border border-cream/15 p-5" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            {gin ? (
              <motion.div
                key={gin.name + active}
                initial={{ opacity: 0, transform: 'translateY(6px)' }}
                animate={{ opacity: 1, transform: 'translateY(0px)' }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                transition={{ duration: 0.2, ease: EASE_OUT }}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-display text-2xl font-medium">{gin.name}</p>
                  <p className="font-mono text-amber tabular-nums">{euro(gin.prices[0])}</p>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-cream/70">{gin.note}</p>
              </motion.div>
            ) : (
              <motion.p key="hint" className="text-sm text-cream/55" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                Passa sopra un nome, o toccalo, per leggere l'etichetta. Il Boigin allo zafferano e il Rena 41 sono distillati in
                Sardegna.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <ul className="flex flex-wrap content-start items-baseline gap-x-1 gap-y-0 lg:col-span-8" onMouseLeave={() => setActive(null)}>
        {gins.map((g, i) => (
          <li key={g.name + i} className="contents">
            <button
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className={`rounded-md px-1 text-left leading-[1.15] transition-colors duration-150 ${
                i % 3 === 0 ? 'font-display text-[clamp(1.4rem,2.6vw,2.4rem)] italic' : 'font-sans text-[clamp(1.1rem,2vw,1.8rem)] font-semibold tracking-tight'
              } ${active === i ? 'bg-amber text-ink' : active === null ? 'text-cream/85' : 'text-cream/35'}`}
            >
              {g.name}
            </button>
            <span className="text-cream/25" aria-hidden>
              ·
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
