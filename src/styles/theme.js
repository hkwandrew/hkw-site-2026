const theme = {
  colors: {
    orange: {
      dark: '#A53213',
      base: '#D0471B',
    },
    yellow: {
      gold: '#FA9C38',
      light: '#FCFAE5',
    },
    blue: {
      dark: '#1C2D38',
      light: '#AFD3FC',
      medium: '#80BFFF',
      medDark: '#5495D6',
    },
    green: '#415441',
    brown: {
      dark: '#2B1E15',
      light: '#4F4030',
      brick: '#6F1B00',
    },
    white: '#FFFFFF',
    black: '#000000',
  },
  font: {
    family: "'Acumin Variable Concept', 'Acumin VF', sans-serif",
    weight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    width: {
      condensed: 75,
      normal: 100,
    },
  },
  typography: {
    display: {
      size: '80px',
      weight: 600,
      width: 100,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h1: {
      size: '72px',
      weight: 600,
      width: 100,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      size: '64px',
      weight: 600,
      width: 100,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h3: {
      size: '48px',
      weight: 500,
      width: 100,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h4: {
      size: '32px',
      weight: 500,
      width: 100,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h5: {
      size: '24px',
      weight: 500,
      width: 100,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    bodyLarge: {
      size: '22px',
      weight: 400,
      width: 100,
      lineHeight: 1.4,
      letterSpacing: '-0.02em',
    },
    bodyMedium: {
      size: '18px',
      weight: 400,
      width: 100,
      lineHeight: 1.4,
      letterSpacing: '-0.02em',
    },
    bodySmall: {
      size: '16px',
      weight: 300,
      lineHeight: 1.625,
      textBox: 'trim-both cap alphabetic'
    },
    buttonLarge: {
      size: '24px',
      weight: 500,
      width: 75,
      lineHeight: 1.0,
      letterSpacing: '-0.02em',
      textTransform: 'uppercase',
    },
    buttonMedium: {
      size: '18px',
      weight: 500,
      width: 75,
      lineHeight: 1.0,
      letterSpacing: '-0.02em',
      textTransform: 'uppercase',
    },
    buttonSmall: {
      size: '16px',
      weight: 500,
      width: 75,
      lineHeight: 1.0,
      letterSpacing: '-0.02em',
      textTransform: 'uppercase',
    },
    label: {
      size: '16px',
      weight: 600,
      width: 68,
      lineHeight: 1.5,
      letterSpacing: '1.6px',
      textTransform: 'uppercase',
    },
  },
  transition: {
    view: 'all 800ms cubic-bezier(0.4, 0, 0.2, 1)',
    fast: 'all 200ms ease',
    medium: 'all 400ms ease',
  },
  breakpoints: {
    mobile: '767px',
    tablet: '1024px',
  },
}

export default theme
