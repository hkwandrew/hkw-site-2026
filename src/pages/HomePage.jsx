import styled, { keyframes } from 'styled-components'
import ViewContainer from '@/components/ui/ViewContainer'
import { H3, Label, BodySmall } from '@/components/ui/Typography'
import usePageActive from '@/hooks/usePageActive'
import BlueMountain from '@/components/BlueMountain'
import GoldMountain from '@/components/GoldMountain'
import TreeMountain from '@/components/TreeMountain'
import UpperField from '@/components/UpperField'
import HomeMarmot from '@/components/characters/HomeMarmot'
import Plane from '@/components/Plane'

const riseIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(18px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const planeCrossPage = keyframes`
  from {
    transform: translate3d(calc(-100% - 80px), 0, 0);
  }

  to {
    transform: translate3d(calc(100vw + 80px), 0, 0);
  }
`

const planeDrift = keyframes`
  0% {
    transform: translate3d(0, 0, 0) rotate(0deg);
  }

  20% {
    transform: translate3d(3px, -5px, 0) rotate(-0.85deg);
  }

  50% {
    transform: translate3d(8px, -1px, 0) rotate(0.55deg);
  }

  80% {
    transform: translate3d(4px, 5px, 0) rotate(0.95deg);
  }

  100% {
    transform: translate3d(0, 0, 0) rotate(0deg);
  }
`

const rigSway = keyframes`
  0% {
    transform: rotate(0deg) translateY(0);
  }

  25% {
    transform: rotate(-0.35deg) translateY(0.25px);
  }

  50% {
    transform: rotate(0.25deg) translateY(-0.5px);
  }

  75% {
    transform: rotate(-0.2deg) translateY(0.25px);
  }

  100% {
    transform: rotate(0deg) translateY(0);
  }
`

const towLineSway = keyframes`
  0% {
    transform: rotate(0deg) translateY(0);
  }

  25% {
    transform: rotate(-0.35deg) translateY(0.15px);
  }

  50% {
    transform: rotate(0.2deg) translateY(-0.15px);
  }

  75% {
    transform: rotate(-0.25deg) translateY(0.1px);
  }

  100% {
    transform: rotate(0deg) translateY(0);
  }
`

const bannerTrail = keyframes`
  0% {
    transform: translateX(0) translateY(0) rotate(0deg);
  }

  25% {
    transform: translateX(-0.5px) translateY(0.15px) rotate(-0.15deg);
  }

  50% {
    transform: translateX(-1px) translateY(0.35px) rotate(0.1deg);
  }

  75% {
    transform: translateX(-0.5px) translateY(0.15px) rotate(-0.1deg);
  }

  100% {
    transform: translateX(0) translateY(0) rotate(0deg);
  }
`

const bannerFabricFlutter = keyframes`
  0% {
    transform: translateX(0) translateY(0) rotate(0deg) skewX(0deg) scaleY(1);
  }

  25% {
    transform: translateX(-0.25px) translateY(0.15px) rotate(0.15deg) skewX(-0.35deg) scaleY(1.006);
  }

  50% {
    transform: translateX(-0.5px) translateY(0.3px) rotate(-0.2deg) skewX(0.45deg) scaleY(0.996);
  }

  75% {
    transform: translateX(-0.25px) translateY(0.15px) rotate(0.1deg) skewX(-0.2deg) scaleY(1.003);
  }

  100% {
    transform: translateX(0) translateY(0) rotate(0deg) skewX(0deg) scaleY(1);
  }
`

const bannerTextDrift = keyframes`
  0% {
    transform: translateX(0) translateY(0);
  }

  25% {
    transform: translateX(-0.5px) translateY(0.15px);
  }

  50% {
    transform: translateX(-1px) translateY(0.4px);
  }

  75% {
    transform: translateX(-0.5px) translateY(0.15px);
  }

  100% {
    transform: translateX(0) translateY(0);
  }
`

const bannerHighlightSweep = keyframes`
  0% {
    transform: translateX(0);
    opacity: 0;
  }

  12% {
    opacity: 0;
  }

  24% {
    opacity: 1;
  }

  50% {
    transform: translateX(235px);
    opacity: 1;
  }

  62% {
    opacity: 0;
  }

  100% {
    transform: translateX(420px);
    opacity: 0;
  }
`

const propellerSpin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const motionStreakPulse = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-8px) scaleX(0.88);
  }

  20% {
    opacity: 0.28;
  }

  50% {
    opacity: 0.48;
    transform: translateX(0) scaleX(1);
  }

  100% {
    opacity: 0;
    transform: translateX(10px) scaleX(1.08);
  }
