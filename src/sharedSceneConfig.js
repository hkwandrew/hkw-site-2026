/**
 * Shared scene configuration for cross-page landscape transitions.
 *
 * Architecture:
 * - The landscape is composed of 7 SVG layers: blueMountain, goldMountain,
 *   sun, dkBlueMountain, treeMountain, upperField, and whiteSand.
 * - Each page defines a frozen scene state that positions and scales every layer.
 * - Page transitions animate from the current layer positions to the target
 *   page's scene state using GSAP timelines (see sharedSceneRuntime.js).
 * - Layers with SVG paths (blueMountain, goldMountain) also morph their
 *   path data between pages via MorphSVGPlugin.
 */
import { getTransitionKey, PAGE_DEFINITIONS, getPageDefinitionForPath } from './pageRegistry.js'
import {
    SCENE_PATH_LAYER_KEYS,
    SCENE_PATH_PAGE_PATHS,
    getScenePathData,
    getScenePathMorphConfig,
} from './scenePathConfig.js'

/** Duration in milliseconds for all page-to-page scene transitions. */
export const SCENE_TRANSITION_DURATION_MS = 1500

const HOME_SCENE_STATE = Object.freeze({
    blueMountain: Object.freeze({
        container: Object.freeze({ x: 2014.808069, y: 635.237842 }),
        wrapper: Object.freeze({ scaleX: 1, scaleY: 1 }),
        pathD: getScenePathData('blueMountain', 'home-page'),
    }),
    goldMountain: Object.freeze({
        container: Object.freeze({ x: 2009.636203, y: 742.708225 }),
        wrapper: Object.freeze({ scaleX: 1, scaleY: 1 }),
        pathD: getScenePathData('goldMountain', 'home-page'),
    }),
    sun: Object.freeze({
        container: Object.freeze({ x: 1723.899505, y: 235.827656 }),
        wrapper: Object.freeze({ scaleX: 1, scaleY: 1 }),
    }),
    dkBlueMountain: Object.freeze({
        container: Object.freeze({ x: 2525.5, y: 707.21376 }),
        wrapper: Object.freeze({ scaleX: 1, scaleY: 1 }),
    }),
    treeMountain: Object.freeze({
        container: Object.freeze({ x: 1455.680149, y: 576.860407 }),
        wrapper: Object.freeze({ scaleX: 1, scaleY: 1 }),
    }),
    upperField: Object.freeze({
        container: Object.freeze({ x: 2005, y: 765.680426 }),
        wrapper: Object.freeze({ scaleX: 1, scaleY: 1 }),
    }),
    whiteSand: Object.freeze({
        container: Object.freeze({ x: 2005, y: 1800 }),
        wrapper: Object.freeze({ scaleX: 1, scaleY: 1 }),
    }),
})

const ABOUT_SCENE_STATE = Object.freeze({
    blueMountain: Object.freeze({
        container: Object.freeze({ x: 2210.230016, y: 1016.863904 }),
        wrapper: Object.freeze({ scaleX: 2.21, scaleY: 2.58 }),
        pathD: getScenePathData('blueMountain', 'about-page'),
    }),
    goldMountain: Object.freeze({
        container: Object.freeze({ x: 1868.83048, y: 998.094682 }),
        wrapper: Object.freeze({ scaleX: 0.8, scaleY: 0.8 }),
        pathD: getScenePathData('goldMountain', 'about-page'),
    }),
    sun: Object.freeze({
        container: Object.freeze({ x: 1556.062193, y: 27.022843 }),
        wrapper: Object.freeze({ scaleX: 1.98, scaleY: 1.98 }),
    }),
    dkBlueMountain: Object.freeze({
        container: Object.freeze({ x: 2566.013348, y: 917.966795 }),
        wrapper: Object.freeze({ scaleX: 0.8, scaleY: 0.8 }),
    }),
    treeMountain: Object.freeze({
        container: Object.freeze({ x: 957.933093, y: 886.922845 }),
        wrapper: Object.freeze({ scaleX: 0.8, scaleY: 0.8 }),
    }),
    upperField: Object.freeze({
        container: Object.freeze({ x: 2101.532525, y: 1083.708382 }),
        wrapper: Object.freeze({ scaleX: 0.8, scaleY: 0.8 }),
    }),
    whiteSand: Object.freeze({
        container: Object.freeze({ x: 2005, y: 1800 }),
        wrapper: Object.freeze({ scaleX: 1, scaleY: 1 }),
    }),
})

