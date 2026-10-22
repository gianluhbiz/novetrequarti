import { useEffect, useState } from 'react'
import { departuresFor, nowInNuoro, statusOf, type Status } from '../lib/schedule'
import SplitFlap from './SplitFlap'

const STATUS_STYLE: Record<Status, string> = {
  'IN ORARIO': 'text-signal',
  'IN PARTENZA': 'text-amber animate-pulse',
  'ULTIMA CHIAMATA': 'text-amber animate-pulse',
  PARTITO: 'text-cream/35',
  SOPPRESSO: 'text-bordeaux-soft',
}

const cell =
  'h-[1.75em] w-[1.12em] rounded-[3px] bg-gradient-to-b from-[#2b2725] via-[#221f1d] to-[#1a1817] text-cream shadow-[inset_0_1px_0_rgba(255,255,255,.06)]'

function useNuoroClock() {
  const [now, setNow] = useState(nowInNuoro)
  useEffect(() => {
    const t = window.setInterval(() => setNow(nowInNuoro()), 15000)
    return () => window.clearInterval(t)
  }, [])
  return now
}

/** Real opening hours as a departures board, with live status in Nuoro time. */
export default function Departures({ play }: { play: boolean }) {
  const { day, minutes } = useNuoroClock()
  const rows = departuresFor(day)
  const hh = String(Math.floor(minutes / 60)).padStart(2, '0')
  const mm = String(minutes % 60).padStart(2, '0')

  return (
    <section
      id="orari"
      aria-label="Orari di apertura"
      className="relative rounded-2xl bg-board p-4 text-cream shadow-[0_30px_60px_-20px_rgba(23,17,15,.55),inset_0_0_0_1px_rgba(255,255,255,.05)] sm:p-6"
    >
      <header className="mb-4 flex items-end justify-between gap-4 border-b border-white/10 pb-3 font-mono text-[11px] tracking-[0.18em] uppercase sm:text-xs">
        <div>
          <p className="text-amber">Partenze</p>
          <p className="text-cream/50">Nuoro · Corso Garibaldi</p>
        </div>
        <p className="text-2xl tracking-normal text-amber tabular-nums sm:text-3xl" aria-label={`Ora a Nuoro ${hh}:${mm}`}>
          {hh}
          <span className="animate-pulse">:</span>
          {mm}
        </p>
      </header>

      <div role="table" className="grid gap-y-2.5 font-mono text-[12px] sm:text-[15px]">
        <div role="row" className="hidden grid-cols-[4.2em_1fr_3em_9.5em] gap-3 text-[10px] tracking-[0.2em] text-cream/40 sm:grid">
          <span role="columnheader">ORA</span>
          <span role="columnheader">DESTINAZIONE</span>
          <span role="columnheader">BIN.</span>
          <span role="columnheader">STATO</span>
        </div>
        {rows.map((r, i) => {
          const s = statusOf(r, day, minutes)
          return (
            <div
              role="row"
              key={r.dest}
              className="grid grid-cols-[3.6em_1fr] items-center gap-x-3 gap-y-1 sm:grid-cols-[4.2em_1fr_3em_9.5em]"
            >
              <span role="cell" className="text-amber tabular-nums">{r.time}</span>
              <span role="cell" className="min-w-0">
                <span className="hidden sm:inline">
                  <SplitFlap text={r.dest} length={19} play={play} delay={0.15 + i * 0.12} cellClassName={cell} />
                </span>
                <span className="sm:hidden">
                  <SplitFlap text={r.short} length={12} play={play} delay={0.15 + i * 0.12} cellClassName={cell} />
                </span>
              </span>
              <span role="cell" className="hidden font-display text-lg font-semibold text-cream sm:block">
                9<sup className="text-[0.6em]">¾</sup>
              </span>
              <span role="cell" className={`col-start-2 text-[10px] tracking-[0.16em] sm:col-start-auto sm:text-xs ${STATUS_STYLE[s]}`}>
                ● {s}
              </span>
            </div>
          )
        })}
      </div>

      <p className="mt-4 border-t border-white/10 pt-3 font-mono text-[11px] text-cream/50 sm:text-xs">
        {day === 0 ? 'Domenica il binario riposa. Si riparte lunedì alle 8:00.' : 'Cucina aperta dalle 12:30 alle 14:30 · venerdì e sabato fino a mezzanotte'}
      </p>
    </section>
  )
}
