import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from 'framer-motion'
import { useLayoutEffect, useRef, useState } from 'react'
import Badge from '../components/Badge'
import Ticket from '../components/Ticket'
import { carriage } from '../data/site'
import { EASE_OUT, euro } from '../lib/motion'

type Dish = (typeof carriage)[number]

function Window({ dish, i, total, progress }: { dish: Dish; i: number; total: number; progress: MotionValue<number> }) {
  const center = (i + 0.5) / total
  const imgX = useTransform(progress, [center - 0.35, center + 0.35], ['14%', '-14%'])
  const glare = useTransform(progress, [center - 0.3, center + 0.3], ['-60%', '160%'])
  return (
    <div className="flex w-[min(64vw,300px)] shrink-0 flex-col gap-4 sm:w-[min(40vw,320px)]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[30px] bg-ink shadow-[inset_0_0_0_7px_#2a0b10,0_2px_0_2px_rgba(255,255,255,.08)]">
        <motion.img
          src={dish.src}
          alt={dish.name}
          decoding="async"
          className="absolute inset-y-0 left-[-16%] h-full w-[132%] max-w-none object-cover"
          style={{ x: imgX }}
        />
        <motion.span
          className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/18 to-transparent"
          style={{ left: glare }}
        />
        <span className="pointer-events-none absolute inset-0 rounded-[30px] shadow-[inset_0_0_0_7px_#2a0b10,inset_0_14px_30px_rgba(0,0,0,.35)]" />
      </div>
      <div className="rounded-lg bg-gradient-to-b from-[#e4c27a] to-[#c99c45] px-4 py-3 text-ink shadow-[inset_0_1px_0_rgba(255,255,255,.5),0_6px_14px_-6px_rgba(0,0,0,.5)]">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-semibold leading-tight">{dish.name}</p>
          {'price' in dish && dish.price ? <p className="shrink-0 font-mono text-sm whitespace-nowrap tabular-nums">{euro(dish.price)}</p> : null}
        </div>
        <p className="mt-0.5 text-[13px] text-ink/70">{dish.note}</p>
      </div>
    </div>
  )
}

function Wheel({ progress }: { progress: MotionValue<number> }) {
  const rotate = useTransform(progress, [0, 1], [0, 2160])
  return (
    <motion.span
      style={{ rotate }}
      className="relative block size-14 rounded-full border-[5px] border-[#1d1716] bg-[#3a302d] shadow-[inset_0_0_0_6px_#2a2321] sm:size-16"
    >
      <span className="absolute inset-x-1/2 inset-y-1 w-[3px] -translate-x-1/2 bg-[#1d1716]" />
      <span className="absolute inset-x-1 inset-y-1/2 h-[3px] -translate-y-1/2 bg-[#1d1716]" />
      <span className="absolute top-1/2 left-1/2 size-3 -translate-1/2 rounded-full bg-brass" />
    </motion.span>
  )
}

