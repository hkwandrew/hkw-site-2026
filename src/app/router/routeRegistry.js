import { aboutRoute } from '@/routes/about/route'
import { contactRoute } from '@/routes/contact/route'
import { homeRoute } from '@/routes/home/route'
import { rootsRoute } from '@/routes/roots/route'
import { servicesRoute } from '@/routes/services/route'
import { workRoute } from '@/routes/work/route'

export const ROUTE_DEFINITIONS = [
  homeRoute,
  aboutRoute,
  servicesRoute,
  workRoute,
  contactRoute,
  rootsRoute,
]

export const PAGE_DEFINITIONS = ROUTE_DEFINITIONS

const ROUTE_BY_PATH = Object.fromEntries(
  ROUTE_DEFINITIONS.map((routeDefinition) => [
    routeDefinition.routePath,
    routeDefinition,
  ]),
)

const createRouteHandle = (routeDefinition) => ({
  pageId: routeDefinition.id,
  pageKey: routeDefinition.pageKey,
  label: routeDefinition.label,
})

export const NAV_ITEMS = ROUTE_DEFINITIONS.filter(
  (routeDefinition) => routeDefinition.showInNav,
).map((routeDefinition) => ({
  id: routeDefinition.id,
  label: routeDefinition.navLabel,
  path: routeDefinition.routePath,
}))

export const PHONE_NAV_ITEMS = ROUTE_DEFINITIONS.filter(
  (routeDefinition) => routeDefinition.showInPhoneNav,
).map((routeDefinition) => ({
  id: routeDefinition.id,
  label:
    routeDefinition.phoneNavLabel ??
    routeDefinition.navLabel ??
    routeDefinition.label,
  path: routeDefinition.routePath,
}))

export const getRouteDefinitionForPath = (pathname) =>
  ROUTE_BY_PATH[pathname] ?? null

export const getPageDefinitionForPath = getRouteDefinitionForPath

export const getPageKeyForPath = (pathname) =>
  getRouteDefinitionForPath(pathname)?.pageKey ?? 'unknown'

export const getPageLabelForPath = (pathname) =>
  getRouteDefinitionForPath(pathname)?.label ?? ''

export const getTransitionKey = (fromPath, toPath) => {
  const fromRoute = getRouteDefinitionForPath(fromPath)
  const toRoute = getRouteDefinitionForPath(toPath)

  if (!fromRoute || !toRoute || fromRoute.routePath === toRoute.routePath) {
    return ''
  }

  return `${fromRoute.id}-to-${toRoute.id}`
}

export const getRouteChildrenConfig = () =>
  ROUTE_DEFINITIONS.map((routeDefinition) => {
    if (routeDefinition.routePath === '/') {
      return {
        index: true,
        Component: routeDefinition.Component,
        handle: createRouteHandle(routeDefinition),
      }
    }

    return {
      path: routeDefinition.routePath.slice(1),
      Component: routeDefinition.Component,
      handle: createRouteHandle(routeDefinition),
    }
  })
