import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Acumin Variable Concept';
    src: url('/fonts/AcuminVF.woff2') format('woff2-variations');
    font-weight: 100 900;
    font-stretch: 75% 100%;
    font-display: swap;
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
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
