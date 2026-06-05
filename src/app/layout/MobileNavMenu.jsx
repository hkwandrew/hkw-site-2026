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
    $isContactPage,
    $isPolicyPage,
  }) =>
    $isRootsPage || $isHomePage || $isContactPage || $isPolicyPage
      ? '0 0'
      : $isServicesPage
        ? '0 -24px'
        : '0 -16px'};

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
  padding: 16px 24px 40px;
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

const MenuHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 48px;
`

const HKWLogo = styled(Link)`
  position: relative;
  width: 136px;
  height: 68px;
  display: grid;
  place-items: center;
  --fill-0: ${({ theme }) => theme.colors.blue.dark};
  background-color: transparent;
  border-radius: 8px;

  [data-viewport-layout='phone-portrait'] & {
    width: 76px;
    height: 38px;
    border-radius: 2px;
  }
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
  isPolicyPage = false,
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
    <>
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
        $isPolicyPage={isPolicyPage}
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
                <MenuHeader>
                  <HKWLogo to='/' onClick={() => closeMenu(false)}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 136 68'
                      fill='none'
                    >
                      <rect
                        x='8'
                        y='8'
                        width='120'
                        height='52'
                        fill='var(--logo-background, transparent)'
                      />
                      <path
                        id='hkw-main-logo-svg'
                        d='M133.1 0H2.89982C1.30409 0 0 1.31013 0 2.91191V65.0866C0 66.6899 1.30409 68 2.89982 68H133.102C134.696 68 136 66.6899 136 65.0881V2.91191C136 1.31013 134.696 0 133.1 0ZM122.468 14.5263L112.868 53.1956C112.655 54.0524 111.733 54.7763 110.854 54.7763H105.707C104.824 54.7763 103.889 54.0524 103.664 53.1956L97.515 29.8036C97.3518 29.2279 96.9136 28.8547 96.3998 28.8547C95.8694 28.8547 95.4342 29.243 95.2907 29.849L89.9595 53.1987C89.7645 54.054 88.8609 54.7778 87.986 54.7778H82.6608C81.7783 54.7778 80.8414 54.054 80.6163 53.1972L72.284 21.5726C72.0468 20.669 71.4242 20.1084 70.6626 20.1084C70.1926 20.1084 69.7227 20.3214 69.3011 20.7234L64.0273 25.7569C63.175 26.5714 62.2925 27.4131 63.0662 29.7628L71.3184 53.3407L71.3607 53.4601C71.4106 53.5961 71.4317 53.6988 71.4317 53.7925C71.4317 54.335 70.992 54.7763 70.451 54.7763H64.1708C63.2748 54.7763 62.282 54.0524 62.0039 53.1972L56.6032 36.5795C56.2012 35.2996 55.5228 35.0321 55.0241 35.0321C54.5436 35.0321 54.0494 35.2799 53.5145 35.7907L50.7492 38.4306C49.4451 39.6742 49.0688 40.5567 49.0688 42.3625V53.2727C49.0688 54.1008 48.3979 54.7748 47.5728 54.7748H42.3413C41.5163 54.7748 40.8453 54.1008 40.8453 53.2727V39.0108C40.8453 37.5451 39.6576 36.3528 38.1994 36.3528H24.3334C22.8737 36.3528 21.6875 37.5451 21.6875 39.0108V53.2727C21.6875 54.1008 21.0165 54.7748 20.1915 54.7748H14.9857C14.1606 54.7748 13.4897 54.1008 13.4897 53.2727V14.7273C13.4897 13.8992 14.1606 13.2252 14.9857 13.2252H20.1915C21.0165 13.2252 21.6875 13.8992 21.6875 14.7273V26.9552C21.6875 28.421 22.8752 29.6132 24.3334 29.6132H38.1994C39.6591 29.6132 40.8453 28.421 40.8453 26.9552V14.7273C40.8453 13.8992 41.5163 13.2252 42.3413 13.2252H47.5728C48.3979 13.2252 49.0688 13.8992 49.0688 14.7273V26.9552C49.0688 28.1973 49.7443 28.6371 50.323 28.6371C50.728 28.6371 51.1436 28.4436 51.5621 28.0598L66.3982 14.4734C67.2822 13.6635 68.21 13.2222 68.4397 13.2222H71.4091H76.6572C77.5321 13.2222 78.4372 13.946 78.6337 14.7998L84.3608 40.1744C84.4787 40.6625 84.9033 41.004 85.3944 41.004C85.884 41.004 86.2935 40.67 86.4129 40.1668L92.1838 14.8028C92.3803 13.946 93.2854 13.2237 94.1604 13.2237H98.7692C99.6487 13.2237 100.574 13.9476 100.788 14.8044L107.159 40.1956C107.274 40.6564 107.698 40.9798 108.191 40.9798C108.702 40.9798 109.111 40.6474 109.211 40.1563L114.498 14.8013C114.677 13.946 115.562 13.2237 116.431 13.2237H121.459C121.829 13.2237 122.134 13.3552 122.32 13.594C122.504 13.8342 122.557 14.1652 122.468 14.5263Z'
                        fill='var(--fill-0, #1C2D38)'
                      />
                    </svg>
                  </HKWLogo>

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
                </MenuHeader>
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
    </>
  )
}

export default MobileNavMenu
