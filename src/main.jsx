import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { StyleSheetManager, ThemeProvider } from 'styled-components'
import theme from './styles/theme'
import GlobalStyle from './styles/GlobalStyle'
import { viewportPxToVwPlugin } from '@/styles/viewportUnits'

import 'the-new-css-reset'
import './styles/fonts.css'

import ErrorBoundary from '@/app/ErrorBoundary.jsx'
import { createAppRouter } from '@/app/router/createAppRouter'

const router = createAppRouter()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StyleSheetManager stylisPlugins={[viewportPxToVwPlugin]}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </ThemeProvider>
    </StyleSheetManager>
  </StrictMode>,
)
