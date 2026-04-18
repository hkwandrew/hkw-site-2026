import styled, { createGlobalStyle, css, keyframes } from 'styled-components'

/* ── Keyframes ─────────────────────────────────────── */

export const slideIn = keyframes`
  from { transform: translateY(100dvh); }
  to   { transform: translateY(0); }
`

export const slideOut = keyframes`
  from { transform: translateY(0); }
  to   { transform: translateY(100dvh); }
`

export const scrollHintBob = keyframes`
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(8px); }
`

export const mascotFloat = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0); }
  50%      { transform: translate3d(0, -8px, 0); }
`

export const cloudFloatDark = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0); }
  33%      { transform: translate3d(8px, -6px, 0); }
  66%      { transform: translate3d(-6px, 5px, 0); }
`

export const cloudFloatMid = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0); }
  33%      { transform: translate3d(-7px, -5px, 0); }
  66%      { transform: translate3d(6px, 6px, 0); }
`

export const cloudFloatLight = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0); }
  33%      { transform: translate3d(10px, -7px, 0); }
  66%      { transform: translate3d(-8px, 6px, 0); }
`

/* ── Page-level styles (applied to <main> by Layout) ── */

export const AboutPageStyle = createGlobalStyle`
  .about-page {
    min-height: 100dvh;
    position: relative;
    background: transparent;
    overflow-x: clip;
  }

  .about-page > svg {
    position: fixed;
    inset: 0 auto auto 0;
    z-index: 0;
    width: 100%;
    height: auto;
    display: block;
    pointer-events: none;
  }

  .about-page > section,
  .about-page > .pin-spacer {
    position: relative;
    z-index: 1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}),
         (prefers-reduced-motion: reduce) {
    .about-page > .pin-spacer:has(.about--animated) {
      display: none;
    }
  }
`

/* ── Animated section ──────────────────────────────── */

export const AnimatedSection = styled.section`
  position: relative;
  min-height: 100dvh;
  overflow: clip;

  &.about--static .about-scene {
    height: 100dvh;
  }

  &[data-about-stage='0'] .about-scrollHint {
    animation: ${scrollHintBob} 2.6s ease-in-out infinite;
  }

  &[data-about-stage='2'] .about-heroCloud svg,
  &[data-about-stage='3'] .about-heroCloud svg {
    opacity: 0;
    transition: opacity 1.5s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &[data-about-stage='3'] .about-mascotFloat {
    animation: ${mascotFloat} 3.4s ease-in-out infinite;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}),
         (prefers-reduced-motion: reduce) {
    &.about--animated {
      display: none;
    }
  }
`

export const Scene = styled.div`
  position: relative;
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  will-change: transform;

  &.about-scene--enter {
    animation: ${slideIn} 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  &.about-scene--exit {
    animation: ${slideOut} 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
`

export const HeroCloud = styled.div`
  left: 0;
  right: 0;
  position: absolute;
  top: 79.01px;
  z-index: 4;
  pointer-events: none;

  svg {
    display: block;
    width: 100%;
    height: auto;
  }
`

export const HeroCloudTarget = styled.path`
  visibility: hidden;
  pointer-events: none;
`

export const IntroCopy = styled.div`
  left: 27.22%;
  top: 29.1%;
  max-width: 657px;
  position: absolute;
  z-index: 45;
  color: ${({ theme }) => theme.colors.blue.dark};

  p {
    font-size: 20px;
    line-height: 1.6;
    text-align: center;
    font-variation-settings: 'wdth' 100, 'wght' 400;
  }

  p + p {
    margin-top: 20px;
  }

  span {
    font-variation-settings: 'wght' 500;
  }

  span + span {
    font-variation-settings: 'wght' 600;
  }
`

export const ScrollHint = styled.button`
  position: absolute;
  left: 47.78%;
  top: 47.56%;
  width: clamp(54px, 4.51vw, 65px);
  border: 0;
  padding: 0;
  background: transparent;
  cursor: pointer;
  z-index: 46;
  will-change: transform;

  svg {
    width: 100%;
    height: auto;
    display: block;
  }
`

export const CloudsLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 10;
  pointer-events: none;
  background: linear-gradient(
    to top,
    ${({ theme }) => theme.colors.blue.dark},
    ${({ theme }) => theme.colors.blue.dark} 40%,
    transparent 40%
  );
`

export const QuotesLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 30;
  pointer-events: none;
`

