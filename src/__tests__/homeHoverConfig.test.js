import { describe, expect, it } from 'vitest'
import { getHomeHoverRegionPosition } from '@/routes/home/homeHoverConfig'
import { HOME_HOVER_REGION } from '@/routes/home/homeHoverRegions'

describe('home hover registry', () => {
  it('returns the registered hover position for each mountain region', () => {
    expect(getHomeHoverRegionPosition(HOME_HOVER_REGION.blueMountain)).toEqual({
      x: -279,
      y: -326,
    })
    expect(
      getHomeHoverRegionPosition(HOME_HOVER_REGION.dkBlueMountain),
    ).toEqual({
      x: -575,
      y: -300,
    })
    expect(getHomeHoverRegionPosition(HOME_HOVER_REGION.goldMountain)).toEqual({
      x: 1500,
      y: 200,
      width: 752,
      height: 397,
    })
    expect(getHomeHoverRegionPosition(HOME_HOVER_REGION.treeMountain)).toEqual({
      x: 1191.222193,
      y: 224.1088,
    })
  })

  it('keeps contact and mascot regions registered centrally', () => {
    expect(getHomeHoverRegionPosition(HOME_HOVER_REGION.contact)).toEqual({
      x: -50,
      y: -51,
      width: 100,
      height: 102,
    })
    expect(getHomeHoverRegionPosition(HOME_HOVER_REGION.mascot)).toEqual({
      right: 140,
      bottom: 78,
      width: 423,
      clipTop: 22,
    })
  })

  it('returns an empty object for unknown regions', () => {
    expect(getHomeHoverRegionPosition('unknown')).toEqual({})
  })
})
