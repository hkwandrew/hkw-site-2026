import styled, { css, keyframes } from 'styled-components'
import { SCENE_TRANSITION_DURATION_MS } from '@/app/landscape/sceneRegistry'
import ViewContainer from '@/shared/ui/ViewContainer'

const bob = keyframes`
  0%, 100% {
    transform: translate3d(-50%, 0, 0);
  }

  50% {
    transform: translate3d(-50%, 8px, 0);
  }
`

const finalStageFloat = keyframes`
  0%, 100% {
    transform: translate3d(0, 0, 0);
  }

  50% {
    transform: translate3d(
      var(--about-float-x, 0),
      var(--about-float-y, -10px),
      0
    );
  }
`

const finalStageMascotFloat = keyframes`
  0%, 100% {
    transform: translate3d(0, 0, 0) rotate(0deg);
  }

  50% {
    transform: translate3d(
      var(--about-float-x, 0),
      var(--about-float-y, -10px),
      0
    )
      rotate(var(--about-float-rotate, 1deg));
  }
`

const desktopLayerDepth = {
  dark: 10,
  mid: 20,
  light: 30,
  outro: 40,
}

const desktopQuotePalette = {
  dark: css`
    color: ${({ theme }) => theme.colors.white};
  `,
  mid: css`
    color: ${({ theme }) => theme.colors.white};
  `,
  light: css`
    color: ${({ theme }) => theme.colors.white};
  `,
  outro: css`
    color: ${({ theme }) => theme.colors.orange.base};
  `,
}

const desktopMetaPalette = {
  dark: css`
    color: ${({ theme }) => theme.colors.blue.light};
  `,
  mid: css`
    color: ${({ theme }) => theme.colors.blue.dark};
  `,
  light: css`
    color: ${({ theme }) => theme.colors.blue.dark};
  `,
  outro: css`
    color: ${({ theme }) => theme.colors.blue.dark};
  `,
}

const ABOUT_PAGE_SLIDE_DISTANCE = '100dvh'
const ABOUT_PAGE_MOBILE_SLIDE_DISTANCE = '100dvh'
const ABOUT_PAGE_SLIDE_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

export const Page = styled(ViewContainer)`
  overflow: hidden;
  pointer-events: auto;
  opacity: 1;
  transform: translate3d(
    0,
    ${({ $isActive }) => ($isActive ? '0' : ABOUT_PAGE_SLIDE_DISTANCE)},
    0
  );
  transition: transform ${SCENE_TRANSITION_DURATION_MS}ms ${ABOUT_PAGE_SLIDE_EASE};
  will-change: transform;

  &[data-about-phase='exiting'] {
    pointer-events: none;
    transform: translate3d(0, ${ABOUT_PAGE_SLIDE_DISTANCE}, 0);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}),
    (prefers-reduced-motion: reduce) {
    overflow-y: auto;
    scroll-snap-type: y mandatory;
    transform: translate3d(
      0,
      ${({ $isActive }) => ($isActive ? '0' : ABOUT_PAGE_MOBILE_SLIDE_DISTANCE)},
      0
    );

    &[data-about-phase='exiting'] {
      transform: translate3d(0, ${ABOUT_PAGE_MOBILE_SLIDE_DISTANCE}, 0);
    }
  }
`

export const DesktopScroller = styled.div`
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  pointer-events: auto;
  scrollbar-width: none;
  overscroll-behavior: contain;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}),
    (prefers-reduced-motion: reduce) {
    display: none;
  }
`

export const DesktopTrack = styled.div`
  position: relative;
  height: 420dvh;
`

export const DesktopStickyScene = styled.div`
  position: sticky;
  top: 0;
  height: 100dvh;
  overflow: hidden;
  pointer-events: none;
`

export const DesktopHeroCloud = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 5;
  will-change: transform, width;

  svg {
    display: block;
    width: 100%;
    height: auto;
  }
`

export const DesktopIntroCopy = styled.div`
  position: absolute;
  left: 50%;
  top: 28.5%;
  z-index: 15;
  width: min(657px, 52vw);
  transform: translateX(-50%);
  color: ${({ theme }) => theme.colors.blue.dark};
  text-align: center;

  p {
    font-size: clamp(18px, 1.38vw, 20px);
    line-height: 1.6;
    font-variation-settings: 'wdth' 100, 'wght' 400;
  }

  p + p {
    margin-top: 20px;
  }

  strong {
    font-variation-settings: 'wdth' 100, 'wght' 600;
  }
`

export const DesktopScrollHint = styled.button`
  position: absolute;
  left: 50%;
  top: 48.4%;
  z-index: 16;
  width: clamp(58px, 4.6vw, 68px);
  transform: translateX(-50%);
  pointer-events: auto;
  animation: ${bob} 2.4s ease-in-out infinite;

  svg {
    display: block;
    width: 100%;
    height: auto;
  }
`

export const DesktopCloud = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: ${({ $layer }) => desktopLayerDepth[$layer] ?? 10};
  will-change: transform, width, opacity;

  svg,
  img {
    display: block;
    width: 100%;
    height: auto;
  }
`

export const DesktopCloudFloat = styled.div`
  transform: translate3d(0, 0, 0);
  will-change: transform;

  [data-about-scene][data-about-final-stage='true'] & {
    animation: ${finalStageFloat}
      var(--about-float-duration, 8s)
      ease-in-out
      infinite;
    animation-delay: var(--about-float-delay, 0s);
  }
`

