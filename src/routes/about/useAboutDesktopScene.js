import { useCallback, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import MorphSVGPlugin from 'gsap/MorphSVGPlugin'
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

const DESKTOP_SCENE_QUERY =
  '(max-width: 767px), (prefers-reduced-motion: reduce)'
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

const buildStateProps = ({ state, toX, toY, toWidth, width }) => ({
  x: toX(state.x),
  y: toY(state.y),
  width: toWidth(state.width ?? width),
  ...(typeof state.opacity === 'number' ? { opacity: state.opacity } : {}),
})

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

const useAboutDesktopScene = () => {
  const scrollerRef = useRef(null)
  const sceneRef = useRef(null)

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

    const mediaQuery =
      typeof window.matchMedia === 'function'
        ? window.matchMedia(DESKTOP_SCENE_QUERY)
        : { matches: false }

    if (mediaQuery.matches) return undefined

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
      toX,
      toY,
      toWidth,
    }) => {
      const element = scene.querySelector(selector)

      if (!element) return

      gsap.set(
        element,
        buildStateProps({
          state: states[0],
          toX,
          toY,
          toWidth,
          width,
        }),
      )

      states.slice(1).forEach((state, index) => {
        timeline.to(
          element,
          buildStateProps({
            state,
            toX,
            toY,
            toWidth,
            width,
          }),
          index,
        )
      })
    }

    const buildTimeline = () => {
      timeline?.kill()

      const sceneWidth = scene.clientWidth || ABOUT_DESIGN_FRAME.width
      const sceneHeight = scene.clientHeight || ABOUT_DESIGN_FRAME.height
      const toX = (value) => (value / ABOUT_DESIGN_FRAME.width) * sceneWidth
      const toY = (value) => (value / ABOUT_DESIGN_FRAME.height) * sceneHeight
      const toWidth = (value) => (value / ABOUT_DESIGN_FRAME.width) * sceneWidth

      timeline = gsap.timeline({
        paused: true,
        defaults: { duration: 1, ease: 'none' },
      })

      configureTweenTarget({
        selector: '[data-about-hero]',
        states: ABOUT_HERO_CLOUD.states,
        width: ABOUT_HERO_CLOUD.states[0].width,
        toX,
        toY,
        toWidth,
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
          toX,
          toY,
          toWidth,
        })
      })

      ABOUT_DESKTOP_FILLS.forEach((fill) => {
        configureTweenTarget({
          selector: `[data-about-fill="${fill.id}"]`,
          states: fill.states,
          width: fill.width,
          toX,
          toY,
          toWidth,
        })
      })

      ABOUT_DESKTOP_QUOTE_LAYOUTS.forEach((quote) => {
        configureTweenTarget({
          selector: `[data-about-quote="${quote.id}"]`,
          states: quote.states,
          width: quote.width,
          toX,
          toY,
          toWidth,
        })
      })

      configureTweenTarget({
        selector: '[data-about-mascot]',
        states: ABOUT_MASCOT.states,
        width: ABOUT_MASCOT.width,
        toX,
        toY,
        toWidth,
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

      timeline.progress(progress)
      syncHeroViewBox(heroSvg, progress)
      scene.dataset.aboutFinalStage =
        progress >= ABOUT_FINAL_STAGE_START_PROGRESS ? 'true' : 'false'
    }

    const requestSync = () => {
      if (animationFrameId) return

      animationFrameId = requestAnimationFrame(syncTimelineToScroll)
    }

    const handleResize = () => {
      if (mediaQuery.matches) return
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
  }
}

export default useAboutDesktopScene