const SERVICES_SCENE_STATE = Object.freeze({
    blueMountain: Object.freeze({
        container: Object.freeze({ x: 2025.697877, y: 495 }),
        wrapper: Object.freeze({ scaleX: 1.1, scaleY: 1.1 }),
        pathD: getScenePathData('blueMountain', 'services-page'),
    }),
    goldMountain: Object.freeze({
        container: Object.freeze({ x: 2023.544812, y: 863.249504 }),
        wrapper: Object.freeze({ scaleX: 1.25, scaleY: 1.4 }),
        pathD: getScenePathData('goldMountain', 'services-page'),
    }),
    sun: Object.freeze({
        container: Object.freeze({ x: 1689.827022, y: -160.209423 }),
        wrapper: Object.freeze({ scaleX: 1.2, scaleY: 1.2 }),
    }),
    dkBlueMountain: Object.freeze({
        container: Object.freeze({ x: 3489.129945, y: 1530.308658 }),
        wrapper: Object.freeze({ scaleX: 2, scaleY: 2 }),
    }),
    treeMountain: Object.freeze({
        container: Object.freeze({ x: 1412.639424, y: 845.9524 }),
        wrapper: Object.freeze({ scaleX: 2.93, scaleY: 2.34 }),
    }),
    upperField: Object.freeze({
        container: Object.freeze({ x: 2041.826439, y: 1585.616759 }),
        wrapper: Object.freeze({ scaleX: 2, scaleY: 2 }),
    }),
    whiteSand: Object.freeze({
        container: Object.freeze({ x: 2005, y: 1800 }),
        wrapper: Object.freeze({ scaleX: 1, scaleY: 1 }),
    }),
})

const WORK_SCENE_STATE = Object.freeze({
    blueMountain: Object.freeze({
        container: Object.freeze({ x: 1614.808069, y: 575.237842 }),
        wrapper: Object.freeze({ scaleX: 2.2, scaleY: 2.2 }),
        pathD: getScenePathData('blueMountain', 'work-page'),
    }),
    goldMountain: Object.freeze({
        container: Object.freeze({ x: 1643.5, y: 1200 }),
        wrapper: Object.freeze({ scaleX: 2.1625, scaleY: 2.1625 }),
        pathD: getScenePathData('goldMountain', 'work-page'),
    }),
    sun: Object.freeze({
        container: Object.freeze({ x: 1689.827022, y: -160.209423 }),
        wrapper: Object.freeze({ scaleX: 1.2, scaleY: 1.2 }),
    }),
    dkBlueMountain: Object.freeze({
        container: Object.freeze({ x: 2566.013348, y: 1287.966795 }),
        wrapper: Object.freeze({ scaleX: 0.8, scaleY: 0.8 }),
    }),
    treeMountain: Object.freeze({
        container: Object.freeze({ x: 957.933093, y: 1186.922845 }),
        wrapper: Object.freeze({ scaleX: 0.8, scaleY: 0.8 }),
    }),
    upperField: Object.freeze({
        container: Object.freeze({ x: 2101.532525, y: 1283.708382 }),
        wrapper: Object.freeze({ scaleX: 0.8, scaleY: 0.8 }),
    }),
    whiteSand: Object.freeze({
        container: Object.freeze({ x: 1200, y: 190 }),
        wrapper: Object.freeze({ scaleX: 1, scaleY: 1 }),
    }),
})

const CONTACT_SCENE_STATE = Object.freeze({
    ...HOME_SCENE_STATE,
    sun: Object.freeze({
        container: Object.freeze({ x: 1893.827022, y: 512 }),
        wrapper: Object.freeze({ scaleX: 8.4483, scaleY: 8.4483 }),
    }),
    blueMountain: Object.freeze({
        container: Object.freeze({ x: 3175.697877, y: 644.21 }),
        wrapper: Object.freeze({ scaleX: 1, scaleY: 1 }),
        pathD: getScenePathData('blueMountain', 'contact-page'),
    }),
    goldMountain: Object.freeze({
        container: Object.freeze({ x: 2023.544812, y: 1798 }),
        wrapper: Object.freeze({ scaleX: 0.8, scaleY: 0.8 }),
        pathD: getScenePathData('goldMountain', 'contact-page'),
    }),
    dkBlueMountain: Object.freeze({
        container: Object.freeze({ x: 3489.129945, y: 1798 }),
        wrapper: Object.freeze({ scaleX: 0.8, scaleY: 0.8 }),
    }),
    treeMountain: Object.freeze({
        container: Object.freeze({ x: 1412.639424, y: 1798 }),
        wrapper: Object.freeze({ scaleX: 0.8, scaleY: 0.8 }),
    }),
    upperField: Object.freeze({
        container: Object.freeze({ x: 2041.826439, y: 1798 }),
        wrapper: Object.freeze({ scaleX: 0.8, scaleY: 0.8 }),
    }),
    whiteSand: Object.freeze({
        container: Object.freeze({ x: 2005, y: 1800 }),
        wrapper: Object.freeze({ scaleX: 1, scaleY: 1 }),
    }),
})

