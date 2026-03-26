import { createPortal } from 'react-dom'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router'
import styled from 'styled-components'
import { PHONE_NAV_ITEMS } from '../pageRegistry.js'

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

const MenuLink = styled(NavLink)`
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

  &.active {
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

const MobileNavMenu = () => {
  const location = useLocation()
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
      const button = buttonRef.current
      const links = panel
        ? Array.from(panel.querySelectorAll('a[href], button:not([disabled])'))
        : []

      return [button, ...links].filter(Boolean)
    }

    const firstFocusable = focusables()[0]
    window.requestAnimationFrame(() => {
      firstFocusable?.focus()
    })

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

      if (event.shiftKey && activeElement === firstElement) {
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

    const activeLink = panel.querySelector('.active')
    activeLink?.focus?.()
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
        onClick={() => setIsOpen((value) => !value)}
      >
        {isOpen ? (
          <svg viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path
              d='M5 5L19 19M19 5L5 19'
              stroke='currentColor'
              strokeWidth='2.5'
              strokeLinecap='round'
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
                      end
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
