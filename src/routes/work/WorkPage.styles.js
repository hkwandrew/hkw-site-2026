import styled, { css, keyframes } from 'styled-components'
import ArrowButton from '@/shared/ui/ArrowButton'
import { applyTypography } from '@/shared/ui/Typography'
import ViewContainer from '@/shared/ui/ViewContainer'

const studyPaneSlideIn = keyframes`
  from {
    opacity: 0;
    transform: translate3d(var(--study-pane-start), 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`

const studyPaneSlideOut = keyframes`
  from {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  to {
    opacity: 0;
    transform: translate3d(var(--study-pane-end), 0, 0);
  }
`

const marmotIdleFloat = keyframes`
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }

  50% {
    transform: translate3d(0, -1.6px, 0);
  }
`

const steamRiseLeft = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(-1px, 5px, 0) scale(0.82);
  }

  20% {
    opacity: 0.5;
  }

  62% {
    opacity: 0.26;
  }

  100% {
    opacity: 0;
    transform: translate3d(-5px, -15px, 0) scale(1.08);
  }
`

const steamRiseCenter = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, 5px, 0) scale(0.8);
  }

  18% {
    opacity: 0.56;
  }

  58% {
    opacity: 0.28;
    transform: translate3d(2px, -6px, 0) scale(0.94);
  }

  100% {
    opacity: 0;
    transform: translate3d(4px, -16px, 0) scale(1.05);
  }
`

const steamRiseRight = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(1px, 5px, 0) scale(0.78);
  }

  22% {
    opacity: 0.48;
  }

  56% {
    opacity: 0.22;
    transform: translate3d(-2px, -6px, 0) scale(0.94);
  }

  100% {
    opacity: 0;
    transform: translate3d(-4px, -15px, 0) scale(1.04);
  }
`

const marmotBlink = keyframes`
  0%,
  8%,
  32%,
  100% {
    transform: translateY(0) scaleY(1);
  }

  8.4%,
  32.4% {
    transform: translateY(0.45px) scaleY(0.42);
  }

  8.8%,
  9.35%,
  32.8%,
  33.35% {
    transform: translateY(0.9px) scaleY(0.08);
  }

  9.8%,
  33.8% {
    transform: translateY(0.2px) scaleY(0.66);
  }
`

const leftEarWriggle = keyframes`
  0%,
  100% {
    transform: rotate(0deg);
  }

  14% {
    transform: rotate(-5deg) translateY(-0.75px);
  }

  22% {
    transform: rotate(2.6deg) translateY(0.1px);
  }

  30% {
    transform: rotate(-1.4deg) translateY(-0.35px);
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
    transform: rotate(5.4deg) translateY(-0.55px);
  }

  20% {
    transform: rotate(-2.4deg) translateY(0.05px);
  }

  28% {
    transform: rotate(1.6deg) translateY(-0.3px);
  }

  36% {
    transform: rotate(0deg);
  }
`

const getStudyPaneMotion = ({ $direction, $state }) => {
  const forward = $direction >= 0
  const startOffset = forward ? '56px' : '-56px'
  const endOffset = forward ? '-56px' : '56px'

  if ($state === 'leaving') {
    return css`
      --study-pane-end: ${endOffset};
      animation: ${studyPaneSlideOut} 420ms cubic-bezier(0.22, 1, 0.36, 1) both;
      pointer-events: none;
      z-index: 1;
    `
  }

  return css`
    --study-pane-start: ${startOffset};
    animation: ${studyPaneSlideIn} 420ms cubic-bezier(0.22, 1, 0.36, 1) both;
    z-index: 2;
  `
}

const toCssLength = (value, fallback) => {
  if (value === undefined) return fallback

  return typeof value === 'number' ? `${value}px` : value
}

const toCssAngle = (value, fallback) => {
  if (value === undefined) return fallback

  return typeof value === 'number' ? `${value}deg` : value
}

const toHeroWidth = (value) => {
  if (value === undefined) return `clamp(320px, calc(100vw - 660px), 780px)`

  return toCssLength(value, 'auto')
}

export const Page = styled(ViewContainer)`
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    background: ${({ theme }) => theme.colors.yellow.light};
    overflow-y: auto;
  }
