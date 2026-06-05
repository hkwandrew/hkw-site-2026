import { createGlobalStyle } from 'styled-components'
import {
  DESKTOP_VIEWPORT_WIDTH,
  DESKTOP_VIEWPORT_HEIGHT,
  MOBILE_VIEWPORT_HEIGHT,
  MOBILE_VIEWPORT_WIDTH,
  VIEWPORT_PX_UNIT_CUSTOM_PROPERTY,
  getCappedViewportPxUnitValue,
  getFittedViewportPxUnitValue,
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
    --hkw-debug-wide-border: transparent;
    --hkw-debug-coarse-border: transparent;
    --hkw-viewport-width: 100vw;
    --hkw-viewport-height: 100vh;
    --hkw-viewport-ratio: 1;
    ${VIEWPORT_PX_UNIT_CUSTOM_PROPERTY}: ${getFittedViewportPxUnitValue(
      DESKTOP_VIEWPORT_WIDTH,
      DESKTOP_VIEWPORT_HEIGHT,
    )};
  }

  :root[data-viewport-layout='phone-portrait'] {
    overflow: hidden;
    --hkw-debug-mobile-border: red;
    ${VIEWPORT_PX_UNIT_CUSTOM_PROPERTY}: ${getCappedViewportPxUnitValue(
      MOBILE_VIEWPORT_WIDTH,
      MOBILE_VIEWPORT_HEIGHT,
    )};
  }

  html, body, #root {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }


  main {
    min-height: 100%;
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
      inset 0 0 0 0.5rem var(--hkw-debug-wide-border),
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

  @media (min-aspect-ratio: 1440/1024) {
    :root {
      --hkw-debug-wide-border: limegreen;
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
`

export default GlobalStyle
