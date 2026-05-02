import DkBlueMountain from '@/app/landscape/layers/DkBlueMountain'
import TreeMountain from '@/app/landscape/layers/TreeMountain'
import { HomeHoverProvider } from '@/routes/home/homeHoverContext'
import { HOME_HOVER_REGION } from '@/routes/home/homeHoverRegions'
import { flushSync } from 'react-dom'
import { createRoot } from 'react-dom/client'
import { afterEach, describe, expect, it } from 'vitest'

const HoverHarness = ({ activeRegion = null }) => {
  return (
    <svg>
      <HomeHoverProvider
        value={{
          clearHomeHoverRegion: () => {},
          homeHoverRegion: activeRegion,
          isHome: true,
          setHomeHoverRegion: () => {},
        }}
      >
        <DkBlueMountain />
        <TreeMountain />
      </HomeHoverProvider>
    </svg>
  )
}

const getHoverTargets = (container) => ({
  dkBlueHoverGroup:
    container.querySelector('#dk-blue-mountain-hover-art')?.parentElement ??
    null,
  dkBlueHitbox: container.querySelector('#dk-blue-mountain-hover-hitbox'),
  treeHoverGroup: container.querySelector('#tree-mouintain-hover'),
  treeHitbox: container.querySelector("#tree-mountain path[fill='transparent']"),
})

let root = null
let rootContainer = null

const renderHarness = (activeRegion = null) => {
  flushSync(() => {
    if (!rootContainer) {
      rootContainer = document.createElement('div')
      document.body.appendChild(rootContainer)
      root = createRoot(rootContainer)
    }

    root.render(<HoverHarness activeRegion={activeRegion} />)
  })

  return rootContainer
}

describe('services mountain hover regions', () => {
  afterEach(() => {
    root?.unmount()
    root = null
    rootContainer?.remove()
    rootContainer = null
  })

  it('activates both services mountains from the shared services hover region', () => {
    const container = renderHarness()
    const { dkBlueHoverGroup, treeHoverGroup } = getHoverTargets(container)

    expect(dkBlueHoverGroup).not.toBeNull()
    expect(treeHoverGroup).not.toBeNull()
    expect(dkBlueHoverGroup).toHaveStyle({ opacity: '0' })
    expect(treeHoverGroup).toHaveStyle({ opacity: '0' })

    renderHarness(HOME_HOVER_REGION.dkBlueMountain)

    expect(dkBlueHoverGroup).toHaveStyle({ opacity: '1' })
    expect(treeHoverGroup).toHaveStyle({ opacity: '1' })
  })
})
