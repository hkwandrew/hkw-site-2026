import { beforeEach, describe, expect, it, vi } from 'vitest'

const START_SHAPE = 'M0,0 C10,0 10,10 0,10 z'
const END_SHAPE = 'M5,0 C15,0 15,10 5,10 z'

const gsapMocks = vi.hoisted(() => {
  const tween = {
    kill: vi.fn(),
    reversed: vi.fn(() => tween),
    resume: vi.fn(() => tween),
  }

  return {
    set: vi.fn(),
    to: vi.fn(() => tween),
    fromTo: vi.fn(),
    killTweensOf: vi.fn(),
    utils: {
      toArray: vi.fn((selector) => Array.from(document.querySelectorAll(selector))),
    },
  }
})

const morphMocks = vi.hoisted(() => ({
  stringToRawPath: vi.fn((shape) =>
    shape === START_SHAPE
      ? [[0, 1, 2, 3, 4, 5, 6, 7]]
      : [[10, 11, 12, 13, 14, 15, 16, 17]],
  ),
  equalizeSegmentQuantity: vi.fn((_start, _end, shapeIndex) =>
    shapeIndex === 'auto' ? [4.4] : [shapeIndex],
  ),
  convertToPath: vi.fn((target) => [target]),
}))

vi.mock('gsap', () => ({
  default: gsapMocks,
}))

vi.mock('gsap/MorphSVGPlugin', () => ({
  default: morphMocks,
}))

import findShapeIndex from '@/routes/about/findShapeIndex'

describe('findShapeIndex', () => {
  beforeEach(() => {
    document.body.innerHTML = `<svg><path id="shape" d="${START_SHAPE}"></path></svg>`
    gsapMocks.set.mockClear()
    gsapMocks.to.mockClear()
    gsapMocks.fromTo.mockClear()
    gsapMocks.killTweensOf.mockClear()
    morphMocks.stringToRawPath.mockClear()
    morphMocks.equalizeSegmentQuantity.mockClear()
    morphMocks.convertToPath.mockClear()
  })

  it('uses MorphSVGPlugin.stringToRawPath and equalizeSegmentQuantity to build the debugger tween', () => {
    const target = document.getElementById('shape')
    const cleanup = findShapeIndex(target, END_SHAPE, { duration: 1.8 })

    expect(morphMocks.stringToRawPath).toHaveBeenCalledWith(START_SHAPE)
    expect(morphMocks.stringToRawPath).toHaveBeenCalledWith(END_SHAPE)
    expect(morphMocks.equalizeSegmentQuantity).toHaveBeenCalledWith(
      expect.any(Array),
      expect.any(Array),
      'auto',
    )
    expect(gsapMocks.to).toHaveBeenCalledWith(
      target,
      expect.objectContaining({
        duration: 1.8,
        morphSVG: expect.objectContaining({
          shape: END_SHAPE,
          shapeIndex: 4,
        }),
      }),
    )
    expect(document.getElementById('about-shape-index-debugger')).not.toBeNull()

    cleanup()

    expect(document.getElementById('about-shape-index-debugger')).toBeNull()
  })

  it('allows decrementing from 0 to -1', () => {
    morphMocks.equalizeSegmentQuantity.mockImplementationOnce(() => [0])

    const target = document.getElementById('shape')
    const cleanup = findShapeIndex(target, END_SHAPE)
    const decrementButton = document.querySelector(
      '#about-shape-index-debugger button',
    )

    decrementButton.click()

    const morphCall = gsapMocks.to.mock.calls.findLast(
      ([callTarget, vars]) => callTarget === target && vars?.morphSVG,
    )

    expect(morphCall).toBeDefined()
    expect(morphCall[1].morphSVG.shapeIndex).toBe(-1)
    expect(
      document.querySelector('[data-about-shape-index-label]').textContent,
    ).toContain('shapeIndex: -1')

    cleanup()
  })
})
