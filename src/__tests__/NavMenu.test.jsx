import { fireEvent, render, screen } from '@/__tests__/testUtils'
import { MemoryRouter } from 'react-router'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import NavMenu from '@/app/layout/NavMenu'

const originalRequestAnimationFrame = window.requestAnimationFrame
const originalCancelAnimationFrame = window.cancelAnimationFrame
const originalResizeObserver = window.ResizeObserver
const originalGetBoundingClientRect = HTMLElement.prototype.getBoundingClientRect

const renderNavMenu = (activePathname, props = {}) =>
  render(
    <MemoryRouter initialEntries={['/about']}>
      <NavMenu activePathname={activePathname} {...props} />
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

      if (text === 'Contact') {
        return {
          x: 310,
          y: 0,
          width: 130,
          height: 62,
          top: 0,
          left: 310,
          right: 440,
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

  it('uses the roots nav scheme while keeping Work active', () => {
    const { container } = renderNavMenu('/work', { isRootsPage: true })
    const navContent = container.querySelector('nav > div')
    const workLink = screen.getByRole('link', { name: 'Work' })
    const contactReveal = container.querySelector('[data-contact-reveal]')
    const contactRevealInner = container.querySelector(
      '[data-contact-reveal-inner]',
    )

    expect(navContent).toHaveAttribute('data-nav-scheme', 'roots')
    expect(workLink).toHaveAttribute('aria-current', 'page')
    expect(contactReveal).toBeInTheDocument()
    expect(contactRevealInner).toBeInTheDocument()
  })

  it('renders Contact as a trailing reveal link outside the primary nav group', () => {
    const { container } = renderNavMenu('/about')
    const primaryLinks = Array.from(container.querySelectorAll('ul a')).map(
      (link) => link.textContent,
    )
    const contactLink = screen.getByRole('link', { name: 'Contact' })

    expect(primaryLinks).toEqual(['About', 'Services', 'Work'])
    expect(contactLink).toHaveAttribute('href', '/contact')
    expect(contactLink).toHaveTextContent('')
    expect(contactLink.querySelector('[data-contact-icon]')).toBeInTheDocument()
  })

  it('keeps the Contact pill out of the primary nav layout while it slides', () => {
    const { container } = renderNavMenu('/about')
    const navContent = container.querySelector('nav > div')
    const primaryNav = container.querySelector('ul')
    const contactReveal = container.querySelector('[data-contact-reveal]')
    const contactRevealInner = container.querySelector(
      '[data-contact-reveal-inner]',
    )

    expect(navContent).toHaveAttribute('data-has-contact-reveal', 'true')
    expect(primaryNav).not.toContainElement(contactReveal)
    expect(getComputedStyle(contactReveal).position).toBe('absolute')
    expect(getComputedStyle(contactReveal).overflow).toBe('hidden')
    expect(getComputedStyle(contactRevealInner).transform).toBe(
      'translateX(-100%)',
    )
  })

  it('disables the trailing Contact reveal and hides the active pill on Contact', () => {
    const { container } = renderNavMenu('/contact')
    const navContent = container.querySelector('nav > div')
    const contactReveal = container.querySelector('[data-contact-reveal]')

    expect(
      screen.queryByRole('link', { name: 'Contact' }),
    ).not.toBeInTheDocument()
    expect(contactReveal).not.toBeInTheDocument()
    expect(navContent?.style.getPropertyValue('--pill-o')).toBe('0')
  })

  it('removes nav focus after a link click and keeps the reveal collapsed until re-entry', () => {
    const { container } = renderNavMenu('/about')
    const navContent = container.querySelector('nav > div')
    const contactLink = screen.getByRole('link', { name: 'Contact' })

    contactLink.focus()
    expect(document.activeElement).toBe(contactLink)

    fireEvent.click(contactLink)

    expect(document.activeElement).not.toBe(contactLink)
    expect(navContent).toHaveAttribute('data-click-collapsed', 'true')

    fireEvent.pointerLeave(navContent)

    expect(navContent).not.toHaveAttribute('data-click-collapsed')
  })
})
