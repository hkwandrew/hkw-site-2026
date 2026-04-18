/* eslint-disable react-refresh/only-export-components */
import { render as rtlRender } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import theme from '@/styles/theme'

const ThemeWrapper = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
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
