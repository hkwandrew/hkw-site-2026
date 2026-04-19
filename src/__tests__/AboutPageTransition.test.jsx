import { createMemoryRouter, RouterProvider } from 'react-router'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, render, screen, withTheme } from '@/__tests__/testUtils'
import { PageSceneTransitionProvider } from '@/app/landscape/pageSceneTransition'
import { SCENE_TRANSITION_DURATION_MS } from '@/app/landscape/sceneRegistry'
import AboutPage from '@/routes/about/AboutPage'

vi.mock('@/routes/about/useAboutDesktopScene', () => ({
  default: () => ({
    scrollerRef: { current: null },
    sceneRef: { current: null },
    handleScrollHintClick: vi.fn(),
  }),
}))

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

const renderAboutRoute = () => {
  const transitionSceneToPath = vi.fn()
  const router = createMemoryRouter(
    [
      {
        path: '/about',
        element: withTheme(
          <PageSceneTransitionProvider value={{ transitionSceneToPath }}>
            <AboutPage />
          </PageSceneTransitionProvider>,
        ),
      },
      {
        path: '/services',
        element: withTheme(<div>Services page</div>),
      },
    ],
    { initialEntries: ['/about'] },
  )

  return {
    router,
    transitionSceneToPath,
    ...render(<RouterProvider router={router} />),
  }
}

describe('AboutPage route exit transition', () => {
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

  it('slides in without lowering opacity before activation', async () => {
    let activatePage = null

    window.requestAnimationFrame = vi.fn((callback) => {
      activatePage = callback
      return 1
    })
    window.cancelAnimationFrame = vi.fn()

    renderAboutRoute()

    const page = screen.getByTestId('about-page')

    expect(page).toHaveAttribute('data-about-phase', 'entered')
    expect(getComputedStyle(page).opacity).toBe('1')
    expect(getComputedStyle(page).transform).toContain('16dvh')

    act(() => {
      activatePage?.(0)
    })

    expect(getComputedStyle(page).opacity).toBe('1')
    expect(getComputedStyle(page).transform.replace(/\s+/g, ' ')).toContain(
      'translate3d( 0, 0, 0 )',
    )
  })

  it('keeps the about content mounted while it exits toward the next route', async () => {
    const { router, transitionSceneToPath } = renderAboutRoute()

    const page = screen.getByTestId('about-page')

    expect(page).toHaveAttribute('data-about-phase', 'entered')
    expect(
      screen.getByRole('button', {
        name: /scroll for more client testimonials/i,
      }),
    ).toBeInTheDocument()

    act(() => {
      router.navigate('/services')
    })

    expect(router.state.location.pathname).toBe('/about')
    expect(transitionSceneToPath).toHaveBeenCalledWith('/services')
    expect(page).toHaveAttribute('data-about-phase', 'exiting')
    expect(getComputedStyle(page).opacity).toBe('1')
    expect(getComputedStyle(page).transform).toContain('16dvh')
    expect(screen.queryByText('Services page')).not.toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(SCENE_TRANSITION_DURATION_MS)
    })

    await act(async () => {
      await Promise.resolve()
    })

    expect(router.state.location.pathname).toBe('/services')
  })
})
