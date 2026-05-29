import { useState } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { act, fireEvent, render, screen } from '@/__tests__/testUtils'
import RootsPortfolioSlider from '@/routes/roots/RootsPortfolioSlider'

const TestFrame = () => <svg aria-hidden='true' />
const SLIDE_FADE_DURATION_MS = 180
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
const expectSlidePaneToFade = (element) => {
  const styles = normalizeCss(getElementStyles(element))

  expect(styles).toContain('animation:')
  expect(styles).toContain('180mscubic-bezier(0.22,1,0.36,1)both')
}

const sliderItems = [
  {
    id: 'first-project',
    title: 'First Project',
    FrameComponent: TestFrame,
    bio: 'The first test portfolio item.',
    roles: ['Website Design'],
  },
  {
    id: 'second-project',
    title: 'Second Project',
    FrameComponent: TestFrame,
    bio: 'The second test portfolio item.',
    roles: ['Brand Strategy'],
  },
]

const renderSlider = (title, itemOverrides = {}) =>
  render(
    <RootsPortfolioSlider
      item={{
        id: 'test-project',
        title,
        FrameComponent: TestFrame,
        bio: 'A test portfolio item.',
        roles: ['Website Design'],
        ...itemOverrides,
      }}
      onClose={vi.fn()}
      onNext={vi.fn()}
      onPrev={vi.fn()}
    />,
  )

const ControlledSlider = () => {
  const [index, setIndex] = useState(0)

  return (
    <RootsPortfolioSlider
      item={sliderItems[index]}
      onClose={vi.fn()}
      onNext={() => setIndex((currentIndex) => (currentIndex + 1) % sliderItems.length)}
      onPrev={() =>
        setIndex(
          (currentIndex) =>
            (currentIndex - 1 + sliderItems.length) % sliderItems.length,
        )
      }
    />
  )
}

afterEach(() => {
  vi.useRealTimers()
})

