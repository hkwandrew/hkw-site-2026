import { useEffect, useLayoutEffect, useRef } from 'react'
import { useBlocker } from 'react-router'
import { usePageSceneTransition } from '@/app/landscape/pageSceneTransition'
import { SCENE_TRANSITION_DURATION_MS } from '@/app/landscape/sceneRegistry'

const EXIT_PHASE = 'exiting'

const useAboutPageTransition = (pageElement) => {
  const exitTransitionRef = useRef(null)
  const nextPathRef = useRef(null)
  const { transitionSceneToPath } = usePageSceneTransition()
  const leaveAboutBlocker = useBlocker(({ currentLocation, nextLocation }) => {
    const isLeavingAbout =
      currentLocation.pathname === '/about' &&
      nextLocation.pathname !== currentLocation.pathname

    nextPathRef.current = isLeavingAbout ? nextLocation.pathname : null

    return isLeavingAbout
  })

  useEffect(() => {
    if (leaveAboutBlocker.state !== 'blocked') return

    const nextPath = nextPathRef.current

    if (!nextPath) {
      leaveAboutBlocker.proceed()
      return
    }

    transitionSceneToPath(nextPath)

    const runExit = exitTransitionRef.current

    if (!runExit) {
      nextPathRef.current = null
      leaveAboutBlocker.proceed()
      return
    }

    runExit(() => {
      nextPathRef.current = null
      leaveAboutBlocker.proceed()
    })
  }, [leaveAboutBlocker, transitionSceneToPath])

  useLayoutEffect(() => {
    if (!pageElement) return undefined

    const shouldReduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    let exitTimeoutId = 0

    const clearExitTimeout = () => {
      if (!exitTimeoutId) return

      window.clearTimeout(exitTimeoutId)
      exitTimeoutId = 0
    }

    exitTransitionRef.current = (onComplete) => {
      clearExitTimeout()

      if (shouldReduceMotion) {
        onComplete()
        return
      }

      pageElement.dataset.aboutPhase = EXIT_PHASE
      exitTimeoutId = window.setTimeout(() => {
        exitTimeoutId = 0
        onComplete()
      }, SCENE_TRANSITION_DURATION_MS)
    }

    return () => {
      clearExitTimeout()
      exitTransitionRef.current = null
    }
  }, [pageElement])
}

export default useAboutPageTransition
