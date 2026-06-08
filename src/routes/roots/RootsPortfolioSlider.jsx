import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import styled, { css, keyframes } from 'styled-components'
import ArrowButton from '@/shared/ui/ArrowButton'
import { applyTypography } from '@/shared/ui/Typography'
import { MEDIA_QUERIES } from '@/styles/breakpoints'
import RootsMarmot from './RootsMarmot'
import frameBottom from './assets/roots-slider/frame-chrome/bottom.svg'
import frameLeft from './assets/roots-slider/frame-chrome/left.svg'
import frameRight from './assets/roots-slider/frame-chrome/right.svg'
import frameTop from './assets/roots-slider/frame-chrome/top.svg'
import PillButton from '@/shared/ui/PillButton'

const SLIDE_FADE_DURATION_MS = 180

const toCssLength = (value, fallback = 'auto') =>
  typeof value === 'number' ? `${value}px` : (value ?? fallback)

const getMobileArtworkLength = (layout, key, fallback) =>
  toCssLength(layout?.[key], fallback)

const getArtworkTranslate = ({ $artworkTop, $artworkLeft }) => {
  const translateX = $artworkLeft == null ? '-50%' : '0'
  const translateY = $artworkTop == null ? '-50%' : '0'

  return translateX === '0' && translateY === '0'
    ? 'none'
    : `translate(${translateX}, ${translateY})`
}

const slidePaneFadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const slidePaneFadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`

const getSlidePaneMotion = ({ $state }) => {
  if ($state === 'leaving') {
    return css`
      animation: ${slidePaneFadeOut} ${SLIDE_FADE_DURATION_MS}ms
        cubic-bezier(0.22, 1, 0.36, 1) both;
      pointer-events: none;
    `
  }

  if ($state === 'entering') {
    return css`
      animation: ${slidePaneFadeIn} ${SLIDE_FADE_DURATION_MS}ms
        cubic-bezier(0.22, 1, 0.36, 1) both;
    `
  }

  return css`
    opacity: 1;
  `
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 120;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow:
    0 22px 48px rgba(28, 45, 56, 0.28),
    inset 0 0 0 1px rgba(43, 30, 21, 0.18);
`

const Dialog = styled.div`
  position: relative;
  z-index: 2;
  container: roots-dialog / size;
  display: flex;
  flex-direction: column;
  width: min(calc(1440 * var(--hkw-viewport-px-unit)), 100%);
  height: min(calc(1024 * var(--hkw-viewport-px-unit)), 100%);
  overflow: hidden;
  isolation: isolate;
  background: #fcfae5;
  color: ${({ theme }) => theme.colors.blue.dark};

  &[data-component='WomenOfColorCandidates'] {
    p {
      font-size: 18px;

      @media ${MEDIA_QUERIES.mobilePortrait} {
        font-size: 12px;
      }
    }
  }

  &[data-roots-example='community-development-initiative'] {
    div:nth-of-type(2) {
      flex-direction: column;
    }
  }
`

const FrameChrome = styled.div`
  overflow: visible;
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
`

const FrameSide = styled.img`
  position: absolute;
  z-index: ${({ $zIndex }) => $zIndex ?? 1};
  top: ${({ $top }) => $top ?? 'auto'};
  right: ${({ $right }) => $right ?? 'auto'};
  bottom: ${({ $bottom }) => $bottom ?? 'auto'};
  left: ${({ $left }) => $left ?? 'auto'};
  width: ${({ $width }) => $width ?? 'auto'};
  height: ${({ $height }) => $height ?? 'auto'};
  object-fit: fill;
  user-select: none;

  @media ${MEDIA_QUERIES.mobilePortrait} {
    top: ${({ $mobileTop, $top }) => $mobileTop ?? $top ?? 'auto'};
    right: ${({ $mobileRight, $right }) => $mobileRight ?? $right ?? 'auto'};
    bottom: ${({ $mobileBottom, $bottom }) =>
      $mobileBottom ?? $bottom ?? 'auto'};
    left: ${({ $mobileLeft, $left }) => $mobileLeft ?? $left ?? 'auto'};
    width: ${({ $mobileWidth, $width }) => $mobileWidth ?? $width ?? 'auto'};
    height: ${({ $mobileHeight, $height }) =>
      $mobileHeight ?? $height ?? 'auto'};
  }
`

const HorizontalFrame = styled(FrameSide)`
  transform: ${({ $flipY }) => ($flipY ? 'scaleY(-1)' : 'none')};
  transform-origin: center;
`

