import { useEffect, useLayoutEffect, useRef } from 'react'
import { useBlocker } from 'react-router'
import { usePageSceneTransition } from '@/app/landscape/pageSceneTransition'
import { SCENE_TRANSITION_DURATION_MS } from '@/app/landscape/sceneRegistry'

export const ROOTS_SCENE_TRANSITION_DURATION_MS = SCENE_TRANSITION_DURATION_MS
const ABOUT_ROUTE_PATH = '/about'
const ROOTS_ROUTE_PATH = '/roots'
const WORK_ROUTE_PATH = '/work'

const isRootsPath = (pathname) =>
  pathname === ROOTS_ROUTE_PATH || pathname?.startsWith(`${ROOTS_ROUTE_PATH}/`)

const isWorkPath = (pathname) =>
  pathname === WORK_ROUTE_PATH || pathname?.startsWith(`${WORK_ROUTE_PATH}/`)

const shouldReleaseForDestinationEntry = (pathname) =>
  pathname === ABOUT_ROUTE_PATH || isWorkPath(pathname)

const useRootsPageTransition = () => {
  const sectionRef = useRef(null)
  const exitTransitionRef = useRef(null)
  const nextPathRef = useRef(null)
  const { transitionSceneToPath } = usePageSceneTransition()
  const leaveRootsBlocker = useBlocker(({ currentLocation, nextLocation }) => {
    const isLeavingRoots =
      isRootsPath(currentLocation.pathname) &&
      !isRootsPath(nextLocation.pathname)

    nextPathRef.current = isLeavingRoots ? nextLocation.pathname : null

    return isLeavingRoots
  })

  useEffect(() => {
    if (leaveRootsBlocker.state !== 'blocked') return

    const nextPath = nextPathRef.current

    if (!nextPath) {
      leaveRootsBlocker.proceed()
      return
    }

    transitionSceneToPath(nextPath)

    if (shouldReleaseForDestinationEntry(nextPath)) {
      nextPathRef.current = null
      leaveRootsBlocker.proceed()
      return
    }

    const runExit = exitTransitionRef.current
    if (!runExit) {
      nextPathRef.current = null
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

    let exitTimeoutId = 0

    const setPhase = (phase) => {
      section.dataset.rootsPhase = phase
    }

    setPhase('entered')

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
      if (exitTimeoutId) {
        window.clearTimeout(exitTimeoutId)
      }

      exitTransitionRef.current = null
    }
  }, [])

  return { sectionRef }
}

export default useRootsPageTransition
