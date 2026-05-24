import { useState } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { act, fireEvent, render, screen } from '@/__tests__/testUtils'
import RootsPortfolioSlider from '@/routes/roots/RootsPortfolioSlider'

const TestFrame = () => <svg aria-hidden='true' />
const SLIDE_FADE_DURATION_MS = 420
const normalizeCss = (value) => value.replace(/\s+/g, '')
const getInjectedStyles = () =>
  Array.from(document.querySelectorAll('style'))
    .map((styleElement) => styleElement.textContent)
    .join('\n')
const getElementStyles = (element) =>
  Array.from(element.classList)
    .map((className) => {
      const match = getInjectedStyles().match(
        new RegExp(`\\.${className}\\{[^}]*\\}`),
      )

      return match?.[0] ?? ''
    })
    .join('\n')
const expectSlidePaneToFade = (element) => {
  const styles = normalizeCss(getElementStyles(element))

  expect(styles).toContain('animation:')
  expect(styles).toContain('420mscubic-bezier(0.22,1,0.36,1)both')
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

const renderSlider = (title) =>
  render(
    <RootsPortfolioSlider
      item={{
        id: 'test-project',
        title,
        FrameComponent: TestFrame,
        bio: 'A test portfolio item.',
        roles: ['Website Design'],
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
