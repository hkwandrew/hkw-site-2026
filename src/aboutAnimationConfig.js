export const STATE_ONE = 0
export const STATE_TWO = 1
export const STATE_THREE = 2
export const STATE_FOUR = 3

export const ABOUT_SCROLL_TRIGGER_ID = '-scroll-trigger'
export const ABOUT_DESKTOP_MIN_WIDTH = 1024

export const TIMELINE = {
    stateTwo: 1.2,
    stateThree: 2.35,
    stateFour: 3.5,
    transitionOneDuration: 0.52,
    transitionTwoDuration: 0.5,
    transitionThreeDuration: 0.52,
    holdTail: 0.55,
}

export const TIMELINE_END_TIME = TIMELINE.stateFour + TIMELINE.holdTail
export const STAGE_ONE_TARGET_TIME = TIMELINE.stateTwo
export const STAGE_ONE_SCROLL_PROGRESS = STAGE_ONE_TARGET_TIME / TIMELINE_END_TIME
export const SCROLL_DISTANCE_VIEWPORT_MULTIPLIER = 4.2

export const ABOUT_INITIAL_VISIBILITY = {
    intro: 1,
    dark: 1,
    mid: 0,
    light: 0,
    outro: 0,
    mascot: 0,
}

export const ABOUT_TRANSITIONS = [
    {
        label: 'view-2',
        toState: STATE_TWO,
        time: TIMELINE.stateTwo,
        duration: TIMELINE.transitionOneDuration,
        start: TIMELINE.stateTwo - TIMELINE.transitionOneDuration,
        morphHero: true,
        fades: [
            {
                group: 'intro',
                autoAlpha: 0,
                offset: 0.2,
                durationScale: 0.45,
            },
            {
                group: 'mid',
                autoAlpha: 1,
                offset: 0.45,
                durationScale: 0.45,
            },
        ],
    },
    {
        label: 'view-3',
        toState: STATE_THREE,
        time: TIMELINE.stateThree,
        duration: TIMELINE.transitionTwoDuration,
        start: TIMELINE.stateThree - TIMELINE.transitionTwoDuration,
        fades: [
            {
                group: 'dark',
                autoAlpha: 0,
                offset: 0.08,
                durationScale: 0.42,
            },
            {
                group: 'light',
                autoAlpha: 1,
                offset: 0.5,
                durationScale: 0.42,
            },
        ],
    },
    {
        label: 'view-4',
        toState: STATE_FOUR,
        time: TIMELINE.stateFour,
        duration: TIMELINE.transitionThreeDuration,
        start: TIMELINE.stateFour - TIMELINE.transitionThreeDuration,
        fades: [
            {
                group: 'mid',
                autoAlpha: 0,
                offset: 0.1,
                durationScale: 0.42,
            },
            {
                group: 'outro',
                autoAlpha: 1,
                offset: 0.54,
                durationScale: 0.42,
            },
            {
                group: 'mascot',
                autoAlpha: 1,
                offset: 0.64,
                durationScale: 0.24,
            },
        ],
    },
]

export const HERO_CLOUD_PATHS = {
    stageZero:
        'M290.44 62.0366C213.91 81.0244 155.146 137.147 142.759 201.294L142.99 201.402C45.9439 228.79 -16.5293 311.818 3.85684 393.984C24.243 476.15 123.122 522.621 224.202 497.542C226.888 496.875 229.726 496.005 232.603 495.292C277.179 583.041 394.282 626.645 512.817 597.236C631.352 567.826 683.986 458.248 683.986 458.248C699.799 461.57 716.039 463.247 732.198 463.226C761.419 536.693 835.806 595.252 926.419 614.5C1045.82 639.863 1161.35 592.21 1202.94 502.869C1205.84 503.484 1208.7 504.258 1211.41 504.832C1313.23 526.461 1410.45 476.564 1428.06 393.641C1445.68 310.717 1380.49 229.774 1282.62 205.697L1282.85 205.58C1268.33 141.813 1207.74 87.6671 1130.65 71.2918C1076.75 59.8415 1022.28 68.1691 980.39 93.3121C951.808 59.6131 909.934 35.2599 862.212 25.1228C815.184 15.133 768.129 20.448 729.713 37.9506C686.275 3.69012 621.281 -9.12476 557.299 6.75002C509.923 18.5043 468.869 44.2481 441.419 78.8645C398.695 55.2042 343.953 48.7594 290.44 62.0366Z',
    stageOne:
        'M557.299 6.75C617.88 -8.28073 679.366 2.40868 722.604 32.6689C764.421 4.34513 822.4 -6.57806 880.34 5.72949C928.061 15.8666 969.936 40.2201 998.518 73.9189C1040.41 48.776 1094.88 40.4482 1148.78 51.8984C1225.87 68.2737 1286.45 122.42 1300.98 186.187L1300.75 186.303C1398.62 210.38 1463.81 291.324 1446.19 374.247C1428.58 457.17 1331.35 507.067 1229.53 485.438C1226.83 484.864 1223.96 484.091 1221.07 483.476C1179.47 572.817 1063.95 620.47 944.547 595.106C853.934 575.858 779.546 517.3 750.325 443.833L749.988 432.962C734.26 436.864 718.107 439.051 701.95 439.584C675.191 513.917 602.773 574.916 512.817 597.235C394.283 626.645 277.179 583.041 232.604 495.291C229.726 496.005 226.887 496.875 224.202 497.541C123.122 522.62 24.2425 476.149 3.85645 393.983C-16.5294 311.818 45.9442 228.79 142.99 201.401L142.76 201.293C155.146 137.147 213.911 81.0239 290.44 62.0361C343.954 48.759 398.695 55.204 441.419 78.8643C468.869 44.2479 509.923 18.5043 557.299 6.75Z',
}

export const HERO_CLOUD_STAGE_ZERO_SELECTOR = '[data-hero-cloud-stage-zero]'
export const HERO_CLOUD_STAGE_ONE_SELECTOR = '[data-hero-cloud-stage-one]'
