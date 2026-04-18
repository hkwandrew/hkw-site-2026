import {
  ROUTE_DEFINITIONS,
  getPageKeyForPath,
  getRouteDefinitionForPath,
  getTransitionKey,
} from '@/app/router/routeRegistry'
import { ROOTS_SCENE_STATE } from '@/routes/roots/sceneSpec'

export const SCENE_TRANSITION_DURATION_MS = 1500

const REQUIRED_LAYER_KEYS = [
  'blueMountain',
  'goldMountain',
  'sun',
  'dkBlueMountain',
  'treeMountain',
  'upperField',
  'whiteSand',
  'dirtLayer',
]

const PATH_LAYER_KEYS = ['blueMountain', 'goldMountain']

const getSceneSpecForPath = (pathname) =>
  getRouteDefinitionForPath(pathname)?.sceneSpec ?? null

const getPathMorphConfig = (fromPath, toPath) => {
  const fromRoute = getRouteDefinitionForPath(fromPath)
  const toRoute = getRouteDefinitionForPath(toPath)
  const transitionOverrides =
    fromRoute?.sceneSpec?.transitionsTo?.[toRoute?.pageKey] ?? {}

  return Object.freeze(
    Object.fromEntries(
      PATH_LAYER_KEYS.map((layerKey) => [
        layerKey,
        {
          map: 'size',
          ...(transitionOverrides[layerKey] ?? {}),
        },
      ]),
    ),
  )
}

export const SCENE_PAGE_STATES = Object.freeze(
  Object.fromEntries(
    ROUTE_DEFINITIONS.map((routeDefinition) => [
      routeDefinition.pageKey,
      routeDefinition.sceneSpec.state,
    ]),
  ),
)

export const resolveSceneStateForPath = (pathname) =>
  getSceneSpecForPath(pathname)?.state ?? null

export const resolveSceneTransition = (fromPath, toPath) => {
  const fromRoute = getRouteDefinitionForPath(fromPath)
  const toRoute = getRouteDefinitionForPath(toPath)

  if (!fromRoute || !toRoute || fromRoute.routePath === toRoute.routePath) {
    return null
  }

  return {
    transitionKey: getTransitionKey(fromPath, toPath),
    durationMs: SCENE_TRANSITION_DURATION_MS,
    fromPage: fromRoute,
    toPage: toRoute,
    targetState: toRoute.sceneSpec?.state ?? null,
    pathMorphByLayer: getPathMorphConfig(fromPath, toPath),
  }
}

const validateLayerState = (sceneKey, layerKey, layerState) => {
  const errors = []

  if (!layerState?.container) {
    errors.push(`${sceneKey}.${layerKey} is missing container coordinates`)
  }

  if (!layerState?.wrapper) {
    errors.push(`${sceneKey}.${layerKey} is missing wrapper scale`)
  }

  if (PATH_LAYER_KEYS.includes(layerKey) && !layerState?.pathD) {
    errors.push(`${sceneKey}.${layerKey} is missing path data`)
  }

  return errors
}

export const validateSharedSceneConfig = () => {
  const errors = []

  ROUTE_DEFINITIONS.forEach((routeDefinition) => {
    const sceneState = SCENE_PAGE_STATES[routeDefinition.pageKey]

    if (!sceneState) {
      errors.push(
        `Missing shared scene state for ${routeDefinition.id} (${routeDefinition.pageKey})`,
      )
      return
    }

    REQUIRED_LAYER_KEYS.forEach((layerKey) => {
      errors.push(
        ...validateLayerState(
          routeDefinition.pageKey,
          layerKey,
          sceneState[layerKey],
        ),
      )
    })
  })

  return errors
}

export { ROOTS_SCENE_STATE, getPageKeyForPath }
