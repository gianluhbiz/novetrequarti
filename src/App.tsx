import { MotionConfig } from 'framer-motion'
import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes } from 'react-router'
import WallTransition from './components/WallTransition'
import Home from './pages/Home'

const loadMenu = () => import('./pages/Menu')
const Menu = lazy(loadMenu)

export default function App() {
  // Fetch the menu page in the background so the wall never opens on an empty page.
  useEffect(() => {
    const t = window.setTimeout(loadMenu, 1500)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <WallTransition>
        <div className="grain">
          <Suspense fallback={<div className="min-h-svh bg-cream" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </div>
      </WallTransition>
    </MotionConfig>
  )
}
