import { useEffect, useRef } from 'react'
import { createMemoryRouter, RouterProvider, useBlocker } from 'react-router'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  act,
  render,
  screen,
  waitFor,
  withTheme,
} from '@/__tests__/testUtils'
import Layout from '@/app/layout/AppLayout'
import { usePageSceneTransition } from '@/app/landscape/pageSceneTransition'

const {
  applySharedSceneState,
  animateSharedSceneTransition,
  transitionControls,
} = vi.hoisted(() => {
  const transitionControls = []

  return {
    applySharedSceneState: vi.fn(),
    animateSharedSceneTransition: vi.fn(({ onComplete }) => {
      const control = {
        complete: () => onComplete?.(),
        kill: vi.fn(),
      }

      transitionControls.push(control)

      return control
    }),
    transitionControls,
  }
})

vi.mock('@/app/landscape/runtime/sharedSceneRuntime', () => ({
  applySharedSceneState,
  animateSharedSceneTransition,
}))

const originalMatchMedia = window.matchMedia
const originalResizeObserver = window.ResizeObserver

const BlockingAboutRoute = () => {
  const nextPathRef = useRef(null)
  const { transitionSceneToPath } = usePageSceneTransition()
  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    const isLeavingAbout =
      currentLocation.pathname === '/about' &&
      nextLocation.pathname !== currentLocation.pathname

    nextPathRef.current = isLeavingAbout ? nextLocation.pathname : null

    return isLeavingAbout
  })

  useEffect(() => {
    if (blocker.state !== 'blocked') return

    transitionSceneToPath(nextPathRef.current)
  }, [blocker.state, transitionSceneToPath])

  return <div>Blocking about body</div>
}

const renderLayoutRoute = (initialPath = '/') => {
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
            path: 'about',
            element: <BlockingAboutRoute />,
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

describe('Layout route content visibility', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    transitionControls.length = 0
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

  it('keeps the current blocked route visible if the scene finishes before navigation proceeds', async () => {
    const { router } = renderLayoutRoute('/about')

    expect(screen.getByText('Blocking about body')).toBeVisible()

    await act(async () => {
      router.navigate('/services')
    })

    await waitFor(() => {
      expect(animateSharedSceneTransition).toHaveBeenCalledTimes(1)
    })

    await act(async () => {
      transitionControls[0].complete()
    })

    expect(router.state.location.pathname).toBe('/about')
    expect(screen.getByText('Blocking about body')).toBeVisible()
    expect(screen.queryByText('Services route body')).not.toBeInTheDocument()
  })
})
