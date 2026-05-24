import { render, screen } from '@/__tests__/testUtils'
import { describe, expect, it } from 'vitest'
import AboutPage from '@/routes/about/AboutPage'
import {
  ABOUT_FRAME_VISIBILITY,
  ABOUT_HERO_CLOUD,
  ABOUT_MOBILE_HERO_CLOUD,
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
      screen.getAllByText(/Great design isn't just about looking good/i),
    ).toHaveLength(2)
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

  it('renders one desktop hero path and one sticky mobile hero path', () => {
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
    expect(mobileHeroPaths).toHaveLength(1)
    expect(mobileHeroPaths[0]).toHaveAttribute('d', ABOUT_MOBILE_HERO_CLOUD.path)
  })

  it('keeps static mobile cloud content outside the quote panels', () => {
    render(<AboutPage />)

    const staticScene = screen.getByTestId('about-mobile-static-scene')
    const mobilePanels = screen.getAllByTestId('about-mobile-panel')

    expect(staticScene).toHaveTextContent(
      /Great design isn't just about looking good/i,
    )
    expect(mobilePanels).toHaveLength(ABOUT_MOBILE_PANELS.length)
    mobilePanels.forEach((panel) => {
      expect(panel.querySelector('[data-about-hero-path="mobile"]')).toBeNull()
      expect(panel).not.toHaveTextContent(
        /Great design isn't just about looking good/i,
      )
    })
  })

  it('uses each mobile panel as the quote and scroll cue fade timeline', () => {
    const { container } = render(<AboutPage />)
    const quote = container.querySelector('[data-about-mobile-quote="jonathan"]')
    const scrollCue = container.querySelector('[data-about-mobile-scroll-cue]')
    const styles = Array.from(document.querySelectorAll('style'))
      .map((style) => style.textContent)
      .join('\n')
    const timelineMatches =
      styles.match(/animation-timeline:--about-mobile-panel/g) ?? []

    expect(quote).toBeInTheDocument()
    expect(scrollCue).toBeInTheDocument()
    expect(getComputedStyle(quote).position).toBe('absolute')
    expect(styles).toContain('view-timeline-name:--about-mobile-panel')
    expect(timelineMatches.length).toBeGreaterThanOrEqual(2)
  })

  it('hides the intro layer from stageOne onward in the desktop scene', () => {
    expect(ABOUT_FRAME_VISIBILITY[0].intro).toBe(1)
    expect(ABOUT_FRAME_VISIBILITY.slice(1).every((frame) => frame.intro === 0)).toBe(
      true,
    )
  })
})
