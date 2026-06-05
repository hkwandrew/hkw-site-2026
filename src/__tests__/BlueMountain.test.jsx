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
  it('renders the hover quote and hitbox for the active home region', () => {
    const { container } = renderBlueMountain(HOME_HOVER_REGION.blueMountain)

    const hitbox = container.querySelector('#blue-mountain-hover-hitbox')
    const hoverGroup = container.querySelector(
      '#blue-mountain-hover-art',
    )?.parentElement

    expect(hitbox).not.toBeNull()
    expect(hitbox).not.toHaveAttribute('transform')
    expect(hoverGroup).not.toBeNull()
    expect(hoverGroup).toHaveAttribute('transform', expect.any(String))
    expect(hoverGroup).toHaveStyle({ opacity: '1' })
  })
})