`

const DesktopHome = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
  height: 100%;
  pointer-events: none;

  @media (max-width: 767px) {
    display: none;
  }
`

const Content = styled.div`
  pointer-events: none;
  position: absolute;
  bottom: 150px;
  left: 119px;
  max-width: 809px;
  z-index: 5;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.yellow.gold};
  font-size: 24px;
  line-height: calc(26 / 24);
  font-variation-settings: 'wdth' 75, 'wght' 600;

  display: block;
`

const HeroText = styled(H3)`
  color: ${({ theme }) => theme.colors.yellow.light};
  margin-bottom: 0;
  line-height: 1.05;
  font-weight: 400;
  letter-spacing: unset;
`

const Footer = styled.footer`
  position: absolute;
  bottom: 39px;
  left: 119px;
  z-index: 5;
  pointer-events: auto;
`

const FooterText = styled(BodySmall)`
  color: ${({ theme }) => theme.colors.yellow.light};

  a {
    text-decoration-line: underline;
    text-decoration-style: solid;
    text-decoration-skip-ink: auto;
    text-decoration-thickness: auto;
    text-underline-offset: auto;
    text-underline-position: from-font;
  }
`

const MobileHome = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
  min-height: 100dvh;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.yellow.light};

  @media (min-width: 768px) {
    display: none;
  }
`

const MobileSceneWrap = styled.div`
  position: absolute;
  top: 76px;
  left: 0;
  width: 100%;
  height: calc(100% - 76px);
  pointer-events: none;
  z-index: 1;
`

const MobileSceneSvg = styled.svg`
  width: 100%;
  height: 100%;
`

const MobileFieldFill = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 520px;
  bottom: 0;
  background: ${({ theme }) => theme.colors.green};
  z-index: 2;
`


const HomeMarmotWrapper = styled.div`
  position: absolute;
  right: -75.38px;
  bottom:-36.36px ;
  width: 681px;
  height: 453px;
  z-index: 5;
`

const MobileCopy = styled.div`
  position: absolute;
  left: 20px;
  right: 18px;
  top: 314px;
  z-index: 4;
  animation: ${riseIn} 700ms ease both;

  @media (max-height: 660px) {
    top: 296px;
  }
`

const MobileKicker = styled(Label)`
  display: block;
  margin-bottom: 18px;
  color: ${({ theme }) => theme.colors.orange.base};
  font-size: 16px;
  line-height: 1.2;
  font-variation-settings: 'wdth' 67.5, 'wght' 600;
`

const MobileHero = styled.p`
  margin: 0;
  max-width: 353px;
  color: ${({ theme }) => theme.colors.yellow.light};
  font-size: 18px;
  line-height: 1.4;
  letter-spacing: -0.02em;
`

const MobileRoles = styled.div`
  display: grid;
  gap: 14px;
  margin-top: 28px;
`

const MobileRole = styled.span`
  width: fit-content;
  color: ${({ theme }) => theme.colors.orange.base};
  font-size: 16px;
  line-height: 1.2;
  text-decoration: underline;
  text-decoration-thickness: 1.5px;
  text-underline-offset: 4px;
`

const MobileFooter = styled.footer`
  position: absolute;
  left: 20px;
  bottom: 20px;
  z-index: 5;
`

const MobileFooterText = styled(BodySmall)`
  color: ${({ theme }) => theme.colors.yellow.light};
  font-size: 16px;
  line-height: 1.25;

  a {
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`

const PlaneTrack = styled.div`
  position: absolute;
  top: 47px;
  left: 0;
  z-index: 3;
  display: inline-flex;
  pointer-events: none;
  will-change: transform;
  animation: ${planeCrossPage} 30s linear infinite;
  animation-delay: -6s;

  @media (prefers-reduced-motion: reduce) {
    left: 252px;
    transform: none;
    animation: none;
  }

  @media (max-width: 767px) {
    top: 56px;
    left: clamp(92px, 29.26vw, 115px);
    animation: none;
  }
`

