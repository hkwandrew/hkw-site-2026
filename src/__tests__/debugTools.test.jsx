import { fireEvent, render, screen } from '@/__tests__/testUtils'
import { MemoryRouter } from 'react-router'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import DebugHud from '@/app/debug/DebugHud'
import { DEBUG_STORAGE_KEY } from '@/app/debug/debugState'
import {
  clearOverflowHighlights,
  scanPageOverflow,
} from '@/app/debug/overflowScanner'

const originalMatchMedia = window.matchMedia
const originalLocalStorage = window.localStorage
const originalInnerWidth = window.innerWidth
const originalInnerHeight = window.innerHeight
const originalDevicePixelRatio = window.devicePixelRatio

const createLocalStorageMock = () => {
  const values = new Map()

  return {
    clear: vi.fn(() => {
      values.clear()
    }),
    getItem: vi.fn((key) => values.get(key) ?? null),
    removeItem: vi.fn((key) => {
      values.delete(key)
    }),
    setItem: vi.fn((key, value) => {
      values.set(key, String(value))
    }),
  }
}

const setWindowMetric = (key, value) => {
  Object.defineProperty(window, key, {
    configurable: true,
    value,
  })
}

const setElementRect = (element, rect) => {
  element.getBoundingClientRect = vi.fn(() => ({
    bottom: rect.bottom ?? 0,
    height: rect.height ?? 0,
    left: rect.left ?? 0,
    right: rect.right ?? 0,
    top: rect.top ?? 0,
    width: rect.width ?? 0,
    x: rect.left ?? 0,
    y: rect.top ?? 0,
    toJSON: () => {},
  }))
}

const mockMatchMedia = (matchingQueries = []) => {
  const matches = new Set(matchingQueries)

  window.matchMedia = vi.fn((query) => ({
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    matches: matches.has(query),
    media: query,
  }))
}

describe('DebugHud', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: createLocalStorageMock(),
    })
    window.localStorage.clear()
    document.documentElement.removeAttribute('data-hkw-debug-tools')
    setWindowMetric('innerWidth', 393)
    setWindowMetric('innerHeight', 640)
    setWindowMetric('devicePixelRatio', 2)
    mockMatchMedia([
      '(max-width: 767px)',
      '(pointer: coarse)',
      '(hover: none)',
    ])
  })

  afterEach(() => {
    window.localStorage.clear()
    document.querySelector('#hud-overflow')?.remove()
    document.documentElement.removeAttribute('data-hkw-debug-tools')
    clearOverflowHighlights()
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: originalLocalStorage,
    })
    window.matchMedia = originalMatchMedia
    setWindowMetric('innerWidth', originalInnerWidth)
    setWindowMetric('innerHeight', originalInnerHeight)
    setWindowMetric('devicePixelRatio', originalDevicePixelRatio)
  })

  it('renders viewport and route details when enabled by query param', () => {
    render(
      <MemoryRouter initialEntries={['/work/celdf?debug=1']}>
        <DebugHud />
      </MemoryRouter>,
    )

    expect(screen.getByTestId('debug-hud')).toHaveTextContent('393 x 640')
    expect(screen.getByTestId('debug-hud')).toHaveTextContent('ratio 0.614')
    expect(screen.getByTestId('debug-hud')).toHaveTextContent('dpr 2')
    expect(screen.getByTestId('debug-hud')).toHaveTextContent(
      'route /work/celdf',
    )
    expect(screen.getByTestId('debug-hud')).toHaveTextContent(
      'family /work',
    )
    expect(screen.getByTestId('debug-hud')).toHaveTextContent(
      'pointer coarse',
    )
    expect(screen.getByTestId('debug-hud')).toHaveTextContent('hover none')
    expect(screen.getByText('mobile')).toHaveAttribute('data-active', 'true')
    expect(screen.getByText('wide')).toHaveAttribute('data-active', 'false')
    expect(screen.getByText('coarse')).toHaveAttribute('data-active', 'true')
    expect(window.localStorage.getItem(DEBUG_STORAGE_KEY)).toBe('1')
    expect(document.documentElement).toHaveAttribute(
      'data-hkw-debug-tools',
      'true',
    )
  })

  it('uses the stored debug preference when the query param is absent', () => {
    window.localStorage.setItem(DEBUG_STORAGE_KEY, '1')

    render(
      <MemoryRouter initialEntries={['/roots/meals-on-wheels']}>
        <DebugHud />
      </MemoryRouter>,
    )

    expect(screen.getByTestId('debug-hud')).toHaveTextContent(
      'route /roots/meals-on-wheels',
    )
  })

  it('clears the stored debug preference when disabled by query param', () => {
    window.localStorage.setItem(DEBUG_STORAGE_KEY, '1')

    render(
      <MemoryRouter initialEntries={['/?debug=0']}>
        <DebugHud />
      </MemoryRouter>,
    )

    expect(screen.queryByTestId('debug-hud')).toBeNull()
    expect(window.localStorage.getItem(DEBUG_STORAGE_KEY)).toBeNull()
    expect(document.documentElement).not.toHaveAttribute(
      'data-hkw-debug-tools',
    )
  })

  it('stays hidden when no query or stored preference is present', () => {
    render(
      <MemoryRouter initialEntries={['/work']}>
        <DebugHud />
      </MemoryRouter>,
    )

    expect(screen.queryByTestId('debug-hud')).toBeNull()
    expect(document.documentElement).not.toHaveAttribute(
      'data-hkw-debug-tools',
    )
  })

  it('runs the overflow scan from the HUD action', () => {
    const overflowingElement = document.createElement('div')
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const tableSpy = vi.spyOn(console, 'table').mockImplementation(() => {})

    overflowingElement.id = 'hud-overflow'
    document.body.append(overflowingElement)
    setElementRect(overflowingElement, { right: 420, width: 420 })

    render(
      <MemoryRouter initialEntries={['/work?debug=1']}>
        <DebugHud />
      </MemoryRouter>,
    )

    fireEvent.click(
      screen.getByRole('button', {
        name: /scan overflow/i,
      }),
    )

    expect(overflowingElement).toHaveAttribute(
      'data-hkw-debug-overflow',
      'true',
    )
    expect(screen.getByText('overflow 1')).toBeInTheDocument()
    expect(warnSpy).toHaveBeenCalledWith(
      '[hkw-debug] 1 horizontal overflow element(s) found',
    )

    warnSpy.mockRestore()
    tableSpy.mockRestore()
  })
})

