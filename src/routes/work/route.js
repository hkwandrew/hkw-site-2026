import { lazy } from 'react'
import { workSceneSpec } from './sceneSpec'

const WorkPage = lazy(() => import('./WorkPage.jsx'))

export const workRoute = Object.freeze({
  id: 'work',
  routePath: '/work',
  pageKey: 'work-page',
  sceneStateKey: 'work-page',
  label: 'Our Work',
  navLabel: 'Work',
  phoneNavLabel: null,
  showInNav: true,
  showInPhoneNav: false,
  sceneSpec: workSceneSpec,
  Component: WorkPage,
})
