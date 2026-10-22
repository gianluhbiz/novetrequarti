import { useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'

type Anchor = { y: number; m: number }

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

/**
 * Maps page scroll to a time of day. Sections declare `data-clock="12:30"`;
 * the time at each section is reached when it hits the middle of the viewport.
 */
export function useDayClock() {
  const anchors = useRef<Anchor[]>([{ y: 0, m: 480 }])
  const { scrollY } = useScroll()

  useEffect(() => {
    const measure = () => {
      // The last sections can't reach mid-viewport, so cap each anchor at the max scroll.
      const max = document.documentElement.scrollHeight - window.innerHeight
      const list = [...document.querySelectorAll<HTMLElement>('[data-clock]')]
        .map((el) => ({
          y: Math.min(max, el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.5),
          m: toMinutes(el.dataset.clock!),
        }))
        .sort((a, b) => a.y - b.y)
      if (list.length) anchors.current = [{ y: 0, m: list[0].m }, ...list]
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(document.body)
    window.addEventListener('load', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('load', measure)
    }
  }, [])

  const raw = useTransform(scrollY, (y) => {
    const a = anchors.current
    if (y <= a[0].y) return a[0].m
    for (let i = 1; i < a.length; i++) {
      if (y <= a[i].y) {
        const t = (y - a[i - 1].y) / Math.max(1, a[i].y - a[i - 1].y)
        return a[i - 1].m + (a[i].m - a[i - 1].m) * t
      }
    }
    return a[a.length - 1].m
  })

  return useSpring(raw, { stiffness: 140, damping: 26, mass: 0.6 })
}
