import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router"
import { ThemeProvider } from "styled-components"
import theme from "./styles/theme"
import GlobalStyle from "./styles/GlobalStyle"

import "the-new-css-reset"
import './index.css'

import Home from "./pages/HomePage.jsx"
import About from "./pages/AboutPage.jsx"
import Services from "./pages/ServicesPage.jsx"
import Work from "./pages/WorkPage.jsx"
import Layout from './Layout.jsx'
import Contact from './pages/Contact.jsx'
import { getRouteChildrenConfig } from './pageRegistry.js'

const componentById = {
    home: Home,
    about: About,
    services: Services,
    work: Work,
    contact: Contact,
}

const router = createBrowserRouter([
    {
        Component: Layout,
        children: getRouteChildrenConfig(componentById),
    },
])

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <RouterProvider router={router} />
        </ThemeProvider>
    </StrictMode>,
)
