import { ThemeProvider } from 'styled-components'
import theme from '@/styles/theme'
import GlobalStyle from '@/styles/GlobalStyle'
import LandscapeScene from '@/components/landscape/LandscapeScene'
import PillNav from '@/components/navigation/PillNav'
import useViewTransition from '@/hooks/useViewTransition'
import Home from '@/views/Home'
import Services from '@/views/Services'
import About from '@/views/About'
import Work from '@/views/Work'
import Contact from '@/views/Contact'

export default function App() {
  const { activeView, navigateTo } = useViewTransition('home')

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <LandscapeScene activeView={activeView} />
      <PillNav activeView={activeView} onNavigate={navigateTo} />
      <Home isActive={activeView === 'home'} />
      <Services isActive={activeView === 'services'} />
      <About isActive={activeView === 'about'} />
      <Work isActive={activeView === 'work'} />
      <Contact
        isActive={activeView === 'contact'}
        onClose={() => navigateTo('home')}
      />
    </ThemeProvider>
  )
}
