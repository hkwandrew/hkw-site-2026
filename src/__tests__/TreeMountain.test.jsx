import { render, screen } from '@/__tests__/testUtils'
import TreeMountain from '@/app/landscape/layers/TreeMountain'
import { HomeHoverProvider } from '@/routes/home/homeHoverContext'
import { describe, expect, it } from 'vitest'

describe('TreeMountain', () => {
  it('applies an incoming transform to the outer wrapper group', () => {
    render(
      <svg>
        <HomeHoverProvider
          value={{
            clearHomeHoverRegion: () => {},
            homeHoverRegion: null,
            isHome: false,
            setHomeHoverRegion: () => {},
          }}
        >
          <TreeMountain
            data-testid='tree-mountain-root'
            transform='translate(-1020.680149,546.860407)'
          />
        </HomeHoverProvider>
      </svg>,
    )

    expect(screen.getByTestId('tree-mountain-root')).toHaveAttribute(
      'transform',
      'translate(-1020.680149,546.860407)',
    )
  })
})
