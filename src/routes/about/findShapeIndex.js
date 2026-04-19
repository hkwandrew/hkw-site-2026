import gsap from 'gsap'
import MorphSVGPlugin from 'gsap/MorphSVGPlugin'

const SVG_NS = 'http://www.w3.org/2000/svg'
const NUMBERS_EXP = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[-+]?\d+)?)[0-9]/gi
const DEBUGGER_ID = 'about-shape-index-debugger'

const toArray = (target) => {
  if (!target) return []
  if (typeof target === 'string') return gsap.utils.toArray(target)
  if (target.nodeName) return [target]
  if (typeof target.length === 'number') return Array.from(target).filter(Boolean)
  return []
}

const createSvgElement = (type, attributes) => {
  const element = document.createElementNS(SVG_NS, type)

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttributeNS(null, key, value)
  })

  return element
}

const parseShape = (shape, forcePath = false) => {
  if (typeof shape === 'string' && (shape.match(NUMBERS_EXP) || []).length >= 3) {
    return shape
  }

  let element = toArray(shape)[0]

  if (!element) return ''

  const nodeName = element.nodeName.toUpperCase()

  if (forcePath && nodeName !== 'PATH') {
    element = MorphSVGPlugin.convertToPath(element, false)[0]
  }

  return element.getAttribute(element.nodeName.toUpperCase() === 'PATH' ? 'd' : 'points') || ''
}

const createDebuggerUi = (vars) => {
  document.getElementById(DEBUGGER_ID)?.remove()

  const container = document.createElement('div')
  const label = document.createElement('div')
  const incrementButton = document.createElement('button')
  const decrementButton = document.createElement('button')

  container.id = DEBUGGER_ID
  label.setAttribute('data-about-shape-index-label', '')

  decrementButton.type = 'button'
  incrementButton.type = 'button'
  decrementButton.textContent = ' - '
  incrementButton.textContent = ' + '

  gsap.set(container, {
    padding: 0,
    position: 'absolute',
    bottom: 0,
    left: '50%',
    xPercent: -50,
    yPercent: -50,
    fontSize: '20px',
    textAlign: 'center',
    backgroundColor: 'black',
    color: '#91e600',
    border: '1px solid #999',
    userSelect: 'none',
    fontFamily: 'sans-serif',
    zIndex: vars.zIndex ?? 1000,
  })
  gsap.set(label, {
    display: 'inline-block',
    minWidth: '210px',
    marginRight: '10px',
    marginLeft: '10px',
    textAlign: 'center',
  })
  gsap.set([incrementButton, decrementButton], {
    display: 'inline-block',
    padding: '0 15px',
    color: '#ccc',
    height: '50px',
    lineHeight: '48px',
    cursor: 'pointer',
    background: 'transparent',
    border: 0,
  })
  gsap.set(decrementButton, { borderRight: '1px solid #999' })
  gsap.set(incrementButton, { borderLeft: '1px solid #999' })

  container.appendChild(decrementButton)
  container.appendChild(label)
  container.appendChild(incrementButton)
  document.body.appendChild(container)

  return {
    container,
    label,
    incrementButton,
    decrementButton,
  }
}

