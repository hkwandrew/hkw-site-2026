import styled from 'styled-components'
import Layer from './Layer'

const SceneContainer = styled.div`
  position: fixed;
  inset: 0;
  overflow: hidden;
  z-index: 0;
`

// Transform configs for each layer per view
// Values are percentages for translate, absolute for scale/opacity
const layerConfigs = {
  sky: {
    home: {},
    services: {},
    about: { y: -5 },
    work: {},
    contact: {},
  },
  sun: {
    home: { y: 0, scale: 1, opacity: 1 },
    services: { y: -5, scale: 1, opacity: 1 },
    about: { y: -15, scale: 1.1, opacity: 1 },
    work: { y: -5, scale: 1, opacity: 1 },
    contact: { opacity: 0.3 },
  },
  mountainsBack: {
    home: { x: 0, y: 0 },
    services: { x: -3, y: 0 },
    about: { x: -6, y: -3 },
    work: { x: -9, y: 0 },
    contact: { x: 0, y: 0 },
  },
  mountainsFront: {
    home: { x: 0, y: 0 },
    services: { x: -5, y: 0 },
    about: { x: -10, y: -5 },
    work: { x: -15, y: 0 },
    contact: { x: 0, y: 0 },
  },
  hills: {
    home: { x: 0, y: 0 },
    services: { x: -8, y: 0 },
    about: { x: -16, y: -8 },
    work: { x: -24, y: 0 },
    contact: { x: 0, y: 5 },
  },
  clouds: {
    home: { opacity: 0, y: 10 },
    services: { opacity: 0, y: 10 },
    about: { opacity: 1, y: 0 },
    work: { opacity: 0, y: 10 },
    contact: { opacity: 0, y: 10 },
  },
  foreground: {
    home: { x: 0, y: 0 },
    services: { x: -10, y: 0 },
    about: { x: -20, y: -10 },
    work: { x: -30, y: 0 },
    contact: { x: 0, y: 10 },
  },
}

// Placeholder landscape layers using CSS shapes
const SkyLayer = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.yellow.light} 0%,
    ${({ theme }) => theme.colors.blue.light} 40%,
    ${({ theme }) => theme.colors.blue.light} 100%
  );
`

const SunCircle = styled.div`
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.orange.base};
`

const MountainShape = styled.div`
  position: absolute;
  bottom: 40%;
  width: 200%;
  height: 40%;
  background: ${({ $color }) => $color};
  clip-path: polygon(0% 100%, 5% 40%, 12% 60%, 20% 20%, 30% 50%, 40% 10%, 55% 45%, 65% 25%, 75% 55%, 85% 15%, 95% 50%, 100% 30%, 100% 100%);
`

const HillShape = styled.div`
  position: absolute;
  bottom: 0;
  width: 200%;
  height: 55%;
  background: ${({ $color }) => $color};
  clip-path: ellipse(80% 50% at 50% 100%);
`

const OrangeHill = styled.div`
  position: absolute;
  bottom: 15%;
  left: 10%;
  width: 120%;
  height: 35%;
  background: ${({ theme }) => theme.colors.yellow.gold};
  clip-path: ellipse(60% 50% at 40% 100%);
`

const ForegroundGround = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50%;
  background: ${({ theme }) => theme.colors.green};
  clip-path: ellipse(90% 60% at 50% 100%);
`

const CloudGroup = styled.div`
  position: absolute;
  bottom: 10%;
  width: 100%;
  height: 60%;
`

const Cloud = styled.div`
  position: absolute;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size * 0.6}px;
  left: ${({ $left }) => $left}%;
  bottom: ${({ $bottom }) => $bottom}%;
`

function getLayerProps(layerName, activeView) {
  const config = layerConfigs[layerName]?.[activeView] || {}
  return {
    x: config.x || 0,
    y: config.y || 0,
    scale: config.scale || 1,
    opacity: config.opacity != null ? config.opacity : 1,
  }
}

export default function LandscapeScene({ activeView }) {
  return (
    <SceneContainer aria-hidden="true">
      <Layer {...getLayerProps('sky', activeView)}>
        <SkyLayer />
      </Layer>

      <Layer {...getLayerProps('sun', activeView)}>
        <SunCircle />
      </Layer>

      <Layer {...getLayerProps('mountainsBack', activeView)}>
        <MountainShape $color="#2d3a2d" style={{ bottom: '42%', opacity: 0.6 }} />
      </Layer>

      <Layer {...getLayerProps('mountainsFront', activeView)}>
        <MountainShape $color="#1a2a1a" style={{ bottom: '38%' }} />
      </Layer>

      <Layer {...getLayerProps('hills', activeView)}>
        <OrangeHill />
        <HillShape $color="#415441" style={{ left: '-20%' }} />
      </Layer>

      <Layer {...getLayerProps('clouds', activeView)}>
        <CloudGroup>
          <Cloud $color="#1C2D38" $size={300} $left={5} $bottom={30} />
          <Cloud $color="#1C2D38" $size={350} $left={30} $bottom={20} />
          <Cloud $color="#1C2D38" $size={280} $left={60} $bottom={35} />
          <Cloud $color="#5495D6" $size={250} $left={15} $bottom={15} />
          <Cloud $color="#80BFFF" $size={320} $left={45} $bottom={5} />
          <Cloud $color="#AFD3FC" $size={280} $left={70} $bottom={10} />
          <Cloud $color="#80BFFF" $size={200} $left={85} $bottom={25} />
        </CloudGroup>
      </Layer>

      <Layer {...getLayerProps('foreground', activeView)}>
        <ForegroundGround />
      </Layer>
    </SceneContainer>
  )
}
