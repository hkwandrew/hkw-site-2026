/* eslint-disable react-refresh/only-export-components */
import { render as rtlRender } from '@testing-library/react'
import { StyleSheetManager, ThemeProvider } from 'styled-components'
import theme from '@/styles/theme'
import { viewportPxToVwPlugin } from '@/styles/viewportUnits'

const ThemeWrapper = ({ children }) => (
  <StyleSheetManager stylisPlugins={[viewportPxToVwPlugin]}>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </StyleSheetManager>
)

export const withTheme = (children) => <ThemeWrapper>{children}</ThemeWrapper>

export const render = (ui, options = {}) => {
  const { wrapper: Wrapper, ...rest } = options

  const AllProviders = ({ children }) =>
    Wrapper ? withTheme(<Wrapper>{children}</Wrapper>) : withTheme(children)

  return rtlRender(ui, {
    wrapper: AllProviders,
    ...rest,
  })
}

export * from '@testing-library/react'