// Adapted from GreenSock's stand-alone findShapeIndex utility:
// https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/findShapeIndex.js
const findShapeIndex = (target, endShape, vars = {}) => {
  if (
    typeof MorphSVGPlugin.stringToRawPath !== 'function' ||
    typeof MorphSVGPlugin.equalizeSegmentQuantity !== 'function'
  ) {
    return () => {}
  }

  let targetElement = typeof target === 'string' ? toArray(target)[0] : target

  if (targetElement?.push && targetElement[0]?.nodeName) {
    targetElement = targetElement[0]
  }

  if (!targetElement || targetElement.nodeName?.toUpperCase() !== 'PATH') {
    return () => {}
  }

  const startShape = targetElement.getAttribute('d') || ''
  const parsedEndShape = parseShape(endShape, true)

  if (!parsedEndShape) return () => {}

  const targetParent = targetElement.parentNode
  const targetStyle = targetElement.getAttribute('style')
  const endTarget =
    typeof endShape === 'string' && (endShape.match(NUMBERS_EXP) || []).length >= 3
      ? null
      : toArray(endShape)[0] ?? null
  const endTargetStyle = endTarget?.getAttribute('style') ?? null
  const startDot = createSvgElement('circle', {
    cx: 0,
    cy: 0,
    r: (vars.startStrokeWidth || 3) + 3,
    fill: vars.startStroke || 'red',
  })
  const endDot = createSvgElement('circle', {
    cx: 0,
    cy: 0,
    r: (vars.endStrokeWidth || 3) + 3,
    fill: vars.endStroke || 'yellow',
  })
  const { container, label, incrementButton, decrementButton } =
    createDebuggerUi(vars)
  const dotProxy = { x: 0, y: 0 }
  const startRawPath = MorphSVGPlugin.stringToRawPath(startShape)
  const endRawPath = MorphSVGPlugin.stringToRawPath(parsedEndShape)
  const autoIndices =
    MorphSVGPlugin.equalizeSegmentQuantity(startRawPath, endRawPath, 'auto') || []
  const autoIndex = Math.round(autoIndices[0] ?? 0)
  const maxIndex = (startRawPath[0]?.length / 6) | 0
  const minIndex = -maxIndex

  let index = autoIndex
  let shapeTween = null
  let dotTween = null

  const updateLabel = () => {
    label.textContent = `shapeIndex: ${index}${index === autoIndex ? ' (auto)' : ''}`
  }

  const getFirstCoordinates = (shapeIndex) => {
    const startRaw = MorphSVGPlugin.stringToRawPath(startShape)
    const endRaw = MorphSVGPlugin.stringToRawPath(parsedEndShape)

    MorphSVGPlugin.equalizeSegmentQuantity(startRaw, endRaw, shapeIndex)

    return [startRaw[0][0], startRaw[0][1], endRaw[0][0], endRaw[0][1]]
  }

  const reverseTween = () => {
    shapeTween?.reversed(!shapeTween.reversed()).resume()
    dotTween?.reversed(!dotTween.reversed()).resume()
  }

  const startTween = () => {
    const [startX, startY, endX, endY] = getFirstCoordinates(index)

    targetElement.setAttribute('d', startShape)
    dotProxy.x = startX
    dotProxy.y = startY
    startDot.setAttribute('cx', startX)
    startDot.setAttribute('cy', startY)
    endDot.setAttribute('cx', endX)
    endDot.setAttribute('cy', endY)

    shapeTween = gsap.to(targetElement, {
      duration: vars.duration || 3,
      delay: 0.5,
      morphSVG: {
        shape: parsedEndShape,
        shapeIndex: index,
      },
      ease: vars.ease || 'none',
      onComplete: reverseTween,
      onReverseComplete: reverseTween,
    })
    dotTween = gsap.to(dotProxy, {
      duration: vars.duration || 3,
      delay: 0.5,
      x: endX,
      y: endY,
      ease: vars.ease || 'none',
      onUpdate: () => {
        startDot.setAttribute('cx', dotProxy.x)
        startDot.setAttribute('cy', dotProxy.y)
      },
    })
  }

  const refresh = () => {
    shapeTween?.kill()
    dotTween?.kill()
    updateLabel()
    startTween()
    gsap.fromTo(
      container,
      { backgroundColor: '#777' },
      { duration: 0.4, backgroundColor: 'black', ease: 'none' },
    )
  }

  const increment = () => {
    index = index >= maxIndex ? minIndex : index + 1
    refresh()
  }

  const decrement = () => {
    index = index <= minIndex ? maxIndex : index - 1
    refresh()
  }

  const handleKeydown = (event) => {
    const key = event.keyCode

    if (key === 38 || key === 39 || key === 85) {
      increment()
      return
    }

    if (key === 37 || key === 40 || key === 68) {
      decrement()
    }
  }

  if (targetParent) {
    targetParent.appendChild(endDot)
    targetParent.appendChild(startDot)
  }

  gsap.set(targetElement, {
    display: 'block',
    strokeWidth: vars.startStrokeWidth || 3,
    stroke: vars.startStroke || 'red',
    fill: vars.startFill || 'none',
    visibility: 'visible',
    opacity: vars.startOpacity || 0.7,
  })

  if (endTarget) {
    gsap.set(endTarget, {
      display: 'block',
      strokeWidth: vars.endStrokeWidth || 3,
      stroke: vars.endStroke || 'yellow',
      fill: vars.endFill || 'none',
      visibility: 'visible',
      opacity: vars.endOpacity || 0.7,
    })
  }

  updateLabel()
  startTween()

  window.addEventListener('keydown', handleKeydown)
  incrementButton.addEventListener('click', increment)
  decrementButton.addEventListener('click', decrement)

  return () => {
    shapeTween?.kill()
    dotTween?.kill()
    gsap.killTweensOf(dotProxy)
    targetElement.setAttribute('d', startShape)
    targetStyle == null
      ? targetElement.removeAttribute('style')
      : targetElement.setAttribute('style', targetStyle)

    if (endTarget) {
      endTargetStyle == null
        ? endTarget.removeAttribute('style')
        : endTarget.setAttribute('style', endTargetStyle)
    }

    startDot.remove()
    endDot.remove()
    container.remove()
    window.removeEventListener('keydown', handleKeydown)
    incrementButton.removeEventListener('click', increment)
    decrementButton.removeEventListener('click', decrement)
  }
}

export default findShapeIndex
