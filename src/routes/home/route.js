import { lazy } from 'react'
import { homeSceneSpec } from './sceneSpec'

const HomePage = lazy(() => import('./HomePage.jsx'))

export const homeRoute = Object.freeze({
  id: 'home',
  routePath: '/',
  pageKey: 'home-page',
  sceneStateKey: 'home-page',
  label: '',
  navLabel: null,
  phoneNavLabel: null,
  showInNav: false,
  showInPhoneNav: false,
  sceneSpec: homeSceneSpec,
  Component: HomePage,
})
