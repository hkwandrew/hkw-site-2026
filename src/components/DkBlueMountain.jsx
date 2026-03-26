import DkBlueMountainHoverArt from '@/components/DkBlueMountainHoverArt'
import { useHomeHover } from '@/context/homeHover'
import {
  getHomeHoverRegionPosition,
  HOME_HOVER_REGION,
} from '@/homeHoverConfig'

const CONTAINER = Object.freeze({
  x: 2480.5,
  y: 697.21376,
})

const DK_BLUE_MOUNTAIN_PATH =
  'M2854.5,471.164c-197.77-23.778-266.39-30.607-367.56-64.939-120.67-40.945-188.46-36.392-364.97,18.322C1877.12,500.446,1150.5,847.5,968.5,1021h3024c-86-324.5-992-532.281-1138-549.836Z'

const DK_BLUE_MOUNTAIN_HOVER_POSITION = Object.freeze(
  getHomeHoverRegionPosition(HOME_HOVER_REGION.dkBlueMountain),
)

const DkBlueMountain = () => {
  const { clearHomeHoverRegion, homeHoverRegion, isHome, setHomeHoverRegion } =
    useHomeHover()
  const isHoverActive =
    isHome && homeHoverRegion === HOME_HOVER_REGION.dkBlueMountain

  return (
    <g
      id='dk-blue-mountain_container'
      transform={`translate(${CONTAINER.x},${CONTAINER.y})`}
    >
      <g id='dk-blue-mountain_wrapper' transform='scale(1,1)'>
        <path
          id='dk-blue-mountain'
          d={DK_BLUE_MOUNTAIN_PATH}
          transform='translate(-2480.5,-700.000031)'
          fill='#1c2d38'
        />

        <g
          pointerEvents='none'
          style={{
            opacity: isHoverActive ? 1 : 0,
            transition: 'opacity 220ms ease',
          }}
          transform={`translate(${DK_BLUE_MOUNTAIN_HOVER_POSITION.x ?? 0} ${DK_BLUE_MOUNTAIN_HOVER_POSITION.y ?? 0})`}
        >
          <DkBlueMountainHoverArt />
        </g>

        <path
          id='dk-blue-mountain-hover-hitbox'
          d={DK_BLUE_MOUNTAIN_PATH}
          transform='translate(-2480.5,-700.000031)'
          fill='transparent'
          onMouseEnter={() => {
            if (isHome) {
              setHomeHoverRegion(HOME_HOVER_REGION.dkBlueMountain)
            }
          }}
          onMouseLeave={() => {
            if (isHome) {
              clearHomeHoverRegion()
            }
          }}
          style={{
            cursor: isHome ? 'pointer' : 'default',
            pointerEvents: isHome ? 'auto' : 'none',
          }}
        />
      </g>
    </g>
  )
}

export default DkBlueMountain
