import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Badge from '../components/Badge'
import Ticket from '../components/Ticket'
import { img, info } from '../data/site'
import { EASE_OUT } from '../lib/motion'

const services = [
  'Wi‑Fi gratuito',
  'Tavoli all’aperto, sotto il dehors',
  'Cani benvenuti',
  'Accessibile in sedia a rotelle',
  'Opzioni vegetariane',
  'Si accettano Visa e Mastercard',
]

export default function UltimaCorsa({ onMenu = false }: { onMenu?: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const spin = useTransform(scrollYProgress, [0, 1], [-90, 0])
  const wordX = useTransform(scrollYProgress, [0, 1], ['-12%', '0%'])

  return (
    <footer ref={ref} data-clock="23:00" className="relative overflow-hidden bg-ink text-cream">
      <div className="mx-auto max-w-[1400px] px-4 pt-24 pb-10 sm:px-8 sm:pt-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="font-mono text-[11px] tracking-[0.25em] text-amber uppercase">23:00 · Ultima corsa</p>
            <motion.h2 style={{ x: wordX }} className="mt-4 font-display text-[clamp(3.6rem,12vw,10rem)] leading-[0.85] font-semibold tracking-[-0.03em]">
              Ultima
              <br />
              <em className="font-normal text-bordeaux-soft">corsa.</em>
            </motion.h2>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-cream/70">
              Dal lunedì al giovedì chiudiamo alle 23:00, il venerdì e il sabato a mezzanotte. La domenica il binario riposa.
            </p>
            <div className="mt-10">
              {onMenu ? (
                <Ticket dark to="/" title="Torna al binario" sub="Orari, vini, recensioni" />
              ) : (
                <Ticket dark title="Guarda il menù" sub="Prima di partire, o mentre arrivi" />
              )}
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <motion.figure
              className="relative overflow-hidden rounded-[26px]"
              initial={{ clipPath: 'inset(10% 10% 10% 10% round 26px)', opacity: 0.4 }}
              whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 26px)', opacity: 1 }}
              viewport={{ once: true, margin: '-15% 0px' }}
              transition={{ duration: 1, ease: EASE_OUT }}
            >
              <img src={img('muro-binario')} alt="Il muro di mattoni della sala con l'insegna 9¾" loading="lazy" className="aspect-[4/3] w-full object-cover" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-5 pt-16 text-sm text-cream/85">
                Il binario esiste davvero: è il muro di mattoni della nostra sala.
              </figcaption>
            </motion.figure>
            <motion.div style={{ rotate: spin }} className="absolute -top-10 -right-4 w-28 sm:w-36">
              <Badge className="w-full drop-shadow-2xl" />
            </motion.div>
          </div>
        </div>

        <div className="mt-20 grid gap-10 border-t border-cream/10 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-mono text-[10px] tracking-[0.25em] text-cream/45 uppercase">Dove</p>
            <p className="mt-3 text-lg">
              {info.address}
              <br />
              {info.city}
            </p>
            <a href={info.maps} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm text-amber underline-offset-4 hover:underline">
              Apri in Maps <i className="ri-arrow-right-up-line" aria-hidden />
            </a>
            <p className="mt-2 text-sm text-cream/50">Zona pedonale, strisce blu a due passi.</p>
          </div>
          <div>
            <p className="font-mono text-[10px] tracking-[0.25em] text-cream/45 uppercase">Prenota</p>
            <a href={info.phoneHref} className="mt-3 block font-display text-3xl hover:text-amber">
              {info.phone}
            </a>
            <p className="mt-2 text-sm text-cream/50">Accettiamo prenotazioni per pranzo e cena.</p>
          </div>
          <div>
            <p className="font-mono text-[10px] tracking-[0.25em] text-cream/45 uppercase">Menù del giorno</p>
            <a href={info.instagram} target="_blank" rel="noreferrer" className="mt-3 flex items-center gap-2 text-lg hover:text-amber">
              <i className="ri-instagram-line text-2xl" aria-hidden /> {info.instagramHandle}
            </a>
            <p className="mt-2 text-sm text-cream/50">Lo pubblichiamo ogni mattina nelle storie.</p>
            <a href={info.facebook} target="_blank" rel="noreferrer" className="mt-3 flex items-center gap-2 text-sm text-cream/70 hover:text-amber">
              <i className="ri-facebook-circle-line text-lg" aria-hidden /> Facebook
            </a>
          </div>
          <div>
            <p className="font-mono text-[10px] tracking-[0.25em] text-cream/45 uppercase">A bordo</p>
            <ul className="mt-3 space-y-1.5 text-sm text-cream/75">
              {services.map((s) => (
                <li key={s} className="flex gap-2">
                  <i className="ri-check-line text-signal" aria-hidden />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-cream/10 pt-6 font-mono text-[11px] text-cream/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Caffè Novetrequarti · Nuoro</p>
          <p>Foto: profili social del locale e ospiti su Tripadvisor</p>
          <p>
            Developed and Designed by{' '}
            <a
              href="https://gianluh.dev"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-bold text-cream/80 underline underline-offset-4 transition-colors duration-200 hover:text-amber"
            >
              Gianluca De Maio
              <i className="ri-external-link-line" aria-hidden />
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
