import { animate, motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react'
import { img, reviews, type Review } from '../data/site'
import { canHover, EASE_OUT } from '../lib/motion'

function CountUp({ to, decimals = 0 }: { to: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduce = useReducedMotion()
  useEffect(() => {
    if (!inView || !ref.current) return
    const node = ref.current
    const write = (v: number) => (node.textContent = v.toLocaleString('it-IT', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }))
    if (reduce) {
      write(to)
      return
    }
    const c = animate(0, to, { duration: 1.4, ease: EASE_OUT, onUpdate: write })
    return () => c.stop()
  }, [inView, to, decimals, reduce])
  return <span ref={ref}>0</span>
}

const stats = [
  { label: 'Google', value: 4.5, decimals: 1, note: '477 recensioni' },
  { label: 'Tripadvisor', value: 4.5, decimals: 1, note: '36 recensioni' },
  { label: 'Servizio', value: 4.9, decimals: 1, note: 'voto Tripadvisor' },
  { label: 'A Nuoro', value: 24, decimals: 0, note: 'su 173 ristoranti' },
]

// Desktop layout of the "platform": left %, top px, rotation.
const SPOTS: [number, number, number][] = [
  [1, 10, -6], [25, 70, 4], [50, 0, -3], [75, 50, 6],
  [3, 360, 4], [27, 410, -5], [53, 340, 3], [77, 400, -4],
  [10, 690, -2], [40, 700, 5], [68, 690, -6],
]

let topZ = 50

function Draggable({ children, spot, bounds, drag, index }: { children: ReactNode; spot: [number, number, number]; bounds: RefObject<HTMLDivElement | null>; drag: boolean; index: number }) {
  const [z, setZ] = useState(index)
  return (
    <motion.div
      className={drag ? 'absolute' : 'relative'}
      style={drag ? { left: `${spot[0]}%`, top: spot[1], zIndex: z } : undefined}
      initial={{ opacity: 0, transform: 'translateY(40px)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay: (index % 4) * 0.06 }}
    >
      <motion.div
        className={drag ? 'cursor-grab active:cursor-grabbing' : ''}
        style={{ rotate: drag ? spot[2] : spot[2] / 2 }}
        drag={drag}
        dragConstraints={bounds}
        dragElastic={0.15}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 22 }}
        whileDrag={{ scale: 1.04, rotate: 0 }}
        onPointerDown={() => drag && setZ(++topZ)}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

function Tag({ r }: { r: Review }) {
  return (
    <article className="relative w-[min(86vw,270px)] rounded-[16px] bg-[#fbf3e3] p-5 pt-7 text-ink shadow-[0_18px_30px_-16px_rgba(23,17,15,.5)] select-none">
      <span className="absolute top-3 left-1/2 size-3 -translate-x-1/2 rounded-full bg-cream shadow-[inset_0_1px_2px_rgba(0,0,0,.4)] ring-2 ring-tan" />
      <p className="font-mono text-[10px] tracking-[0.25em] text-bordeaux uppercase">Da</p>
      <p className="text-sm font-semibold">{r.from}</p>
      <p lang={r.lang} className="mt-3 font-display text-[1.15rem] leading-snug italic">«{r.quote}»</p>
      <p className="mt-4 flex items-center justify-between border-t border-dashed border-ink/20 pt-3 font-mono text-[10px] tracking-wide text-ink/60">
        <span>{r.who} · {r.when}</span>
        <span className="flex items-center gap-1">
          <i className={r.source === 'Google' ? 'ri-google-fill' : 'ri-star-fill'} aria-hidden />
          {r.source}
        </span>
      </p>
    </article>
  )
}

function Polaroid({ src, caption }: { src: string; caption: string }) {
  return (
    <figure className="w-[min(70vw,230px)] bg-white p-3 pb-4 shadow-[0_20px_34px_-16px_rgba(23,17,15,.55)] select-none">
      <img src={src} alt={caption} loading="lazy" draggable={false} className="aspect-square w-full object-cover" />
      <figcaption className="mt-3 text-center font-display text-base italic">{caption}</figcaption>
    </figure>
  )
}

function Lucia() {
  return (
    <article className="relative w-[min(86vw,270px)] rounded-[16px] bg-bordeaux p-5 pt-7 text-cream shadow-[0_18px_30px_-16px_rgba(23,17,15,.6)] select-none">
      <span className="absolute top-3 left-1/2 size-3 -translate-x-1/2 rounded-full bg-cream/90 ring-2 ring-brass" />
      <p className="font-mono text-[10px] tracking-[0.25em] text-amber uppercase">Capotreno</p>
      <p className="font-display text-3xl font-semibold">Lucia</p>
      <p className="mt-2 text-sm text-cream/80">La gatta di casa. Spesso la trovate in sala, e i cani sono i benvenuti.</p>
      <p className="mt-3 font-display text-[1.05rem] italic">«Il capo indiscusso Lucia non vede l'ora di accoglierti.»</p>
      <p className="mt-3 font-mono text-[10px] text-cream/60">Rosa, su Google</p>
    </article>
  )
}

export default function Arrivi() {
  const bounds = useRef<HTMLDivElement>(null)
  const [drag, setDrag] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const set = () => setDrag(mq.matches && canHover())
    set()
    mq.addEventListener('change', set)
    return () => mq.removeEventListener('change', set)
  }, [])

  const items: ReactNode[] = [
    ...reviews.slice(0, 4).map((r) => <Tag key={r.who} r={r} />),
    <Polaroid key="p1" src={img('tagliere-aperitivo')} caption="Aperitivo per quattro" />,
    <Lucia key="lucia" />,
    ...reviews.slice(4, 6).map((r) => <Tag key={r.who} r={r} />),
    <Polaroid key="p2" src={img('frittura')} caption="Frittura di calamari" />,
    ...reviews.slice(6).map((r) => <Tag key={r.who} r={r} />),
  ]

  return (
    <section id="arrivi" data-clock="16:00" className="relative overflow-hidden px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="font-mono text-[11px] tracking-[0.25em] text-bordeaux uppercase">Arrivi</p>
            <h2 className="mt-4 font-display text-[clamp(2.8rem,7vw,6rem)] leading-[0.92] font-medium">
              Chi è sceso <em className="font-normal">a questo binario.</em>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/75">
              Arrivano da Cagliari, da Milano, dal Kentucky. Abbiamo appeso qui sotto alcune delle cose che hanno scritto.
              {drag && <span className="text-ink/50"> Le etichette si possono spostare.</span>}
            </p>
          </div>
          <div className="self-end rounded-2xl bg-board p-5 text-cream lg:col-span-6 sm:p-6">
            <p className="mb-3 font-mono text-[10px] tracking-[0.25em] text-amber uppercase">Tabellone arrivi · valutazioni</p>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-mono text-[10px] tracking-[0.2em] text-cream/50 uppercase">{s.label}</dt>
                  <dd className="mt-1 font-display text-5xl font-semibold tabular-nums">
                    {s.label === 'A Nuoro' && <span className="text-2xl">N.</span>}
                    <CountUp to={s.value} decimals={s.decimals} />
                  </dd>
                  <dd className="font-mono text-[11px] text-cream/60">{s.note}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div
          ref={bounds}
          className={drag ? 'relative mt-16 h-[1000px]' : 'mt-14 flex flex-col items-center gap-6 sm:grid sm:grid-cols-2 sm:justify-items-center'}
        >
          {items.map((node, i) => (
            <Draggable key={i} spot={SPOTS[i % SPOTS.length]} bounds={bounds} drag={drag} index={i}>
              {node}
            </Draggable>
          ))}
        </div>
      </div>
    </section>
  )
}
