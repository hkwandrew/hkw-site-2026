export const BANNER_RIGHT_X = 280.024
export const BANNER_WAVE_ENABLED = true

const DEFAULT_PLANE_MOTION_DURATION_SECONDS = 3.2
const DEFAULT_BANNER_WAVE_START_DELAY_SECONDS = 0.35
const PLANE_DESCENT_START_PROGRESS = 0.2
const BANNER_WAVE_LOOP_PHASE = Math.PI * 4
const PATH_COMMAND_VALUE_COUNTS = Object.freeze({
  C: 6,
  H: 1,
  L: 2,
  M: 2,
  V: 1,
  Z: 0,
})
const PATH_TOKEN_PATTERN = /[A-Z]|-?(?:\d*\.\d+|\d+)(?:e[-+]?\d+)?/g

const clampValue = (value, min, max) => Math.min(max, Math.max(min, value))
const formatPathValue = (value) => Number(value.toFixed(3)).toString()
const TEXT_WARP_MAX_X_STEP = 2.25
const CUBIC_WARP_MIN_STEPS = 8
const getCubicValue = (startValue, controlValueOne, controlValueTwo, endValue, t) =>
  (1 - t) ** 3 * startValue +
  3 * (1 - t) ** 2 * t * controlValueOne +
  3 * (1 - t) * t ** 2 * controlValueTwo +
  t ** 3 * endValue

const getWarpStepCount = (...xValues) => {
  const minX = Math.min(...xValues)
  const maxX = Math.max(...xValues)
  const xSpan = Math.abs(maxX - minX)

  return Math.max(1, Math.ceil(xSpan / TEXT_WARP_MAX_X_STEP))
}

const getMappedPoint = ({ x, y }, getYOffsetAtX) => ({
  x,
  y: y + getYOffsetAtX(x),
})

const pushMappedLineSegments = (
  outputSegments,
  fromPoint,
  toPoint,
  getYOffsetAtX,
) => {
  const stepCount = getWarpStepCount(fromPoint.x, toPoint.x)

  for (let stepIndex = 1; stepIndex <= stepCount; stepIndex += 1) {
    const t = stepIndex / stepCount
    const x = fromPoint.x + (toPoint.x - fromPoint.x) * t
    const y = fromPoint.y + (toPoint.y - fromPoint.y) * t
    const mappedPoint = getMappedPoint({ x, y }, getYOffsetAtX)

    outputSegments.push({
      command: 'L',
      values: [mappedPoint.x, mappedPoint.y],
    })
  }
}

const pushMappedCubicSegments = (
  outputSegments,
  fromPoint,
  cubicValues,
  getYOffsetAtX,
) => {
  const [controlX1, controlY1, controlX2, controlY2, endX, endY] =
    cubicValues
  const stepCount = Math.max(
    CUBIC_WARP_MIN_STEPS,
    getWarpStepCount(fromPoint.x, controlX1, controlX2, endX),
  )

  for (let stepIndex = 1; stepIndex <= stepCount; stepIndex += 1) {
    const t = stepIndex / stepCount
    const x = getCubicValue(fromPoint.x, controlX1, controlX2, endX, t)
    const y = getCubicValue(fromPoint.y, controlY1, controlY2, endY, t)
    const mappedPoint = getMappedPoint({ x, y }, getYOffsetAtX)

    outputSegments.push({
      command: 'L',
      values: [mappedPoint.x, mappedPoint.y],
    })
  }
}

const parseDurationSeconds = (
  durationValue,
  fallbackDuration = DEFAULT_PLANE_MOTION_DURATION_SECONDS,
) => {
  const parsedDuration = Number.parseFloat(durationValue)

  return Number.isFinite(parsedDuration) && parsedDuration > 0
    ? parsedDuration
    : fallbackDuration
}

