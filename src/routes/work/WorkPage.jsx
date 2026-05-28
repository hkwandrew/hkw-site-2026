import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useBlocker } from 'react-router'
import gsap from 'gsap'
import Draggable from 'gsap/Draggable'
import usePageActive from '@/shared/hooks/usePageActive'
import { usePageSceneTransition } from '@/app/landscape/pageSceneTransition'
import DirtLayer from '@/app/landscape/layers/DirtLayer'
import caseStudies from './caseStudies'
import { resolveNavButtonLayout } from './navButtonLayout'
import WorkMarmot from './WorkMarmot'
import {
  AnimatedHeroImage,
  AnimatedStudyText,
  Attribution,
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
  WorkDirtForeground,
} from './WorkPage.styles'
import styled from 'styled-components'

gsap.registerPlugin(Draggable)

const DESKTOP_NAV_VISIBLE_COUNT = 8
const DESKTOP_NAV_COPY_COUNT = 3
const DESKTOP_NAV_BASE_COPY_INDEX = 1
const DESKTOP_NAV_GAP = 24
const DESKTOP_NAV_DRAG_THRESHOLD = 10
const WORK_DIRT_FOREGROUND_TRANSITION_MS = 1500
const STUDY_FADE_DURATION_MS = 420
const DESKTOP_NAV_BASE_VISUAL_INDEX =
  DESKTOP_NAV_BASE_COPY_INDEX * caseStudies.length

