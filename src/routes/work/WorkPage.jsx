import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useBlocker, useLocation, useNavigate, useParams } from 'react-router'
import gsap from 'gsap'
import Draggable from 'gsap/Draggable'
import usePageActive from '@/shared/hooks/usePageActive'
import { usePageSceneTransition } from '@/app/landscape/pageSceneTransition'
import DirtLayer from '@/app/landscape/layers/DirtLayer'
import {
  ROOTS_DROP_DURATION_MS,
  ROOTS_ENTRY_STATE_KEY,
  WORK_ROOTS_ENTRY_STATE_KEY,
} from '@/routes/roots/rootsEntry'
import caseStudies from './caseStudies'
import { resolveNavButtonLayout } from './navButtonLayout'
import WorkMarmot from './WorkMarmot'
import WorkDirtForegroundArtwork from './WorkDirtForegroundArtwork'
import {
  AnimatedHeroImage,
  AnimatedStudyText,
  Attribution,
  ClientType,
  ClientName,
  DesktopArrowButton,
  DesktopNavRail,
  DesktopNavStrip,
  DesktopNavViewport,
  FallbackDot,
  HeroStage,
  MainContent,
  MarmotWrapper,
  MobileNavRail,
  MobileNavStrip,
  NavButton,
  NavIconLayer,
  NavVisual,
  Page,
  Quote,
  QuoteAndAttribution,
  ServiceTag,
  Services,
  StudyArea,
  StudyTextStage,
} from './WorkPage.styles'

gsap.registerPlugin(Draggable)

const DESKTOP_NAV_VISIBLE_COUNT = 8
const DESKTOP_NAV_COPY_COUNT = 3
const DESKTOP_NAV_BASE_COPY_INDEX = 1
const DESKTOP_NAV_GAP = 24
const DESKTOP_NAV_DRAG_THRESHOLD = 10
const WORK_DIRT_FOREGROUND_TRANSITION_MS = 1500
const STUDY_FADE_DURATION_MS = 420
const WORK_ROUTE_PATH = '/work'
const DESKTOP_NAV_BASE_VISUAL_INDEX =
  DESKTOP_NAV_BASE_COPY_INDEX * caseStudies.length

const preloadRootsPage = () => import('../roots/RootsPage.jsx')

const isWorkPath = (pathname) =>
  pathname === WORK_ROUTE_PATH || pathname.startsWith(`${WORK_ROUTE_PATH}/`)

const getCaseStudySlug = (caseStudy) => caseStudy.slug ?? caseStudy.id

const getCaseStudyPath = (caseStudy) =>
  `${WORK_ROUTE_PATH}/${getCaseStudySlug(caseStudy)}`

const getCaseStudyIndexForSlug = (slug) => {
  if (!slug) return 0

  return caseStudies.findIndex(
    (caseStudy) => getCaseStudySlug(caseStudy) === slug,
  )
}

const useWorkPageExitTransition = () => {
  const [isExiting, setIsExiting] = useState(false)
  const nextPathRef = useRef(null)
  const exitFrameRef = useRef(0)
  const exitTimeoutRef = useRef(0)
  const { transitionSceneToPath } = usePageSceneTransition()
  const leaveWorkBlocker = useBlocker(({ currentLocation, nextLocation }) => {
    const isWorkMarmotRootsDive =
      nextLocation.pathname === '/roots' &&
      nextLocation.state?.[WORK_ROOTS_ENTRY_STATE_KEY] === true
    const isLeavingWork =
      isWorkPath(currentLocation.pathname) &&
      !isWorkPath(nextLocation.pathname) &&
      !isWorkMarmotRootsDive

    nextPathRef.current = isLeavingWork ? nextLocation.pathname : null

    return isLeavingWork
  })

  useEffect(() => {
    if (leaveWorkBlocker.state !== 'blocked' || exitTimeoutRef.current) {
      return undefined
    }

    const nextPath = nextPathRef.current

    if (!nextPath) {
      leaveWorkBlocker.proceed()
      return undefined
    }

    const shouldReduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const didStartSceneTransition = transitionSceneToPath(nextPath)

    if (!didStartSceneTransition || shouldReduceMotion) {
      nextPathRef.current = null
      leaveWorkBlocker.proceed()
      return undefined
    }

    exitFrameRef.current = window.requestAnimationFrame(() => {
      exitFrameRef.current = 0
      setIsExiting(true)
    })

    exitTimeoutRef.current = window.setTimeout(() => {
      exitTimeoutRef.current = 0
      nextPathRef.current = null
      leaveWorkBlocker.proceed()
    }, WORK_DIRT_FOREGROUND_TRANSITION_MS)

    return undefined
  }, [leaveWorkBlocker, transitionSceneToPath])

  useEffect(
    () => () => {
      if (exitFrameRef.current) {
        window.cancelAnimationFrame(exitFrameRef.current)
      }

      if (exitTimeoutRef.current) {
        window.clearTimeout(exitTimeoutRef.current)
      }
    },
    [],
  )

  return isExiting
}

