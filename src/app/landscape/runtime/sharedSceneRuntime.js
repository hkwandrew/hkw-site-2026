/**
 * Runtime engine for shared scene transitions.
 *
 * Reads current SVG layer positions from the DOM via transform attribute
 * parsing, then animates to target positions using GSAP timelines.
 * Path layers are morphed via MorphSVGPlugin.
 *
 * DOM contract: each layer is located via CSS selectors in
 * SCENE_LAYER_SELECTORS (e.g. '#blue-mountain__container'). These IDs
 * must match the SVG elements rendered by the mountain/field components.
 */
import gsap from 'gsap'
import MorphSVGPlugin from 'gsap/MorphSVGPlugin'
import {
  getSceneViewportKeyForLayout,
  getViewportComposition,
} from '@/app/layout/viewportComposition'

gsap.registerPlugin(MorphSVGPlugin)

const SCENE_VIEWPORT_FALLBACKS = Object.freeze({
  base: ['base'],
  phoneLandscape: ['phoneLandscape'],
  phonePortrait: ['phonePortrait', 'mobile'],
  shortDesktop: ['shortDesktop'],
  tablet: ['tablet'],
})

const SCENE_LAYER_SELECTORS = Object.freeze({
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

/** Matches `translate(x, y)` or `translate(x y)` with optional `px`/`%` units. */
const TRANSLATE_PATTERN =
  /translate\(\s*([-+]?\d*\.?\d+(?:e[-+]?\d+)?)(px|%)?(?:,\s*|\s+)([-+]?\d*\.?\d+(?:e[-+]?\d+)?)(px|%)?\s*\)/i
/** Matches `scale(x, y)` or `scale(x)` (uniform). */
const SCALE_PATTERN = /scale\(([-\d.]+)(?:,\s*|\s+)?([-\d.]+)?\)/
const PERCENT_PATTERN = /^([-+]?\d*\.?\d+(?:e[-+]?\d+)?)%$/i

const toTranslate = ({ x, y }) => `translate(${x},${y})`
const toScale = ({ scaleX, scaleY }) => `scale(${scaleX},${scaleY})`

export const getSceneViewportKey = () => {
  const { layout } = getViewportComposition()

  return getSceneViewportKeyForLayout(layout)
}

const mergeViewportState = (baseState, viewportState) => ({
  ...baseState,
  ...(viewportState ?? {}),
})

const resolveLayerStateForViewport = (layerState, viewportKey) => {
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

const resolveTranslateStateForElement = (translateState, targetElement) => ({
  x: resolveCoordinateValue(translateState.x, 'x', targetElement),
  y: resolveCoordinateValue(translateState.y, 'y', targetElement),
})

const getLayerElements = (rootElement, selectors) => ({
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

const readCurrentLayerState = (layerElements, fallbackState) => ({
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

const addTransformTween = ({
  formatter,
  fromValue,
  timeline,
  toValue,
  targetElement,
}) => {
  if (!targetElement) return

  const state = { ...fromValue }

  timeline.to(
    state,
    {
      ...toValue,
      onUpdate: () => {
        targetElement.setAttribute('transform', formatter(state))
      },
    },
    0,
  )
}

const addPathTween = ({
  currentPathD,
  layerElements,
  nextPathD,
  pathMorphConfig,
  timeline,
}) => {
  if (!layerElements.path || !nextPathD || currentPathD === nextPathD) return

  timeline.to(
    layerElements.path,
    {
      morphSVG: {
        shape: nextPathD,
        ...(pathMorphConfig ?? {}),
      },
    },
    0,
  )
}

/**
 * Immediately applies a scene state to the DOM (no animation).
 * Sets transform attributes on all layer container/wrapper elements.
 * @param {HTMLElement} rootElement - Root SVG element containing all layers
 * @param {Object} sceneState - Target state from SCENE_PAGE_STATES
 */
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

/**
 * Creates a GSAP timeline that animates all layers from their current
 * DOM state to the target scene state.
 * @param {Object} config
 * @param {number} config.durationMs - Animation duration in milliseconds
 * @param {Object} config.pathMorphByLayer - Per-layer MorphSVG config overrides
 * @param {HTMLElement} config.rootElement - Root SVG element
 * @param {Object} config.targetState - Target scene state
 * @param {Function} [config.onComplete] - Callback when animation finishes
 * @returns {gsap.core.Timeline|null} The GSAP timeline, or null if inputs are invalid
 */
export const animateSharedSceneTransition = ({
  durationMs,
  pathMorphByLayer,
  rootElement,
  targetState,
  onComplete,
}) => {
  if (!rootElement || !targetState) return null

  const durationSeconds = durationMs / 1000

  const timeline = gsap.timeline({
    defaults: {
      duration: durationSeconds,
      ease: 'none',
    },
    onComplete,
  })

  const viewportKey = getSceneViewportKey()

  Object.entries(SCENE_LAYER_SELECTORS).forEach(([layerKey, selectors]) => {
    const layerElements = getLayerElements(rootElement, selectors)
    const nextLayerState = resolveLayerStateForViewport(
      targetState[layerKey],
      viewportKey,
    )
    const currentLayerState = readCurrentLayerState(
      layerElements,
      nextLayerState,
    )
    const currentContainerState = resolveTranslateStateForElement(
      currentLayerState.container,
      layerElements.container,
    )
    const nextContainerState = resolveTranslateStateForElement(
      nextLayerState.container,
      layerElements.container,
    )

    addTransformTween({
      targetElement: layerElements.container,
      fromValue: currentContainerState,
      toValue: nextContainerState,
      formatter: toTranslate,
      timeline,
    })

    addTransformTween({
      targetElement: layerElements.wrapper,
      fromValue: currentLayerState.wrapper,
      toValue: nextLayerState.wrapper,
      formatter: toScale,
      timeline,
    })

    addPathTween({
      layerElements,
      currentPathD: currentLayerState.pathD,
      nextPathD: nextLayerState.pathD,
      pathMorphConfig: pathMorphByLayer?.[layerKey],
      timeline,
    })
  })

  return timeline
}
