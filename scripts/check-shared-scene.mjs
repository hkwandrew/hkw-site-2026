import { PAGE_DEFINITIONS, getTransitionKey } from '../src/pageRegistry.js'
import {
    resolveSceneTransition,
    validateSharedSceneConfig,
} from '../src/sharedSceneConfig.js'

const routePaths = PAGE_DEFINITIONS.map((pageDefinition) => pageDefinition.routePath)

const errors = [...validateSharedSceneConfig()]
let checkedTransitions = 0

routePaths.forEach((fromPath) => {
    routePaths.forEach((toPath) => {
        if (fromPath === toPath) return

        const transitionKey = getTransitionKey(fromPath, toPath)
        const transitionConfig = resolveSceneTransition(fromPath, toPath)

        checkedTransitions += 1

        if (!transitionKey) {
            errors.push(`Missing transition key for ${fromPath} -> ${toPath}`)
            return
        }

        if (!transitionConfig?.targetState) {
            errors.push(`Missing target state for ${transitionKey}`)
        }
    })
})

if (errors.length > 0) {
    console.error('Shared scene validation failed:')
    errors.forEach((error) => {
        console.error(`- ${error}`)
    })
    process.exitCode = 1
} else {
    console.log(
        `Validated ${PAGE_DEFINITIONS.length} routes and ${checkedTransitions} shared scene transitions`,
    )
}
