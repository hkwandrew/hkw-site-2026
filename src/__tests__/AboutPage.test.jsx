import { render, screen } from '@/__tests__/testUtils'
import { describe, expect, it } from 'vitest'
import AboutPage from '@/routes/about/AboutPage'
import {
  ABOUT_FRAME_VISIBILITY,
  ABOUT_HERO_CLOUD,
  ABOUT_MOBILE_PANELS,
} from '@/routes/about/aboutSceneData'

describe('AboutPage', () => {
  it('renders the desktop scroll hint and opening message', () => {
    render(<AboutPage />)

    expect(
      screen.getByRole('button', {
        name: /scroll for more client testimonials/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getAllByText(/Great design isn't just about looking good/i).length,
    ).toBeGreaterThan(0)
  })

  it('renders one mobile panel per testimonial and includes the final Maplewood panel', () => {
    render(<AboutPage />)

    expect(screen.getAllByTestId('about-mobile-panel')).toHaveLength(
      ABOUT_MOBILE_PANELS.length,
    )
    expect(screen.getAllByText('Nancy Janzen').length).toBeGreaterThan(0)
    expect(screen.getAllByText('CEO at Maplewood').length).toBeGreaterThan(0)
  })

  it('exposes the desktop scroller container for the staged scene', () => {
    render(<AboutPage />)

    expect(screen.getByTestId('about-desktop-scroller')).toBeInTheDocument()
  })

  it('renders a single desktop hero path that starts at stageZero', () => {
    const { container } = render(<AboutPage />)

    const desktopHeroPaths = container.querySelectorAll(
      '[data-about-hero-path="desktop"]',
    )
    const mobileHeroPaths = container.querySelectorAll(
      '[data-about-hero-path="mobile"]',
    )

    expect(desktopHeroPaths).toHaveLength(1)
    expect(desktopHeroPaths[0]).toHaveAttribute(
      'd',
      ABOUT_HERO_CLOUD.paths.stageZero,
    )
    expect(mobileHeroPaths).toHaveLength(ABOUT_MOBILE_PANELS.length)
    expect(mobileHeroPaths[0]).toHaveAttribute('d', ABOUT_HERO_CLOUD.paths.stageOne)
  })

  it('hides the intro layer from stageOne onward in the desktop scene', () => {
    expect(ABOUT_FRAME_VISIBILITY[0].intro).toBe(1)
    expect(ABOUT_FRAME_VISIBILITY.slice(1).every((frame) => frame.intro === 0)).toBe(
      true,
    )
  })
})
