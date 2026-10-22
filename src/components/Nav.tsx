import { motion, type MotionValue } from 'framer-motion'
import { useEffect, useState, type MouseEvent } from 'react'
import { EASE_OUT } from '../lib/motion'
import { nowInNuoro, openState } from '../lib/schedule'
import { useTransitionNav } from '../lib/transition'
import Badge from './Badge'
import StationClock from './StationClock'

const links = [
  { href: '#orari', label: 'Orari' },
  { href: '#pranzo', label: 'Pranzo' },
  { href: '#arrivi', label: 'Recensioni' },
  { href: '#vini', label: 'Vini e gin' },
]

export default function Nav({ onMenuPage = false, minutes }: { onMenuPage?: boolean; minutes?: MotionValue<number> }) {
  const { go } = useTransitionNav()
  const [state, setState] = useState(() => {
    const n = nowInNuoro()
    return openState(n.day, n.minutes)
  })

  useEffect(() => {
    const t = window.setInterval(() => {
      const n = nowInNuoro()
      setState(openState(n.day, n.minutes))
    }, 30000)
    return () => window.clearInterval(t)
  }, [])

  const jump = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      initial={{ opacity: 0, transform: 'translateY(-20px)' }}
      animate={{ opacity: 1, transform: 'translateY(0px)' }}
      transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.2 }}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 rounded-full bg-ink/92 py-1.5 pr-1.5 pl-1.5 text-cream shadow-[0_12px_40px_-12px_rgba(23,17,15,.6)] backdrop-blur-sm">
        <button
          onClick={() => (onMenuPage ? go('/') : window.scrollTo({ top: 0, behavior: 'smooth' }))}
          className="flex items-center gap-2.5 rounded-full pr-3 transition-transform duration-150 ease-out active:scale-[0.97]"
          aria-label="Torna all'inizio"
        >
          <Badge className="size-9 sm:size-10" />
          <span className="hidden font-display text-lg italic sm:inline">Novetrequarti</span>
        </button>

        {!onMenuPage && (
          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => jump(e, l.href)}
                  className="rounded-full px-3.5 py-2 text-sm text-cream/75 transition-colors duration-200 hover:text-cream"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center gap-2">
          {minutes ? (
            <div className="mr-1 hidden sm:block">
              <StationClock minutes={minutes} />
            </div>
          ) : (
          <p className="hidden items-center gap-2 font-mono text-[11px] tracking-wide text-cream/70 md:flex">
            <span className={`relative flex size-2 rounded-full ${state.open ? 'bg-signal' : 'bg-bordeaux-soft'}`}>
              {state.open && <span className="absolute inset-0 animate-ping rounded-full bg-signal/70" />}
            </span>
            {state.label}
          </p>
          )}
          <button
            onClick={() => go(onMenuPage ? '/' : '/menu')}
            className="group relative flex items-center gap-2 rounded-full bg-cream py-2.5 pr-4 pl-3.5 text-sm font-semibold text-ink transition-transform duration-150 ease-out active:scale-[0.97]"
          >
            <i className={onMenuPage ? 'ri-arrow-left-line' : 'ri-ticket-2-line'} aria-hidden />
            {onMenuPage ? 'Binario' : 'Menù'}
          </button>
        </div>
      </nav>
    </motion.header>
  )
}
