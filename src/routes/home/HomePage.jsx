import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import usePageActive from '@/shared/hooks/usePageActive'
import ViewContainer from '@/shared/ui/ViewContainer'
import { HOME_HOVER_REGION } from './homeHoverRegions'
import { ROOTS_ENTRY_STATE_KEY } from './rootsEntry'
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
  const isStumpHoverActive =
    isRootsTransitionActive ||
    (canInteractWithHomeHover && homeHoverRegion === HOME_HOVER_REGION.mascot)

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
              &copy; 2026 HKW &nbsp;|&nbsp;{' '}
              <a href='https://hkw.io/policy'>Policies</a>
            </FooterText>
          </Footer>
        </DesktopHome>
      </ViewContainer>
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
          onMouseLeave={() => {
            if (canInteractWithHomeHover && !isRootsTransitionActive) {
              clearHomeHoverRegion()
            }
          }}
          $isInteractive={canInteractWithHomeHover}
        />
        <MarmotCharacterWrap $isTransitioning={isRootsTransitionActive}>
          <HomeMarmot />
        </MarmotCharacterWrap>
      </HomeMarmotWrapper>
    </>
  )
}
