import { lazy } from 'react'
import { aboutSceneSpec } from './sceneSpec'

const AboutPage = lazy(() => import('./AboutPage.jsx'))

export const ABOUT_ROUTE_CONTENT_REVEAL_LEAD_MS = 1500

export const aboutRoute = Object.freeze({
  id: 'about',
  routePath: '/about',
  pageKey: 'about-page',
  sceneStateKey: 'about-page',
  label: 'Kind Words',
  navLabel: 'About',
  phoneNavLabel: 'About',
  showInNav: true,
  showInPhoneNav: true,
  contentRevealLeadMs: ABOUT_ROUTE_CONTENT_REVEAL_LEAD_MS,
  sceneSpec: aboutSceneSpec,
  Component: AboutPage,
})
