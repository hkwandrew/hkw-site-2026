import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  SCENE_TRANSITION_DURATION_MS,
  getPageKeyForPath,
  resolveSceneStateForPath,
  resolveSceneTransition,
} from '@/app/landscape/sceneRegistry'
import {
  animateSharedSceneTransition,
  applySharedSceneState,
} from '@/app/landscape/runtime/sharedSceneRuntime'

const useLandscapeTransitionController = (pathname) => {
  const mainRef = useRef(null)
  const hasMountedRef = useRef(false)
  const activeSceneTimelineRef = useRef(null)
  const activeTargetPathRef = useRef(null)
  const currentScenePathRef = useRef(pathname)
  const completedScenePathRef = useRef(pathname)
  const locationPathRef = useRef(pathname)
  const homeHoverClearTimeoutRef = useRef(null)
  const [homeHoverRegion, setHomeHoverRegion] = useState(null)
  const [pendingNavPath, setPendingNavPath] = useState(null)
  const [revealedContentPath, setRevealedContentPath] = useState(pathname)

  const pageKey = getPageKeyForPath(pathname)
  const isHome = pathname === '/'
  const headerContentPath = revealedContentPath
  const scenePathname = pendingNavPath ?? pathname
  const headerNavPath = scenePathname
  const shouldShowHeader = headerContentPath !== '/roots'
  const isRouteContentRevealed = revealedContentPath === pathname
  const areHomeLayerLinksInteractive = isHome && isRouteContentRevealed

  const setSceneTransitionKey = useCallback((fromPath, toPath) => {
    const mainElement = mainRef.current
    if (!mainElement) return

    const transitionKey = resolveSceneTransition(fromPath, toPath)?.transitionKey

    if (transitionKey) {
      mainElement.setAttribute('data-transition', transitionKey)
      return
    }

    mainElement.removeAttribute('data-transition')
  }, [])

  const finishSceneTransition = useCallback((nextPath) => {
    activeSceneTimelineRef.current = null
    activeTargetPathRef.current = null
    currentScenePathRef.current = nextPath
    completedScenePathRef.current = nextPath
    mainRef.current?.removeAttribute('data-transition')
    mainRef.current?.setAttribute('data-scene-page', getPageKeyForPath(nextPath))

    if (locationPathRef.current === nextPath) {
      queueMicrotask(() => {
        setRevealedContentPath(nextPath)
      })
    }
  }, [])

  const cancelPendingHomeHoverClear = useCallback(() => {
    if (
      homeHoverClearTimeoutRef.current !== null &&
      typeof window !== 'undefined'
    ) {
      window.clearTimeout(homeHoverClearTimeoutRef.current)
      homeHoverClearTimeoutRef.current = null
    }
  }, [])

  const requestHomeHoverRegion = useCallback(
    (nextRegion) => {
      cancelPendingHomeHoverClear()
      setHomeHoverRegion(nextRegion)
    },
    [cancelPendingHomeHoverClear],
  )

  const clearHomeHoverRegion = useCallback(() => {
    cancelPendingHomeHoverClear()

    if (typeof window === 'undefined') {
      setHomeHoverRegion(null)
      return
    }

    homeHoverClearTimeoutRef.current = window.setTimeout(() => {
      setHomeHoverRegion(null)
      homeHoverClearTimeoutRef.current = null
    }, 40)
  }, [cancelPendingHomeHoverClear])

  const transitionSceneToPath = useCallback(
    (nextPath) => {
      const mainElement = mainRef.current
      const nextSceneState = resolveSceneStateForPath(nextPath)
      const fromPath = activeTargetPathRef.current ?? currentScenePathRef.current
      const transitionConfig = resolveSceneTransition(fromPath, nextPath)
      const shouldReduceMotion =
        typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

      if (!mainElement || !nextSceneState) return false

      cancelPendingHomeHoverClear()
      setHomeHoverRegion(null)

      queueMicrotask(() => {
        setPendingNavPath(nextPath)
      })

      activeSceneTimelineRef.current?.kill()
      activeTargetPathRef.current = nextPath
      mainElement.setAttribute('data-scene-page', getPageKeyForPath(nextPath))
      setSceneTransitionKey(fromPath, nextPath)

      if (!transitionConfig) {
        applySharedSceneState(mainElement, nextSceneState)
        finishSceneTransition(nextPath)
        return true
      }

      if (shouldReduceMotion) {
        applySharedSceneState(mainElement, transitionConfig.targetState)
        finishSceneTransition(nextPath)
        return true
      }

      activeSceneTimelineRef.current = animateSharedSceneTransition({
        rootElement: mainElement,
        targetState: transitionConfig.targetState,
        durationMs: transitionConfig.durationMs,
        pathMorphByLayer: transitionConfig.pathMorphByLayer,
        onComplete: () => {
          finishSceneTransition(nextPath)
        },
      })

      return true
    },
    [cancelPendingHomeHoverClear, finishSceneTransition, setSceneTransitionKey],
  )

  useLayoutEffect(() => {
    locationPathRef.current = pathname

    if (pendingNavPath === pathname) {
      queueMicrotask(() => {
        setPendingNavPath(null)
      })
    }
  }, [pathname, pendingNavPath])

  useLayoutEffect(() => {
    const mainElement = mainRef.current
    if (!mainElement) return

    if (!hasMountedRef.current) {
      applySharedSceneState(mainElement, resolveSceneStateForPath(pathname))
      currentScenePathRef.current = pathname
      completedScenePathRef.current = pathname
      hasMountedRef.current = true
      return
    }

    if (completedScenePathRef.current === pathname) {
      queueMicrotask(() => {
        setRevealedContentPath(pathname)
      })
      return
    }

    if (activeTargetPathRef.current === pathname) {
      return
    }

    if (!transitionSceneToPath(pathname)) {
      completedScenePathRef.current = pathname
      queueMicrotask(() => {
        setRevealedContentPath(pathname)
      })
    }
  }, [pathname, transitionSceneToPath])

  return {
    SCENE_TRANSITION_DURATION_MS,
    pageKey,
    mainRef,
    headerContentPath,
    headerNavPath,
    scenePathname,
    shouldShowHeader,
    isRouteContentRevealed,
    areHomeLayerLinksInteractive,
    transitionContextValue: useMemo(
      () => ({ transitionSceneToPath }),
      [transitionSceneToPath],
    ),
    homeHoverContextValue: useMemo(
      () => ({
        clearHomeHoverRegion,
        homeHoverRegion: areHomeLayerLinksInteractive ? homeHoverRegion : null,
        isHome,
        isHomeInteractive: areHomeLayerLinksInteractive,
        setHomeHoverRegion: requestHomeHoverRegion,
      }),
      [
        areHomeLayerLinksInteractive,
        clearHomeHoverRegion,
        homeHoverRegion,
        isHome,
        requestHomeHoverRegion,
      ],
    ),
  }
}

export default useLandscapeTransitionController