const cloudLayerStyles = {
  dark: css`
    z-index: 20;
    background: linear-gradient(
      to top,
      ${({ theme }) => theme.colors.blue.dark},
      ${({ theme }) => theme.colors.blue.dark} 40%,
      transparent 40%,
      transparent
    );
  `,
  mid: css`
    z-index: 30;
    background: linear-gradient(
      to bottom,
      transparent,
      transparent 40%,
      ${({ theme }) => theme.colors.blue.medDark} 40%
    );
  `,
  light: css`
    z-index: 40;
  `,
  outro: css`
    z-index: 50;
    background: linear-gradient(to top, ${({ theme }) => theme.colors.blue.medium});

    svg {
      width: 1510px;
      height: 1064px;
      transform: scaleY(-1);
    }
  `,
}

const cloudFloatAnimations = {
  dark: css`animation: ${cloudFloatDark} 12.5s ease-in-out infinite;`,
  mid: css`animation: ${cloudFloatMid} 10.75s ease-in-out infinite;`,
  light: css`animation: ${cloudFloatLight} 9.5s ease-in-out infinite;`,
}

export const Cloud = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: top left;
  will-change: transform, width;
  pointer-events: none;

  svg {
    overflow: visible;
    display: block;
    width: 100%;
    height: auto;
  }

  ${({ $layer }) => cloudLayerStyles[$layer]}
`

export const CloudFloat = styled.div`
  transform-origin: center center;
  will-change: transform;

  ${({ $layer }) => cloudFloatAnimations[$layer] ?? ''}
`

const quoteLayerZIndex = {
  dark: 25,
  mid: 35,
  light: 45,
}

export const Quote = styled.article`
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  transform-origin: top left;
  will-change: transform, width, opacity;
  z-index: ${({ $layer }) => quoteLayerZIndex[$layer] ?? 30};
`

const quoteTextBase = css`
  margin: 0;
  color: ${({ theme }) => theme.colors.white};
  font-style: italic;
  font-size: 24px;
  line-height: calc(32 / 24);
  font-variation-settings: 'wdth' 100, 'wght' 500, 'slnt' -12;
`

export const QuoteText = styled.p`
  ${quoteTextBase}
`

const quoteNameBase = css`
  margin: 25px 0 0;
  color: ${({ theme }) => theme.colors.blue.light};
  font-size: 20px;
  line-height: 0.8;
  font-variation-settings: 'wdth' 100, 'wght' 500;
`

export const QuoteName = styled.p`
  ${quoteNameBase}

  ${Quote}[data-quote-layer='mid'] &,
  ${Quote}[data-quote-layer='light'] & {
    color: ${({ theme }) => theme.colors.blue.dark};
  }
`

export const QuoteRole = styled.p`
  margin: 7px 0 0;

  span {
    display: block;
    color: ${({ theme }) => theme.colors.blue.light};
    font-size: 18px;
    font-variation-settings: 'wdth' 100, 'wght' 400;
  }

  ${Quote}[data-quote-layer='mid'] &,
  ${Quote}[data-quote-layer='light'] & {
    span {
      color: ${({ theme }) => theme.colors.blue.dark};
    }
  }
`

export const OutroCopy = styled.article`
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  transform-origin: top left;
  z-index: 60;
  will-change: transform, width, opacity;
`

export const OutroQuote = styled.p`
  ${quoteTextBase}
  color: ${({ theme }) => theme.colors.orange.base};
`

export const OutroName = styled.p`
  ${quoteNameBase}
  color: ${({ theme }) => theme.colors.blue.dark};
`

export const OutroRole = styled.p`
  margin: 7px 0 0;
  color: ${({ theme }) => theme.colors.blue.dark};
  font-size: 18px;
  font-variation-settings: 'wght' 400;
`

export const Mascot = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: center bottom;
  z-index: 61;
  will-change: transform, width, opacity;
  pointer-events: none;

  svg {
    display: block;
    width: 100%;
    height: auto;
  }
`

export const MascotFigure = styled.div`
  transform-origin: center bottom;
  will-change: transform;
`

export const MascotFloat = styled.div.attrs({ className: 'about-mascotFloat' })`
  transform-origin: center bottom;
  will-change: transform;
`

/* ── Static / mobile section ───────────────────────── */

export const StaticSection = styled.section`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}),
         (prefers-reduced-motion: reduce) {
    display: block;
    overflow: clip;
    padding-top: clamp(6.5rem, 18vw, 7.75rem);

    /* Hide the animated section's pin-spacer */
    & ~ .pin-spacer:has(.about--animated) {
      display: none;
    }
  }
`

