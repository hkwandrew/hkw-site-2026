import { act, fireEvent, render, screen, waitFor, withTheme } from '@/__tests__/testUtils'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { usePageSceneTransition } from '@/app/landscape/pageSceneTransition'
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
const originalInnerHeight = window.innerHeight
const originalInnerWidth = window.innerWidth
let completePendingSceneTransition = null
let activeRouter = null
let canUseHoverRegions = false
let sceneTransitionStartPaths = []

const SCENE_RUNTIME_LAYER_SELECTORS = [
  '#blue-mountain__container',
  '#blue-mountain__wrapper',
  '#gold-mountain__container',
  '#gold-mountain__wrapper',
  '#sun__container',
  '#sun__wrapper',
  '#dk-blue-mountain_container',
  '#dk-blue-mountain_wrapper',
  '#tree-mountain__container',
  '#tree-mountain__wrapper',
  '#upper-field__container',
  '#upper-field__wrapper',
  '#white-sand__container',
  '#white-sand__wrapper',
  '#dirt-layer__container',
  '#dirt-layer__wrapper',
]

const normalizeCss = (value) => value.replace(/\s+/g, '')
const getInjectedStyles = () =>
  Array.from(document.querySelectorAll('style'))
    .map((styleElement) => styleElement.textContent)
    .join('\n')
const getElementStyles = (element) =>
  Array.from(element.classList)
    .map((className) => {
      const matches = getInjectedStyles().match(
        new RegExp(`\\.${className}\\{[^}]*\\}`, 'g'),
      )

      return matches?.join('\n') ?? ''
    })
    .join('\n')

const setViewportSize = (width, height) => {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    value: width,
  })
  Object.defineProperty(window, 'innerHeight', {
    configurable: true,
    value: height,
  })
}

const assignRuntimeTransformSentinels = (container) => {
  SCENE_RUNTIME_LAYER_SELECTORS.forEach((selector, index) => {
    const element = container.querySelector(selector)

    element?.setAttribute('transform', `sentinel-${index}`)
  })
}

const expectRuntimeTransformSentinels = (container) => {
  SCENE_RUNTIME_LAYER_SELECTORS.forEach((selector, index) => {
    expect(container.querySelector(selector)).toHaveAttribute(
      'transform',
      `sentinel-${index}`,
    )
  })
}

const AboutTransitionProbe = () => {
  const { transitionSceneToPath } = usePageSceneTransition()

  return (
    <>
      <div>About route body</div>
      <button type='button' onClick={() => transitionSceneToPath('/work')}>
        Start /work transition
      </button>
      <button type='button' onClick={() => transitionSceneToPath('/services')}>
        Start /services transition
      </button>
    </>
  )
}

const WorkRouteProbe = () => (
  <div data-testid='work-route-probe'>Work route body</div>
)

const RootsRouteProbe = () => (
  <div data-testid='roots-route-probe'>Roots route body</div>
)

