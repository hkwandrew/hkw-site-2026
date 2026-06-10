import {
  getSceneViewportKeyForLayout,
  getViewportComposition,
} from '@/app/layout/viewportComposition'

const SCENE_VIEWPORT_FALLBACKS = Object.freeze({
  base: ['base'],
  phonePortrait: ['phonePortrait', 'mobile'],
})

export const SCENE_LAYER_SELECTORS = Object.freeze({
  blueMountain: Object.freeze({
    container: '#blue-mountain__container',
    wrapper: '#blue-mountain__wrapper',
    path: '#blue-mountain',
  }),
  goldMountain: Object.freeze({
    container: '#gold-mountain__container',
    wrapper: '#gold-mountain__wrapper',
    path: '#gold-mountain-path',
  }),
  sun: Object.freeze({
    container: '#sun__container',
    wrapper: '#sun__wrapper',
  }),
  dkBlueMountain: Object.freeze({
    container: '#dk-blue-mountain_container',
    wrapper: '#dk-blue-mountain_wrapper',
  }),
  treeMountain: Object.freeze({
    container: '#tree-mountain__container',
    wrapper: '#tree-mountain__wrapper',
    path: 'g.trees > path:first-of-type',
  }),
  upperField: Object.freeze({
    container: '#upper-field__container',
    wrapper: '#upper-field__wrapper',
  }),
  whiteSand: Object.freeze({
    container: '#white-sand__container',
    wrapper: '#white-sand__wrapper',
  }),
  dirtLayer: Object.freeze({
    container: '#dirt-layer__container',
    wrapper: '#dirt-layer__wrapper',
  }),
})

const TRANSLATE_PATTERN =
  /translate\(\s*([-+]?\d*\.?\d+(?:e[-+]?\d+)?)(px|%)?(?:,\s*|\s+)([-+]?\d*\.?\d+(?:e[-+]?\d+)?)(px|%)?\s*\)/i
const SCALE_PATTERN = /scale\(([-\d.]+)(?:,\s*|\s+)?([-\d.]+)?\)/
const PERCENT_PATTERN = /^([-+]?\d*\.?\d+(?:e[-+]?\d+)?)%$/i

export const toTranslate = ({ x, y }) => `translate(${x},${y})`
export const toScale = ({ scaleX, scaleY }) => `scale(${scaleX},${scaleY})`

export const getSceneViewportKey = () => {
  const { layout } = getViewportComposition()

  return getSceneViewportKeyForLayout(layout)
}

const mergeViewportState = (baseState, viewportState) => ({
  ...baseState,
  ...(viewportState ?? {}),
})

export const resolveLayerStateForViewport = (layerState, viewportKey) => {
  const viewportKeys = SCENE_VIEWPORT_FALLBACKS[viewportKey] ?? [viewportKey]
  const viewportState = viewportKeys.reduce(
    (resolvedState, nextViewportKey) =>
      resolvedState ?? layerState?.viewports?.[nextViewportKey],
    null,
  )

  if (!viewportState) return layerState

  return {
    ...layerState,
    ...viewportState,
    container: mergeViewportState(
      layerState.container,
      viewportState.container,
    ),
    wrapper: mergeViewportState(layerState.wrapper, viewportState.wrapper),
  }
}

const parseTranslate = (value, fallback) => {
  const match = value?.match(TRANSLATE_PATTERN)

  if (!match) return fallback

  return {
    x: match[2] === '%' ? `${Number(match[1])}%` : Number(match[1]),
    y: match[4] === '%' ? `${Number(match[3])}%` : Number(match[3]),
  }
}

const parseScale = (value, fallback) => {
  const match = value?.match(SCALE_PATTERN)

  if (!match) return fallback

  return {
    scaleX: Number(match[1]),
    scaleY: Number(match[2] ?? match[1]),
  }
}

const getSvgViewBox = (targetElement) => {
  const svgElement = targetElement?.ownerSVGElement
  const viewBox = svgElement
    ?.getAttribute('viewBox')
    ?.trim()
    .split(/[\s,]+/)
    .map(Number)

  if (viewBox?.length === 4 && viewBox.every(Number.isFinite)) {
    const [x, y, width, height] = viewBox

    return { x, y, width, height }
  }

  return {
    x: 0,
    y: 0,
    width: svgElement?.clientWidth ?? 0,
    height: svgElement?.clientHeight ?? 0,
  }
}

const getAncestorTranslateOffset = (targetElement) => {
  const svgElement = targetElement?.ownerSVGElement
  let node = targetElement?.parentElement
  let x = 0
  let y = 0

  while (node && node !== svgElement) {
    const translate = parseTranslate(node.getAttribute('transform'), null)

    if (Number.isFinite(translate?.x)) x += translate.x
    if (Number.isFinite(translate?.y)) y += translate.y

    node = node.parentElement
  }

  return { x, y }
}

const resolveCoordinateValue = (value, axis, targetElement) => {
  if (typeof value !== 'string') return value

  const match = value.trim().match(PERCENT_PATTERN)

  if (!match) return value

  const percent = Number(match[1]) / 100
  const viewBox = getSvgViewBox(targetElement)
  const ancestorOffset = getAncestorTranslateOffset(targetElement)
  const viewportValue =
    axis === 'x'
      ? viewBox.x + viewBox.width * percent
      : viewBox.y + viewBox.height * percent

  return viewportValue - ancestorOffset[axis]
}

export const resolveTranslateStateForElement = (
  translateState,
  targetElement,
) => ({
  x: resolveCoordinateValue(translateState.x, 'x', targetElement),
  y: resolveCoordinateValue(translateState.y, 'y', targetElement),
})

export const getLayerElements = (rootElement, selectors) => ({
  container: rootElement.querySelector(selectors.container),
  wrapper: rootElement.querySelector(selectors.wrapper),
  path: selectors.path ? rootElement.querySelector(selectors.path) : null,
})

const setLayerState = (layerElements, layerState) => {
  layerElements.container?.setAttribute(
    'transform',
    toTranslate(
      resolveTranslateStateForElement(
        layerState.container,
        layerElements.container,
      ),
    ),
  )
  layerElements.wrapper?.setAttribute('transform', toScale(layerState.wrapper))

  if (layerElements.path && layerState.pathD) {
    layerElements.path.setAttribute('d', layerState.pathD)
  }
}

export const readCurrentLayerState = (layerElements, fallbackState) => ({
  container: parseTranslate(
    layerElements.container?.getAttribute('transform'),
    fallbackState.container,
  ),
  wrapper: parseScale(
    layerElements.wrapper?.getAttribute('transform'),
    fallbackState.wrapper,
  ),
  pathD: layerElements.path?.getAttribute('d') ?? fallbackState.pathD,
})

export const applySharedSceneState = (rootElement, sceneState) => {
  if (!rootElement || !sceneState) return

  const viewportKey = getSceneViewportKey()

  Object.entries(SCENE_LAYER_SELECTORS).forEach(([layerKey, selectors]) => {
    setLayerState(
      getLayerElements(rootElement, selectors),
      resolveLayerStateForViewport(sceneState[layerKey], viewportKey),
    )
  })
}
