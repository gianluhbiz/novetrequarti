import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import Departures from '../components/Departures'
import Fraction from '../components/Fraction'
import SlatImage from '../components/SlatImage'
import Ticket from '../components/Ticket'
import { heroDishes, info } from '../data/site'
import { EASE_OUT } from '../lib/motion'

function Line({ children, delay, play, className = '' }: { children: ReactNode; delay: number; play: boolean; className?: string }) {
  return (
    <span className={`block overflow-hidden pb-[0.04em] ${className}`}>
      <motion.span
        className="block"
        initial={{ transform: 'translateY(105%)' }}
        animate={play ? { transform: 'translateY(0%)' } : undefined}
        transition={{ duration: 1, ease: EASE_OUT, delay }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export default function Hero({ play }: { play: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const numeralY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const fade = (d: number) => ({
    initial: { opacity: 0, transform: 'translateY(16px)' },
    animate: play ? { opacity: 1, transform: 'translateY(0px)' } : undefined,
    transition: { duration: 0.8, ease: EASE_OUT, delay: d },
  })

  return (
    <section ref={ref} data-clock="08:00" className="relative px-4 pt-24 pb-20 sm:px-8 sm:pt-32 lg:pb-28">
      <div className="mx-auto grid max-w-[1400px] gap-x-10 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.p {...fade(0.1)} className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.2em] text-ink/60 uppercase">
            <span className="inline-block size-1.5 rounded-full bg-bordeaux" />
            {info.address} · Nuoro
          </motion.p>

          <h1 className="mt-5 font-display text-ink">
            <Line play={play} delay={0.15} className="text-[clamp(3rem,9.5vw,8.5rem)] leading-[0.9] font-normal italic">
              Binario
            </Line>
            <motion.span style={{ y: numeralY }} className="block">
              <Line play={play} delay={0.25} className="mt-[0.04em] text-[clamp(9.5rem,30vw,23rem)] leading-[0.82] font-semibold tracking-[-0.02em]">
                9<Fraction className="ml-[0.04em] text-bordeaux" />
              </Line>
            </motion.span>
          </h1>

          <motion.p {...fade(0.55)} className="mt-6 max-w-[34rem] text-lg leading-relaxed text-ink/80 sm:text-xl">
            Siamo un bar in Corso Garibaldi. Facciamo colazione dalle 8, a pranzo cuciniamo un menù che cambia ogni giorno e la
            sera versiamo Cannonau di Mamoiada e 61 gin diversi.
          </motion.p>

          <motion.div {...fade(0.7)} className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <Ticket />
            <a href={info.phoneHref} className="group flex items-center gap-3 text-sm font-medium">
              <span className="grid size-11 place-items-center rounded-full border border-ink/20 transition-colors duration-200 group-hover:bg-ink group-hover:text-cream">
                <i className="ri-phone-line text-lg" aria-hidden />
              </span>
              <span>
                Prenota un tavolo
                <span className="block font-mono text-xs text-ink/60">{info.phone}</span>
              </span>
            </a>
          </motion.div>
        </div>

        <motion.div
          className="lg:col-span-5 lg:pt-6"
          initial={{ clipPath: 'inset(100% 0% 0% 0% round 28px)' }}
          animate={play ? { clipPath: 'inset(0% 0% 0% 0% round 28px)' } : undefined}
          transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.35 }}
        >
          <SlatImage items={heroDishes} play={play} />
        </motion.div>

        <motion.div {...fade(0.9)} className="lg:col-span-8">
          <Departures play={play} />
        </motion.div>
        <motion.aside {...fade(1)} className="flex flex-col justify-end gap-3 lg:col-span-4">
          <p className="font-display text-2xl leading-snug italic sm:text-3xl">
            «Ci ha detto che la struttura sembrava un bar ma faceva ottimi piatti.»
          </p>
          <p className="font-mono text-xs tracking-wide text-ink/60">
            Una signora di Nuoro a Luciano F., che ci ha poi scritto su Tripadvisor
          </p>
        </motion.aside>
      </div>
    </section>
  )
}
