import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import Draggable from 'gsap/Draggable'
import usePageActive from '@/shared/hooks/usePageActive'
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

gsap.registerPlugin(Draggable)

const DESKTOP_NAV_VISIBLE_COUNT = 8
const DESKTOP_NAV_GAP = 24
const DESKTOP_NAV_DRAG_THRESHOLD = 10
const PAGE_REVEAL_DURATION_MS = 500
const STUDY_FADE_DURATION_MS = 420

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
        data-work-example={caseStudy.id}
        data-work-example-region={compact ? 'mobile-nav' : 'desktop-nav'}
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
        <Quote $compactCopy={hasCompactCopy}>{study.quote}</Quote>
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
  const [index, setIndex] = useState(0)
  const [displayIndex, setDisplayIndex] = useState(0)
  const [studyPhase, setStudyPhase] = useState('active')
  const [desktopNavWindowStart, setDesktopNavWindowStart] = useState(0)
  const [isDesktopNavDragging, setIsDesktopNavDragging] = useState(false)
  const [isForegroundEntryComplete, setIsForegroundEntryComplete] =
    useState(false)
  const [shouldBlockNavClick, setShouldBlockNavClick] = useState(false)
  const desktopNavTrackRef = useRef(null)
  const desktopNavDraggableRef = useRef(null)
  const releaseNavClickBlockTimerRef = useRef(null)
  const study = caseStudies[displayIndex]
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
    if (!isActive) return undefined

    const timer = window.setTimeout(() => {
      setIsForegroundEntryComplete(true)
    }, PAGE_REVEAL_DURATION_MS)

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

  const goTo = (nextIndex) => {
    const normalizedIndex = normalizeIndex(nextIndex, caseStudies.length)

    if (normalizedIndex === index) return

    setStudyPhase('leaving')
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

          <HeroStage>
            {renderHeroPane(study, studyPhase)}
          </HeroStage>
        </StudyArea>
      </MainContent>

      <WorkDirtForeground
        aria-hidden='true'
        focusable='false'
        viewBox='0 0 1440 1024'
        shapeRendering='geometricPrecision'
        textRendering='geometricPrecision'
        $isActive={isActive}
        $isEntryComplete={isForegroundEntryComplete}
      >
        <g transform='translate(-1181.222193 -8.108808)'>
          <path
            transform='translate(1200,190)'
            d='M1788 1594.81L-192 1597.59V697.728C-166.196 700.073 -140.784 700.875 -114.511 699.024C-81.6699 696.679 -49.2198 691.866 -16.3006 689.583C18.3388 687.238 53.4474 687.793 88.1651 689.212C122.179 690.508 156.036 693.1 189.894 695.63C223.83 698.16 257.922 699.95 291.701 703.714C325.246 707.417 358.556 712.168 392.414 714.328C423.534 716.303 453.639 713.65 484.134 709.392C517.053 704.763 549.268 700.135 582.735 698.345C617.296 696.494 651.857 694.704 686.419 693.1C755.307 689.829 824.273 687.546 893.317 687.546C962.518 687.608 1031.72 690.323 1100.45 696.679C1131.81 699.58 1161.83 702.11 1193.5 700.999C1223.53 699.95 1253.47 696.803 1283.11 693.47C1327.21 688.472 1371.15 681.128 1415.96 684.399C1438.71 686.065 1461.15 689.583 1483.75 692.236C1505.41 694.766 1527.38 696.432 1549.2 698.037C1627.24 703.961 1710.51 706.8 1788 695.692V1594.81Z'
            fill='#FB9D38'
          ></path>
          <g transform='translate(1181, 1000)'>
            <DirtLayer
              showWorkDirtLayer
              containerId='work-dirt-foreground__container'
            />
          </g>
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
            {renderNavButtons(index, handleNavButtonSelect)}
          </DesktopNavStrip>
        </DesktopNavViewport>
      </DesktopNavRail>
    </Page>
  )
}

export default WorkPage
