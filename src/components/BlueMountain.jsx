import BlueMountainHoverArt from '@/components/BlueMountainHoverArt'
import { useHomeHover } from '@/context/homeHover'
import {
  getHomeHoverRegionPosition,
  HOME_HOVER_REGION,
} from '@/homeHoverConfig'

const CONTAINER = Object.freeze({
  x: 2014.808069,
  y: 635.237842,
})

const BLUE_MOUNTAIN_HOVER_POSITION = Object.freeze(
  getHomeHoverRegionPosition(HOME_HOVER_REGION.blueMountain),
)

const BlueMountain = () => {
  const { clearHomeHoverRegion, homeHoverRegion, isHome, setHomeHoverRegion } =
    useHomeHover()
  const isHoverActive =
    isHome && homeHoverRegion === HOME_HOVER_REGION.blueMountain

  return (
    <g
      id='blue-mountain__container'
      transform={`translate(${CONTAINER.x}, ${CONTAINER.y})`}
    >
      <g id='blue-mountain__wrapper' transform='scale(1,1)'>
        <path
          id='blue-mountain'
          d='M881.5 932.659C1065 579.41 1535.9 377.81 1706.18 314.81C1828.93 269.39 1876.07 265.61 1959.98 299.6C2155 375.41 3353.5 508.91 3975 932.659H881.5Z'
          transform='translate(-1996.25,-629.516876)'
          clipRule='evenodd'
          fill='#afd3fc'
          fillRule='evenodd'
        />

        <g
          pointerEvents='none'
          style={{
            opacity: isHoverActive ? 1 : 0,
            transition: 'opacity 220ms ease',
          }}
          transform={`translate(${BLUE_MOUNTAIN_HOVER_POSITION.x ?? 0} ${BLUE_MOUNTAIN_HOVER_POSITION.y ?? 0})`}
        >
          <BlueMountainHoverArt />
        </g>

        <path
          id='blue-mountain-hover-hitbox'
          d='M881.5 932.659C1065 579.41 1535.9 377.81 1706.18 314.81C1828.93 269.39 1876.07 265.61 1959.98 299.6C2155 375.41 3353.5 508.91 3975 932.659H881.5Z'
          transform='translate(-1996.25,-629.516876)'
          fill='transparent'
          onMouseEnter={() => {
            if (isHome) {
              setHomeHoverRegion(HOME_HOVER_REGION.blueMountain)
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

export default BlueMountain
