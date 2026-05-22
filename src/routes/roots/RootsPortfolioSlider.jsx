import { useEffect, useId, useLayoutEffect, useRef } from 'react'
import styled from 'styled-components'
import ArrowButton from '@/shared/ui/ArrowButton'
import { applyTypography } from '@/shared/ui/Typography'
import RootsMarmot from './RootsMarmot'
import frameBackground from './assets/roots-slider/frame.png'
import PillButton from '@/shared/ui/PillButton'

const toCssLength = (value, fallback = 'auto') =>
  typeof value === 'number' ? `${value}px` : (value ?? fallback)

const getArtworkTranslate = ({ $artworkTop, $artworkLeft }) => {
  const translateX = $artworkLeft == null ? '-50%' : '0'
  const translateY = $artworkTop == null ? '-50%' : '0'

  return translateX === '0' && translateY === '0'
    ? 'none'
    : `translate(${translateX}, ${translateY})`
}

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 30;
  overflow: hidden;
  box-shadow:
    0 22px 48px rgba(28, 45, 56, 0.28),
    inset 0 0 0 1px rgba(43, 30, 21, 0.18);
`

const Dialog = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  height: 100%;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.blue.dark};

  &::before {
    content: '';
    background: #fcfae5;
    position: absolute;
    inset: 0;
  }
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url(${frameBackground});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    pointer-events: none;
  }
`

const FrameChrome = styled.div`
  overflow: hidden;
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
`

const FrameSide = styled.img`
  position: absolute;
  top: ${({ $top }) => $top ?? 'auto'};
  right: ${({ $right }) => $right ?? 'auto'};
  bottom: ${({ $bottom }) => $bottom ?? 'auto'};
  left: ${({ $left }) => $left ?? 'auto'};
  width: ${({ $width }) => $width ?? 'auto'};
  height: ${({ $height }) => $height ?? 'auto'};
  object-fit: fill;
  user-select: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
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
  z-index: 3;

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.yellow.gold};
    outline-offset: 4px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    top: 18px;
    right: 18px;
    min-width: 84px;
    padding: 13px 17px 12px;
    ${applyTypography('smallButton')}
  }
`

const Content = styled.div`
  position: relative;
  z-index: 0;
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(300px, 417px);
  gap: 64px;
  flex: 1;
  min-height: 0;
  padding: 96px 84px 72px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 40px;
    grid-template-columns: minmax(0, 1fr) minmax(280px, 372px);
    padding: 96px 56px 64px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
    flex-direction: column;
    gap: 28px;
    padding: 88px 20px 28px;
  }
`

const ArtworkStage = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  min-height: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 0;
    padding: 16px 0 8px;
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    position: relative;
    top: auto;
    left: auto;
    width: ${({ $artworkWidth }) => toCssLength($artworkWidth, '100%')};
    height: ${({ $artworkHeight }) => toCssLength($artworkHeight)};
    transform: none;
    ${'' /* max-height: 40vh; */}
  }
`

const ArtworkFrame = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  ${'' /* width: min(100%, 520px); */}

  > * {
    width: 100%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: min(100%, 320px);
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

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 30px;
    padding-right: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 24px;
    max-width: none;
  }
`

const Title = styled.h2`
  letter-spacing: -1.44px;
  line-height: 1;
  font-size: ${({ theme }) => theme.typography.h3.size};
  text-box: ${({ theme }) => theme.typography.textBox};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  font-variation-settings:
    'wdth' ${({ theme }) => theme.font.width.condensed},
    'wght' ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.blue.dark};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 36px;
  }
`

const Bio = styled.p`
  color: ${({ theme }) => theme.colors.blue.dark};
  font-size: ${({ theme }) => theme.typography.formButton.size};
  line-height: 1.19;
  letter-spacing: -0.4px;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  font-variation-settings:
    'wdth' ${({ theme }) => theme.font.width.regular},
    'wght' ${({ theme }) => theme.font.weight.medium};
  text-transform: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 18px;
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 16px;
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    position: sticky;
    inset: auto;
    bottom: 0;
    justify-content: center;
    gap: 16px;
    margin-top: auto;
    padding: 24px 0 max(8px, env(safe-area-inset-bottom));
    background: linear-gradient(
      180deg,
      rgba(252, 250, 229, 0) 0%,
      rgba(252, 250, 229, 0.9) 32%,
      rgba(252, 250, 229, 1) 100%
    );
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
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
  const FrameComponent = item.FrameComponent

  useLayoutEffect(() => {
    closeRef.current?.focus()
  }, [])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const previousTouchAction = document.body.style.touchAction

    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        onNext()
        return
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        onPrev()
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
      document.body.style.touchAction = previousTouchAction
    }
  }, [onClose, onNext, onPrev])

  return (
    <Overlay>
      <Dialog
        ref={dialogRef}
        role='dialog'
        aria-modal='true'
        aria-labelledby={titleId}
        data-roots-example={item.id}
        data-roots-example-region='dialog'
      >
        <ClosePill
          ref={closeRef}
          variant='close'
          type='button'
          onClick={onClose}
        >
          Close
        </ClosePill>

        <Content>
          <ArtworkStage>
            {item.detailImage ? (
              <ArtworkImage
                $artworkWidth={item.artworkWidth}
                $artworkHeight={item.artworkHeight}
                $artworkTop={item.artworkTop}
                $artworkLeft={item.artworkLeft}
                src={item.detailImage}
                alt={`${item.title} project artwork`}
              />
            ) : (
              <ArtworkFrame aria-label={`${item.title} project artwork`}>
                <FrameComponent />
              </ArtworkFrame>
            )}
          </ArtworkStage>

          <Copy $maxWidth={item.maxWidth}>
            <Title id={titleId}>{item.title}</Title>

            <Bio>{item.bio}</Bio>

            <Roles>
              <RolesLabel>Our roles:</RolesLabel>
              <RolesList>
                {item.roles.map((role) => (
                  <Role key={`${item.id}-${role}`}>{role}</Role>
                ))}
              </RolesList>
            </Roles>
          </Copy>
        </Content>

        <NavCluster>
          <NavControl
            type='button'
            direction='left'
            aria-label='Show previous portfolio piece'
            onClick={onPrev}
          />
          <NavControl
            type='button'
            direction='right'
            aria-label='Show next portfolio piece'
            onClick={onNext}
          />
        </NavCluster>
        <MarmotAccent aria-hidden='true'>
          <RootsMarmot />
        </MarmotAccent>
      </Dialog>
    </Overlay>
  )
}
