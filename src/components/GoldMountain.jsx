import goldMountainHover from '@/assets/images/gold-mountain-hover.png'
import { useHomeHover } from '@/context/homeHover'
import {
  getHomeHoverRegionPosition,
  HOME_HOVER_REGION,
} from '@/homeHoverConfig'

const CONTAINER = Object.freeze({
  x: 2009.636203,
  y: 742.708225,
})

const GOLD_MOUNTAIN_PATH =
  'M1158,364.374c144.44-26.581,288.87-64.466,488.19-8.327C1716,345,1872,364.374,1902.59,391.423c45.54,10.753,76.39-34.507,119.41-35.376c46.39-.936,118,58.953,326,35.376C3098,478,3045.5,1031,3587.5,1004.5h-3165C636.559,689.583,1158,364.374,1158,364.374Z'

const GOLD_MOUNTAIN_HOVER_POSITION = Object.freeze(
  getHomeHoverRegionPosition(HOME_HOVER_REGION.goldMountain),
)

const GoldMountain = () => {
  const { clearHomeHoverRegion, homeHoverRegion, isHome, setHomeHoverRegion } =
    useHomeHover()
  const isHoverActive =
    isHome && homeHoverRegion === HOME_HOVER_REGION.goldMountain

  return (
    <g
      id='gold-mountain__container'
      transform={`translate(${CONTAINER.x},${CONTAINER.y})`}
    >
      <g id='gold-mountain__wrapper' transform='scale(1,1)'>
        <g id='gold-mountain' transform='translate(-2005,-666.210876)'>
          <path
            id='gold-mountain-path'
            d={GOLD_MOUNTAIN_PATH}
            transform='translate(-5.492666 -75.016071)'
            clipRule='evenodd'
            fill='#fa9c38'
            fillRule='evenodd'
          />

          <g
            pointerEvents='none'
            style={{
              opacity: isHoverActive ? 1 : 0,
              transition: 'opacity 220ms ease',
            }}
            transform={`translate(${GOLD_MOUNTAIN_HOVER_POSITION.x ?? 0} ${GOLD_MOUNTAIN_HOVER_POSITION.y ?? 0})`}
          >
            <image
              href={goldMountainHover}
              width={GOLD_MOUNTAIN_HOVER_POSITION.width}
              height={GOLD_MOUNTAIN_HOVER_POSITION.height}
              preserveAspectRatio='none'
            />
          </g>

          <path
            id='gold-mountain-hover-hitbox'
            d={GOLD_MOUNTAIN_PATH}
            transform='translate(-5.492666 -75.016071)'
            fill='transparent'
            onMouseEnter={() => {
              if (isHome) {
                setHomeHoverRegion(HOME_HOVER_REGION.goldMountain)
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
    </g>
  )
}

export default GoldMountain
