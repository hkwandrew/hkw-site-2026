import { render } from '@/__tests__/testUtils'
import BlueMountain from '@/app/landscape/layers/BlueMountain'
import { HomeHoverProvider } from '@/routes/home/homeHoverContext'
import { HOME_HOVER_REGION } from '@/routes/home/homeHoverRegions'
import { describe, expect, it } from 'vitest'

const renderBlueMountain = (homeHoverRegion = null) =>
  render(
    <svg>
      <HomeHoverProvider
        value={{
          clearHomeHoverRegion: () => {},
          homeHoverRegion,
          isHome: true,
          setHomeHoverRegion: () => {},
        }}
      >
        <BlueMountain />
      </HomeHoverProvider>
    </svg>,
  )

describe('BlueMountain', () => {
  it('keeps the hover quote and hitbox aligned to current home scene coordinates', () => {
    const { container } = renderBlueMountain(HOME_HOVER_REGION.blueMountain)

    const hitbox = container.querySelector('#blue-mountain-hover-hitbox')
    const hoverGroup = container.querySelector(
      '#blue-mountain-hover-art',
    )?.parentElement

    expect(hitbox).not.toBeNull()
    expect(hitbox).not.toHaveAttribute('transform')
    expect(hoverGroup).not.toBeNull()
    expect(hoverGroup).toHaveAttribute(
      'transform',
      'translate(1717.808069 299.237842)',
    )
    expect(hoverGroup).toHaveStyle({ opacity: '1' })
  })
})
