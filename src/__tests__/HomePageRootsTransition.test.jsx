import { useState } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, fireEvent, render, screen, withTheme } from '@/__tests__/testUtils'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { HomeHoverProvider } from '@/routes/home/homeHoverContext'
import Home from '@/routes/home/HomePage'

const originalMatchMedia = window.matchMedia

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

const StatefulHomeHoverProvider = ({ children }) => {
  const [homeHoverRegion, setHomeHoverRegion] = useState(null)

  return (
    <HomeHoverProvider
      value={{
        clearHomeHoverRegion: () => setHomeHoverRegion(null),
        homeHoverRegion,
        isHome: true,
        setHomeHoverRegion,
      }}
    >
      {children}
    </HomeHoverProvider>
  )
}

const renderHomeRoute = () => {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: withTheme(
          <StatefulHomeHoverProvider>
            <Home />
          </StatefulHomeHoverProvider>,
        ),
      },
      {
        path: '/roots',
        element: <div>Roots page</div>,
      },
    ],
    { initialEntries: ['/'] },
  )

  return {
    router,
    ...render(<RouterProvider router={router} />),
  }
}

describe('HomePage roots transition', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    window.matchMedia = createMatchMedia(false)
  })

  afterEach(() => {
    vi.useRealTimers()
    window.matchMedia = originalMatchMedia
  })

  it('navigates to Non-profit Roots after the stump transition finishes', async () => {
    const { router } = renderHomeRoute()

    fireEvent.click(
      screen.getByRole('button', { name: /enter non-profit roots/i }),
    )

    expect(router.state.location.pathname).toBe('/')

    act(() => {
      vi.advanceTimersByTime(420)
    })

    await vi.waitFor(() => {
      expect(router.state.location.pathname).toBe('/roots')
    })
  })

  it('shows the roots hover art on focus', () => {
    const { container } = renderHomeRoute()
    const trigger = screen.getByRole('button', {
      name: /enter non-profit roots/i,
    })

    fireEvent.focus(trigger)

    const overlay = container.querySelector(
      'button[aria-label="Enter Non-profit Roots"]',
    )?.parentElement?.firstElementChild

    expect(getComputedStyle(overlay).opacity).toBe('1')
    expect(getComputedStyle(overlay).transform).toContain('translate3d')
  })

  it('navigates immediately when reduced motion is preferred', async () => {
    window.matchMedia = createMatchMedia(true)

    const { router } = renderHomeRoute()

    fireEvent.click(
      screen.getByRole('button', { name: /enter non-profit roots/i }),
    )

    await vi.waitFor(() => {
      expect(router.state.location.pathname).toBe('/roots')
    })
  })
})
