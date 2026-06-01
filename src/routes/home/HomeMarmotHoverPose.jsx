import beanieSrc from './assets/marmot-hover-beanie.svg'
import blinkSrc from './assets/marmot-hover-blink.svg'
import bodySrc from './assets/marmot-hover-body.svg'
import eyeLeftSrc from './assets/marmot-hover-eye-left.svg'
import eyeRightSrc from './assets/marmot-hover-eye-right.svg'
import faceSrc from './assets/marmot-hover-face.svg'
import leftArmSrc from './assets/marmot-hover-left-arm.svg'
import leftHandSrc from './assets/marmot-hover-left-hand.svg'
import mouthSrc from './assets/marmot-hover-mouth.svg'
import mugSrc from './assets/marmot-hover-mug.svg'
import noseSrc from './assets/marmot-hover-nose.svg'
import pawSrc from './assets/marmot-hover-paw.svg'
import rightHandSrc from './assets/marmot-hover-right-hand.svg'
import waveArmSrc from './assets/marmot-hover-wave-arm.svg'

const HOVER_FRAME_X = 190
const HOVER_FRAME_Y = 4
const HOVER_FRAME_SCALE = 1.041

const toFrameLayer = ({ height, width, x, y }) => ({
  height,
  width,
  x: x - 1037,
  y: y - 615,
})

const HoverLayer = ({
  href,
  id,
  mirror = true,
  rotate = 0,
  x,
  y,
  width,
  height,
}) => {
  const layer = toFrameLayer({ height, width, x, y })
  const placement = mirror
    ? `translate(${layer.x + layer.width} ${layer.y}) scale(-1 1)`
    : `translate(${layer.x} ${layer.y})`
  const rotation = rotate
    ? `rotate(${rotate} ${layer.width / 2} ${layer.height / 2})`
    : null

  return (
    <g id={id} transform={placement}>
      <g transform={rotation ?? undefined}>
        <image
          href={href}
          width={layer.width}
          height={layer.height}
          preserveAspectRatio='none'
        />
      </g>
    </g>
  )
}

const HomeMarmotHoverPose = () => (
  <g id='marmot-character-hover' aria-hidden='true'>
    <g
      id='marmot-hover-placement'
      transform={`translate(${HOVER_FRAME_X} ${HOVER_FRAME_Y}) scale(${HOVER_FRAME_SCALE})`}
    >
      <g id='marmot-hover-art'>
        <HoverLayer
          id='marmot-hover-body'
          href={bodySrc}
          x={1037}
          y={732.678}
          width={230.289}
          height={146.834}
        />
        <HoverLayer
          id='marmot-hover-left-arm'
          href={leftArmSrc}
          x={1218.384}
          y={711.885}
          width={89.424}
          height={126.259}
        />
        <g id='marmot-hover-wave-limb'>
          <HoverLayer
            id='marmot-hover-wave-arm'
            href={waveArmSrc}
            x={1273.104}
            y={659.251}
            width={58.896}
            height={105.267}
          />
          <HoverLayer
            id='marmot-hover-paw'
            href={pawSrc}
            x={1303.776}
            y={615.014}
            width={46.224}
            height={57.754}
          />
        </g>
        <g id='marmot-hover-face'>
          <HoverLayer
            id='marmot-hover-face-base'
            href={faceSrc}
            x={1081.584}
            y={651.059}
            width={155.52}
            height={128.41}
          />
          <HoverLayer
            id='marmot-hover-right-eye'
            href={eyeRightSrc}
            x={1110.816}
            y={654.336}
            width={20.16}
            height={17.715}
          />
          <HoverLayer
            id='marmot-hover-left-eye'
            href={eyeLeftSrc}
            x={1188.864}
            y={650.342}
            width={14.256}
            height={18.739}
          />
          <HoverLayer
            id='marmot-hover-nose'
            href={noseSrc}
            x={1148.976}
            y={704.512}
            width={57.024}
            height={35.84}
          />
          <HoverLayer
            id='marmot-hover-blink'
            href={blinkSrc}
            x={1116}
            y={670.822}
            width={85.824}
            height={18.227}
          />
          <HoverLayer
            id='marmot-hover-mouth'
            href={mouthSrc}
            x={1159.632}
            y={732.979}
            width={39.312}
            height={23.654}
          />
        </g>
        <g id='marmot-hover-mug'>
          <HoverLayer
            id='marmot-hover-mug-art'
            href={mugSrc}
            mirror={false}
            rotate={-0.3}
            x={1163.622}
            y={809.249}
            width={65.821}
            height={71.015}
          />
          <HoverLayer
            id='marmot-hover-left-hand'
            href={leftHandSrc}
            x={1046.448}
            y={742.093}
            width={79.92}
            height={135.373}
          />
          <HoverLayer
            id='marmot-hover-right-hand'
            href={rightHandSrc}
            x={1091.52}
            y={803.226}
            width={108.288}
            height={84.275}
          />
        </g>
        <HoverLayer
          id='marmot-hover-beanie'
          href={beanieSrc}
          mirror={false}
          rotate={4.34}
          x={1121.04}
          y={615.014}
          width={80.64}
          height={56.32}
        />
      </g>
    </g>
  </g>
)

export default HomeMarmotHoverPose