const normalizeIndex = (index, itemCount) =>
  ((index % itemCount) + itemCount) % itemCount

const getDesktopNavWindowStart = (index, itemCount) => {
  const visibleCount = Math.min(DESKTOP_NAV_VISIBLE_COUNT, itemCount)

  if (itemCount <= visibleCount) return 0

  return Math.max(0, Math.min(index - 3, itemCount - visibleCount))
}

const getDesktopNavViewportWidth = (widths) => {
  const visibleCount = Math.min(DESKTOP_NAV_VISIBLE_COUNT, widths.length)
  const lastStart = Math.max(0, widths.length - visibleCount)
  let maxWindowWidth = 0

  for (let start = 0; start <= lastStart; start += 1) {
    const windowWidths = widths.slice(start, start + visibleCount)
    const windowWidth =
      windowWidths.reduce((sum, width) => sum + width, 0) +
      Math.max(0, windowWidths.length - 1) * DESKTOP_NAV_GAP

    maxWindowWidth = Math.max(maxWindowWidth, windowWidth)
  }

  return maxWindowWidth
}

const getDesktopNavTrackOffset = (widths, startIndex) =>
  widths.slice(0, startIndex).reduce((sum, width) => sum + width, 0) +
  startIndex * DESKTOP_NAV_GAP

const getDesktopNavSnapPoints = (widths, itemCount) => {
  const visibleCount = Math.min(DESKTOP_NAV_VISIBLE_COUNT, itemCount)
  const maxStart = Math.max(0, itemCount - visibleCount)

  return Array.from({ length: maxStart + 1 }, (_, start) => ({
    start,
    offset: getDesktopNavTrackOffset(widths, start),
  }))
}

const getClosestDesktopNavSnapPoint = (offset, snapPoints) =>
  snapPoints.reduce(
    (closestPoint, point) => {
      if (
        Math.abs(point.offset - offset) < Math.abs(closestPoint.offset - offset)
      ) {
        return point
      }

      return closestPoint
    },
    snapPoints[0] ?? { start: 0, offset: 0 },
  )

const getDesktopNavVisualCycleStart = (visualIndex, itemCount) =>
  visualIndex - normalizeIndex(visualIndex, itemCount)

const getFiniteDesktopNavWindowStart = (visualIndex, itemCount) =>
  getDesktopNavVisualCycleStart(visualIndex, itemCount) +
  getDesktopNavWindowStart(normalizeIndex(visualIndex, itemCount), itemCount)

const clampDesktopNavWindowStart = (start, totalCount, itemCount) => {
  const visibleCount = Math.min(DESKTOP_NAV_VISIBLE_COUNT, itemCount)
  const maxStart = Math.max(0, totalCount - visibleCount)

  return Math.max(0, Math.min(start, maxStart))
}

const getWindowStartKeepingVisualIndexVisible = (
  visualIndex,
  windowStart,
  itemCount,
) => {
  const visibleCount = Math.min(DESKTOP_NAV_VISIBLE_COUNT, itemCount)

  if (visualIndex < windowStart) return visualIndex

  if (visualIndex >= windowStart + visibleCount) {
    return visualIndex - visibleCount + 1
  }

  return windowStart
}

