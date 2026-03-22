import { useState, useCallback } from 'react'

const TRANSITION_DURATION = 800

export default function useViewTransition(initialView = 'home') {
  const [activeView, setActiveView] = useState(initialView)
  const [previousView, setPreviousView] = useState(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const navigateTo = useCallback(
    (nextView) => {
      if (nextView === activeView || isTransitioning) return
      setPreviousView(activeView)
      setIsTransitioning(true)
      setActiveView(nextView)
      setTimeout(() => {
        setIsTransitioning(false)
        setPreviousView(null)
      }, TRANSITION_DURATION)
    },
    [activeView, isTransitioning]
  )

  return { activeView, previousView, isTransitioning, navigateTo }
}
