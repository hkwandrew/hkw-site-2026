import { renderToString } from 'react-dom/server'
import styled, {
  ServerStyleSheet,
  StyleSheetManager,
  ThemeProvider,
} from 'styled-components'
import { describe, expect, it } from 'vitest'
import GlobalStyle from '@/styles/GlobalStyle'
import theme from '@/styles/theme'
import {
  DESKTOP_VIEWPORT_HEIGHT,
  DESKTOP_VIEWPORT_WIDTH,
  MOBILE_VIEWPORT_HEIGHT,
  MOBILE_VIEWPORT_WIDTH,
  VIEWPORT_PX_UNIT_CUSTOM_PROPERTY,
  convertCssPxToViewportUnit,
  convertCssPxToVw,
  getCappedViewportPxUnitValue,
  getFittedViewportPxUnitValue,
  viewportPxToVwPlugin,
} from '@/styles/viewportUnits'

describe('viewport unit conversion', () => {
  it('converts px values against the supplied viewport width', () => {
    expect(convertCssPxToVw('72px', DESKTOP_VIEWPORT_WIDTH)).toBe('5vw')
    expect(convertCssPxToVw('19px', MOBILE_VIEWPORT_WIDTH)).toBe('4.83461vw')
    expect(convertCssPxToVw('-0.48px', DESKTOP_VIEWPORT_WIDTH)).toBe('-0.03333vw')
    expect(convertCssPxToVw('258.982px', DESKTOP_VIEWPORT_WIDTH)).toBe('17.98486vw')
    expect(convertCssPxToVw('0px', DESKTOP_VIEWPORT_WIDTH)).toBe('0')
  })

  it('fits the desktop viewport-pixel unit to width and height', () => {
    expect(
      getFittedViewportPxUnitValue(
        DESKTOP_VIEWPORT_WIDTH,
        DESKTOP_VIEWPORT_HEIGHT,
      ),
    ).toBe('min(0.06944vw, 0.09766vh)')
  })

  it('caps the mobile viewport-pixel unit at the design pixel size', () => {
    expect(
      getCappedViewportPxUnitValue(
        MOBILE_VIEWPORT_WIDTH,
        MOBILE_VIEWPORT_HEIGHT,
      ),
    ).toBe(
      'min(0.25445vw, 0.15625vh, 1px)',
    )
  })

  it('leaves quoted strings and url values unchanged', () => {
    expect(
      convertCssPxToVw(
        'url("/assets/icon-72px.svg") 10px 20px / "literal 30px"',
        DESKTOP_VIEWPORT_WIDTH,
      ),
    ).toBe('url("/assets/icon-72px.svg") 0.69444vw 1.38889vw / "literal 30px"')
  })

  it('converts px values to the responsive viewport-pixel unit', () => {
    expect(convertCssPxToViewportUnit('72px')).toBe(
      `calc(72 * var(${VIEWPORT_PX_UNIT_CUSTOM_PROPERTY}))`,
    )
    expect(convertCssPxToViewportUnit('-0.48px')).toBe(
      `calc(-0.48 * var(${VIEWPORT_PX_UNIT_CUSTOM_PROPERTY}))`,
    )
    expect(convertCssPxToViewportUnit('0px')).toBe('0')
    expect(
      convertCssPxToViewportUnit(
        'url("/assets/icon-72px.svg") 10px / "literal 30px"',
      ),
    ).toBe(
      `url("/assets/icon-72px.svg") calc(10 * var(${VIEWPORT_PX_UNIT_CUSTOM_PROPERTY})) / "literal 30px"`,
    )
  })

  it('converts styled-components declaration values after interpolation', () => {
    const Example = styled.div`
      width: ${({ $desktopWidth }) => $desktopWidth};
      padding: 72px;
      background-image: url('/images/card-72px.png');

      @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        width: ${({ $mobileWidth }) => $mobileWidth};
        border-radius: 19px;
      }
    `
    const sheet = new ServerStyleSheet()

    try {
      renderToString(
        <StyleSheetManager
          sheet={sheet.instance}
          stylisPlugins={[viewportPxToVwPlugin]}
        >
          <ThemeProvider theme={theme}>
            <Example $desktopWidth='72px' $mobileWidth='19px' />
          </ThemeProvider>
        </StyleSheetManager>,
      )

      const styles = sheet.getStyleTags()

      expect(styles).toContain(
        `width:calc(72 * var(${VIEWPORT_PX_UNIT_CUSTOM_PROPERTY}))`,
      )
      expect(styles).toContain(
        `padding:calc(72 * var(${VIEWPORT_PX_UNIT_CUSTOM_PROPERTY}))`,
      )
      expect(styles).toContain("background-image:url('/images/card-72px.png')")
      expect(styles).toContain('@media (max-width: 767px)')
      expect(styles).toContain(
        `width:calc(19 * var(${VIEWPORT_PX_UNIT_CUSTOM_PROPERTY}))`,
      )
      expect(styles).toContain(
        `border-radius:calc(19 * var(${VIEWPORT_PX_UNIT_CUSTOM_PROPERTY}))`,
      )
    } finally {
      sheet.seal()
    }
  })

  it('switches the viewport-pixel unit at the mobile breakpoint', () => {
    const sheet = new ServerStyleSheet()

    try {
      renderToString(
        <StyleSheetManager
          sheet={sheet.instance}
          stylisPlugins={[viewportPxToVwPlugin]}
        >
          <ThemeProvider theme={theme}>
            <GlobalStyle />
          </ThemeProvider>
        </StyleSheetManager>,
      )

      const styles = sheet.getStyleTags()

      expect(styles).toContain(
        `${VIEWPORT_PX_UNIT_CUSTOM_PROPERTY}:${getFittedViewportPxUnitValue(
          DESKTOP_VIEWPORT_WIDTH,
          DESKTOP_VIEWPORT_HEIGHT,
        )}`,
      )
      expect(styles).toContain('@media (max-width: 767px)')
      expect(styles).toContain(
        `${VIEWPORT_PX_UNIT_CUSTOM_PROPERTY}:${getCappedViewportPxUnitValue(
          MOBILE_VIEWPORT_WIDTH,
          MOBILE_VIEWPORT_HEIGHT,
        )}`,
      )
    } finally {
      sheet.seal()
    }
  })
})
