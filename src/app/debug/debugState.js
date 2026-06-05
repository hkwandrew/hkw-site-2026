import theme from '@/styles/theme'

export const DEBUG_STORAGE_KEY = 'hkw-debug-tools'

const DEBUG_QUERY_PARAM = 'debug'
const MOBILE_MEDIA_QUERY = `(max-width: ${theme.breakpoints.mobile})`

export const DEBUG_MEDIA_QUERIES = [
  {
    id: 'mobile',
    label: 'mobile',
    query: MOBILE_MEDIA_QUERY,
  },
  {
    id: 'wide',
    label: 'wide',
    query: '(min-aspect-ratio: 1440/1024)',
  },
  {
    id: 'coarse',
    label: 'coarse',
    query: '(pointer: coarse)',
  },
]

const POINTER_QUERIES = [
  ['coarse', '(pointer: coarse)'],
  ['fine', '(pointer: fine)'],
  ['none', '(pointer: none)'],
]

const HOVER_QUERIES = [
  ['hover', '(hover: hover)'],
  ['none', '(hover: none)'],
]

export const getStorage = () => {
  try {
    const storage = window.localStorage

    if (
      !storage ||
      typeof storage.getItem !== 'function' ||
      typeof storage.removeItem !== 'function' ||
      typeof storage.setItem !== 'function'
    ) {
      return null
    }

    return storage
  } catch {
    return null
  }
}

export const getDebugQueryPreference = (search) => {
  const value = new URLSearchParams(search).get(DEBUG_QUERY_PARAM)

  if (value === null) return null

  if (['1', 'true', 'on'].includes(value.toLowerCase())) return true
  if (['0', 'false', 'off'].includes(value.toLowerCase())) return false

  return null
}

export const readStoredDebugPreference = (storage = getStorage()) =>
  storage?.getItem(DEBUG_STORAGE_KEY) === '1'

export const writeStoredDebugPreference = (
  enabled,
  storage = getStorage(),
) => {
  if (!storage) return

  if (enabled) {
    storage.setItem(DEBUG_STORAGE_KEY, '1')
    return
  }

  storage.removeItem(DEBUG_STORAGE_KEY)
}

export const getDebugHudEnabled = ({
  search = window.location.search,
  storage = getStorage(),
} = {}) => {
  const queryPreference = getDebugQueryPreference(search)

  if (queryPreference !== null) return queryPreference

  return readStoredDebugPreference(storage)
}

const getMediaMatch = (query, win = window) =>
  Boolean(win.matchMedia?.(query).matches)

const getFirstMatchedMediaValue = (queries, win = window) =>
  queries.find(([, query]) => getMediaMatch(query, win))?.[0] ?? 'unknown'

export const getViewportDebugSnapshot = (win = window) => {
  const width = win.innerWidth
  const height = win.innerHeight

  return {
    devicePixelRatio: win.devicePixelRatio ?? 1,
    height,
    hover: getFirstMatchedMediaValue(HOVER_QUERIES, win),
    media: DEBUG_MEDIA_QUERIES.map((item) => ({
      ...item,
      matches: getMediaMatch(item.query, win),
    })),
    pointer: getFirstMatchedMediaValue(POINTER_QUERIES, win),
    ratio: height ? width / height : 0,
    width,
  }
}

export const subscribeToDebugMediaQueries = (win, updateSnapshot) => {
  const queries = [
    ...DEBUG_MEDIA_QUERIES.map(({ query }) => query),
    ...POINTER_QUERIES.map(([, query]) => query),
    ...HOVER_QUERIES.map(([, query]) => query),
  ]
  const mediaQueryLists = queries.map((query) => win.matchMedia(query))

  mediaQueryLists.forEach((mediaQueryList) => {
    mediaQueryList.addEventListener?.('change', updateSnapshot)
    mediaQueryList.addListener?.(updateSnapshot)
  })

  return () => {
    mediaQueryLists.forEach((mediaQueryList) => {
      mediaQueryList.removeEventListener?.('change', updateSnapshot)
      mediaQueryList.removeListener?.(updateSnapshot)
    })
  }
}
