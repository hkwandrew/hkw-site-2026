export const STATE_ONE = 0
export const STATE_TWO = 1
export const STATE_THREE = 2
export const STATE_FOUR = 3

export const STAGE_CLASS_NAMES = [
    'about-stage-0',
    'about-stage-1',
    'about-stage-2',
    'about-stage-3',
]

export const ABOUT_SCROLL_TRIGGER_ID = '-scroll-trigger'

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
export const STAGE_ONE_SCROLL_LABEL = 'view-2'
export const SCROLL_DISTANCE_VIEWPORT_MULTIPLIER = 4.2

export const HERO_CLOUD_STAGE_ZERO_SELECTOR = '[data-hero-cloud-stage-zero]'
export const HERO_CLOUD_STAGE_ONE_SELECTOR = '[data-hero-cloud-stage-one]'
