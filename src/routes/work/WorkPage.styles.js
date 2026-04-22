import styled, { css, keyframes } from 'styled-components'
import ArrowButton from '@/shared/ui/ArrowButton'
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

export const Page = styled(ViewContainer)`
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    overflow-y: auto;
  }
`

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
  padding: 190px 120px 186px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 180px 72px 190px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    align-items: flex-start;
    padding: 112px 20px 36px;
  }
`

export const StudyArea = styled.div`
  display: flex;
  // align-items: center;
  gap: 56px;
  width: min(100%, 1150px);
  min-height: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 36px;
    width: min(100%, 1000px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: stretch;
    gap: 24px;
    width: 100%;
  }
`

export const StudyTextStage = styled.div`
  flex: 0 0 365px;
  display: grid;
  align-content: start;
  min-width: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-basis: 340px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-basis: auto;
    width: 100%;
    gap: 16px;
  }
`

export const StudyText = styled.div`
  grid-area: 1 / 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 16px;
  }
`

export const AnimatedStudyText = styled(StudyText)`
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

export const ClientName = styled.h2`
  font-size: 64px;
  font-weight: 600;
  line-height: 1;
  color: ${({ theme }) => theme.colors.orange.base};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 48px;
  }
`

export const Quote = styled.p`
  font-size: 24px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.48px;
  color: ${({ theme }) => theme.colors.blue.dark};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 18px;
  }
`

export const Attribution = styled.p`
  font-size: 18px;
  font-weight: 400;
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
  margin: 0;
`

export const ServiceTag = styled.li`
  font-size: 18px;
  font-weight: 600;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.blue.dark};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 16px;
  }
`

export const HeroStage = styled.div`
  flex: 1;
  min-width: 0;
  display: grid;
  align-items: center;
  justify-items: center;
  min-height: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
  }
`

export const HeroImage = styled.div`
  grid-area: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;

  img {
    width: min(100%, 720px);
    max-height: 520px;
    object-fit: contain;
    transform: rotate(-0.5deg);
    filter: drop-shadow(4px 8px 16px rgba(0, 0, 0, 0.2));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    justify-content: flex-end;

    img {
      width: min(100%, 280px);
      max-height: 220px;
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
  filter: ${({ $current }) =>
    $current ? 'drop-shadow(-3px 5px 0 #D0471B)' : 'none'};
  transition: filter 200ms ease;

  ${NavButton}:hover &,
  ${NavButton}:focus-visible & {
    filter: drop-shadow(-3px 5px 0 #D0471B);
  }
`

export const FallbackDot = styled.span`
  width: ${({ $compact }) => ($compact ? '10px' : '14px')};
  height: ${({ $compact }) => ($compact ? '10px' : '14px')};
  border-radius: 50%;
  background: ${({ $current, theme }) =>
    $current ? theme.colors.orange.base : theme.colors.blue.dark};
  opacity: ${({ $current }) => ($current ? 1 : 0.28)};
  transition: opacity 200ms ease, background-color 200ms ease;

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
    top: 110px;
    right: 12px;
    transform: scale(0.74);
    transform-origin: top right;
  }
`

export const DesktopArrowButton = styled(ArrowButton)`
  position: absolute;
  top: 50%;
  z-index: 3;
  pointer-events: auto;
  transform: translateY(-50%);

  ${({ $side }) => ($side === 'left' ? 'left: 24px;' : 'right: 24px;')}

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`
