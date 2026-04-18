import { createPortal } from 'react-dom'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import styled from 'styled-components'
import { PHONE_NAV_ITEMS } from '@/app/router/routeRegistry'

const ToggleButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: ${({ theme }) => theme.colors.blue.dark};
  pointer-events: auto;
  z-index: 90;

  svg {
    width: 24px;
    height: 24px;
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
  z-index: 70;
  display: flex;
  align-items: flex-start;
  justify-content: stretch;
  background:
    radial-gradient(
      circle at 88% 14%,
      rgba(208, 71, 27, 0.18) 0 48px,
      transparent 49px
    ),
    linear-gradient(
      180deg,
      rgba(252, 250, 229, 0.99) 0%,
      rgba(252, 250, 229, 0.97) 58%,
      rgba(175, 211, 252, 0.95) 100%
    );
  backdrop-filter: blur(2px);
`

const Sheet = styled.div`
  position: relative;
  width: 100%;
  min-height: 100%;
  padding: 104px 20px 32px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;

  &::after {
    content: '';
    position: absolute;
    right: -42px;
    bottom: -28px;
    width: 124px;
    height: 124px;
    border-radius: 50%;
    background: rgba(64, 84, 65, 0.12);
    filter: blur(8px);
    pointer-events: none;
  }
`

const MenuLabel = styled.div`
  font-size: 14px;
  line-height: 1;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-variation-settings:
    'wdth' 68,
    'wght' ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.orange.base};
`

const MenuList = styled.nav`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 280px;
`

const MenuLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  width: fit-content;
  padding: 4px 0;
  font-family: ${({ theme }) => theme.font.family};
  font-size: 30px;
  line-height: 1;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  font-variation-settings:
    'wdth' 68,
    'wght' ${({ theme }) => theme.font.weight.medium};
  color: ${({ theme }) => theme.colors.blue.dark};
  transition:
    color 160ms ease,
    transform 160ms ease;

  &[aria-current='page'] {
    color: ${({ theme }) => theme.colors.orange.base};
    font-variation-settings:
      'wdth' 68,
      'wght' ${({ theme }) => theme.font.weight.bold};
  }

  &:hover {
    transform: translateX(2px);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.yellow.gold};
    outline-offset: 5px;
    border-radius: 8px;
  }
`

const MobileNavMenu = ({ activePathname }) => {
  const location = useLocation()
  const activePath = activePathname ?? location.pathname
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
      panel.querySelector('a[href], button:not([disabled])')

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
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        aria-controls='mobile-nav-overlay'
        tabIndex={isOpen ? -1 : undefined}
        onClick={() => setIsOpen((value) => !value)}
      >
        {isOpen ? (
          <svg
            width='25'
            height='23'
            viewBox='0 0 25 23'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M22.6585 0H1.52347C0.682079 0 0 0.789763 0 1.76399V1.77799C0 2.75221 0.682079 3.54197 1.52347 3.54197H22.6585C23.4999 3.54197 24.182 2.75221 24.182 1.77799V1.76399C24.182 0.789763 23.4999 0 22.6585 0Z'
              fill='#1C2D38'
            />
            <path
              d='M22.6585 9.54199H1.52347C0.682079 9.54199 0 10.3318 0 11.306V11.32C0 12.2942 0.682079 13.084 1.52347 13.084H22.6585C23.4999 13.084 24.182 12.2942 24.182 11.32V11.306C24.182 10.3318 23.4999 9.54199 22.6585 9.54199Z'
              fill='#1C2D38'
            />
            <path
              d='M22.6585 19.084H1.52347C0.682079 19.084 0 19.8737 0 20.848V20.862C0 21.8362 0.682079 22.626 1.52347 22.626H22.6585C23.4999 22.626 24.182 21.8362 24.182 20.862V20.848C24.182 19.8737 23.4999 19.084 22.6585 19.084Z'
              fill='#1C2D38'
            />
          </svg>
        ) : (
          <svg viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path
              d='M3 5H21M3 12H21M3 19H21'
              stroke='currentColor'
              strokeWidth='2.5'
              strokeLinecap='round'
            />
          </svg>
        )}
      </ToggleButton>

      {isOpen
        ? createPortal(
            <Overlay
              id='mobile-nav-overlay'
              role='dialog'
              aria-modal='true'
              aria-label='Mobile navigation'
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                  closeMenu()
                }
              }}
            >
              <Sheet ref={panelRef}>
                <MenuLabel>Navigate</MenuLabel>
                <MenuList>
                  {PHONE_NAV_ITEMS.map(({ id, label, path }) => (
                    <MenuLink
                      key={id}
                      to={path}
                      aria-current={activePath === path ? 'page' : undefined}
                      onClick={() => closeMenu(false)}
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