describe('RootsPortfolioSlider', () => {
  it('renders the dialog in a body portal above the app chrome', () => {
    const { container } = renderSlider('Portal Project')

    const dialog = screen.getByRole('dialog', { name: 'Portal Project' })
    const overlay = dialog.parentElement

    expect(overlay).toHaveAttribute('data-roots-portfolio-overlay')
    expect(container).not.toContainElement(dialog)
  })

  it('keeps the roots scene visible outside the framed modal panel', () => {
    renderSlider('Transparent Overlay Project')

    const dialog = screen.getByRole('dialog', {
      name: 'Transparent Overlay Project',
    })
    const overlay = dialog.parentElement
    const overlayStyles = normalizeCss(getElementStyles(overlay))
    const dialogStyles = normalizeCss(getElementStyles(dialog))

    expect(overlayStyles).toContain('align-items:center')
    expect(overlayStyles).not.toContain('background:#fcfae5')
    expect(dialogStyles).toContain(
      'width:calc(1440*var(--hkw-viewport-px-unit))',
    )
    expect(dialogStyles).toContain(
      'height:calc(1024*var(--hkw-viewport-px-unit))',
    )
    expect(dialogStyles).toContain('background:#fcfae5')
  })

  it('renders separate wooden frame edge chrome', () => {
    renderSlider('Framed Project')

    const frameEdges = Array.from(
      screen
        .getByRole('dialog', { name: 'Framed Project' })
        .querySelectorAll('[data-roots-frame-edge]'),
    )

    expect(frameEdges.map((edge) => edge.dataset.rootsFrameEdge)).toEqual([
      'left',
      'right',
      'top',
      'bottom',
    ])
    expect(
      frameEdges.every((edge) => edge.getAttribute('src')?.includes('.svg')),
    ).toBe(true)
    expect(normalizeCss(getElementStyles(frameEdges[0]))).toContain(
      'height:calc(100%+calc(86*var(--hkw-viewport-px-unit)))',
    )
    expect(normalizeCss(getElementStyles(frameEdges[0]))).toContain(
      'z-index:1',
    )
    expect(normalizeCss(getElementStyles(frameEdges[1]))).toContain(
      'height:calc(100%+calc(104*var(--hkw-viewport-px-unit)))',
    )
    expect(normalizeCss(getElementStyles(frameEdges[1]))).toContain(
      'z-index:1',
    )
    expect(normalizeCss(getElementStyles(frameEdges[0]))).toContain(
      'width:calc(30*var(--hkw-viewport-px-unit))',
    )
    expect(normalizeCss(getElementStyles(frameEdges[0]))).toContain(
      'height:100%',
    )
    expect(normalizeCss(getElementStyles(frameEdges[1]))).toContain(
      'width:calc(30*var(--hkw-viewport-px-unit))',
    )
    expect(normalizeCss(getElementStyles(frameEdges[1]))).toContain(
      'height:100%',
    )
    expect(normalizeCss(getElementStyles(frameEdges[2]))).toContain(
      'z-index:2',
    )
    expect(normalizeCss(getElementStyles(frameEdges[2]))).toContain(
      'left:calc(-28*var(--hkw-viewport-px-unit))',
    )
    expect(normalizeCss(getElementStyles(frameEdges[2]))).toContain(
      'width:calc(100%+calc(56*var(--hkw-viewport-px-unit)))',
    )
    expect(normalizeCss(getElementStyles(frameEdges[2]))).toContain(
      'height:calc(30*var(--hkw-viewport-px-unit))',
    )
    expect(normalizeCss(getElementStyles(frameEdges[3]))).toContain(
      'z-index:2',
    )
    expect(normalizeCss(getElementStyles(frameEdges[3]))).toContain(
      'bottom:calc(-236*var(--hkw-viewport-px-unit))',
    )
    expect(normalizeCss(getElementStyles(frameEdges[3]))).toContain(
      'left:calc(-28*var(--hkw-viewport-px-unit))',
    )
    expect(normalizeCss(getElementStyles(frameEdges[3]))).toContain(
      'width:calc(100%+calc(56*var(--hkw-viewport-px-unit)))',
    )
    expect(normalizeCss(getElementStyles(frameEdges[3]))).toContain(
      'height:calc(30*var(--hkw-viewport-px-unit))',
    )
    expect(normalizeCss(getInjectedStyles())).not.toContain(
      'background-size:cover',
    )
  })

  it('contains detail artwork and resets copy spacing on mobile', () => {
    renderSlider('Mobile Project', {
      detailImage: '/mobile-project.png',
      artworkWidth: 1000,
      artworkHeight: 760,
    })

    const artwork = screen.getByAltText('Mobile Project project artwork')
    const copy = document.querySelector('[data-roots-slide-copy]')
    const nav = document.querySelector('[data-roots-slide-nav]')

    expect(normalizeCss(getElementStyles(artwork))).toContain(
      'object-fit:contain',
    )
    expect(normalizeCss(getElementStyles(copy))).toContain('margin-top:0')
    expect(normalizeCss(getElementStyles(copy))).toContain('padding-inline:')
    expect(normalizeCss(getElementStyles(nav))).not.toContain('linear-gradient')
    expect(normalizeCss(getElementStyles(nav))).not.toContain('background:')
    expect(normalizeCss(getElementStyles(nav))).toContain('position:absolute')
    expect(normalizeCss(getElementStyles(nav))).toContain('padding:0')
  })

  it('uses the contact-style X close button treatment on mobile', () => {
    renderSlider('Mobile Close Project')

    const closeButton = screen.getByRole('button', { name: 'Close' })
    const mobileCloseIcon = closeButton.querySelector(
      '[data-roots-mobile-close-icon]',
    )

    expect(mobileCloseIcon).not.toBeNull()
    expect(mobileCloseIcon).toHaveAttribute('viewBox', '0 0 18 18')
    expect(mobileCloseIcon.querySelector('path')).toHaveAttribute(
      'd',
      'M4 4L14 14M14 4L4 14',
    )
    expect(normalizeCss(getElementStyles(closeButton))).toContain(
      'border-radius:50%',
    )
  })

  it('preserves authored title line breaks', () => {
    renderSlider('Asian & Pacific Islander Coalition \nof Washington')

    const title = screen.getByRole('heading', { level: 2 })

    expect(title.textContent).toBe(
      'Asian & Pacific Islander Coalition \nof Washington',
    )
    expect(title).toHaveStyle({ whiteSpace: 'pre-line' })
  })

  it('fades the current slide out before fading the next slide in', () => {
    vi.useFakeTimers()

    render(<ControlledSlider />)

    fireEvent.click(
      screen.getByRole('button', { name: /show next portfolio piece/i }),
    )

    let slidePane = document.querySelector('[data-roots-slide-pane]')

    expect(slidePane).toHaveAttribute('data-roots-slide-pane', 'leaving')
    expect(screen.getByRole('heading', { name: 'First Project' })).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: 'Second Project' }),
    ).not.toBeInTheDocument()
    expectSlidePaneToFade(slidePane)

    act(() => {
      vi.advanceTimersByTime(SLIDE_FADE_DURATION_MS)
    })

    slidePane = document.querySelector('[data-roots-slide-pane]')

    expect(slidePane).toHaveAttribute('data-roots-slide-pane', 'entering')
    expect(screen.getByRole('heading', { name: 'Second Project' })).toBeInTheDocument()
    expectSlidePaneToFade(slidePane)

    act(() => {
      vi.advanceTimersByTime(SLIDE_FADE_DURATION_MS)
    })

    expect(document.querySelector('[data-roots-slide-pane]')).toHaveAttribute(
      'data-roots-slide-pane',
      'active',
    )
  })
})