export const getBannerWaveMotionConfig = (planeMotionDurationValue) => {
  const duration = parseDurationSeconds(planeMotionDurationValue)
  const startPhase =
    BANNER_WAVE_LOOP_PHASE * (1 - PLANE_DESCENT_START_PROGRESS)

  return {
    duration,
    endPhase: startPhase + BANNER_WAVE_LOOP_PHASE,
    startDelay: DEFAULT_BANNER_WAVE_START_DELAY_SECONDS,
    startPhase,
  }
}

export const getWaveOffset = (x, phase, intensity = 1) => {
  if (!intensity) {
    return 0
  }

  const distanceFromRig = BANNER_RIGHT_X - x
  const travelProgress = clampValue(distanceFromRig / BANNER_RIGHT_X, 0, 1)
  const amplitude = 8.2 * Math.pow(travelProgress, 0.92)
  const primaryWave = Math.sin(phase - distanceFromRig * 0.02)
  const secondaryWave =
    0.28 * Math.sin(phase * 1.5 - distanceFromRig * 0.034 + 0.8)

  return amplitude * intensity * (primaryWave * 0.62 + secondaryWave)
}

export const parseWavePathData = (pathData) => {
  const tokens = pathData.match(PATH_TOKEN_PATTERN) ?? []
  const segments = []
  let tokenIndex = 0

  while (tokenIndex < tokens.length) {
    const command = tokens[tokenIndex]

    if (!(command in PATH_COMMAND_VALUE_COUNTS)) {
      throw new Error(`Unsupported banner text path command: ${command}`)
    }

    tokenIndex += 1

    if (command === 'Z') {
      segments.push({ command, values: [] })
      continue
    }

    if (command === 'M') {
      if (tokenIndex + 1 >= tokens.length) {
        throw new Error('Malformed banner text path data')
      }

      segments.push({
        command,
        values: [Number(tokens[tokenIndex]), Number(tokens[tokenIndex + 1])],
      })
      tokenIndex += 2

      while (tokenIndex < tokens.length && !/[A-Z]/.test(tokens[tokenIndex])) {
        if (tokenIndex + 1 >= tokens.length) {
          throw new Error('Malformed banner text path data')
        }

        segments.push({
          command: 'L',
          values: [Number(tokens[tokenIndex]), Number(tokens[tokenIndex + 1])],
        })
        tokenIndex += 2
      }

      continue
    }

    const valueCount = PATH_COMMAND_VALUE_COUNTS[command]

    while (tokenIndex < tokens.length && !/[A-Z]/.test(tokens[tokenIndex])) {
      if (tokenIndex + valueCount - 1 >= tokens.length) {
        throw new Error('Malformed banner text path data')
      }

      segments.push({
        command,
        values: tokens
          .slice(tokenIndex, tokenIndex + valueCount)
          .map((value) => Number(value)),
      })
      tokenIndex += valueCount
    }
  }

  return segments
}

const serializeWavePathData = (segments) =>
  segments
    .map(({ command, values }) =>
      values.length
        ? `${command}${values.map((value) => formatPathValue(value)).join(' ')}`
        : command,
    )
    .join('')

