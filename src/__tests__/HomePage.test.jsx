import { act, fireEvent, render, screen } from '@/__tests__/testUtils'
import { MemoryRouter } from 'react-router'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { HomeHoverProvider } from '@/routes/home/homeHoverContext'
import HomePage from '@/routes/home/HomePage'

const mockNavigate = vi.fn()
const originalMatchMedia = window.matchMedia

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router')

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

const renderHomePage = ({
  clearHomeHoverRegion = vi.fn(),
  setHomeHoverRegion = vi.fn(),
} = {}) => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <HomeHoverProvider
        value={{
          clearHomeHoverRegion,
          homeHoverRegion: null,
          isHome: true,
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
      vi.advanceTimersByTime(420)
    })

    expect(mockNavigate).toHaveBeenCalledWith('/roots', {
      state: { fromRootsDive: true },
    })
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
})