const PlaneShell = styled.div`
  --plane-motion-duration: 3.2s;
  width: 469.685px;
  aspect-ratio: 470 / 74;
  will-change: transform;
  animation: ${planeDrift} var(--plane-motion-duration) ease-in-out infinite;

  svg {
    width: 100%;
    height: 100%;
  }

  #hkw-plane {
    overflow: visible;
  }

  #plane-group,
  #banner-group {
    transform-box: fill-box;
    transform-origin: center;
  }

  #banner-rig,
  #tow-line,
  #banner-group,
  #banner-fabric,
  #banner-highlight,
  #banner-highlight-strip,
  #banner-text,
  #propeller-group,
  #motion-streaks {
    will-change: transform, opacity;
  }

  #banner-rig {
    transform-box: fill-box;
    transform-origin: right center;
    animation: ${rigSway} var(--plane-motion-duration) ease-in-out infinite;
  }

  #tow-line {
    transform-box: fill-box;
    transform-origin: right center;
    animation: ${towLineSway} var(--plane-motion-duration) ease-in-out infinite;
  }

  #banner-group {
    transform-box: fill-box;
    transform-origin: right center;
    animation: ${bannerTrail} var(--plane-motion-duration) ease-in-out infinite;
  }

  #banner-fabric {
    transform-box: fill-box;
    transform-origin: right center;
    animation: ${bannerFabricFlutter} var(--plane-motion-duration) ease-in-out infinite;
  }

  #banner-text {
    transform-box: fill-box;
    transform-origin: right center;
    animation: ${bannerTextDrift} var(--plane-motion-duration) ease-in-out infinite;
  }

  #banner-highlight-strip {
    transform-box: fill-box;
    transform-origin: center;
    animation: ${bannerHighlightSweep} var(--plane-motion-duration) linear infinite;
  }

  #propeller-group {
    transform-box: fill-box;
    transform-origin: center;
    animation: ${propellerSpin} 180ms linear infinite;
  }

  #motion-streaks {
    transform-box: fill-box;
    transform-origin: center;
    animation: ${motionStreakPulse} 1.4s ease-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: none;

    #banner-rig,
    #tow-line,
    #banner-group,
    #banner-fabric,
    #banner-text,
    #banner-highlight-strip,
    #propeller-group,
    #motion-streaks {
      animation: none;
      transform: none;
    }

    #motion-streaks {
      opacity: 0;
    }
  }

  @media (max-width: 767px) {
    --plane-motion-duration: 4.1s;
    width: min(207px, calc(100vw - 120px));

    #motion-streaks {
      opacity: 0;
      animation: none;
    }
  }
`

const HomeMobileScene = () => (
  <MobileSceneSvg viewBox="1380 150 980 1180" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
    <path
      d="M3960,0L0,0v1014h3975.5L3960,0Z"
      transform="translate(-1.849932 0)"
      fill="#fcfae5"
    />
    <BlueMountain />
    <GoldMountain />
    <g transform="translate(1706.222193,231.108808)">
      <path
        d="M1689.5,291c32.03,0,58-25.967,58-58s-25.97-58-58-58-58,25.967-58,58s25.97,58,58,58Z"
        transform="translate(-1689.5,-233)"
        fill="#d0471b"
      />
    </g>
    <TreeMountain />
    <UpperField />
  </MobileSceneSvg>
)

export default function Home() {
  const isActive = usePageActive()

  return (
    <>
      <PlaneTrack>
        <PlaneShell>
          <Plane />
        </PlaneShell>
      </PlaneTrack>
      <ViewContainer $isActive={isActive}>
        <DesktopHome>
          <Content>
            <Subtitle>HAPPY, KNOWLEDGABLE WORK</Subtitle>
            <HeroText as="h1">
              We are a digital design and marketing studio based in Spokane, Washington.
              We build unique online experiences and engaging campaigns for non-profits and fun brands.
            </HeroText>
          </Content>
          <Footer>
            <FooterText>
              &copy; 2026 HKW &nbsp;|&nbsp; <a href="#policies">Policies</a>
            </FooterText>
          </Footer>
        </DesktopHome>

        <MobileHome aria-label="HKW home mobile hero">
          <MobileSceneWrap>

            <HomeMobileScene />
          </MobileSceneWrap>
          <MobileFieldFill aria-hidden="true" />

          <MobileCopy>
            <MobileKicker>HAPPY, KNOWLEDGABLE WORK</MobileKicker>
            <MobileHero>
              We are a digital design and marketing studio based in Spokane, Washington.
              We build unique online experiences and engaging campaigns for non-profits and fun brands.
            </MobileHero>
            <MobileRoles>
              <MobileRole>(Non-profit workers)</MobileRole>
              <MobileRole>(B2B specialists)</MobileRole>
              <MobileRole>(Friendly maestros)</MobileRole>
            </MobileRoles>
          </MobileCopy>
          <MobileFooter>
            <MobileFooterText>
              &copy; 2026 HKW
              <br />
              <a href="#policies">Policies</a>
            </MobileFooterText>
          </MobileFooter>
        </MobileHome>
      </ViewContainer>
      <HomeMarmotWrapper>
        <HomeMarmot />
      </HomeMarmotWrapper>
    </>
  )
}