export const StaticIntro = styled.div`
  position: relative;
  min-height: 24.5rem;
  padding: 0 1rem 0;
`

export const StaticPageLabel = styled.p`
  position: relative;
  z-index: 2;
  width: min(calc(100% - 2rem), 21rem);
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.orange.base};
  font-size: 24px;
  line-height: 1;
  text-transform: uppercase;
  font-variation-settings: 'wdth' 68, 'wght' 600;
`

export const StaticHeroCloud = styled.div`
  width: min(47rem, 192vw);
  margin: 0.9rem auto clamp(-6.5rem, -18vw, -5rem);
  pointer-events: none;

  svg {
    display: block;
    width: 100%;
    height: auto;
  }
`

export const StaticIntroCopy = styled.div`
  position: relative;
  left: auto;
  top: auto;
  width: min(calc(100% - 2rem), 21rem);
  max-width: none;
  margin: 0 auto;
  padding: 3.9rem 0 0;
  z-index: 1;
  color: ${({ theme }) => theme.colors.blue.dark};

  p {
    font-size: 16px;
    line-height: 1.25;
    letter-spacing: -0.0194rem;
    text-align: center;
    font-variation-settings: 'wdth' 100, 'wght' 400;
  }

  p + p {
    margin-top: 1.2rem;
  }

  span {
    font-variation-settings: 'wght' 500;
  }

  span + span {
    font-variation-settings: 'wght' 600;
  }
`

export const StaticCards = styled.div`
  display: grid;
  gap: 0.72rem;
  padding-bottom: 1.75rem;

  @media (min-width: 700px) and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 1.25rem;
  }
`

const staticCardMidLightText = css`
  ${({ theme }) => `
    .about-static-quoteName,
    .about-static-quoteRole span {
      color: ${theme.colors.blue.dark};
    }
  `}
`

export const StaticCard = styled.article`
  position: relative;
  min-height: 16.2rem;
  overflow: clip;

  ${({ $layer }) => $layer === 'mid' && css`
    .about-static-quoteText {
      color: ${({ theme }) => theme.colors.white};
    }
    ${staticCardMidLightText}
  `}

  ${({ $layer }) => $layer === 'light' && css`
    .about-static-quoteText,
    .about-static-quoteName,
    .about-static-quoteRole span {
      color: ${({ theme }) => theme.colors.blue.dark};
    }
  `}

  ${({ $isOutro }) => $isOutro && css`
    min-height: 19rem;
  `}
`

export const StaticCardCloud = styled.div`
  width: calc(100% + 1.25rem);
  margin-left: -0.4375rem;

  svg {
    display: block;
    width: 100%;
    height: auto;
  }

  @media (min-width: 700px) and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: min(31rem, 100%);
    margin: 0 auto;
  }
`

export const StaticCardContent = styled.div`
  position: absolute;
  top: 5rem;
  left: 50%;
  width: min(calc(100% - 2.5rem), 20.125rem);
  transform: translateX(-50%);
  text-align: center;

  ${StaticCard}[data-is-outro] & {
    top: 2.6rem;
    width: min(calc(100% - 3rem), 18.5625rem);
  }

  @media (min-width: 700px) and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: min(19rem, 80%);
  }
`

export const StaticQuoteText = styled.p`
  ${quoteTextBase}
  font-size: 20px;
  line-height: 1.25;
`

export const StaticQuoteName = styled.p.attrs({ className: 'about-static-quoteName' })`
  ${quoteNameBase}
  margin-top: 0.95rem;
  font-size: 18px;
  line-height: 0.9;
`

export const StaticQuoteRole = styled.p.attrs({ className: 'about-static-quoteRole' })`
  margin: 0.85rem 0 0;

  span {
    display: block;
    color: ${({ theme }) => theme.colors.blue.light};
    font-size: 16px;
    line-height: 1.25;
    font-variation-settings: 'wdth' 100, 'wght' 400;
  }
`

export const StaticOutroQuote = styled.p`
  ${quoteTextBase}
  font-size: 20px;
  line-height: 1.25;
  color: ${({ theme }) => theme.colors.orange.base};
`

export const StaticSwipeHint = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0.95rem;
  width: 3.64rem;
  transform: translateX(-50%);

  svg {
    display: block;
    width: 100%;
    height: auto;
  }
`

export const StaticMascot = styled.div`
  position: absolute;
  left: 50%;
  bottom: -1.2rem;
  width: min(7.35rem, 30vw);
  transform: translateX(-50%);

  svg {
    display: block;
    width: 100%;
    height: auto;
  }
`
