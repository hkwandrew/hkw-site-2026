import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router'
import { fireEvent, render, screen } from '@/__tests__/testUtils'
import Header from '@/app/layout/Header'

const renderHeader = (initialEntries = ['/contact']) =>
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <Header />
    </MemoryRouter>,
  )

describe('Header', () => {
  let isPhoneViewport = false
  const originalMatchMedia = window.matchMedia
  const originalResizeObserver = window.ResizeObserver
  const originalRequestAnimationFrame = window.requestAnimationFrame

  beforeAll(() => {
    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: isPhoneViewport,
      media: '',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    window.ResizeObserver = class ResizeObserver {
      observe() {}
      disconnect() {}
      unobserve() {}
    }
  })

  afterAll(() => {
    window.matchMedia = originalMatchMedia
    window.ResizeObserver = originalResizeObserver
    window.requestAnimationFrame = originalRequestAnimationFrame
  })

  it('does not capture pointer events across the full header width', () => {
    renderHeader()

    expect(getComputedStyle(screen.getByRole('banner')).pointerEvents).toBe('none')
  })

  it('keeps the desktop navigation interactive', () => {
    renderHeader()

    expect(getComputedStyle(screen.getByRole('navigation')).pointerEvents).toBe('auto')
  })

  it('uses the orange page label on the about page', () => {
    renderHeader(['/about'])

    expect(getComputedStyle(screen.getByText('Kind Words')).color).toBe(
      'rgb(208, 71, 27)',
    )
  })

  it('focuses the first mobile nav link when the menu opens', () => {
    isPhoneViewport = true
    window.requestAnimationFrame = vi.fn((callback) => {
      callback(0)
      return 1
    })

    renderHeader(['/'])
    fireEvent.click(screen.getByRole('button', { name: 'Open navigation menu' }))
    fireEvent.keyDown(document, { key: 'Tab' })

    expect(screen.getByRole('dialog', { name: 'Mobile navigation' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Close navigation menu' })).toHaveAttribute(
      'tabindex',
      '-1',
    )
    expect(screen.getByRole('link', { name: 'About' })).toHaveFocus()

    isPhoneViewport = false
    window.requestAnimationFrame = originalRequestAnimationFrame
  })
})
