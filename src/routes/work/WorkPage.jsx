import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import Draggable from 'gsap/Draggable'
import usePageActive from '@/shared/hooks/usePageActive'
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
  ServiceTag,
  Services,
  StudyArea,
  StudyTextStage,
} from './WorkPage.styles'

gsap.registerPlugin(Draggable)

const DESKTOP_NAV_VISIBLE_COUNT = 8
const DESKTOP_NAV_GAP = 24
const DESKTOP_NAV_DRAG_THRESHOLD = 10
const STUDY_TRANSITION_DURATION_MS = 420

const normalizeIndex = (index, itemCount) =>
  ((index % itemCount) + itemCount) % itemCount

const getStudyDirection = (currentIndex, nextIndex, itemCount) => {
  if (itemCount <= 1 || currentIndex === nextIndex) return 0
  if (currentIndex === itemCount - 1 && nextIndex === 0) return 1
  if (currentIndex === 0 && nextIndex === itemCount - 1) return -1

  return nextIndex > currentIndex ? 1 : -1
}

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
  snapPoints.reduce((closestPoint, point) => {
    if (
      Math.abs(point.offset - offset) < Math.abs(closestPoint.offset - offset)
    ) {
      return point
    }

    return closestPoint
  }, snapPoints[0] ?? { start: 0, offset: 0 })

const renderNavButtons = (currentIndex, handleSelect, compact = false) =>
  caseStudies.map((caseStudy, itemIndex) => {
    const isCurrent = itemIndex === currentIndex
    const hasIcon = Boolean(caseStudy.navIcon)
    const navButtonLayout = resolveNavButtonLayout(caseStudy.navButton, compact)

    return (
      <NavButton
        key={`${compact ? 'mobile' : 'desktop'}-${caseStudy.id}`}
        type='button'
        aria-label={`Show ${caseStudy.name}`}
        aria-current={isCurrent ? 'true' : undefined}
        data-nav-kind={hasIcon ? 'icon' : 'dot'}
        $compact={compact}
        $layout={navButtonLayout}
        onClick={() => handleSelect(itemIndex)}
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
  })

const renderStudyPane = (study, state, direction) => {
  const attributionLabel = study.attribution.replace(/^[—-]\s*/, '')

  return (
    <AnimatedStudyText
    className={state}
      key={`${state}-${study.id}`}
      $state={state}
      $direction={direction}
      aria-hidden={state === 'leaving' ? 'true' : undefined}
      data-study-pane={state}
      data-testid={state === 'active' ? 'work-study-active' : undefined}
    >
      <ClientName>{study.name}</ClientName>
      <Quote>{study.quote}</Quote>
      <Attribution>&mdash;{attributionLabel}</Attribution>
      <Services>
        {study.services.map((service) => (
          <ServiceTag key={`${study.id}-${state}-${service}`}>{service}</ServiceTag>
        ))}
      </Services>
    </AnimatedStudyText>
  )
}

const renderHeroPane = (study, state, direction) => {
  if (!study.image) return null

  return (
    <AnimatedHeroImage
      key={`${state}-${study.id}`}
      $state={state}
      $direction={direction}
      aria-hidden={state === 'leaving' ? 'true' : undefined}
      data-study-pane={state}
    >
      <img src={study.image} alt={study.name} />
    </AnimatedHeroImage>
  )
}

const WorkPage = () => {
  const isActive = usePageActive()
  const [index, setIndex] = useState(0)
  const [desktopNavWindowStart, setDesktopNavWindowStart] = useState(0)
  const [isDesktopNavDragging, setIsDesktopNavDragging] = useState(false)
  const [shouldBlockNavClick, setShouldBlockNavClick] = useState(false)
  const [leavingIndex, setLeavingIndex] = useState(null)
  const [transitionDirection, setTransitionDirection] = useState(1)
  const desktopNavTrackRef = useRef(null)
  const desktopNavDraggableRef = useRef(null)
  const releaseNavClickBlockTimerRef = useRef(null)
  const study = caseStudies[index]
  const leavingStudy = leavingIndex === null ? null : caseStudies[leavingIndex]
  const desktopNavWidths = useMemo(
    () =>
      caseStudies.map(
        (caseStudy) => resolveNavButtonLayout(caseStudy.navButton).width,
      ),
    [],
  )
  const desktopNavViewportWidth = useMemo(
    () => getDesktopNavViewportWidth(desktopNavWidths),
    [desktopNavWidths],
  )
  const desktopNavSnapPoints = useMemo(
    () => getDesktopNavSnapPoints(desktopNavWidths, caseStudies.length),
    [desktopNavWidths],
  )
  const desktopNavTrackOffset =
    desktopNavSnapPoints.find((point) => point.start === desktopNavWindowStart)
      ?.offset ?? 0
  const maxDesktopNavTrackOffset =
    desktopNavSnapPoints[desktopNavSnapPoints.length - 1]?.offset ?? 0

  useEffect(() => {
    if (leavingIndex === null) return undefined

    const timer = window.setTimeout(() => {
      setLeavingIndex(null)
    }, STUDY_TRANSITION_DURATION_MS)

    return () => {
      window.clearTimeout(timer)
    }
  }, [index, leavingIndex])

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

  useEffect(() => {
    const trackElement = desktopNavTrackRef.current

    if (!trackElement) return

    gsap.to(trackElement, {
      x: -desktopNavTrackOffset,
      duration: isDesktopNavDragging ? 0 : 0.42,
      ease: 'power3.out',
      overwrite: true,
    })
  }, [desktopNavTrackOffset, isDesktopNavDragging])

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
        const nearestSnapPoint = getClosestDesktopNavSnapPoint(
          -this.x,
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

  const goTo = (nextIndex) => {
    const normalizedIndex = normalizeIndex(nextIndex, caseStudies.length)

    if (normalizedIndex === index) return

    setLeavingIndex(index)
    setTransitionDirection(
      getStudyDirection(index, normalizedIndex, caseStudies.length),
    )
    setDesktopNavWindowStart(
      getDesktopNavWindowStart(normalizedIndex, caseStudies.length),
    )
    setIndex(normalizedIndex)
  }

  const next = () => goTo(index + 1)
  const prev = () => goTo(index - 1)
  const handleNavButtonSelect = (nextIndex) => {
    if (shouldBlockNavClick) return

    goTo(nextIndex)
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

      <MainContent>
        <StudyArea>
          <StudyTextStage>
            {leavingStudy && renderStudyPane(leavingStudy, 'leaving', transitionDirection)}
            {renderStudyPane(study, 'active', transitionDirection)}
          </StudyTextStage>

          <MobileNavRail>
            <MobileNavStrip>
              {renderNavButtons(index, handleNavButtonSelect, true)}
            </MobileNavStrip>
          </MobileNavRail>

          <HeroStage>
            {leavingStudy && renderHeroPane(leavingStudy, 'leaving', transitionDirection)}
            {renderHeroPane(study, 'active', transitionDirection)}
          </HeroStage>
        </StudyArea>
      </MainContent>

      <DesktopNavRail>
        <DesktopNavViewport
          $dragging={isDesktopNavDragging}
          $viewportWidth={desktopNavViewportWidth}
        >
          <DesktopNavStrip
            ref={desktopNavTrackRef}
            data-testid='work-nav-desktop'
          >
            {renderNavButtons(index, handleNavButtonSelect)}
          </DesktopNavStrip>
        </DesktopNavViewport>
      </DesktopNavRail>
    </Page>
  )
}

export default WorkPage
