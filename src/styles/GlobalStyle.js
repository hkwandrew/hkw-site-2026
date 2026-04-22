import { createGlobalStyle } from 'styled-components'

const fontBaseUrl = `${import.meta.env.BASE_URL}fonts`

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Acumin Variable Concept";
    src:
      local("Acumin VF"),
      local("AcuminVF"),
      url("${fontBaseUrl}/AcuminVF.woff2") format("woff2-variations"),
      url("${fontBaseUrl}/AcuminVF.ttf") format("truetype-variations");
    font-weight: 100 900;
    font-stretch: 50% 115%;
    font-style: normal;
    font-display: swap;
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    color-scheme: light;
    text-rendering: optimizeLegibility;
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

  body[data-mobile-nav-open='true'] {
    overflow: hidden;
    touch-action: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    html, body, #root {
      height: auto;
      min-height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
    }

    main {
      min-height: 100dvh;
    }

    #scene-svg {
      display: none;
    }

    main.about-page #scene-svg {
      display: block !important;
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

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`

export default GlobalStyle