const useWorkPageExitTransition = () => {
  const [isExiting, setIsExiting] = useState(false)
  const nextPathRef = useRef(null)
  const exitFrameRef = useRef(0)
  const exitTimeoutRef = useRef(0)
  const { transitionSceneToPath } = usePageSceneTransition()
  const leaveWorkBlocker = useBlocker(({ currentLocation, nextLocation }) => {
    const isLeavingWork =
      currentLocation.pathname === '/work' &&
      nextLocation.pathname !== currentLocation.pathname

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
      <ClientName $compactCopy={hasCompactCopy}>{study.name}</ClientName>
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

const WorkDirtLayer = styled.g``

const WorkPage = () => {
  const isActive = usePageActive()
  const isExiting = useWorkPageExitTransition()
  const [index, setIndex] = useState(0)
  const [displayIndex, setDisplayIndex] = useState(0)
  const [studyPhase, setStudyPhase] = useState('active')
  const [desktopNavVisualIndex, setDesktopNavVisualIndex] = useState(
    DESKTOP_NAV_BASE_VISUAL_INDEX,
  )
  const [desktopNavWindowStart, setDesktopNavWindowStart] = useState(
    DESKTOP_NAV_BASE_VISUAL_INDEX,
  )
  const [isDesktopNavDragging, setIsDesktopNavDragging] = useState(false)
  const [isForegroundEntryComplete, setIsForegroundEntryComplete] =
    useState(false)
  const [shouldBlockNavClick, setShouldBlockNavClick] = useState(false)
  const desktopNavTrackRef = useRef(null)
  const desktopNavDraggableRef = useRef(null)
  const hasPositionedDesktopNavRef = useRef(false)
  const shouldSnapDesktopNavRef = useRef(false)
  const releaseNavClickBlockTimerRef = useRef(null)
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

  return (
    <Page $isActive={isActive}>
      <MarmotWrapper>
        <WorkMarmot />
      </MarmotWrapper>

      <DesktopArrowButton
        direction='left'
        aria-label='Show previous work item'
        onClick={prev}
        $side='left'
      />

      <DesktopArrowButton
        direction='right'
        aria-label='Show next work item'
        onClick={next}
        $side='right'
      />

      <MainContent $isWide={Boolean(study.isWide)}>
        <StudyArea>
          <StudyTextStage $layout={study}>
            {renderStudyPane(study, studyPhase)}
          </StudyTextStage>

          {/* <MobileNavRail>
            <MobileNavStrip>
              {renderNavButtons(index, handleNavButtonSelect, true)}
            </MobileNavStrip>
          </MobileNavRail> */}

          <HeroStage>{renderHeroPane(study, studyPhase)}</HeroStage>
        </StudyArea>
      </MainContent>

      <WorkDirtForeground
        id='work-dirt-foreground'
        aria-hidden='true'
        focusable='false'
        viewBox='0 0 1440 1024'
        shapeRendering='geometricPrecision'
        textRendering='geometricPrecision'
        $isActive={isActive}
        $isEntryComplete={isForegroundEntryComplete}
        $isLeaving={isExiting}
        $transitionMs={WORK_DIRT_FOREGROUND_TRANSITION_MS}
      >
        <g transform='translate(-1181.222193 -8.108808)'>
          <path
            transform='translate(0,880)'
            d='M3586.7 1.22741C3621.56 -0.191918 3656.81 -0.747455 3691.59 1.59753C3724.64 3.88081 3757.22 8.69395 3790.2 11.0389C3816.58 12.8902 3822.32 11.884 3868 9.74304V926.5H2860V926.912L880 929.689V926.5H0V45.7303C34.7009 47.3348 72.9348 22.0119 107.636 23.8632C140.169 25.5959 171.524 29.9894 203.483 34.4676L206.635 34.9091C237.253 39.167 267.479 41.8203 298.726 39.8456C332.72 37.6857 366.164 32.9339 399.845 29.2313C433.76 25.467 467.991 23.6774 502.063 21.1473C536.058 18.6172 570.052 16.0262 604.203 14.7303C639.061 13.311 674.312 12.7555 709.091 15.1005C742.143 17.3837 774.725 22.1969 807.698 24.5419C833.919 26.3819 845.362 16.225 884.784 30.246C908.951 32.2629 932.842 32.8626 957.489 31.1258C990.33 28.7809 1022.78 23.9677 1055.7 21.6844C1090.34 19.3395 1125.45 19.895 1160.17 21.3143C1194.18 22.6102 1228.04 25.2022 1261.89 27.7323C1295.83 30.2624 1329.92 32.052 1363.7 35.8163C1397.25 39.5189 1430.56 44.2707 1464.41 46.4305C1495.53 48.4053 1525.64 45.752 1556.13 41.494C1589.05 36.8657 1621.27 32.2367 1654.74 30.4471C1689.3 28.5958 1723.86 26.8065 1758.42 25.202C1827.31 21.9314 1896.27 19.6483 1965.32 19.6483C2034.52 19.71 2103.72 22.425 2172.45 28.7811C2203.81 31.6815 2233.83 34.2122 2265.5 33.1014C2295.53 32.0523 2325.47 28.9045 2355.11 25.5721C2399.21 20.5736 2443.15 13.2303 2487.96 16.5008C2510.71 18.167 2533.15 21.6842 2555.75 24.3378C2577.41 26.8679 2599.38 28.5341 2621.2 30.1385C2699.1 36.0527 2782.23 40.7799 2859.61 29.744C2911.92 -2.08365 3056.84 8.58376 3090.13 10.3602C3122.67 12.0929 3154.02 16.4864 3185.98 20.9647L3189.13 21.4061C3219.75 25.6641 3249.98 28.3183 3281.23 26.3436C3315.22 24.1838 3348.66 19.432 3382.34 15.7294C3416.26 11.9651 3450.49 10.1755 3484.56 7.64538C3518.56 5.11526 3552.55 2.52333 3586.7 1.22741Z'
            fill='#FB9D38'
          ></path>
          <WorkDirtLayer
            id='work-dirt-foreground__container'
            className='work-dirt-layer'
            data-dirt-layer='work'
            transform='translate(0, 960) scale(1, 1)'
          >
            <path
              d='M2552.84 11.8384C2585.43 5.85082 2617.9 -2.94562 2651 0.972147C2667.81 2.96801 2684.39 7.1813 2701.08 10.3598C2717.09 13.3905 2733.32 15.3862 2749.44 17.3081C2806.68 24.3535 2867.74 27.7525 2924.64 14.7798L2924.64 14.7436C2924.92 14.6875 2925.21 14.6362 2925.49 14.5854C2925.62 14.5563 2925.75 14.5288 2925.87 14.4995V14.5161C2950.72 10.2238 2956.71 26.6744 2971.76 24.518C2990.89 21.742 3009.78 16.0433 3028.95 13.3403C3049.12 10.5643 3069.57 11.2226 3089.78 12.9028C3109.59 14.4369 3129.31 17.5043 3149.02 20.4995C3168.78 23.4947 3188.64 25.6136 3208.31 30.0698C3227.84 34.453 3247.24 40.0784 3266.96 42.6352C3285.08 44.9729 3302.61 41.8312 3320.37 36.7905C3339.54 31.3115 3358.3 25.8329 3377.78 23.7143C3397.91 21.5228 3418.04 19.4037 3438.16 17.5044C3478.28 13.6326 3518.44 10.9302 3558.64 10.9302C3598.94 11.0032 3639.24 14.2173 3679.26 21.7417C3697.52 25.1752 3715.01 28.1709 3733.45 26.8559C3750.93 25.614 3768.37 21.8877 3785.63 17.9428C3811.31 12.0256 3836.9 3.33278 3862.99 7.20457C3876.24 9.17702 3889.31 13.3407 3902.47 16.4819C3915.08 19.4771 3927.87 21.4497 3940.58 23.3491C3986.02 30.3622 4034.51 33.7223 4079.64 20.5727V1091.24L2924.05 1091.64V1091.52L1463 1094.84V1094.77H0V19.6118C19.0643 22.4208 37.84 23.3821 57.251 21.1645C81.5145 18.3556 105.489 12.59 129.811 9.85496C155.403 7.04601 181.342 7.71145 206.992 9.4116C232.122 10.9639 257.138 14.0684 282.152 17.0991C307.225 20.1298 332.413 22.2736 357.37 26.7827C382.154 31.2179 406.764 36.9094 431.778 39.4966C454.771 41.862 477.013 38.684 499.544 33.5835C523.865 28.0395 547.667 22.4947 572.393 20.3511C597.927 18.1335 623.462 15.9898 648.996 14.0678C699.892 10.1501 750.847 7.41551 801.858 7.41551C852.985 7.48944 904.112 10.7422 954.893 18.3559C978.059 21.8302 1000.24 24.8603 1023.64 23.5298C1045.82 22.2731 1067.95 18.5029 1089.85 14.5112C1122.43 8.52368 1154.9 -0.27275 1188 3.645C1204.81 5.64086 1221.39 9.85512 1238.08 13.0337C1254.09 16.0644 1270.32 18.06 1286.44 19.9819C1344.01 27.0674 1428.28 9.35941 1463.29 16.9809C1482.26 19.7564 1500.94 20.6969 1520.25 18.4907C1544.51 15.6817 1568.49 9.91618 1592.81 7.18113C1618.4 4.37218 1644.34 5.03763 1669.99 6.73777C1695.12 8.2901 1720.14 11.3945 1745.15 14.4253C1770.22 17.456 1795.41 19.5997 1820.37 24.1089C1845.15 28.5441 1869.76 34.2365 1894.78 36.8237C1917.77 39.1892 1940.01 36.0101 1962.54 30.9096C1986.87 25.3657 2010.67 19.8219 2035.39 17.6782C2060.93 15.4606 2086.46 13.3169 2112 11.395C2162.89 7.47723 2213.85 4.74168 2264.86 4.74168C2315.99 4.81562 2367.11 8.06835 2417.89 15.6821C2441.06 19.1563 2463.24 22.1874 2486.64 20.8569C2508.82 19.6003 2530.95 15.83 2552.84 11.8384Z'
              fill='#6F1B00'
            />
            <g transform='translate(1181, 0) scale(1, 1)'>
              <g opacity='0.3' style={{ mixBlendMode: 'multiply' }}>
                <path
                  d='M24.5547 61.4243C24.9082 61.1297 25.1439 60.6583 25.3207 60.069C25.7922 58.2423 24.9672 56.1209 24.26 54.5888C22.9047 51.5835 19.7226 46.6925 16.3048 47.6353C14.537 48.1657 14.0656 51.112 13.8888 52.8799C13.5942 55.4727 13.8888 58.2423 14.5959 60.7172C15.3031 62.9565 16.7763 63.8404 18.7798 63.9582C20.7244 64.135 23.6118 63.7225 24.6136 61.3654L24.5547 61.4243Z'
                  fill='#A7793D'
                />
              </g>
              <g opacity='0.3' style={{ mixBlendMode: 'multiply' }}>
                <path
                  d='M54.6069 99.7275C54.3123 99.315 53.9587 99.0204 53.4284 98.8436C51.8963 98.3133 50.1284 99.2561 48.7731 100.081C46.2392 101.672 42.1143 105.502 42.9393 109.451C43.3518 111.572 45.8267 112.161 47.3588 112.397C49.5392 112.692 51.8963 112.397 53.9587 111.572C55.9033 110.747 56.6105 108.979 56.7283 106.622C56.8462 104.324 56.4926 100.965 54.548 99.7275H54.6069Z'
                  fill='#A7793D'
                />
              </g>
              <g opacity='0.3' style={{ mixBlendMode: 'multiply' }}>
                <path
                  d='M80.0045 178.455C80.0045 178.455 79.5331 177.924 79.1795 177.806C78.0599 177.453 76.8224 178.101 75.8796 178.69C74.0528 179.81 71.1065 182.521 71.6957 185.349C71.9904 186.822 73.7582 187.235 74.8189 187.412C76.4099 187.647 78.0599 187.412 79.5331 186.822C80.8884 186.233 81.4188 184.996 81.5366 183.287C81.6545 181.637 81.3598 179.221 80.0045 178.396V178.455Z'
                  fill='#A7793D'
                />
              </g>
              <g opacity='0.3' style={{ mixBlendMode: 'multiply' }}>
                <path
                  d='M6.69922 144.1C6.69922 144.1 6.34565 143.688 6.10994 143.629C5.28496 143.334 4.28319 143.865 3.57606 144.336C2.16181 145.22 -0.0774362 147.282 0.335056 149.522C0.570765 150.7 1.9261 150.995 2.75108 151.113C3.98856 151.289 5.28496 151.113 6.40458 150.641C7.46527 150.17 7.87777 149.227 7.93669 147.931C7.99562 146.693 7.81884 144.807 6.75815 144.159L6.69922 144.1Z'
                  fill='#A7793D'
                />
              </g>
              <g opacity='0.3' style={{ mixBlendMode: 'multiply' }}>
                <path
                  d='M282.597 60.8379C282.302 60.4254 281.949 60.1308 281.477 59.954C279.945 59.4236 278.118 60.3665 276.822 61.2504C274.288 62.8414 270.163 66.6717 270.988 70.6198C271.46 72.6823 273.934 73.2716 275.408 73.5073C277.588 73.8609 279.945 73.5073 282.066 72.6823C284.011 71.8573 284.718 70.0895 284.836 67.7324C284.954 65.4342 284.6 62.0164 282.656 60.8379H282.597Z'
                  fill='#A7793D'
                />
              </g>
              <g opacity='0.3' style={{ mixBlendMode: 'multiply' }}>
                <path
                  d='M308.055 139.505C308.055 139.505 307.584 138.974 307.23 138.857C306.111 138.444 304.873 139.151 303.93 139.741C302.104 140.919 299.157 143.571 299.747 146.399C300.041 147.873 301.809 148.285 302.87 148.462C304.461 148.697 306.111 148.462 307.584 147.873C308.939 147.283 309.47 146.046 309.587 144.337C309.646 142.687 309.411 140.271 308.055 139.446V139.505Z'
                  fill='#A7793D'
                />
              </g>
              <g opacity='0.3' style={{ mixBlendMode: 'multiply' }}>
                <path
                  d='M234.748 105.151C234.748 105.151 234.395 104.738 234.1 104.679C233.275 104.384 232.273 104.915 231.566 105.386C230.152 106.27 227.913 108.392 228.325 110.572C228.561 111.75 229.916 112.045 230.741 112.163C231.92 112.34 233.275 112.163 234.395 111.691C235.456 111.22 235.868 110.277 235.927 108.981C235.986 107.684 235.809 105.858 234.689 105.209L234.748 105.151Z'
                  fill='#A7793D'
                />
              </g>
              <g opacity='0.3' style={{ mixBlendMode: 'multiply' }}>
                <path
                  d='M420.135 88.6524C420.488 88.3578 420.724 87.8864 420.901 87.2971C421.372 85.4704 420.547 83.349 419.84 81.7579C418.485 78.7526 415.244 73.8617 411.944 74.8634C410.176 75.3938 409.705 78.3401 409.469 80.108C409.174 82.7008 409.469 85.4704 410.176 87.9453C410.883 90.2435 412.356 91.0685 414.36 91.2452C416.304 91.3631 419.192 91.0095 420.135 88.6524Z'
                  fill='#A7793D'
                />
              </g>
              <g opacity='0.3' style={{ mixBlendMode: 'multiply' }}>
                <path
                  d='M353.606 118.646C353.606 118.646 354.018 118.116 354.136 117.703C354.49 116.407 353.9 114.933 353.37 113.814C352.368 111.692 350.129 108.157 347.713 108.864C346.476 109.218 346.122 111.339 345.945 112.576C345.768 114.403 345.945 116.407 346.476 118.174C346.947 119.766 348.067 120.414 349.481 120.473C350.895 120.591 352.899 120.296 353.606 118.646Z'
                  fill='#A7793D'
                />
              </g>
              <g opacity='0.3' style={{ mixBlendMode: 'multiply' }}>
                <path
                  d='M162.598 41.9632C162.598 41.9632 162.951 41.5508 163.01 41.2561C163.246 40.2543 162.833 39.0758 162.421 38.1919C161.655 36.5419 159.887 33.8313 158.06 34.3616C157.059 34.6562 156.823 36.2473 156.705 37.249C156.528 38.6633 156.705 40.1954 157.117 41.6097C157.471 42.8472 158.355 43.3186 159.416 43.4364C160.476 43.4954 162.067 43.3186 162.598 42.0222V41.9632Z'
                  fill='#A7793D'
                />
              </g>
              <g opacity='0.3' style={{ mixBlendMode: 'multiply' }}>
                <path
                  d='M433.628 116.051C433.628 116.051 433.216 115.58 432.862 115.462C431.802 115.109 430.623 115.757 429.739 116.287C428.03 117.348 425.261 119.882 425.791 122.592C426.086 124.007 427.736 124.36 428.737 124.537C430.211 124.773 431.802 124.537 433.157 123.948C434.453 123.417 434.925 122.239 435.043 120.589C435.102 119.057 434.866 116.759 433.569 115.993L433.628 116.051Z'
                  fill='#A7793D'
                />
              </g>
              <g opacity='0.3' style={{ mixBlendMode: 'multiply' }}>
                <path
                  d='M450.717 168.852C450.717 168.852 450.422 168.498 450.186 168.439C449.479 168.204 448.595 168.675 447.947 169.029C446.71 169.795 444.765 171.622 445.177 173.507C445.354 174.509 446.592 174.804 447.299 174.921C448.36 175.098 449.479 174.921 450.481 174.509C451.424 174.096 451.718 173.271 451.777 172.152C451.777 171.032 451.659 169.441 450.776 168.852H450.717Z'
                  fill='#A7793D'
                />
              </g>
              <g opacity='0.3' style={{ mixBlendMode: 'multiply' }}>
                <path
                  d='M401.513 145.81C401.513 145.81 401.277 145.516 401.1 145.457C400.511 145.221 399.863 145.575 399.333 145.928C398.39 146.517 396.858 147.932 397.152 149.405C397.329 150.171 398.272 150.407 398.802 150.466C399.627 150.583 400.511 150.466 401.277 150.171C401.984 149.876 402.279 149.228 402.279 148.344C402.338 147.46 402.22 146.223 401.454 145.81H401.513Z'
                  fill='#A7793D'
                />
              </g>
              <g opacity='0.3' style={{ mixBlendMode: 'multiply' }}>
                <path
                  d='M629.09 85.6443C629.443 85.3497 629.679 84.8782 629.856 84.289C630.327 82.4622 629.502 80.3408 628.795 78.8087C627.44 75.8034 624.258 70.9124 620.899 71.9142C619.131 72.4446 618.66 75.3909 618.424 77.0998C618.129 79.6926 618.424 82.4622 619.131 84.9372C619.838 87.2353 621.311 88.0603 623.315 88.2371C625.26 88.4139 628.147 88.0014 629.09 85.6443Z'
                  fill='#A7793D'
                />
              </g>
              <g opacity='0.3' style={{ mixBlendMode: 'multiply' }}>
                <path
                  d='M562.561 115.579C562.561 115.579 562.974 115.049 563.092 114.636C563.445 113.34 562.856 111.808 562.326 110.688C561.324 108.566 559.085 105.09 556.669 105.738C555.431 106.092 555.078 108.213 554.96 109.45C554.783 111.277 554.96 113.281 555.431 115.049C555.903 116.698 557.022 117.288 558.437 117.406C559.851 117.523 561.854 117.229 562.561 115.579Z'
                  fill='#A7793D'
                />
              </g>
              <g opacity='0.3' style={{ mixBlendMode: 'multiply' }}>
                <path
                  d='M591.555 28.9564C591.555 28.9564 591.908 28.5439 591.967 28.1904C592.203 27.1886 591.79 26.01 591.378 25.1851C590.612 23.5351 588.844 20.8244 587.017 21.3548C586.075 21.6494 585.78 23.2404 585.662 24.2422C585.485 25.6565 585.662 27.1886 586.075 28.5439C586.428 29.7814 587.253 30.2528 588.373 30.3707C589.433 30.4296 591.024 30.2528 591.555 28.9564Z'
                  fill='#A7793D'
                />
              </g>
              <g opacity='0.3' style={{ mixBlendMode: 'multiply' }}>
                <path
                  d='M752.661 126.602C752.955 126.307 753.25 125.894 753.368 125.246C753.839 123.42 753.014 121.298 752.307 119.766C750.952 116.761 747.77 111.87 744.352 112.813C742.584 113.343 742.113 116.289 741.877 118.057C741.582 120.65 741.877 123.42 742.584 125.894C743.291 128.134 744.765 129.018 746.768 129.194C748.713 129.371 751.6 128.959 752.602 126.602H752.661Z'
                  fill='#A7793D'
                />
              </g>
              <g opacity='0.3' style={{ mixBlendMode: 'multiply' }}>
                <path
                  d='M686.133 156.594C686.133 156.594 686.546 156.063 686.663 155.651C687.017 154.354 686.428 152.881 685.897 151.762C684.955 149.64 682.656 146.164 680.24 146.812C678.944 147.165 678.59 149.287 678.473 150.524C678.296 152.351 678.473 154.354 679.003 156.122C679.474 157.713 680.594 158.361 681.949 158.479C683.364 158.597 685.367 158.303 686.074 156.653L686.133 156.594Z'
                  fill='#A7793D'
                />
              </g>
              <g opacity='0.3' style={{ mixBlendMode: 'multiply' }}>
                <path
                  d='M715.125 69.9125C715.125 69.9125 715.479 69.5 715.538 69.2053C715.773 68.2036 715.361 67.025 714.948 66.1411C714.182 64.4911 712.414 61.7805 710.588 62.3108C709.645 62.6055 709.35 64.1965 709.232 65.1983C709.056 66.6125 709.232 68.1446 709.645 69.5C709.998 70.7374 710.823 71.2089 711.943 71.3267C713.004 71.4446 714.595 71.2089 715.125 69.9125Z'
                  fill='#A7793D'
                />
              </g>
              <g opacity='0.3' style={{ mixBlendMode: 'multiply' }}>
                <path
                  d='M843.173 59.834C842.878 59.4215 842.525 59.1268 842.053 58.9501C840.521 58.4197 838.753 59.3626 837.398 60.1875C834.864 61.7786 830.739 65.6089 831.564 69.557C831.977 71.6784 834.511 72.2677 835.984 72.4444C838.164 72.798 840.521 72.4444 842.584 71.6195C844.528 70.7945 845.235 69.0267 845.353 66.6696C845.471 64.3714 845.118 60.9536 843.173 59.834Z'
                  fill='#A7793D'
                />
              </g>
              <g opacity='0.3' style={{ mixBlendMode: 'multiply' }}>
                <path
                  d='M1031.53 59.834C1031.24 59.4215 1030.89 59.1268 1030.41 58.9501C1028.88 58.4197 1027.11 59.3626 1025.76 60.1875C1023.22 61.7786 1019.1 65.6089 1019.92 69.557C1020.34 71.6784 1022.87 72.2677 1024.34 72.4444C1026.52 72.798 1028.88 72.4444 1030.94 71.6195C1032.89 70.7945 1033.6 69.0267 1033.71 66.6696C1033.83 64.3714 1033.48 60.9536 1031.53 59.834Z'
                  fill='#A7793D'
                />
              </g>
              <g opacity='0.3' style={{ mixBlendMode: 'multiply' }}>
                <path
                  d='M868.573 138.501C868.573 138.501 868.101 138.029 867.748 137.853C866.687 137.44 865.391 138.147 864.448 138.737C862.621 139.915 859.675 142.567 860.264 145.395C860.618 146.869 862.327 147.281 863.446 147.458C865.037 147.694 866.687 147.458 868.16 146.869C869.516 146.279 870.046 145.042 870.105 143.333C870.164 141.683 869.928 139.267 868.573 138.442V138.501Z'
                  fill='#A7793D'
                />
              </g>
              <g opacity='0.3' style={{ mixBlendMode: 'multiply' }}>
                <path
                  d='M795.326 104.147C795.326 104.147 794.972 103.735 794.678 103.617C793.794 103.322 792.851 103.853 792.085 104.324C790.671 105.208 788.372 107.33 788.844 109.51C789.08 110.688 790.435 110.983 791.26 111.101C792.438 111.278 793.735 111.101 794.913 110.629C795.974 110.158 796.387 109.215 796.445 107.919C796.445 106.622 796.328 104.796 795.267 104.147H795.326Z'
                  fill='#A7793D'
                />
              </g>
              <g opacity='0.3' style={{ mixBlendMode: 'multiply' }}>
                <path
                  d='M980.711 87.6497C981.064 87.2961 981.3 86.8836 981.477 86.2943C981.948 84.4676 981.123 82.3462 980.416 80.8141C979.061 77.8088 975.879 72.9178 972.52 73.9196C970.752 74.4499 970.281 77.3374 970.045 79.1052C969.75 81.698 970.045 84.4676 970.752 86.9425C971.459 89.1818 972.933 90.0657 974.936 90.2425C976.881 90.3603 979.768 89.9478 980.711 87.6497Z'
                  fill='#A7793D'
                />
              </g>
              <g opacity='0.3' style={{ mixBlendMode: 'multiply' }}>
                <path
                  d='M914.123 117.643C914.123 117.643 914.535 117.112 914.653 116.7C914.948 115.404 914.359 113.871 913.887 112.752C912.944 110.63 910.646 107.154 908.23 107.861C906.993 108.214 906.639 110.336 906.521 111.573C906.345 113.4 906.521 115.404 907.052 117.171C907.523 118.762 908.584 119.411 909.998 119.47C911.412 119.587 913.416 119.293 914.123 117.643Z'
                  fill='#A7793D'
                />
              </g>
              <g opacity='0.3' style={{ mixBlendMode: 'multiply' }}>
                <path
                  d='M943.176 31.0194C943.176 31.0194 943.53 30.6069 943.589 30.3123C943.824 29.3105 943.412 28.132 943 27.248C942.233 25.5981 940.466 22.8874 938.639 23.4178C937.637 23.7124 937.401 25.3034 937.284 26.3052C937.166 27.7195 937.284 29.2516 937.696 30.6658C938.108 31.9033 938.933 32.3747 939.994 32.4926C941.055 32.5515 942.646 32.3158 943.176 31.0783V31.0194Z'
                  fill='#A7793D'
                />
              </g>
              <g opacity='0.3' style={{ mixBlendMode: 'multiply' }}>
                <path
                  d='M1250.42 125.715C1250.77 125.421 1251.01 125.008 1251.19 124.36C1251.66 122.533 1250.83 120.412 1250.13 118.88C1248.77 115.874 1245.59 110.984 1242.23 111.926C1240.46 112.457 1239.99 115.403 1239.75 117.171C1239.46 119.764 1239.75 122.533 1240.46 125.008C1241.17 127.247 1242.64 128.131 1244.64 128.308C1246.59 128.426 1249.48 128.014 1250.42 125.715Z'
                  fill='#A7793D'
                />
              </g>
              <g opacity='0.3' style={{ mixBlendMode: 'multiply' }}>
                <path
                  d='M1183.83 155.71C1183.83 155.71 1184.3 155.18 1184.36 154.767C1184.72 153.471 1184.13 151.997 1183.6 150.878C1182.65 148.756 1180.36 145.28 1177.94 145.928C1176.7 146.281 1176.35 148.403 1176.23 149.64C1176 151.467 1176.23 153.471 1176.7 155.238C1177.17 156.829 1178.29 157.478 1179.71 157.596C1181.12 157.713 1183.13 157.419 1183.83 155.769V155.71Z'
                  fill='#A7793D'
                />
              </g>
              <g opacity='0.3' style={{ mixBlendMode: 'multiply' }}>
                <path
                  d='M1212.88 69.0271C1212.88 69.0271 1213.24 68.6146 1213.3 68.261C1213.53 67.2592 1213.06 66.0807 1212.65 65.1968C1211.88 63.5468 1210.17 60.8361 1208.29 61.3665C1207.29 61.6611 1207.05 63.2522 1206.93 64.2539C1206.76 65.6682 1206.93 67.2003 1207.29 68.5556C1207.7 69.7931 1208.52 70.2645 1209.64 70.3824C1210.7 70.5002 1212.3 70.2645 1212.83 68.9681L1212.88 69.0271Z'
                  fill='#A7793D'
                />
              </g>
              <g opacity='0.3' style={{ mixBlendMode: 'multiply' }}>
                <path
                  d='M1340.99 58.9502C1340.7 58.5966 1340.35 58.2431 1339.82 58.0663C1338.28 57.5359 1336.52 58.4788 1335.16 59.3627C1332.63 60.9537 1328.5 64.7251 1329.33 68.7322C1329.8 70.7946 1332.27 71.4428 1333.75 71.6196C1335.93 71.9732 1338.28 71.6196 1340.35 70.7946C1342.23 69.9696 1343 68.2018 1343.12 65.8447C1343.23 63.5465 1342.88 60.1287 1340.93 58.9502H1340.99Z'
                  fill='#A7793D'
                />
              </g>
              <g opacity='0.3' style={{ mixBlendMode: 'multiply' }}>
                <path
                  d='M1366.39 137.617C1366.39 137.617 1365.98 137.087 1365.62 136.969C1364.51 136.556 1363.21 137.264 1362.32 137.853C1360.5 139.031 1357.55 141.683 1358.14 144.512C1358.44 145.985 1360.2 146.397 1361.26 146.574C1362.86 146.81 1364.51 146.574 1365.98 145.985C1367.33 145.396 1367.86 144.158 1367.98 142.449C1368.04 140.799 1367.81 138.383 1366.39 137.558V137.617Z'
                  fill='#A7793D'
                />
              </g>
              <g opacity='0.3' style={{ mixBlendMode: 'multiply' }}>
                <path
                  d='M1293.09 103.264C1293.09 103.264 1292.73 102.852 1292.44 102.734C1291.61 102.439 1290.61 102.969 1289.9 103.441C1288.49 104.325 1286.19 106.446 1286.66 108.627C1286.9 109.805 1288.25 110.1 1289.14 110.218C1290.37 110.394 1291.67 110.218 1292.79 109.746C1293.85 109.275 1294.26 108.332 1294.32 107.035C1294.32 105.739 1294.2 103.912 1293.09 103.264Z'
                  fill='#A7793D'
                />
              </g>
              <g opacity='0.3' style={{ mixBlendMode: 'multiply' }}>
                <path
                  d='M1411.88 116.759C1411.88 116.759 1412.35 116.228 1412.41 115.816C1412.77 114.519 1412.18 113.046 1411.65 111.927C1410.7 109.805 1408.41 106.27 1405.99 106.977C1404.75 107.33 1404.4 109.452 1404.22 110.689C1403.99 112.516 1404.22 114.519 1404.75 116.287C1405.22 117.878 1406.28 118.527 1407.7 118.585C1409.11 118.703 1411.12 118.409 1411.82 116.759H1411.88Z'
                  fill='#A7793D'
                />
              </g>
              <g opacity='0.3' style={{ mixBlendMode: 'multiply' }}>
                <path
                  d='M1440.93 30.076C1440.93 30.076 1441.23 29.6635 1441.35 29.3689C1441.64 28.3671 1441.17 27.1886 1440.76 26.3047C1440.05 24.6547 1438.28 21.9441 1436.4 22.4744C1435.39 22.769 1435.16 24.3601 1435.04 25.3618C1434.86 26.7761 1435.04 28.3082 1435.45 29.6635C1435.87 30.901 1436.69 31.3724 1437.75 31.4903C1438.87 31.5492 1440.4 31.3135 1440.99 30.076H1440.93Z'
                  fill='#A7793D'
                />
              </g>
              <g opacity='0.3' style={{ mixBlendMode: 'multiply' }}>
                <path
                  d='M498.861 61.31C498.566 61.5457 498.33 61.9582 498.213 62.4296C497.8 63.9617 498.566 65.7885 499.155 67.1438C500.334 69.6777 503.045 73.8615 505.932 73.0365C507.464 72.624 507.877 70.0902 508.054 68.617C508.289 66.3777 508.054 64.0206 507.464 61.9582C506.875 60.0136 505.579 59.3064 503.87 59.1297C502.22 59.0118 499.745 59.3654 498.92 61.31H498.861Z'
                  fill='#A7793D'
                />
              </g>
              <g opacity='0.3' style={{ mixBlendMode: 'multiply' }}>
                <path
                  d='M555.609 35.7343C555.609 35.7343 555.256 36.2057 555.138 36.5593C554.843 37.6789 555.374 38.9753 555.786 39.9181C556.611 41.7449 558.556 44.6913 560.618 44.102C561.679 43.8074 561.974 42.0395 562.092 40.9199C562.268 39.3878 562.092 37.6789 561.679 36.1468C561.267 34.7915 560.324 34.2611 559.145 34.1433C557.967 34.0254 556.199 34.32 555.609 35.6754V35.7343Z'
                  fill='#A7793D'
                />
              </g>
              <g opacity='0.3' style={{ mixBlendMode: 'multiply' }}>
                <path
                  d='M530.858 109.631C530.858 109.631 530.563 109.984 530.504 110.279C530.327 111.163 530.681 112.106 531.034 112.872C531.683 114.286 533.156 116.584 534.747 116.113C535.572 115.877 535.808 114.463 535.866 113.638C535.984 112.4 535.866 111.104 535.572 109.925C535.218 108.865 534.511 108.452 533.627 108.393C532.684 108.334 531.388 108.511 530.917 109.631H530.858Z'
                  fill='#A7793D'
                />
              </g>
              <g opacity='0.3' style={{ mixBlendMode: 'multiply' }}>
                <path
                  d='M304.4 94.5429C304.4 94.5429 303.87 95.1911 303.752 95.6625C303.34 97.1946 304.047 99.0214 304.636 100.377C305.815 102.911 308.525 107.094 311.413 106.269C312.945 105.857 313.357 103.323 313.534 101.85C313.77 99.6107 313.534 97.2536 312.945 95.1322C312.356 93.1876 311.059 92.4804 309.35 92.3626C307.641 92.2447 305.225 92.5983 304.4 94.5429Z'
                  fill='#A7793D'
                />
              </g>
              <g opacity='0.3' style={{ mixBlendMode: 'multiply' }}>
                <path
                  d='M361.149 68.91C361.149 68.91 360.795 69.3814 360.677 69.735C360.382 70.8546 360.913 72.151 361.325 73.0938C362.15 74.9206 364.095 77.8669 366.157 77.2777C367.218 76.983 367.513 75.1563 367.631 74.0956C367.807 72.5046 367.631 70.7957 367.218 69.3225C366.806 67.9671 365.863 67.4368 364.684 67.3189C363.506 67.2011 361.738 67.4368 361.149 68.851V68.91Z'
                  fill='#A7793D'
                />
              </g>
              <g opacity='0.3' style={{ mixBlendMode: 'multiply' }}>
                <path
                  d='M336.398 142.864C336.398 142.864 336.103 143.218 336.044 143.512C335.809 144.396 336.221 145.339 336.516 146.105C337.164 147.519 338.696 149.818 340.228 149.346C341.053 149.111 341.289 147.696 341.407 146.871C341.525 145.634 341.407 144.337 341.053 143.159C340.7 142.098 339.993 141.686 339.109 141.627C338.166 141.568 336.811 141.745 336.339 142.805L336.398 142.864Z'
                  fill='#A7793D'
                />
              </g>
              <g opacity='0.3' style={{ mixBlendMode: 'multiply' }}>
                <path
                  d='M126.203 97.1375C126.203 97.1375 125.672 97.7857 125.554 98.2571C125.142 99.8481 125.849 101.616 126.497 102.971C127.676 105.505 130.386 109.689 133.274 108.864C134.806 108.393 135.218 105.918 135.395 104.386C135.631 102.205 135.395 99.7892 134.806 97.7267C134.217 95.7821 132.92 95.075 131.211 94.8982C129.561 94.7804 127.086 95.1339 126.261 97.0785L126.203 97.1375Z'
                  fill='#A7793D'
                />
              </g>
              <g opacity='0.3' style={{ mixBlendMode: 'multiply' }}>
                <path
                  d='M182.949 71.5027C182.949 71.5027 182.596 71.9741 182.478 72.3277C182.183 73.4473 182.714 74.7437 183.126 75.6866C183.951 77.5133 185.896 80.4597 187.899 79.8704C189.019 79.5758 189.255 77.808 189.372 76.6883C189.549 75.1562 189.372 73.4473 188.96 71.9152C188.547 70.501 187.605 70.0295 186.367 69.9117C185.189 69.7938 183.48 70.0885 182.831 71.5027H182.949Z'
                  fill='#A7793D'
                />
              </g>
              <g opacity='0.3' style={{ mixBlendMode: 'multiply' }}>
                <path
                  d='M158.2 145.397C158.2 145.397 157.906 145.751 157.847 146.046C157.611 146.871 158.023 147.931 158.377 148.638C159.025 150.053 160.498 152.351 162.089 151.879C162.914 151.644 163.15 150.23 163.268 149.405C163.386 148.167 163.268 146.871 162.914 145.751C162.561 144.69 161.913 144.278 160.97 144.219C160.027 144.16 158.731 144.337 158.259 145.456L158.2 145.397Z'
                  fill='#A7793D'
                />
              </g>
            </g>
          </WorkDirtLayer>
        </g>
      </WorkDirtForeground>

      <DesktopNavRail>
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