const getSurfaceMappedPathData = (pathSegments, getYOffsetAtX) => {
  const outputSegments = []
  let currentPoint = { x: 0, y: 0 }
  let subpathStartPoint = { x: 0, y: 0 }

  pathSegments.forEach(({ command, values }) => {
    if (command === 'M') {
      const [x, y] = values
      const mappedPoint = getMappedPoint({ x, y }, getYOffsetAtX)
      currentPoint = { x, y }
      subpathStartPoint = { x, y }
      outputSegments.push({
        command: 'M',
        values: [mappedPoint.x, mappedPoint.y],
      })
      return
    }

    if (command === 'L') {
      const [x, y] = values
      const nextPoint = { x, y }
      pushMappedLineSegments(
        outputSegments,
        currentPoint,
        nextPoint,
        getYOffsetAtX,
      )
      currentPoint = nextPoint
      return
    }

    if (command === 'H') {
      const [x] = values
      const nextPoint = { x, y: currentPoint.y }
      pushMappedLineSegments(
        outputSegments,
        currentPoint,
        nextPoint,
        getYOffsetAtX,
      )
      currentPoint = nextPoint
      return
    }

    if (command === 'V') {
      const [y] = values
      const nextPoint = { x: currentPoint.x, y }
      pushMappedLineSegments(
        outputSegments,
        currentPoint,
        nextPoint,
        getYOffsetAtX,
      )
      currentPoint = nextPoint
      return
    }

    if (command === 'C') {
      const [, , , , endX, endY] = values
      const nextPoint = { x: endX, y: endY }
      pushMappedCubicSegments(
        outputSegments,
        currentPoint,
        values,
        getYOffsetAtX,
      )
      currentPoint = nextPoint
      return
    }

    if (command === 'Z') {
      pushMappedLineSegments(
        outputSegments,
        currentPoint,
        subpathStartPoint,
        getYOffsetAtX,
      )
      outputSegments.push({ command: 'Z', values: [] })
      currentPoint = subpathStartPoint
      return
    }

    throw new Error(`Unsupported banner text path command: ${command}`)
  })

  return serializeWavePathData(outputSegments)
}

export const buildSplineSegments = (points) =>
  points.slice(0, -1).map((startPoint, index) => {
    const previousPoint = points[Math.max(0, index - 1)]
    const endPoint = points[index + 1]
    const nextPoint = points[Math.min(points.length - 1, index + 2)]

    return {
      controlPointOne: {
        x: startPoint.x + (endPoint.x - previousPoint.x) / 6,
        y: startPoint.y + (endPoint.y - previousPoint.y) / 6,
      },
      controlPointTwo: {
        x: endPoint.x - (nextPoint.x - startPoint.x) / 6,
        y: endPoint.y - (nextPoint.y - startPoint.y) / 6,
      },
      endPoint,
      startPoint,
    }
  })

export const getSplineCommands = (splineSegments) =>
  splineSegments
    .map(
      ({ controlPointOne, controlPointTwo, endPoint }) =>
        `C${formatPathValue(controlPointOne.x)} ${formatPathValue(controlPointOne.y)} ${formatPathValue(controlPointTwo.x)} ${formatPathValue(controlPointTwo.y)} ${formatPathValue(endPoint.x)} ${formatPathValue(endPoint.y)}`,
    )
    .join('')

export const getSplineYAtX = (splineSegments, x) => {
  if (!splineSegments.length) {
    throw new Error('Cannot evaluate an empty spline')
  }

  const firstSegment = splineSegments[0]
  const lastSegment = splineSegments[splineSegments.length - 1]
  const clampedX = clampValue(x, firstSegment.startPoint.x, lastSegment.endPoint.x)
  const splineSegment =
    splineSegments.find(
      ({ endPoint, startPoint }) =>
        clampedX >= startPoint.x && clampedX <= endPoint.x,
    ) ?? (clampedX <= firstSegment.startPoint.x ? firstSegment : lastSegment)

  let low = 0
  let high = 1

  for (let iteration = 0; iteration < 24; iteration += 1) {
    const mid = (low + high) / 2
    const currentX = getCubicValue(
      splineSegment.startPoint.x,
      splineSegment.controlPointOne.x,
      splineSegment.controlPointTwo.x,
      splineSegment.endPoint.x,
      mid,
    )

    if (currentX < clampedX) {
      low = mid
      continue
    }

    high = mid
  }

  return getCubicValue(
    splineSegment.startPoint.y,
    splineSegment.controlPointOne.y,
    splineSegment.controlPointTwo.y,
    splineSegment.endPoint.y,
    (low + high) / 2,
  )
}

const transformPathX = (x, { originX, scaleX, xOffset }) =>
  originX + (x - originX) * scaleX + xOffset

const transformPathY = (y, { originY, scaleY, yOffset }) =>
  originY + (y - originY) * scaleY + yOffset

