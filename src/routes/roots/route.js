import { lazy } from 'react'
import { rootsSceneSpec } from './sceneSpec'

const RootsPage = lazy(() => import('./RootsPage.jsx'))

export const rootsRoute = Object.freeze({
  id: 'roots',
  routePath: '/roots',
  routePattern: 'roots/:portfolioSlug?',
  pageKey: 'roots-page',
  sceneStateKey: 'roots-page',
  label: 'Non-profit Roots',
  navLabel: null,
  phoneNavLabel: 'Non-Profits',
  showInNav: false,
  showInPhoneNav: true,
  sceneSpec: rootsSceneSpec,
  Component: RootsPage,
})
