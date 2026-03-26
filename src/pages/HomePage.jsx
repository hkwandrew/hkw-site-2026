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
import StumpHoverArt from '@/components/StumpHoverArt'
import { useHomeHover } from '@/context/homeHover'
import {
  getHomeHoverRegionPosition,
  HOME_HOVER_REGION,
} from '@/homeHoverConfig'

const MASCOT_HOVER_ART = Object.freeze(
  getHomeHoverRegionPosition(HOME_HOVER_REGION.mascot),
)

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

const marmotEmerge = keyframes`
  0% {
    opacity: 1;
    transform: translate3d(0, 280px, 0) scale(0.985);
  }

  58% {
    opacity: 1;
    transform: translate3d(0, -6px, 0) scale(1.003);
  }

  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }
`

const marmotIdleFloat = keyframes`
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }

  50% {
    transform: translate3d(0, -3px, 0);
  }
`

const steamRiseLeft = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(-2px, 10px, 0) scale(0.78);
  }

  18% {
    opacity: 0.55;
  }

  62% {
    opacity: 0.32;
  }

  100% {
    opacity: 0;
    transform: translate3d(-10px, -28px, 0) scale(1.12);
  }
`

const steamRiseCenter = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, 12px, 0) scale(0.74);
  }

  16% {
    opacity: 0.62;
  }

  56% {
    opacity: 0.36;
    transform: translate3d(4px, -10px, 0) scale(0.96);
  }

  100% {
    opacity: 0;
    transform: translate3d(8px, -30px, 0) scale(1.08);
  }
`

const steamRiseRight = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(1px, 10px, 0) scale(0.76);
  }

  20% {
    opacity: 0.58;
  }

  58% {
    opacity: 0.3;
    transform: translate3d(-3px, -11px, 0) scale(0.98);
  }

  100% {
    opacity: 0;
    transform: translate3d(-6px, -27px, 0) scale(1.05);
  }
`

const marmotBlink = keyframes`
  0%,
  7.9%,
  31.9%,
  100% {
    opacity: 1;
  }

  8.25%,
  32.25% {
    opacity: 0.35;
  }

  8.45%,
  9.1%,
  32.45%,
  33.1% {
    opacity: 0.05;
  }

  9.35%,
  33.35% {
    opacity: 0.7;
  }

  9.6%,
  33.6% {
    opacity: 1;
  }
`

const marmotLashBlink = keyframes`
  0%,
  7%,
  31%,
  100% {
    transform: translateY(0);
  }

  8%,
  32% {
    transform: translateY(2px);
  }

  8.5%,
  9.5%,
  32.5%,
  33.5% {
    transform: translateY(3.35px);
  }

  10.5%,
  34.5% {
    transform: translateY(1px);
  }
`

const leftEarWriggle = keyframes`
  0%,
  100% {
    transform: rotate(0deg);
  }

  14% {
    transform: rotate(-6deg) translateY(-1.4px);
  }

  22% {
    transform: rotate(3.1deg) translateY(0.15px);
  }

  30% {
    transform: rotate(-1.8deg) translateY(-0.7px);
  }

  38% {
    transform: rotate(0deg);
  }
`

const rightEarWriggle = keyframes`
  0%,
  100% {
    transform: rotate(0deg);
  }

  12% {
    transform: rotate(6.75deg) translateY(-0.9px);
  }

  20% {
    transform: rotate(-3.15deg) translateY(0.1px);
  }

  28% {
    transform: rotate(1.95deg) translateY(-0.65px);
  }

  36% {
    transform: rotate(0deg);
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
  font-variation-settings:
    'wdth' 68,
    'wght' 600;

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
  bottom: -36.36px;
  width: 681px;
  aspect-ratio: 681 / 453;
  z-index: 5;
  overflow: visible;
  pointer-events: auto;

  svg {
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  #marmot-character-intro,
  #marmot-character-idle,
  #left-ear,
  #right-ear,
  #left-eye-core,
  #right-eye-core,
  #left-eye-lash,
  #right-eye-lash,
  #coffee-steam path {
    transform-box: fill-box;
    will-change: transform, opacity;
  }

  #marmot-character-intro {
    opacity: 0;
    transform-origin: center bottom;
    animation: ${marmotEmerge} 860ms cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  #marmot-character-idle {
    transform-origin: center bottom;
    animation: ${marmotIdleFloat} 5.8s ease-in-out 900ms infinite;
  }

  #left-ear {
    transform-origin: center bottom;
    animation: ${leftEarWriggle} 6.4s ease-in-out 1.2s infinite;
  }

  #right-ear {
    transform-origin: center bottom;
    animation: ${rightEarWriggle} 5.9s ease-in-out 1.45s infinite;
  }

  #left-eye-core,
  #right-eye-core {
    transform-origin: center;
    animation: ${marmotBlink} 8.8s steps(1, end) 1.25s infinite;
  }

  #left-eye-lash,
  #right-eye-lash {
    transform-origin: center;
    animation: ${marmotLashBlink} 8.8s ease-in-out 1.25s infinite;
  }

  #coffee-steam {
    pointer-events: none;
  }

  #coffee-steam path {
    opacity: 0;
    transform-origin: center bottom;
  }

  #steam-wisp-1 {
    animation: ${steamRiseLeft} 3.6s ease-out 1.05s infinite;
  }

  #steam-wisp-2 {
    animation: ${steamRiseCenter} 3.15s ease-out 1.55s infinite;
  }

  #steam-wisp-3 {
    animation: ${steamRiseRight} 2.85s ease-out 1.95s infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    #marmot-character-intro,
    #marmot-character-idle,
    #left-ear,
    #right-ear,
    #left-eye-core,
    #right-eye-core,
    #left-eye-lash,
    #right-eye-lash,
    #coffee-steam path {
      animation: none;
      transform: none;
    }

    #marmot-character-intro {
      opacity: 1;
    }

    #coffee-steam path {
      opacity: 0;
    }
  }

  @media (max-width: 767px) {
    right: -128px;
    bottom: 100px;
    width: min(478px, 122vw);
    pointer-events: none;
  }

  @media (max-width: 767px) and (max-height: 760px) {
    right: -118px;
    bottom: 76px;
    width: min(446px, 122vw);
  }
