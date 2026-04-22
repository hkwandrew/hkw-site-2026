import { act, render, screen, withTheme } from '@/__tests__/testUtils'
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
let completePendingSceneTransition = null

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
            path: 'work',
            element: <div>Work route body</div>,
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

  it('keeps TreeMountain under the services link on home', () => {
    const { container } = renderLayoutRoute('/')
    const treeMountain = container.querySelector('#tree-mountain__container')
    const link = treeMountain?.closest('a')

    expect(link).toHaveAttribute('href', '/services')
    expect(link).not.toHaveAttribute('tabindex', '-1')
  })

  it('keeps TreeMountain under the same services link off home', () => {
    const { container } = renderLayoutRoute('/services')
    const treeMountain = container.querySelector('#tree-mountain__container')
    const link = treeMountain?.closest('a')

    expect(link).toHaveAttribute('href', '/services')
    expect(link).toHaveAttribute('tabindex', '-1')
  })

  it('shows the work dirt layer only for the work scene', () => {
    const homeRender = renderLayoutRoute('/')
    expect(homeRender.container.querySelector('.work-dirt-layer')).toBeNull()

    const workRender = renderLayoutRoute('/work')
    expect(workRender.container.querySelector('.work-dirt-layer')).toBeTruthy()
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
