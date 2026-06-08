import { useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import styled from 'styled-components'
import { NAV_ITEMS, getRoutePathForPath } from '@/app/router/routeRegistry'
import { applyTypography } from '@/shared/ui/Typography'
import { MEDIA_QUERIES } from '@/styles/breakpoints'
import {
  canStartSceneTransitionFromClick,
  usePageSceneTransition,
} from '@/app/landscape/pageSceneTransition'

const CONTACT_NAV_ID = 'contact'
const PRIMARY_NAV_ITEMS = NAV_ITEMS.filter(({ id }) => id !== CONTACT_NAV_ID)
const CONTACT_NAV_ITEM = NAV_ITEMS.find(({ id }) => id === CONTACT_NAV_ID)

const Content = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: ${({ $isRootsPage, theme }) =>
    $isRootsPage ? theme.colors.blue.dark : theme.colors.orange.dark};
  border-radius: ${({ theme }) => theme.components.navTabs.borderRadius};
  overflow: hidden;

  --pill-x: 0px;
  --pill-w: 0px;
  --pill-h: 0px;
  --pill-o: 0;
  --pill-move-dur: 0.5s;
  --contact-pill-size: 62px;

  @media (hover: hover) {
    overflow: visible;

    &[data-has-contact-reveal='true']:not(:hover):not(:focus-within),
    &[data-has-contact-reveal='true'][data-click-collapsed='true'] {
      border-radius: ${({ theme }) => theme.components.navTabs.borderRadius};
    }

    &[data-has-contact-reveal='true']:not([data-click-collapsed='true']):hover,
    &[data-has-contact-reveal='true']:not(
        [data-click-collapsed='true']
      ):focus-within {
      border-radius: ${({ theme }) => theme.components.navTabs.borderRadius} 0 0
        ${({ theme }) => theme.components.navTabs.borderRadius};
    }

    &:hover [data-contact-reveal],
    &:focus-within [data-contact-reveal] {
      opacity: 1;
      pointer-events: auto;
    }

    &:hover [data-contact-reveal-inner],
    &:focus-within [data-contact-reveal-inner] {
      transform: translateX(0);
      opacity: 1;
    }

    &[data-click-collapsed='true'] [data-contact-reveal] {
      opacity: 0;
      pointer-events: none;
    }

    &[data-click-collapsed='true'] [data-contact-reveal-inner] {
      transform: translateX(-100%);
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    [data-contact-reveal],
    [data-contact-reveal-inner] {
      transition-duration: 0.01ms;
    }
  }
`

const Pill = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  left: var(--pill-x);
  width: var(--pill-w);
  height: var(--pill-h);

  background-color: ${({ $isRootsPage, theme }) =>
    $isRootsPage ? theme.colors.blue.medDark : theme.colors.orange.base};
  border-radius: 9999px;

  opacity: var(--pill-o);

  transition:
    left var(--pill-move-dur) ease,
    width var(--pill-move-dur) ease,
    height var(--pill-move-dur) ease,
    opacity 0.15s ease;
`

const Items = styled.ul`
  display: flex;
  gap: ${({ theme }) => theme.components.navTabs.gap};
`

const Item = styled.li`
  border-radius: ${({ theme }) => theme.components.navTabs.borderRadius};
  z-index: 1;
`

const StyledNavLink = styled(Link)`
  position: relative;
  display: block;
  padding: ${({ theme }) => theme.components.navTabs.itemPadding};
  border-radius: ${({ theme }) => theme.components.navTabs.borderRadius};
  transition:
    font-variation-settings 0.45s ease,
    color 0.45s ease,
    background-color 0.45s ease;

  > span {
    ${applyTypography('navButton')}
    color: ${({ $isRootsPage, theme }) =>
      $isRootsPage ? theme.colors.white : theme.colors.yellow.light};
    display: block;
  }

  &::after {
    content: attr(data-text);
    display: block;
    white-space: nowrap;

    height: 0;
    overflow: hidden;
    visibility: hidden;
    user-select: none;
    pointer-events: none;

    font-variation-settings:
      'wdth' ${({ theme }) => theme.typography.navButton.width},
      'wght' ${({ theme }) => theme.typography.navButton.activeWeight};
    transition: none;
  }

  @media speech {
    &::after {
      display: none;
    }
  }

  &[aria-current='page'] {
    color: ${({ theme }) => theme.colors.white};
    font-weight: ${({ theme }) => theme.typography.navButton.activeWeight};
    font-variation-settings:
      'wdth' ${({ theme }) => theme.typography.navButton.width},
      'wght' ${({ theme }) => theme.typography.navButton.activeWeight};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.yellow.gold};
    outline-offset: 4px;
  }

  &:not([aria-current='page']):hover,
  &:not([aria-current='page']):focus-visible {
    border-radius: ${({ theme }) => theme.components.navTabs.borderRadius};
    background-color: ${({ $isRootsPage, theme }) =>
      $isRootsPage ? theme.colors.blue.medDark : theme.colors.orange.base};
    color: ${({ theme }) => theme.colors.white};

    font-weight: ${({ theme }) => theme.typography.navButton.activeWeight};
    font-variation-settings:
      'wdth' ${({ theme }) => theme.typography.navButton.width},
      'wght' ${({ theme }) => theme.typography.navButton.activeWeight};

    transition:
      font-variation-settings 0.15s ease,
      color 0.15s ease,
      background-color 0.15s ease;
  }
`

const ContactReveal = styled.div`
  align-self: stretch;
  display: flex;
  flex: 0 0 var(--contact-pill-size);
  position: unset;
  width: var(--contact-pill-size);
  overflow: hidden;
  opacity: 1;
  pointer-events: auto;
  z-index: 0;
  border-radius: 0 ${({ theme }) => theme.components.navTabs.borderRadius}
    ${({ theme }) => theme.components.navTabs.borderRadius} 0;
  transform: translateX(0);
  transition: transform 0.42s ease;

  @media (hover: hover) {
    position: absolute;
    top: 0;
    left: 100%;
    height: 100%;
    opacity: 0;
    pointer-events: none;
  }

  @media ${MEDIA_QUERIES.mobilePortrait} {
    position: unset;
    border-radius: ${({ theme }) => theme.components.navTabs.borderRadius} 0 0
      ${({ theme }) => theme.components.navTabs.borderRadius};
  }
`

const ContactRevealInner = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  transform: translateX(0);
  opacity: 1;
  background-color: ${({ $isRootsPage, theme }) =>
    $isRootsPage ? theme.colors.blue.dark : theme.colors.orange.dark};
  border-radius: 0 ${({ theme }) => theme.components.navTabs.borderRadius}
    ${({ theme }) => theme.components.navTabs.borderRadius} 0;
  transition: -0.21s transform 0.42s ease;

  @media (hover: hover) {
    transform: translateX(-100%);
    opacity: 0;
  }
`

const ContactNavLink = styled(StyledNavLink)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0;
  color: ${({ $isRootsPage, theme }) =>
    $isRootsPage ? theme.colors.white : theme.colors.yellow.light};

  &::after {
    display: none;
  }

  &[aria-current='page'] {
    background-color: ${({ $isRootsPage, theme }) =>
      $isRootsPage ? theme.colors.blue.medDark : theme.colors.orange.base};
  }
`

const ContactIcon = styled.svg`
  display: block;
  width: 25px;
  height: 25px;
  fill: currentColor;
`

const NavMenu = ({ activePathname, isRootsPage = false }) => {
  const location = useLocation()
  const { transitionSceneToPath } = usePageSceneTransition()
  const activePath = getRoutePathForPath(activePathname ?? location.pathname)
  const isContactActive = activePath === CONTACT_NAV_ITEM?.path
  const [isClickCollapsed, setIsClickCollapsed] = useState(false)
  const contentRef = useRef(null)
  const menuRef = useRef(null)

  // Refs for each primary NavLink element.
  const linkRefs = useRef([])

  // Track whether we've ever displayed the pill. Used to avoid animating from "nothing".
  const hasShownPillRef = useRef(false)

  useLayoutEffect(() => {
    const menuEl = menuRef.current
    const contentEl = contentRef.current
    if (!menuEl || !contentEl) return

    let rafId = 0

    const setPill = () => {
      rafId = 0

      // Determine active index from current pathname.
      // If there is no match (e.g. `/`), hide the pill (no active state).
      const matchIndex = PRIMARY_NAV_ITEMS.findIndex(
        (item) => item.path === activePath,
      )

      if (matchIndex === -1) {
        contentEl.style.setProperty('--pill-o', '0')

        // Next time we show, treat it as a first-show (no travel animation).
        hasShownPillRef.current = false
        return
      }

      contentEl.style.setProperty('--pill-o', '1')

      const activeLink = linkRefs.current[matchIndex]
      if (!activeLink) return

      const contentRect = contentEl.getBoundingClientRect()
      const linkRect = activeLink.getBoundingClientRect()

      const nextX = linkRect.left - contentRect.left
      const nextW = linkRect.width
      const nextH = contentRect.height

      // If the pill was previously hidden, place it instantly at the target.
      // Then re-enable transitions for subsequent link-to-link moves.
      if (!hasShownPillRef.current) {
        contentEl.style.setProperty('--pill-move-dur', '0s')
        contentEl.style.setProperty('--pill-x', `${nextX}px`)
        contentEl.style.setProperty('--pill-w', `${nextW}px`)
        contentEl.style.setProperty('--pill-h', `${nextH}px`)
        contentEl.style.setProperty('--pill-o', '1')

        hasShownPillRef.current = true

        // Restore movement duration on the next frame so future moves animate.
        window.requestAnimationFrame(() => {
          contentEl.style.setProperty('--pill-move-dur', '0.5s')
        })

        return
      }

      // Drive the pill via CSS variables.
      contentEl.style.setProperty('--pill-x', `${nextX}px`)
      contentEl.style.setProperty('--pill-w', `${nextW}px`)
      contentEl.style.setProperty('--pill-h', `${nextH}px`)
    }

    const schedule = () => {
      if (rafId) return
      rafId = window.requestAnimationFrame(setPill)
    }

    // Initial positioning (pre-paint)
    schedule()

    // Keep pill aligned when layout/typography changes
    const ro = new ResizeObserver(schedule)
    ro.observe(menuEl)

    window.addEventListener('resize', schedule)

    // Variable font load can reflow after initial render
    if (document.fonts?.ready) {
      document.fonts.ready.then(schedule).catch(() => {})
    }

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId)
      ro.disconnect()
      window.removeEventListener('resize', schedule)
    }
  }, [activePath])

  const handleNavLinkClick = (event, path) => {
    setIsClickCollapsed(true)
    event.currentTarget.blur()

    if (
      activePath === '/' &&
      path === '/about' &&
      canStartSceneTransitionFromClick(event)
    ) {
      transitionSceneToPath(path)
    }
  }

  return (
    <nav>
      <Content
        ref={contentRef}
        $isRootsPage={isRootsPage}
        data-nav-scheme={isRootsPage ? 'roots' : 'default'}
        data-has-contact-reveal={
          CONTACT_NAV_ITEM && !isContactActive ? 'true' : undefined
        }
        data-click-collapsed={isClickCollapsed ? 'true' : undefined}
        onFocusCapture={() => setIsClickCollapsed(false)}
        onPointerLeave={() => setIsClickCollapsed(false)}
      >
        <Pill $isRootsPage={isRootsPage} />
        <Items ref={menuRef}>
          {PRIMARY_NAV_ITEMS.map(({ label, path }, index) => (
            <Item key={path}>
              <StyledNavLink
                to={path}
                $isRootsPage={isRootsPage}
                data-text={label}
                aria-current={activePath === path ? 'page' : undefined}
                onClick={(event) => handleNavLinkClick(event, path)}
                ref={(el) => {
                  linkRefs.current[index] = el
                }}
              >
                <span>{label}</span>
              </StyledNavLink>
            </Item>
          ))}
        </Items>
        {CONTACT_NAV_ITEM && !isContactActive ? (
          <ContactReveal $isRootsPage={isRootsPage} data-contact-reveal>
            <ContactRevealInner
              $isRootsPage={isRootsPage}
              data-contact-reveal-inner
            >
              <ContactNavLink
                to={CONTACT_NAV_ITEM.path}
                $isRootsPage={isRootsPage}
                aria-label={CONTACT_NAV_ITEM.label}
                data-text=''
                aria-current={
                  activePath === CONTACT_NAV_ITEM.path ? 'page' : undefined
                }
                onClick={(event) =>
                  handleNavLinkClick(event, CONTACT_NAV_ITEM.path)
                }
              >
                <ContactIcon
                  aria-hidden='true'
                  data-contact-icon
                  focusable='false'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z' />
                </ContactIcon>
              </ContactNavLink>
            </ContactRevealInner>
          </ContactReveal>
        ) : null}
      </Content>
    </nav>
  )
}

export default NavMenu
