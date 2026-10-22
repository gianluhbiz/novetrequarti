import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Badge from '../components/Badge'
import Fraction from '../components/Fraction'
import Nav from '../components/Nav'
import { img, info } from '../data/site'
import { menu, type MenuCategory, type MenuItem } from '../data/menu'
import { canHover, EASE_OUT, euro } from '../lib/motion'
import { useTransitionNav } from '../lib/transition'
import UltimaCorsa from '../sections/UltimaCorsa'

const BANNERS: Record<string, string> = {
  caffetteria: 'bancone',
  cocktail: 'serata',
  gin: 'scaffale-rum',
  vini: 'carpaccio-vino',
  'snack-dolci': 'tagliere-aperitivo',
}

const today = () =>
  new Intl.DateTimeFormat('it-IT', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Europe/Rome' }).format(new Date())

function Rail({ active, onPick }: { active: string; onPick: (id: string) => void }) {
  const ref = useRef<HTMLUListElement>(null)
  useEffect(() => {
    // Scroll only the rail, never the page.
    const ul = ref.current
    const el = ul?.querySelector<HTMLElement>(`[data-id="${active}"]`)
    if (ul && el) ul.scrollTo({ left: el.offsetLeft - ul.clientWidth / 2 + el.clientWidth / 2, behavior: 'smooth' })
  }, [active])
  return (
    <nav aria-label="Categorie del menù" className="sticky top-[72px] z-30 -mx-4 bg-cream/95 px-4 py-3 backdrop-blur-sm sm:top-[84px] sm:-mx-8 sm:px-8">
      <ul ref={ref} className="relative flex gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {menu.map((c, i) => (
          <li key={c.id} data-id={c.id} className="shrink-0">
            <button
              onClick={() => onPick(c.id)}
              aria-current={active === c.id ? 'true' : undefined}
              className={`relative flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-200 active:scale-[0.97] ${
                active === c.id ? 'text-cream' : 'text-ink/70 hover:text-ink'
              }`}
            >
              {active === c.id && (
                <motion.span layoutId="rail-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', duration: 0.4, bounce: 0.15 }} />
              )}
              <span className="relative font-mono text-[10px] opacity-60">{String(i + 1).padStart(2, '0')}</span>
              <span className="relative">{c.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function Price({ item, labels }: { item: MenuItem; labels?: string[] }) {
  if (labels && item.prices.length > 1) {
    return (
      <span className="flex shrink-0 flex-col items-end gap-0.5 font-mono text-sm tabular-nums sm:flex-row sm:gap-3">
        {item.prices.map((p, i) => (
          <span key={i} className="text-right whitespace-nowrap">
            <span className="mr-1 text-[10px] tracking-wide text-ink/45 uppercase sm:hidden">{labels[i]?.slice(0, 4)}</span>
            {euro(p)}
          </span>
        ))}
      </span>
    )
  }
  if (labels && item.prices.length === 1 && labels[0] === 'Calice') {
    return <span className="shrink-0 font-mono text-sm whitespace-nowrap tabular-nums">{item.prices[0] >= 15 ? `bott. ${euro(item.prices[0])}` : `calice ${euro(item.prices[0])}`}</span>
  }
  return <span className="shrink-0 font-mono text-sm whitespace-nowrap tabular-nums">{item.prices.map(euro).join(' / ')}</span>
}

function Row({ item, labels, index, onPhoto }: { item: MenuItem; labels?: string[]; index: number; onPhoto: (src: string | null) => void }) {
  return (
    <motion.li
      className="group relative"
      initial={{ opacity: 0, transform: 'translateY(12px)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
      viewport={{ once: true, margin: '-5% 0px' }}
      transition={{ duration: 0.5, ease: EASE_OUT, delay: Math.min(index, 10) * 0.04 }}
      onMouseEnter={() => item.photo && onPhoto(img(item.photo))}
      onMouseLeave={() => item.photo && onPhoto(null)}
    >
      <div className="flex items-start gap-4 py-4">
        {item.photo && (
          <img src={img(item.photo)} alt="" loading="lazy" className="size-14 shrink-0 rounded-xl object-cover lg:hidden" />
        )}
        <div className="flex min-w-0 flex-1 items-baseline gap-3">
          <div className="min-w-0">
            <p className="font-semibold leading-snug">
              {item.name}
              {item.photo && <i className="ri-camera-3-line ml-2 hidden align-middle text-bordeaux lg:inline" aria-label="con foto" />}
            </p>
            {item.note && <p className="mt-0.5 text-sm leading-relaxed text-ink/60">{item.note}</p>}
          </div>
          <span className="mt-auto mb-1.5 hidden min-w-6 flex-1 border-b border-dotted border-ink/25 sm:block" />
          <span className="ml-auto">
            <Price item={item} labels={labels} />
          </span>
        </div>
      </div>
    </motion.li>
  )
}

function Category({ c, n, onPhoto }: { c: MenuCategory; n: number; onPhoto: (src: string | null) => void }) {
  const banner = BANNERS[c.id]
  return (
    <section id={c.id} data-cat={c.id} className="scroll-mt-40 border-t border-ink/15 pt-12 pb-20 sm:scroll-mt-44">
      <header className="grid items-end gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="font-mono text-[11px] tracking-[0.25em] text-bordeaux uppercase">
            Binario {String(n).padStart(2, '0')} · {c.kicker}
          </p>
          <h2 className="mt-3 font-display text-[clamp(2.8rem,8vw,6.5rem)] leading-[0.9] font-medium">{c.title}</h2>
        </div>
        {banner && (
          <motion.div
            className="relative h-40 overflow-hidden rounded-[22px] sm:h-52 lg:col-span-5"
            initial={{ clipPath: 'inset(0% 100% 0% 0% round 22px)' }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 22px)' }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.9, ease: EASE_OUT }}
          >
            <img src={img(banner)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          </motion.div>
        )}
      </header>

      {c.id === 'pranzo' && (
        <p className="mt-6 max-w-2xl rounded-2xl bg-paper px-5 py-4 text-ink/80">
          Il menù del pranzo cambia spesso. Quello aggiornato lo pubblichiamo ogni mattina nelle{' '}
          <a href={info.instagram} target="_blank" rel="noreferrer" className="font-semibold text-bordeaux underline underline-offset-4">
            storie Instagram
          </a>
          .
        </p>
      )}

      <div className="mt-10 space-y-12">
        {c.sections.map((s) => (
          <div key={s.title}>
            {(c.sections.length > 1 || s.note) && (
              <div className="mb-2 flex flex-wrap items-end justify-between gap-3 border-b-2 border-ink pb-2">
                <div>
                  {c.sections.length > 1 && <h3 className="font-display text-2xl font-medium italic sm:text-3xl">{s.title}</h3>}
                  {s.note && <p className="mt-1 max-w-xl text-sm text-ink/60">{s.note}</p>}
                </div>
                {s.priceLabels && (
                  <p className="hidden gap-3 font-mono text-[10px] tracking-[0.2em] text-ink/50 uppercase sm:flex">
                    {s.priceLabels.map((l) => (
                      <span key={l}>{l}</span>
                    ))}
                  </p>
                )}
              </div>
            )}
            <ul className={`divide-y divide-ink/10 ${s.items.length > 10 ? 'lg:columns-2 lg:gap-x-16 [&>li]:break-inside-avoid' : 'max-w-3xl'}`}>
              {s.items.map((item, i) => (
                <Row key={item.name + i} item={item} labels={s.priceLabels} index={i} onPhoto={onPhoto} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

/** Desktop only: the dish photo follows the cursor while you read the line. */
function PhotoFollower({ src }: { src: string | null }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 300, damping: 30, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 300, damping: 30, mass: 0.5 })
  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX + 28)
      y.set(e.clientY - 120)
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [x, y])
  return (
    <motion.div className="pointer-events-none fixed top-0 left-0 z-40 hidden lg:block" style={{ x: sx, y: sy }} aria-hidden>
      <AnimatePresence>
        {src && (
          <motion.img
            key={src}
            src={src}
            alt=""
            className="absolute w-60 rounded-2xl object-cover shadow-2xl aspect-[4/5]"
            initial={{ opacity: 0, transform: 'scale(0.92) rotate(-3deg)' }}
            animate={{ opacity: 1, transform: 'scale(1) rotate(-3deg)' }}
            exit={{ opacity: 0, transform: 'scale(0.96) rotate(-3deg)', transition: { duration: 0.12 } }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Menu() {
  const { phase } = useTransitionNav()
  const [active, setActive] = useState(menu[0].id)
  const [photo, setPhoto] = useState<string | null>(null)
  const ready = phase !== 'cover'
  const hover = canHover()

  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>('[data-cat]')]
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-35% 0px -55% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const pick = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const reveal = (d: number) => ({
    initial: { opacity: 0, transform: 'translateY(24px)' },
    animate: ready ? { opacity: 1, transform: 'translateY(0px)' } : undefined,
    transition: { duration: 0.8, ease: EASE_OUT, delay: d },
  })

  return (
    <>
      <Nav onMenuPage />
      <main className="px-4 pt-28 sm:px-8 sm:pt-36">
        <div className="mx-auto max-w-[1400px]">
          <header className="grid items-end gap-10 pb-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <motion.p {...reveal(0.1)} className="font-mono text-[11px] tracking-[0.25em] text-bordeaux uppercase">
                Binario 9¾ → Menù
              </motion.p>
              <h1 className="mt-4 overflow-hidden font-display leading-[0.85]">
                <motion.span
                  className="block text-[clamp(3.6rem,11vw,9rem)] font-semibold tracking-[-0.01em]"
                  initial={{ transform: 'translateY(105%)' }}
                  animate={ready ? { transform: 'translateY(0%)' } : undefined}
                  transition={{ duration: 1, ease: EASE_OUT, delay: 0.15 }}
                >
                  Menù<span className="text-bordeaux">.</span>
                </motion.span>
              </h1>
              <motion.p {...reveal(0.35)} className="mt-6 max-w-xl text-lg leading-relaxed text-ink/75">
                Pranzo dalle 12:30 alle 14:30, caffetteria dalla mattina, poi cocktail, 61 gin e una carta dei vini quasi tutta
                sarda.
              </motion.p>
            </div>

            {/* The ticket, validated for today */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, transform: 'translateY(30px) rotate(4deg)' }}
              animate={ready ? { opacity: 1, transform: 'translateY(0px) rotate(-2deg)' } : undefined}
              transition={{ type: 'spring', duration: 0.9, bounce: 0.2, delay: 0.3 }}
            >
              <div className="flex overflow-hidden rounded-2xl bg-ink text-cream shadow-[0_30px_50px_-24px_rgba(23,17,15,.6)]">
                <div className="flex-1 p-6">
                  <p className="font-mono text-[10px] tracking-[0.25em] text-amber uppercase">Biglietto · valido oggi</p>
                  <p className="mt-2 font-display text-3xl first-letter:uppercase">{today()}</p>
                  <dl className="mt-5 grid grid-cols-2 gap-4 font-mono text-[11px]">
                    <div>
                      <dt className="text-cream/45 uppercase">Da</dt>
                      <dd>Corso Garibaldi 141</dd>
                    </div>
                    <div>
                      <dt className="text-cream/45 uppercase">A</dt>
                      <dd>Tavolo a scelta</dd>
                    </div>
                    <div>
                      <dt className="text-cream/45 uppercase">Cucina</dt>
                      <dd>12:30 – 14:30</dd>
                    </div>
                    <div>
                      <dt className="text-cream/45 uppercase">Prenota</dt>
                      <dd>
                        <a href={info.phoneHref} className="underline underline-offset-2 hover:text-amber">
                          {info.phone}
                        </a>
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="relative flex w-28 shrink-0 flex-col items-center justify-center border-l-2 border-dashed border-cream/25 bg-bordeaux">
                  <motion.div
                    initial={{ opacity: 0, transform: 'scale(1.4) rotate(-20deg)' }}
                    animate={ready ? { opacity: 1, transform: 'scale(1) rotate(-12deg)' } : undefined}
                    transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.9 }}
                  >
                    <Badge className="w-20" />
                  </motion.div>
                  <span className="mt-2 font-display text-2xl font-semibold">
                    9<Fraction />
                  </span>
                </div>
              </div>
            </motion.div>
          </header>

          <Rail active={active} onPick={pick} />

          <div className="mt-6">
            {menu.map((c, i) => (
              <Category key={c.id} c={c} n={i + 1} onPhoto={setPhoto} />
            ))}
          </div>
        </div>
      </main>
      {hover && <PhotoFollower src={photo} />}
      <UltimaCorsa onMenu />
    </>
  )
}
