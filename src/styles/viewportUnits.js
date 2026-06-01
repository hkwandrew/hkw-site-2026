export const DESKTOP_VIEWPORT_WIDTH = 1440
export const DESKTOP_VIEWPORT_HEIGHT = 1024
export const MOBILE_VIEWPORT_WIDTH = 393
export const MOBILE_VIEWPORT_HEIGHT = 640
export const VIEWPORT_PX_UNIT_CUSTOM_PROPERTY = '--hkw-viewport-px-unit'
export const CAPPED_VIEWPORT_PX_UNIT_CUSTOM_PROPERTY =
  '--hkw-capped-viewport-px-unit'

const PX_VALUE_PATTERN = /^[-+]?(?:\d*\.\d+|\d+\.?\d*)px\b/i
const URL_FUNCTION_PATTERN = /^url\(/i

const formatViewportValue = (pxValue, viewportWidth) => {
  const numberValue = Number.parseFloat(pxValue)

  if (!numberValue) return '0'

  return `${Number(((numberValue / viewportWidth) * 100).toFixed(5))}vw`
}

const formatViewportHeightValue = (pxValue, viewportHeight) => {
  const numberValue = Number.parseFloat(pxValue)

  if (!numberValue) return '0'

  return `${Number(((numberValue / viewportHeight) * 100).toFixed(5))}vh`
}

export const getViewportPxUnitValue = (viewportWidth) =>
  formatViewportValue('1px', viewportWidth)

export const getViewportPxHeightUnitValue = (viewportHeight) =>
  formatViewportHeightValue('1px', viewportHeight)

export const getFittedViewportPxUnitValue = (viewportWidth, viewportHeight) =>
  `min(${getViewportPxUnitValue(viewportWidth)}, ${getViewportPxHeightUnitValue(
    viewportHeight,
  )})`

export const getCappedViewportPxUnitValue = () =>
  `min(var(${VIEWPORT_PX_UNIT_CUSTOM_PROPERTY}), 1px)`

const formatResponsiveViewportValue = (
  pxValue,
  customProperty = VIEWPORT_PX_UNIT_CUSTOM_PROPERTY,
) => {
  const numberValue = Number.parseFloat(pxValue)

  if (!numberValue) return '0'

  return `calc(${Number(numberValue.toFixed(5))} * var(${customProperty}))`
}

const copyCssFunction = (value, startIndex) => {
  let index = startIndex
  let depth = 0
  let quote = ''
  let escaped = false

  while (index < value.length) {
    const char = value[index]

    if (escaped) {
      escaped = false
    } else if (char === '\\') {
      escaped = true
    } else if (quote) {
      if (char === quote) quote = ''
    } else if (char === '"' || char === "'") {
      quote = char
    } else if (char === '(') {
      depth += 1
    } else if (char === ')') {
      depth -= 1

      if (depth === 0) {
        index += 1
        break
      }
    }

    index += 1
  }

  return {
    nextIndex: index,
    text: value.slice(startIndex, index),
  }
}

const convertCssPxValues = (value, formatPxValue) => {
  if (typeof value !== 'string' || !value.includes('px')) return value

  let converted = ''
  let index = 0
  let quote = ''
  let escaped = false

  while (index < value.length) {
    const char = value[index]

    if (escaped) {
      converted += char
      escaped = false
      index += 1
      continue
    }

    if (char === '\\') {
      converted += char
      escaped = true
      index += 1
      continue
    }

    if (quote) {
      converted += char
      if (char === quote) quote = ''
      index += 1
      continue
    }

    if (char === '"' || char === "'") {
      converted += char
      quote = char
      index += 1
      continue
    }

    if (URL_FUNCTION_PATTERN.test(value.slice(index))) {
      const urlFunction = copyCssFunction(value, index)
      converted += urlFunction.text
      index = urlFunction.nextIndex
      continue
    }

    const pxMatch = value.slice(index).match(PX_VALUE_PATTERN)

    if (pxMatch) {
      converted += formatPxValue(pxMatch[0])
      index += pxMatch[0].length
      continue
    }

    converted += char
    index += 1
  }

  return converted
}

export const convertCssPxToVw = (
  value,
  viewportWidth = DESKTOP_VIEWPORT_WIDTH,
) =>
  convertCssPxValues(value, (pxValue) =>
    formatViewportValue(pxValue, viewportWidth),
  )

export const convertCssPxToViewportUnit = (value) =>
  convertCssPxValues(value, formatResponsiveViewportValue)

export const convertCssPxToCappedViewportUnit = (value) =>
  convertCssPxValues(value, (pxValue) =>
    formatResponsiveViewportValue(
      pxValue,
      CAPPED_VIEWPORT_PX_UNIT_CUSTOM_PROPERTY,
    ),
  )

export function viewportPxToVwPlugin(element) {
  if (element.type !== 'decl' || typeof element.children !== 'string') return
  if (
    element.props === VIEWPORT_PX_UNIT_CUSTOM_PROPERTY ||
    element.props === CAPPED_VIEWPORT_PX_UNIT_CUSTOM_PROPERTY
  ) {
    return
  }

  const convertedValue = convertCssPxToViewportUnit(element.children)

  if (convertedValue === element.children) return

  element.children = convertedValue
  element.value = `${element.props}:${convertedValue};`
  element.return = ''
}
