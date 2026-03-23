import { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
import MorphSVGPlugin from 'gsap/MorphSVGPlugin'
import { useBlocker } from 'react-router'
import { usePageSceneTransition } from '../context/pageSceneTransition'

import {
    ABOUT_DESKTOP_MIN_WIDTH,
    ABOUT_INITIAL_VISIBILITY,
    ABOUT_SCROLL_TRIGGER_ID,
    ABOUT_TRANSITIONS,
    HERO_CLOUD_STAGE_ONE_SELECTOR,
    HERO_CLOUD_STAGE_ZERO_SELECTOR,
    SCROLL_DISTANCE_VIEWPORT_MULTIPLIER,
    STAGE_ONE_SCROLL_PROGRESS,
    STATE_ONE,
    STATE_TWO,
    TIMELINE,
    TIMELINE_END_TIME,
} from '../aboutAnimationConfig'
import {
    CLOUDS,
    DESIGN_FRAME,
    HERO_CLOUD_CONTAINER_STATES,
    MASCOT,
    OUTRO_COPY,
    QUOTES,
} from '../data/about-clouds-quotes'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, MorphSVGPlugin)

const INTRO_DURATION_S = 1.5
const INTRO_DURATION_MS = INTRO_DURATION_S * 1000

const resolveResponsiveValue = (lazy, resolver) =>
    lazy ? () => resolver() : resolver()

