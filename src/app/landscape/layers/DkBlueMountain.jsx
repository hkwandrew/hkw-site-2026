import { getHomeHoverRegionPosition } from '@/routes/home/homeHoverConfig'
import { HOME_HOVER_REGION } from '@/routes/home/homeHoverRegions'
import theme from '@/styles/theme'
import DkBlueMountainHoverArt from './DkBlueMountainHoverArt'
import MountainBase from './MountainBase'

const CONTAINER = Object.freeze({
  x: 2480.5,
  y: 697.21376,
})

const DK_BLUE_MOUNTAIN_PATH =
  'M2854.5,471.164c-197.77-23.778-266.39-30.607-367.56-64.939-120.67-40.945-188.46-36.392-364.97,18.322C1877.12,500.446,1150.5,847.5,968.5,1021h3024c-86-324.5-992-532.281-1138-549.836Z'

const HOVER_POSITION = getHomeHoverRegionPosition(
  HOME_HOVER_REGION.dkBlueMountain,
)

const DkBlueMountain = () => (
  <MountainBase
    containerId='dk-blue-mountain_container'
    wrapperId='dk-blue-mountain_wrapper'
    container={CONTAINER}
    hoverPosition={HOVER_POSITION}
    hoverRegion={HOME_HOVER_REGION.dkBlueMountain}
    hoverContent={<DkBlueMountainHoverArt />}
    mountainContent={
      <path
        id='dk-blue-mountain'
        d={DK_BLUE_MOUNTAIN_PATH}
        transform='translate(-2480.5,-700.000031)'
        fill={theme.colors.blue.dark}
      />
    }
    hitboxId='dk-blue-mountain-hover-hitbox'
    hitboxPath={DK_BLUE_MOUNTAIN_PATH}
    hitboxTransform='translate(-2480.5,-700.000031)'
  />
)

export default DkBlueMountain
