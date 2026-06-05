import { lazy } from 'react'
import { policySceneSpec } from './sceneSpec'

const PolicyPage = lazy(() => import('./PolicyPage.jsx'))

export const policyRoute = Object.freeze({
  id: 'policy',
  routePath: '/policy',
  pageKey: 'policy-page',
  sceneStateKey: 'policy-page',
  label: '',
  navLabel: null,
  phoneNavLabel: null,
  showInNav: false,
  showInPhoneNav: false,
  sceneSpec: policySceneSpec,
  Component: PolicyPage,
})
