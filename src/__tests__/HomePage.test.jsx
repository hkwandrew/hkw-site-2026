import { act, fireEvent, render, screen } from '@/__tests__/testUtils'
import { MemoryRouter } from 'react-router'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { HomeHoverProvider } from '@/routes/home/homeHoverContext'
import HomePage from '@/routes/home/HomePage'
import { ROOTS_DROP_DURATION_MS } from '@/routes/home/HomePage.styles'

const mockNavigate = vi.fn()
const originalMatchMedia = window.matchMedia
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const normalizeCss = (value) => value.replace(/\s+/g, '')

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router')

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

const renderHomePage = ({
  clearHomeHoverRegion = vi.fn(),
  homeHoverRegion = null,
  isHomeInteractive,
  setHomeHoverRegion = vi.fn(),
} = {}) => {
  const renderResult = render(
    <MemoryRouter initialEntries={['/']}>
      <HomeHoverProvider
        value={{
          clearHomeHoverRegion,
          homeHoverRegion,
          isHome: true,
          isHomeInteractive,
          setHomeHoverRegion,
        }}
      >
        <HomePage />
      </HomeHoverProvider>
    </MemoryRouter>,
  )

  return {
    clearHomeHoverRegion,
    setHomeHoverRegion,
    ...renderResult,
  }
}

