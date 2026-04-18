import { render } from '@/__tests__/testUtils'
import { MemoryRouter } from 'react-router'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import NavMenu from '@/app/layout/NavMenu'

const originalRequestAnimationFrame = window.requestAnimationFrame
const originalCancelAnimationFrame = window.cancelAnimationFrame
const originalResizeObserver = window.ResizeObserver
const originalGetBoundingClientRect = HTMLElement.prototype.getBoundingClientRect

const renderNavMenu = (activePathname) =>
  render(
    <MemoryRouter initialEntries={['/about']}>
      <NavMenu activePathname={activePathname} />
    </MemoryRouter>,
  )

describe('NavMenu', () => {
  beforeEach(() => {
    window.requestAnimationFrame = vi.fn((callback) => {
      callback(0)
      return 1
    })
    window.cancelAnimationFrame = vi.fn()
    window.ResizeObserver = class {
      observe() {}
      disconnect() {}
      unobserve() {}
    }

    HTMLElement.prototype.getBoundingClientRect = function getBoundingClientRect() {
      const text = this.textContent?.trim()

      if (text === 'About') {
        return {
          x: 0,
          y: 0,
          width: 100,
          height: 62,
          top: 0,
          left: 0,
          right: 100,
          bottom: 62,
        }
      }

      if (text === 'Services') {
        return {
          x: 100,
          y: 0,
          width: 120,
          height: 62,
          top: 0,
          left: 100,
          right: 220,
          bottom: 62,
        }
      }

      if (text === 'Work') {
        return {
          x: 220,
          y: 0,
          width: 90,
          height: 62,
          top: 0,
          left: 220,
          right: 310,
          bottom: 62,
        }
      }

      return {
        x: 0,
        y: 0,
        width: 310,
        height: 62,
        top: 0,
        left: 0,
        right: 310,
        bottom: 62,
      }
    }
  })

  afterEach(() => {
    window.requestAnimationFrame = originalRequestAnimationFrame
    window.cancelAnimationFrame = originalCancelAnimationFrame
    window.ResizeObserver = originalResizeObserver
    HTMLElement.prototype.getBoundingClientRect = originalGetBoundingClientRect
  })

  it('fades the pill out in place when there is no active route', () => {
    const { container, rerender } = renderNavMenu('/about')
    const navContent = container.querySelector('nav > div')

    expect(navContent?.style.getPropertyValue('--pill-x')).toBe('0px')
    expect(navContent?.style.getPropertyValue('--pill-w')).toBe('100px')
    expect(navContent?.style.getPropertyValue('--pill-h')).toBe('62px')
    expect(navContent?.style.getPropertyValue('--pill-o')).toBe('1')

    rerender(
      <MemoryRouter initialEntries={['/about']}>
          <NavMenu activePathname='/' />
      </MemoryRouter>,
    )

    expect(navContent?.style.getPropertyValue('--pill-x')).toBe('0px')
    expect(navContent?.style.getPropertyValue('--pill-w')).toBe('100px')
    expect(navContent?.style.getPropertyValue('--pill-h')).toBe('62px')
    expect(navContent?.style.getPropertyValue('--pill-o')).toBe('0')
  })

  it('uses the same active route for the pill and current link state', () => {
    const { container } = renderNavMenu('/work')
    const navContent = container.querySelector('nav > div')
    const aboutLink = Array.from(container.querySelectorAll('a')).find(
      (link) => link.textContent === 'About',
    )
    const workLink = Array.from(container.querySelectorAll('a')).find(
      (link) => link.textContent === 'Work',
    )

    expect(aboutLink).not.toHaveAttribute('aria-current', 'page')
    expect(workLink).toHaveAttribute('aria-current', 'page')
    expect(navContent?.style.getPropertyValue('--pill-x')).toBe('220px')
    expect(navContent?.style.getPropertyValue('--pill-w')).toBe('90px')
    expect(navContent?.style.getPropertyValue('--pill-h')).toBe('62px')
    expect(navContent?.style.getPropertyValue('--pill-o')).toBe('1')
  })
})
