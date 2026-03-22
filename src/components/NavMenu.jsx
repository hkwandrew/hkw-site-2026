import { useLayoutEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router'
import { NAV_ITEMS } from '../pageRegistry.js'

const NavMenu = () => {
    const location = useLocation()
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
            const matchIndex = NAV_ITEMS.findIndex((item) => item.path === location.pathname)

            if (matchIndex === -1) {
                contentEl.style.setProperty('--pill-o', '0')
                contentEl.style.setProperty('--pill-w', '0px')
                contentEl.style.setProperty('--pill-h', '0px')
                contentEl.style.setProperty('--pill-x', '0px')

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
    }, [location.pathname])

    return (
        <nav id='menu'>
            <div className='content' ref={contentRef}>
                <div id='pill' />
                <ul id='items' ref={menuRef}>
                    {NAV_ITEMS.map(({ label, path }, index) => (
                        <li key={path} className="item">
                            <NavLink
                                to={path}
                                end
                                data-text={label}
                                ref={(el) => {
                                    linkRefs.current[index] = el
                                }}
                                className={({ isActive }) =>
                                    `button${isActive ? ' active' : ''}`
                                }
                            >
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export default NavMenu
