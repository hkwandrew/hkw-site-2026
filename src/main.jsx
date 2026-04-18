import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router"
import { ThemeProvider } from "styled-components"
import theme from "./styles/theme"
import GlobalStyle from "./styles/GlobalStyle"

import "the-new-css-reset"

import ErrorBoundary from '@/app/ErrorBoundary.jsx'
import { createAppRouter } from '@/app/router/createAppRouter'

const router = createAppRouter()

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <ErrorBoundary>
                <RouterProvider router={router} />
            </ErrorBoundary>
        </ThemeProvider>
    </StrictMode>,
)