describe('overflow scanner', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('marks and logs elements that extend past the viewport edge', () => {
    document.body.innerHTML = `
      <main>
        <section data-testid='fits'></section>
        <section data-testid='small-overflow'></section>
        <section data-testid='large-overflow'></section>
      </main>
    `
    const fits = document.querySelector('[data-testid="fits"]')
    const smallOverflow = document.querySelector(
      '[data-testid="small-overflow"]',
    )
    const largeOverflow = document.querySelector(
      '[data-testid="large-overflow"]',
    )
    const logger = {
      table: vi.fn(),
      warn: vi.fn(),
    }

    setElementRect(fits, { right: 100, width: 100 })
    setElementRect(smallOverflow, { right: 128, width: 128 })
    setElementRect(largeOverflow, { right: 148, width: 148 })

    const result = scanPageOverflow({
      logger,
      root: document.body,
      viewportWidth: 120,
    })

    expect(result).toHaveLength(2)
    expect(result[0].element).toBe(largeOverflow)
    expect(result[0].overflowRight).toBe(28)
    expect(result[1].element).toBe(smallOverflow)
    expect(result[1].overflowRight).toBe(8)
    expect(largeOverflow).toHaveAttribute('data-hkw-debug-overflow', 'true')
    expect(largeOverflow).toHaveAttribute(
      'data-hkw-debug-overflow-right',
      '28',
    )
    expect(smallOverflow).toHaveAttribute('data-hkw-debug-overflow', 'true')
    expect(fits).not.toHaveAttribute('data-hkw-debug-overflow')
    expect(logger.warn).toHaveBeenCalledWith(
      '[hkw-debug] 2 horizontal overflow element(s) found',
    )
    expect(logger.table).toHaveBeenCalledWith([
      expect.objectContaining({
        overflowRight: 28,
        selector: 'main > section[data-testid="large-overflow"]',
      }),
      expect.objectContaining({
        overflowRight: 8,
        selector: 'main > section[data-testid="small-overflow"]',
      }),
    ])
  })

  it('clears previous overflow highlights before rescanning', () => {
    document.body.innerHTML = `
      <main>
        <section data-testid='previous-overflow'></section>
      </main>
    `
    const previousOverflow = document.querySelector(
      '[data-testid="previous-overflow"]',
    )

    setElementRect(previousOverflow, { right: 148, width: 148 })

    scanPageOverflow({
      logger: null,
      root: document.body,
      viewportWidth: 120,
    })

    expect(previousOverflow).toHaveAttribute('data-hkw-debug-overflow', 'true')

    setElementRect(previousOverflow, { right: 118, width: 118 })

    expect(
      scanPageOverflow({
        logger: null,
        root: document.body,
        viewportWidth: 120,
      }),
    ).toEqual([])
    expect(previousOverflow).not.toHaveAttribute('data-hkw-debug-overflow')
    expect(previousOverflow).not.toHaveAttribute(
      'data-hkw-debug-overflow-right',
    )
  })

  it('can clear highlights without running a new scan', () => {
    document.body.innerHTML = `
      <main>
        <section data-hkw-debug-overflow='true' data-hkw-debug-overflow-right='12'></section>
      </main>
    `

    clearOverflowHighlights(document.body)

    expect(
      document.querySelector('[data-hkw-debug-overflow]'),
    ).not.toBeInTheDocument()
  })
})
