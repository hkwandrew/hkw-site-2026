import BlueMountainHoverArt from '@/components/BlueMountainHoverArt'
import MountainBase from '@/components/MountainBase'
import theme from '@/styles/theme'
import { HOME_HOVER_REGION } from '@/homeHoverConfig'

const CONTAINER = Object.freeze({
  x: 2014.808069,
  y: 635.237842,
})

const BLUE_MOUNTAIN_PATH =
  'M881.5 932.659C1065 579.41 1535.9 377.81 1706.18 314.81C1828.93 269.39 1876.07 265.61 1959.98 299.6C2155 375.41 3353.5 508.91 3975 932.659H881.5Z'

const BlueMountain = () => (
  <MountainBase
    containerId='blue-mountain__container'
    wrapperId='blue-mountain__wrapper'
    container={CONTAINER}
    hoverRegion={HOME_HOVER_REGION.blueMountain}
    hoverContent={<BlueMountainHoverArt />}
    mountainContent={
      <path
        id='blue-mountain'
        d={BLUE_MOUNTAIN_PATH}
        transform='translate(-1996.25,-629.516876)'
        clipRule='evenodd'
        fill={theme.colors.blue.light}
        fillRule='evenodd'
      />
    }
    hitboxId='blue-mountain-hover-hitbox'
    hitboxPath={BLUE_MOUNTAIN_PATH}
    hitboxTransform='translate(-1996.25,-629.516876)'
  />
)

export default BlueMountain
