import { PAGE_DEFINITIONS } from './pageMetadata.js'

const PAGE_BY_PATH = Object.freeze(
    Object.fromEntries(
        PAGE_DEFINITIONS.map((pageDefinition) => [
            pageDefinition.routePath,
            pageDefinition,
        ]),
    ),
)

const createRouteHandle = (pageDefinition) => ({
    pageId: pageDefinition.id,
    pageKey: pageDefinition.pageKey,
    label: pageDefinition.label,
})

export { PAGE_DEFINITIONS }

export const NAV_ITEMS = Object.freeze(
    PAGE_DEFINITIONS.filter((pageDefinition) => pageDefinition.showInNav).map(
        (pageDefinition) =>
            Object.freeze({
                id: pageDefinition.id,
                label: pageDefinition.navLabel,
                path: pageDefinition.routePath,
            }),
    ),
)

export const getPageDefinitionForPath = (pathname) => PAGE_BY_PATH[pathname] ?? null

export const getPageKeyForPath = (pathname) =>
    getPageDefinitionForPath(pathname)?.pageKey ?? 'unknown'

export const getPageLabelForPath = (pathname) =>
    getPageDefinitionForPath(pathname)?.label ?? ''

export const getTransitionKey = (fromPath, toPath) => {
    const fromPage = getPageDefinitionForPath(fromPath)
    const toPage = getPageDefinitionForPath(toPath)

    if (!fromPage || !toPage || fromPage.routePath === toPage.routePath) {
        return ''
    }

    return `${fromPage.id}-to-${toPage.id}`
}

export const getRouteChildrenConfig = (componentById) =>
    PAGE_DEFINITIONS.map((pageDefinition) => {
        const Component = componentById[pageDefinition.id]

        if (!Component) {
            throw new Error(`Missing route component for page "${pageDefinition.id}"`)
        }

        if (pageDefinition.routePath === '/') {
            return {
                index: true,
                Component,
                handle: createRouteHandle(pageDefinition),
            }
        }

        const routePath = pageDefinition.routePath
        const relativePath = routePath && routePath.startsWith('/') ? routePath.slice(1) : routePath

        return {
            path: relativePath,
            Component,
            handle: createRouteHandle(pageDefinition),
        }
    })
