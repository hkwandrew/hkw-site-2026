import { describe, expect, it, vi } from 'vitest'
import {
  VIEWPORT_LAYOUT,
  getSceneViewportKeyForLayout,
  getViewportComposition,
} from '@/app/layout/viewportComposition'

const createWindowStub = ({
  height,
  hover = 'hover',
  pointer = 'fine',
  width,
}) => ({
  innerHeight: height,
  innerWidth: width,
  matchMedia: vi.fn((query) => ({
    matches:
      query === `(pointer: ${pointer})` || query === `(hover: ${hover})`,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })),
})

describe('viewport composition', () => {
  it.each([
    [375, 667, VIEWPORT_LAYOUT.PHONE_PORTRAIT],
    [667, 375, VIEWPORT_LAYOUT.PHONE_LANDSCAPE],
    [767, 1024, VIEWPORT_LAYOUT.PHONE_PORTRAIT],
    [768, 1024, VIEWPORT_LAYOUT.TABLET],
    [1366, 768, VIEWPORT_LAYOUT.SHORT_DESKTOP],
    [1440, 1024, VIEWPORT_LAYOUT.BASE],
  ])('classifies %sx%s as %s', (width, height, layout) => {
    expect(getViewportComposition(createWindowStub({ height, width }))).toEqual(
      expect.objectContaining({
        height,
        layout,
        sceneViewportKey: getSceneViewportKeyForLayout(layout),
        width,
      }),
    )
  })

  it('keeps pointer and hover as independent traits', () => {
    const composition = getViewportComposition(
      createWindowStub({
        height: 375,
        hover: 'none',
        pointer: 'coarse',
        width: 667,
      }),
    )

    expect(composition).toEqual(
      expect.objectContaining({
        hover: 'none',
        layout: VIEWPORT_LAYOUT.PHONE_LANDSCAPE,
        pointer: 'coarse',
      }),
    )
  })
})
