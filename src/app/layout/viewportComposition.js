import { useSyncExternalStore } from 'react'
import {
  DESKTOP_VIEWPORT_HEIGHT,
  DESKTOP_VIEWPORT_WIDTH,
} from '@/styles/viewportUnits'

export const VIEWPORT_LAYOUT = Object.freeze({
  BASE: 'base',
  PHONE_PORTRAIT: 'phone-portrait',
  PHONE_LANDSCAPE: 'phone-landscape',
  TABLET: 'tablet',
  SHORT_DESKTOP: 'short-desktop',
})

const PHONE_MAX_WIDTH = 767
const TABLET_MAX_WIDTH = 1024
const SHORT_DESKTOP_MAX_HEIGHT = 820

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
  layout: VIEWPORT_LAYOUT.BASE,
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
  if (width <= PHONE_MAX_WIDTH && width > height) {
    return VIEWPORT_LAYOUT.PHONE_LANDSCAPE
  }

  if (width <= PHONE_MAX_WIDTH) {
    return VIEWPORT_LAYOUT.PHONE_PORTRAIT
  }

  if (width <= TABLET_MAX_WIDTH) {
    return VIEWPORT_LAYOUT.TABLET
  }

  if (height <= SHORT_DESKTOP_MAX_HEIGHT) {
    return VIEWPORT_LAYOUT.SHORT_DESKTOP
  }

  return VIEWPORT_LAYOUT.BASE
}

export const getSceneViewportKeyForLayout = (layout) => {
  switch (layout) {
    case VIEWPORT_LAYOUT.PHONE_PORTRAIT:
      return 'phonePortrait'
    case VIEWPORT_LAYOUT.PHONE_LANDSCAPE:
      return 'phoneLandscape'
    case VIEWPORT_LAYOUT.TABLET:
      return 'tablet'
    case VIEWPORT_LAYOUT.SHORT_DESKTOP:
      return 'shortDesktop'
    case VIEWPORT_LAYOUT.BASE:
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
