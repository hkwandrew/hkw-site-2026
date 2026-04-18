import theme from '@/styles/theme'
import { useHomeHover } from '@/routes/home/homeHoverContext'
import { HOME_HOVER_REGION } from '@/routes/home/homeHoverRegions'
import {
  getHomeHoverRegionPosition,
} from '@/routes/home/homeHoverConfig'
import { Link } from 'react-router'
import SunHoverArt from './SunHoverArt'

const SUN_CONTAINER = Object.freeze({
  x: 1706.222193,
  y: 231.108808,
})

const CONTACT_BADGE = Object.freeze(
  getHomeHoverRegionPosition(HOME_HOVER_REGION.contact),
)
const CONTACT_BADGE_SCALE_X = (CONTACT_BADGE.width ?? 100) / 100
const CONTACT_BADGE_SCALE_Y = (CONTACT_BADGE.height ?? 102) / 102

const Sun = () => {
  const { clearHomeHoverRegion, homeHoverRegion, isHome, setHomeHoverRegion } =
    useHomeHover()
  const isHoverActive = isHome && homeHoverRegion === HOME_HOVER_REGION.contact

  const sunSvg = (
    <g
      id='sun__container'
      transform={`translate(${SUN_CONTAINER.x},${SUN_CONTAINER.y})`}
    >
      <g id='sun__wrapper' transform='scale(1,1)'>
        <path
          id='sun'
          d='M1689.5,291c32.03,0,58-25.967,58-58s-25.97-58-58-58-58,25.967-58,58s25.97,58,58,58Z'
          transform='translate(-1689.5,-233)'
          fill={theme.colors.orange.base}
        />
        <g
          transform={`translate(${CONTACT_BADGE.x ?? 0} ${CONTACT_BADGE.y ?? 0}) scale(${CONTACT_BADGE_SCALE_X} ${CONTACT_BADGE_SCALE_Y})`}
          pointerEvents='none'
          style={{
            opacity: isHoverActive ? 1 : 0,
            transition: 'opacity 220ms ease',
          }}
        >
          <SunHoverArt />
        </g>
      </g>
    </g>
  )

  return (
    <Link
      to='/contact'
      onMouseEnter={() => {
        if (isHome) {
          setHomeHoverRegion(HOME_HOVER_REGION.contact)
        }
      }}
      onMouseLeave={() => {
        if (isHome) {
          clearHomeHoverRegion()
        }
      }}
      onFocus={() => {
        if (isHome) {
          setHomeHoverRegion(HOME_HOVER_REGION.contact)
        }
      }}
      onBlur={() => {
        if (isHome) {
          clearHomeHoverRegion()
        }
      }}
    >
      {sunSvg}
    </Link>
  )
}

export default Sun
