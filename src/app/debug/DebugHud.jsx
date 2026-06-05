import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import styled from 'styled-components'
import { getRoutePathForPath } from '@/app/router/routeRegistry'
import {
  getDebugHudEnabled,
  getDebugQueryPreference,
  getViewportDebugSnapshot,
  subscribeToDebugMediaQueries,
  writeStoredDebugPreference,
} from './debugState'
import {
  clearOverflowHighlights,
  scanPageOverflow,
} from './overflowScanner'

const Panel = styled.aside`
  position: fixed;
  right: 0.75rem;
  bottom: 0.75rem;
  z-index: 2147483646;
  width: min(23rem, calc(100vw - 1.5rem));
  max-height: calc(100vh - 1.5rem);
  overflow: auto;
  display: grid;
  gap: 0.75rem;
  padding: 0.875rem;
  color: ${({ theme }) => theme.colors.yellow.light};
  background: rgba(28, 45, 56, 0.94);
  border: 0.0625rem solid rgba(252, 250, 229, 0.3);
  border-radius: 0.5rem;
  font-size: 0.75rem;
  line-height: 1.35;
  letter-spacing: 0;
  pointer-events: auto;
`

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`

const Title = styled.p`
  font-weight: ${({ theme }) => theme.font.weight.semibold};
  text-transform: uppercase;
`

const MetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.375rem 0.75rem;
`

const Metric = styled.p`
  min-width: 0;
  color: rgba(252, 250, 229, 0.82);
`

const MetricValue = styled.strong`
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.font.weight.semibold};
`

const MediaList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
`

const MediaPill = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 1.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  color: ${({ theme }) => theme.colors.yellow.light};
  background: rgba(252, 250, 229, 0.12);
  border: 0.0625rem solid rgba(252, 250, 229, 0.26);

  &[data-active='true'] {
    color: ${({ theme }) => theme.colors.blue.dark};
    background: ${({ theme }) => theme.colors.yellow.gold};
    border-color: ${({ theme }) => theme.colors.yellow.gold};
  }
`

const ActionRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const ActionButton = styled.button`
  min-height: 1.75rem;
  padding: 0.375rem 0.625rem;
  color: ${({ theme }) => theme.colors.blue.dark};
  background: ${({ theme }) => theme.colors.yellow.light};
  border-radius: 0.375rem;
  font-size: inherit;
  line-height: 1;

  &:focus-visible {
    outline: 0.125rem solid ${({ theme }) => theme.colors.yellow.gold};
    outline-offset: 0.125rem;
  }
`

const SecondaryButton = styled(ActionButton)`
  color: ${({ theme }) => theme.colors.yellow.light};
  background: rgba(252, 250, 229, 0.14);
`

const useDebugEnabled = (search) => {
  const [manualPreference, setManualPreference] = useState(null)
  const queryPreference = getDebugQueryPreference(search)
  const enabled =
    queryPreference ??
    manualPreference ??
    getDebugHudEnabled({
      search,
    })

  useEffect(() => {
    if (queryPreference !== null) {
      writeStoredDebugPreference(queryPreference)
    }
  }, [queryPreference])

  return [enabled, setManualPreference]
}

const useViewportDebugSnapshot = (enabled) => {
  const [snapshot, setSnapshot] = useState(() => getViewportDebugSnapshot())

  useEffect(() => {
    if (!enabled) return undefined

    const updateSnapshot = () => {
      setSnapshot(getViewportDebugSnapshot())
    }

    updateSnapshot()
    window.addEventListener('resize', updateSnapshot)
    const unsubscribeMediaQueries = subscribeToDebugMediaQueries(
      window,
      updateSnapshot,
    )

    return () => {
      window.removeEventListener('resize', updateSnapshot)
      unsubscribeMediaQueries()
    }
  }, [enabled])

  return snapshot
}

const DebugHud = () => {
  const location = useLocation()
  const [enabled, setEnabled] = useDebugEnabled(location.search)
  const snapshot = useViewportDebugSnapshot(enabled)
  const [overflowResult, setOverflowResult] = useState({
    count: null,
    pathname: location.pathname,
  })
  const routeFamily = getRoutePathForPath(location.pathname)
  const overflowCount =
    overflowResult.pathname === location.pathname ? overflowResult.count : null

  useEffect(() => {
    if (!enabled) {
      document.documentElement.removeAttribute('data-hkw-debug-tools')
      clearOverflowHighlights()
      return undefined
    }

    document.documentElement.setAttribute('data-hkw-debug-tools', 'true')

    return () => {
      document.documentElement.removeAttribute('data-hkw-debug-tools')
      clearOverflowHighlights()
    }
  }, [enabled])

  useEffect(() => {
    if (!enabled) return

    clearOverflowHighlights()
  }, [enabled, location.pathname])

  const scanOverflow = () => {
    const results = scanPageOverflow()
    setOverflowResult({
      count: results.length,
      pathname: location.pathname,
    })
  }

  const clearOverflow = () => {
    clearOverflowHighlights()
    setOverflowResult({
      count: null,
      pathname: location.pathname,
    })
  }

  const disableDebug = () => {
    writeStoredDebugPreference(false)
    setEnabled(false)
  }

  if (!enabled) return null

  return (
    <Panel
      aria-label='Debug HUD'
      data-hkw-debug-root='true'
      data-testid='debug-hud'
    >
      <HeaderRow>
        <Title>Debug</Title>
        <SecondaryButton type='button' onClick={disableDebug}>
          Off
        </SecondaryButton>
      </HeaderRow>

      <MetricGrid>
        <Metric>
          <MetricValue>
            {snapshot.width} x {snapshot.height}
          </MetricValue>
        </Metric>
        <Metric>ratio {snapshot.ratio.toFixed(3)}</Metric>
        <Metric>dpr {snapshot.devicePixelRatio}</Metric>
        <Metric>pointer {snapshot.pointer}</Metric>
        <Metric>hover {snapshot.hover}</Metric>
        <Metric>route {location.pathname}</Metric>
        <Metric>family {routeFamily}</Metric>
      </MetricGrid>

      <MediaList aria-label='Active media queries'>
        {snapshot.media.map(({ id, label, matches }) => (
          <MediaPill data-active={matches ? 'true' : 'false'} key={id}>
            {label}
          </MediaPill>
        ))}
      </MediaList>

      <ActionRow>
        <ActionButton type='button' onClick={scanOverflow}>
          Scan overflow
        </ActionButton>
        <SecondaryButton type='button' onClick={clearOverflow}>
          Clear
        </SecondaryButton>
        <Metric>
          overflow {overflowCount === null ? '-' : overflowCount}
        </Metric>
      </ActionRow>
    </Panel>
  )
}

export default DebugHud
