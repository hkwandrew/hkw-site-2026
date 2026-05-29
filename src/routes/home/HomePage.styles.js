import styled, { css, keyframes } from 'styled-components'
import { BodySmall, H4, applyTypography } from '@/shared/ui/Typography'
import { HOME_HOVER_REGION } from './homeHoverRegions'
import { getHomeHoverRegionPosition } from './homeHoverConfig'

// Shared timing and positioning
const MASCOT_HOVER_ART = getHomeHoverRegionPosition(HOME_HOVER_REGION.mascot)
export const ROOTS_DROP_DURATION_MS = 420
const ROOTS_DROP_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'
const MARMOT_BURIED_OFFSET_PX = 280
const MARMOT_BURIED_SCALE = 0.985
const MARMOT_HOVER_ENTER_MS = 420
const MARMOT_HOVER_EXIT_MS = 340
const MARMOT_HOVER_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

// Marmot motion
const marmotEmerge = keyframes`
  0% {
    opacity: 1;
    transform: translate3d(0, ${MARMOT_BURIED_OFFSET_PX}px, 0)
      scale(${MARMOT_BURIED_SCALE});
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

const marmotDescend = keyframes`
  0% {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }

  42% {
    opacity: 1;
    transform: translate3d(0, -6px, 0) scale(1.003);
  }

  100% {
    opacity: 1;
    transform: translate3d(0, ${MARMOT_BURIED_OFFSET_PX}px, 0)
      scale(${MARMOT_BURIED_SCALE});
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

const marmotHoverWave = keyframes`
  0%,
  100% {
    transform: rotate(0deg) translate3d(0, 0, 0);
  }

  34% {
    transform: rotate(-6deg) translate3d(-1px, -2px, 0);
  }

  62% {
    transform: rotate(4deg) translate3d(1px, 1px, 0);
  }
`

const marmotHoverMugBob = keyframes`
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }

  50% {
    transform: translate3d(0, -2px, 0);
  }
`

const marmotHoverPoseFloat = keyframes`
  0%,
  100% {
    transform: rotate(0deg) translate3d(0, 0, 0);
  }

  45% {
    transform: rotate(-1.2deg) translate3d(-1px, -3px, 0);
  }

  72% {
    transform: rotate(0.65deg) translate3d(1px, -1px, 0);
  }
`

const marmotHoverBlink = keyframes`
  0%,
  88%,
  94%,
  100% {
    opacity: 1;
    transform: scaleY(1);
  }

  90%,
  92% {
    opacity: 1;
    transform: scaleY(0.72);
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

// Plane motion
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

const propellerSpin = keyframes`
  0% {
    opacity: 0.94;
    transform: rotateX(0deg) scaleY(1);
  }

  50% {
    opacity: 0.38;
    transform: rotateX(90deg) scaleY(0.12);
  }

  100% {
    opacity: 0.94;
    transform: rotateX(180deg) scaleY(1);
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

// Page shell and content
export const DesktopHome = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
  height: 100%;
  pointer-events: none;
`

export const Content = styled.div`
  pointer-events: none;
  position: absolute;
  bottom: 150px;
  left: 119px;
  max-width: 809px;
  z-index: 5;
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 57% 20px 0;
    position: unset;
  }
`

export const Title = styled.p`
  color: ${({ theme }) => theme.colors.yellow.gold};
  ${applyTypography('formButton')}
  line-height: 1.3;
  text-transform: none;
  font-variation-settings:
    'wdth' 90,
    'wght' 700;
  display: block;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 16px;
    line-height: 1.625;
    font-variation-settings:
      'wdth' 68,
      'wght' 600;
  }
`

export const HeroText = styled(H4)`
  color: ${({ theme }) => theme.colors.yellow.light};
  margin-bottom: 0;
  line-height: 1.4;
  font-weight: 400;
  letter-spacing: unset;
  max-width: 560.57px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 18px;
    letter-spacing: -0.36px;
  }
`

export const Footer = styled.footer`
  position: absolute;
  bottom: 39px;
  left: 119px;
  z-index: 5;
  pointer-events: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 215px 0 0 20px;
    position: unset;
  }
`

export const FooterText = styled.div`
  color: ${({ theme }) => theme.colors.yellow.light};

  a {
    text-decoration-line: underline;
    text-decoration-style: solid;
    text-decoration-skip-ink: auto;
    text-decoration-thickness: auto;
    text-underline-offset: auto;
    text-underline-position: from-font;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
    flex-direction: column;
    font-size: 14px;

    .separator {
      display: none;
    }
  }
