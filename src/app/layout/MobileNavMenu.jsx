import { createPortal } from 'react-dom'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import styled, { keyframes } from 'styled-components'
import {
  PHONE_NAV_ITEMS,
  getRoutePathForPath,
} from '@/app/router/routeRegistry'
import {
  canStartSceneTransitionFromClick,
  usePageSceneTransition,
} from '@/app/landscape/pageSceneTransition'

const backdropIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const drawerIn = keyframes`
  from {
    transform: translate3d(100%, 0, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`

const MobileNavWrapper = styled.div`
  @media (min-width: 1025px) or ((orientation: landscape) and (max-aspect-ratio: 1440 / 1024)) {
    display: none;
  }
`

const ToggleButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 22px;
  color: ${({ theme }) => theme.colors.blue.dark};
  pointer-events: auto;
  z-index: 90;
  translate: ${({
    $isRootsPage,
    $isHomePage,
    $isServicesPage,
    $isWorkPage,
    $isContactPage,
  }) =>
    $isRootsPage || $isHomePage || $isContactPage
      ? '0 0'
      : $isServicesPage || $isWorkPage
        ? '0 -24px'
        : '0 -16px'};
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};

  svg {
    width: 24px;
    height: 22px;
    color: ${({ $isRootsPage, theme }) =>
      $isRootsPage ? theme.colors.yellow.light : theme.colors.blue.dark};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.yellow.gold};
    outline-offset: 4px;
    border-radius: 8px;
  }
`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 120;
  display: flex;
  align-items: stretch;
  justify-content: flex-end;
  background: rgba(28, 45, 56, 0.42);
  backdrop-filter: blur(2px);
  animation: ${backdropIn} 180ms ease both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const Sheet = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  width: min(86vw, 360px);
  max-width: 100%;
  height: 100dvh;
  padding: 24px 24px 40px;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.yellow.light};
  border-left: 4px solid ${({ theme }) => theme.colors.orange.dark};
  box-shadow: -16px 0 36px rgba(28, 45, 56, 0.24);
  animation: ${drawerIn} 260ms cubic-bezier(0.22, 1, 0.36, 1) both;

  @supports not (height: 100dvh) {
    height: 100vh;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const CloseRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 48px;
`

const CloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme.colors.yellow.light};
  background: ${({ theme }) => theme.colors.orange.dark};
  border-radius: 9999px;
  pointer-events: auto;

  svg {
    width: 12px;
    height: 12px;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.yellow.gold};
    outline-offset: 4px;
  }
`

const MenuList = styled.nav`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
`

const MenuLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 60px;
  width: 100%;
  padding: 14px 0;
  font-family: ${({ theme }) => theme.font.family};
  font-size: 34px;
  line-height: 1;
  letter-spacing: 0;
  text-transform: uppercase;
  font-variation-settings:
    'wdth' 68,
    'wght' ${({ theme }) => theme.font.weight.medium};
  color: ${({ theme }) => theme.colors.blue.dark};
  border-bottom: 1px solid rgba(28, 45, 56, 0.18);
  transition:
    border-color 160ms ease,
    color 160ms ease,
    transform 160ms ease;

  &[aria-current='page'] {
    color: ${({ theme }) => theme.colors.orange.dark};
    border-bottom-color: ${({ theme }) => theme.colors.orange.dark};
    font-variation-settings:
      'wdth' 68,
      'wght' ${({ theme }) => theme.font.weight.bold};

    &::after {
      content: '';
      flex: 0 0 auto;
      width: 9px;
      height: 9px;
      margin-left: 16px;
      border-radius: 50%;
      background: currentColor;
    }
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: ${({ theme }) => theme.colors.orange.dark};
      transform: translateX(-2px);
    }
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.yellow.gold};
    outline-offset: 5px;
    border-radius: 8px;
  }
`

