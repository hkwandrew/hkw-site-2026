import { Suspense, useLayoutEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import DebugHud from '@/app/debug/DebugHud'
import Header from '@/app/layout/Header'
import LandscapeScene from '@/app/layout/LandscapeScene'
import useLandscapeTransitionController from '@/app/layout/useLandscapeTransitionController'
import { PageSceneTransitionProvider } from '@/app/landscape/pageSceneTransition'
import { HomeHoverProvider } from '@/routes/home/homeHoverContext'

const AppLayout = () => {
  const location = useLocation()
  const {
    pageKey,
    mainRef,
    headerContentPath,
    headerNavPath,
    isPageLabelRevealed,
    scenePathname,
    shouldShowHeader,
    shouldRenderRouteContent,
    areHomeLayerLinksInteractive,
    viewportComposition,
    transitionContextValue,
    homeHoverContextValue,
  } = useLandscapeTransitionController(location.pathname)
  const viewportRatio = Number(viewportComposition.ratio.toFixed(5))
  const viewportStyle = {
    '--hkw-viewport-height': `${viewportComposition.height}px`,
    '--hkw-viewport-ratio': String(viewportRatio),
    '--hkw-viewport-width': `${viewportComposition.width}px`,
  }

  useLayoutEffect(() => {
    const rootElement = document.documentElement

    rootElement.style.setProperty(
      '--hkw-viewport-height',
      `${viewportComposition.height}px`,
    )
    rootElement.style.setProperty('--hkw-viewport-ratio', String(viewportRatio))
    rootElement.style.setProperty(
      '--hkw-viewport-width',
      `${viewportComposition.width}px`,
    )

    return () => {
      rootElement.style.removeProperty('--hkw-viewport-height')
      rootElement.style.removeProperty('--hkw-viewport-ratio')
      rootElement.style.removeProperty('--hkw-viewport-width')
    }
  }, [
    viewportComposition.height,
    viewportComposition.width,
    viewportRatio,
  ])

  return (
    <PageSceneTransitionProvider value={transitionContextValue}>
      <HomeHoverProvider value={homeHoverContextValue}>
        <main
          ref={mainRef}
          data-page={pageKey}
          data-scene-page={pageKey}
          data-hover={viewportComposition.hover}
          data-pointer={viewportComposition.pointer}
          className={pageKey}
          style={viewportStyle}
        >
          {shouldShowHeader ? (
            <Header
              contentPathname={headerContentPath}
              isPageLabelReady={isPageLabelRevealed}
              navPathname={headerNavPath}
            />
          ) : null}

          <LandscapeScene
            areHomeLayerLinksInteractive={areHomeLayerLinksInteractive}
            scenePathname={scenePathname}
          />

          {shouldRenderRouteContent ? (
            <Suspense fallback={null}>
              <Outlet />
            </Suspense>
          ) : null}

          {import.meta.env.DEV ? <DebugHud /> : null}
        </main>
      </HomeHoverProvider>
    </PageSceneTransitionProvider>
  )
}

export default AppLayout
