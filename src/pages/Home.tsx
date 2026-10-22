import { AnimatePresence } from 'framer-motion'
import { useCallback, useState } from 'react'
import Nav from '../components/Nav'
import { useDayClock } from '../lib/dayClock'
import { useTransitionNav } from '../lib/transition'
import Arrivi from '../sections/Arrivi'
import Bancone from '../sections/Bancone'
import Hero from '../sections/Hero'
import Intro from '../sections/Intro'
import Sera from '../sections/Sera'
import UltimaCorsa from '../sections/UltimaCorsa'
import Vagone from '../sections/Vagone'

const SEEN = 'nvtq-intro'

const seenIntro = () => {
  try {
    return sessionStorage.getItem(SEEN) === '1'
  } catch {
    return true
  }
}

export default function Home() {
  const { phase } = useTransitionNav()
  const [intro, setIntro] = useState(() => !seenIntro())
  const minutes = useDayClock()

  const done = useCallback(() => {
    try {
      sessionStorage.setItem(SEEN, '1')
    } catch {
      /* private mode: show the intro again next time, nothing breaks */
    }
    setIntro(false)
  }, [])

  const play = !intro && phase !== 'cover'

  return (
    <>
      <AnimatePresence>{intro && <Intro key="intro" onDone={done} />}</AnimatePresence>
      <Nav minutes={minutes} />
      <main>
        <Hero play={play} />
        <Bancone />
        <Vagone />
        <Arrivi />
        <Sera />
      </main>
      <UltimaCorsa />
    </>
  )
}