export default function Vagone() {
  const area = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [distance, setDistance] = useState(2400)
  const [vh, setVh] = useState(800)

  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current) return
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth))
      setVh(window.innerHeight)
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (track.current) ro.observe(track.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const { scrollYProgress: progress, scrollY } = useScroll({ target: area, offset: ['start start', 'end end'] })
  const x = useTransform(progress, [0, 1], [0, -distance])
  const transform = useMotionTemplate`translate3d(${x}px,0,0)`
  const velocity = useVelocity(scrollY)
  const skew = useSpring(useTransform(velocity, [-3000, 0, 3000], [2.5, 0, -2.5], { clamp: true }), { stiffness: 200, damping: 30 })
  const sleepers = useTransform(progress, [0, 1], ['0%', '-50%'])
  const bar = useTransform(progress, [0, 1], [0, 1])
  const half = Math.ceil(carriage.length / 2)

  return (
    <section id="pranzo" data-clock="12:30" className="relative bg-paper">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 pt-24 pb-12 sm:px-8 sm:pt-32 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="font-mono text-[11px] tracking-[0.25em] text-bordeaux uppercase">12:30 · Vagone ristorante</p>
          <h2 className="mt-4 font-display text-[clamp(2.8rem,7vw,6rem)] leading-[0.92] font-medium">
            Sembra un bar.
            <br />
            <em className="font-normal text-bordeaux">Poi arriva il pranzo.</em>
          </h2>
        </div>
        <div className="flex flex-col justify-end gap-6 lg:col-span-5">
          <p className="text-lg leading-relaxed text-ink/75">
            La cucina apre dalle 12:30 alle 14:30. Il menù è corto e cambia ogni giorno: tartare e tataki di tonno, polpo, lasagne,
            zuppe di legumi, qualche piatto di carne. Lo pubblichiamo ogni mattina nelle storie Instagram.
          </p>
          <blockquote className="border-l-2 border-bordeaux pl-4">
            <p className="font-display text-xl italic">«Da fuori non un granché… ma ragazzi, pranzo eccellente.»</p>
            <footer className="mt-1 font-mono text-xs text-ink/55">arianna d., Tripadvisor, agosto 2025</footer>
          </blockquote>
        </div>
      </div>

      <div ref={area} className="relative" style={{ height: reduce ? 'auto' : distance + vh }}>
        <div className={`${reduce ? '' : 'sticky top-0 h-svh'} flex flex-col justify-center overflow-hidden`}>
          <div className="mx-auto mb-6 flex w-full max-w-[1400px] items-center gap-4 px-4 font-mono text-[10px] tracking-[0.25em] text-ink/55 uppercase sm:px-8">
            <span>Binario 9¾</span>
            <span className="relative h-px flex-1 bg-ink/15">
              <motion.span className="absolute inset-0 origin-left bg-bordeaux" style={{ scaleX: bar }} />
            </span>
            <span>Cucina</span>
          </div>

          <div className={reduce ? 'overflow-x-auto' : ''}>
            <motion.div ref={track} className="flex w-max items-end pr-[8vw] pl-4 sm:pl-8" style={reduce ? undefined : { transform }}>
              <motion.div style={{ skewX: skew }} className="flex items-end gap-3">
                {/* Locomotive nose */}
                <div className="relative flex h-[min(72vh,600px)] w-[200px] shrink-0 flex-col items-center justify-center gap-5 rounded-l-[140px] rounded-r-[18px] bg-bordeaux text-cream shadow-[inset_0_-18px_0_#5c1520] sm:w-[260px]">
                  <span className="absolute top-8 left-10 size-5 rounded-full bg-amber shadow-[0_0_30px_10px_rgba(245,193,90,.45)]" />
                  <Badge className="w-24 sm:w-32" />
                  <p className="font-mono text-[10px] tracking-[0.3em] text-cream/70 uppercase">Novetrequarti</p>
                  <div className="absolute -bottom-7 flex gap-8">
                    <Wheel progress={progress} />
                    <Wheel progress={progress} />
                  </div>
                </div>

                {[carriage.slice(0, half), carriage.slice(half)].map((group, g) => (
                  <div key={g} className="flex items-end gap-3">
                    <span className="mb-16 h-3 w-6 shrink-0 rounded bg-[#1d1716]" aria-hidden />
                    <div className="relative rounded-[22px] bg-bordeaux px-6 pt-5 pb-14 shadow-[inset_0_10px_0_#9b3240,inset_0_-18px_0_#5c1520] sm:px-8">
                      <div className="mb-5 flex items-center justify-between gap-6 font-mono text-[10px] tracking-[0.3em] text-brass uppercase">
                        <span>Vagone ristorante · carrozza {g + 1}</span>
                        <span>Nuoro ⇄ Binario 9¾</span>
                      </div>
                      <div
                        className="absolute inset-x-6 top-[3.1rem] h-1.5 rounded bg-cream/80"
                        aria-hidden
                      />
                      <div className="relative flex gap-5 sm:gap-7">
                        {group.map((d, i) => (
                          <Window key={d.name} dish={d} i={g * half + i} total={carriage.length} progress={progress} />
                        ))}
                      </div>
                      <div className="absolute -bottom-7 left-10 flex gap-6">
                        <Wheel progress={progress} />
                        <Wheel progress={progress} />
                      </div>
                      <div className="absolute right-10 -bottom-7 flex gap-6">
                        <Wheel progress={progress} />
                        <Wheel progress={progress} />
                      </div>
                    </div>
                  </div>
                ))}

                <div className="ml-10 flex w-[min(80vw,420px)] shrink-0 flex-col justify-center gap-5 self-center">
                  <p className="font-display text-3xl leading-tight">Questi sono passati di qui. Quelli di oggi sono nel menù.</p>
                  <Ticket title="Menù del pranzo" sub="Primi, secondi, insalate e dolci" />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Rails */}
          <div className="relative mt-9 h-5 overflow-hidden" aria-hidden>
            <motion.div
              className="absolute inset-y-0 left-0 w-[200%]"
              style={{
                x: sleepers,
                background: 'repeating-linear-gradient(90deg, #6b5a49 0 14px, transparent 14px 46px)',
              }}
            />
            <span className="absolute inset-x-0 top-1 h-[3px] bg-[#3d3330]" />
            <span className="absolute inset-x-0 bottom-1 h-[3px] bg-[#3d3330]" />
          </div>
          <motion.p
            className="mx-auto mt-6 hidden font-mono text-[10px] tracking-[0.25em] text-ink/45 uppercase sm:block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            Continua a scorrere · il treno passa
          </motion.p>
        </div>
      </div>
    </section>
  )
}