export const DesktopBandFill = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  z-index: ${({ $layer }) => (desktopLayerDepth[$layer] ?? 10) - 1};
  background: ${({ $layer, theme }) => {
    if ($layer === 'dark') return theme.colors.blue.dark
    if ($layer === 'mid') return theme.colors.blue.medDark
    if ($layer === 'light') return theme.colors.blue.medium
    return theme.colors.white
  }};
  will-change: transform, width, opacity;
`

export const DesktopQuote = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: ${({ $layer }) => (desktopLayerDepth[$layer] ?? 10) + 5};
  text-align: center;
  will-change: transform, width, opacity;
`

export const DesktopQuoteText = styled.p`
  margin: 0;
  font-size: clamp(22px, 1.67vw, 24px);
  line-height: 1.33;
  font-style: italic;
  font-variation-settings: 'wdth' 100, 'wght' 500;
  ${({ $layer }) => desktopQuotePalette[$layer]}
`

export const DesktopQuoteName = styled.p`
  margin: 25px 0 0;
  font-size: clamp(19px, 1.39vw, 20px);
  line-height: 0.8;
  font-variation-settings: 'wdth' 100, 'wght' 500;
  ${({ $layer }) => desktopMetaPalette[$layer]}
`

export const DesktopQuoteMeta = styled.p`
  margin: 16px 0 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
  font-size: clamp(17px, 1.25vw, 18px);
  line-height: 7px;
  font-variation-settings: 'wdth' 100, 'wght' 400;
  ${({ $layer }) => desktopMetaPalette[$layer]}
`

export const DesktopMascot = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 50;
  width: 23.6vw;
  max-width: 349.01px;
  transform-origin: bottom center;
  will-change: transform, width, opacity;
  rotate: -11.89deg;

  svg {
    display: block;
    width: 100%;
    height: auto;
  }
`

export const DesktopMascotFloat = styled.div`
  transform: translate3d(0, 0, 0);
  transform-origin: bottom center;
  will-change: transform;

  [data-about-scene][data-about-final-stage='true'] & {
    animation: ${finalStageMascotFloat}
      var(--about-float-duration, 5.2s)
      ease-in-out
      infinite;
    animation-delay: var(--about-float-delay, 0s);
  }
`

export const MobilePanels = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}),
    (prefers-reduced-motion: reduce) {
    display: block;
  }
`

export const MobilePanel = styled.section`
  position: relative;
  min-height: 100dvh;
  overflow: hidden;
  scroll-snap-align: start;
  scroll-snap-stop: always;
`

export const MobileHeroCloud = styled.div`
  position: absolute;
  left: 50%;
  top: 126px;
  z-index: 1;
  width: max(148vw, 582px);
  transform: translateX(-50%);

  svg {
    display: block;
    width: 100%;
    height: auto;
  }
`

export const MobileIntroCopy = styled.div`
  position: absolute;
  left: 50%;
  top: 230px;
  z-index: 2;
  width: min(336px, calc(100vw - 40px));
  transform: translateX(-50%);
  color: ${({ theme }) => theme.colors.blue.dark};
  text-align: center;

  p {
    font-size: 16px;
    line-height: 1.4;
    font-variation-settings: 'wdth' 100, 'wght' 400;
  }

  p + p {
    margin-top: 20px;
  }

  strong {
    font-variation-settings: 'wdth' 100, 'wght' 600;
  }
`

export const MobileQuoteCloud = styled.div`
  position: absolute;
  left: 50%;
  bottom: -2px;
  z-index: 3;
  width: max(112vw, 440px);
  transform: translateX(-50%);

  svg,
  img {
    display: block;
    width: 100%;
    height: auto;
  }
`

export const MobilePanelQuote = styled.div`
  position: absolute;
  left: 50%;
  bottom: ${({ $isFinal }) => ($isFinal ? '96px' : '88px')};
  z-index: 4;
  width: min(322px, calc(100vw - 48px));
  transform: translateX(-50%);
  text-align: center;
`

export const MobileQuoteText = styled.p`
  margin: 0;
  color: ${({ $isFinal, theme }) =>
    $isFinal ? theme.colors.orange.base : theme.colors.white};
  font-size: 20px;
  line-height: 1.3;
  font-style: italic;
  font-variation-settings: 'wdth' 100, 'wght' 500;
`

export const MobileQuoteName = styled.p`
  margin: 12px 0 0;
  color: ${({ $isFinal, theme }) =>
    $isFinal ? theme.colors.blue.dark : theme.colors.blue.light};
  font-size: 18px;
  line-height: 0.9;
  font-variation-settings: 'wdth' 100, 'wght' 500;
`

export const MobileQuoteMeta = styled.p`
  margin: 16px 0 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: ${({ $isFinal, theme }) =>
    $isFinal ? theme.colors.blue.dark : theme.colors.blue.light};
  font-size: 16px;
  line-height: 1.15;
  font-variation-settings: 'wdth' 100, 'wght' 400;
`

export const MobileSwipeHint = styled.div`
  position: absolute;
  left: 50%;
  bottom: 24px;
  z-index: 5;
  width: 60px;
  transform: translateX(-50%);

  svg {
    display: block;
    width: 100%;
    height: auto;
  }
`

export const MobileMarmot = styled.div`
  position: absolute;
  right: 30px;
  bottom: -6px;
  z-index: 5;
  width: 168px;
  pointer-events: none;

  svg {
    display: block;
    width: 100%;
    height: auto;
  }
`
