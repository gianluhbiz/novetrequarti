import { motion, useMotionValueEvent, useTransform, type MotionValue } from 'framer-motion'
import { useState } from 'react'

const fmt = (v: number) => {
  const m = Math.round(v) % (24 * 60)
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
}

const phaseOf = (v: number) =>
  v < 12 * 60 ? 'Colazione' : v < 14 * 60 + 30 ? 'Pranzo' : v < 22 * 60 ? 'Aperitivo' : 'Ultima corsa'

/** Platform clock that lives in the nav. Scrolling the page moves the day forward. */
export default function StationClock({ minutes }: { minutes: MotionValue<number> }) {
  const hour = useTransform(minutes, (v) => (v / 60) * 30)
  const minute = useTransform(minutes, (v) => v * 6)
  const [label, setLabel] = useState(() => fmt(minutes.get()))
  const [phase, setPhase] = useState(() => phaseOf(minutes.get()))
  useMotionValueEvent(minutes, 'change', (v) => {
    const next = fmt(v)
    if (next !== label) setLabel(next)
    const p = phaseOf(v)
    if (p !== phase) setPhase(p)
  })

  return (
    <div className="flex items-center gap-2.5" aria-hidden>
      <div className="relative size-9 rounded-full bg-cream shadow-[inset_0_0_0_2px_#83232f]">
        <svg viewBox="0 0 100 100" className="absolute inset-0">
          {Array.from({ length: 12 }, (_, i) => (
            <line key={i} x1="50" y1="9" x2="50" y2={i % 3 === 0 ? 22 : 17} stroke="#17110f" strokeWidth={i % 3 === 0 ? 6 : 4} transform={`rotate(${i * 30} 50 50)`} />
          ))}
        </svg>
        <motion.span className="absolute bottom-1/2 left-1/2 h-[9px] w-[2.5px] -translate-x-1/2 rounded-full bg-ink" style={{ rotate: hour, transformOrigin: '50% 100%' }} />
        <motion.span className="absolute bottom-1/2 left-1/2 h-[13px] w-[2px] -translate-x-1/2 rounded-full bg-ink" style={{ rotate: minute, transformOrigin: '50% 100%' }} />
        <span className="absolute top-1/2 left-1/2 size-[5px] -translate-1/2 rounded-full bg-bordeaux" />
      </div>
      <div className="font-mono leading-none">
        <p className="text-[13px] text-cream tabular-nums">{label}</p>
        <p className="mt-1 text-[9px] tracking-[0.2em] text-amber uppercase">{phase}</p>
      </div>
    </div>
  )
}
