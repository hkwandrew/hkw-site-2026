import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'

import {
    SCENE_PATH_LAYER_KEYS,
    getScenePathData,
    getScenePathMorphConfig,
} from '../src/scenePathConfig.js'
import { PAGE_DEFINITIONS, getTransitionKey } from '../src/pageRegistry.js'

const transitionDataByLayer = Object.fromEntries(
    SCENE_PATH_LAYER_KEYS.map((layerKey) => [
        layerKey,
        Object.fromEntries(
            PAGE_DEFINITIONS.flatMap((fromPage) =>
                PAGE_DEFINITIONS.flatMap((toPage) => {
                    if (fromPage.routePath === toPage.routePath) return []

                    const transitionKey = getTransitionKey(
                        fromPage.routePath,
                        toPage.routePath,
                    )
                    const [fromPathData, toPathData] =
                        MorphSVGPlugin.normalizeStrings(
                            getScenePathData(layerKey, fromPage.sceneStateKey),
                            getScenePathData(layerKey, toPage.sceneStateKey),
                            getScenePathMorphConfig(layerKey, transitionKey),
                        )

                    return [
                        [
                            transitionKey,
                            {
                                fromPageKey: fromPage.sceneStateKey,
                                toPageKey: toPage.sceneStateKey,
                                fromPathData,
                                toPathData,
                            },
                        ],
                    ]
                }),
            ),
        ),
    ]),
)

console.log(
    JSON.stringify(transitionDataByLayer, null, 4),
)
