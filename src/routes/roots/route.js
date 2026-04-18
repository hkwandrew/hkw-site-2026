import { lazy } from 'react'
import { rootsSceneSpec } from './sceneSpec'

const RootsPage = lazy(() => import('./RootsPage.jsx'))

export const rootsRoute = Object.freeze({
  id: 'roots',
  routePath: '/roots',
  pageKey: 'roots-page',
  sceneStateKey: 'roots-page',
  label: 'Non-profit Roots',
  navLabel: null,
  phoneNavLabel: null,
  showInNav: false,
  showInPhoneNav: false,
  sceneSpec: rootsSceneSpec,
  Component: RootsPage,
})
