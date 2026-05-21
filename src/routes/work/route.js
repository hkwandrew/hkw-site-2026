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
  phoneNavLabel: 'Work',
  showInNav: true,
  showInPhoneNav: true,
  sceneSpec: workSceneSpec,
  Component: WorkPage,
})
