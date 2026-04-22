import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router'
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
    scenePathname,
    shouldShowHeader,
    isRouteContentRevealed,
    areHomeLayerLinksInteractive,
    transitionContextValue,
    homeHoverContextValue,
  } = useLandscapeTransitionController(location.pathname)

  return (
    <PageSceneTransitionProvider value={transitionContextValue}>
      <HomeHoverProvider value={homeHoverContextValue}>
        <main
          ref={mainRef}
          data-page={pageKey}
          data-scene-page={pageKey}
          className={pageKey}
        >
          {shouldShowHeader ? (
            <Header
              contentPathname={headerContentPath}
              navPathname={headerNavPath}
            />
          ) : null}

          <LandscapeScene
            areHomeLayerLinksInteractive={areHomeLayerLinksInteractive}
            scenePathname={scenePathname}
          />

          {isRouteContentRevealed ? (
            <Suspense fallback={null}>
              <Outlet />
            </Suspense>
          ) : null}
        </main>
      </HomeHoverProvider>
    </PageSceneTransitionProvider>
  )
}

export default AppLayout
