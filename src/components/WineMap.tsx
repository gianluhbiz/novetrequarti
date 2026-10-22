import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { lines, stations } from '../data/site'
import { EASE_IN_OUT, EASE_OUT, winePrice } from '../lib/motion'

/** Sardinian wines on the list, drawn as a metro map with Nuoro as the hub. */
export default function WineMap() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })
  const [sel, setSel] = useState('mamoiada')
  const station = stations.find((s) => s.id === sel)!

  return (
    <div className="grid items-center gap-10 lg:grid-cols-12">
      <div className="order-2 lg:order-1 lg:col-span-5">
        <p className="font-mono text-[11px] tracking-[0.25em] text-amber uppercase">La linea del vino</p>
        <h3 className="mt-3 font-display text-[clamp(2.2rem,5vw,3.75rem)] leading-[0.95] font-medium">
          Il Cannonau arriva da <em className="font-normal">venti minuti di strada.</em>
        </h3>
        <p className="mt-5 max-w-md leading-relaxed text-cream/70">
          Mamoiada, Orgosolo e Dorgali sono le fermate più vicine. Il resto della carta attraversa l'isola fino al Sulcis. Tocca
          una fermata per vedere cosa versiamo, al calice o in bottiglia.
        </p>

        <div className="mt-8 min-h-[260px] rounded-2xl bg-cream p-5 text-ink sm:p-6">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={station.id}
              initial={{ opacity: 0, filter: 'blur(4px)', transform: 'translateY(8px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)', transform: 'translateY(0px)' }}
              exit={{ opacity: 0, filter: 'blur(4px)', transform: 'translateY(-6px)' }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
            >
              <div className="flex items-baseline justify-between border-b border-ink/15 pb-3">
                <p className="font-display text-3xl font-semibold">{station.name}</p>
                <p className="font-mono text-[10px] tracking-[0.2em] text-ink/50 uppercase">Calice · Bottiglia</p>
              </div>
              <ul className="mt-3 space-y-2.5">
                {station.wines.map((w) => (
                  <li key={w.name} className="flex items-baseline gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold">{w.name}</p>
                      <p className="text-sm text-ink/60">{w.detail}</p>
                    </div>
                    <span className="flex-1 translate-y-[-4px] border-b border-dotted border-ink/25" />
                    <p className="shrink-0 font-mono text-sm tabular-nums">
                      {winePrice(w.prices)}
                    </p>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="order-1 lg:order-2 lg:col-span-7">
        <svg ref={ref} viewBox="0 0 360 520" className="mx-auto h-auto w-full max-w-[520px] overflow-visible" role="group" aria-label="Mappa delle cantine sarde in carta">
          {lines.map((l, i) => (
            <motion.path
              key={l.id}
              d={l.path}
              fill="none"
              stroke={l.color}
              strokeWidth={6}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : undefined}
              transition={{ duration: 1.4, ease: EASE_IN_OUT, delay: 0.2 + i * 0.18 }}
            />
          ))}
          {stations.map((s, i) => {
            const hub = s.id === 'nuoro'
            const active = s.id === sel
            const left = s.labelSide === 'left'
            return (
              <motion.g
                key={s.id}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : undefined}
                transition={{ duration: 0.4, delay: 0.8 + i * 0.05 }}
                className={hub ? '' : 'cursor-pointer outline-none'}
                tabIndex={hub ? -1 : 0}
                role={hub ? undefined : 'button'}
                aria-pressed={hub ? undefined : active}
                aria-label={hub ? undefined : `${s.name}: ${s.wines.length} vini`}
                onClick={() => !hub && setSel(s.id)}
                onKeyDown={(e) => !hub && (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setSel(s.id))}
              >
                {!hub && <circle cx={s.x} cy={s.y} r={18} fill="transparent" />}
                <circle
                  cx={s.x}
                  cy={s.y}
                  r={hub ? 13 : active ? 9 : 6.5}
                  fill={hub ? '#f4ead8' : active ? '#f5c15a' : '#3d0f16'}
                  stroke={hub ? '#83232f' : '#f4ead8'}
                  strokeWidth={hub ? 4 : 3}
                  style={{ transition: 'r 200ms cubic-bezier(0.23,1,0.32,1), fill 200ms ease' }}
                />
                {hub && (
                  <text x={s.x} y={s.y + 4.5} textAnchor="middle" fontSize="11" fontWeight="600" fill="#17110f" fontFamily="Cinzel, serif">
                    9¾
                  </text>
                )}
                <text
                  x={hub ? s.x + 14 : left ? s.x - 13 : s.x + 13}
                  y={s.y + (hub ? 30 : 4)}
                  textAnchor={!hub && left ? 'end' : 'start'}
                  fontSize={hub ? 15 : 11.5}
                  fontWeight={hub || active ? 700 : 500}
                  fill={active || hub ? '#f4ead8' : 'rgba(244,234,216,.7)'}
                  fontFamily="Schibsted Grotesk, sans-serif"
                >
                  {hub ? 'Nuoro · Binario 9¾' : s.name}
                </text>
              </motion.g>
            )
          })}
          <g fontFamily="IBM Plex Mono, monospace" fontSize="7.5" fill="rgba(244,234,216,.5)" letterSpacing="1">
            {lines.map((l, i) => (
              <g key={l.id} transform={`translate(266 ${346 + i * 16})`}>
                <rect width="14" height="4" y="-4" rx="2" fill={l.color} />
                <text x="20" y="0">{l.name.toUpperCase()}</text>
              </g>
            ))}
            <text x="266" y="420">NON IN SCALA</text>
          </g>
        </svg>
      </div>
    </div>
  )
}
