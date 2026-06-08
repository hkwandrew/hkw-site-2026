import { createGlobalStyle } from 'styled-components'
import { MEDIA_QUERIES } from './breakpoints'
import {
  CONTENT_FRAME_HEIGHT_CUSTOM_PROPERTY,
  CONTENT_FRAME_TOP_CUSTOM_PROPERTY,
  CONTENT_FRAME_WIDTH_CUSTOM_PROPERTY,
  VIEWPORT_PX_UNIT_CUSTOM_PROPERTY,
  desktopFrameHeight,
  desktopFrameTop,
  desktopFrameViewportPxUnit,
  desktopFrameWidth,
  mobileContentFrameHeight,
  mobileContentFrameTop,
  mobileContentFrameWidth,
  mobileViewportPxUnit,
} from './viewportUnits'

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    color-scheme: light;
    text-rendering: optimizeLegibility;
    --hkw-debug-mobile-border: transparent;
    --hkw-debug-desktop-frame-border: transparent;
    --hkw-debug-coarse-border: transparent;
    --hkw-viewport-width: 100vw;
    --hkw-viewport-height: 100vh;
    --hkw-viewport-ratio: 1;
    ${VIEWPORT_PX_UNIT_CUSTOM_PROPERTY}: ${desktopFrameViewportPxUnit};
    ${CONTENT_FRAME_WIDTH_CUSTOM_PROPERTY}: ${desktopFrameWidth};
    ${CONTENT_FRAME_HEIGHT_CUSTOM_PROPERTY}: ${desktopFrameHeight};
    ${CONTENT_FRAME_TOP_CUSTOM_PROPERTY}: ${desktopFrameTop};
  }

  @media ${MEDIA_QUERIES.mobilePortrait} {
    :root {
      ${VIEWPORT_PX_UNIT_CUSTOM_PROPERTY}: ${mobileViewportPxUnit};
      ${CONTENT_FRAME_WIDTH_CUSTOM_PROPERTY}: ${mobileContentFrameWidth};
      ${CONTENT_FRAME_HEIGHT_CUSTOM_PROPERTY}: ${mobileContentFrameHeight};
      ${CONTENT_FRAME_TOP_CUSTOM_PROPERTY}: ${mobileContentFrameTop};
    }
  }

  @media ${MEDIA_QUERIES.mobilePortrait} {
    :root {
      overflow: hidden;
      --hkw-debug-mobile-border: red;
    }
  }

  html, body, #root {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  main {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 100%;
    overflow: hidden;
  }

  body {
    font-family: ${({ theme }) => theme.font.family};
    font-weight: ${({ theme }) => theme.font.weight.regular};
    font-variation-settings: 'wdth' 100;
    color: ${({ theme }) => theme.colors.blue.dark};
    background-color: ${({ theme }) => theme.colors.yellow.light};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :root[data-hkw-debug-tools='true'] body::after {
    content: '';
    position: fixed;
    inset: 0;
    z-index: 2147483647;
    pointer-events: none;
    box-shadow:
      inset 0 0 0 0.25rem var(--hkw-debug-mobile-border),
      inset 0 0 0 0.5rem var(--hkw-debug-desktop-frame-border),
      inset 0 0 0 0.75rem var(--hkw-debug-coarse-border);
  }

  [data-hkw-debug-overflow='true'] {
    outline: 0.1875rem dashed #ff2e88 !important;
    outline-offset: -0.1875rem !important;
  }

  body[data-mobile-nav-open='true'] {
    overflow: hidden;
    touch-action: none;
  }

  @media ${MEDIA_QUERIES.desktopFrame} {
    :root {
      --hkw-debug-desktop-frame-border: limegreen;
    }
  }

  @media (pointer: coarse) {
    :root {
      --hkw-debug-coarse-border: yellow;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
  }

  input, textarea, select {
    font-family: inherit;
    border: none;
    outline: none;
  }

  img, svg {
    display: block;
    max-width: 100%;
  }

  ul, ol {
    list-style: none;
  }

  a[style='pointer-events: auto']:focus,
  a[style='pointer-events: none']:focus,
  svg a:focus,
  svg path:focus,
  svg g:focus {
    outline: none;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  [data-page=work-page][data-scene-page=roots-page],
  [data-page=work-page][data-scene-page=services-page],
  [data-page=work-page][data-scene-page=work-page],
  [data-page=work-page][data-scene-page=home-page],{
    background-color: ${({ theme }) => theme.colors.yellow.gold};
  }

  [data-page=about-page][data-scene-page=home-page],
  [data-page=about-page][data-scene-page=services-page] {
    background-color: ${({ theme }) => theme.colors.blue.light};
  }

  [data-scene-page=about-page] {
    ${'' /* background-color: ${({ theme }) => theme.colors.blue.light}; */}
  }

`

export default GlobalStyle
