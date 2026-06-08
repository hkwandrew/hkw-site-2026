export const BANNER_RIGHT_X = 280.024

const DEFAULT_PLANE_MOTION_DURATION_SECONDS = 3.2
const PLANE_DESCENT_START_PROGRESS = 0.2
const BANNER_WAVE_LOOP_PHASE = Math.PI * 4

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
    startPhase,
  }
}

export const getWaveOffset = (x, phase, intensity = 1) => {
  if (!intensity) {
    return 0
  }

  const distanceFromRig = BANNER_RIGHT_X - x
  const travelProgress = Math.max(0, Math.min(1, distanceFromRig / BANNER_RIGHT_X))
  const amplitude = 8.2 * Math.pow(travelProgress, 0.92)
  const primaryWave = Math.sin(phase - distanceFromRig * 0.02)
  const secondaryWave =
    0.28 * Math.sin(phase * 1.5 - distanceFromRig * 0.034 + 0.8)

  return amplitude * intensity * (primaryWave * 0.82 + secondaryWave)
}
