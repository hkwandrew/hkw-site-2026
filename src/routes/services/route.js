import { lazy } from 'react'
import { servicesSceneSpec } from './sceneSpec'

const ServicesPage = lazy(() => import('./ServicesPage.jsx'))

export const servicesRoute = Object.freeze({
  id: 'services',
  routePath: '/services',
  pageKey: 'services-page',
  sceneStateKey: 'services-page',
  label: 'Our Specialties',
  navLabel: 'Services',
  phoneNavLabel: 'Services',
  showInNav: true,
  showInPhoneNav: true,
  sceneSpec: servicesSceneSpec,
  Component: ServicesPage,
})
