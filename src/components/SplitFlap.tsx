import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·:'

function FlapCell({ target, delay, cycles, play, className }: { target: string; delay: number; cycles: number; play: boolean; className: string }) {
  const reduce = useReducedMotion()
  const [spun, setShown] = useState(' ')
  const shown = reduce ? (play ? target : ' ') : spun

  useEffect(() => {
    if (!play || reduce) return
    let n = 0
    let interval = 0
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        n++
        if (n >= cycles || target === ' ') {
          setShown(target)
          window.clearInterval(interval)
        } else {
          setShown(CHARSET[Math.floor(Math.random() * CHARSET.length)])
        }
      }, 62)
    }, delay * 1000)
    return () => {
      window.clearTimeout(start)
      window.clearInterval(interval)
    }
  }, [target, play, reduce, delay, cycles])

  return (
    <span className={`relative inline-flex items-center justify-center overflow-hidden [perspective:200px] ${className}`}>
      <motion.span
        key={shown}
        className="block"
        initial={reduce ? false : { transform: 'rotateX(-75deg)', opacity: 0.5 }}
        animate={{ transform: 'rotateX(0deg)', opacity: 1 }}
        transition={{ duration: 0.06, ease: 'linear' }}
        style={{ transformOrigin: '50% 0%' }}
      >
        {shown === ' ' ? ' ' : shown}
      </motion.span>
      <span className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-black/55" />
    </span>
  )
}

type Props = {
  text: string
  length?: number
  play?: boolean
  delay?: number
  className?: string
  cellClassName?: string
  label?: string
}

/** Departure-board text. Each letter spins through the alphabet, then settles. */
export default function SplitFlap({ text, length, play = true, delay = 0, className = '', cellClassName = '', label }: Props) {
  const chars = (length ? text.toUpperCase().padEnd(length, ' ').slice(0, length) : text.toUpperCase()).split('')
  return (
    <span className={`inline-flex ${className}`}>
      <span className="sr-only">{label ?? text}</span>
      <span aria-hidden className="inline-flex gap-[2px]">
      {chars.map((c, i) => (
        <FlapCell
          key={i}
          target={c}
          play={play}
          delay={delay + i * 0.03}
          cycles={4 + ((i * 7) % 6)}
          className={cellClassName}
        />
      ))}
      </span>
    </span>
  )
}
