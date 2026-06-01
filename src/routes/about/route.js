import { lazy } from 'react'
import { aboutSceneSpec } from './sceneSpec'

const AboutPage = lazy(() => import('./AboutPage.jsx'))

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
  sceneSpec: aboutSceneSpec,
  Component: AboutPage,
})