export const getTransformedPathData = (
  pathSegments,
  {
    originX = 0,
    originY = 0,
    scale = 1,
    scaleX = scale,
    scaleY = scale,
    xOffset = 0,
    yOffset = 0,
  } = {},
) =>
  serializeWavePathData(
    pathSegments.map(({ command, values }) => {
      if (command === 'Z') {
        return { command, values: [] }
      }

      if (command === 'H') {
        return {
          command,
          values: [
            transformPathX(values[0], {
              originX,
              scaleX,
              xOffset,
            }),
          ],
        }
      }

      if (command === 'V') {
        return {
          command,
          values: [
            transformPathY(values[0], {
              originY,
              scaleY,
              yOffset,
            }),
          ],
        }
      }

      if (command === 'M' || command === 'L') {
        return {
          command,
          values: [
            transformPathX(values[0], {
              originX,
              scaleX,
              xOffset,
            }),
            transformPathY(values[1], {
              originY,
              scaleY,
              yOffset,
            }),
          ],
        }
      }

      if (command === 'C') {
        return {
          command,
          values: [
            transformPathX(values[0], {
              originX,
              scaleX,
              xOffset,
            }),
            transformPathY(values[1], {
              originY,
              scaleY,
              yOffset,
            }),
            transformPathX(values[2], {
              originX,
              scaleX,
              xOffset,
            }),
            transformPathY(values[3], {
              originY,
              scaleY,
              yOffset,
            }),
            transformPathX(values[4], {
              originX,
              scaleX,
              xOffset,
            }),
            transformPathY(values[5], {
              originY,
              scaleY,
              yOffset,
            }),
          ],
        }
      }

      throw new Error(`Unsupported banner text path command: ${command}`)
    }),
  )


export const getTranslatedPathData = (
  pathSegments,
  { xOffset = 0, yOffset = 0 },
) =>
  getTransformedPathData(pathSegments, {
    xOffset,
    yOffset,
  })

export const getWavedPathData = (
  pathSegments,
  { getYOffsetAtX, intensity = 1, phase, xOffset = 0 },
) => {
  if (!intensity) {
    return serializeWavePathData(pathSegments)
  }

  const getPathYOffset = (x) =>
    getYOffsetAtX
      ? getYOffsetAtX(x + xOffset)
      : getWaveOffset(x + xOffset, phase, intensity)

  return getSurfaceMappedPathData(pathSegments, getPathYOffset)
}

const getScarfFlutterOffset = (
  x,
  {
    amplitude,
    frequencyMultiplier = 1,
    intensity,
    knotX,
    phase,
    phaseOffset = 0,
    spanX,
  },
) => {
  if (!intensity || !amplitude || !spanX) {
    return 0
  }

  const distanceFromKnot = knotX - x
  const travelProgress = clampValue(distanceFromKnot / spanX, 0, 1)
  const tailBias = Math.pow(travelProgress, 0.92)
  const primaryWave = Math.sin(
    phase * frequencyMultiplier - distanceFromKnot * 0.42 + phaseOffset,
  )
  const secondaryWave = Math.sin(
    phase * (frequencyMultiplier + 0.5) -
    distanceFromKnot * 0.78 +
    phaseOffset * 1.35,
  )

  return amplitude * intensity * tailBias * (primaryWave * 0.74 + secondaryWave * 0.26)
}

export const getScarfFlutterPathData = (
  pathSegments,
  {
    amplitude,
    frequencyMultiplier = 1,
    intensity = 1,
    knotX,
    phase,
    phaseOffset = 0,
    spanX,
  },
) => {
  if (!intensity) {
    return serializeWavePathData(pathSegments)
  }

  const getPathYOffset = (x) =>
    getScarfFlutterOffset(x, {
      amplitude,
      frequencyMultiplier,
      intensity,
      knotX,
      phase,
      phaseOffset,
      spanX,
    })

  return getSurfaceMappedPathData(pathSegments, getPathYOffset)
}
