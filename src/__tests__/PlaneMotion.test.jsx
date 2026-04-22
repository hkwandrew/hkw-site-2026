import { describe, expect, it } from 'vitest'
import { getBannerWaveMotionConfig, getWaveOffset } from '@/routes/home/Plane'

describe('getBannerWaveMotionConfig', () => {
  it('starts the banner wave at the plane descent point', () => {
    const config = getBannerWaveMotionConfig('3.2s')

    expect(config.duration).toBeCloseTo(3.2)
    expect(config.startPhase).toBeCloseTo(Math.PI * 3.2)
    expect(config.endPhase).toBeCloseTo(Math.PI * 7.2)
  })

  it('falls back to the default plane motion duration when the value is invalid', () => {
    const config = getBannerWaveMotionConfig('')

    expect(config.duration).toBeCloseTo(3.2)
    expect(config.startPhase).toBeCloseTo(Math.PI * 3.2)
    expect(config.endPhase).toBeCloseTo(Math.PI * 7.2)
  })

  it('keeps the banner wave continuous at the loop boundary', () => {
    const { startPhase, endPhase } = getBannerWaveMotionConfig('3.2s')
    const sampleXs = [0, 120, 240, 280.024]

    sampleXs.forEach((x) => {
      expect(getWaveOffset(x, startPhase, 1)).toBeCloseTo(
        getWaveOffset(x, endPhase, 1),
        6,
      )
    })
  })
})
