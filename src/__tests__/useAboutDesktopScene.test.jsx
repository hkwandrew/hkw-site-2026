import { fireEvent, render, screen } from '@/__tests__/testUtils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ABOUT_HERO_CLOUD } from '@/routes/about/aboutSceneData'

const originalRequestAnimationFrame = window.requestAnimationFrame
const originalCancelAnimationFrame = window.cancelAnimationFrame

const gsapMocks = vi.hoisted(() => {
  const timelineInstance = {
    to: vi.fn(),
    kill: vi.fn(),
    progress: vi.fn(),
  }

  timelineInstance.to.mockImplementation(() => timelineInstance)

  return {
    registerPlugin: vi.fn(),
    set: vi.fn(),
    timeline: vi.fn(() => timelineInstance),
    timelineInstance,
    findShapeIndex: vi.fn(() => vi.fn()),
  }
})

vi.mock('gsap', () => ({
  default: {
    registerPlugin: gsapMocks.registerPlugin,
    set: gsapMocks.set,
    timeline: gsapMocks.timeline,
  },
}))

vi.mock('gsap/MorphSVGPlugin', () => ({
  default: {
    name: 'MorphSVGPlugin',
  },
}))

vi.mock('@/routes/about/findShapeIndex', () => ({
  default: gsapMocks.findShapeIndex,
}))

import AboutPage from '@/routes/about/AboutPage'

const getAutoAlphaTimelineValues = (element) =>
  gsapMocks.timelineInstance.to.mock.calls
    .filter(([target, props]) => {
      if (props?.autoAlpha === undefined) return false

      if (target === element) return true

      if (typeof target?.length === 'number') {
        return Array.from(target).includes(element)
      }

      return false
    })
    .map(([, props]) => props.autoAlpha)

