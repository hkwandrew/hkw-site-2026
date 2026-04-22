import { createContext, useContext } from 'react'

const noop = () => { }

const HomeHoverContext = createContext({
  isHome: false,
  isHomeInteractive: false,
  homeHoverRegion: null,
  setHomeHoverRegion: noop,
  clearHomeHoverRegion: noop,
})

export const HomeHoverProvider = HomeHoverContext.Provider

export const useHomeHover = () => useContext(HomeHoverContext)
