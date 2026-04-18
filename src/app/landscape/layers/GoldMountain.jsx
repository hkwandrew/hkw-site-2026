import goldMountainHover from '@/assets/images/gold-mountain-hover.png'
import { getHomeHoverRegionPosition } from '@/routes/home/homeHoverConfig'
import { HOME_HOVER_REGION } from '@/routes/home/homeHoverRegions'
import theme from '@/styles/theme'
import MountainBase from './MountainBase'

const CONTAINER = Object.freeze({
  x: 2009.636203,
  y: 742.708225,
})

const GOLD_MOUNTAIN_PATH =
  'M1158,364.374c144.44-26.581,288.87-64.466,488.19-8.327C1716,345,1872,364.374,1902.59,391.423c45.54,10.753,76.39-34.507,119.41-35.376c46.39-.936,118,58.953,326,35.376C3098,478,3045.5,1031,3587.5,1004.5h-3165C636.559,689.583,1158,364.374,1158,364.374Z'

const HOVER_POSITION = getHomeHoverRegionPosition(HOME_HOVER_REGION.goldMountain)

const GoldMountain = () => (
  <MountainBase
    containerId='gold-mountain__container'
    wrapperId='gold-mountain__wrapper'
    container={CONTAINER}
    hoverPosition={HOVER_POSITION}
    hoverRegion={HOME_HOVER_REGION.goldMountain}
    hoverContent={
      <image
        href={goldMountainHover}
        width={HOVER_POSITION.width}
        height={HOVER_POSITION.height}
        preserveAspectRatio='none'
      />
    }
    mountainContent={
      <path
        id='gold-mountain-path'
        d={GOLD_MOUNTAIN_PATH}
        transform='translate(-5.492666 -75.016071)'
        clipRule='evenodd'
        fill={theme.colors.yellow.gold}
        fillRule='evenodd'
      />
    }
    hitboxId='gold-mountain-hover-hitbox'
    hitboxPath={GOLD_MOUNTAIN_PATH}
    hitboxTransform='translate(-5.492666 -75.016071)'
    innerGroupId='gold-mountain'
    innerGroupTransform='translate(-2005,-666.210876)'
  />
)

export default GoldMountain
