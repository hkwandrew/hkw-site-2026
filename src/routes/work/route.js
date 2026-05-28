import { lazy } from 'react'
import { workSceneSpec } from './sceneSpec'

const WorkPage = lazy(() => import('./WorkPage.jsx'))

export const WORK_ROUTE_CONTENT_REVEAL_LEAD_MS = 1500

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
  contentRevealLeadMs: WORK_ROUTE_CONTENT_REVEAL_LEAD_MS,
  sceneSpec: workSceneSpec,
  Component: WorkPage,
})
