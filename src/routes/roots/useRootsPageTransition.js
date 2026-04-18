import { useEffect, useLayoutEffect, useRef } from 'react'
import { useBlocker, useLocation } from 'react-router'
import { usePageSceneTransition } from '@/app/landscape/pageSceneTransition'
import { SCENE_TRANSITION_DURATION_MS } from '@/app/landscape/sceneRegistry'
import { ROOTS_ENTRY_STATE_KEY } from '@/routes/home/rootsEntry'

export const ROOTS_SCENE_TRANSITION_DURATION_MS = SCENE_TRANSITION_DURATION_MS

const useRootsPageTransition = () => {
  const location = useLocation()
  const sectionRef = useRef(null)
  const exitTransitionRef = useRef(null)
  const nextPathRef = useRef(null)
  const { transitionSceneToPath } = usePageSceneTransition()
  const shouldAnimateEntryRef = useRef(
    Boolean(location.state?.[ROOTS_ENTRY_STATE_KEY]),
  )
  const leaveRootsBlocker = useBlocker(({ currentLocation, nextLocation }) => {
    const isLeavingRoots =
      currentLocation.pathname === '/roots' &&
      nextLocation.pathname !== currentLocation.pathname

    nextPathRef.current = isLeavingRoots ? nextLocation.pathname : null

    return isLeavingRoots
  })

  useEffect(() => {
    if (leaveRootsBlocker.state !== 'blocked') return

    transitionSceneToPath(nextPathRef.current)

    const runExit = exitTransitionRef.current
    if (!runExit) {
      leaveRootsBlocker.proceed()
      return
    }

    runExit(() => {
      nextPathRef.current = null
      leaveRootsBlocker.proceed()
    })
  }, [leaveRootsBlocker, transitionSceneToPath])

  useLayoutEffect(() => {
    const section = sectionRef.current

    if (!section) return undefined

    const shouldReduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    let enterFrameId = 0
    let exitTimeoutId = 0

    const setPhase = (phase) => {
      section.dataset.rootsPhase = phase
    }

    if (!shouldReduce && shouldAnimateEntryRef.current) {
      setPhase('entering')
      enterFrameId = window.requestAnimationFrame(() => {
        section.dataset.rootsPhase = 'entered'
      })
    } else {
      setPhase('entered')
    }

    exitTransitionRef.current = (onComplete) => {
      if (shouldReduce) {
        onComplete()
        return
      }

      setPhase('exiting')
      exitTimeoutId = window.setTimeout(() => {
        onComplete()
      }, ROOTS_SCENE_TRANSITION_DURATION_MS)
    }

    return () => {
      if (enterFrameId) {
        window.cancelAnimationFrame(enterFrameId)
      }

      if (exitTimeoutId) {
        window.clearTimeout(exitTimeoutId)
      }

      exitTransitionRef.current = null
    }
  }, [])

  return { sectionRef }
}

export default useRootsPageTransition
