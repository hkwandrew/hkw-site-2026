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
  getRouteContentRevealLeadMs,
  getRoutePathForPath,
} from '@/app/router/routeRegistry'
import {
  animateSharedSceneTransition,
  applySharedSceneState,
} from '@/app/landscape/runtime/sharedSceneRuntime'
import {
  VIEWPORT_LAYOUT,
  useViewportComposition,
} from '@/app/layout/viewportComposition'

const isPhoneLayout = (layout) =>
  layout === VIEWPORT_LAYOUT.PHONE_PORTRAIT ||
  layout === VIEWPORT_LAYOUT.PHONE_LANDSCAPE

const canUseHomeHoverRegions = ({ hover, layout, pointer }) =>
  hover === 'hover' && pointer === 'fine' && !isPhoneLayout(layout)

const useLandscapeTransitionController = (pathname) => {
  const viewportComposition = useViewportComposition()
  const routePath = getRoutePathForPath(pathname)
  const mainRef = useRef(null)
  const hasMountedRef = useRef(false)
  const sceneViewportKeyRef = useRef(viewportComposition.sceneViewportKey)
  const activeSceneTimelineRef = useRef(null)
  const activeTargetPathRef = useRef(null)
  const currentScenePathRef = useRef(routePath)
  const completedScenePathRef = useRef(routePath)
  const locationPathRef = useRef(routePath)
  const homeHoverClearTimeoutRef = useRef(null)
  const routeContentRevealTimeoutRef = useRef(null)
  const [homeHoverRegion, setHomeHoverRegion] = useState(null)
  const [pendingNavPath, setPendingNavPath] = useState(null)
  const [activeTransitionPath, setActiveTransitionPath] = useState(null)
  const [revealedContentPath, setRevealedContentPath] = useState(routePath)
  const [earlyRevealedContentPath, setEarlyRevealedContentPath] = useState(null)
  const canUseHoverRegions = canUseHomeHoverRegions(viewportComposition)
  const isPhonePortrait =
    viewportComposition.layout === VIEWPORT_LAYOUT.PHONE_PORTRAIT

  const pageKey = getPageKeyForPath(routePath)
  const isHome = routePath === '/'
  const headerContentPath = revealedContentPath
  const headerContentRoutePath = getRoutePathForPath(headerContentPath)
  const scenePathname = pendingNavPath ?? routePath
  const headerNavPath = scenePathname
  const shouldShowHeader =
    headerContentRoutePath !== '/roots' || isPhonePortrait
  const isRouteContentRevealed =
    revealedContentPath === routePath && activeTransitionPath !== routePath
  const isAboutRouteContentEntering =
    routePath === '/about' && activeTransitionPath === routePath
  const shouldRenderRouteContent =
    isRouteContentRevealed ||
    isAboutRouteContentEntering ||
    earlyRevealedContentPath === routePath
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

    queueMicrotask(() => {
      setActiveTransitionPath(null)
    })

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
      const nextRoutePath = getRoutePathForPath(nextPath)
      const mainElement = mainRef.current
      const nextSceneState = resolveSceneStateForPath(nextRoutePath)
      const fromPath = activeTargetPathRef.current ?? currentScenePathRef.current
      const transitionConfig = resolveSceneTransition(fromPath, nextRoutePath)
      const shouldReduceMotion =
        typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

      if (!mainElement || !nextSceneState) return false

      if (fromPath === nextRoutePath) {
        return true
      }

      cancelPendingHomeHoverClear()
      clearRouteContentRevealTimer()

      queueMicrotask(() => {
        setHomeHoverRegion(null)
        setEarlyRevealedContentPath(null)
        setPendingNavPath(nextRoutePath)
      })

      activeSceneTimelineRef.current?.kill()
      activeTargetPathRef.current = nextRoutePath
      mainElement.setAttribute('data-scene-page', getPageKeyForPath(nextRoutePath))
      setSceneTransitionKey(fromPath, nextRoutePath)

      if (!transitionConfig) {
        applySharedSceneState(mainElement, nextSceneState)
        finishSceneTransition(nextRoutePath)
        return true
      }

      if (shouldReduceMotion) {
        applySharedSceneState(mainElement, transitionConfig.targetState)
        finishSceneTransition(nextRoutePath)
        return true
      }

      queueMicrotask(() => {
        setActiveTransitionPath(nextRoutePath)
      })
      scheduleRouteContentLeadReveal(nextRoutePath, transitionConfig.durationMs)

      activeSceneTimelineRef.current = animateSharedSceneTransition({
        rootElement: mainElement,
        targetState: transitionConfig.targetState,
        durationMs: transitionConfig.durationMs,
        pathMorphByLayer: transitionConfig.pathMorphByLayer,
        onComplete: () => {
          finishSceneTransition(nextRoutePath)
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
    locationPathRef.current = routePath

    if (pendingNavPath === routePath) {
      queueMicrotask(() => {
        setPendingNavPath(null)
      })
    }
  }, [routePath, pendingNavPath])

  useLayoutEffect(() => {
    const mainElement = mainRef.current
    if (!mainElement) return

    if (!hasMountedRef.current) {
      applySharedSceneState(mainElement, resolveSceneStateForPath(routePath))
      currentScenePathRef.current = routePath
      completedScenePathRef.current = routePath
      hasMountedRef.current = true
      return
    }

    if (completedScenePathRef.current === routePath) {
      queueMicrotask(() => {
        setRevealedContentPath(routePath)
        setEarlyRevealedContentPath(null)
      })
      return
    }

    if (activeTargetPathRef.current === routePath) {
      return
    }

    if (!transitionSceneToPath(routePath)) {
      completedScenePathRef.current = routePath
      queueMicrotask(() => {
        setRevealedContentPath(routePath)
        setEarlyRevealedContentPath(null)
      })
    }
  }, [routePath, transitionSceneToPath])

  useLayoutEffect(() => {
    if (sceneViewportKeyRef.current === viewportComposition.sceneViewportKey) {
      return
    }

    sceneViewportKeyRef.current = viewportComposition.sceneViewportKey

    const mainElement = mainRef.current
    const targetPath =
      activeTargetPathRef.current ?? currentScenePathRef.current ?? routePath
    const sceneState = resolveSceneStateForPath(targetPath)

    if (!mainElement || !sceneState) return

    activeSceneTimelineRef.current?.kill()
    activeSceneTimelineRef.current = null
    applySharedSceneState(mainElement, sceneState)

    if (activeTargetPathRef.current) {
      finishSceneTransition(targetPath)
    }
  }, [finishSceneTransition, routePath, viewportComposition.sceneViewportKey])

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
    viewportComposition,
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