const ClosePill = styled(PillButton)`
  position: absolute;
  top: 54px;
  right: 70px;
  z-index: 4;

  &:focus-visible {
    ${
      '' /* outline: 3px solid ${({ theme }) => theme.colors.yellow.gold};
    outline-offset: 4px; */
    }
  }

  @media ${MEDIA_QUERIES.mobilePortrait} {
    top: calc(20px + env(safe-area-inset-top));
    right: calc(34px + env(safe-area-inset-right));
    width: 24px;
    height: 24px;
    padding: 0;
    gap: 0;
    border-radius: 50%;
    color: ${({ theme }) => theme.colors.yellow.light};

    > span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      text-box: unset;
    }

    &:hover {
      background: ${({ theme }) => theme.colors.yellow.light};
      color: ${({ theme }) => theme.colors.orange.base};
    }
  }
`

const CloseLabel = styled.span`
  @media ${MEDIA_QUERIES.mobilePortrait} {
    display: none;
  }
`
const MobileCloseIcon = styled.svg`
  display: none;

  @media ${MEDIA_QUERIES.mobilePortrait} {
    display: block;
    width: 18px;
    height: 18px;
  }
`

const Content = styled.div`
  ${getSlidePaneMotion}
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(300px, 417px);
  gap: 64px;
  flex: 1;
  min-height: 0;
  padding: 96px 84px 72px;

  @media ${MEDIA_QUERIES.mobilePortrait} {
    display: flex;
    flex-direction: column-reverse;
    justify-content: flex-end;
    flex: 1 1 auto;
    gap: 8px;
    min-height: 0;
    padding: calc(54px + env(safe-area-inset-top)) 48px
      calc(62px + env(safe-area-inset-bottom));
    overflow: hidden;
  }
`

const ArtworkStage = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  min-height: 0;

  @media ${MEDIA_QUERIES.mobilePortrait} {
    flex: 0 0 112px;
    height: 112px;
    min-height: 0;
    padding: 0;
    overflow: visible;
  }
`

const ArtworkImage = styled.img`
  position: absolute;
  top: ${({ $artworkTop }) => toCssLength($artworkTop, '50%')};
  left: ${({ $artworkLeft }) => toCssLength($artworkLeft, '50%')};
  z-index: 1;
  width: ${({ $artworkWidth }) => toCssLength($artworkWidth)};
  height: ${({ $artworkHeight }) => toCssLength($artworkHeight)};
  max-width: none;
  max-inline-size: none;
  max-block-size: none;
  transform: ${getArtworkTranslate};

  @media ${MEDIA_QUERIES.mobilePortrait} {
    position: absolute;
    top: ${({ $mobileArtwork }) =>
      getMobileArtworkLength($mobileArtwork, 'top', '0')};
    left: ${({ $mobileArtwork }) =>
      getMobileArtworkLength($mobileArtwork, 'left', '50%')};
    width: ${({ $mobileArtwork }) =>
      getMobileArtworkLength($mobileArtwork, 'width', '320px')};
    height: auto;
    max-width: none;
    max-height: none;
    object-fit: contain;
    transform: translateX(-50%);
  }
`

const ArtworkFrame = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  > * {
    width: 100%;
  }

  @media ${MEDIA_QUERIES.mobilePortrait} {
    position: absolute;
    top: ${({ $mobileArtwork }) =>
      getMobileArtworkLength($mobileArtwork, 'top', '0')};
    left: ${({ $mobileArtwork }) =>
      getMobileArtworkLength($mobileArtwork, 'left', '50%')};
    width: ${({ $mobileArtwork }) =>
      getMobileArtworkLength($mobileArtwork, 'width', '320px')};
    max-height: none;
    transform: translateX(-50%);

    > * {
      max-height: inherit;
    }
  }
`

const Copy = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  margin-top: 128px;
  ${'' /* align-self: center; */}
  gap: 45px;
  width: 100%;
  min-width: 0;
  max-width: ${({ $maxWidth }) =>
    typeof $maxWidth === 'number' ? `${$maxWidth}px` : ($maxWidth ?? 'none')};

  @media ${MEDIA_QUERIES.mobilePortrait} {
    flex: 0 1 auto;
    gap: 10px;
    margin-top: 0;
    padding-inline: 2px;
    max-width: none;
  }
`

const Title = styled.h2`
  letter-spacing: -1.44px;
  line-height: 1;
  font-size: ${({ theme }) => theme.typography.h3.size};
  white-space: pre-line;
  text-box: ${({ theme }) => theme.typography.textBox};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  font-variation-settings:
    'wdth' ${({ theme }) => theme.font.width.condensed},
    'wght' ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.blue.dark};

  @media ${MEDIA_QUERIES.mobilePortrait} {
    font-size: 22px;
    letter-spacing: 0;
  }
