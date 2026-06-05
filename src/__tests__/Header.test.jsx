import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router'
import { fireEvent, render, screen, within } from '@/__tests__/testUtils'
import Header from '@/app/layout/Header'
import { convertCssPxToViewportUnit } from '@/styles/viewportUnits'

const renderHeader = (initialEntries = ['/contact'], props = {}) =>
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <Header {...props} />
    </MemoryRouter>,
  )

describe('Header', () => {
  const originalMatchMedia = window.matchMedia
  const originalInnerHeight = window.innerHeight
  const originalInnerWidth = window.innerWidth
  const originalResizeObserver = window.ResizeObserver
  const originalRequestAnimationFrame = window.requestAnimationFrame
  const originalCancelAnimationFrame = window.cancelAnimationFrame

  const setViewportSize = (width, height) => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: width,
    })
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: height,
    })
  }

  beforeAll(() => {
    setViewportSize(1440, 1024)
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches:
        query === '(hover: hover)' || query === '(pointer: fine)',
      media: query,
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

  afterEach(() => {
    setViewportSize(1440, 1024)
    window.requestAnimationFrame = originalRequestAnimationFrame
    window.cancelAnimationFrame = originalCancelAnimationFrame
    document.body.style.overflow = ''
    document.body.style.touchAction = ''
    delete document.body.dataset.mobileNavOpen
  })

  afterAll(() => {
    window.matchMedia = originalMatchMedia
    setViewportSize(originalInnerWidth, originalInnerHeight)
    window.ResizeObserver = originalResizeObserver
    window.requestAnimationFrame = originalRequestAnimationFrame
    window.cancelAnimationFrame = originalCancelAnimationFrame
  })

  const openMobileNavigation = () => {
    const menuButton = screen.getByRole('button', {
      name: 'Open navigation menu',
    })

    fireEvent.click(menuButton)

    const dialog = screen.getByRole('dialog', {
      name: 'Mobile navigation',
    })

    return { dialog, menuButton }
  }

  it('does not capture pointer events across the full header width', () => {
    renderHeader()

    expect(getComputedStyle(screen.getByRole('banner')).pointerEvents).toBe('none')
  })

  it('keeps the desktop navigation interactive', () => {
    renderHeader()

    expect(getComputedStyle(screen.getByRole('navigation')).pointerEvents).toBe('auto')
  })

  it('renders the about page label from the active content route', () => {
    renderHeader(['/about'])

    expect(screen.getByText('Kind Words')).toBeInTheDocument()
  })

  it('applies the route-owned logo backing on the work page', () => {
    const { container } = renderHeader(['/work'], {
      contentPathname: '/work',
    })

    const logoLink = container.querySelector('header > div a[href="/"]')

    expect(
      getComputedStyle(logoLink).getPropertyValue('--logo-background').trim(),
    ).not.toBe('')
  })

  it('renders the roots desktop header with the roots nav scheme and Work active', () => {
    const { container } = renderHeader(['/roots'], {
      contentPathname: '/roots',
    })

    const logoLink = container.querySelector('header > div a[href="/"]')
    const navContent = container.querySelector('nav > div')

    expect(screen.queryByText('Non-profit Roots')).not.toBeInTheDocument()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Work' })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(
      getComputedStyle(logoLink).getPropertyValue('--fill-0').trim(),
    ).not.toBe('')
    expect(navContent).toHaveAttribute('data-nav-scheme', 'roots')
  })

  it('keeps the services logo color inside the SVG instead of the link box', () => {
    const { container } = renderHeader(['/services'], {
      contentPathname: '/services',
    })

    const logoLink = container.querySelector('header > div a[href="/"]')

    expect(getComputedStyle(logoLink).backgroundColor).toBe(
      'rgba(0, 0, 0, 0)',
    )
    expect(
      getComputedStyle(logoLink).getPropertyValue('--logo-background').trim(),
    ).not.toBe('')
  })

  it('renders the roots mobile header without a page label and keeps controls available', () => {
    setViewportSize(375, 667)

    const { container } = renderHeader(['/roots'], {
      contentPathname: '/roots',
    })

    const logoLink = container.querySelector('header > div a[href="/"]')
    const menuButton = screen.getByRole('button', {
      name: 'Open navigation menu',
    })

    expect(screen.queryByText('Non-profit Roots')).not.toBeInTheDocument()
    expect(getComputedStyle(logoLink).getPropertyValue('--fill-0').trim()).not.toBe(
      '',
    )
    expect(menuButton).toBeInTheDocument()
  })

  it('positions the services mobile nav toggle higher than default pages', () => {
    setViewportSize(375, 667)

    renderHeader(['/services'], {
      contentPathname: '/services',
    })

    const menuButton = screen.getByRole('button', {
      name: 'Open navigation menu',
    })

    expect(getComputedStyle(menuButton).translate).toBe(
      convertCssPxToViewportUnit('0 -24px'),
    )
  })

  it('keeps the desktop navigation for phone landscape composition', () => {
    setViewportSize(667, 375)

    renderHeader(['/services'], {
      contentPathname: '/services',
    })

    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(
      screen.queryByRole('button', {
        name: 'Open navigation menu',
      }),
    ).not.toBeInTheDocument()
  })

  it('hides the page label immediately and fades it in when the page is ready', () => {
    const { rerender } = renderHeader(['/services'], {
      contentPathname: '/services',
      isPageLabelReady: true,
    })

    expect(getComputedStyle(screen.getByText('Our Specialties')).opacity).toBe(
      '1',
    )
    expect(screen.getByText('Our Specialties')).toHaveAttribute(
      'aria-hidden',
      'false',
    )

    rerender(
      <MemoryRouter initialEntries={['/services']}>
        <Header contentPathname='/services' isPageLabelReady={false} />
      </MemoryRouter>,
    )

    expect(getComputedStyle(screen.getByText('Our Specialties')).opacity).toBe(
      '0',
    )
    expect(screen.getByText('Our Specialties')).toHaveAttribute(
      'aria-hidden',
      'true',
    )

    rerender(
      <MemoryRouter initialEntries={['/work']}>
        <Header contentPathname='/work' isPageLabelReady={false} />
      </MemoryRouter>,
    )

    expect(getComputedStyle(screen.getByText('Our Work')).opacity).toBe('0')
    expect(screen.getByText('Our Work')).toHaveAttribute('aria-hidden', 'true')

    rerender(
      <MemoryRouter initialEntries={['/work']}>
        <Header contentPathname='/work' isPageLabelReady />
      </MemoryRouter>,
    )

    expect(getComputedStyle(screen.getByText('Our Work')).opacity).toBe('1')
    expect(screen.getByText('Our Work')).toHaveAttribute(
      'aria-hidden',
      'false',
    )
  })

  it('focuses the first mobile drawer link when the menu opens', () => {
    setViewportSize(375, 667)
    window.requestAnimationFrame = vi.fn((callback) => {
      callback(0)
      return 1
    })

    renderHeader(['/'])
    const { dialog, menuButton } = openMobileNavigation()

    expect(dialog).toBeVisible()
    expect(within(dialog).getByRole('button', { name: 'Close navigation menu' })).toBeVisible()
    expect(menuButton).toHaveAttribute('aria-hidden', 'true')
    expect(within(dialog).getAllByRole('link')[0]).toHaveFocus()
  })

  it('focuses the active mobile nav link when the current page is in the drawer', () => {
    setViewportSize(375, 667)
    window.requestAnimationFrame = vi.fn((callback) => {
      callback(0)
      return 1
    })

    renderHeader(['/roots'], {
      contentPathname: '/roots',
    })
    const { dialog } = openMobileNavigation()

    expect(within(dialog).getByRole('link', { name: 'Non-Profits' })).toHaveFocus()
  })

  it('renders a right-edge off-canvas drawer with the mobile nav order', () => {
    setViewportSize(375, 667)

    renderHeader(['/work'], {
      contentPathname: '/work',
    })
    const { dialog } = openMobileNavigation()
    const drawerStyles = getComputedStyle(dialog)
    const primaryNav = within(dialog).getByRole('navigation', {
      name: 'Primary mobile navigation',
    })
    const linkLabels = within(primaryNav)
      .getAllByRole('link')
      .map((link) => link.textContent)

    expect(drawerStyles.position).toBe('fixed')
    expect(drawerStyles.right).toBe('0px')
    expect(drawerStyles.width).toBe(
      convertCssPxToViewportUnit('min(86vw, 360px)'),
    )
    expect(drawerStyles.height).toBe('100dvh')
    expect(linkLabels).toEqual([
      'About',
      'Services',
      'Work',
      'Non-Profits',
      'Contact',
    ])
    expect(within(dialog).getByRole('link', { name: 'Work' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })

  it('locks body scroll while the mobile drawer is open and clears it on close', () => {
    setViewportSize(375, 667)

    renderHeader(['/contact'], {
      contentPathname: '/contact',
    })
    const { dialog } = openMobileNavigation()

    expect(document.body.dataset.mobileNavOpen).toBe('true')
    expect(document.body.style.overflow).toBe('hidden')
    expect(document.body.style.touchAction).toBe('none')

    fireEvent.click(within(dialog).getByRole('button', { name: 'Close navigation menu' }))

    expect(screen.queryByRole('dialog', { name: 'Mobile navigation' })).not.toBeInTheDocument()
    expect(document.body.dataset.mobileNavOpen).toBeUndefined()
    expect(document.body.style.overflow).toBe('')
    expect(document.body.style.touchAction).toBe('')
  })

  it('closes the mobile drawer with Escape and backdrop clicks', () => {
    setViewportSize(375, 667)

    const { rerender } = renderHeader(['/services'], {
      contentPathname: '/services',
    })
    let { dialog } = openMobileNavigation()

    fireEvent.keyDown(document, { key: 'Escape' })

    expect(screen.queryByRole('dialog', { name: 'Mobile navigation' })).not.toBeInTheDocument()

    rerender(
      <MemoryRouter initialEntries={['/services']}>
        <Header contentPathname='/services' />
      </MemoryRouter>,
    )

    dialog = openMobileNavigation().dialog
    fireEvent.mouseDown(dialog.parentElement)

    expect(screen.queryByRole('dialog', { name: 'Mobile navigation' })).not.toBeInTheDocument()
  })
})