/** Frozen map of page keys to their scene layer states. */
export const SCENE_PAGE_STATES = Object.freeze({
    'about-page': ABOUT_SCENE_STATE,
    'contact-page': CONTACT_SCENE_STATE,
    'home-page': HOME_SCENE_STATE,
    'services-page': SERVICES_SCENE_STATE,
    'work-page': WORK_SCENE_STATE,
})

const REQUIRED_LAYER_KEYS = Object.freeze([
    'blueMountain',
    'goldMountain',
    'sun',
    'dkBlueMountain',
    'treeMountain',
    'upperField',
    'whiteSand',
])

const validateLayerState = (sceneKey, layerKey, layerState) => {
    const errors = []

    if (!layerState?.container) {
        errors.push(`${sceneKey}.${layerKey} is missing container coordinates`)
    }

    if (!layerState?.wrapper) {
        errors.push(`${sceneKey}.${layerKey} is missing wrapper scale`)
    }

    if (SCENE_PATH_LAYER_KEYS.includes(layerKey)) {
        if (!layerState?.pathD) {
            errors.push(`${sceneKey}.${layerKey} is missing path data`)
        }
    }

    return errors
}

/**
 * Returns the scene state for a given route pathname.
 * @param {string} pathname - Route path (e.g. '/', '/about')
 * @returns {Object|null} Scene state with layer positions, or null if unknown
 */
export const resolveSceneStateForPath = (pathname) => {
    const pageDefinition = getPageDefinitionForPath(pathname)

    if (!pageDefinition) return null

    return SCENE_PAGE_STATES[pageDefinition.sceneStateKey] ?? null
}

/**
 * Builds a transition config for animating between two pages.
 * @param {string} fromPath - Source route path
 * @param {string} toPath - Target route path
 * @returns {{ transitionKey: string, durationMs: number, fromPage: Object, toPage: Object, targetState: Object, pathMorphByLayer: Object }|null}
 */
export const resolveSceneTransition = (fromPath, toPath) => {
    const fromPage = getPageDefinitionForPath(fromPath)
    const toPage = getPageDefinitionForPath(toPath)

    if (!fromPage || !toPage || fromPage.routePath === toPage.routePath) {
        return null
    }

    const transitionKey = getTransitionKey(fromPath, toPath)

    return {
        transitionKey,
        durationMs: SCENE_TRANSITION_DURATION_MS,
        fromPage,
        toPage,
        targetState: SCENE_PAGE_STATES[toPage.sceneStateKey] ?? null,
        pathMorphByLayer: Object.freeze(
            Object.fromEntries(
                SCENE_PATH_LAYER_KEYS.map((layerKey) => [
                    layerKey,
                    getScenePathMorphConfig(layerKey, transitionKey),
                ]),
            ),
        ),
    }
}

/**
 * Validates all scene states have required layers and properties.
 * @returns {string[]} Array of error messages (empty when valid)
 */
export const validateSharedSceneConfig = () => {
    const errors = []

    PAGE_DEFINITIONS.forEach((pageDefinition) => {
        const sceneState = SCENE_PAGE_STATES[pageDefinition.sceneStateKey]

        if (!sceneState) {
            errors.push(
                `Missing shared scene state for ${pageDefinition.id} (${pageDefinition.sceneStateKey})`,
            )
            return
        }

        REQUIRED_LAYER_KEYS.forEach((layerKey) => {
            errors.push(...validateLayerState(pageDefinition.sceneStateKey, layerKey, sceneState[layerKey]))
        })
    })

    SCENE_PATH_LAYER_KEYS.forEach((layerKey) => {
        Object.keys(SCENE_PATH_PAGE_PATHS[layerKey]).forEach((pageKey) => {
            if (!SCENE_PAGE_STATES[pageKey]) {
                errors.push(
                    `${layerKey} path defined for unknown scene state ${pageKey}`,
                )
            }
        })
    })

    return errors
}