`

const HeadingGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const ItemType = styled.p`
  font-size: 16px;
  font-variation-settings:
    'wdth' ${({ theme }) => theme.font.width.condensed},
    'wght' ${({ theme }) => theme.font.weight.bold};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.blue.dark};

  @media ${MEDIA_QUERIES.mobilePortrait} {
    font-size: 13px;
  }
`

const Bio = styled.p`
  color: ${({ theme }) => theme.colors.blue.dark};
  font-size: ${({ theme }) => theme.typography.formButton.size};
  line-height: 1.19;
  letter-spacing: -0.4px;
  white-space: pre-line;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  font-variation-settings:
    'wdth' ${({ theme }) => theme.font.width.regular},
    'wght' ${({ theme }) => theme.font.weight.medium};
  text-transform: none;

  @media ${MEDIA_QUERIES.mobilePortrait} {
    font-size: 12px;
    line-height: 1.18;
    letter-spacing: 0;
  }
`

const Roles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const RolesLabel = styled.p`
  ${applyTypography('bodyMedium')}
  line-height: 1.3;

  @media ${MEDIA_QUERIES.mobilePortrait} {
    font-size: 12px;
    line-height: 1.2;
  }
`

const RolesList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0;
  margin: 0;
  padding: 0;
  list-style: none;
`

const Role = styled.li`
  font-size: ${({ theme }) => theme.typography.bodyMedium.size};
  letter-spacing: 0;
  line-height: 1.5;
  font-weight: ${({ theme }) => theme.font.weight.semibold};
  font-variation-settings:
    'wdth' 100,
    'wght' ${({ theme }) => theme.font.weight.semibold};

  @media ${MEDIA_QUERIES.mobilePortrait} {
    font-size: 12px;
    line-height: 1.22;
  }
`

const NavCluster = styled.div`
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 68px;

  @media ${MEDIA_QUERIES.mobilePortrait} {
    position: absolute;
    top: auto;
    right: 0;
    bottom: calc(24px + env(safe-area-inset-bottom));
    left: 0;
    z-index: 3;
    justify-content: center;
    gap: 16px;
    margin-top: auto;
    padding: 0;
  }
`

const NavControl = styled(ArrowButton)`
  pointer-events: auto;
  background: ${({ theme }) => theme.colors.orange.base};
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    background: ${({ theme }) => theme.colors.orange.dark};
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.yellow.gold};
    outline-offset: 4px;
  }
`

const MarmotAccent = styled.div`
  position: absolute;
  right: 18px;
  bottom: 0;
  ${'' /* z-index: 0; */}
  width: 446px;
  pointer-events: none;
  opacity: 1;

  > * {
    width: 100%;
    height: auto;
  }

  @media ${MEDIA_QUERIES.mobilePortrait} {
    display: none;
  }
`

