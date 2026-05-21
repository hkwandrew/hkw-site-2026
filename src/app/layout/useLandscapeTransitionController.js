import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'
import {
  SCENE_TRANSITION_DURATION_MS,
  getPageKeyForPath,
  resolveSceneStateForPath,
  resolveSceneTransition,
} from '@/app/landscape/sceneRegistry'
import { getRouteContentRevealLeadMs } from '@/app/router/routeRegistry'
import {
  animateSharedSceneTransition,
  applySharedSceneState,
  SCENE_VIEWPORT_MOBILE_QUERY,
} from '@/app/landscape/runtime/sharedSceneRuntime'

const HOME_HOVER_DEVICE_QUERY = '(hover: hover) and (pointer: fine)'

const isMobileViewport = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.(SCENE_VIEWPORT_MOBILE_QUERY).matches === true

const subscribeToMobileViewport = (onChange) => {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return () => {}
  }

  const mediaQuery = window.matchMedia(SCENE_VIEWPORT_MOBILE_QUERY)

  mediaQuery.addEventListener('change', onChange)

  return () => {
    mediaQuery.removeEventListener('change', onChange)
  }
}

const canUseHomeHoverRegions = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.(HOME_HOVER_DEVICE_QUERY).matches === true &&
  window.matchMedia?.(SCENE_VIEWPORT_MOBILE_QUERY).matches !== true

const subscribeToHomeHoverCapability = (onChange) => {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return () => {}
  }

  const mediaQueries = [
    window.matchMedia(HOME_HOVER_DEVICE_QUERY),
    window.matchMedia(SCENE_VIEWPORT_MOBILE_QUERY),
  ]

  mediaQueries.forEach((mediaQuery) => {
    mediaQuery.addEventListener('change', onChange)
  })

  return () => {
    mediaQueries.forEach((mediaQuery) => {
      mediaQuery.removeEventListener('change', onChange)
    })
  }
}

const useLandscapeTransitionController = (pathname) => {
  const mainRef = useRef(null)
  const hasMountedRef = useRef(false)
  const activeSceneTimelineRef = useRef(null)
  const activeTargetPathRef = useRef(null)
  const currentScenePathRef = useRef(pathname)
  const completedScenePathRef = useRef(pathname)
  const locationPathRef = useRef(pathname)
  const homeHoverClearTimeoutRef = useRef(null)
  const routeContentRevealTimeoutRef = useRef(null)
  const [homeHoverRegion, setHomeHoverRegion] = useState(null)
  const [pendingNavPath, setPendingNavPath] = useState(null)
  const [revealedContentPath, setRevealedContentPath] = useState(pathname)
  const [earlyRevealedContentPath, setEarlyRevealedContentPath] = useState(null)
  const canUseHoverRegions = useSyncExternalStore(
    subscribeToHomeHoverCapability,
    canUseHomeHoverRegions,
    () => false,
  )
  const isMobile = useSyncExternalStore(
    subscribeToMobileViewport,
    isMobileViewport,
    () => false,
  )

  const pageKey = getPageKeyForPath(pathname)
  const isHome = pathname === '/'
  const headerContentPath = revealedContentPath
  const scenePathname = pendingNavPath ?? pathname
  const headerNavPath = scenePathname
  const shouldShowHeader = headerContentPath !== '/roots' || isMobile
  const isRouteContentRevealed = revealedContentPath === pathname
  const shouldRenderRouteContent =
    isRouteContentRevealed || earlyRevealedContentPath === pathname
  const isPageLabelRevealed = isRouteContentRevealed && pendingNavPath === null
  const areHomeLayerLinksInteractive =
    isHome && isRouteContentRevealed && canUseHoverRegions

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
        setEarlyRevealedContentPath(null)
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

  const clearRouteContentRevealTimer = useCallback(() => {
    if (
      routeContentRevealTimeoutRef.current !== null &&
      typeof window !== 'undefined'
    ) {
      window.clearTimeout(routeContentRevealTimeoutRef.current)
      routeContentRevealTimeoutRef.current = null
    }
  }, [])

  const scheduleRouteContentLeadReveal = useCallback(
    (nextPath, durationMs) => {
      const revealLeadMs = getRouteContentRevealLeadMs(nextPath)

      if (!revealLeadMs || typeof window === 'undefined') return

      const revealDelayMs = Math.max(durationMs - revealLeadMs, 0)

      clearRouteContentRevealTimer()
      routeContentRevealTimeoutRef.current = window.setTimeout(() => {
        routeContentRevealTimeoutRef.current = null

        if (
          locationPathRef.current === nextPath &&
          activeTargetPathRef.current === nextPath
        ) {
          setEarlyRevealedContentPath(nextPath)
        }
      }, revealDelayMs)
    },
    [clearRouteContentRevealTimer],
  )

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
      clearRouteContentRevealTimer()
      setHomeHoverRegion(null)
      setEarlyRevealedContentPath(null)

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

      scheduleRouteContentLeadReveal(nextPath, transitionConfig.durationMs)

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
    [
      cancelPendingHomeHoverClear,
      clearRouteContentRevealTimer,
      finishSceneTransition,
      scheduleRouteContentLeadReveal,
      setSceneTransitionKey,
    ],
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
        setEarlyRevealedContentPath(null)
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
        setEarlyRevealedContentPath(null)
      })
    }
  }, [pathname, transitionSceneToPath])

  useLayoutEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return undefined
    }

    const mediaQuery = window.matchMedia(SCENE_VIEWPORT_MOBILE_QUERY)
    const applyCurrentViewportSceneState = () => {
      const mainElement = mainRef.current
      const targetPath =
        activeTargetPathRef.current ?? currentScenePathRef.current ?? pathname
      const sceneState = resolveSceneStateForPath(targetPath)

      if (!mainElement || !sceneState) return

      activeSceneTimelineRef.current?.kill()
      activeSceneTimelineRef.current = null
      applySharedSceneState(mainElement, sceneState)

      if (activeTargetPathRef.current) {
        finishSceneTransition(targetPath)
      }
    }

    mediaQuery.addEventListener('change', applyCurrentViewportSceneState)

    return () => {
      mediaQuery.removeEventListener('change', applyCurrentViewportSceneState)
    }
  }, [finishSceneTransition, pathname])

  useLayoutEffect(() => clearRouteContentRevealTimer, [clearRouteContentRevealTimer])

  return {
    SCENE_TRANSITION_DURATION_MS,
    pageKey,
    mainRef,
    headerContentPath,
    headerNavPath,
    isPageLabelRevealed,
    scenePathname,
    shouldShowHeader,
    isRouteContentRevealed,
    shouldRenderRouteContent,
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
