import { lazy } from 'react'
import { contactSceneSpec } from './sceneSpec'

const ContactPage = lazy(() => import('./ContactPage.jsx'))

export const contactRoute = Object.freeze({
  id: 'contact',
  routePath: '/contact',
  pageKey: 'contact-page',
  sceneStateKey: 'contact-page',
  label: '',
  navLabel: null,
  phoneNavLabel: 'Contact',
  showInNav: false,
  showInPhoneNav: true,
  sceneSpec: contactSceneSpec,
  Component: ContactPage,
})
