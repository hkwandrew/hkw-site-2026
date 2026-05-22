import { useHomeHover } from '@/routes/home/homeHoverContext'

const MountainBase = ({
  containerId,
  wrapperId,
  hoverPosition,
  hoverRegion,
  hoverContent,
  mountainContent,
  hitboxId,
  hitboxPath,
  hitboxTransform,
  innerGroupId,
  innerGroupTransform,
}) => {
  const {
    clearHomeHoverRegion,
    homeHoverRegion,
    isHome,
    isHomeInteractive,
    setHomeHoverRegion,
  } = useHomeHover()
  const canInteractWithHomeHover = isHomeInteractive ?? isHome
  const isHoverActive =
    canInteractWithHomeHover && homeHoverRegion === hoverRegion

  const hoverGroup = (
    <g
      pointerEvents='none'
      style={{
        opacity: isHoverActive ? 1 : 0,
        transition: 'opacity 220ms ease',
      }}
      transform={`translate(${hoverPosition.x ?? 0} ${hoverPosition.y ?? 0})`}
    >
      {hoverContent}
    </g>
  )

  const hitbox = (
    <path
      id={hitboxId}
      d={hitboxPath}
      transform={hitboxTransform}
      fill='transparent'
      onMouseEnter={() => {
        if (canInteractWithHomeHover) {
          setHomeHoverRegion(hoverRegion)
        }
      }}
      onMouseLeave={() => {
        if (canInteractWithHomeHover) {
          clearHomeHoverRegion()
        }
      }}
      style={{
        cursor: canInteractWithHomeHover ? 'pointer' : 'default',
        pointerEvents: canInteractWithHomeHover ? 'auto' : 'none',
      }}
    />
  )

  const innerContent = innerGroupId ? (
    <g id={innerGroupId} transform={innerGroupTransform}>
      {mountainContent}
      {hoverGroup}
      {hitbox}
    </g>
  ) : (
    <>
      {mountainContent}
      {hoverGroup}
      {hitbox}
    </>
  )

  return (
    <g id={containerId}>
      <g id={wrapperId}>
        {innerContent}
      </g>
    </g>
  )
}

export default MountainBase
