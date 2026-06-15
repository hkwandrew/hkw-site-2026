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
  Z: 0,
})
const PATH_TOKEN_PATTERN = /[A-Z]|-?(?:\d*\.\d+|\d+)(?:e[-+]?\d+)?/g

const clampValue = (value, min, max) => Math.min(max, Math.max(min, value))
const formatPathValue = (value) => Number(value.toFixed(3)).toString()

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

export const getTranslatedPathData = (
  pathSegments,
  { xOffset = 0, yOffset = 0 },
) =>
  serializeWavePathData(
    pathSegments.map(({ command, values }) => {
      if (command === 'Z') {
        return { command, values: [] }
      }

      if (command === 'H') {
        return {
          command,
          values: [values[0] + xOffset],
        }
      }

      if (command === 'M' || command === 'L') {
        return {
          command,
          values: [values[0] + xOffset, values[1] + yOffset],
        }
      }

      if (command === 'C') {
        return {
          command,
          values: [
            values[0] + xOffset,
            values[1] + yOffset,
            values[2] + xOffset,
            values[3] + yOffset,
            values[4] + xOffset,
            values[5] + yOffset,
          ],
        }
      }

      throw new Error(`Unsupported banner text path command: ${command}`)
    }),
  )

export const getWavedPathData = (
  pathSegments,
  { intensity = 1, phase, xOffset = 0 },
) =>
  serializeWavePathData(
    pathSegments.map(({ command, values }) => {
      if (!intensity || command === 'H' || command === 'Z') {
        return { command, values: [...values] }
      }

      if (command === 'M' || command === 'L') {
        const [x, y] = values

        return {
          command,
          values: [x, y + getWaveOffset(x + xOffset, phase, intensity)],
        }
      }

      if (command === 'C') {
        return {
          command,
          values: [
            values[0],
            values[1] + getWaveOffset(values[0] + xOffset, phase, intensity),
            values[2],
            values[3] + getWaveOffset(values[2] + xOffset, phase, intensity),
            values[4],
            values[5] + getWaveOffset(values[4] + xOffset, phase, intensity),
          ],
        }
      }

      throw new Error(`Unsupported banner text path command: ${command}`)
    }),
  )