describe('useAboutDesktopScene', () => {
  beforeEach(() => {
    gsapMocks.set.mockClear()
    gsapMocks.timeline.mockClear()
    gsapMocks.timelineInstance.to.mockClear()
    gsapMocks.timelineInstance.kill.mockClear()
    gsapMocks.timelineInstance.progress.mockClear()
    gsapMocks.findShapeIndex.mockClear()

    window.matchMedia = vi.fn().mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })
    window.requestAnimationFrame = vi.fn((callback) => {
      callback()
      return 0
    })
    window.cancelAnimationFrame = vi.fn()
    window.history.replaceState({}, '', '?')

    globalThis.ResizeObserver = class {
      observe() {}
      disconnect() {}
    }
  })

  afterEach(() => {
    window.requestAnimationFrame = originalRequestAnimationFrame
    window.cancelAnimationFrame = originalCancelAnimationFrame
  })

  it('morphs the desktop hero path using the authored shoulder-aligned target', () => {
    const { container } = render(<AboutPage />)

    const heroPath = container.querySelector('[data-about-hero-path="desktop"]')
    const morphCall = gsapMocks.timelineInstance.to.mock.calls.find(
      ([target, props, position]) =>
        target === heroPath &&
        props?.morphSVG?.shape === ABOUT_HERO_CLOUD.paths.stageOne &&
        position === 0,
    )

    expect(heroPath).not.toBeNull()
    expect(heroPath).toHaveAttribute('d', ABOUT_HERO_CLOUD.paths.stageZero)
    expect(morphCall).toBeDefined()
    expect(morphCall[1].morphSVG.precompile).toBeUndefined()
    expect(morphCall[1].morphSVG.shapeIndex).toBe(1)
    expect(morphCall[1].morphSVG.map).toBe('complexity')
    expect(gsapMocks.findShapeIndex).not.toHaveBeenCalled()
  })

  it('launches the stand-alone findShapeIndex helper when requested by query param', () => {
    window.history.replaceState({}, '', '?aboutShapeIndexDebug=1')

    const { container } = render(<AboutPage />)
    const heroPath = container.querySelector('[data-about-hero-path="desktop"]')
    const morphCall = gsapMocks.timelineInstance.to.mock.calls.find(
      ([target, props]) =>
        target === heroPath &&
        props?.morphSVG?.shape === ABOUT_HERO_CLOUD.paths.stageOne,
    )

    expect(heroPath).not.toBeNull()
    expect(gsapMocks.findShapeIndex).toHaveBeenCalledWith(
      heroPath,
      ABOUT_HERO_CLOUD.paths.stageOne,
      expect.objectContaining({
        duration: 1.8,
      }),
    )
    expect(morphCall).toBeUndefined()
    expect(window.findShapeIndex).toBe(gsapMocks.findShapeIndex)
  })

  it('scrubs the desktop hero viewBox as scroll progress advances through the first stage', () => {
    const { container } = render(<AboutPage />)
    const scroller = screen.getByTestId('about-desktop-scroller')
    const heroSvg = container.querySelector('[data-about-hero] svg')
    const parseViewBox = (viewBox) => viewBox.split(' ').map(Number)

    expect(heroSvg).not.toBeNull()
    expect(heroSvg).toHaveAttribute(
      'viewBox',
      ABOUT_HERO_CLOUD.viewBoxes.stageZero,
    )

    Object.defineProperty(scroller, 'scrollHeight', {
      configurable: true,
      value: 900,
    })
    Object.defineProperty(scroller, 'clientHeight', {
      configurable: true,
      value: 600,
    })
    Object.defineProperty(scroller, 'scrollTop', {
      configurable: true,
      writable: true,
      value: 45,
    })

    fireEvent.scroll(scroller)

    const midScrubViewBox = parseViewBox(heroSvg.getAttribute('viewBox'))
    const stageZeroViewBox = parseViewBox(ABOUT_HERO_CLOUD.viewBoxes.stageZero)
    const stageOneViewBox = parseViewBox(ABOUT_HERO_CLOUD.viewBoxes.stageOne)

    expect(midScrubViewBox[2]).toBeLessThan(stageZeroViewBox[2])
    expect(midScrubViewBox[2]).toBeGreaterThan(stageOneViewBox[2])
    expect(midScrubViewBox[3]).toBeLessThan(stageZeroViewBox[3])
    expect(midScrubViewBox[3]).toBeGreaterThan(stageOneViewBox[3])

    scroller.scrollTop = 0

    fireEvent.scroll(scroller)

    expect(heroSvg).toHaveAttribute(
      'viewBox',
      ABOUT_HERO_CLOUD.viewBoxes.stageZero,
    )

    scroller.scrollTop = 120

    fireEvent.scroll(scroller)

    expect(heroSvg).toHaveAttribute(
      'viewBox',
      ABOUT_HERO_CLOUD.viewBoxes.stageOne,
    )
  })

  it('hides the hero cloud from stageTwo onward while keeping the later cloud layers visible', () => {
    const { container } = render(<AboutPage />)

    const heroCloud = container.querySelector('[data-about-hero]')
    const darkQuote = container.querySelector('[data-about-quote="jonathan"]')
    const midQuote = container.querySelector('[data-about-quote="kevin"]')
    const darkCloud = container.querySelector('[data-about-cloud="dark-left"]')

    expect(heroCloud).not.toBeNull()
    expect(darkQuote).not.toBeNull()
    expect(midQuote).not.toBeNull()
    expect(darkCloud).not.toBeNull()

    expect(getAutoAlphaTimelineValues(heroCloud)).toEqual([1, 0, 0])
    expect(getAutoAlphaTimelineValues(darkQuote)).toEqual([1, 0, 0])
    expect(getAutoAlphaTimelineValues(midQuote)).toEqual([1, 1, 0])
    expect(getAutoAlphaTimelineValues(darkCloud)).toEqual([1, 1, 1])
  })

  it('toggles the final-stage float state only during the last desktop scroll stage', () => {
    const { container } = render(<AboutPage />)

    const scroller = screen.getByTestId('about-desktop-scroller')
    const scene = container.querySelector('[data-about-scene]')
    const cloudFloat = container.querySelector(
      '[data-about-cloud="light-center"] [data-about-float-layer="cloud"]',
    )
    const mascotFloat = container.querySelector(
      '[data-about-mascot] [data-about-float-layer="mascot"]',
    )

    expect(scene).not.toBeNull()
    expect(cloudFloat).not.toBeNull()
    expect(mascotFloat).not.toBeNull()

    Object.defineProperty(scroller, 'scrollHeight', {
      configurable: true,
      value: 900,
    })
    Object.defineProperty(scroller, 'clientHeight', {
      configurable: true,
      value: 600,
    })
    Object.defineProperty(scroller, 'scrollTop', {
      configurable: true,
      writable: true,
      value: 150,
    })

    fireEvent.scroll(scroller)

    expect(scene).toHaveAttribute('data-about-final-stage', 'false')

    scroller.scrollTop = 240

    fireEvent.scroll(scroller)

    expect(scene).toHaveAttribute('data-about-final-stage', 'true')
  })
})
