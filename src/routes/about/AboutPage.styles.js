import styled, { css, keyframes } from 'styled-components'
import { SCENE_TRANSITION_DURATION_MS } from '@/app/landscape/sceneRegistry'
import ViewContainer from '@/shared/ui/ViewContainer'
import { applyTypography } from '@/shared/ui/Typography'
import { MEDIA_QUERIES } from '@/styles/breakpoints'

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

const mobileQuoteFade = keyframes`
  0%, 42% {
    opacity: 0;
  }

  48%, 52% {
    opacity: 1;
  }

  58%, 100% {
    opacity: 0;
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

const ABOUT_PAGE_ENTER_SLIDE_DISTANCE = '72dvh'
const ABOUT_PAGE_EXIT_SLIDE_DISTANCE = '100dvh'
const ABOUT_PAGE_MOBILE_ENTER_SLIDE_DISTANCE = '72dvh'
const ABOUT_PAGE_MOBILE_EXIT_SLIDE_DISTANCE = '100dvh'
const ABOUT_PAGE_SLIDE_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

const aboutPageEnter = keyframes`
  from {
    transform: translate3d(0, ${ABOUT_PAGE_ENTER_SLIDE_DISTANCE}, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`

const aboutPageMobileEnter = keyframes`
  from {
    transform: translate3d(0, ${ABOUT_PAGE_MOBILE_ENTER_SLIDE_DISTANCE}, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`

export const Page = styled(ViewContainer)`
  width: 100%;
  overflow: visible;
  max-width: 100%;
  margin-inline: auto;
  pointer-events: auto;
  opacity: 1;
  transform: translate3d(0, 0, 0);
  animation: ${aboutPageEnter} ${SCENE_TRANSITION_DURATION_MS}ms
    ${ABOUT_PAGE_SLIDE_EASE} both;
  will-change: transform;

  &[data-about-phase='exiting'] {
    animation: none;
    pointer-events: none;
    transition: transform ${SCENE_TRANSITION_DURATION_MS}ms
      ${ABOUT_PAGE_SLIDE_EASE};
    transform: translate3d(0, ${ABOUT_PAGE_EXIT_SLIDE_DISTANCE}, 0);
  }

  @media ${MEDIA_QUERIES.desktopFrame} {
    top: 0;
    height: 100dvh;
  }

  @media ${MEDIA_QUERIES.mobilePortrait},
    (prefers-reduced-motion: reduce) {
    overflow-y: auto;
    scroll-snap-type: y mandatory;
    transform: translate3d(0, 0, 0);
    animation-name: ${aboutPageMobileEnter};

    &[data-about-phase='exiting'] {
      animation: none;
      transform: translate3d(0, ${ABOUT_PAGE_MOBILE_EXIT_SLIDE_DISTANCE}, 0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    overflow-y: auto;
    scroll-snap-type: y mandatory;
    animation: none;
    transform: translate3d(0, 0, 0);

    &[data-about-phase='exiting'] {
      transition: none;
      transform: translate3d(0, ${ABOUT_PAGE_MOBILE_EXIT_SLIDE_DISTANCE}, 0);
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

  @media ${MEDIA_QUERIES.mobilePortrait},
    (prefers-reduced-motion: reduce) {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
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
  width: 100%;
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
  top: 292px;
  z-index: 15;
  width: min(657px, 52vw);
  transform: translateX(-50%);
  color: ${({ theme }) => theme.colors.blue.dark};
  text-align: center;

  p {
    ${applyTypography('bodyMedium')}
    line-height: 1.6;
  }

  p + p {
    margin-top: 20px;
  }

  strong {
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    font-variation-settings:
      'wdth' ${({ theme }) => theme.typography.bodyMedium.width},
      'wght' ${({ theme }) => theme.font.weight.semibold};
  }
`

export const DesktopScrollHint = styled.button`
  position: absolute;
  left: 50%;
  top: 496px;
  z-index: 16;
  width: 66px;
  height: 65px;
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
    animation: ${finalStageFloat} var(--about-float-duration, 8s) ease-in-out
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
  ${applyTypography('h5')}
  line-height: 1.33;
  font-style: italic;
  ${({ $layer }) => desktopQuotePalette[$layer]}
`

export const DesktopQuoteName = styled.p`
  margin: 25px 0 0;
  ${applyTypography('formButton')}
  line-height: 0.8;
  text-transform: none;
  font-variation-settings:
    'wdth' ${({ theme }) => theme.font.width.regular},
    'wght' ${({ theme }) => theme.font.weight.medium};
  ${({ $layer }) => desktopMetaPalette[$layer]}
`

export const DesktopQuoteMeta = styled.p`
  margin: 16px 0 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
  ${applyTypography('bodyMedium')}
  line-height: 7px;
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
    animation: ${finalStageMascotFloat} var(--about-float-duration, 5.2s)
      ease-in-out infinite;
    animation-delay: var(--about-float-delay, 0s);
  }
`

export const MobilePanels = styled.div`
  display: none;

  @media ${MEDIA_QUERIES.mobilePortrait},
    (prefers-reduced-motion: reduce) {
    display: block;
    position: relative;
  }

  @media (prefers-reduced-motion: reduce) {
    display: block;
    position: relative;
  }
`

export const MobileStaticScene = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  height: 100dvh;
  overflow: hidden;
  pointer-events: none;
  background: linear-gradient(
    to top,
    ${({ theme }) => theme.colors.white} 0%,
    ${({ theme }) => theme.colors.white} 70%,
    transparent 70%,
    transparent 100%
  );
`

export const MobileQuotePanels = styled.div`
  position: relative;
  z-index: 2;
  margin-top: -100dvh;
`

export const MobilePanel = styled.section`
  position: relative;
  min-height: 100dvh;
  overflow: hidden;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  view-timeline-name: --about-mobile-panel;
  view-timeline-axis: block;
`

export const MobileHeroCloud = styled.div`
  position: absolute;
  top: 102px;
  z-index: 1;
  width: 820.974px;
  height: 419.984px;
  left: 50%;
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
  top: 165px;
  z-index: 2;
  width: min(336px, calc(100vw - 40px));
  transform: translateX(-50%);
  color: ${({ theme }) => theme.colors.blue.dark};
  text-align: center;

  p {
    ${applyTypography('bodySmall')}
  }

  p + p {
    margin-top: 20px;
  }

  strong {
    font-weight: ${({ theme }) => theme.font.weight.semibold};
    font-variation-settings:
      'wdth' ${({ theme }) => theme.typography.bodySmall.width},
      'wght' ${({ theme }) => theme.font.weight.semibold};
  }
`

export const MobileQuoteCloud = styled.div`
  position: absolute;
  left: 50%;
  bottom: -2px;
  z-index: 3;
  width: 110vw;

  @media (min-height: 780px) {
    width: 115vw;
  }
  transform: translateX(-50%);
  top: min(59dvh, 413px);
  background: linear-gradient(
    to top,
    ${({ theme }) => theme.colors.blue.dark} 0%,
    ${({ theme }) => theme.colors.blue.dark} 65%,
    transparent 65%,
    transparent 100%
  );

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
  top: min(71.3dvh, 499px);
  z-index: 4;
  width: min(322px, calc(100vw - 48px));
  transform: translateX(-50%);
  text-align: center;
  will-change: opacity;

  @supports (animation-timeline: view()) {
    animation: ${mobileQuoteFade} linear both;
    animation-timeline: --about-mobile-panel;
    animation-range: entry 0% exit 100%;
  }
`

export const MobileQuoteText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.white};
  ${applyTypography('formButton')}
  line-height: 1.3;
  font-style: italic;
  text-transform: none;
  font-variation-settings:
    'wdth' ${({ theme }) => theme.font.width.regular},
    'wght' ${({ theme }) => theme.font.weight.medium};
`

export const MobileQuoteName = styled.p`
  margin: 12px 0 0;
  color: ${({ theme }) => theme.colors.blue.light};
  ${applyTypography('bodyMedium')}
  line-height: 0.9;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  font-variation-settings:
    'wdth' ${({ theme }) => theme.typography.bodyMedium.width},
    'wght' ${({ theme }) => theme.font.weight.medium};
`

export const MobileQuoteMeta = styled.p`
  margin: 8px 0 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: ${({ theme }) => theme.colors.blue.light};
  ${applyTypography('bodySmall')}
  line-height: 1.15;
`

export const MobileSwipeHint = styled.div`
  position: absolute;
  left: 50%;
  bottom: 18px;
  z-index: 5;
  transform: translateX(-50%);
  will-change: opacity;

  @supports (animation-timeline: view()) {
    animation: ${mobileQuoteFade} linear both;
    animation-timeline: --about-mobile-panel;
    animation-range: entry 0% exit 100%;
  }

  svg {
    display: block;
    width: 100%;
    height: auto;
  }
`

export const MobileMarmot = styled.div`
  position: absolute;
  right: 130px;
  bottom: -80px;
  z-index: 5;
  width: 135px;
  pointer-events: none;
  rotate: -11.89deg;

  svg {
    display: block;
    width: 100%;
    height: auto;
  }
`
