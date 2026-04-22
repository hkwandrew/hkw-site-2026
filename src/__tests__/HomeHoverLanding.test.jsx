import { createMemoryRouter, RouterProvider } from 'react-router'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, fireEvent, render, withTheme } from '@/__tests__/testUtils'

const sharedSceneRuntimeMocks = vi.hoisted(() => ({
  animateSharedSceneTransition: vi.fn(),
  applySharedSceneState: vi.fn(),
}))

vi.mock('@/app/landscape/runtime/sharedSceneRuntime', () => ({
  animateSharedSceneTransition:
    sharedSceneRuntimeMocks.animateSharedSceneTransition,
  applySharedSceneState: sharedSceneRuntimeMocks.applySharedSceneState,
}))

import Layout from '@/app/layout/AppLayout'

const originalMatchMedia = window.matchMedia
const originalResizeObserver = window.ResizeObserver
let completePendingSceneTransition = null

const renderLayoutRoute = (initialPath) => {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: withTheme(<Layout />),
        children: [
          {
            index: true,
            element: <div>Home route body</div>,
          },
          {
            path: 'services',
            element: <div>Services route body</div>,
          },
        ],
      },
    ],
    {
      initialEntries: [initialPath],
    },
  )

  return {
    router,
    ...render(<RouterProvider router={router} />),
  }
}

describe('Home hover landing state', () => {
  beforeEach(() => {
    completePendingSceneTransition = null
    sharedSceneRuntimeMocks.animateSharedSceneTransition.mockReset()
    sharedSceneRuntimeMocks.applySharedSceneState.mockReset()
    sharedSceneRuntimeMocks.animateSharedSceneTransition.mockImplementation(
      ({ onComplete }) => {
        completePendingSceneTransition = onComplete
        return { kill: vi.fn() }
      },
    )
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
    window.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  })

  afterEach(() => {
    window.matchMedia = originalMatchMedia
    window.ResizeObserver = originalResizeObserver
  })

  it('keeps home hover regions inactive until the home transition completes', async () => {
    const { container, router } = renderLayoutRoute('/services')

    await act(async () => {
      await router.navigate('/')
    })

    const blueMountainHitbox = container.querySelector(
      '#blue-mountain-hover-hitbox',
    )
    const blueMountainHoverGroup = container.querySelector(
      '#blue-mountain-hover-art',
    )?.parentElement

    expect(blueMountainHitbox).toHaveStyle({
      cursor: 'default',
      pointerEvents: 'none',
    })

    fireEvent.mouseEnter(blueMountainHitbox)

    expect(blueMountainHoverGroup).toHaveStyle({ opacity: '0' })
    expect(completePendingSceneTransition).toEqual(expect.any(Function))

    await act(async () => {
      completePendingSceneTransition?.()
    })

    fireEvent.mouseEnter(blueMountainHitbox)

    expect(blueMountainHitbox).toHaveStyle({
      cursor: 'pointer',
      pointerEvents: 'auto',
    })
    expect(blueMountainHoverGroup).toHaveStyle({ opacity: '1' })
  })
})
