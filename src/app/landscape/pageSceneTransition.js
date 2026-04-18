import { createContext, useContext } from 'react'

const PageSceneTransitionContext = createContext({
    transitionSceneToPath: () => {},
})

export const PageSceneTransitionProvider = PageSceneTransitionContext.Provider

export const usePageSceneTransition = () =>
    useContext(PageSceneTransitionContext)