`

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 0;
  padding: min(32.8125vh, 336px) 0 0 clamp(132px, 17.5vw, 252px);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 252px 72px 190px clamp(132px, 17.5vw, 180px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    align-items: flex-start;
    padding: 112px 20px 36px;
  }
`

export const StudyArea = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 64px;
  width: min(calc(100vw - clamp(132px, 17.5vw, 252px)), 1044px);
  ${'' /* height: 489px; */}
  min-height: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 36px;
    width: min(100%, 1000px);
    height: 460px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: stretch;
    gap: 24px;
    width: 100%;
    height: auto;
  }
`

export const StudyTextStage = styled.div`
  ${'' /* flex: 0 0 365px; */}
  display: grid;
  align-content: start;
  min-width: 0;
  ${'' /* min-height: 489px; */}

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-basis: 340px;
    min-height: 460px;
  ${'' /* } */}

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-basis: auto;
    width: 100%;
    gap: 16px;
    min-height: 0;
  }
`

export const StudyText = styled.div`
  grid-area: 1 / 1;
  display: grid;
  grid-template-rows: auto auto auto 1fr;
  row-gap: ${({ $compactCopy }) => ($compactCopy ? '40px' : '45px')};
  min-width: 0;
  ${'' /* min-height: 489px; */}

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    row-gap: 16px;
    min-height: 0;
  }
`

export const AnimatedStudyText = styled(StudyText)`
  ${getStudyPaneMotion}
  display: flex;
  flex-direction: column;
  gap: 45px;

  .quote-and-attribution {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    ${({ $direction, $state }) => {
      const forward = $direction >= 0
      const startOffset = forward ? '32px' : '-32px'
      const endOffset = forward ? '-32px' : '32px'

      if ($state === 'leaving') {
        return css`
          --study-pane-end: ${endOffset};
        `
      }

      return css`
        --study-pane-start: ${startOffset};
      `
    }}
  }
`

export const ClientName = styled.h2`
  font-size: ${({ theme }) => theme.typography.h4.size};
  text-box: ${({ theme }) => theme.typography.textBox};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  font-variation-settings:
    'wdth' ${({ theme }) => theme.font.width.condensed},
    'wght' ${({ theme }) => theme.font.weight.bold};
  line-height: 1;
  letter-spacing: -0.96px;
  color: ${({ theme }) => theme.colors.orange.base};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 48px;
  }
`

export const QuoteAndAttribution = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: ${({ theme }) => theme.colors.blue.dark};
`

export const Quote = styled.p`
  ${applyTypography('h5')}
  letter-spacing: -0.24px !important;
  font-variation-settings:
    'wdth' ${({ theme }) => theme.font.width.semicondensed},
    'wght' ${({ theme }) => theme.font.weight.medium};
  color: ${({ theme }) => theme.colors.blue.dark};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 18px;
  }
`

export const Attribution = styled.p`
  font-size: ${({ theme }) => theme.typography.bodyMedium.size};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  font-variation-settings:
    'wdth' ${({ theme }) => theme.font.width.semicondensed},
    'wght' ${({ theme }) => theme.font.weight.regular},
    'slnt' ${({ theme }) => theme.font.slant.italic};
  line-height: 1.1;

  font-style: italic;
  color: ${({ theme }) => theme.colors.blue.dark};
  opacity: 0.8;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 16px;
  }
`

export const Services = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0;
  list-style: none;
  padding: 0;