const getDesktopNavWindowStartForVisualChange = ({
  currentVisualIndex,
  nextVisualIndex,
  currentWindowStart,
  itemCount,
}) => {
  const currentFiniteStart = getFiniteDesktopNavWindowStart(
    currentVisualIndex,
    itemCount,
  )
  const nextFiniteStart = getFiniteDesktopNavWindowStart(
    nextVisualIndex,
    itemCount,
  )
  const isAdjacent = Math.abs(nextVisualIndex - currentVisualIndex) === 1
  const isContinuingLoopWindow = currentWindowStart !== currentFiniteStart
  const currentItemIndex = normalizeIndex(currentVisualIndex, itemCount)
  const nextItemIndex = normalizeIndex(nextVisualIndex, itemCount)
  const isForwardWrap =
    nextVisualIndex > currentVisualIndex &&
    currentItemIndex === itemCount - 1 &&
    nextItemIndex === 0
  const isBackwardWrap =
    nextVisualIndex < currentVisualIndex &&
    currentItemIndex === 0 &&
    nextItemIndex === itemCount - 1

  if (
    isAdjacent &&
    (isContinuingLoopWindow || isForwardWrap || isBackwardWrap)
  ) {
    return getWindowStartKeepingVisualIndexVisible(
      nextVisualIndex,
      currentWindowStart,
      itemCount,
    )
  }

  return nextFiniteStart
}

const getNearestDesktopNavVisualIndex = (
  itemIndex,
  currentVisualIndex,
  itemCount,
) => {
  const nearestCycle = Math.round((currentVisualIndex - itemIndex) / itemCount)
  const candidates = [nearestCycle - 1, nearestCycle, nearestCycle + 1].map(
    (cycle) => cycle * itemCount + itemIndex,
  )

  return candidates.reduce((nearestVisualIndex, candidate) => {
    if (
      Math.abs(candidate - currentVisualIndex) <
      Math.abs(nearestVisualIndex - currentVisualIndex)
    ) {
      return candidate
    }

    return nearestVisualIndex
  }, candidates[0])
}

const getNormalizedDesktopNavPosition = ({
  visualIndex,
  windowStart,
  itemCount,
  totalCount,
}) => {
  const baseStart = DESKTOP_NAV_BASE_VISUAL_INDEX
  const baseEnd = baseStart + itemCount - 1

  if (visualIndex >= baseStart && visualIndex <= baseEnd) {
    return { visualIndex, windowStart }
  }

  const normalizedVisualIndex =
    baseStart + normalizeIndex(visualIndex, itemCount)
  const copyOffset = normalizedVisualIndex - visualIndex

  return {
    visualIndex: normalizedVisualIndex,
    windowStart: clampDesktopNavWindowStart(
      windowStart + copyOffset,
      totalCount,
      itemCount,
    ),
  }
}

const getDesktopNavItems = () =>
  Array.from({ length: DESKTOP_NAV_COPY_COUNT }, (_, copyIndex) =>
    caseStudies.map((caseStudy, itemIndex) => ({
      caseStudy,
      itemIndex,
      visualIndex: copyIndex * caseStudies.length + itemIndex,
      isDuplicate: copyIndex !== DESKTOP_NAV_BASE_COPY_INDEX,
    })),
  ).flat()

const getDesktopNavWidths = (widths) =>
  Array.from({ length: DESKTOP_NAV_COPY_COUNT }, () => widths).flat()

const renderNavButton = ({
  caseStudy,
  itemIndex,
  visualIndex,
  isCurrent,
  isAccessibleCurrent,
  isDuplicate = false,
  handleSelect,
  compact = false,
  keyPrefix,
}) => {
  const hasIcon = Boolean(caseStudy.navIcon)
  const navButtonLayout = resolveNavButtonLayout(caseStudy.navButton, compact)

  return (
    <NavButton
      key={`${keyPrefix}-${caseStudy.id}`}
      type='button'
      aria-label={isDuplicate ? undefined : `Show ${caseStudy.name}`}
      aria-current={isAccessibleCurrent ? 'true' : undefined}
      aria-hidden={isDuplicate ? 'true' : undefined}
      tabIndex={isDuplicate ? -1 : undefined}
      data-nav-kind={hasIcon ? 'icon' : 'dot'}
      data-work-example={caseStudy.id}
      data-work-example-region={compact ? 'mobile-nav' : 'desktop-nav'}
      $compact={compact}
      $layout={navButtonLayout}
      onClick={() => handleSelect(itemIndex, visualIndex)}
    >
      <NavVisual>
        {hasIcon ? (
          <NavIconLayer
            src={caseStudy.navIcon}
            alt=''
            aria-hidden='true'
            $current={isCurrent}
          />
        ) : (
          <FallbackDot $compact={compact} $current={isCurrent} />
        )}
      </NavVisual>
    </NavButton>
  )
}

