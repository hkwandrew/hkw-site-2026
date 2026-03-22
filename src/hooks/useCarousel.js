import { useState, useCallback } from 'react'

export default function useCarousel(itemCount) {
  const [index, setIndex] = useState(0)

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % itemCount)
  }, [itemCount])

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + itemCount) % itemCount)
  }, [itemCount])

  const goTo = useCallback((i) => {
    setIndex(i)
  }, [])

  return { index, next, prev, goTo }
}
