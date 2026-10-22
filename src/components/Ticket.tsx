import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { EASE_OUT } from '../lib/motion'
import { useTransitionNav } from '../lib/transition'

const notch =
  '[mask:radial-gradient(circle_at_calc(100%_-_5.5rem)_0,#0000_11px,#000_11.5px)_top/100%_51%_no-repeat,radial-gradient(circle_at_calc(100%_-_5.5rem)_100%,#0000_11px,#000_11.5px)_bottom/100%_51%_no-repeat]'

/** The CTA to the menu page: a ticket that gets punched, then you walk through the wall. */
export default function Ticket({
  title = 'Il menù di oggi',
  sub = 'Pranzo · caffetteria · vini · 61 gin',
  dark = false,
  to = '/menu',
}: {
  title?: string
  sub?: string
  dark?: boolean
  to?: string
}) {
  const { go } = useTransitionNav()
  const [punched, setPunched] = useState(false)

  const onClick = () => {
    if (punched) return
    setPunched(true)
    window.setTimeout(() => go(to), 260)
    window.setTimeout(() => setPunched(false), 2200)
  }

  return (
    <button
      onClick={onClick}
      className={`group relative block w-full max-w-[460px] text-left transition-transform duration-200 ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:-rotate-1 ${notch}`}
      aria-label={title}
    >
      <div className={`flex overflow-hidden rounded-2xl ${dark ? 'bg-cream text-ink' : 'bg-ink text-cream'}`}>
        <div className="min-w-0 flex-1 p-5 sm:p-6">
          <p className={`font-mono text-[10px] tracking-[0.25em] uppercase ${dark ? 'text-bordeaux' : 'text-amber'}`}>Biglietto · corsa semplice</p>
          <p className="mt-2 font-display text-[1.7rem] leading-[1.05] font-medium sm:text-3xl">{title}</p>
          <p className={`mt-2 text-sm ${dark ? 'text-ink/60' : 'text-cream/60'}`}>{sub}</p>
          <div
            className={`mt-4 h-6 w-40 opacity-70 ${dark ? 'text-ink' : 'text-cream'}`}
            style={{ background: 'repeating-linear-gradient(90deg, currentColor 0 2px, transparent 2px 4px, currentColor 4px 5px, transparent 5px 9px, currentColor 9px 12px, transparent 12px 14px)' }}
            aria-hidden
          />
        </div>
        <div className={`relative flex w-[5.5rem] shrink-0 flex-col items-center justify-center gap-1 border-l-2 border-dashed ${dark ? 'border-ink/25 bg-paper' : 'border-cream/25 bg-bordeaux'}`}>
          <span className="font-display text-3xl leading-none font-semibold">
            9<sup className="text-[0.55em]">¾</sup>
          </span>
          <span className="flex items-center gap-1 font-mono text-[10px] tracking-[0.2em] uppercase">
            Entra <i className="ri-arrow-right-line transition-transform duration-200 ease-out group-hover:translate-x-0.5" aria-hidden />
          </span>
          <AnimatePresence>
            {punched && (
              <motion.span
                className={`absolute top-4 right-4 size-4 rounded-full shadow-[inset_0_2px_3px_rgba(0,0,0,.45)] ${dark ? 'bg-ink' : 'bg-cream'}`}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.16, ease: EASE_OUT }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </button>
  )
}