const renderStudyPane = (study, state) => {
  const attributionLabel = study.attribution.replace(/^[—-]\s*/, '')
  const hasCompactCopy = Boolean(study.isCompact)
  const hasDenseServices = study.services.length > 4

  return (
    <AnimatedStudyText
      className={state}
      key={study.id}
      $state={state}
      aria-hidden={state === 'leaving' ? 'true' : undefined}
      data-study-pane={state}
      data-work-example={study.id}
      data-work-example-region='copy'
      data-testid={state === 'active' ? 'work-study-active' : undefined}
      $compactCopy={hasCompactCopy}
    >
      <div>
        {study.type && <ClientType>{study.type}</ClientType>}
        <ClientName $compactCopy={hasCompactCopy}>{study.name}</ClientName>
      </div>
      <QuoteAndAttribution>
        <Quote
          $compactCopy={hasCompactCopy}
          $letterSpacing={study.letterSpacing}
        >
          {study.quote}
        </Quote>
        <Attribution $compactCopy={hasCompactCopy}>
          &mdash;{attributionLabel}
        </Attribution>
      </QuoteAndAttribution>
      <Services $compactCopy={hasCompactCopy}>
        {study.services.map((service) => (
          <ServiceTag
            key={`${study.id}-${state}-${service}`}
            $compactCopy={hasCompactCopy}
            $denseServices={hasDenseServices}
          >
            {service}
          </ServiceTag>
        ))}
      </Services>
    </AnimatedStudyText>
  )
}

const renderHeroPane = (study, state) => {
  if (!study.image) return null

  return (
    <AnimatedHeroImage
      key={study.id}
      $state={state}
      aria-hidden={state === 'leaving' ? 'true' : undefined}
      data-study-pane={state}
      data-work-example={study.id}
      data-work-example-region='hero'
      $layout={study.heroImage}
    >
      <img src={study.image} alt={study.name} />
    </AnimatedHeroImage>
  )
}

