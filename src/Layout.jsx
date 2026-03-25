import { useCallback, useLayoutEffect, useMemo, useRef } from 'react'
import Header from './components/Header'
import { Outlet, useLocation } from 'react-router'
import { PageSceneTransitionProvider } from './context/pageSceneTransition'
import { getPageKeyForPath, getTransitionKey } from './pageRegistry.js'
import { resolveSceneStateForPath, resolveSceneTransition } from './sharedSceneConfig.js'
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

const Layout = () => {
    const location = useLocation()
    const mainRef = useRef(null)
    const hasMountedRef = useRef(false)
    const activeSceneTimelineRef = useRef(null)
    const activeTargetPathRef = useRef(null)
    const currentScenePathRef = useRef(location.pathname)

    const pageKey = getPageKeyForPath(location.pathname)
    const pageClass = `${pageKey}`
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
        mainRef.current?.setAttribute('data-scene-page', getPageKeyForPath(nextPath))
    }, [])

    const transitionSceneToPath = useCallback(
        (nextPath) => {
            const mainElement = mainRef.current
            const nextSceneState = resolveSceneStateForPath(nextPath)
            const fromPath = activeTargetPathRef.current ?? currentScenePathRef.current
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
            applySharedSceneState(mainElement, resolveSceneStateForPath(location.pathname))
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

    return (
        <PageSceneTransitionProvider
            value={transitionContextValue}
        >
            <main
                ref={mainRef}
                data-page={pageKey}
                data-scene-page={pageKey}
                className={pageClass}
            >
                <Header />

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    id="scene-svg"
                    viewBox="0 0 1440 1024"
                    shapeRendering="geometricPrecision"
                    textRendering="geometricPrecision"
                >
                    <g id="scene" transform="translate(-1181.222193 -8.108808)">
                        <path id="sky" d="M3960,0L0,0v1014h3975.5L3960,0Z" transform="translate(-1.849932 0)"
                            fill="#fcfae5" />
                        <BlueMountain />
                        <GoldMountain />
                        <WhiteSand />
                        <Sun />
                        <DkBlueMountain />
                        <TreeMountain />
                        <UpperField />

                    </g>
                </svg>
                <Outlet />
            </main>
        </PageSceneTransitionProvider>
    )
}

export default Layout
