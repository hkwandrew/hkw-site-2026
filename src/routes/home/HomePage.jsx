import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import BlueMountain from '@/app/landscape/layers/BlueMountain'
import GoldMountain from '@/app/landscape/layers/GoldMountain'
import TreeMountain from '@/app/landscape/layers/TreeMountain'
import UpperField from '@/app/landscape/layers/UpperField'
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
  MobileCopy,
  MobileFieldFill,
  MobileFooter,
  MobileFooterText,
  MobileHero,
  MobileHome,
  MobileKicker,
  MobileRole,
  MobileRoles,
  MobileSceneSvg,
  MobileSceneWrap,
  PlaneShell,
  PlaneTrack,
  ROOTS_DROP_DURATION_MS,
  StumpHoverOverlay,
  StumpTrigger,
  Subtitle,
} from './HomePage.styles'

const preloadRootsPage = () => import('../roots/RootsPage.jsx')

const HomeMobileScene = () => (
  <MobileSceneSvg
    viewBox='1380 150 980 1180'
    preserveAspectRatio='xMidYMin slice'
    aria-hidden='true'
  >
    <path
      d='M3960,0L0,0v1014h3975.5L3960,0Z'
      transform='translate(-1.849932 0)'
      fill='#fcfae5'
    />
    <BlueMountain />
    <GoldMountain />
    <g transform='translate(1706.222193,231.108808)'>
      <path
        d='M1689.5,291c32.03,0,58-25.967,58-58s-25.97-58-58-58-58,25.967-58,58s25.97,58,58,58Z'
        transform='translate(-1689.5,-233)'
        fill='#d0471b'
      />
    </g>
    <TreeMountain transform='translate(-1020.680149,546.860407)' />
    <UpperField />
  </MobileSceneSvg>
)

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
            <Subtitle as='h1'>HAPPY, KNOWLEDGABLE WORK</Subtitle>
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

        <MobileHome aria-label='HKW home mobile hero'>
          <MobileSceneWrap>
            <HomeMobileScene />
          </MobileSceneWrap>
          <MobileFieldFill aria-hidden='true' />

          <MobileCopy>
            <MobileKicker>HAPPY, KNOWLEDGABLE WORK</MobileKicker>
            <MobileHero>
              We are a digital design and marketing studio based in Spokane,
              Washington. We build unique online experiences and engaging
              campaigns for non-profits and fun brands.
            </MobileHero>
            <MobileRoles>
              <MobileRole>(Non-profit workers)</MobileRole>
              <MobileRole>(B2B specialists)</MobileRole>
              <MobileRole>(Friendly maestros)</MobileRole>
            </MobileRoles>
          </MobileCopy>
          <MobileFooter>
            <MobileFooterText>
              &copy; 2026 HKW
              <br />
              <a href='#policies'>Policies</a>
            </MobileFooterText>
          </MobileFooter>
        </MobileHome>
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
        />
        <MarmotCharacterWrap $isTransitioning={isRootsTransitionActive}>
          <HomeMarmot />
        </MarmotCharacterWrap>
      </HomeMarmotWrapper>
    </>
  )
}
