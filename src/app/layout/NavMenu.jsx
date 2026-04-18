import { useLayoutEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router'
import styled from 'styled-components'
import { NAV_ITEMS } from '@/app/router/routeRegistry'

const Content = styled.div`
  position: relative;

  --pill-x: 0px;
  --pill-w: 0px;
  --pill-h: 0px;
  --pill-o: 0;
  --pill-move-dur: 0.5s;
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
  background-color: ${({ theme }) => theme.colors.orange.dark};
  border-radius: 9999px;
`

const Item = styled.li`
  border-radius: 9999px;
  z-index: 1;
`

const StyledNavLink = styled(Link)`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  padding: 18px 21px;
  text-box: trim-both cap alphabetic;
  text-transform: uppercase;

  font-variation-settings: "wdth" 68, "wght" ${({ theme }) => theme.font.weight.medium};
  font-size: 24px;
  line-height: 26px;
  border-radius: 9999px;

  color: ${({ theme }) => theme.colors.yellow.light};

  transition:
    font-variation-settings 0.45s ease,
    color 0.45s ease,
    background-color 0.45s ease;

  &::after {
    content: attr(data-text);
    display: block;
    white-space: nowrap;

    height: 0;
    overflow: hidden;
    visibility: hidden;
    user-select: none;
    pointer-events: none;

    font-variation-settings: "wdth" 68, "wght" ${({ theme }) => theme.font.weight.bold};
    transition: none;
  }

  @media speech {
    &::after {
      display: none;
    }
  }

  &[aria-current='page'] {
    color: ${({ theme }) => theme.colors.white};
    font-variation-settings: "wdth" 68, "wght" ${({ theme }) => theme.font.weight.bold};
  }

  &:not([aria-current='page']):hover {
    border-radius: 9999px;
    background-color: ${({ theme }) => theme.colors.orange.base};
    color: ${({ theme }) => theme.colors.white};

    font-variation-settings: "wdth" 68, "wght" ${({ theme }) => theme.font.weight.bold};

    transition:
      font-variation-settings 0.15s ease,
      color 0.15s ease,
      background-color 0.15s ease;
  }
`

const NavMenu = ({ activePathname }) => {
    const location = useLocation()
    const activePath = activePathname ?? location.pathname
    const contentRef = useRef(null)
    const menuRef = useRef(null)

    // Refs for each NavLink element (indexed to NAV_ITEMS)
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
            const matchIndex = NAV_ITEMS.findIndex((item) => item.path === activePath)

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

    return (
        <nav>
            <Content ref={contentRef}>
                <Pill />
                <Items ref={menuRef}>
                    {NAV_ITEMS.map(({ label, path }, index) => (
                        <Item key={path}>
                            <StyledNavLink
                                to={path}
                                data-text={label}
                                aria-current={activePath === path ? 'page' : undefined}
                                ref={(el) => {
                                    linkRefs.current[index] = el
                                }}
                            >
                                {label}
                            </StyledNavLink>
                        </Item>
                    ))}
                </Items>
            </Content>
        </nav>
    )
}

export default NavMenu