`

// Marmot scene
export const HomeMarmotClip = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    overflow: hidden;
  }
`

export const HomeMarmotWrapper = styled.div`
  position: absolute;
  right: -74.21px;
  bottom: -40.61px;
  width: 681px;
  aspect-ratio: 681 / 453;
  z-index: 5;
  overflow: visible;
  pointer-events: none;
  transform: rotate(-0.298deg);

  #marmot-character-intro,
  #marmot-character-idle,
  #marmot-character-hover,
  #marmot-hover-art,
  #marmot-hover-wave-limb,
  #marmot-hover-face,
  #marmot-hover-mug,
  #left-ear,
  #right-ear,
  #left-eye-core,
  #right-eye-core,
  #left-eye-lash,
  #right-eye-lash,
  #marmot-hover-blink,
  #marmot-hover-blink image,
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
    transition: opacity ${MARMOT_HOVER_EXIT_MS}ms ${MARMOT_HOVER_EASE};
  }

  #marmot-character-hover {
    pointer-events: none;
    opacity: 0;
    transform-origin: center bottom;
    transform: translate3d(0, 9px, 0) scale(0.985);
    transition:
      opacity ${MARMOT_HOVER_EXIT_MS}ms ${MARMOT_HOVER_EASE},
      transform ${MARMOT_HOVER_EXIT_MS}ms ${MARMOT_HOVER_EASE};
  }

  #marmot-hover-wave-limb {
    transform-origin: 16% 86%;
  }

  #marmot-hover-face {
    transform-origin: center;
  }

  #marmot-hover-mug {
    transform-origin: center bottom;
  }

  #marmot-hover-art {
    transform-origin: center bottom;
  }

  #marmot-hover-blink {
    opacity: 1;
  }

  #marmot-hover-blink image {
    transform-origin: center;
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
    #marmot-character-hover,
    #marmot-hover-art,
    #marmot-hover-wave-limb,
    #marmot-hover-face,
    #marmot-hover-mug,
    #left-ear,
    #right-ear,
    #left-eye-core,
    #right-eye-core,
    #left-eye-lash,
    #right-eye-lash,
    #marmot-hover-blink,
    #marmot-hover-blink image,
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: min(478px, 122vw);
  }

  @media (max-width: ${({ theme }) =>
      theme.breakpoints.mobile}) and (max-height: 760px) {
    right: -127px;
    bottom: -38px;
    width: 457px;
  }
`

export const MarmotCharacterWrap = styled.div`
  --marmot-hover-x: 0px;
  --marmot-hover-y: 0px;
  position: relative;
  z-index: 1;
  transform: rotate(-0.298deg);

  svg {
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  #marmot-character-intro {
    transform-origin: center bottom;
  }

  #marmot-character-idle {
    opacity: ${({ $isHoverActive }) => ($isHoverActive ? 0 : 1)};
    transition-duration: ${({ $isHoverActive }) =>
      $isHoverActive
        ? `${MARMOT_HOVER_ENTER_MS}ms`
        : `${MARMOT_HOVER_EXIT_MS}ms`};
  }

  #marmot-character-hover {
    opacity: ${({ $isHoverActive }) => ($isHoverActive ? 1 : 0)};
    transform: ${({ $isHoverActive }) =>
      $isHoverActive
        ? `translate3d(
            var(--marmot-hover-x),
            var(--marmot-hover-y),
            0
          ) scale(1)`
        : 'translate3d(0, 9px, 0) scale(0.985)'};
    transition-duration: ${({ $isHoverActive }) =>
      $isHoverActive
        ? `${MARMOT_HOVER_ENTER_MS}ms`
        : `${MARMOT_HOVER_EXIT_MS}ms`};
  }

  ${({ $isHoverActive }) =>
    $isHoverActive &&
    css`
      #marmot-hover-wave-limb {
        animation: ${marmotHoverWave} 1.08s ease-in-out infinite;
      }

      #marmot-hover-art {
        animation: ${marmotHoverPoseFloat} 2.6s ease-in-out infinite;
      }

      #marmot-hover-mug {
        animation: ${marmotHoverMugBob} 2.2s ease-in-out infinite;
      }

      #marmot-hover-blink {
        opacity: 1;
      }

      #marmot-hover-blink image {
        animation: ${marmotHoverBlink} 5.6s steps(1, end) infinite;
      }
    `}

  ${({ $isTransitioning }) =>
    $isTransitioning
      ? css`
          #marmot-character-intro {
            animation: ${marmotDescend} ${ROOTS_DROP_DURATION_MS}ms
              ${ROOTS_DROP_EASE} both;
          }

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

          #marmot-character-idle {
            opacity: 1;
          }

          #marmot-character-hover {
            opacity: 0;
            transition: none;
            visibility: hidden;
          }
        `
      : css`
          #marmot-character-intro {
            animation: ${marmotEmerge} 860ms cubic-bezier(0.22, 1, 0.36, 1) both;
          }
        `}

  @media (prefers-reduced-motion: reduce) {
    #marmot-character-intro {
      transition: none;
      transform: none;
      opacity: 1;
    }

    #marmot-character-hover,
    #marmot-hover-art,
    #marmot-hover-wave-limb,
    #marmot-hover-face,
    #marmot-hover-mug,
    #marmot-hover-blink,
    #marmot-hover-blink image {
      animation: none;
      transition: none;
    }

    #marmot-character-hover {
      transform: none;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    transform: rotate(-2.012deg);
  }
`

