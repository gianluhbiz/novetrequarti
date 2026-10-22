import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import GinWall from '../components/GinWall'
import WineMap from '../components/WineMap'
import { img, signatures } from '../data/site'
import { EASE_OUT } from '../lib/motion'

export default function Sera() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const a = useTransform(scrollYProgress, [0, 1], ['10%', '-10%'])
  const b = useTransform(scrollYProgress, [0, 1], ['35%', '-25%'])
  const c = useTransform(scrollYProgress, [0, 1], ['55%', '-45%'])

  return (
    <section id="vini" data-clock="19:00" className="relative bg-bordeaux-deep text-cream">
      <div className="mx-auto max-w-[1400px] px-4 py-24 sm:px-8 sm:py-32">
        <div ref={ref} className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-mono text-[11px] tracking-[0.25em] text-amber uppercase">Dalle 14:30 · Taglieri e cocktail</p>
            <h2 className="mt-4 font-display text-[clamp(2.8rem,7vw,6rem)] leading-[0.92] font-medium">
              La sera il bancone <em className="font-normal text-bordeaux-soft">cambia turno.</em>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-cream/75">
              La cucina chiude e arrivano i taglieri di salumi e formaggi, con pane caldo e guttiau. Se sei celiaco dillo al bancone:
              lo prepariamo senza glutine. In frigo c'è la Zemyna, la birra artigianale fatta qui a Nuoro.
            </p>
          </div>

          <div className="relative h-[520px] sm:h-[620px] lg:col-span-7">
            <motion.figure style={{ y: a }} className="absolute top-0 right-0 w-[64%] overflow-hidden rounded-[26px]">
              <img src={img('tagliere-aperitivo')} alt="Tavolo con taglieri e spritz visto dall'alto" loading="lazy" className="aspect-[3/4] w-full object-cover" />
            </motion.figure>
            <motion.figure style={{ y: b }} className="absolute top-[18%] left-0 w-[42%] overflow-hidden rounded-[22px] border-4 border-bordeaux-deep">
              <img src={img('serata')} alt="Una serata al Novetrequarti" loading="lazy" className="aspect-[9/16] w-full object-cover" />
            </motion.figure>
            <motion.figure style={{ y: c }} className="absolute right-[8%] bottom-0 w-[34%] overflow-hidden rounded-[18px] border-4 border-bordeaux-deep">
              <img src={img('salsa-versata')} alt="Salsa versata su un piatto di pesce" loading="lazy" className="aspect-[3/4] w-full object-cover" />
            </motion.figure>
          </div>
        </div>

        <div className="mt-28 border-t border-cream/10 pt-20">
          <WineMap />
        </div>

        <div className="mt-28 border-t border-cream/10 pt-20">
          <GinWall />
        </div>

        <div className="mt-28 border-t border-cream/10 pt-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[11px] tracking-[0.25em] text-amber uppercase">Cocktail della casa</p>
              <h3 className="mt-3 font-display text-[clamp(2.2rem,5vw,3.75rem)] leading-[0.95] font-medium">
                Sette ricette, <em className="font-normal">sette euro.</em>
              </h3>
            </div>
            <p className="max-w-sm text-cream/65">I classici li facciamo tutti, se abbiamo gli ingredienti. Chiedi al bancone.</p>
          </div>
          <ol className="mt-10 divide-y divide-cream/10 border-y border-cream/10">
            {signatures.map((s, i) => (
              <motion.li
                key={s.name}
                className="group grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 gap-y-1 py-5 sm:grid-cols-[3rem_minmax(0,22rem)_1fr_auto]"
                initial={{ opacity: 0, transform: 'translateY(14px)' }}
                whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
                viewport={{ once: true, margin: '-5% 0px' }}
                transition={{ duration: 0.5, ease: EASE_OUT, delay: i * 0.05 }}
              >
                <span className="font-mono text-sm text-amber tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                <p className="font-display text-2xl font-medium transition-transform duration-200 ease-out sm:text-3xl [@media(hover:hover)]:group-hover:translate-x-2">
                  {s.name}
                </p>
                <p className="col-start-2 text-sm text-cream/60 sm:col-start-auto">{s.note}</p>
                <p className="hidden font-mono text-sm text-cream/70 sm:block">7 €</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
