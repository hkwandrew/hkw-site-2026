import {
    SCENE_PATH_PAGE_PATHS,
    SCENE_PATH_TRANSITION_OVERRIDES,
    getScenePathData,
    getScenePathMorphConfig,
} from './scenePathConfig.js'

export const BLUE_MOUNTAIN_MORPH_DURATION_MS = 2500

export const BLUE_MOUNTAIN_PAGE_PATHS = SCENE_PATH_PAGE_PATHS.blueMountain

export const BLUE_MOUNTAIN_TRANSITION_OVERRIDES =
    SCENE_PATH_TRANSITION_OVERRIDES.blueMountain

export const getBlueMountainPathForPage = (pageKey) =>
    getScenePathData('blueMountain', pageKey)

export const getBlueMountainMorphConfigForTransition = (transitionKey) =>
    getScenePathMorphConfig('blueMountain', transitionKey)
