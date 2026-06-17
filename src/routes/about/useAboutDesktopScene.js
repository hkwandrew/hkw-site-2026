import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import MorphSVGPlugin from 'gsap/MorphSVGPlugin'
import { MEDIA_QUERIES } from '@/styles/breakpoints'
import {
  ABOUT_DESIGN_FRAME,
  ABOUT_DESKTOP_CLOUDS,
  ABOUT_DESKTOP_FILLS,
  ABOUT_DESKTOP_QUOTE_LAYOUTS,
  ABOUT_FRAME_VISIBILITY,
  ABOUT_HERO_CLOUD,
  ABOUT_MASCOT,
  ABOUT_QUOTE_FRAME_VISIBILITY,
} from './aboutSceneData'
import findShapeIndex from './findShapeIndex'

gsap.registerPlugin(MorphSVGPlugin)

const MOBILE_PORTRAIT_SCENE_QUERY = MEDIA_QUERIES.mobilePortrait
const REDUCED_MOTION_SCENE_QUERY = '(prefers-reduced-motion: reduce)'
const ABOUT_SHAPE_INDEX_DEBUG_PARAM = 'aboutShapeIndexDebug'
const HERO_STAGE_ONE_PROGRESS = 1 / (ABOUT_HERO_CLOUD.states.length - 1)
const ABOUT_FINAL_STAGE_START_PROGRESS =
  (ABOUT_FRAME_VISIBILITY.length - 2) / (ABOUT_FRAME_VISIBILITY.length - 1)
const HERO_STAGE_ZERO_VIEWBOX = ABOUT_HERO_CLOUD.viewBoxes.stageZero
  .split(' ')
  .map(Number)
const HERO_STAGE_ONE_VIEWBOX = ABOUT_HERO_CLOUD.viewBoxes.stageOne
  .split(' ')
  .map(Number)

const getFittedSceneGeometry = (sceneWidth, sceneHeight) => {
  const viewportScale = sceneWidth / ABOUT_DESIGN_FRAME.width
  const fittedWidth = Math.min(
    sceneWidth,
    (sceneHeight * ABOUT_DESIGN_FRAME.width) / ABOUT_DESIGN_FRAME.height,
  )
  const aspectScale = fittedWidth / sceneWidth

  return {
    offsetX: Math.max((sceneWidth - fittedWidth) / 2, 0),
    aspectScale,
    viewportScale,
  }
}

const createViewportStateConverter = (sceneWidth, sceneHeight) => {
  const { aspectScale, offsetX, viewportScale } = getFittedSceneGeometry(
    sceneWidth,
    sceneHeight,
  )
  const convertViewportPx = (value) => value * viewportScale
  const convertContentPx = (value) => convertViewportPx(value) * aspectScale

  return {
    contentProps: (state, fallbackWidth) => ({
      x: offsetX + convertContentPx(state.x),
      y: convertContentPx(state.y),
      width: convertContentPx(state.width ?? fallbackWidth),
      ...(typeof state.opacity === 'number' ? { opacity: state.opacity } : {}),
    }),
    viewportBandProps: (state, fallbackWidth) => ({
      x: convertViewportPx(state.x),
      y: convertContentPx(state.y),
      width: convertViewportPx(state.width ?? fallbackWidth),
      ...(typeof state.opacity === 'number' ? { opacity: state.opacity } : {}),
    }),
  }
}

const clampProgress = (value) => Math.min(Math.max(value, 0), 1)

const formatViewBoxValue = (value) => {
  const rounded = Math.round(value * 1000) / 1000

  return Number(rounded).toString()
}

const buildHeroViewBox = (progress) => {
  const scrubProgress = clampProgress(progress / HERO_STAGE_ONE_PROGRESS)

  return HERO_STAGE_ZERO_VIEWBOX.map((value, index) => {
    const nextValue = HERO_STAGE_ONE_VIEWBOX[index]

    return formatViewBoxValue(value + (nextValue - value) * scrubProgress)
  }).join(' ')
}

