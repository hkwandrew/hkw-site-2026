import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, fireEvent, render, screen, withTheme } from '@/__tests__/testUtils'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { PageSceneTransitionProvider } from '@/app/landscape/pageSceneTransition'
import RootsPage from '@/routes/roots/RootsPage'
import ROOTS_PORTFOLIO_ITEMS from '@/routes/roots/rootsPortfolio'
import { ROOTS_SCENE_TRANSITION_DURATION_MS } from '@/routes/roots/useRootsPageTransition'
import { convertCssPxToViewportUnit } from '@/styles/viewportUnits'

const originalMatchMedia = window.matchMedia
const originalRequestAnimationFrame = window.requestAnimationFrame
const originalCancelAnimationFrame = window.cancelAnimationFrame
const ROOTS_PORTFOLIO_SLIDE_FADE_DURATION_MS = 180

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

const createRootsViewportMatchMedia = ({
  phone = false,
  portraitTablet = false,
} = {}) =>
  vi.fn().mockImplementation((query) => ({
    matches:
      (query === '(max-width: 767px)' && phone) ||
      (query.includes('(orientation: portrait)') && portraitTablet),
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))

const createReducedMotionMatchMedia = (matches) =>
  vi.fn().mockImplementation((query) => ({
    matches: query === '(prefers-reduced-motion: reduce)' ? matches : false,
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

const getInjectedStyles = () =>
  Array.from(document.querySelectorAll('style'))
    .map((styleElement) => styleElement.textContent)
    .join('\n')

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
    expect(getComputedStyle(sceneContent).transform).toContain(
      convertCssPxToViewportUnit('20px'),
    )

    act(() => {
      frameCallbacks.splice(0).forEach((callback) => callback())
    })

    await vi.waitFor(() => {
      expect(getComputedStyle(sceneContent).opacity).toBe('1')
      expect(getComputedStyle(sceneContent).transform).toContain('0')
    })
  })

  it('animates the roots marmot eye highlights without following the mouse', () => {
    window.requestAnimationFrame = vi.fn(() => 1)
    window.cancelAnimationFrame = vi.fn()

    renderRootsRoute()

    const marmot = document.querySelector('[data-roots-marmot]')
    const pupils = document.querySelectorAll('[data-roots-pupil]')
    const eyeCores = document.querySelectorAll('[data-roots-eye-core]')

    expect(marmot).not.toBeNull()
    expect(pupils).toHaveLength(2)
    expect(eyeCores).toHaveLength(2)

    act(() => {
      fireEvent.mouseMove(window, {
        clientX: 504,
        clientY: 120,
      })
    })

    expect(pupils[0]).not.toHaveAttribute('style')
    expect(pupils[1]).not.toHaveAttribute('style')
    expect(pupils[0].parentElement.getAttribute('clip-path')).toMatch(
      /^url\(#.+\)$/,
    )
    expect(pupils[1].parentElement.getAttribute('clip-path')).toMatch(
      /^url\(#.+\)$/,
    )
    expect(eyeCores[0]).not.toHaveAttribute('style')
    expect(eyeCores[1]).not.toHaveAttribute('style')
    expect(getInjectedStyles()).toMatch(
      /\[data-roots-pupil\]\s*\{[^}]*animation:[^;]+5\.8s ease-in-out infinite/s,
    )
    expect(getInjectedStyles()).toContain('--roots-pupil-scan-left')
    expect(getInjectedStyles()).toContain('--roots-pupil-scan-right')
  })

  it('disables the roots marmot pupil animation when reduced motion is preferred', () => {
    window.matchMedia = createReducedMotionMatchMedia(true)
    window.requestAnimationFrame = vi.fn(() => 1)
    window.cancelAnimationFrame = vi.fn()

    renderRootsRoute()

    const marmot = document.querySelector('[data-roots-marmot]')
    const pupils = document.querySelectorAll('[data-roots-pupil]')

    expect(marmot).not.toBeNull()
    expect(pupils).toHaveLength(2)

    expect(getInjectedStyles()).toMatch(
      /@media\s*\(prefers-reduced-motion:\s*reduce\)[^{]*\{[\s\S]*\[data-roots-pupil\]\s*\{[^}]*animation:\s*none/s,
    )
  })

  it('renders a softened original-path coffee steam plume', () => {
    window.requestAnimationFrame = vi.fn(() => 1)
    window.cancelAnimationFrame = vi.fn()

    renderRootsRoute()

    const steam = document.querySelector('[data-roots-coffee-steam]')
    const plume = document.querySelector('[data-roots-steam-plume]')
    const steamLayers = document.querySelectorAll(
      '[data-roots-steam-glow], [data-roots-steam-core]',
    )

    expect(steam).not.toBeNull()
    expect(steam).toHaveAttribute('aria-hidden', 'true')
    expect(steam.tagName.toLowerCase()).toBe('g')
    expect(steam).toHaveAttribute('mask', 'url(#mask0_5080_153)')
    expect(plume).not.toBeNull()
    expect(document.querySelectorAll('[data-roots-vapor]')).toHaveLength(0)
    expect(steamLayers).toHaveLength(2)
    expect(document.head.textContent).toMatch(
      /\[data-roots-steam-plume\][^{]*{[^}]*7\.3s linear/,
    )
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
    expect(dialog).toHaveAttribute('data-roots-example', 'celdf')
    expect(dialog).toHaveAttribute('data-roots-example-region', 'dialog')
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

  it('positions detail-image artwork from top and left portfolio values', () => {
    renderRootsRoute()

    fireEvent.click(screen.getByRole('button', { name: /open citizen nine26/i }))

    const item = ROOTS_PORTFOLIO_ITEMS.find(
      ({ id }) => id === 'citizen-nine26',
    )
    const artwork = screen.getByAltText('Citizen Nine26 project artwork')

    expect(item).toMatchObject({
      artworkTop: 160.109,
      artworkLeft: 73.531,
      artworkWidth: 717.463,
      artworkHeight: 471.771,
    })
    expect(item).not.toHaveProperty('artworkJustify')
    expect(item).not.toHaveProperty('artworkAlign')
    expect(artwork).toHaveStyle({
      position: 'absolute',
      top: convertCssPxToViewportUnit(`${item.artworkTop}px`),
      left: convertCssPxToViewportUnit(`${item.artworkLeft}px`),
      width: convertCssPxToViewportUnit(`${item.artworkWidth}px`),
      height: convertCssPxToViewportUnit(`${item.artworkHeight}px`),
      maxWidth: 'none',
      maxInlineSize: 'none',
      maxBlockSize: 'none',
    })
  })

  it('does not cap configured artwork dimensions to the stage width', () => {
    renderRootsRoute()

    fireEvent.click(screen.getByRole('button', { name: /open racial justice/i }))

    const item = ROOTS_PORTFOLIO_ITEMS.find(
      ({ id }) => id === 'racial-justice',
    )
    const artwork = screen.getByAltText(
      'Racial Justice and Police Misconduct Center (RJPMC) project artwork',
    )

    expect(item).toMatchObject({
      artworkWidth: 877.764,
      artworkHeight: 585.908,
    })
    expect(artwork).toHaveStyle({
      width: convertCssPxToViewportUnit(`${item.artworkWidth}px`),
      height: convertCssPxToViewportUnit(`${item.artworkHeight}px`),
      maxWidth: 'none',
      maxInlineSize: 'none',
      maxBlockSize: 'none',
    })
  })

  it('wraps to the first portfolio item when advancing from the last slide', async () => {
    renderRootsRoute()

    const lastItem = ROOTS_PORTFOLIO_ITEMS[ROOTS_PORTFOLIO_ITEMS.length - 1]
    const lastFrame = document.querySelector(
      `button[data-roots-example='${lastItem.id}']`,
    )

    fireEvent.click(lastFrame)

    fireEvent.click(
      screen.getByRole('button', { name: /show next portfolio piece/i }),
    )

    act(() => {
      vi.advanceTimersByTime(ROOTS_PORTFOLIO_SLIDE_FADE_DURATION_MS)
    })

    await vi.waitFor(() => {
      expect(screen.getByRole('dialog', { name: /celdf/i })).toBeInTheDocument()
    })
  })

  it('opens the portfolio dialog from the mobile frame list', async () => {
    window.matchMedia = createMatchMedia(true)

    renderRootsRoute()

    const trigger = screen.getByRole('button', { name: /open community whistle/i })

    expect(trigger).toHaveAttribute('data-roots-example', 'community-whistle')
    expect(trigger).toHaveAttribute('data-roots-example-region', 'mobile-frame')

    fireEvent.click(trigger)

    await vi.waitFor(() => {
      expect(
        screen.getByRole('dialog', { name: /community whistle/i }),
      ).toBeInTheDocument()
    })
  })

  it('renders mobile frame rows in portfolio data order', () => {
    window.matchMedia = createMatchMedia(true)

    renderRootsRoute()

    const mobileFrames = document.querySelector(
      '[data-roots-mobile-scroll-region]',
    ).firstElementChild
    const columns = Array.from(mobileFrames.children)
    const frameRows = columns[0].querySelectorAll(
      'button[data-roots-example-region="mobile-frame"]',
    )
    const rowOrderedIds = Array.from(frameRows).flatMap((_, rowIndex) =>
      columns
        .map((column) =>
          column.querySelectorAll(
            'button[data-roots-example-region="mobile-frame"]',
          )[rowIndex]?.dataset.rootsExample,
        )
        .filter(Boolean),
    )

    expect(mobileFrames).toHaveAttribute('data-roots-mobile-layout', 'phone')
    expect(rowOrderedIds).toEqual(ROOTS_PORTFOLIO_ITEMS.map((item) => item.id))
  })

  it('renders a portrait-tablet mobile frame grid in portfolio data order', () => {
    window.matchMedia = createRootsViewportMatchMedia({
      portraitTablet: true,
    })

    renderRootsRoute()

    const mobileScene = document.querySelector(
      '[data-roots-mobile-scroll-region]',
    )
    const mobileFrames = mobileScene.firstElementChild
    const frameButtons = Array.from(
      mobileFrames.querySelectorAll(
        'button[data-roots-example-region="mobile-frame"]',
      ),
    )

    expect(mobileScene).toHaveAttribute(
      'data-roots-mobile-layout',
      'portrait-tablet',
    )
    expect(mobileFrames).toHaveAttribute(
      'data-roots-mobile-layout',
      'portrait-tablet',
    )
    expect(document.querySelector('[data-roots-welcome-sign]')).toBeNull()
    expect(mobileFrames.children).toHaveLength(ROOTS_PORTFOLIO_ITEMS.length)
    expect(frameButtons.map((button) => button.dataset.rootsExample)).toEqual(
      ROOTS_PORTFOLIO_ITEMS.map((item) => item.id),
    )
    expect(getInjectedStyles()).toContain('repeat(auto-fit')
  })

  it('exposes each desktop roots frame id as a data attribute', () => {
    renderRootsRoute()

    const frameButtons = document.querySelectorAll('button[data-roots-example]')

    expect(
      Array.from(frameButtons).map((button) => button.dataset.rootsExample),
    ).toEqual(ROOTS_PORTFOLIO_ITEMS.map((item) => item.id))
    expect(
      Array.from(frameButtons).every(
        (button) => button.dataset.rootsExampleRegion === 'desktop-frame',
      ),
    ).toBe(true)
  })

  it('renders the expanded nonprofit hub scene on desktop', () => {
    renderRootsRoute()

    const frameButtons = document.querySelectorAll('button[data-roots-example]')

    expect(frameButtons).toHaveLength(ROOTS_PORTFOLIO_ITEMS.length)
    expect(ROOTS_PORTFOLIO_ITEMS.length).toBeGreaterThan(6)
    expect(document.querySelector('[data-roots-welcome-sign]')).not.toBeNull()
    expect(
      screen.getByRole('button', { name: /return to home/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /open terrain/i })).toHaveAttribute(
      'data-roots-example',
      'terrain',
    )
    expect(
      screen.getByRole('button', { name: /open meals on wheels/i }),
    ).toHaveAttribute('data-roots-example', 'meals-on-wheels')
  })
})
