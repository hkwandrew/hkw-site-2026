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

gsap.registerPlugin(MorphSVGPlugin)

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

/** Matches `translate(x, y)` or `translate(x y)` with optional `px` units. */
const TRANSLATE_PATTERN = /translate\(([-\d.]+)(?:px)?(?:,\s*|\s+)([-\d.]+)(?:px)?\)/
/** Matches `scale(x, y)` or `scale(x)` (uniform). */
const SCALE_PATTERN = /scale\(([-\d.]+)(?:,\s*|\s+)?([-\d.]+)?\)/

const toTranslate = ({ x, y }) => `translate(${x},${y})`
const toScale = ({ scaleX, scaleY }) => `scale(${scaleX},${scaleY})`

const parseTranslate = (value, fallback) => {
    const match = value?.match(TRANSLATE_PATTERN)

    if (!match) return fallback

    return {
        x: Number(match[1]),
        y: Number(match[2]),
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

const getLayerElements = (rootElement, selectors) => ({
    container: rootElement.querySelector(selectors.container),
    wrapper: rootElement.querySelector(selectors.wrapper),
    path: selectors.path ? rootElement.querySelector(selectors.path) : null,
})

const setLayerState = (layerElements, layerState) => {
    layerElements.container?.setAttribute(
        'transform',
        toTranslate(layerState.container),
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

    Object.entries(SCENE_LAYER_SELECTORS).forEach(([layerKey, selectors]) => {
        setLayerState(
            getLayerElements(rootElement, selectors),
            sceneState[layerKey],
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

    Object.entries(SCENE_LAYER_SELECTORS).forEach(([layerKey, selectors]) => {
        const layerElements = getLayerElements(rootElement, selectors)
        const currentLayerState = readCurrentLayerState(
            layerElements,
            targetState[layerKey],
        )
        const nextLayerState = targetState[layerKey]

        addTransformTween({
            targetElement: layerElements.container,
            fromValue: currentLayerState.container,
            toValue: nextLayerState.container,
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