const syncHeroViewBox = (heroSvg, progress) => {
  if (!heroSvg) return

  heroSvg.setAttribute('viewBox', buildHeroViewBox(progress))
}

const getSceneMediaQuery = (query) =>
  typeof window.matchMedia === 'function'
    ? window.matchMedia(query)
    : { matches: false }

const useAboutDesktopScene = () => {
  const scrollerRef = useRef(null)
  const sceneRef = useRef(null)
  const [isFinalStageActive, setIsFinalStageActive] = useState(false)

  const handleScrollHintClick = useCallback(() => {
    const scroller = scrollerRef.current

    if (!scroller) return

    const maxScroll = scroller.scrollHeight - scroller.clientHeight
    const firstTransitionScrollTop = maxScroll * HERO_STAGE_ONE_PROGRESS

    scroller.scrollTo({
      top: firstTransitionScrollTop,
      behavior: 'smooth',
    })
  }, [])

  useLayoutEffect(() => {
    const scroller = scrollerRef.current
    const scene = sceneRef.current

    if (!scroller || !scene) return undefined

    const mobilePortraitQuery = getSceneMediaQuery(MOBILE_PORTRAIT_SCENE_QUERY)
    const reducedMotionQuery = getSceneMediaQuery(REDUCED_MOTION_SCENE_QUERY)
    const shouldSkipDesktopScene = () =>
      reducedMotionQuery.matches || mobilePortraitQuery.matches

    if (shouldSkipDesktopScene()) return undefined

    let animationFrameId = 0
    let timeline = null
    let resizeObserver = null
    let cleanupFindShapeIndex = null
    let heroSvg = null
    const shouldDebugShapeIndex =
      typeof window !== 'undefined' &&
      new URLSearchParams(window.location.search).has(
        ABOUT_SHAPE_INDEX_DEBUG_PARAM,
      )

    if (typeof window !== 'undefined') {
      window.findShapeIndex = findShapeIndex
    }

    const configureTweenTarget = ({
      selector,
      states,
      width,
      getStateProps,
    }) => {
      const element = scene.querySelector(selector)

      if (!element) return

      gsap.set(element, getStateProps(states[0], width))

      states.slice(1).forEach((state, index) => {
        timeline.to(element, getStateProps(state, width), index)
      })
    }

    const buildTimeline = () => {
      timeline?.kill()

      const sceneWidth = scene.clientWidth || ABOUT_DESIGN_FRAME.width
      const sceneHeight = scene.clientHeight || ABOUT_DESIGN_FRAME.height
      const viewportConverter = createViewportStateConverter(
        sceneWidth,
        sceneHeight,
      )
      const getContentStateProps = viewportConverter.contentProps
      const getViewportBandStateProps = viewportConverter.viewportBandProps

      timeline = gsap.timeline({
        paused: true,
        defaults: { duration: 1, ease: 'none' },
      })

      configureTweenTarget({
        selector: '[data-about-hero]',
        states: ABOUT_HERO_CLOUD.states,
        width: ABOUT_HERO_CLOUD.states[0].width,
        getStateProps: getContentStateProps,
      })

      const heroPath = scene.querySelector('[data-about-hero-path="desktop"]')

      if (heroPath) {
        heroSvg = heroPath.closest('svg')
        heroPath.setAttribute('d', ABOUT_HERO_CLOUD.paths.stageZero)
        syncHeroViewBox(heroSvg, 0)

        if (!shouldDebugShapeIndex) {
          timeline.to(
            heroPath,
            {
              morphSVG: {
                shape: ABOUT_HERO_CLOUD.paths.stageOne,
                shapeIndex: 1,
                map: 'position',
              },
            },
            0,
          )
        }
      }

      ABOUT_DESKTOP_CLOUDS.forEach((cloud) => {
        configureTweenTarget({
          selector: `[data-about-cloud="${cloud.id}"]`,
          states: cloud.states,
          width: cloud.width,
          getStateProps: getContentStateProps,
        })
      })

      ABOUT_DESKTOP_FILLS.forEach((fill) => {
        configureTweenTarget({
          selector: `[data-about-fill="${fill.id}"]`,
          states: fill.states,
          width: fill.width,
          getStateProps: getViewportBandStateProps,
        })
      })

      ABOUT_DESKTOP_QUOTE_LAYOUTS.forEach((quote) => {
        configureTweenTarget({
          selector: `[data-about-quote="${quote.id}"]`,
          states: quote.states,
          width: quote.width,
          getStateProps: getContentStateProps,
        })
      })

      configureTweenTarget({
        selector: '[data-about-mascot]',
        states: ABOUT_MASCOT.states,
        width: ABOUT_MASCOT.width,
        getStateProps: getContentStateProps,
      })

      Object.keys(ABOUT_FRAME_VISIBILITY[0]).forEach((layer) => {
        const elements = scene.querySelectorAll(
          `[data-about-layer="${layer}"]:not([data-about-quote])`,
        )

        if (!elements.length) return

        gsap.set(elements, { autoAlpha: ABOUT_FRAME_VISIBILITY[0][layer] })

        ABOUT_FRAME_VISIBILITY.slice(1).forEach((frame, index) => {
          timeline.to(elements, { autoAlpha: frame[layer] }, index)
        })
      })

      Object.keys(ABOUT_QUOTE_FRAME_VISIBILITY[0]).forEach((layer) => {
        const elements = scene.querySelectorAll(
          `[data-about-quote][data-about-layer="${layer}"]`,
        )

        if (!elements.length) return

        gsap.set(elements, { autoAlpha: ABOUT_QUOTE_FRAME_VISIBILITY[0][layer] })

        ABOUT_QUOTE_FRAME_VISIBILITY.slice(1).forEach((frame, index) => {
          timeline.to(elements, { autoAlpha: frame[layer] }, index)
        })
      })
    }

    const syncTimelineToScroll = () => {
      animationFrameId = 0

      if (!timeline) return

      const maxScroll = scroller.scrollHeight - scroller.clientHeight
      const progress =
        maxScroll > 0
          ? Math.min(Math.max(scroller.scrollTop / maxScroll, 0), 1)
          : 0
      const nextIsFinalStageActive =
        progress >= ABOUT_FINAL_STAGE_START_PROGRESS

      timeline.progress(progress)
      syncHeroViewBox(heroSvg, progress)
      scene.dataset.aboutFinalStage = nextIsFinalStageActive ? 'true' : 'false'
      setIsFinalStageActive((currentValue) =>
        currentValue === nextIsFinalStageActive
          ? currentValue
          : nextIsFinalStageActive,
      )
    }

    const requestSync = () => {
      if (animationFrameId) return

      animationFrameId = requestAnimationFrame(syncTimelineToScroll)
    }

    const handleResize = () => {
      if (shouldSkipDesktopScene()) return
      buildTimeline()
      requestSync()
    }

    buildTimeline()
    scene.dataset.aboutFinalStage = 'false'
    requestSync()

    if (shouldDebugShapeIndex) {
      const heroPath = scene.querySelector('[data-about-hero-path="desktop"]')

      if (heroPath) {
        cleanupFindShapeIndex = findShapeIndex(
          heroPath,
          ABOUT_HERO_CLOUD.paths.stageOne,
          {
            duration: 1.8,
          },
        )
      }
    }

    scroller.addEventListener('scroll', requestSync, { passive: true })
    window.addEventListener('resize', handleResize)

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        buildTimeline()
        requestSync()
      })

      resizeObserver.observe(scene)
      resizeObserver.observe(scroller)
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }

      scroller.removeEventListener('scroll', requestSync)
      window.removeEventListener('resize', handleResize)
      resizeObserver?.disconnect()
      timeline?.kill()
      cleanupFindShapeIndex?.()
      delete scene.dataset.aboutFinalStage
    }
  }, [])

  return {
    scrollerRef,
    sceneRef,
    handleScrollHintClick,
    isFinalStageActive,
  }
}

export default useAboutDesktopScene
