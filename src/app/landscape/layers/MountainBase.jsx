import { useHomeHover } from '@/routes/home/homeHoverContext'

const MountainBase = ({
  containerId,
  wrapperId,
  container,
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
  const { clearHomeHoverRegion, homeHoverRegion, isHome, setHomeHoverRegion } =
    useHomeHover()
  const isHoverActive = isHome && homeHoverRegion === hoverRegion

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
        if (isHome) {
          setHomeHoverRegion(hoverRegion)
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
    <g id={containerId} transform={`translate(${container.x},${container.y})`}>
      <g id={wrapperId} transform='scale(1,1)'>
        {innerContent}
      </g>
    </g>
  )
}

export default MountainBase