describe('HomePage', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    mockNavigate.mockReset()
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
  })

  afterEach(() => {
    vi.useRealTimers()
    window.matchMedia = originalMatchMedia
  })

  it('navigates to the roots route after the marmot stump transition', () => {
    renderHomePage()

    fireEvent.click(
      screen.getByRole('button', {
        name: /enter non-profit roots/i,
      }),
    )

    expect(mockNavigate).not.toHaveBeenCalled()

    act(() => {
      vi.advanceTimersByTime(ROOTS_DROP_DURATION_MS)
    })

    expect(mockNavigate).toHaveBeenCalledWith('/roots', {
      state: { fromRootsDive: true },
    })
  })

  it('starts a dedicated marmot exit animation during the roots transition', () => {
    const { container } = renderHomePage()

    fireEvent.click(
      screen.getByRole('button', {
        name: /enter non-profit roots/i,
      }),
    )

    const introGroup = container.querySelector('#marmot-character-intro')
    expect(introGroup).not.toBeNull()

    const introWrapper = introGroup.closest('div')
    expect(introWrapper).not.toBeNull()

    const styles = Array.from(document.head.querySelectorAll('style'))
      .map((styleTag) => styleTag.textContent ?? '')
      .join('\n')
    const introWrapperClassName = Array.from(introWrapper.classList).find(
      (className) =>
        styles.includes(`.${className} #marmot-character-intro{animation:`),
    )

    expect(introWrapperClassName).toBeDefined()
    expect(styles).toMatch(
      new RegExp(
        `\\.${escapeRegExp(
          introWrapperClassName,
        )} #marmot-character-intro\\{animation:[^}]* ${ROOTS_DROP_DURATION_MS}ms `,
      ),
    )
    expect(styles).toMatch(
      new RegExp(
        `\\.${escapeRegExp(
          introWrapperClassName,
        )} #marmot-character-hover\\{opacity:0;transition:none;visibility:hidden;\\}`,
      ),
    )
  })

  it('activates the roots hover region on focus and mouse enter', () => {
    const { setHomeHoverRegion } = renderHomePage()

    const trigger = screen.getByRole('button', {
      name: /enter non-profit roots/i,
    })

    fireEvent.focus(trigger)
    fireEvent.mouseEnter(trigger)

    expect(setHomeHoverRegion).toHaveBeenCalledTimes(2)
    expect(setHomeHoverRegion).toHaveBeenCalledWith('mascot')
  })

  it('renders a positioned roots trigger over the marmot artwork', () => {
    const { container } = renderHomePage()

    const trigger = container.querySelector('[data-home-marmot-trigger]')
    expect(trigger).not.toBeNull()

    const styles = Array.from(document.head.querySelectorAll('style'))
      .map((styleTag) => styleTag.textContent ?? '')
      .join('\n')
    const triggerClassName = Array.from(trigger.classList).find((className) =>
      styles.includes(`.${className}{position:absolute;`),
    )

    expect(triggerClassName).toBeDefined()
    const triggerRule = styles.match(
      new RegExp(`\\.${escapeRegExp(triggerClassName)}\\{[^}]*\\}`),
    )?.[0]

    expect(triggerRule).toContain('position:absolute')
    expect(triggerRule).toContain('z-index:')
  })

  it('renders the marmot hover pose from the route-owned art', () => {
    const { container } = renderHomePage()

    const hoverPose = container.querySelector('#marmot-character-hover')
    const hoverEyes = container.querySelector('#marmot-hover-blink')

    expect(hoverPose).not.toBeNull()
    expect(hoverPose).toHaveAttribute('aria-hidden', 'true')
    expect(hoverEyes).not.toBeNull()
  })

  it('keeps the hover marmot eye layer visible between blinks', () => {
    renderHomePage()

    const styles = Array.from(document.head.querySelectorAll('style'))
      .map((styleTag) => styleTag.textContent ?? '')
      .join('\n')

    expect(styles).toContain('#marmot-hover-blink{opacity:1;')
    expect(styles).not.toContain('#marmot-hover-blink{opacity:0;')
  })

  it('activates the marmot hover pose only when the mascot region is interactive', () => {
    const { container } = renderHomePage({
      homeHoverRegion: 'mascot',
      isHomeInteractive: true,
    })

    const marmotWrapper = container.querySelector('[data-home-marmot-wrapper]')

    expect(marmotWrapper).not.toBeNull()
    expect(marmotWrapper).toHaveAttribute(
      'data-home-marmot-hover-active',
      'true',
    )
  })

  it('keeps the marmot hover pose inactive when home hover is disabled', () => {
    const { container } = renderHomePage({
      homeHoverRegion: 'mascot',
      isHomeInteractive: false,
    })

    const marmotWrapper = container.querySelector('[data-home-marmot-wrapper]')

    expect(marmotWrapper).not.toBeNull()
    expect(marmotWrapper).toHaveAttribute(
      'data-home-marmot-hover-active',
      'false',
    )
  })

  it('clears the roots hover region on blur and mouse leave', () => {
    const { clearHomeHoverRegion } = renderHomePage()

    const trigger = screen.getByRole('button', {
      name: /enter non-profit roots/i,
    })

    fireEvent.blur(trigger)
    fireEvent.mouseLeave(trigger)

    expect(clearHomeHoverRegion).toHaveBeenCalledTimes(2)
  })

  it('renders the airplane banner without banner-specific motion styles', () => {
    renderHomePage()

    const styles = Array.from(document.head.querySelectorAll('style'))
      .map((styleTag) => styleTag.textContent ?? '')
      .join('\n')

    expect(styles).not.toContain('#banner-rig')
    expect(styles).not.toContain('#banner-group')
    expect(styles).not.toContain('#banner-fabric')
    expect(styles).not.toContain('#banner-highlight-strip')
    expect(styles).not.toContain('#banner-text{animation:')
    expect(styles).not.toContain('#tow-line{animation:')
  })

  it('scopes portrait phone composition to the shared viewport layout contract', () => {
    const { container } = renderHomePage()

    const clip = container.querySelector('[data-home-marmot-clip]')
    expect(clip).not.toBeNull()

    const styles = Array.from(document.head.querySelectorAll('style'))
      .map((styleTag) => styleTag.textContent ?? '')
      .join('\n')
    const normalizedStyles = normalizeCss(styles)

    expect(normalizedStyles).toContain(
      "[data-viewport-layout='phone-portrait']",
    )
    expect(normalizedStyles).toContain(
      'right:calc(-127*var(--hkw-viewport-px-unit))',
    )
    expect(normalizedStyles).not.toContain('(pointer:coarse)')
    expect(normalizedStyles).not.toContain('@media(max-width:767px)')
  })

  it('renders the plane propeller with a perpendicular spin treatment', () => {
    renderHomePage()

    const styles = Array.from(document.head.querySelectorAll('style'))
      .map((styleTag) => styleTag.textContent ?? '')
      .join('\n')

    expect(styles).toContain('scaleY(0.12)')
    expect(styles).toContain('rotateX(90deg)')
    expect(styles).not.toContain('transform:rotate(360deg)')
  })

  it('links policies to the local policy route', () => {
    renderHomePage()

    expect(screen.getByRole('link', { name: 'Policies' })).toHaveAttribute(
      'href',
      '/policy',
    )
  })
})
