import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { lines, stations, type Station } from '../data/site'
import { EASE_OUT, winePrice } from '../lib/motion'

const route = stations.filter((s) => s.km).sort((a, b) => a.km! - b.km!)
const lineOf = (id?: string) => lines.find((l) => l.id === id)

function Stop({ s, i, progress }: { s: Station; i: number; progress: MotionValue<number> }) {
  // The stop lights up when the train reaches it.
  const at = (i + 0.5) / route.length
  const fill = useTransform(progress, [at - 0.02, at], ['#3d0f16', '#f5c15a'])
  const line = lineOf(s.line)
  return (
    <motion.li
      className="relative pb-9 pl-12"
      initial={{ opacity: 0, transform: 'translateY(16px)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
    >
      <motion.span
        className="absolute top-1.5 left-[9px] size-[15px] rounded-full border-[3px] border-cream"
        style={{ backgroundColor: fill }}
        aria-hidden
      />
      <div className="flex items-baseline justify-between gap-3">
        <h4 className="font-display text-2xl font-medium">{s.name}</h4>
        <span className="shrink-0 font-mono text-[11px] text-cream/50 tabular-nums">~{s.km} km</span>
      </div>
      {line && (
        <p className="mt-1 flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-cream/55 uppercase">
          <span className="h-1 w-4 rounded" style={{ background: line.color }} />
          {line.name}
        </p>
      )}
      <ul className="mt-3 space-y-2 rounded-2xl bg-cream/[0.06] p-4">
        {s.wines.map((w) => (
          <li key={w.name} className="flex items-baseline justify-between gap-3">
            <div className="min-w-0">
              <p className="font-semibold">{w.name}</p>
              <p className="text-[13px] text-cream/55">{w.detail}</p>
            </div>
            <p className="shrink-0 font-mono text-[12px] whitespace-nowrap text-amber tabular-nums">{winePrice(w.prices)}</p>
          </li>
        ))}
      </ul>
    </motion.li>
  )
}

/** Phone version of the wine map: one line going down, stops ordered by distance from Nuoro. */
export default function WineRoute() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 60%', 'end 60%'] })
  const train = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div>
      <p className="font-mono text-[11px] tracking-[0.25em] text-amber uppercase">La linea del vino</p>
      <h3 className="mt-3 font-display text-[clamp(2rem,8vw,3rem)] leading-[1] font-medium">
        Il Cannonau arriva da <em>venti minuti di strada.</em>
      </h3>
      <p className="mt-4 leading-relaxed text-cream/70">
        Partiamo da Nuoro e scendiamo fermata dopo fermata: prima la Barbagia, poi il resto della carta fino al Sulcis. Prezzi al
        calice e in bottiglia.
      </p>

      <div className="mt-8 flex items-center gap-3 pl-1">
        <span className="grid size-8 place-items-center rounded-full bg-cream font-display text-[13px] font-semibold text-ink">9¾</span>
        <p className="font-display text-xl font-medium">Nuoro · partenza</p>
      </div>

      <ol ref={ref} className="relative mt-6">
        <span className="absolute top-0 bottom-9 left-[15px] w-[3px] rounded bg-cream/12" aria-hidden />
        <motion.span
          className="absolute top-0 bottom-9 left-[15px] w-[3px] origin-top rounded bg-amber"
          style={{ scaleY: scrollYProgress }}
          aria-hidden
        />
        <motion.span
          className="absolute left-[2px] z-10 grid size-[30px] -translate-y-1/2 place-items-center rounded-full bg-amber text-ink shadow-[0_0_0_4px_#3d0f16]"
          style={{ top: train }}
          aria-hidden
        >
          <i className="ri-train-line text-base" />
        </motion.span>
        {route.map((s, i) => (
          <Stop key={s.id} s={s} i={i} progress={scrollYProgress} />
        ))}
      </ol>
      <p className="font-mono text-[10px] tracking-[0.2em] text-cream/40 uppercase">Distanze su strada, circa</p>
    </div>
  )
}
