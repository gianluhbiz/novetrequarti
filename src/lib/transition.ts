import { createContext, useContext } from 'react'

export type Phase = 'idle' | 'cover' | 'reveal'

export const TransitionContext = createContext<{ go: (to: string) => void; phase: Phase }>({
  go: () => {},
  phase: 'idle',
})

export const useTransitionNav = () => useContext(TransitionContext)
