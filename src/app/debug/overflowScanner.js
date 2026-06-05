const OVERFLOW_ATTRIBUTE = 'data-hkw-debug-overflow'
const OVERFLOW_RIGHT_ATTRIBUTE = 'data-hkw-debug-overflow-right'
const DEBUG_ROOT_SELECTOR = '[data-hkw-debug-root]'
const IGNORED_SELECTOR = [
  'script',
  'style',
  'template',
  DEBUG_ROOT_SELECTOR,
  `${DEBUG_ROOT_SELECTOR} *`,
].join(', ')

const getElementLabel = (element) => {
  const tagName = element.tagName.toLowerCase()

  if (element.id) return `${tagName}#${element.id}`

  const testId = element.getAttribute('data-testid')

  if (testId) return `${tagName}[data-testid="${testId}"]`

  if (element.classList.length) {
    return `${tagName}.${Array.from(element.classList).slice(0, 2).join('.')}`
  }

  return tagName
}

export const getDebugElementSelector = (element) => {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) return ''

  const labels = []
  let currentElement = element

  while (
    currentElement &&
    currentElement.nodeType === Node.ELEMENT_NODE &&
    currentElement !== document.body &&
    labels.length < 4
  ) {
    labels.unshift(getElementLabel(currentElement))
    currentElement = currentElement.parentElement
  }

  return labels.join(' > ')
}

export const clearOverflowHighlights = (root = document.body) => {
  if (!root?.querySelectorAll) return

  root.querySelectorAll(`[${OVERFLOW_ATTRIBUTE}]`).forEach((element) => {
    element.removeAttribute(OVERFLOW_ATTRIBUTE)
    element.removeAttribute(OVERFLOW_RIGHT_ATTRIBUTE)
  })
}

export const findOverflowElements = ({
  root = document.body,
  viewportWidth = window.innerWidth,
} = {}) => {
  if (!root?.querySelectorAll || !viewportWidth) return []

  return Array.from(root.querySelectorAll('*'))
    .filter((element) => !element.matches(IGNORED_SELECTOR))
    .map((element) => {
      const rect = element.getBoundingClientRect()
      const overflowRight = Math.ceil(rect.right - viewportWidth)

      return {
        element,
        overflowRight,
        rect,
        selector: getDebugElementSelector(element),
      }
    })
    .filter(({ overflowRight }) => overflowRight > 0)
    .sort((a, b) => b.overflowRight - a.overflowRight)
}

const markOverflowElements = (items) => {
  items.forEach(({ element, overflowRight }) => {
    element.setAttribute(OVERFLOW_ATTRIBUTE, 'true')
    element.setAttribute(OVERFLOW_RIGHT_ATTRIBUTE, String(overflowRight))
  })
}

const logOverflowElements = (items, logger) => {
  if (!logger || items.length === 0) return

  logger.warn(
    `[hkw-debug] ${items.length} horizontal overflow element(s) found`,
  )
  logger.table(
    items.map(({ overflowRight, rect, selector }) => ({
      overflowRight,
      right: Math.round(rect.right),
      selector,
      width: Math.round(rect.width),
    })),
  )
}

export const scanPageOverflow = ({
  logger = console,
  root = document.body,
  viewportWidth = window.innerWidth,
} = {}) => {
  clearOverflowHighlights(root)

  const overflowElements = findOverflowElements({
    root,
    viewportWidth,
  })

  markOverflowElements(overflowElements)
  logOverflowElements(overflowElements, logger)

  return overflowElements
}
