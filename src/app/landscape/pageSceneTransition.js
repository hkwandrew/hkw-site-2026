import { createContext, useContext } from 'react'

const PageSceneTransitionContext = createContext({
    startAboutExitOverlay: () => false,
    transitionSceneToPath: () => {},
})

export const PageSceneTransitionProvider = PageSceneTransitionContext.Provider

export const canStartSceneTransitionFromClick = (event) =>
    !event.defaultPrevented &&
    event.button === 0 &&
    !event.altKey &&
    !event.ctrlKey &&
    !event.metaKey &&
    !event.shiftKey

export const usePageSceneTransition = () =>
    useContext(PageSceneTransitionContext)
