import { useSyncExternalStore } from 'react'
import {
  DESKTOP_VIEWPORT_HEIGHT,
  DESKTOP_VIEWPORT_WIDTH,
} from '@/styles/viewportUnits'
import { BREAKPOINT_WIDTHS } from '@/styles/breakpoints'

export const VIEWPORT_LAYOUT = Object.freeze({
  DESKTOP_FRAME: 'desktop-frame',
  MOBILE_PORTRAIT: 'mobile-portrait',
})

const POINTER_TRAITS = Object.freeze([
  ['(pointer: coarse)', 'coarse'],
  ['(pointer: fine)', 'fine'],
  ['(pointer: none)', 'none'],
])

const HOVER_TRAITS = Object.freeze([
  ['(hover: hover)', 'hover'],
  ['(hover: none)', 'none'],
])

const SUBSCRIPTION_QUERIES = Object.freeze([
  ...POINTER_TRAITS.map(([query]) => query),
  ...HOVER_TRAITS.map(([query]) => query),
])

const DEFAULT_VIEWPORT_COMPOSITION = Object.freeze({
  height: DESKTOP_VIEWPORT_HEIGHT,
  hover: 'unknown',
  layout: VIEWPORT_LAYOUT.DESKTOP_FRAME,
  pointer: 'unknown',
  ratio: DESKTOP_VIEWPORT_WIDTH / DESKTOP_VIEWPORT_HEIGHT,
  sceneViewportKey: 'base',
  width: DESKTOP_VIEWPORT_WIDTH,
})

const snapshotCache = new WeakMap()

const getBrowserWindow = () =>
  typeof window === 'undefined' ? null : window

const getViewportDimensions = (win) => {
  const width = Number(win?.innerWidth) || 0
  const height = Number(win?.innerHeight) || 0

  return { width, height }
}

const getMediaTrait = (win, traits) => {
  if (!win?.matchMedia) return 'unknown'

  const matchedTrait = traits.find(([query]) => {
    try {
      return win.matchMedia(query).matches
    } catch {
      return false
    }
  })

  return matchedTrait?.[1] ?? 'unknown'
}

const getViewportLayout = ({ height, width }) => {
  if (width <= BREAKPOINT_WIDTHS.mobileMax && width <= height) {
    return VIEWPORT_LAYOUT.MOBILE_PORTRAIT
  }

  return VIEWPORT_LAYOUT.DESKTOP_FRAME
}

export const getSceneViewportKeyForLayout = (layout) => {
  switch (layout) {
    case VIEWPORT_LAYOUT.MOBILE_PORTRAIT:
      return 'phonePortrait'
    case VIEWPORT_LAYOUT.DESKTOP_FRAME:
    default:
      return 'base'
  }
}

export const getViewportComposition = (win = getBrowserWindow()) => {
  if (!win) return DEFAULT_VIEWPORT_COMPOSITION

  const { height, width } = getViewportDimensions(win)
  const ratio = height ? width / height : 0
  const layout = getViewportLayout({ height, width })

  return {
    height,
    hover: getMediaTrait(win, HOVER_TRAITS),
    layout,
    pointer: getMediaTrait(win, POINTER_TRAITS),
    ratio,
    sceneViewportKey: getSceneViewportKeyForLayout(layout),
    width,
  }
}

const isSameViewportComposition = (left, right) =>
  left.height === right.height &&
  left.hover === right.hover &&
  left.layout === right.layout &&
  left.pointer === right.pointer &&
  left.ratio === right.ratio &&
  left.sceneViewportKey === right.sceneViewportKey &&
  left.width === right.width

const getCachedViewportComposition = (win = getBrowserWindow()) => {
  if (!win) return DEFAULT_VIEWPORT_COMPOSITION

  const nextSnapshot = getViewportComposition(win)
  const cachedSnapshot = snapshotCache.get(win)

  if (
    cachedSnapshot &&
    isSameViewportComposition(cachedSnapshot, nextSnapshot)
  ) {
    return cachedSnapshot
  }

  snapshotCache.set(win, nextSnapshot)

  return nextSnapshot
}

const addMediaQueryListener = (mediaQuery, onChange) => {
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', onChange)

    return () => mediaQuery.removeEventListener('change', onChange)
  }

  mediaQuery.addListener?.(onChange)

  return () => mediaQuery.removeListener?.(onChange)
}

export const subscribeToViewportComposition = (
  win = getBrowserWindow(),
  onChange,
) => {
  if (!win) return () => {}

  const unsubscribeCallbacks = []

  win.addEventListener?.('resize', onChange)
  win.addEventListener?.('orientationchange', onChange)

  unsubscribeCallbacks.push(() => {
    win.removeEventListener?.('resize', onChange)
    win.removeEventListener?.('orientationchange', onChange)
  })

  if (win.matchMedia) {
    SUBSCRIPTION_QUERIES.forEach((query) => {
      const mediaQuery = win.matchMedia(query)

      unsubscribeCallbacks.push(addMediaQueryListener(mediaQuery, onChange))
    })
  }

  return () => {
    unsubscribeCallbacks.forEach((unsubscribe) => {
      unsubscribe()
    })
  }
}

export const useViewportComposition = () =>
  useSyncExternalStore(
    (onChange) => subscribeToViewportComposition(getBrowserWindow(), onChange),
    () => getCachedViewportComposition(getBrowserWindow()),
    () => DEFAULT_VIEWPORT_COMPOSITION,
  )
