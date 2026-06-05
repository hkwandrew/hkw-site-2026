import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import usePageActive from '@/shared/hooks/usePageActive'
import ViewContainer from '@/shared/ui/ViewContainer'
import { HOME_HOVER_REGION } from './homeHoverRegions'
import { ROOTS_ENTRY_STATE_KEY } from '@/routes/roots/rootsEntry'
import { useHomeHover } from './homeHoverContext'
import HomeMarmot from './HomeMarmot'
import Plane from './Plane'
import StumpHoverArt from './StumpHoverArt'
import {
  Content,
  DesktopHome,
  Footer,
  FooterText,
  HeroText,
  HomeMarmotClip,
  HomeMarmotWrapper,
  MarmotCharacterWrap,
  PlaneShell,
  PlaneTrack,
  ROOTS_DROP_DURATION_MS,
  StumpHoverOverlay,
  StumpTrigger,
  Title,
} from './HomePage.styles'

const preloadRootsPage = () => import('../roots/RootsPage.jsx')

export default function Home() {
  const isActive = usePageActive()
  const navigate = useNavigate()
  const [isRootsTransitionActive, setIsRootsTransitionActive] = useState(false)
  const rootsTransitionTimeoutRef = useRef(null)
  const {
    clearHomeHoverRegion,
    homeHoverRegion,
    isHome,
    isHomeInteractive,
    setHomeHoverRegion,
  } = useHomeHover()
  const canInteractWithHomeHover = isHomeInteractive ?? isHome
  const marmotWrapperRef = useRef(null)
  const isStumpHoverActive =
    isRootsTransitionActive ||
    (canInteractWithHomeHover && homeHoverRegion === HOME_HOVER_REGION.mascot)
  const isMarmotHoverActive =
    !isRootsTransitionActive &&
    canInteractWithHomeHover &&
    homeHoverRegion === HOME_HOVER_REGION.mascot

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

  const handleRootsClick = () => {
    if (!canInteractWithHomeHover || isRootsTransitionActive) return

    preloadRootsPage()

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      navigate('/roots')
      return
    }

    setHomeHoverRegion(HOME_HOVER_REGION.mascot)
    setIsRootsTransitionActive(true)

    if (typeof window === 'undefined') return

    rootsTransitionTimeoutRef.current = window.setTimeout(() => {
      navigate('/roots', {
        state: { [ROOTS_ENTRY_STATE_KEY]: true },
      })
    }, ROOTS_DROP_DURATION_MS)
  }

  const resetMarmotPointerState = () => {
    const wrapper = marmotWrapperRef.current
    if (!wrapper) return

    wrapper.style.setProperty('--marmot-hover-x', '0px')
    wrapper.style.setProperty('--marmot-hover-y', '0px')
  }

  const handleMarmotPointerMove = (event) => {
    if (!canInteractWithHomeHover || isRootsTransitionActive) return

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) return

    const wrapper = marmotWrapperRef.current
    if (!wrapper) return

    const bounds = event.currentTarget.getBoundingClientRect()
    if (!bounds.width || !bounds.height) return

    const pointerX = (event.clientX - bounds.left) / bounds.width
    const pointerY = (event.clientY - bounds.top) / bounds.height
    const clampedX = Math.max(-1, Math.min(1, (pointerX - 0.5) * 2))
    const clampedY = Math.max(-1, Math.min(1, (pointerY - 0.5) * 2))

    wrapper.style.setProperty(
      '--marmot-hover-x',
      `${(clampedX * 5).toFixed(2)}px`,
    )
    wrapper.style.setProperty(
      '--marmot-hover-y',
      `${(clampedY * 4).toFixed(2)}px`,
    )
  }

  return (
    <>
      <PlaneTrack>
        <PlaneShell>
          <Plane />
        </PlaneShell>
      </PlaneTrack>
      <ViewContainer $isActive={isActive}>
        <DesktopHome>
          <Content>
            <Title as='h1'>HAPPY, KNOWLEDGABLE WORK</Title>
            <HeroText as='p'>
              We are a digital design and marketing studio based in Spokane,
              Washington. We build unique online experiences and engaging
              campaigns for non-profits and fun brands.
            </HeroText>
          </Content>
          <Footer>
            <FooterText>
              <span>&copy; 2026 HKW</span>
              <span className='separator'> | </span>
              <Link to='/policy'>Policies</Link>
            </FooterText>
          </Footer>
        </DesktopHome>
      </ViewContainer>
      <HomeMarmotClip data-home-marmot-clip>
        <HomeMarmotWrapper>
          <StumpHoverOverlay
            aria-hidden='true'
            $active={isStumpHoverActive}
            $isTransitioning={isRootsTransitionActive}
          >
            <StumpHoverArt />
          </StumpHoverOverlay>
          <StumpTrigger
            type='button'
            aria-label='Enter Non-profit Roots'
            disabled={!canInteractWithHomeHover}
            onClick={handleRootsClick}
            onFocus={() => {
              if (canInteractWithHomeHover) {
                preloadRootsPage()
                setHomeHoverRegion(HOME_HOVER_REGION.mascot)
              }
            }}
            onBlur={() => {
              resetMarmotPointerState()

              if (canInteractWithHomeHover && !isRootsTransitionActive) {
                clearHomeHoverRegion()
              }
            }}
            onMouseEnter={() => {
              if (canInteractWithHomeHover) {
                preloadRootsPage()
                setHomeHoverRegion(HOME_HOVER_REGION.mascot)
              }
            }}
            onMouseMove={handleMarmotPointerMove}
            onMouseLeave={() => {
              resetMarmotPointerState()

              if (canInteractWithHomeHover && !isRootsTransitionActive) {
                clearHomeHoverRegion()
              }
            }}
            $isInteractive={canInteractWithHomeHover}
            data-home-marmot-trigger
          />
          <MarmotCharacterWrap
            ref={marmotWrapperRef}
            $isHoverActive={isMarmotHoverActive}
            $isTransitioning={isRootsTransitionActive}
            data-home-marmot-wrapper
            data-home-marmot-hover-active={
              isMarmotHoverActive ? 'true' : 'false'
            }
          >
            <HomeMarmot />
          </MarmotCharacterWrap>
        </HomeMarmotWrapper>
      </HomeMarmotClip>
    </>
  )
}
