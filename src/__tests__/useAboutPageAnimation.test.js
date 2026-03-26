import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { createElement, useEffect } from 'react'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { PageSceneTransitionProvider } from '@/context/pageSceneTransition'

// Mock GSAP and plugins before importing the hook
vi.mock('gsap', () => {
  const timeline = {
    to: vi.fn().mockReturnThis(),
    addLabel: vi.fn().mockReturnThis(),
    time: vi.fn(() => 0),
  }
  const gsap = {
    timeline: vi.fn(() => timeline),
    to: vi.fn(),
    set: vi.fn(),
    context: vi.fn((fn) => {
      fn()
      return { revert: vi.fn() }
    }),
    registerPlugin: vi.fn(),
  }
  return { default: gsap }
})

vi.mock('gsap/ScrollTrigger', () => ({
  default: {
    refresh: vi.fn(),
    getById: vi.fn(),
  },
}))

vi.mock('gsap/ScrollToPlugin', () => ({
  default: {},
}))

vi.mock('gsap/MorphSVGPlugin', () => ({
  default: {},
}))

describe('useAboutPageAnimation', () => {
  let useAboutPageAnimation

  beforeEach(async () => {
    vi.clearAllMocks()
    const mod = await import('@/hooks/useAboutPageAnimation')
    useAboutPageAnimation = mod.default
  })

  const sceneTransitionValue = {
    transitionSceneToPath: vi.fn(),
  }

  const createWrapper = () => {
    // useBlocker requires a data router, not MemoryRouter
    // Use a plain object + useEffect to capture the hook result without lint violations
    const resultRef = { current: undefined }
    const HookRunner = () => {
      const result = useAboutPageAnimation()
      useEffect(() => {
        resultRef.current = result
      })
      return null
    }

    const router = createMemoryRouter(
      [
        {
          path: '/about',
          element: createElement(
            PageSceneTransitionProvider,
            { value: sceneTransitionValue },
            createElement(HookRunner),
          ),
        },
      ],
      { initialEntries: ['/about'] },
    )

    return { router, getResult: () => resultRef.current }
  }

  it('returns sectionRef and handleScrollHintClick', async () => {
    const { router, getResult } = createWrapper()
    const { unmount } = renderHook(() => null, {
      wrapper: () => createElement(RouterProvider, { router }),
    })

    // Wait for router to settle
    await vi.waitFor(() => {
      const result = getResult()
      expect(result).toBeDefined()
      expect(result).toHaveProperty('sectionRef')
      expect(result).toHaveProperty('handleScrollHintClick')
      expect(typeof result.handleScrollHintClick).toBe('function')
    })

    unmount()
  })

  it('sectionRef starts as null', async () => {
    const { router, getResult } = createWrapper()
    const { unmount } = renderHook(() => null, {
      wrapper: () => createElement(RouterProvider, { router }),
    })

    await vi.waitFor(() => {
      const result = getResult()
      expect(result).toBeDefined()
      expect(result.sectionRef.current).toBeNull()
    })

    unmount()
  })
})
