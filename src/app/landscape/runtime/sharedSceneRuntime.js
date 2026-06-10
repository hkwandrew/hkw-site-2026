import gsap from 'gsap'
import MorphSVGPlugin from 'gsap/MorphSVGPlugin'
import {
  SCENE_LAYER_SELECTORS,
  getLayerElements,
  getSceneViewportKey,
  readCurrentLayerState,
  resolveLayerStateForViewport,
  resolveTranslateStateForElement,
  toScale,
  toTranslate,
} from './sharedSceneState'

gsap.registerPlugin(MorphSVGPlugin)

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

export const animateSharedSceneTransition = ({
  durationMs,
  pathMorphByLayer,
  rootElement,
  targetState,
  onComplete,
}) => {
  if (!rootElement || !targetState) return null

  const durationSeconds = durationMs / 1000
  const viewportKey = getSceneViewportKey()
  const timeline = gsap.timeline({
    defaults: {
      duration: durationSeconds,
      ease: 'none',
    },
    onComplete,
  })

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