export const StumpHoverOverlay = styled.div`
  position: absolute;
  z-index: 2;
  right: ${MASCOT_HOVER_ART.right}px;
  bottom: ${MASCOT_HOVER_ART.bottom}px;
  width: ${MASCOT_HOVER_ART.width}px;
  max-width: none;
  pointer-events: none;
  opacity: ${({ $active, $isTransitioning }) =>
    $isTransitioning ? 0 : $active ? 1 : 0};
  transform: translate3d(
    0,
    ${({ $active, $isTransitioning }) =>
      $isTransitioning ? '22px' : $active ? '0' : '10px'},
    0
  );
  transition:
    opacity 220ms ease,
    transform 220ms ease;
  filter: drop-shadow(0 8px 16px rgba(43, 30, 21, 0.18));

  svg {
    width: 100%;
    height: auto;
  }
`

export const StumpTrigger = styled.button`
  position: absolute;
  top: 0;
  left: 118px;
  width: 436px;
  height: 376px;
  z-index: 3;
  border-radius: 46% 42% 50% 54%;
  background: transparent;
  pointer-events: ${({ $isInteractive }) => ($isInteractive ? 'auto' : 'none')};
  cursor: ${({ $isInteractive }) => ($isInteractive ? 'pointer' : 'default')};

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.yellow.light};
    outline-offset: 6px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    top: 7px;
    left: 48px;
    width: 342px;
    height: 276px;
  }

  @media (max-width: ${({ theme }) =>
      theme.breakpoints.mobile}) and (max-height: 760px) {
    top: 4px;
    left: 40px;
  }
`

// Plane scene
export const PlaneTrack = styled.div`
  position: absolute;
  top: 47px;
  left: 0;
  z-index: 80;
  display: inline-flex;
  pointer-events: none;
  will-change: transform;
  animation: ${planeCrossPage} 30s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    left: 252px;
    transform: none;
    animation: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    top: 12px;
    left: clamp(92px, 29.26vw, 115px);
    animation: none;
  }
`

export const PlaneShell = styled.div`
  --plane-motion-duration: 3.2s;
  width: 469.685px;
  aspect-ratio: 470 / 74;
  perspective: 480px;
  transform-style: preserve-3d;
  will-change: transform;
  animation: ${planeDrift} var(--plane-motion-duration) ease-in-out infinite;

  svg {
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  #hkw-plane {
    overflow: visible;
  }

  #plane-group {
    transform-box: fill-box;
    transform-origin: center;
  }

  #banner-text,
  #propeller-group,
  #motion-streaks {
    will-change: transform, opacity;
  }

  #banner-text {
    transform-box: fill-box;
    transform-origin: center;
  }

  #propeller-group {
    transform-box: fill-box;
    transform-origin: center;
    transform-style: preserve-3d;
    backface-visibility: hidden;
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

    #propeller-group,
    #motion-streaks {
      animation: none;
      transform: none;
    }

    #motion-streaks {
      opacity: 0;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    --plane-motion-duration: 4.1s;
    width: min(207px, calc(100vw - 120px));

    #motion-streaks {
      opacity: 0;
      animation: none;
    }
  }
`