const PolicyRouteProbe = () => (
  <div data-testid='policy-route-probe'>Policy route body</div>
)

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
          {
            path: 'about',
            element: <AboutTransitionProbe />,
          },
          {
            path: 'work/:caseStudySlug?',
            element: <WorkRouteProbe />,
          },
          {
            path: 'roots/:portfolioSlug?',
            element: <RootsRouteProbe />,
          },
          {
            path: 'policy',
            element: <PolicyRouteProbe />,
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

describe('Layout shared scene links', () => {
  beforeEach(() => {
    completePendingSceneTransition = null
    activeRouter = null
    canUseHoverRegions = false
    sceneTransitionStartPaths = []
    setViewportSize(1440, 1024)
    sharedSceneRuntimeMocks.animateSharedSceneTransition.mockReset()
    sharedSceneRuntimeMocks.applySharedSceneState.mockReset()
    sharedSceneRuntimeMocks.animateSharedSceneTransition.mockImplementation(
      ({ onComplete }) => {
        sceneTransitionStartPaths.push(activeRouter?.state.location.pathname ?? null)
        completePendingSceneTransition = onComplete
        return { kill: vi.fn() }
      },
    )
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches:
        query === '(hover: hover)'
          ? canUseHoverRegions
          : query === '(hover: none)'
            ? !canUseHoverRegions
            : query === '(pointer: fine)'
              ? canUseHoverRegions
              : query === '(pointer: coarse)'
                ? !canUseHoverRegions
                : false,
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
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: originalInnerWidth,
    })
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: originalInnerHeight,
    })
    delete document.documentElement.dataset.viewportLayout
    document.documentElement.style.removeProperty('--hkw-viewport-height')
    document.documentElement.style.removeProperty('--hkw-viewport-ratio')
    document.documentElement.style.removeProperty('--hkw-viewport-width')
  })

  it('keeps TreeMountain under the services link on home', () => {
    const { container } = renderLayoutRoute('/')
    const treeMountain = container.querySelector('#tree-mountain__container')
    const link = treeMountain?.closest('a')

    expect(link).toHaveAttribute('href', '/services')
  })

  it('keeps TreeMountain under the same services link off home', () => {
    const { container } = renderLayoutRoute('/services')
    const treeMountain = container.querySelector('#tree-mountain__container')
    const link = treeMountain?.closest('a')

    expect(link).toHaveAttribute('href', '/services')
    expect(link).toHaveAttribute('tabindex', '-1')
  })

  it('adds the extra shared dirt group only for the work scene', () => {
    const homeRender = renderLayoutRoute('/')
    expect(
      homeRender.container.querySelectorAll('#dirt-layer__container > g'),
    ).toHaveLength(1)

    const workRender = renderLayoutRoute('/work')
    expect(
      workRender.container.querySelectorAll('#dirt-layer__container > g'),
    ).toHaveLength(2)
  })

  it('sizes the shared scene from the desktop viewport frame unit', () => {
    const { container } = renderLayoutRoute('/')
    const scene = container.querySelector('#scene-svg')
    const sceneStyles = normalizeCss(getElementStyles(scene))

    expect(sceneStyles).toContain(
      'width:min(calc(1440*var(--hkw-viewport-px-unit)),100%)',
    )
    expect(sceneStyles).toContain('height:auto')
    expect(sceneStyles).not.toContain(
      'max-width:calc(1440*var(--hkw-viewport-px-unit))',
    )
  })

  it('emits the shared viewport composition on the app shell and root', () => {
    setViewportSize(1366, 768)

    const { container } = renderLayoutRoute('/')
    const mainElement = container.querySelector('main')

    expect(mainElement).toHaveAttribute(
      'data-viewport-layout',
      'short-desktop',
    )
    expect(mainElement).toHaveAttribute('data-pointer', 'coarse')
    expect(mainElement).toHaveAttribute('data-hover', 'none')
    expect(mainElement.style.getPropertyValue('--hkw-viewport-width')).toBe(
      '1366px',
    )
    expect(mainElement.style.getPropertyValue('--hkw-viewport-height')).toBe(
      '768px',
    )
    expect(mainElement.style.getPropertyValue('--hkw-viewport-ratio')).toBe(
      '1.77865',
    )
    expect(document.documentElement).toHaveAttribute(
      'data-viewport-layout',
      'short-desktop',
    )
  })

  it('shows the roots header on desktop and phone portrait layouts', () => {
    setViewportSize(667, 375)
    const landscapeRender = renderLayoutRoute('/roots')

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Work' })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(
      screen.queryByRole('button', {
        name: 'Open navigation menu',
      }),
    ).not.toBeInTheDocument()

    landscapeRender.unmount()
    setViewportSize(375, 667)
    renderLayoutRoute('/roots')

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Open navigation menu' }))
      .toBeInTheDocument()
  })

  it('keeps runtime-owned scene transforms through route re-render', async () => {
    const { container, router } = renderLayoutRoute('/')
    activeRouter = router

    assignRuntimeTransformSentinels(container)

    await act(async () => {
      await router.navigate('/about')
    })

    expectRuntimeTransformSentinels(container)
  })

  it('starts the home layer scene transition and mounts about content before the scene completes', async () => {
    canUseHoverRegions = true
    const { container, router } = renderLayoutRoute('/')
    activeRouter = router
    const aboutLayerLink = container
      .querySelector('#blue-mountain__container')
      ?.closest('a')

    await act(async () => {
      fireEvent.click(aboutLayerLink)
    })

    expect(sceneTransitionStartPaths[0]).toBe('/')
    expect(router.state.location.pathname).toBe('/about')
    expect(completePendingSceneTransition).toEqual(expect.any(Function))
    expect(screen.getByText('About route body')).toBeInTheDocument()
  })

  it('starts the home nav scene transition and mounts about content before the scene completes', async () => {
    const { router } = renderLayoutRoute('/')
    activeRouter = router

    await act(async () => {
      screen.getByRole('link', { name: 'About' }).click()
    })

    expect(sceneTransitionStartPaths[0]).toBe('/')
    expect(router.state.location.pathname).toBe('/about')
    expect(completePendingSceneTransition).toEqual(expect.any(Function))
    expect(screen.getByText('About route body')).toBeInTheDocument()
  })

  it('reapplies the active scene state when the scene viewport changes', () => {
    const { container } = renderLayoutRoute('/services')
    const mainElement = container.querySelector('main')

    expect(sharedSceneRuntimeMocks.applySharedSceneState).toHaveBeenCalledTimes(1)

    act(() => {
      setViewportSize(375, 667)
      window.dispatchEvent(new Event('resize'))
    })

    expect(sharedSceneRuntimeMocks.applySharedSceneState).toHaveBeenCalledTimes(2)
    expect(sharedSceneRuntimeMocks.applySharedSceneState).toHaveBeenLastCalledWith(
      mainElement,
      expect.objectContaining({
        blueMountain: expect.any(Object),
        dirtLayer: expect.any(Object),
      }),
    )
  })

  it('waits to mount the next route until the scene transition finishes', async () => {
    const { router } = renderLayoutRoute('/')

    expect(screen.getByText('Home route body')).toBeInTheDocument()

    await act(async () => {
      await router.navigate('/services')
    })

    expect(router.state.location.pathname).toBe('/services')
    expect(screen.queryByText('Home route body')).not.toBeInTheDocument()
    expect(screen.queryByText('Services route body')).not.toBeInTheDocument()
    expect(completePendingSceneTransition).toEqual(expect.any(Function))

    await act(async () => {
      completePendingSceneTransition?.()
    })

    expect(screen.getByText('Services route body')).toBeInTheDocument()
  })

  it('keeps the work route mounted when only the work slug changes', async () => {
    const { router } = renderLayoutRoute('/work/celdf')
    const workRouteProbe = screen.getByTestId('work-route-probe')

    expect(workRouteProbe).toBeInTheDocument()
    expect(sharedSceneRuntimeMocks.applySharedSceneState).toHaveBeenCalledTimes(1)

    await act(async () => {
      await router.navigate('/work/voxus-pr')
    })

    expect(router.state.location.pathname).toBe('/work/voxus-pr')
    expect(screen.getByTestId('work-route-probe')).toBe(workRouteProbe)
    expect(sharedSceneRuntimeMocks.animateSharedSceneTransition).not.toHaveBeenCalled()
    expect(sharedSceneRuntimeMocks.applySharedSceneState).toHaveBeenCalledTimes(1)
  })

  it('keeps the roots route mounted when only the roots slug changes', async () => {
    const { router } = renderLayoutRoute('/roots/meals-on-wheels')
    const rootsRouteProbe = screen.getByTestId('roots-route-probe')

    expect(rootsRouteProbe).toBeInTheDocument()
    expect(sharedSceneRuntimeMocks.applySharedSceneState).toHaveBeenCalledTimes(1)

    await act(async () => {
      await router.navigate('/roots/community-building')
    })

    expect(router.state.location.pathname).toBe('/roots/community-building')
    expect(screen.getByTestId('roots-route-probe')).toBe(rootsRouteProbe)
    expect(sharedSceneRuntimeMocks.animateSharedSceneTransition).not.toHaveBeenCalled()
    expect(sharedSceneRuntimeMocks.applySharedSceneState).toHaveBeenCalledTimes(1)
  })

  it('mounts the about route while the scene transition is still running', async () => {
    const { router } = renderLayoutRoute('/')

    expect(screen.getByText('Home route body')).toBeInTheDocument()

    await act(async () => {
      await router.navigate('/about')
    })

    expect(router.state.location.pathname).toBe('/about')
    expect(completePendingSceneTransition).toEqual(expect.any(Function))
    expect(screen.getByText('About route body')).toBeInTheDocument()
  })

  it('mounts the policy route from home without waiting on a scene transition', async () => {
    const { router } = renderLayoutRoute('/')

    expect(screen.getByText('Home route body')).toBeInTheDocument()

    await act(async () => {
      await router.navigate('/policy')
    })

    expect(router.state.location.pathname).toBe('/policy')
    expect(sharedSceneRuntimeMocks.animateSharedSceneTransition).not.toHaveBeenCalled()
    expect(completePendingSceneTransition).toBeNull()
    expect(screen.getByTestId('policy-route-probe')).toBeInTheDocument()
  })

  it('keeps the header mounted while the route body stays hidden', async () => {
    const { router } = renderLayoutRoute('/services')

    expect(screen.getByRole('link', { name: 'Services' })).toHaveAttribute(
      'aria-current',
      'page',
    )

    await act(async () => {
      await router.navigate('/')
    })

    expect(router.state.location.pathname).toBe('/')
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Services' })).not.toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(screen.queryByText('Home route body')).not.toBeInTheDocument()

    await act(async () => {
      completePendingSceneTransition?.()
    })

    expect(screen.getByText('Home route body')).toBeInTheDocument()
  })

  it('hides the page label while waiting to reveal the next route', async () => {
    const { router } = renderLayoutRoute('/services')

    await waitFor(() => {
      expect(getComputedStyle(screen.getByText('Our Specialties')).opacity).toBe(
        '1',
      )
    })

    await act(async () => {
      await router.navigate('/work')
    })

    expect(getComputedStyle(screen.getByText('Our Specialties')).opacity).toBe(
      '0',
    )

    await act(async () => {
      completePendingSceneTransition?.()
    })

    expect(screen.getByText('Work route body')).toBeInTheDocument()

    await waitFor(() => {
      expect(getComputedStyle(screen.getByText('Our Work')).opacity).toBe('1')
    })
  })

  it('updates the nav immediately for an about to work pending transition', async () => {
    const { router } = renderLayoutRoute('/about')

    expect(router.state.location.pathname).toBe('/about')
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute(
      'aria-current',
      'page',
    )

    await act(async () => {
      screen.getByRole('button', { name: 'Start /work transition' }).click()
    })

    expect(router.state.location.pathname).toBe('/about')
    expect(screen.getByText('About route body')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Work' })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(screen.getByRole('link', { name: 'About' })).not.toHaveAttribute(
      'aria-current',
      'page',
    )
  })

  it('updates the nav immediately for an about to services pending transition', async () => {
    const { router } = renderLayoutRoute('/about')

    await act(async () => {
      screen.getByRole('button', { name: 'Start /work transition' }).click()
    })

    await act(async () => {
      screen.getByRole('button', { name: 'Start /services transition' }).click()
    })

    expect(router.state.location.pathname).toBe('/about')
    expect(screen.getByRole('link', { name: 'Services' })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(screen.getByRole('link', { name: 'About' })).not.toHaveAttribute(
      'aria-current',
      'page',
    )
  })
})