`

export const ServiceTag = styled.li`
  font-size: ${({ $compactCopy }) => ($compactCopy ? '16px' : '18px')};
  letter-spacing: 0;
  font-weight: ${({ theme }) => theme.font.weight.semibold};
  font-variation-settings:
    'wdth' ${({ theme }) => theme.font.width.regular},
    'wght' ${({ theme }) => theme.font.weight.semibold};
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.blue.dark};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 16px;
  }
`

export const HeroStage = styled.div`
  position: relative;
  flex: 0 0 60.5%;
  height: 841px;
  min-width: 0;
  display: grid;
  align-items: start;
  justify-items: start;
  min-height: 0;
  overflow: visible;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex: 1 1 auto;
    ${'' /* height: 460px; */}
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    ${'' /* height: 260px; */}
  }
`

export const HeroImage = styled.div`
  position: absolute;
  inset: 0;
  grid-area: 1 / 1;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  pointer-events: none;
  overflow: visible;
  width: ${({ $layout }) => toHeroWidth($layout?.width)};
  max-width: ${({ $layout }) => toCssLength($layout?.maxWidth, 'none')};

  img {
    display: block;
    width: 100%;
    ${'' /* height: 100%; */}
    aspect-ratio: ${({ $layout }) => $layout?.aspectRatio ?? 'auto'};
    transform: rotate(
      ${({ $layout }) => toCssAngle($layout?.rotation, '0deg')}
    );
    transform-origin: center;
    translate: ${({ $layout }) => toCssLength($layout?.x, '0')}
      ${({ $layout }) => toCssLength($layout?.y, '0')};
    ${'' /* filter: drop-shadow(4px 8px 16px rgba(0, 0, 0, 0.2)); */}
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    position: relative;
    align-items: flex-start;
    justify-content: flex-start;

    img {
      width: min(100%, 360px);
      max-width: 100%;
      max-height: 260px;
      object-fit: contain;
      transform: none;
      translate: 0 0;
    }
  }
`

export const AnimatedHeroImage = styled(HeroImage)`
  ${getStudyPaneMotion}

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    ${({ $direction, $state }) => {
      const forward = $direction >= 0
      const startOffset = forward ? '32px' : '-32px'
      const endOffset = forward ? '-32px' : '32px'

      if ($state === 'leaving') {
        return css`
          --study-pane-end: ${endOffset};
        `
      }

      return css`
        --study-pane-start: ${startOffset};
      `
    }}
  }
`

export const WorkDirtForeground = styled.svg`
  position: absolute;
  inset: 0;
  z-index: 2;
  width: 100%;
  height: auto;
  overflow: visible;
  pointer-events: none;
`

export const DesktopNavRail = styled.div`
  position: absolute;
  bottom: 12px;
  left: 50%;
  z-index: 3;
  display: flex;
  justify-content: center;
  width: min(calc(100% - 144px), 1296px);
  transform: translateX(-50%);
  pointer-events: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }

  @media (min-width: ${({ theme }) =>
      theme.breakpoints.mobile}) and (max-width: ${({ theme }) =>
      theme.breakpoints.tablet}) {
    bottom: -36px;
  }
`

export const DesktopNavViewport = styled.div`
  width: min(100%, ${({ $viewportWidth }) => `${$viewportWidth}px`});
  overflow-x: hidden;
  overflow-y: visible;
  cursor: ${({ $dragging }) => ($dragging ? 'grabbing' : 'grab')};
  touch-action: pan-y;
  user-select: none;
`

export const DesktopNavStrip = styled.div`
  overflow-y: hidden;
  display: flex;
  gap: 24px;
  width: max-content;
  will-change: transform;
`

export const MobileNavRail = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: block;
    width: calc(100% + 8px);
    margin-right: -8px;
    overflow-x: auto;
    pointer-events: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`

export const MobileNavStrip = styled.div`
  display: flex;
  gap: 8px;
  width: max-content;
  padding: 4px 8px 8px 0;
`

