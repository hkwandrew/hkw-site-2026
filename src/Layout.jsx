import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
import Header from './components/Header'
import { Link, Outlet, useLocation } from 'react-router'
import { PageSceneTransitionProvider } from './context/pageSceneTransition'
import { HomeHoverProvider } from './context/homeHover'
import { getPageKeyForPath, getTransitionKey } from './pageRegistry.js'
import {
  resolveSceneStateForPath,
  resolveSceneTransition,
} from './sharedSceneConfig.js'
import {
  animateSharedSceneTransition,
  applySharedSceneState,
} from './sharedSceneRuntime.js'

import BlueMountain from './components/BlueMountain'
import GoldMountain from './components/GoldMountain'
import DkBlueMountain from './components/DkBlueMountain'
import TreeMountain from './components/TreeMountain'
import UpperField from './components/UpperField'
import Sun from './components/Sun'
import WhiteSand from './components/WhiteSand.jsx'
import theme from './styles/theme'

const Layout = () => {
  const location = useLocation()
  const mainRef = useRef(null)
  const hasMountedRef = useRef(false)
  const activeSceneTimelineRef = useRef(null)
  const activeTargetPathRef = useRef(null)
  const currentScenePathRef = useRef(location.pathname)
  const homeHoverClearTimeoutRef = useRef(null)
  const [homeHoverRegion, setHomeHoverRegion] = useState(null)

  const pageKey = getPageKeyForPath(location.pathname)
  const pageClass = `${pageKey}`
  const isHome = location.pathname === '/'
  const setSceneTransitionKey = useCallback((fromPath, toPath) => {
    const mainElement = mainRef.current

    if (!mainElement) return

    const nextTransitionKey = getTransitionKey(fromPath, toPath)

    if (nextTransitionKey) {
      mainElement.setAttribute('data-transition', nextTransitionKey)
      return
    }

    mainElement.removeAttribute('data-transition')
  }, [])
  const finishSceneTransition = useCallback((nextPath) => {
    activeSceneTimelineRef.current = null
    activeTargetPathRef.current = null
    currentScenePathRef.current = nextPath
    mainRef.current?.removeAttribute('data-transition')
    mainRef.current?.setAttribute(
      'data-scene-page',
      getPageKeyForPath(nextPath),
    )
  }, [])

  const transitionSceneToPath = useCallback(
    (nextPath) => {
      const mainElement = mainRef.current
      const nextSceneState = resolveSceneStateForPath(nextPath)
      const fromPath =
        activeTargetPathRef.current ?? currentScenePathRef.current
      const transitionConfig = resolveSceneTransition(fromPath, nextPath)

      if (!mainElement || !nextSceneState || !transitionConfig) return

      activeSceneTimelineRef.current?.kill()
      activeTargetPathRef.current = nextPath
      mainElement.setAttribute('data-scene-page', getPageKeyForPath(nextPath))
      setSceneTransitionKey(fromPath, nextPath)

      activeSceneTimelineRef.current = animateSharedSceneTransition({
        rootElement: mainElement,
        targetState: transitionConfig.targetState,
        durationMs: transitionConfig.durationMs,
        pathMorphByLayer: transitionConfig.pathMorphByLayer,
        onComplete: () => {
          finishSceneTransition(nextPath)
        },
      })
    },
    [finishSceneTransition, setSceneTransitionKey],
  )

  useLayoutEffect(() => {
    const mainElement = mainRef.current

    if (!mainElement) return

    if (!hasMountedRef.current) {
      applySharedSceneState(
        mainElement,
        resolveSceneStateForPath(location.pathname),
      )
      currentScenePathRef.current = location.pathname
      hasMountedRef.current = true
      return
    }

    if (activeTargetPathRef.current === location.pathname) {
      return
    }

    transitionSceneToPath(location.pathname)
  }, [location.pathname, transitionSceneToPath])

  const transitionContextValue = useMemo(
    () => ({ transitionSceneToPath }),
    [transitionSceneToPath],
  )

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

  const homeHoverContextValue = useMemo(
    () => ({
      clearHomeHoverRegion,
      homeHoverRegion: isHome ? homeHoverRegion : null,
      isHome,
      setHomeHoverRegion: requestHomeHoverRegion,
    }),
    [clearHomeHoverRegion, homeHoverRegion, isHome, requestHomeHoverRegion],
  )

  return (
    <PageSceneTransitionProvider value={transitionContextValue}>
      <HomeHoverProvider value={homeHoverContextValue}>
        <main
          ref={mainRef}
          data-page={pageKey}
          data-scene-page={pageKey}
          className={pageClass}
        >
          <Header />

          <svg
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            id='scene-svg'
            viewBox='0 0 1440 1024'
            shapeRendering='geometricPrecision'
            textRendering='geometricPrecision'
          >
            <g id='scene' transform='translate(-1181.222193 -8.108808)'>
              <path
                id='sky'
                d='M3960,0L0,0v1014h3975.5L3960,0Z'
                transform='translate(-1.849932 0)'
                fill={theme.colors.yellow.light}
              />
              {isHome ? (
                <Link to='/about'>
                  <BlueMountain />
                </Link>
              ) : (
                <BlueMountain />
              )}
              {isHome ? (
                <Link to='/work'>
                  <GoldMountain />
                </Link>
              ) : (
                <GoldMountain />
              )}
              <WhiteSand />
              <Sun />
              {isHome ? (
                <Link to='/services'>
                  <DkBlueMountain />
                  <TreeMountain />
                </Link>
              ) : (
                <>
                  <DkBlueMountain />
                  <TreeMountain />
                </>
              )}
              <UpperField />
            </g>
          </svg>
          <Outlet />
        </main>
      </HomeHoverProvider>
    </PageSceneTransitionProvider>
  )
}

export default Layout