const getFocusableElements = (container) =>
  container
    ? Array.from(
        container.querySelectorAll(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      )
    : []

export default function RootsPortfolioSlider({
  item,
  onClose,
  onNext,
  onPrev,
}) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const titleId = useId()
  const [displayItem, setDisplayItem] = useState(item)
  const [slidePhase, setSlidePhase] = useState('active')
  const FrameComponent = displayItem.FrameComponent
  const frameComponentName =
    FrameComponent.displayName ?? FrameComponent.name ?? displayItem.id

  const requestSlideChange = useCallback(
    (changeSlide) => {
      if (slidePhase !== 'leaving') {
        setSlidePhase('leaving')
      }

      changeSlide()
    },
    [slidePhase],
  )
  const handleNext = useCallback(() => {
    requestSlideChange(onNext)
  }, [onNext, requestSlideChange])
  const handlePrev = useCallback(() => {
    requestSlideChange(onPrev)
  }, [onPrev, requestSlideChange])
  const handleOverlayPointerDown = useCallback(
    (event) => {
      if (event.target === event.currentTarget) {
        onClose()
      }
    },
    [onClose],
  )

  useLayoutEffect(() => {
    closeRef.current?.focus()
  }, [])

  useEffect(() => {
    if (slidePhase === 'leaving') {
      const timer = window.setTimeout(() => {
        setDisplayItem(item)
        setSlidePhase('entering')
      }, SLIDE_FADE_DURATION_MS)

      return () => {
        window.clearTimeout(timer)
      }
    }

    if (slidePhase === 'entering') {
      const timer = window.setTimeout(() => {
        setSlidePhase(item.id === displayItem.id ? 'active' : 'leaving')
      }, SLIDE_FADE_DURATION_MS)

      return () => {
        window.clearTimeout(timer)
      }
    }

    return undefined
  }, [displayItem.id, item, slidePhase])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        handleNext()
        return
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        handlePrev()
        return
      }

      if (event.key !== 'Tab') return

      const focusables = getFocusableElements(dialogRef.current)

      if (!focusables.length) return

      const firstFocusable = focusables[0]
      const lastFocusable = focusables[focusables.length - 1]

      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault()
        lastFocusable.focus()
        return
      }

      if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault()
        firstFocusable.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [handleNext, handlePrev, onClose])

  if (typeof document === 'undefined') return null

  return createPortal(
    <Overlay
      data-roots-portfolio-overlay
      onPointerDown={handleOverlayPointerDown}
    >
      <Dialog
        ref={dialogRef}
        role='dialog'
        aria-modal='true'
        aria-labelledby={titleId}
        data-roots-example={displayItem.id}
        data-component={frameComponentName}
        data-roots-example-region='dialog'
      >
        <FrameChrome aria-hidden='true'>
          <FrameSide
            src={frameLeft}
            alt=''
            data-roots-frame-edge='left'
            // $top='-47px'
            $left='-177px'
            $width='205px'
            $height='calc(100% + 86px)'
            $mobileTop='0'
            $mobileLeft='0'
            $mobileWidth='30px'
            $mobileHeight='100%'
            $zIndex={1}
          />
          <FrameSide
            src={frameRight}
            alt=''
            data-roots-frame-edge='right'
            $top='-14px'
            $right='-177px'
            $width='205px'
            $height='calc(100% + 104px)'
            $mobileTop='0'
            $mobileRight='0'
            $mobileWidth='30px'
            $mobileHeight='100%'
            $zIndex={1}
          />
          <HorizontalFrame
            src={frameTop}
            alt=''
            data-roots-frame-edge='top'
            $top='-116px'
            // $left='-28px'
            $width='calc(100% + 80px)'
            $height='271px'
            $mobileTop='0'
            $mobileLeft='0'
            $mobileWidth='100%'
            $mobileHeight='30px'
            $zIndex={2}
          />
          <HorizontalFrame
            src={frameBottom}
            alt=''
            data-roots-frame-edge='bottom'
            $bottom='-116px'
            // $left='-28px'
            $width='calc(100% + 64px)'
            $height='271px'
            $mobileBottom='0'
            $mobileLeft='0'
            $mobileWidth='100%'
            $mobileHeight='30px'
            $zIndex={2}
          />
        </FrameChrome>

        <ClosePill
          ref={closeRef}
          variant='close'
          type='button'
          aria-label='Close portfolio details'
          onClick={onClose}
        >
          <CloseLabel>Close</CloseLabel>
          <MobileCloseIcon
            aria-hidden='true'
            focusable='false'
            viewBox='0 0 18 18'
            fill='none'
            data-roots-mobile-close-icon
          >
            <path
              d='M4 4L14 14M14 4L4 14'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
            />
          </MobileCloseIcon>
        </ClosePill>

        <Content
          key={displayItem.id}
          $state={slidePhase}
          data-roots-slide-pane={slidePhase}
        >
          <ArtworkStage data-roots-slide-artwork>
            {displayItem.detailImage ? (
              <ArtworkImage
                $artworkWidth={displayItem.artworkWidth}
                $artworkHeight={displayItem.artworkHeight}
                $artworkTop={displayItem.artworkTop}
                $artworkLeft={displayItem.artworkLeft}
                $mobileArtwork={displayItem.mobileArtwork}
                src={displayItem.detailImage}
                alt={`${displayItem.title} project artwork`}
              />
            ) : (
              <ArtworkFrame
                $mobileArtwork={displayItem.mobileArtwork}
                aria-label={`${displayItem.title} project artwork`}
              >
                <FrameComponent />
              </ArtworkFrame>
            )}
          </ArtworkStage>

          <Copy $maxWidth={displayItem.maxWidth} data-roots-slide-copy>
            <HeadingGroup>
              {displayItem.type ? (
                <ItemType>{displayItem.type}</ItemType>
              ) : null}
              <Title id={titleId}>{displayItem.title}</Title>
            </HeadingGroup>

            <Bio>{displayItem.bio}</Bio>

            <Roles>
              <RolesLabel>Our roles:</RolesLabel>
              <RolesList>
                {displayItem.roles.map((role) => (
                  <Role key={`${displayItem.id}-${role}`}>{role}</Role>
                ))}
              </RolesList>
            </Roles>
          </Copy>
        </Content>

        <NavCluster data-roots-slide-nav>
          <NavControl
            type='button'
            direction='left'
            aria-label='Show previous portfolio piece'
            onClick={handlePrev}
          />
          <NavControl
            type='button'
            direction='right'
            aria-label='Show next portfolio piece'
            onClick={handleNext}
          />
        </NavCluster>
        <MarmotAccent aria-hidden='true'>
          <RootsMarmot />
        </MarmotAccent>
      </Dialog>
    </Overlay>,
    document.body,
  )
}
