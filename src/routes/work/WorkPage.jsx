import { useEffect, useMemo, useRef, useState } from 'react'
import { useBlocker, useLocation, useNavigate, useParams } from 'react-router'
import { usePageSceneTransition } from '@/app/landscape/pageSceneTransition'
import { SCENE_TRANSITION_DURATION_MS } from '@/app/landscape/sceneTiming'
import DirtLayer from '@/app/landscape/layers/DirtLayer'
import {
  DESKTOP_VIEWPORT_WIDTH,
  VIEWPORT_PX_UNIT_CUSTOM_PROPERTY,
} from '@/styles/viewportUnits'
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
  NavButton,
  NavIconLayer,
  NavVisual,
  Page,
  PageFrame,
  Quote,
  QuoteAndAttribution,
  ServiceTag,
  Services,
  StudyArea,
  StudyTextStage,
} from './WorkPage.styles'

const DESKTOP_NAV_GAP = 24
const WORK_DIRT_FOREGROUND_TRANSITION_MS = SCENE_TRANSITION_DURATION_MS
const STUDY_FADE_DURATION_MS = 420
const ABOUT_ROUTE_PATH = '/about'
const WORK_ROUTE_PATH = '/work'

const preloadRootsPage = () => import('../roots/RootsPage.jsx')

const isWorkPath = (pathname) =>
  pathname === WORK_ROUTE_PATH || pathname?.startsWith(`${WORK_ROUTE_PATH}/`)

