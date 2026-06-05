import { lazy } from 'react'
import { SCENE_TRANSITION_DURATION_MS } from '@/app/landscape/sceneTiming'
import { workSceneSpec } from './sceneSpec'

const WorkPage = lazy(() => import('./WorkPage.jsx'))

export const WORK_ROUTE_CONTENT_REVEAL_LEAD_MS = SCENE_TRANSITION_DURATION_MS

export const workRoute = Object.freeze({
  id: 'work',
  routePath: '/work',
  routePattern: 'work/:caseStudySlug?',
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