const MobileNavMenu = ({
  activePathname,
  isRootsPage = false,
  isHomePage = false,
  isServicesPage = false,
  isWorkPage = false,
  isContactPage = false,
  isActive = true,
}) => {
  const location = useLocation()
  const { transitionSceneToPath } = usePageSceneTransition()
  const activePath = getRoutePathForPath(activePathname ?? location.pathname)
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef(null)
  const panelRef = useRef(null)

  const closeMenu = (shouldRestoreFocus = true) => {
    setIsOpen(false)

    if (shouldRestoreFocus) {
      window.requestAnimationFrame(() => {
        buttonRef.current?.focus()
      })
    }
  }

  useEffect(() => {
    if (!isOpen) return undefined

    const previousOverflow = document.body.style.overflow
    const previousTouchAction = document.body.style.touchAction

    document.body.dataset.mobileNavOpen = 'true'
    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'

    const focusables = () => {
      const panel = panelRef.current
      return panel
        ? Array.from(panel.querySelectorAll('a[href], button:not([disabled])'))
        : []
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeMenu()
        return
      }

      if (event.key !== 'Tab') return

      const elements = focusables()
      if (!elements.length) return

      const firstElement = elements[0]
      const lastElement = elements[elements.length - 1]
      const activeElement = document.activeElement

      if (!event.shiftKey && activeElement === buttonRef.current) {
        event.preventDefault()
        firstElement?.focus()
        return
      }

      if (
        event.shiftKey &&
        (activeElement === firstElement || activeElement === buttonRef.current)
      ) {
        event.preventDefault()
        lastElement?.focus()
        return
      }

      if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault()
        firstElement?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)

      document.body.style.overflow = previousOverflow
      document.body.style.touchAction = previousTouchAction
      delete document.body.dataset.mobileNavOpen
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      closeMenu(false)
    }
    // Close the overlay any time the route changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  useLayoutEffect(() => {
    if (!isOpen) return

    const panel = panelRef.current
    if (!panel) return

    const nextFocusTarget =
      panel.querySelector('[aria-current="page"]') ??
      panel.querySelector('a[href]')

    const focusFrameId = window.requestAnimationFrame(() => {
      nextFocusTarget?.focus?.()
    })

    return () => {
      window.cancelAnimationFrame(focusFrameId)
    }
  }, [isOpen])

  if (!PHONE_NAV_ITEMS.length) return null

  return (
    <MobileNavWrapper>
      <ToggleButton
        ref={buttonRef}
        type='button'
        aria-label='Open navigation menu'
        aria-expanded={isOpen}
        aria-controls='mobile-nav-drawer'
        aria-hidden={isOpen ? true : undefined}
        tabIndex={isOpen ? -1 : undefined}
        $isRootsPage={isRootsPage}
        $isHomePage={isHomePage}
        $isServicesPage={isServicesPage}
        $isWorkPage={isWorkPage}
        $isContactPage={isContactPage}
        $isActive={isActive}
        onClick={() => setIsOpen((value) => !value)}
      >
        <svg
          width='25'
          height='23'
          viewBox='0 0 25 23'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M22.6585 0H1.52347C0.682079 0 0 0.789763 0 1.76399V1.77799C0 2.75221 0.682079 3.54197 1.52347 3.54197H22.6585C23.4999 3.54197 24.182 2.75221 24.182 1.77799V1.76399C24.182 0.789763 23.4999 0 22.6585 0Z'
            fill='currentColor'
          />
          <path
            d='M22.6585 9.54199H1.52347C0.682079 9.54199 0 10.3318 0 11.306V11.32C0 12.2942 0.682079 13.084 1.52347 13.084H22.6585C23.4999 13.084 24.182 12.2942 24.182 11.32V11.306C24.182 10.3318 23.4999 9.54199 22.6585 9.54199Z'
            fill='currentColor'
          />
          <path
            d='M22.6585 19.084H1.52347C0.682079 19.084 0 19.8737 0 20.848V20.862C0 21.8362 0.682079 22.626 1.52347 22.626H22.6585C23.4999 22.626 24.182 21.8362 24.182 20.862V20.848C24.182 19.8737 23.4999 19.084 22.6585 19.084Z'
            fill='currentColor'
          />
        </svg>
      </ToggleButton>

      {isOpen
        ? createPortal(
            <Overlay
              id='mobile-nav-overlay'
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                  closeMenu()
                }
              }}
            >
              <Sheet
                id='mobile-nav-drawer'
                ref={panelRef}
                role='dialog'
                aria-modal='true'
                aria-label='Mobile navigation'
                data-mobile-nav-drawer='right'
              >
                <CloseRow>
                  <CloseButton
                    type='button'
                    aria-label='Close navigation menu'
                    onClick={() => closeMenu()}
                  >
                    <svg
                      viewBox='0 0 24 24'
                      fill='none'
                      aria-hidden='true'
                      focusable='false'
                    >
                      <path
                        d='M5 5L19 19M19 5L5 19'
                        stroke='currentColor'
                        strokeWidth='2.5'
                        strokeLinecap='round'
                      />
                    </svg>
                  </CloseButton>
                </CloseRow>
                <MenuList aria-label='Primary mobile navigation'>
                  {PHONE_NAV_ITEMS.map(({ id, label, path }) => (
                    <MenuLink
                      key={id}
                      to={path}
                      aria-current={activePath === path ? 'page' : undefined}
                      onClick={(event) => {
                        if (
                          activePath === '/' &&
                          path === '/about' &&
                          canStartSceneTransitionFromClick(event)
                        ) {
                          transitionSceneToPath(path)
                        }

                        closeMenu(false)
                      }}
                    >
                      {label}
                    </MenuLink>
                  ))}
                </MenuList>
              </Sheet>
            </Overlay>,
            document.body,
          )
        : null}
    </MobileNavWrapper>
  )
}

export default MobileNavMenu