const shouldReleaseForDestinationEntry = (pathname) =>
  pathname === ABOUT_ROUTE_PATH

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

    if (shouldReleaseForDestinationEntry(nextPath)) {
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

const getDesktopNavNaturalWidth = (widths) =>
  widths.reduce((sum, width) => sum + width, 0) +
  Math.max(0, widths.length - 1) * DESKTOP_NAV_GAP

const getDesktopNavFitScale = (
  availableCssWidth,
  naturalDesignWidth,
  frameCssWidth,
) => {
  if (
    availableCssWidth <= 0 ||
    naturalDesignWidth <= 0 ||
    frameCssWidth <= 0
  ) {
    return 1
  }

  const frameScale = frameCssWidth / DESKTOP_VIEWPORT_WIDTH

  if (frameScale <= 0) return 1

  return Math.min(1, availableCssWidth / (naturalDesignWidth * frameScale))
}

const renderNavButton = ({
  caseStudy,
  itemIndex,
  isCurrent,
  isAccessibleCurrent,
  handleSelect,
  keyPrefix,
}) => {
  const hasIcon = Boolean(caseStudy.navIcon)
  const navButtonLayout = resolveNavButtonLayout(caseStudy.navButton)

  return (
    <NavButton
      key={`${keyPrefix}-${caseStudy.id}`}
      type='button'
      aria-label={`Show ${caseStudy.name}`}
      aria-current={isAccessibleCurrent ? 'true' : undefined}
      data-nav-kind={hasIcon ? 'icon' : 'dot'}
      data-work-example={caseStudy.id}
      data-work-example-region='desktop-nav'
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
          <FallbackDot $current={isCurrent} />
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
  const isExiting = useWorkPageExitTransition()
  const navigate = useNavigate()
  const location = useLocation()
  const { caseStudySlug } = useParams()
  const { transitionSceneToPath } = usePageSceneTransition()
  const routeStudyIndex = getCaseStudyIndexForSlug(caseStudySlug)
  const initialStudyIndex = routeStudyIndex >= 0 ? routeStudyIndex : 0
  const [index, setIndex] = useState(initialStudyIndex)
  const [displayIndex, setDisplayIndex] = useState(initialStudyIndex)
  const [studyPhase, setStudyPhase] = useState('active')
  const [desktopNavScale, setDesktopNavScale] = useState(1)
  const [isForegroundEntryComplete, setIsForegroundEntryComplete] =
    useState(false)
  const [isRootsMarmotHoverActive, setIsRootsMarmotHoverActive] =
    useState(false)
  const [isRootsTransitionActive, setIsRootsTransitionActive] = useState(false)
  const desktopNavRailRef = useRef(null)
  const rootsTransitionTimeoutRef = useRef(null)
  const study = caseStudies[displayIndex]
  const desktopNavWidths = useMemo(
    () =>
      caseStudies.map(
        (caseStudy) => resolveNavButtonLayout(caseStudy.navButton).width,
      ),
    [],
  )
  const desktopNavNaturalWidth = useMemo(
    () => getDesktopNavNaturalWidth(desktopNavWidths),
    [desktopNavWidths],
  )
  const isWorkChromeVisible = isForegroundEntryComplete && !isExiting

  useEffect(() => {
    if (!caseStudySlug || routeStudyIndex >= 0) return

    navigate(WORK_ROUTE_PATH, { replace: true })
  }, [caseStudySlug, navigate, routeStudyIndex])

  useEffect(() => {
    if (routeStudyIndex < 0 || routeStudyIndex === index) return undefined

    let isActive = true

    queueMicrotask(() => {
      if (!isActive) return

      setStudyPhase('leaving')
      setIndex(routeStudyIndex)
    })

    return () => {
      isActive = false
    }
  }, [index, routeStudyIndex])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsForegroundEntryComplete(true)
    }, WORK_DIRT_FOREGROUND_TRANSITION_MS)

    return () => {
      window.clearTimeout(timer)
    }
  }, [])

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

  useEffect(() => {
    const railElement = desktopNavRailRef.current

    if (!railElement) return undefined

    const updateScale = () => {
      const availableWidth =
        railElement.clientWidth || railElement.getBoundingClientRect().width
      const frameWidth =
        railElement.parentElement?.getBoundingClientRect().width ?? 0
      const nextScale = getDesktopNavFitScale(
        availableWidth,
        desktopNavNaturalWidth,
        frameWidth,
      )

      setDesktopNavScale((currentScale) =>
        Math.abs(currentScale - nextScale) < 0.001 ? currentScale : nextScale,
      )
    }

    updateScale()

    window.addEventListener('resize', updateScale)

    if (typeof ResizeObserver === 'undefined') {
      return () => {
        window.removeEventListener('resize', updateScale)
      }
    }

    const observer = new ResizeObserver(updateScale)

    observer.observe(railElement)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateScale)
    }
  }, [desktopNavNaturalWidth])

  const goTo = (nextIndex) => {
    const normalizedIndex = normalizeIndex(nextIndex, caseStudies.length)

    if (normalizedIndex !== index) {
      setStudyPhase('leaving')
      setIndex(normalizedIndex)
    }

    const nextPath = getCaseStudyPath(caseStudies[normalizedIndex])

    if (location.pathname !== nextPath) {
      navigate(nextPath)
    }
  }

  const next = () => goTo(index + 1)
  const prev = () => goTo(index - 1)
  const handleNavButtonSelect = (nextIndex) => goTo(nextIndex)

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
    <Page $isActive>
      <PageFrame data-testid='work-page-frame'>
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
          isEntryComplete={isForegroundEntryComplete}
          isLeaving={isExiting}
          transitionMs={WORK_DIRT_FOREGROUND_TRANSITION_MS}
        />

        <DesktopNavRail ref={desktopNavRailRef} $isVisible={isWorkChromeVisible}>
          <DesktopNavViewport $naturalWidth={desktopNavNaturalWidth}>
            <DesktopNavStrip
              data-testid='work-nav-desktop'
              style={{
                '--work-desktop-nav-natural-width': `calc(${desktopNavNaturalWidth} * var(${VIEWPORT_PX_UNIT_CUSTOM_PROPERTY}))`,
                '--work-desktop-nav-scale': desktopNavScale,
              }}
            >
              {caseStudies.map((caseStudy, itemIndex) =>
                renderNavButton({
                  caseStudy,
                  itemIndex,
                  isCurrent: itemIndex === index,
                  isAccessibleCurrent: itemIndex === index,
                  handleSelect: handleNavButtonSelect,
                  keyPrefix: 'desktop',
                }),
              )}
            </DesktopNavStrip>
          </DesktopNavViewport>
        </DesktopNavRail>
      </PageFrame>
    </Page>
  )
}

export default WorkPage
