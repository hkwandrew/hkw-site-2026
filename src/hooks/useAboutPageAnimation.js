import { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import MorphSVGPlugin from 'gsap/MorphSVGPlugin'
import { useBlocker } from 'react-router'
import { usePageSceneTransition } from '../context/pageSceneTransition'

import {
    HERO_CLOUD_STAGE_ONE_SELECTOR,
    HERO_CLOUD_STAGE_ZERO_SELECTOR,
    ABOUT_SCROLL_TRIGGER_ID,
    SCROLL_DISTANCE_VIEWPORT_MULTIPLIER,
    STAGE_CLASS_NAMES,
    STAGE_ONE_SCROLL_LABEL,
    STAGE_ONE_SCROLL_PROGRESS,
    STATE_FOUR,
    STATE_ONE,
    STATE_THREE,
    STATE_TWO,
    TIMELINE,
} from './aboutAnimationConfig'
import {
    CLOUDS,
    DESIGN_FRAME,
    HERO_CLOUD_CONTAINER_STATES,
    MASCOT,
    OUTRO_COPY,
    QUOTES,
} from './aboutData'
import { ABOUT_STAGE_EASE } from './aboutStageEasing'

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin)

const INTRO_TRANSITION_MS = 850
const INTRO_TRANSITION_FALLBACK_MS = INTRO_TRANSITION_MS + 220
const INTRO_CLASS_NAME = 'about-scene--intro'
const INTRO_ACTIVE_CLASS_NAME = 'about-scene--intro-active'
const OUTRO_CLASS_NAME = 'about-scene--outro'

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

        const runExitTransition = exitTransitionRef.current
        if (!runExitTransition) {
            leaveAboutBlocker.proceed()
            return
        }

        runExitTransition(() => {
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

        const toX = (value) => (value / DESIGN_FRAME.width) * section.clientWidth
        const toY = (value) => (value / DESIGN_FRAME.height) * section.clientHeight
        const transitionOneStart =
            TIMELINE.stateTwo - TIMELINE.transitionOneDuration
        const transitionTwoStart =
            TIMELINE.stateThree - TIMELINE.transitionTwoDuration
        const transitionThreeStart =
            TIMELINE.stateFour - TIMELINE.transitionThreeDuration

        let activeStage = -1

        const getStageFromTime = (time) => {
            if (time >= transitionThreeStart) return STATE_FOUR
            if (time >= transitionTwoStart) return STATE_THREE
            if (time >= transitionOneStart) return STATE_TWO
            return STATE_ONE
        }

        const applyStageTargeting = (stage) => {
            if (activeStage === stage) return

            activeStage = stage
            section.dataset.aboutStage = String(stage)

            STAGE_CLASS_NAMES.forEach((className, index) => {
                section.classList.toggle(className, index === stage)
            })
        }

        const clearStageTargeting = () => {
            activeStage = -1
            section.removeAttribute('data-about-stage')
            STAGE_CLASS_NAMES.forEach((className) => {
                section.classList.remove(className)
            })
        }

        const cloudElements = new Map()
        const quoteElements = new Map()
        const heroCloudEl = section.querySelector('.about-heroCloud')
        const heroCloudStageZeroPathEl = section.querySelector(
            HERO_CLOUD_STAGE_ZERO_SELECTOR,
        )
        const heroCloudStageOnePathEl = section.querySelector(
            HERO_CLOUD_STAGE_ONE_SELECTOR,
        )
        const heroCloudStageZeroD = heroCloudStageZeroPathEl?.getAttribute('d')
        const heroCloudStageOneD = heroCloudStageOnePathEl?.getAttribute('d')

        CLOUDS.forEach((cloud) => {
            const cloudEl = section.querySelector(`[data-cloud-id="${cloud.id}"]`)
            if (cloudEl) cloudElements.set(cloud.id, cloudEl)
        })

        QUOTES.forEach((quote) => {
            const quoteEl = section.querySelector(`[data-quote-id="${quote.id}"]`)
            if (quoteEl) quoteElements.set(quote.id, quoteEl)
        })

        const setCloudState = (stateIndex) => {
            CLOUDS.forEach((cloud) => {
                const cloudEl = cloudElements.get(cloud.id)
                const state = cloud.states[stateIndex]
                if (!cloudEl || !state) return

                gsap.set(cloudEl, {
                    x: toX(state.x),
                    y: toY(state.y),
                    width: toX(cloud.width),
                })
            })
        }

        const setQuoteState = (stateIndex) => {
            QUOTES.forEach((quote) => {
                const quoteEl = quoteElements.get(quote.id)
                const state = quote.states[stateIndex]
                if (!quoteEl || !state) return

                gsap.set(quoteEl, {
                    x: toX(state.x),
                    y: toY(state.y),
                    width: toX(quote.width),
                })
            })
        }

        const getHeroCloudContainerState = (stateIndex) =>
            stateIndex === STATE_ONE
                ? HERO_CLOUD_CONTAINER_STATES[STATE_ONE]
                : HERO_CLOUD_CONTAINER_STATES[STATE_TWO]

        const setHeroCloudContainerState = (stateIndex) => {
            const state = getHeroCloudContainerState(stateIndex)
            if (!heroCloudEl || !state) return

            gsap.set(heroCloudEl, {
                left: toX(state.x),
                top: toY(state.y),
                width: toX(state.width),
            })
        }

        const setHeroCloudState = (stateIndex) => {
            if (!heroCloudStageOneD) return

            if (heroCloudStageZeroPathEl && heroCloudStageZeroD) {
                gsap.set(heroCloudStageZeroPathEl, {
                    attr: {
                        d:
                            stateIndex === STATE_ONE
                                ? heroCloudStageZeroD
                                : heroCloudStageOneD,
                    },
                })
            }
        }

        const tweenCloudState = (timeline, stateIndex, position, duration) => {
            CLOUDS.forEach((cloud) => {
                const cloudEl = cloudElements.get(cloud.id)
                const state = cloud.states[stateIndex]
                if (!cloudEl || !state) return

                timeline.to(
                    cloudEl,
                    {
                        x: () => toX(state.x),
                        y: () => toY(state.y),
                        width: () => toX(cloud.width),
                        duration,
                    },
                    position,
                )
            })
        }

        const tweenHeroCloudState = (timeline, position, duration) => {
            if (!heroCloudStageOnePathEl || !heroCloudStageZeroPathEl) return

            timeline.to(
                heroCloudStageZeroPathEl,
                {
                    morphSVG: heroCloudStageOnePathEl,
                    duration,
                },
                position,
            )
        }

        const tweenHeroCloudContainerState = (
            timeline,
            stateIndex,
            position,
            duration,
        ) => {
            const state = getHeroCloudContainerState(stateIndex)
            if (!heroCloudEl || !state) return

            timeline.to(
                heroCloudEl,
                {
                    left: () => toX(state.x),
                    top: () => toY(state.y),
                    width: () => toX(state.width),
                    duration,
                },
                position,
            )
        }

        const tweenQuoteState = (timeline, stateIndex, position, duration) => {
            QUOTES.forEach((quote) => {
                const quoteEl = quoteElements.get(quote.id)
                const state = quote.states[stateIndex]
                if (!quoteEl || !state) return

                timeline.to(
                    quoteEl,
                    {
                        x: () => toX(state.x),
                        y: () => toY(state.y),
                        width: () => toX(quote.width),
                        duration,
                    },
                    position,
                )
            })
        }

        const outroCopyEl = section.querySelector('[data-outro-copy]')
        const mascotEl = section.querySelector('[data-outro-mascot]')
        const introCopyEl = section.querySelector('[data-intro-copy]')
        const scrollHintEl = section.querySelector('[data-scroll-hint]')
        const darkQuoteEls = section.querySelectorAll('[data-quote-layer="dark"]')
        const midQuoteEls = section.querySelectorAll('[data-quote-layer="mid"]')
        const lightQuoteEls = section.querySelectorAll('[data-quote-layer="light"]')
        const allQuoteEls = section.querySelectorAll('.about-quote')
        const introElements = [introCopyEl, scrollHintEl].filter(Boolean)

        const setOutroState = (index) => {
            const state = OUTRO_COPY.states[index]
            if (!outroCopyEl || !state) return
            gsap.set(outroCopyEl, {
                x: toX(state.x),
                y: toY(state.y),
                width: toX(OUTRO_COPY.width),
            })
        }

        const setMascotState = (index) => {
            const state = MASCOT.states[index]
            if (!mascotEl || !state) return

            gsap.set(mascotEl, {
                x: toX(state.x),
                y: toY(state.y),
                width: toX(MASCOT.width),
                autoAlpha: state.opacity,
                rotation: -11.89,
                transformOrigin: 'center bottom',
            })
        }

        setCloudState(STATE_ONE)
        setQuoteState(STATE_ONE)
        setHeroCloudContainerState(STATE_ONE)
        setHeroCloudState(STATE_ONE)
        setOutroState(STATE_ONE)
        setMascotState(STATE_ONE)
        applyStageTargeting(STATE_ONE)

        if (shouldReduce || window.innerWidth < 1024) {
            section.classList.add('about--static')
            gsap.set(introElements, { autoAlpha: 1 })
            gsap.set(allQuoteEls, { autoAlpha: 1 })
            gsap.set(outroCopyEl, { autoAlpha: 1 })
            gsap.set(mascotEl, { autoAlpha: 0 })
            return () => {
                section.classList.remove('about--static')
                clearStageTargeting()
            }
        }

        section.classList.remove('about--static')

        let ctx

        const initScrollAnimation = () => {
            if (ctx) return

            ctx = gsap.context(() => {
                const timelineEnd = TIMELINE.stateFour + TIMELINE.holdTail

                gsap.set(introElements, { autoAlpha: 1 })
                gsap.set(darkQuoteEls, { autoAlpha: 1 })
                gsap.set(midQuoteEls, { autoAlpha: 0 })
                gsap.set(lightQuoteEls, { autoAlpha: 0 })
                gsap.set(outroCopyEl, { autoAlpha: 0 })
                gsap.set(mascotEl, { autoAlpha: 0 })

                const timeline = gsap.timeline({
                    defaults: { ease: ABOUT_STAGE_EASE },
                    scrollTrigger: {
                        id: ABOUT_SCROLL_TRIGGER_ID,
                        trigger: section,
                        start: 'top top',
                        end: '+=420%',
                        scrub: true,
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                        onUpdate: (self) => {
                            applyStageTargeting(getStageFromTime(self.animation?.time?.() ?? 0))
                        },
                        onRefresh: (self) => {
                            applyStageTargeting(getStageFromTime(self.animation?.time?.() ?? 0))
                        },
                    },
                })

                const tweenOutroState = (stateIndex, position, duration) => {
                    const state = OUTRO_COPY.states[stateIndex]
                    if (!outroCopyEl || !state) return
                    timeline.to(
                        outroCopyEl,
                        {
                            x: () => toX(state.x),
                            y: () => toY(state.y),
                            width: () => toX(OUTRO_COPY.width),
                            duration,
                        },
                        position,
                    )
                }

                const tweenMascotState = (timeline, stateIndex, position, duration) => {
                    const state = MASCOT.states[stateIndex]
                    if (!mascotEl || !state) return
                    timeline.to(
                        mascotEl,
                        {
                            x: () => toX(state.x),
                            y: () => toY(state.y),
                            width: () => toX(MASCOT.width),
                            autoAlpha: state.opacity,
                            rotation: -11.89,
                            duration,
                        },
                        position,
                    )
                }

                timeline.addLabel('view-1', 0)

                timeline.to(
                    introElements,
                    { autoAlpha: 0, duration: TIMELINE.transitionOneDuration * 0.45 },
                    transitionOneStart + TIMELINE.transitionOneDuration * 0.2,
                )
                timeline.to(
                    midQuoteEls,
                    { autoAlpha: 1, duration: TIMELINE.transitionOneDuration * 0.45 },
                    transitionOneStart + TIMELINE.transitionOneDuration * 0.45,
                )
                tweenCloudState(
                    timeline,
                    STATE_TWO,
                    transitionOneStart,
                    TIMELINE.transitionOneDuration,
                )
                tweenHeroCloudState(
                    timeline,
                    transitionOneStart,
                    TIMELINE.transitionOneDuration,
                )
                tweenHeroCloudContainerState(
                    timeline,
                    STATE_TWO,
                    transitionOneStart,
                    TIMELINE.transitionOneDuration,
                )
                tweenQuoteState(
                    timeline,
                    STATE_TWO,
                    transitionOneStart,
                    TIMELINE.transitionOneDuration,
                )
                tweenOutroState(
                    STATE_TWO,
                    transitionOneStart,
                    TIMELINE.transitionOneDuration,
                )
                tweenMascotState(
                    timeline,
                    STATE_TWO,
                    transitionOneStart,
                    TIMELINE.transitionOneDuration,
                )
                timeline.addLabel('view-2', TIMELINE.stateTwo)

                timeline.to(
                    darkQuoteEls,
                    { autoAlpha: 0, duration: TIMELINE.transitionTwoDuration * 0.42 },
                    transitionTwoStart + TIMELINE.transitionTwoDuration * 0.08,
                )
                timeline.to(
                    lightQuoteEls,
                    { autoAlpha: 1, duration: TIMELINE.transitionTwoDuration * 0.42 },
                    transitionTwoStart + TIMELINE.transitionTwoDuration * 0.5,
                )
                tweenCloudState(
                    timeline,
                    STATE_THREE,
                    transitionTwoStart,
                    TIMELINE.transitionTwoDuration,
                )
                tweenQuoteState(
                    timeline,
                    STATE_THREE,
                    transitionTwoStart,
                    TIMELINE.transitionTwoDuration,
                )
                tweenOutroState(
                    STATE_THREE,
                    transitionTwoStart,
                    TIMELINE.transitionTwoDuration,
                )
                tweenMascotState(
                    timeline,
                    STATE_THREE,
                    transitionTwoStart,
                    TIMELINE.transitionTwoDuration,
                )
                timeline.addLabel('view-3', TIMELINE.stateThree)

                timeline.to(
                    midQuoteEls,
                    { autoAlpha: 0, duration: TIMELINE.transitionThreeDuration * 0.42 },
                    transitionThreeStart + TIMELINE.transitionThreeDuration * 0.1,
                )
                timeline.to(
                    outroCopyEl,
                    { autoAlpha: 1, duration: TIMELINE.transitionThreeDuration * 0.42 },
                    transitionThreeStart + TIMELINE.transitionThreeDuration * 0.54,
                )
                timeline.to(
                    mascotEl,
                    { autoAlpha: 1, duration: TIMELINE.transitionThreeDuration * 0.42 },
                    transitionThreeStart + TIMELINE.transitionThreeDuration * 0.56,
                )
                tweenCloudState(
                    timeline,
                    STATE_FOUR,
                    transitionThreeStart,
                    TIMELINE.transitionThreeDuration,
                )
                tweenQuoteState(
                    timeline,
                    STATE_FOUR,
                    transitionThreeStart,
                    TIMELINE.transitionThreeDuration,
                )
                tweenOutroState(
                    STATE_FOUR,
                    transitionThreeStart,
                    TIMELINE.transitionThreeDuration,
                )
                tweenMascotState(
                    timeline,
                    STATE_FOUR,
                    transitionThreeStart,
                    TIMELINE.transitionThreeDuration,
                )
                timeline.addLabel('view-4', TIMELINE.stateFour)
                timeline.to(
                    { hold: 0 },
                    { hold: 1, duration: TIMELINE.holdTail },
                    timelineEnd - TIMELINE.holdTail,
                )
                applyStageTargeting(getStageFromTime(timeline.time()))
            }, section)

            ScrollTrigger.refresh()
        }

        let transitionTimeoutId = 0
        let exitTransitionTimeoutId = 0
        let introStartFrameId = 0
        let introActivateFrameId = 0
        let isDisposed = false
        let isExiting = false
        let hasStartedScrollAnimation = false
        let exitCallbacks = []

        const cleanupIntroClasses = () => {
            if (!sceneEl) return
            sceneEl.classList.remove(INTRO_ACTIVE_CLASS_NAME)
            sceneEl.classList.remove(INTRO_CLASS_NAME)
        }

        const cleanupOutroClasses = () => {
            if (!sceneEl) return
            sceneEl.classList.remove(OUTRO_CLASS_NAME)
        }

        const ensureScrollAnimation = () => {
            if (isDisposed || isExiting || hasStartedScrollAnimation) return
            hasStartedScrollAnimation = true
            initScrollAnimation()
        }

        const startScrollAnimation = () => {
            if (isDisposed || isExiting) return
            cleanupIntroClasses()
            ensureScrollAnimation()
        }

        const removeTransitionListener =
            sceneEl &&
            ((event) => {
                if (event.target !== sceneEl || event.propertyName !== 'transform') {
                    return
                }
                sceneEl.removeEventListener('transitionend', removeTransitionListener)
                window.clearTimeout(transitionTimeoutId)
                startScrollAnimation()
            })

        const finishExitTransition = () => {
            if (!isExiting) return

            isExiting = false
            window.clearTimeout(exitTransitionTimeoutId)
            if (sceneEl) {
                sceneEl.removeEventListener('transitionend', handleExitTransitionEnd)
            }

            const queuedCallbacks = exitCallbacks
            exitCallbacks = []
            queuedCallbacks.forEach((callback) => {
                callback()
            })
        }

        function handleExitTransitionEnd(event) {
            if (event.target !== sceneEl || event.propertyName !== 'transform') {
                return
            }

            finishExitTransition()
        }

        const runExitTransition = (onComplete) => {
            if (typeof onComplete === 'function') {
                exitCallbacks.push(onComplete)
            }

            if (
                !sceneEl ||
                shouldReduce ||
                window.innerWidth < 1024 ||
                isDisposed
            ) {
                const queuedCallbacks = exitCallbacks
                exitCallbacks = []
                queuedCallbacks.forEach((callback) => {
                    callback()
                })
                return
            }

            if (isExiting) return

            isExiting = true
            window.cancelAnimationFrame(introStartFrameId)
            window.cancelAnimationFrame(introActivateFrameId)
            window.clearTimeout(transitionTimeoutId)
            if (removeTransitionListener) {
                sceneEl.removeEventListener('transitionend', removeTransitionListener)
            }

            cleanupIntroClasses()
            cleanupOutroClasses()
            void sceneEl.offsetHeight

            sceneEl.addEventListener('transitionend', handleExitTransitionEnd)
            sceneEl.classList.add(OUTRO_CLASS_NAME)

            exitTransitionTimeoutId = window.setTimeout(
                finishExitTransition,
                INTRO_TRANSITION_FALLBACK_MS,
            )
        }

        exitTransitionRef.current = runExitTransition

        if (!sceneEl) {
            startScrollAnimation()
        } else {
            ensureScrollAnimation()
            cleanupIntroClasses()
            cleanupOutroClasses()
            sceneEl.classList.add(INTRO_CLASS_NAME)

            introStartFrameId = window.requestAnimationFrame(() => {
                introActivateFrameId = window.requestAnimationFrame(() => {
                    if (isDisposed) return

                    if (removeTransitionListener) {
                        sceneEl.addEventListener('transitionend', removeTransitionListener)
                    }

                    sceneEl.classList.add(INTRO_ACTIVE_CLASS_NAME)

                    transitionTimeoutId = window.setTimeout(() => {
                        if (removeTransitionListener) {
                            sceneEl.removeEventListener('transitionend', removeTransitionListener)
                        }
                        startScrollAnimation()
                    }, INTRO_TRANSITION_FALLBACK_MS)
                })
            })
        }

        return () => {
            isDisposed = true
            window.cancelAnimationFrame(introStartFrameId)
            window.cancelAnimationFrame(introActivateFrameId)
            window.clearTimeout(transitionTimeoutId)
            window.clearTimeout(exitTransitionTimeoutId)
            if (sceneEl && removeTransitionListener) {
                sceneEl.removeEventListener('transitionend', removeTransitionListener)
            }
            if (sceneEl) {
                sceneEl.removeEventListener('transitionend', handleExitTransitionEnd)
            }
            cleanupIntroClasses()
            cleanupOutroClasses()
            exitTransitionRef.current = null
            ctx?.revert()
            clearStageTargeting()
        }
    }, [])

    const handleScrollHintClick = () => {
        const trigger = ScrollTrigger.getById(ABOUT_SCROLL_TRIGGER_ID)
        if (trigger) {
            const labelScrollY = trigger.labelToScroll?.(STAGE_ONE_SCROLL_LABEL)
            const fallbackScrollY =
                trigger.start +
                (trigger.end - trigger.start) * STAGE_ONE_SCROLL_PROGRESS
            const targetY =
                typeof labelScrollY === 'number' ? labelScrollY : fallbackScrollY
            window.scrollTo({ top: Math.round(targetY), behavior: 'smooth' })
            return
        }

        const section = sectionRef.current
        if (!section) return
        const sectionTop = section.getBoundingClientRect().top + window.scrollY
        const targetY =
            sectionTop +
            window.innerHeight *
            SCROLL_DISTANCE_VIEWPORT_MULTIPLIER *
            STAGE_ONE_SCROLL_PROGRESS
        window.scrollTo({ top: Math.round(targetY), behavior: 'smooth' })
    }

    return {
        sectionRef,
        handleScrollHintClick,
    }
}

export default useAboutAnimation
