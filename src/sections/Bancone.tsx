import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { breakfast, img } from '../data/site'
import { EASE_OUT, euro } from '../lib/motion'

const zigzag =
  '[mask:linear-gradient(#000_0_0)_top/100%_calc(100%_-_10px)_no-repeat,conic-gradient(from_-45deg_at_bottom,#0000,#000_1deg_89deg,#0000_90deg)_bottom/16px_10px_repeat-x]'

export default function Bancone() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const photoY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const smallY = useTransform(scrollYProgress, [0, 1], ['30%', '-30%'])

  return (
    <section ref={ref} data-clock="09:30" className="relative overflow-hidden px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-[1400px] items-start gap-12 lg:grid-cols-12">
        <div className="relative lg:col-span-7">
          <motion.div
            className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-ink"
            initial={{ clipPath: 'inset(0% 0% 100% 0% round 28px)' }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 28px)' }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 1.1, ease: EASE_OUT }}
          >
            <motion.img
              src={img('bancone')}
              alt="Il bancone del Caffè Novetrequarti con la parete dei vini"
              loading="lazy"
              className="absolute inset-0 h-[116%] w-full object-cover"
              style={{ y: photoY, top: '-8%' }}
            />
            <span className="absolute top-5 left-5 rounded-md bg-cream px-3 py-1.5 font-mono text-[10px] tracking-[0.25em] text-ink uppercase shadow">
              Bar · caffetteria
            </span>
          </motion.div>
          <motion.figure
            style={{ y: smallY }}
            className="absolute -right-2 -bottom-16 hidden w-[38%] rotate-[3deg] overflow-hidden rounded-2xl border-[6px] border-cream shadow-2xl sm:block lg:-right-10"
          >
            <img src={img('scaffale-rum')} alt="Bottiglie di rum sullo scaffale" loading="lazy" className="aspect-[3/4] w-full object-cover" />
          </motion.figure>
        </div>

        <div className="lg:col-span-5 lg:pt-10">
          <p className="font-mono text-[11px] tracking-[0.25em] text-bordeaux uppercase">08:00 · Primo treno</p>
          <h2 className="mt-4 font-display text-[clamp(2.6rem,6vw,4.75rem)] leading-[0.95] font-medium">
            Il bancone apre <em className="font-normal">alle otto.</em>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/75">
            Cornetti e brioche, cappuccino a 1,60 €, il marocchino alla Nutella per chi ha cinque minuti in più. Chi si siede trova
            il Wi‑Fi gratis e i tavoli fuori, sotto il dehors.
          </p>

          <motion.div
            className={`mt-10 w-full max-w-[320px] rotate-[-1.5deg] bg-[#fbf6ec] px-6 pt-6 pb-9 font-mono text-[13px] text-ink shadow-[0_24px_40px_-20px_rgba(23,17,15,.45)] ${zigzag}`}
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            viewport={{ once: true, margin: '-20% 0px' }}
            transition={{ duration: 1.4, ease: EASE_OUT }}
          >
            <p className="text-center font-semibold tracking-[0.2em]">NOVETREQUARTI</p>
            <p className="text-center text-[11px] text-ink/60">Corso Garibaldi 141 · Nuoro</p>
            <p className="mt-3 border-y border-dashed border-ink/30 py-1.5 text-center text-[11px] tracking-[0.2em]">LISTINO DEL MATTINO</p>
            <ul className="mt-3 space-y-1.5">
              {breakfast.map((b) => (
                <li key={b.name} className="flex items-baseline gap-2">
                  <span>{b.name}</span>
                  <span className="flex-1 translate-y-[-3px] border-b border-dotted border-ink/30" />
                  <span className="tabular-nums">{euro(b.price)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-dashed border-ink/30 pt-3 text-center text-[11px] text-ink/60">
              Tiramisù col mascarpone senza lattosio
              <br />I gusti delle brioche li trovi al bancone
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