`

const StumpHoverOverlay = styled.div`
  position: absolute;
  right: ${MASCOT_HOVER_ART.right}px;
  bottom: ${MASCOT_HOVER_ART.bottom}px;
  width: ${MASCOT_HOVER_ART.width}px;
  max-width: none;
  pointer-events: none;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transform: translate3d(0, ${({ $active }) => ($active ? '0' : '10px')}, 0);
  transition:
    opacity 220ms ease,
    transform 220ms ease;

  svg {
    width: 100%;
    height: auto;
  }
`

const MobileCopy = styled.div`
  position: absolute;
  left: 20px;
  top: 285px;
  width: min(353px, calc(100vw - 37px));
  z-index: 4;
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: ${riseIn} 700ms ease both;

  @media (max-height: 660px) {
    top: 264px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const MobileKicker = styled(Label)`
  display: block;
  width: min(267px, calc(100vw - 40px));
  color: ${({ theme }) => theme.colors.orange.base};
  font-size: 16px;
  line-height: calc(26 / 16);
  font-variation-settings:
    'wdth' 68,
    'wght' 600;
`

const MobileHero = styled.p`
  margin: 0;
  width: min(353px, calc(100vw - 37px));
  max-width: 353px;
  color: ${({ theme }) => theme.colors.yellow.light};
  font-size: 18px;
  line-height: 1.4;
  letter-spacing: -0.02em;
`

const MobileRoles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const MobileRole = styled.span`
  display: block;
  width: fit-content;
  color: ${({ theme }) => theme.colors.orange.base};
  font-size: 16px;
  line-height: 40px;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
`

const MobileFooter = styled.footer`
  position: absolute;
  left: 20px;
  bottom: 146px;
  z-index: 6;

  @media (max-height: 760px) {
    bottom: 112px;
  }
`

const MobileFooterText = styled(BodySmall)`
  color: ${({ theme }) => theme.colors.yellow.light};
  font-size: 14px;
  line-height: 1.45;
  font-variation-settings:
    'wdth' 100,
    'wght' 300;

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
    animation: ${bannerFabricFlutter} var(--plane-motion-duration) ease-in-out
      infinite;
  }

  #banner-text {
    transform-box: fill-box;
    transform-origin: right center;
    animation: ${bannerTextDrift} var(--plane-motion-duration) ease-in-out
      infinite;
  }

  #banner-highlight-strip {
    transform-box: fill-box;
    transform-origin: center;
    animation: ${bannerHighlightSweep} var(--plane-motion-duration) linear
      infinite;
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
  <MobileSceneSvg
    viewBox='1380 150 980 1180'
    preserveAspectRatio='xMidYMin slice'
    aria-hidden='true'
  >
    <path
      d='M3960,0L0,0v1014h3975.5L3960,0Z'
      transform='translate(-1.849932 0)'
      fill='#fcfae5'
    />
    <BlueMountain />
    <GoldMountain />
    <g transform='translate(1706.222193,231.108808)'>
      <path
        d='M1689.5,291c32.03,0,58-25.967,58-58s-25.97-58-58-58-58,25.967-58,58s25.97,58,58,58Z'
        transform='translate(-1689.5,-233)'
        fill='#d0471b'
      />
    </g>
    <TreeMountain />
    <UpperField />
  </MobileSceneSvg>
)

export default function Home() {
  const isActive = usePageActive()
  const { clearHomeHoverRegion, homeHoverRegion, isHome, setHomeHoverRegion } =
    useHomeHover()
  const isStumpHoverActive =
    isHome && homeHoverRegion === HOME_HOVER_REGION.mascot

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
            <HeroText as='h1'>
              We are a digital design and marketing studio based in Spokane,
              Washington. We build unique online experiences and engaging
              campaigns for non-profits and fun brands.
            </HeroText>
          </Content>
          <Footer>
            <FooterText>
              &copy; 2026 HKW &nbsp;|&nbsp; <a href='#policies'>Policies</a>
            </FooterText>
          </Footer>
        </DesktopHome>

        <MobileHome aria-label='HKW home mobile hero'>
          <MobileSceneWrap>
            <HomeMobileScene />
          </MobileSceneWrap>
          <MobileFieldFill aria-hidden='true' />

          <MobileCopy>
            <MobileKicker>HAPPY, KNOWLEDGABLE WORK</MobileKicker>
            <MobileHero>
              We are a digital design and marketing studio based in Spokane,
              Washington. We build unique online experiences and engaging
              campaigns for non-profits and fun brands.
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
              <a href='#policies'>Policies</a>
            </MobileFooterText>
          </MobileFooter>
        </MobileHome>
      </ViewContainer>
      <HomeMarmotWrapper
        onMouseEnter={() => {
          if (isHome) {
            setHomeHoverRegion(HOME_HOVER_REGION.mascot)
          }
        }}
        onMouseLeave={() => {
          if (isHome) {
            clearHomeHoverRegion()
          }
        }}
      >
        <StumpHoverOverlay aria-hidden='true' $active={isStumpHoverActive}>
          <StumpHoverArt />
        </StumpHoverOverlay>
        <HomeMarmot />
      </HomeMarmotWrapper>
    </>
  )
}
