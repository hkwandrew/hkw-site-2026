export const HOME_HOVER_REGION = Object.freeze({
    blueMountain: 'blueMountain',
    contact: 'contact',
    dkBlueMountain: 'dkBlueMountain',
    goldMountain: 'goldMountain',
    mascot: 'mascot',
    treeMountain: 'treeMountain',
})

export const HOME_HOVER_POSITION_CONFIG = Object.freeze({
    [HOME_HOVER_REGION.blueMountain]: Object.freeze({
        x: -279,
        y: -326,
    }),
    [HOME_HOVER_REGION.contact]: Object.freeze({
        x: -50,
        y: -51,
        width: 100,
        height: 102,
    }),
    [HOME_HOVER_REGION.dkBlueMountain]: Object.freeze({
        x: -575,
        y: -300,
    }),
    [HOME_HOVER_REGION.goldMountain]: Object.freeze({
        x: 1500,
        y: 200,
        width: 752,
        height: 397,
    }),
    [HOME_HOVER_REGION.mascot]: Object.freeze({
        right: 140,
        bottom: 78,
        width: 423,
        clipTop: 22,
    }),
    [HOME_HOVER_REGION.treeMountain]: Object.freeze({
        x: 1191.222193,
        y: 224.10880,
    }),
})

export const getHomeHoverTransform = (region) => {
    const regionConfig = HOME_HOVER_POSITION_CONFIG[region] ?? {}
    const x = regionConfig.x ?? 0
    const y = regionConfig.y ?? 0

    return `translate(${x} ${y})`
}

export const getHomeHoverRegionPosition = (region) =>
    HOME_HOVER_POSITION_CONFIG[region] ?? {}
