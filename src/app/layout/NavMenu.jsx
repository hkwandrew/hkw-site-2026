import { useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import styled from 'styled-components'
import { NAV_ITEMS, getRoutePathForPath } from '@/app/router/routeRegistry'
import { applyTypography } from '@/shared/ui/Typography'
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
  background-color: ${({ theme }) => theme.colors.orange.dark};
  border-radius: ${({ theme }) => theme.components.navTabs.borderRadius};

  --pill-x: 0px;
  --pill-w: 0px;
  --pill-h: 0px;
  --pill-o: 0;
  --pill-move-dur: 0.5s;
  --contact-reveal-w: 170px;

  &:hover [data-contact-reveal],
  &:focus-within [data-contact-reveal] {
    max-width: var(--contact-reveal-w);
    margin-left: ${({ theme }) => theme.components.navTabs.gap};
    opacity: 1;
  }

  &:hover [data-contact-reveal-inner],
  &:focus-within [data-contact-reveal-inner] {
    transform: translateX(0);
    opacity: 1;
  }

  @media (hover: none) {
    [data-contact-reveal] {
      max-width: var(--contact-reveal-w);
      margin-left: ${({ theme }) => theme.components.navTabs.gap};
      opacity: 1;
    }

    [data-contact-reveal-inner] {
      transform: translateX(0);
      opacity: 1;
    }
  }

  &[data-click-collapsed='true'] [data-contact-reveal] {
    max-width: 0;
    margin-left: 0;
    opacity: 0;
  }

  &[data-click-collapsed='true'] [data-contact-reveal-inner] {
    transform: translateX(100%);
    opacity: 0;
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

  background-color: ${({ theme }) => theme.colors.orange.base};
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
  ${
    '' /* min-height: ${({ theme }) => theme.components.navTabs.containerHeight}; */
  }
`

const Item = styled.li`
  border-radius: ${({ theme }) => theme.components.navTabs.borderRadius};
  z-index: 1;
`

const StyledNavLink = styled(Link)`
  position: relative;
  display: inline-block;

  ${'' /* min-height: ${({ theme }) => theme.components.navTabs.itemHeight}; */}
  padding: ${({ theme }) => theme.components.navTabs.itemPadding};
  ${applyTypography('navButton')}
  border-radius: ${({ theme }) => theme.components.navTabs.borderRadius};

  color: ${({ theme }) => theme.colors.yellow.light};

  transition:
    font-variation-settings 0.45s ease,
    color 0.45s ease,
    background-color 0.45s ease;

  > span {
    display: block;
    text-box: ${({ theme }) => theme.typography.navButton.textBox};
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
    background-color: ${({ theme }) => theme.colors.orange.base};
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
  max-width: 0;
  margin-left: 0;
  overflow: hidden;
  opacity: 0;
  transition:
    max-width 0.42s ease,
    margin-left 0.42s ease,
    opacity 0.16s ease;
`

const ContactRevealInner = styled.div`
  width: max-content;
  transform: translateX(100%);
  opacity: 0;
  transition:
    transform 0.42s ease,
    opacity 0.16s ease;
`

const NavMenu = ({ activePathname }) => {
  const location = useLocation()
  const { transitionSceneToPath } = usePageSceneTransition()
  const activePath = getRoutePathForPath(activePathname ?? location.pathname)
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

      const menuRect = menuEl.getBoundingClientRect()
      const linkRect = activeLink.getBoundingClientRect()

      const nextX = linkRect.left - menuRect.left
      const nextW = linkRect.width
      const nextH = linkRect.height

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
        data-click-collapsed={isClickCollapsed ? 'true' : undefined}
        onFocusCapture={() => setIsClickCollapsed(false)}
        onPointerLeave={() => setIsClickCollapsed(false)}
      >
        <Pill />
        <Items ref={menuRef}>
          {PRIMARY_NAV_ITEMS.map(({ label, path }, index) => (
            <Item key={path}>
              <StyledNavLink
                to={path}
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
        {CONTACT_NAV_ITEM ? (
          <ContactReveal data-contact-reveal>
            <ContactRevealInner data-contact-reveal-inner>
              <StyledNavLink
                to={CONTACT_NAV_ITEM.path}
                data-text={CONTACT_NAV_ITEM.label}
                aria-current={
                  activePath === CONTACT_NAV_ITEM.path ? 'page' : undefined
                }
                onClick={(event) =>
                  handleNavLinkClick(event, CONTACT_NAV_ITEM.path)
                }
              >
                <span>{CONTACT_NAV_ITEM.label}</span>
              </StyledNavLink>
            </ContactRevealInner>
          </ContactReveal>
        ) : null}
      </Content>
    </nav>
  )
}

export default NavMenu