export const NavButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: ${({ $layout }) => `${$layout.width}px`};
  height: ${({ $layout }) => `${$layout.height}px`};
  padding: 0;
  border: none;
  border-radius: ${({ $compact, $layout }) =>
    `${Math.min($layout.width, $layout.height, $compact ? 18 : 28)}px`};
  background: transparent;
  cursor: pointer;
  pointer-events: auto;
  -webkit-tap-highlight-color: transparent;
  transform: translate(${({ $layout }) => `${$layout.x}px, ${$layout.y}px`});

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.yellow.gold};
    outline-offset: 4px;
  }
`

export const NavVisual = styled.span`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
`

export const NavIconLayer = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  mix-blend-mode: darken;
  pointer-events: none;
  filter: ${({ $current, theme }) =>
    $current ? `drop-shadow(-3px 5px 0 ${theme.colors.orange.base})` : 'none'};
  transition: filter 200ms ease;

  ${NavButton}:hover &,
  ${NavButton}:focus-visible & {
    filter: drop-shadow(-3px 5px 0 ${({ theme }) => theme.colors.orange.base});
  }
`

export const FallbackDot = styled.span`
  width: ${({ $compact }) => ($compact ? '10px' : '14px')};
  height: ${({ $compact }) => ($compact ? '10px' : '14px')};
  border-radius: 50%;
  background: ${({ $current, theme }) =>
    $current ? theme.colors.orange.base : theme.colors.blue.dark};
  opacity: ${({ $current }) => ($current ? 1 : 0.28)};
  transition:
    opacity 200ms ease,
    background-color 200ms ease;

  ${NavButton}:hover &,
  ${NavButton}:focus-visible & {
    background: ${({ theme }) => theme.colors.orange.base};
    opacity: 1;
  }
`

export const MarmotWrapper = styled.div`
  position: absolute;
  top: 142px;
  right: 114.84px;
  z-index: 2;
  pointer-events: none;

  #marmot-character-idle,
  #left-ear,
  #right-ear,
  #left-eye,
  #right-eye,
  #coffee-steam path {
    transform-box: fill-box;
    will-change: transform, opacity;
  }

  #marmot-character-idle {
    transform-origin: center bottom;
    animation: ${marmotIdleFloat} 5.4s ease-in-out 420ms infinite;
  }

  #left-ear {
    transform-origin: center bottom;
    animation: ${leftEarWriggle} 6.1s ease-in-out 560ms infinite;
  }

  #right-ear {
    transform-origin: center bottom;
    animation: ${rightEarWriggle} 5.8s ease-in-out 660ms infinite;
  }

  #left-eye,
  #right-eye {
    transform-origin: center;
    animation: ${marmotBlink} 8.4s ease-in-out 720ms infinite;
  }

  #coffee-steam {
    pointer-events: none;
  }

  #coffee-steam path {
    opacity: 0;
    transform-origin: center bottom;
  }

  #steam-wisp-1 {
    animation: ${steamRiseLeft} 3.4s ease-out 620ms infinite;
  }

  #steam-wisp-2 {
    animation: ${steamRiseCenter} 3.15s ease-out 920ms infinite;
  }

  #steam-wisp-3 {
    animation: ${steamRiseRight} 2.95s ease-out 1.18s infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    #marmot-character-idle,
    #left-ear,
    #right-ear,
    #left-eye,
    #right-eye,
    #coffee-steam path {
      animation: none;
      transform: none;
    }

    #coffee-steam path {
      opacity: 0;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    right: 72px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`

export const DesktopArrowButton = styled(ArrowButton)`
  position: absolute;
  top: 50%;
  z-index: 3;
  pointer-events: auto;
  transform: translateY(-100%);

  ${({ $side }) => ($side === 'left' ? 'left: 68px;' : 'right: 68px;')}

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    ${({ $side }) => ($side === 'left' ? 'left: 24px;' : 'right: 24px;')}
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`