const WorkPage = () => {
  const isActive = usePageActive()
  const isExiting = useWorkPageExitTransition()
  const navigate = useNavigate()
  const location = useLocation()
  const { caseStudySlug } = useParams()
  const { transitionSceneToPath } = usePageSceneTransition()
  const routeStudyIndex = getCaseStudyIndexForSlug(caseStudySlug)
  const initialStudyIndex = routeStudyIndex >= 0 ? routeStudyIndex : 0
  const initialDesktopNavVisualIndex =
    DESKTOP_NAV_BASE_VISUAL_INDEX + initialStudyIndex
  const [index, setIndex] = useState(initialStudyIndex)
  const [displayIndex, setDisplayIndex] = useState(initialStudyIndex)
  const [studyPhase, setStudyPhase] = useState('active')
  const [desktopNavVisualIndex, setDesktopNavVisualIndex] = useState(
    initialDesktopNavVisualIndex,
  )
  const [desktopNavWindowStart, setDesktopNavWindowStart] = useState(
    getFiniteDesktopNavWindowStart(
      initialDesktopNavVisualIndex,
      caseStudies.length,
    ),
  )
  const [isDesktopNavDragging, setIsDesktopNavDragging] = useState(false)
  const [isForegroundEntryComplete, setIsForegroundEntryComplete] =
    useState(false)
  const [shouldBlockNavClick, setShouldBlockNavClick] = useState(false)
  const [isRootsMarmotHoverActive, setIsRootsMarmotHoverActive] =
    useState(false)
  const [isRootsTransitionActive, setIsRootsTransitionActive] = useState(false)
  const desktopNavTrackRef = useRef(null)
  const desktopNavDraggableRef = useRef(null)
  const hasPositionedDesktopNavRef = useRef(false)
  const shouldSnapDesktopNavRef = useRef(false)
  const releaseNavClickBlockTimerRef = useRef(null)
  const rootsTransitionTimeoutRef = useRef(null)
  const study = caseStudies[displayIndex]
  const desktopNavItems = useMemo(() => getDesktopNavItems(), [])
  const desktopNavWidths = useMemo(
    () =>
      caseStudies.map(
        (caseStudy) => resolveNavButtonLayout(caseStudy.navButton).width,
      ),
    [],
  )
  const desktopNavLoopWidths = useMemo(
    () => getDesktopNavWidths(desktopNavWidths),
    [desktopNavWidths],
  )
  const desktopNavViewportWidth = useMemo(
    () => getDesktopNavViewportWidth(desktopNavLoopWidths),
    [desktopNavLoopWidths],
  )
  const desktopNavSnapPoints = useMemo(
    () => getDesktopNavSnapPoints(desktopNavLoopWidths, desktopNavItems.length),
    [desktopNavItems.length, desktopNavLoopWidths],
  )
  const desktopNavTrackOffset =
    desktopNavSnapPoints.find((point) => point.start === desktopNavWindowStart)
      ?.offset ?? 0
  const maxDesktopNavTrackOffset =
    desktopNavSnapPoints[desktopNavSnapPoints.length - 1]?.offset ?? 0
  const isWorkChromeVisible = isForegroundEntryComplete && !isExiting

  useEffect(() => {
    if (!caseStudySlug || routeStudyIndex >= 0) return

    navigate(WORK_ROUTE_PATH, { replace: true })
  }, [caseStudySlug, navigate, routeStudyIndex])

  useEffect(() => {
    if (routeStudyIndex < 0 || routeStudyIndex === index) return undefined

    const nextVisualIndex = getNearestDesktopNavVisualIndex(
      routeStudyIndex,
      desktopNavVisualIndex,
      caseStudies.length,
    )

    let isActive = true

    queueMicrotask(() => {
      if (!isActive) return

      setDesktopNavWindowStart(
        clampDesktopNavWindowStart(
          getDesktopNavWindowStartForVisualChange({
            currentVisualIndex: desktopNavVisualIndex,
            nextVisualIndex,
            currentWindowStart: desktopNavWindowStart,
            itemCount: caseStudies.length,
          }),
          desktopNavItems.length,
          caseStudies.length,
        ),
      )
      setDesktopNavVisualIndex(nextVisualIndex)
      setStudyPhase('leaving')
      setIndex(routeStudyIndex)
    })

    return () => {
      isActive = false
    }
  }, [
    desktopNavItems.length,
    desktopNavVisualIndex,
    desktopNavWindowStart,
    index,
    routeStudyIndex,
  ])

  useEffect(() => {
    if (!isActive) return undefined

    const timer = window.setTimeout(() => {
      setIsForegroundEntryComplete(true)
    }, WORK_DIRT_FOREGROUND_TRANSITION_MS)

    return () => {
      window.clearTimeout(timer)
    }
  }, [isActive])

  useEffect(() => {
    if (studyPhase === 'leaving') {
      const timer = window.setTimeout(() => {
        setDisplayIndex(index)
        setStudyPhase('entering')
      }, STUDY_FADE_DURATION_MS)

      return () => {
        window.clearTimeout(timer)
      }
    }

    if (studyPhase === 'entering') {
      const timer = window.setTimeout(() => {
        setStudyPhase('active')
      }, STUDY_FADE_DURATION_MS)

      return () => {
        window.clearTimeout(timer)
      }
    }

    return undefined
  }, [index, studyPhase])

  useEffect(() => {
    if (releaseNavClickBlockTimerRef.current) {
      window.clearTimeout(releaseNavClickBlockTimerRef.current)
      releaseNavClickBlockTimerRef.current = null
    }

    return () => {
      if (releaseNavClickBlockTimerRef.current) {
        window.clearTimeout(releaseNavClickBlockTimerRef.current)
      }
    }
  }, [])

  useEffect(
    () => () => {
      if (
        rootsTransitionTimeoutRef.current !== null &&
        typeof window !== 'undefined'
      ) {
        window.clearTimeout(rootsTransitionTimeoutRef.current)
      }
    },
    [],
  )

  useLayoutEffect(() => {
    const trackElement = desktopNavTrackRef.current

    if (!trackElement) return undefined

    const trackX = -desktopNavTrackOffset

    if (
      !hasPositionedDesktopNavRef.current ||
      shouldSnapDesktopNavRef.current
    ) {
      gsap.set(trackElement, { x: trackX })
      hasPositionedDesktopNavRef.current = true
      shouldSnapDesktopNavRef.current = false

      return undefined
    }

    const tween = gsap.to(trackElement, {
      x: trackX,
      duration: isDesktopNavDragging ? 0 : 0.42,
      ease: 'power3.out',
      overwrite: true,
      onComplete() {
        if (isDesktopNavDragging) return

        const normalizedPosition = getNormalizedDesktopNavPosition({
          visualIndex: desktopNavVisualIndex,
          windowStart: desktopNavWindowStart,
          itemCount: caseStudies.length,
          totalCount: desktopNavItems.length,
        })

        if (
          normalizedPosition.visualIndex === desktopNavVisualIndex &&
          normalizedPosition.windowStart === desktopNavWindowStart
        ) {
          return
        }

        shouldSnapDesktopNavRef.current = true
        setDesktopNavVisualIndex(normalizedPosition.visualIndex)
        setDesktopNavWindowStart(normalizedPosition.windowStart)
      },
    })

    return () => {
      tween.kill()
    }
  }, [
    desktopNavItems.length,
    desktopNavTrackOffset,
    desktopNavVisualIndex,
    desktopNavWindowStart,
    isDesktopNavDragging,
  ])

  useEffect(() => {
    const trackElement = desktopNavTrackRef.current

    if (!trackElement) return undefined

    if (desktopNavDraggableRef.current) {
      desktopNavDraggableRef.current.kill()
      desktopNavDraggableRef.current = null
    }

    if (desktopNavSnapPoints.length <= 1) {
      gsap.set(trackElement, { x: 0 })
      return undefined
    }

    const draggable = Draggable.create(trackElement, {
      type: 'x',
      bounds: {
        minX: -maxDesktopNavTrackOffset,
        maxX: 0,
      },
      minimumMovement: DESKTOP_NAV_DRAG_THRESHOLD,
      dragClickables: true,
      allowContextMenu: true,
      activeCursor: 'grabbing',
      cursor: 'grab',
      onPress() {
        gsap.killTweensOf(trackElement)
      },
      onDragStart() {
        setShouldBlockNavClick(true)
        setIsDesktopNavDragging(true)
      },
      onDragEnd() {
        const currentX = draggable?.x ?? 0
        const nearestSnapPoint = getClosestDesktopNavSnapPoint(
          -currentX,
          desktopNavSnapPoints,
        )

        setIsDesktopNavDragging(false)
        setDesktopNavWindowStart(nearestSnapPoint.start)

        if (releaseNavClickBlockTimerRef.current) {
          window.clearTimeout(releaseNavClickBlockTimerRef.current)
        }

        releaseNavClickBlockTimerRef.current = window.setTimeout(() => {
          setShouldBlockNavClick(false)
          releaseNavClickBlockTimerRef.current = null
        }, 0)
      },
      onRelease() {
        setIsDesktopNavDragging(false)
      },
    })[0]

    desktopNavDraggableRef.current = draggable

    return () => {
      draggable.kill()
      desktopNavDraggableRef.current = null
    }
  }, [desktopNavSnapPoints, maxDesktopNavTrackOffset])

  const goToVisualIndex = (nextVisualIndex) => {
    const normalizedIndex = normalizeIndex(nextVisualIndex, caseStudies.length)

    if (
      normalizedIndex === index &&
      nextVisualIndex === desktopNavVisualIndex
    ) {
      return
    }

    setDesktopNavWindowStart(
      clampDesktopNavWindowStart(
        getDesktopNavWindowStartForVisualChange({
          currentVisualIndex: desktopNavVisualIndex,
          nextVisualIndex,
          currentWindowStart: desktopNavWindowStart,
          itemCount: caseStudies.length,
        }),
        desktopNavItems.length,
        caseStudies.length,
      ),
    )
    setDesktopNavVisualIndex(nextVisualIndex)

    if (normalizedIndex !== index) {
      setStudyPhase('leaving')
      setIndex(normalizedIndex)
    }

    const nextPath = getCaseStudyPath(caseStudies[normalizedIndex])

    if (location.pathname !== nextPath) {
      navigate(nextPath)
    }
  }

  const goTo = (nextIndex) => {
    const normalizedIndex = normalizeIndex(nextIndex, caseStudies.length)

    goToVisualIndex(
      getNearestDesktopNavVisualIndex(
        normalizedIndex,
        desktopNavVisualIndex,
        caseStudies.length,
      ),
    )
  }

  const next = () => goToVisualIndex(desktopNavVisualIndex + 1)
  const prev = () => goToVisualIndex(desktopNavVisualIndex - 1)
  const handleNavButtonSelect = (nextIndex, visualIndex) => {
    if (shouldBlockNavClick) return

    if (visualIndex === undefined) {
      goTo(nextIndex)
      return
    }

    goToVisualIndex(visualIndex)
  }

  const navigateToRoots = () => {
    navigate('/roots', {
      state: {
        [ROOTS_ENTRY_STATE_KEY]: true,
        [WORK_ROOTS_ENTRY_STATE_KEY]: true,
      },
    })
  }

  const handleRootsMarmotEnter = () => {
    if (!isWorkChromeVisible || isRootsTransitionActive) return

    preloadRootsPage()
    setIsRootsMarmotHoverActive(true)
  }

  const handleRootsMarmotLeave = () => {
    if (isRootsTransitionActive) return

    setIsRootsMarmotHoverActive(false)
  }

  const handleRootsMarmotClick = () => {
    if (!isWorkChromeVisible || isRootsTransitionActive) return

    preloadRootsPage()

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      navigateToRoots()
      return
    }

    setIsRootsMarmotHoverActive(false)
    setIsRootsTransitionActive(true)
    transitionSceneToPath('/roots')

    if (typeof window === 'undefined') {
      navigateToRoots()
      return
    }

    rootsTransitionTimeoutRef.current = window.setTimeout(() => {
      rootsTransitionTimeoutRef.current = null
      navigateToRoots()
    }, ROOTS_DROP_DURATION_MS)
  }

  return (
    <Page $isActive={isActive}>
      <MarmotWrapper
        type='button'
        aria-label='Enter Non-profit Roots'
        disabled={!isWorkChromeVisible || isRootsTransitionActive}
        data-testid='work-marmot'
        $isVisible={isWorkChromeVisible}
        $isRootsHoverActive={
          isRootsMarmotHoverActive && !isRootsTransitionActive
        }
        $isRootsTransitioning={isRootsTransitionActive}
        data-work-marmot-trigger
        data-work-marmot-hover-active={
          isRootsMarmotHoverActive && !isRootsTransitionActive
            ? 'true'
            : 'false'
        }
        data-work-marmot-transition-active={
          isRootsTransitionActive ? 'true' : 'false'
        }
        onBlur={handleRootsMarmotLeave}
        onClick={handleRootsMarmotClick}
        onFocus={handleRootsMarmotEnter}
        onMouseEnter={handleRootsMarmotEnter}
        onMouseLeave={handleRootsMarmotLeave}
      >
        <WorkMarmot />
      </MarmotWrapper>

      <DesktopArrowButton
        direction='left'
        aria-label='Show previous work item'
        onClick={prev}
        $side='left'
        $isVisible={isWorkChromeVisible}
      />

      <DesktopArrowButton
        direction='right'
        aria-label='Show next work item'
        onClick={next}
        $side='right'
        $isVisible={isWorkChromeVisible}
      />

      <MainContent
        $isVisible={isWorkChromeVisible}
        $isWide={Boolean(study.isWide)}
      >
        <StudyArea>
          <StudyTextStage $layout={study}>
            {renderStudyPane(study, studyPhase)}
          </StudyTextStage>
          <HeroStage>{renderHeroPane(study, studyPhase)}</HeroStage>
        </StudyArea>
      </MainContent>

      <WorkDirtForegroundArtwork
        isActive={isActive}
        isEntryComplete={isForegroundEntryComplete}
        isLeaving={isExiting}
        transitionMs={WORK_DIRT_FOREGROUND_TRANSITION_MS}
      />

      <DesktopNavRail $isVisible={isWorkChromeVisible}>
        <DesktopNavViewport
          $dragging={isDesktopNavDragging}
          $viewportWidth={desktopNavViewportWidth}
        >
          <DesktopNavStrip
            ref={desktopNavTrackRef}
            data-testid='work-nav-desktop'
          >
            {desktopNavItems.map(
              ({ caseStudy, itemIndex, visualIndex, isDuplicate }) =>
                renderNavButton({
                  caseStudy,
                  itemIndex,
                  visualIndex,
                  isCurrent: visualIndex === desktopNavVisualIndex,
                  isAccessibleCurrent: !isDuplicate && itemIndex === index,
                  isDuplicate,
                  handleSelect: handleNavButtonSelect,
                  keyPrefix: `desktop-${visualIndex}`,
                }),
            )}
          </DesktopNavStrip>
        </DesktopNavViewport>
      </DesktopNavRail>
    </Page>
  )
}

export default WorkPage
