import { render } from '@/__tests__/testUtils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const gsapMocks = vi.hoisted(() => {
  return {
    matchMedia: vi.fn(),
    matchMediaAdd: vi.fn(),
    matchMediaRevert: vi.fn(),
    registerPlugin: vi.fn(),
    to: vi.fn(() => ({
      kill: vi.fn(),
    })),
  }
})

vi.mock('gsap', () => ({
  default: {
    matchMedia: gsapMocks.matchMedia,
    registerPlugin: gsapMocks.registerPlugin,
    to: gsapMocks.to,
  },
}))

vi.mock('@gsap/react', async () => {
  const React = await vi.importActual('react')

  return {
    useGSAP: (callback) => {
      React.useLayoutEffect(() => callback(), [callback])
    },
  }
})

import Plane from '@/routes/home/Plane'

describe('Plane', () => {
  beforeEach(() => {
    gsapMocks.to.mockClear()
    gsapMocks.matchMedia.mockReset()
    gsapMocks.matchMediaAdd.mockReset()
    gsapMocks.matchMediaRevert.mockReset()
    gsapMocks.registerPlugin.mockClear()

    gsapMocks.matchMedia.mockReturnValue({
      add: gsapMocks.matchMediaAdd,
      revert: gsapMocks.matchMediaRevert,
    })
  })

  it('wires a banner wave tween when motion is allowed', () => {
    gsapMocks.matchMediaAdd.mockImplementation((_conditions, callback) => {
      callback({
        conditions: {
          isMobile: false,
          motionOk: true,
        },
      })
    })

    const { container } = render(<Plane />)

    const bannerShape = container.querySelector('#banner-shape')
    const bannerClipShape = container.querySelector('#banner-clip-shape')

    expect(bannerShape).not.toBeNull()
    expect(bannerClipShape).not.toBeNull()
    expect(bannerShape.getAttribute('d')).toBe(bannerClipShape.getAttribute('d'))
    expect(gsapMocks.matchMediaAdd).toHaveBeenCalledWith(
      expect.objectContaining({
        motionOk: '(prefers-reduced-motion: no-preference)',
      }),
      expect.any(Function),
    )
    expect(gsapMocks.to).toHaveBeenCalledWith(
      expect.objectContaining({
        phase: expect.any(Number),
      }),
      expect.objectContaining({
        duration: expect.any(Number),
        ease: 'none',
        onUpdate: expect.any(Function),
        phase: expect.any(Number),
        repeat: -1,
      }),
    )
  })

  it('does not build a morph timeline when reduced motion is active', () => {
    gsapMocks.matchMediaAdd.mockImplementation(() => {})

    render(<Plane />)

    expect(gsapMocks.to).not.toHaveBeenCalled()
  })
})
