import { describe, expect, it } from 'vitest'
import { getHomeHoverRegionPosition } from '@/routes/home/homeHoverConfig'
import { HOME_HOVER_REGION } from '@/routes/home/homeHoverRegions'

describe('home hover registry', () => {
  it('keeps mountain hover regions registered with usable coordinates', () => {
    const mountainRegions = [
      HOME_HOVER_REGION.blueMountain,
      HOME_HOVER_REGION.dkBlueMountain,
      HOME_HOVER_REGION.goldMountain,
      HOME_HOVER_REGION.treeMountain,
    ]

    mountainRegions.forEach((region) => {
      const position = getHomeHoverRegionPosition(region)

      expect(Number.isFinite(position.x)).toBe(true)
      expect(Number.isFinite(position.y)).toBe(true)
    })

    const goldMountainPosition = getHomeHoverRegionPosition(
      HOME_HOVER_REGION.goldMountain,
    )

    expect(goldMountainPosition.width).toBeGreaterThan(0)
    expect(goldMountainPosition.height).toBeGreaterThan(0)
  })

  it('keeps contact and mascot hover regions registered centrally', () => {
    const contactPosition = getHomeHoverRegionPosition(HOME_HOVER_REGION.contact)
    const mascotPosition = getHomeHoverRegionPosition(HOME_HOVER_REGION.mascot)

    expect(Number.isFinite(contactPosition.x)).toBe(true)
    expect(Number.isFinite(contactPosition.y)).toBe(true)
    expect(contactPosition.width).toBeGreaterThan(0)
    expect(contactPosition.height).toBeGreaterThan(0)
    expect(mascotPosition.right).toBeGreaterThanOrEqual(0)
    expect(mascotPosition.bottom).toBeGreaterThanOrEqual(0)
    expect(mascotPosition.width).toBeGreaterThan(0)
    expect(mascotPosition.clipTop).toBeGreaterThanOrEqual(0)
  })

  it('returns an empty object for unknown regions', () => {
    expect(getHomeHoverRegionPosition('unknown')).toEqual({})
  })
})
