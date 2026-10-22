import { motion } from 'framer-motion'
import { useEffect } from 'react'
import SplitFlap from '../components/SplitFlap'
import { EASE_IN_OUT } from '../lib/motion'

const cell =
  'h-[1.6em] w-[1.1em] rounded-[4px] bg-gradient-to-b from-[#2b2725] to-[#1a1817] text-cream shadow-[inset_0_1px_0_rgba(255,255,255,.06)]'

/** First visit only: the board announces the stop, then lifts like a shutter. */
export default function Intro({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'
    const t = window.setTimeout(onDone, 2300)
    return () => {
      window.clearTimeout(t)
      document.documentElement.style.overflow = ''
    }
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex cursor-pointer flex-col items-center justify-center gap-3 bg-board px-4"
      onClick={onDone}
      initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      transition={{ duration: 0.85, ease: EASE_IN_OUT }}
      role="presentation"
    >
      <p className="mb-3 font-mono text-[10px] tracking-[0.35em] text-amber uppercase sm:text-xs">Prossima fermata</p>
      <SplitFlap text="NOVETREQUARTI" delay={0.1} cellClassName={`${cell} font-mono text-[18px] sm:text-[34px]`} />
      <SplitFlap text="NUORO · BIN 9¾" delay={0.45} cellClassName={`${cell} font-mono text-[18px] sm:text-[34px]`} />
      <p className="absolute bottom-6 font-mono text-[10px] tracking-[0.3em] text-cream/30 uppercase">tocca per entrare</p>
    </motion.div>
  )
}
