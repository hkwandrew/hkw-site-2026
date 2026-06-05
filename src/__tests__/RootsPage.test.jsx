import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, fireEvent, render, screen, withTheme } from '@/__tests__/testUtils'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { PageSceneTransitionProvider } from '@/app/landscape/pageSceneTransition'
import Header from '@/app/layout/Header'
import RootsPage from '@/routes/roots/RootsPage'
import ROOTS_PORTFOLIO_ITEMS from '@/routes/roots/rootsPortfolio'
import { ROOTS_SCENE_TRANSITION_DURATION_MS } from '@/routes/roots/useRootsPageTransition'
import { convertCssPxToViewportUnit } from '@/styles/viewportUnits'

const originalMatchMedia = window.matchMedia
const originalRequestAnimationFrame = window.requestAnimationFrame
const originalCancelAnimationFrame = window.cancelAnimationFrame
const originalResizeObserver = window.ResizeObserver
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

const renderRootsRoute = ({
  initialEntries = ['/roots'],
  initialIndex,
} = {}) => {
  const transitionSceneToPath = vi.fn()
  const router = createMemoryRouter(
    [
      {
        path: '/roots/:portfolioSlug?',
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
    { initialEntries, initialIndex },
  )

  return {
    router,
    transitionSceneToPath,
    ...render(<RouterProvider router={router} />),
  }
}

const renderRootsRouteWithHeader = () => {
  const transitionSceneToPath = vi.fn()
  const rootsElement = withTheme(
    <PageSceneTransitionProvider value={{ transitionSceneToPath }}>
      <Header contentPathname='/roots' navPathname='/work' />
      <RootsPage />
    </PageSceneTransitionProvider>,
  )
  const router = createMemoryRouter(
    [
      {
        path: '/roots/:portfolioSlug?',
        element: rootsElement,
      },
      {
        path: '/about',
        element: <div>About page</div>,
      },
      {
        path: '/services',
        element: <div>Services page</div>,
      },
      {
        path: '/work',
        element: <div>Work page</div>,
      },
      {
        path: '/contact',
        element: <div>Contact page</div>,
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
    window.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  })

  afterEach(() => {
    vi.useRealTimers()
    window.matchMedia = originalMatchMedia
    window.requestAnimationFrame = originalRequestAnimationFrame
    window.cancelAnimationFrame = originalCancelAnimationFrame
    window.ResizeObserver = originalResizeObserver
  })

  it.each([
    ['About', '/about'],
    ['Services', '/services'],
    ['Work', '/work'],
    ['Contact', '/contact'],
  ])(
    'waits for the exit transition before navigating to %s from the roots header',
    async (linkLabel, expectedPath) => {
      const { router, transitionSceneToPath } = renderRootsRouteWithHeader()

      fireEvent.click(screen.getByRole('link', { name: linkLabel }))

      expect(router.state.location.pathname).toBe('/roots')
      expect(transitionSceneToPath).toHaveBeenCalledWith(expectedPath)

      act(() => {
        vi.advanceTimersByTime(ROOTS_SCENE_TRANSITION_DURATION_MS)
      })

      await vi.waitFor(() => {
        expect(router.state.location.pathname).toBe(expectedPath)
      })
    },
  )

  it('navigates immediately from roots when reduced motion is preferred', async () => {
    window.matchMedia = createMatchMedia(true)

    const { router, transitionSceneToPath } = renderRootsRouteWithHeader()

    fireEvent.click(screen.getByRole('link', { name: 'About' }))

    expect(transitionSceneToPath).toHaveBeenCalledWith('/about')

    await vi.waitFor(() => {
      expect(router.state.location.pathname).toBe('/about')
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

    const sceneContent = screen.getByRole('button', {
      name: /open celdf/i,
    }).parentElement

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
    const frameCallbacks = []

    window.requestAnimationFrame = vi.fn((callback) => {
      frameCallbacks.push(callback)
      return frameCallbacks.length
    })
    window.cancelAnimationFrame = vi.fn()

    renderRootsRoute()

    const trigger = screen.getByRole('button', { name: /open celdf/i })

    act(() => {
      fireEvent.click(trigger)
    })

    const dialog = screen.getByRole('dialog', { name: /celdf/i })
    const closeButton = screen.getByRole('button', { name: /close/i })

    expect(dialog).toBeInTheDocument()
    expect(dialog).toHaveAttribute('data-roots-example', 'celdf')
    expect(dialog).toHaveAttribute('data-roots-example-region', 'dialog')
    expect(closeButton).toHaveFocus()

    act(() => {
      fireEvent.click(closeButton)
    })

    await vi.waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    act(() => {
      frameCallbacks.splice(0).forEach((callback) => callback())
    })

    await vi.waitFor(() => {
      expect(trigger).toHaveFocus()
    })
  })

  it('opens a portfolio dialog from the URL slug', async () => {
    const { router } = renderRootsRoute({
      initialEntries: ['/roots/meals-on-wheels'],
    })

    const dialog = screen.getByRole('dialog', { name: /meals on wheels/i })

    expect(router.state.location.pathname).toBe('/roots/meals-on-wheels')
    expect(dialog).toHaveAttribute('data-roots-example', 'meals-on-wheels')
  })

  it('updates the URL when moving through portfolio slides', async () => {
    const { router } = renderRootsRoute({
      initialEntries: ['/roots/meals-on-wheels'],
    })

    fireEvent.click(
      screen.getByRole('button', { name: /show next portfolio piece/i }),
    )

    expect(router.state.location.pathname).toBe('/roots/community-building')

    act(() => {
      vi.advanceTimersByTime(ROOTS_PORTFOLIO_SLIDE_FADE_DURATION_MS)
    })

    await vi.waitFor(() => {
      expect(
        screen.getByRole('dialog', { name: /community building/i }),
      ).toBeInTheDocument()
    })
  })

  it('returns to the parent roots route when closing a slug-opened dialog', async () => {
    const { router } = renderRootsRoute({
      initialEntries: ['/roots/meals-on-wheels'],
    })

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /close/i }))
    })

    await vi.waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      expect(router.state.location.pathname).toBe('/roots')
    })
  })

  it('closes the slug-opened portfolio dialog on browser back', async () => {
    const { router } = renderRootsRoute({
      initialEntries: ['/roots', '/roots/meals-on-wheels'],
      initialIndex: 1,
    })

    expect(screen.getByRole('dialog', { name: /meals on wheels/i }))
      .toBeInTheDocument()

    await act(async () => {
      await router.navigate(-1)
    })

    await vi.waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      expect(router.state.location.pathname).toBe('/roots')
    })
  })

  it('replaces invalid roots slugs with the parent roots route', async () => {
    const { router } = renderRootsRoute({ initialEntries: ['/roots/nope'] })

    await vi.waitFor(() => {
      expect(router.state.location.pathname).toBe('/roots')
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
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

  it('opens the women of color candidates dialog with configured Figma artwork', () => {
    renderRootsRoute()

    const itemIndex = ROOTS_PORTFOLIO_ITEMS.findIndex(
      ({ id }) => id === 'women-of-color-candidates',
    )
    const item = ROOTS_PORTFOLIO_ITEMS[itemIndex]
    const trigger = screen.getByRole('button', {
      name: /open women of color candidates/i,
    })

    expect(ROOTS_PORTFOLIO_ITEMS[itemIndex - 1].id).toBe('fyre')
    expect(item).toMatchObject({
      title: 'Women of Color Candidates',
      desktopFrame: {
        left: 1275.9,
        top: 601.03,
        width: 143.189,
      },
      artworkTop: 68.7,
      artworkLeft: -64,
      artworkWidth: 1075,
      artworkHeight: 717,
    })
    expect(trigger).toHaveAttribute(
      'data-roots-example',
      'women-of-color-candidates',
    )

    fireEvent.click(trigger)

    const dialog = screen.getByRole('dialog', {
      name: /women of color candidates/i,
    })
    const artwork = screen.getByAltText(
      'Women of Color Candidates project artwork',
    )

    expect(dialog).toHaveAttribute(
      'data-roots-example',
      'women-of-color-candidates',
    )
    expect(dialog).toHaveTextContent(/Working with Scott Mueller/i)
    expect(dialog).toHaveTextContent(/Nikki Lockwood/i)
    expect(screen.getByText('Website Design')).toBeInTheDocument()
    expect(screen.getByText('Website Development')).toBeInTheDocument()
    expect(screen.getByText('Graphic Design')).toBeInTheDocument()
    expect(screen.getByText('Branding')).toBeInTheDocument()
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

  it('keeps the full desktop frame map aligned with the header-shifted Figma layout', () => {
    expect(
      ROOTS_PORTFOLIO_ITEMS.map(({ id, desktopFrame }) => ({
        id,
        desktopFrame,
      })),
    ).toEqual([
      {
        id: 'celdf',
        desktopFrame: { left: 245.97, top: 156.6, width: 195.145 },
      },
      {
        id: 'ewi',
        desktopFrame: { left: 61.54, top: 233.6, width: 158.482 },
      },
      {
        id: 'racial-justice',
        desktopFrame: { left: 725.19, top: 179.75, width: 143.189 },
      },
      {
        id: 'waters-meet',
        desktopFrame: { left: 925.11, top: 208.78, width: 206 },
      },
      {
        id: 'community-development-initiative',
        desktopFrame: { left: 74.61, top: 835.17, width: 150.266 },
      },
      {
        id: 'spokane-community-against-racism',
        desktopFrame: { left: 288.98, top: 537.6, width: 183.207 },
      },
      {
        id: 'asians-for-collective-liberation',
        desktopFrame: { left: 73.72, top: 443.76, width: 167.643 },
      },
      {
        id: 'justice-not-jails',
        desktopFrame: { left: 854.94, top: 404, width: 138.443 },
      },
      {
        id: 'citizen-nine26',
        desktopFrame: { left: 495.54, top: 177.8, width: 158.933 },
      },
      {
        id: 'meals-on-wheels',
        desktopFrame: { left: 1152.03, top: 327.33, width: 223.859 },
      },
      {
        id: 'community-building',
        desktopFrame: { left: 835.02, top: 590.02, width: 183.638 },
      },
      {
        id: 'fyre',
        desktopFrame: { left: 1061.44, top: 515.51, width: 168.953 },
      },
      {
        id: 'women-of-color-candidates',
        desktopFrame: { left: 1275.9, top: 601.03, width: 143.189 },
      },
      {
        id: 'terrain',
        desktopFrame: { left: 23.01, top: 661.02, width: 195.541 },
      },
      {
        id: 'spokane-arts',
        desktopFrame: { left: 270.02, top: 787.63, width: 175.853 },
      },
      {
        id: 'marthas-kitchen',
        desktopFrame: { left: 679.08, top: 815.7, width: 227.826 },
      },
      {
        id: 'pjals',
        desktopFrame: { left: 949.04, top: 747.12, width: 166.613 },
      },
      {
        id: 'apic-washington',
        desktopFrame: { left: 280.99, top: 326.69, width: 156.042 },
      },
      {
        id: 'community-whistle',
        desktopFrame: { left: 500.16, top: 752.01, width: 139.814 },
      },
    ])
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

  it('does not paint a light bottom filler in the mobile scroll scene', () => {
    window.matchMedia = createMatchMedia(true)

    renderRootsRoute()

    expect(getInjectedStyles()).not.toContain(
      `height:${convertCssPxToViewportUnit('14px')};background:#FCFAE5`,
    )
  })

  it('renders mobile frame rows in portfolio data order', () => {
    window.matchMedia = createMatchMedia(true)

    renderRootsRoute()

    const mobileScene = document.querySelector(
      '[data-roots-mobile-scroll-region]',
    )
    const mobileWelcome = mobileScene.querySelector(
      '[data-roots-welcome-sign]',
    )
    const mobileFrames = mobileScene.querySelector(
      '[data-roots-mobile-layout="phone"]',
    )
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
    expect(mobileScene.firstElementChild).toBe(mobileWelcome)
    expect(mobileWelcome.nextElementSibling).toBe(mobileFrames)
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
    const mobileWelcome = mobileScene.querySelector(
      '[data-roots-welcome-sign]',
    )
    const mobileFrames = mobileScene.querySelector(
      '[data-roots-mobile-layout="portrait-tablet"]',
    )
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
    expect(mobileScene.firstElementChild).toBe(mobileWelcome)
    expect(mobileWelcome.nextElementSibling).toBe(mobileFrames)
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
    expect(screen.getByRole('button', { name: /open terrain/i })).toHaveAttribute(
      'data-roots-example',
      'terrain',
    )
    expect(
      screen.getByRole('button', { name: /open meals on wheels/i }),
    ).toHaveAttribute('data-roots-example', 'meals-on-wheels')
    expect(
      screen.getByRole('button', {
        name: /open women of color candidates/i,
      }),
    ).toHaveAttribute('data-roots-example', 'women-of-color-candidates')
  })
})
