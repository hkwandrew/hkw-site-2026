import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, fireEvent, render, screen, withTheme } from '@/__tests__/testUtils'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { PageSceneTransitionProvider } from '@/app/landscape/pageSceneTransition'
import RootsPage from '@/routes/roots/RootsPage'
import { ROOTS_SCENE_TRANSITION_DURATION_MS } from '@/routes/roots/useRootsPageTransition'

const originalMatchMedia = window.matchMedia
const originalRequestAnimationFrame = window.requestAnimationFrame
const originalCancelAnimationFrame = window.cancelAnimationFrame

const createMatchMedia = (matches) =>
  vi.fn().mockImplementation((query) => ({
    matches,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))

const renderRootsRoute = () => {
  const transitionSceneToPath = vi.fn()
  const router = createMemoryRouter(
    [
      {
        path: '/roots',
        element: withTheme(
          <PageSceneTransitionProvider value={{ transitionSceneToPath }}>
            <RootsPage />
          </PageSceneTransitionProvider>,
        ),
      },
      {
        path: '/',
        element: <div>Home page</div>,
      },
    ],
    { initialEntries: ['/roots'] },
  )

  return {
    router,
    transitionSceneToPath,
    ...render(<RouterProvider router={router} />),
  }
}

const renderRootsRouteFromHome = () => {
  const transitionSceneToPath = vi.fn()
  const router = createMemoryRouter(
    [
      {
        path: '/roots',
        element: withTheme(
          <PageSceneTransitionProvider value={{ transitionSceneToPath }}>
            <RootsPage />
          </PageSceneTransitionProvider>,
        ),
      },
    ],
    {
      initialEntries: [
        {
          pathname: '/roots',
          state: { fromRootsDive: true },
        },
      ],
    },
  )

  return render(<RouterProvider router={router} />)
}

describe('RootsPage', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    window.matchMedia = createMatchMedia(false)
  })

  afterEach(() => {
    vi.useRealTimers()
    window.matchMedia = originalMatchMedia
    window.requestAnimationFrame = originalRequestAnimationFrame
    window.cancelAnimationFrame = originalCancelAnimationFrame
  })

  it('waits for the exit transition before navigating home', async () => {
    const { router, transitionSceneToPath } = renderRootsRoute()

    fireEvent.click(screen.getByRole('button', { name: /return to home/i }))

    expect(router.state.location.pathname).toBe('/roots')
    expect(transitionSceneToPath).toHaveBeenCalledWith('/')

    act(() => {
      vi.advanceTimersByTime(ROOTS_SCENE_TRANSITION_DURATION_MS)
    })

    await vi.waitFor(() => {
      expect(router.state.location.pathname).toBe('/')
    })
  })

  it('navigates home immediately when reduced motion is preferred', async () => {
    window.matchMedia = createMatchMedia(true)

    const { router, transitionSceneToPath } = renderRootsRoute()

    fireEvent.click(screen.getByRole('button', { name: /return to home/i }))

    expect(transitionSceneToPath).toHaveBeenCalledWith('/')

    await vi.waitFor(() => {
      expect(router.state.location.pathname).toBe('/')
    })
  })

  it('fades the roots scene content in on mount', async () => {
    const frameCallbacks = []

    window.requestAnimationFrame = vi.fn((callback) => {
      frameCallbacks.push(callback)
      return frameCallbacks.length
    })
    window.cancelAnimationFrame = vi.fn()

    renderRootsRoute()

    const sceneContent = screen
      .getByRole('button', { name: /return to home/i })
      .parentElement

    expect(getComputedStyle(sceneContent).opacity).toBe('0')
    expect(getComputedStyle(sceneContent).transform).toContain('20px')

    act(() => {
      frameCallbacks.splice(0).forEach((callback) => callback())
    })

    await vi.waitFor(() => {
      expect(getComputedStyle(sceneContent).opacity).toBe('1')
      expect(getComputedStyle(sceneContent).transform).toContain('0')
    })
  })

  it('does not revive the old roots entry slide when coming from home', () => {
    renderRootsRouteFromHome()

    const page = screen
      .getByRole('heading', { name: /non-profit roots/i })
      .parentElement

    expect(page).toHaveAttribute('data-roots-phase', 'entered')
  })

  it('opens a portfolio dialog from a frame button and restores focus on close', async () => {
    renderRootsRoute()

    const trigger = screen.getByRole('button', { name: /open celdf/i })

    fireEvent.click(trigger)

    const dialog = screen.getByRole('dialog', { name: /celdf/i })
    const closeButton = screen.getByRole('button', { name: /close/i })

    expect(dialog).toBeInTheDocument()
    expect(closeButton).toHaveFocus()

    fireEvent.click(closeButton)

    await vi.waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      expect(trigger).toHaveFocus()
    })
  })

  it('closes the portfolio dialog when escape is pressed', async () => {
    renderRootsRoute()

    fireEvent.click(screen.getByRole('button', { name: /open citizen nine26/i }))

    expect(
      screen.getByRole('dialog', { name: /citizen nine26/i }),
    ).toBeInTheDocument()

    fireEvent.keyDown(document, { key: 'Escape' })

    await vi.waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  it('wraps to the first portfolio item when advancing from the last slide', async () => {
    renderRootsRoute()

    fireEvent.click(
      screen.getByRole('button', {
        name: /open asian & pacific islander coalition of washington/i,
      }),
    )

    fireEvent.click(
      screen.getByRole('button', { name: /show next portfolio piece/i }),
    )

    await vi.waitFor(() => {
      expect(screen.getByRole('dialog', { name: /celdf/i })).toBeInTheDocument()
    })
  })

  it('opens the portfolio dialog from the mobile frame list', async () => {
    window.matchMedia = createMatchMedia(true)

    renderRootsRoute()

    fireEvent.click(
      screen.getByRole('button', { name: /open community whistle/i }),
    )

    await vi.waitFor(() => {
      expect(
        screen.getByRole('dialog', { name: /community whistle/i }),
      ).toBeInTheDocument()
    })
  })
})