const useAboutAnimation = () => {
    const sectionRef = useRef(null)
    const exitTransitionRef = useRef(null)
    const nextPathRef = useRef(null)
    const { transitionSceneToPath } = usePageSceneTransition()
    const leaveAboutBlocker = useBlocker(
        ({ currentLocation, nextLocation }) => {
            const isLeavingAbout =
                currentLocation.pathname === '/about' &&
                nextLocation.pathname !== currentLocation.pathname

            nextPathRef.current = isLeavingAbout ? nextLocation.pathname : null

            return isLeavingAbout
        },
    )

    useEffect(() => {
        if (leaveAboutBlocker.state !== 'blocked') return

        transitionSceneToPath(nextPathRef.current)

        const runExit = exitTransitionRef.current
        if (!runExit) {
            leaveAboutBlocker.proceed()
            return
        }

        runExit(() => {
            nextPathRef.current = null
            leaveAboutBlocker.proceed()
        })
    }, [leaveAboutBlocker, transitionSceneToPath])

    useLayoutEffect(() => {
        const section = sectionRef.current
        if (!section) return undefined

        const sceneEl = section.querySelector('.about-scene')
        const shouldReduce = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches
        const isStaticMode =
            shouldReduce || window.innerWidth < ABOUT_DESKTOP_MIN_WIDTH

        const toX = (value) => (value / DESIGN_FRAME.width) * section.clientWidth
        const toY = (value) => (value / DESIGN_FRAME.height) * section.clientHeight
        const createXYWidthProps = (state, width, lazy, extraProps = {}) => ({
            x: resolveResponsiveValue(lazy, () => toX(state.x)),
            y: resolveResponsiveValue(lazy, () => toY(state.y)),
            width: resolveResponsiveValue(lazy, () => toX(width)),
            ...extraProps,
        })
        const createLeftTopWidthProps = (state, lazy, extraProps = {}) => ({
            left: resolveResponsiveValue(lazy, () => toX(state.x)),
            top: resolveResponsiveValue(lazy, () => toY(state.y)),
            width: resolveResponsiveValue(lazy, () => toX(state.width)),
            ...extraProps,
        })

        let activeStage = -1
        let scrollCtx
        let introTimeoutId = 0
        let isDisposed = false

        const getStageFromTime = (time) =>
            ABOUT_TRANSITIONS.reduce(
                (stage, transition) =>
                    time >= transition.start ? transition.toState : stage,
                STATE_ONE,
            )

        const applyStageTargeting = (stage) => {
            if (activeStage === stage) return
            activeStage = stage
            section.dataset.aboutStage = String(stage)
        }

        const clearStageTargeting = () => {
            activeStage = -1
            section.removeAttribute('data-about-stage')
        }

        const heroCloudEl = section.querySelector('.about-heroCloud')
        const heroCloudStageZeroPathEl = section.querySelector(
            HERO_CLOUD_STAGE_ZERO_SELECTOR,
        )
        const heroCloudStageOnePathEl = section.querySelector(
            HERO_CLOUD_STAGE_ONE_SELECTOR,
        )
        const heroCloudStageZeroD = heroCloudStageZeroPathEl?.getAttribute('d')
        const heroCloudStageOneD = heroCloudStageOnePathEl?.getAttribute('d')
        const introCopyEl = section.querySelector('[data-intro-copy]')
        const scrollHintEl = section.querySelector('[data-scroll-hint]')
        const outroCopyEl = section.querySelector('[data-outro-copy]')
        const mascotEl = section.querySelector('[data-outro-mascot]')
        const darkQuoteEls = [
            ...section.querySelectorAll('[data-quote-layer="dark"]'),
        ]
        const midQuoteEls = [...section.querySelectorAll('[data-quote-layer="mid"]')]
        const lightQuoteEls = [
            ...section.querySelectorAll('[data-quote-layer="light"]'),
        ]
        const allQuoteEls = [...section.querySelectorAll('.about-quote')]
        const introElements = [introCopyEl, scrollHintEl].filter(Boolean)

        const visibilityGroups = {
            intro: introElements,
            dark: darkQuoteEls,
            mid: midQuoteEls,
            light: lightQuoteEls,
            outro: outroCopyEl ? [outroCopyEl] : [],
            mascot: mascotEl ? [mascotEl] : [],
        }

        const heroContainerStates = [
            HERO_CLOUD_CONTAINER_STATES[STATE_ONE],
            HERO_CLOUD_CONTAINER_STATES[STATE_TWO],
            HERO_CLOUD_CONTAINER_STATES[STATE_TWO],
            HERO_CLOUD_CONTAINER_STATES[STATE_TWO],
        ]

        const motionTargets = [
            ...CLOUDS.map((cloud) => {
                const element = section.querySelector(`[data-cloud-id="${cloud.id}"]`)

                return {
                    element,
                    propsForState: (stateIndex, lazy) => {
                        const state = cloud.states[stateIndex]
                        if (!element || !state) return null

                        return createXYWidthProps(state, cloud.width, lazy)
                    },
                }
            }),
            ...QUOTES.map((quote) => {
                const element = section.querySelector(`[data-quote-id="${quote.id}"]`)

                return {
                    element,
                    propsForState: (stateIndex, lazy) => {
                        const state = quote.states[stateIndex]
                        if (!element || !state) return null

                        return createXYWidthProps(state, quote.width, lazy)
                    },
                }
            }),
            {
                element: outroCopyEl,
                propsForState: (stateIndex, lazy) => {
                    const state = OUTRO_COPY.states[stateIndex]
                    if (!outroCopyEl || !state) return null

                    return createXYWidthProps(state, OUTRO_COPY.width, lazy)
                },
            },
            {
                element: mascotEl,
                propsForState: (stateIndex, lazy) => {
                    const state = MASCOT.states[stateIndex]
                    if (!mascotEl || !state) return null

                    return createXYWidthProps(state, MASCOT.width, lazy, {
                        autoAlpha: resolveResponsiveValue(lazy, () => state.opacity),
                        transformOrigin: 'center bottom',
                    })
                },
            },
            {
                element: heroCloudEl,
                propsForState: (stateIndex, lazy) => {
                    const state = heroContainerStates[stateIndex]
                    if (!heroCloudEl || !state) return null

                    return createLeftTopWidthProps(state, lazy)
                },
            },
        ]

        const applyMotionState = (stateIndex) => {
            motionTargets.forEach((target) => {
                const props = target.propsForState(stateIndex, false)
                if (!target.element || !props) return

                gsap.set(target.element, props)
            })
        }

        const tweenMotionState = (timeline, stateIndex, position, duration) => {
            motionTargets.forEach((target) => {
                const props = target.propsForState(stateIndex, true)
                if (!target.element || !props) return

                timeline.to(
                    target.element,
                    {
                        ...props,
                        duration,
                    },
                    position,
                )
            })
        }

        const setGroupVisibility = (group, autoAlpha) => {
            const elements = visibilityGroups[group] ?? []
            if (!elements.length) return

            gsap.set(elements, { autoAlpha })
        }

        const setHeroCloudState = (stateIndex) => {
            if (!heroCloudStageZeroPathEl || !heroCloudStageZeroD || !heroCloudStageOneD) {
                return
            }

            gsap.set(heroCloudStageZeroPathEl, {
                attr: {
                    d: stateIndex === STATE_ONE ? heroCloudStageZeroD : heroCloudStageOneD,
                },
            })
        }

        const tweenHeroCloudState = (timeline, position, duration) => {
            if (!heroCloudStageZeroPathEl || !heroCloudStageOnePathEl) return

            timeline.to(
                heroCloudStageZeroPathEl,
                {
                    morphSVG: heroCloudStageOnePathEl,
                    duration,
                    immediateRender: false,
                },
                position,
            )
        }

        applyMotionState(STATE_ONE)
        setHeroCloudState(STATE_ONE)
        applyStageTargeting(STATE_ONE)

        if (isStaticMode) {
            section.classList.add('about--static')
            setGroupVisibility('intro', 1)
            gsap.set(allQuoteEls, { autoAlpha: 1 })
            gsap.set(outroCopyEl, { autoAlpha: 1 })
            gsap.set(mascotEl, { autoAlpha: 0 })

            return () => {
                section.classList.remove('about--static')
                clearStageTargeting()
            }
        }

        section.classList.remove('about--static')

        const initScrollAnimation = () => {
            if (scrollCtx) return

            scrollCtx = gsap.context(() => {
                Object.entries(ABOUT_INITIAL_VISIBILITY).forEach(
                    ([group, autoAlpha]) => {
                        setGroupVisibility(group, autoAlpha)
                    },
                )

                const timeline = gsap.timeline({
                    scrollTrigger: {
                        id: ABOUT_SCROLL_TRIGGER_ID,
                        trigger: section,
                        start: 'top top',
                        end: `+=${SCROLL_DISTANCE_VIEWPORT_MULTIPLIER * 100}%`,
                        scrub: true,
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                        onUpdate: (self) => {
                            applyStageTargeting(
                                getStageFromTime(self.animation?.time?.() ?? 0),
                            )
                        },
                        onRefresh: (self) => {
                            applyStageTargeting(
                                getStageFromTime(self.animation?.time?.() ?? 0),
                            )
                        },
                    },
                })

                timeline.addLabel('view-1', 0)

                ABOUT_TRANSITIONS.forEach((transition) => {
                    transition.fades.forEach((fade) => {
                        const elements = visibilityGroups[fade.group] ?? []
                        if (!elements.length) return

                        timeline.to(
                            elements,
                            {
                                autoAlpha: fade.autoAlpha,
                                duration: transition.duration * fade.durationScale,
                            },
                            transition.start + transition.duration * fade.offset,
                        )
                    })

                    tweenMotionState(
                        timeline,
                        transition.toState,
                        transition.start,
                        transition.duration,
                    )

                    if (transition.morphHero) {
                        tweenHeroCloudState(
                            timeline,
                            transition.start,
                            transition.duration,
                        )
                    }

                    timeline.addLabel(transition.label, transition.time)
                })

                timeline.to(
                    { hold: 0 },
                    { hold: 1, duration: TIMELINE.holdTail },
                    TIMELINE_END_TIME - TIMELINE.holdTail,
                )
                applyStageTargeting(getStageFromTime(timeline.time()))
            }, section)

            ScrollTrigger.refresh()
        }

        const runExitTransition = (onComplete) => {
            if (!sceneEl || isStaticMode || isDisposed) {
                onComplete?.()
                return
            }

            sceneEl.classList.add('about-scene--exit')
            introTimeoutId = setTimeout(() => {
                onComplete?.()
            }, INTRO_DURATION_MS)
        }

        exitTransitionRef.current = runExitTransition

        if (!sceneEl) {
            initScrollAnimation()
        } else {
            // CSS animation intro — immune to React StrictMode's
            // mount-cleanup-remount cycle unlike GSAP tweens.
            sceneEl.classList.add('about-scene--enter')

            introTimeoutId = setTimeout(() => {
                if (isDisposed) return
                sceneEl.classList.remove('about-scene--enter')
                initScrollAnimation()
            }, INTRO_DURATION_MS)
        }

        return () => {
            isDisposed = true
            clearTimeout(introTimeoutId)

            if (sceneEl) {
                sceneEl.classList.remove('about-scene--enter', 'about-scene--exit')
            }

            exitTransitionRef.current = null
            scrollCtx?.revert()
            clearStageTargeting()
        }
    }, [])

    const handleScrollHintClick = () => {
        const trigger = ScrollTrigger.getById(ABOUT_SCROLL_TRIGGER_ID)
        if (!trigger) return

        const targetY =
            trigger.start +
            (trigger.end - trigger.start) * STAGE_ONE_SCROLL_PROGRESS

        gsap.to(window, {
            scrollTo: { y: Math.round(targetY), autoKill: true },
            duration: 1,
        })
    }

    return {
        sectionRef,
        handleScrollHintClick,
    }
}

export default useAboutAnimation
