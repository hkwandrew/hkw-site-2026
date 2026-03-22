import { useEffect, useState } from 'react'

/**
 * Returns `true` one frame after mount, enabling CSS mount transitions.
 * React Router only mounts the matched route, so the page is always
 * "active" — this just delays the flag so the transition can play.
 */
const usePageActive = () => {
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        const id = requestAnimationFrame(() => setIsActive(true))
        return () => cancelAnimationFrame(id)
    }, [])

    return isActive
}

export default usePageActive
