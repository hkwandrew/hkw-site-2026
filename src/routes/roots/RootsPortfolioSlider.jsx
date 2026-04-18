import { useEffect, useId, useLayoutEffect, useRef } from 'react'
import styled from 'styled-components'
import ArrowButton from '@/shared/ui/ArrowButton'
import RootsMarmot from './RootsMarmot'
import frameBackground from './assets/roots-slider/frame.png'

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
  overflow: auto;
  color: ${({ theme }) => theme.colors.blue.dark};

  &::before {
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

const ClosePill = styled.button`
  position: absolute;
  top: 30px;
  right: 34px;
  z-index: 3;
  min-width: 96px;
  padding: 16px 21px 14px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.orange.base};
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.font.family};
  font-size: 24px;
  line-height: 1.08;
  text-transform: uppercase;
  font-variation-settings:
    'wdth' 75,
    'wght' ${({ theme }) => theme.font.weight.semibold};
  transition:
    transform 180ms ease,
    background 180ms ease,
    box-shadow 180ms ease;

  &:hover {
    background: ${({ theme }) => theme.colors.orange.dark};
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.yellow.gold};
    outline-offset: 4px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    top: 18px;
    right: 18px;
    min-width: 84px;
    padding: 13px 17px 12px;
    font-size: 20px;
  }
`

const Content = styled.div`
  position: relative;
  z-index: 2;
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
  padding: 36px 12px 60px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 0;
    padding: 16px 0 8px;
  }
`

const ArtworkGlow = styled.div`
  position: absolute;
  inset: 17% 4% 13%;
  border-radius: 28px;
  background:
    radial-gradient(
      circle at 42% 34%,
      rgba(255, 255, 255, 0.72) 0,
      rgba(255, 255, 255, 0.22) 30%,
      transparent 62%
    ),
    linear-gradient(
      180deg,
      rgba(250, 156, 56, 0.11) 0%,
      rgba(250, 156, 56, 0.03) 100%
    );
  filter: blur(8px);
  pointer-events: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    inset: 10% 0 0;
  }
`

const ArtworkImage = styled.img`
  position: relative;
  z-index: 1;
  width: min(100%, 720px);
  max-height: min(66vh, 728px);
  object-fit: contain;
  filter: drop-shadow(0 22px 28px rgba(28, 45, 56, 0.18));

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    max-height: 40vh;
  }
`

const Copy = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-self: center;
  gap: 42px;
  width: 100%;
  max-width: 417px;
  min-width: 0;
  padding-right: 24px;

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
  margin: 0;
  font-size: 48px;
  line-height: 1;
  letter-spacing: -0.02em;
  font-variation-settings:
    'wdth' 90,
    'wght' ${({ theme }) => theme.font.weight.semibold};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 36px;
  }
`

const QuoteBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: ${({ theme }) => theme.colors.blue.dark};
`

const Quote = styled.p`
  margin: 0;
  font-size: 20px;
  line-height: 1.19;
  letter-spacing: -0.4px;
  font-style: italic;
  font-variation-settings:
    'wdth' 100,
    'wght'
      ${({ theme, $placeholder }) =>
        $placeholder ? theme.font.weight.semibold : theme.font.weight.medium};
  opacity: ${({ $placeholder }) => ($placeholder ? 0.72 : 1)};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 18px;
  }
`

const Attribution = styled.p`
  margin: 0;
  font-size: 18px;
  line-height: 1.1;
  font-style: italic;
  opacity: ${({ $placeholder }) => ($placeholder ? 0.6 : 0.8)};
  font-variation-settings:
    'wdth' 90,
    'wght' ${({ theme }) => theme.font.weight.regular};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 16px;
  }
`

const Roles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const RolesLabel = styled.p`
  margin: 0;
  font-size: 18px;
  line-height: 1.3;
  font-variation-settings:
    'wdth' 100,
    'wght' ${({ theme }) => theme.font.weight.regular};
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
  font-size: 18px;
  line-height: 1.5;
  font-variation-settings:
    'wdth' 100,
    'wght'
      ${({ theme, $placeholder }) =>
        $placeholder ? theme.font.weight.medium : theme.font.weight.semibold};
  opacity: ${({ $placeholder }) => ($placeholder ? 0.72 : 1)};

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
  padding: 0 38px;

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
  box-shadow: 0 12px 24px rgba(28, 45, 56, 0.18);

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
  z-index: 0;
  width: min(26vw, 264px);
  pointer-events: none;
  opacity: 0.98;

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
  const isPlaceholderCopy = item.quote === 'TBD'
  const hasPlaceholderRoles = item.roles.length === 1 && item.roles[0] === 'TBD'

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
      >
        {/* <FrameChrome aria-hidden='true'>
          <FrameSide
            src={frameLeft}
            alt=''
            $top='-44px'
            $left='-175px'
            $width='205px'
            $height='1099px'
            $mobileTop='-2.4%'
            $mobileLeft='-9%'
            $mobileWidth='16%'
            $mobileHeight='105%'
          />
          <FrameSide
            src={frameRight}
            alt=''
            $top='-1.33%'
            $right='-12.26%'
            $width='14.25%'
            $height='110.18%'
            $mobileTop='-1.2%'
            $mobileRight='-9%'
            $mobileWidth='16%'
            $mobileHeight='104%'
          />
          <HorizontalFrame
            src={frameHorizontal}
            alt=''
            $top='-23.95%'
            $left='-1.92%'
            $width='103.85%'
            $height='26.5%'
            $mobileTop='-14%'
            $mobileLeft='-3%'
            $mobileWidth='106%'
            $mobileHeight='18%'
          />
          <HorizontalFrame
            src={frameHorizontal}
            alt=''
            $bottom='-23.05%'
            $left='-1.92%'
            $width='103.85%'
            $height='26.5%'
            $flipY
            $mobileBottom='-14%'
            $mobileLeft='-3%'
            $mobileWidth='106%'
            $mobileHeight='18%'
          />
        </FrameChrome> */}

        <ClosePill ref={closeRef} type='button' onClick={onClose}>
          Close
        </ClosePill>

        <Content>
          <ArtworkStage>
            <ArtworkGlow aria-hidden='true' />
            <ArtworkImage
              src={item.detailImage}
              alt={`${item.title} project artwork`}
            />
          </ArtworkStage>

          <Copy>
            <Title id={titleId}>{item.title}</Title>

            <QuoteBlock>
              <Quote $placeholder={isPlaceholderCopy}>{item.quote}</Quote>
              <Attribution $placeholder={isPlaceholderCopy}>
                {item.attribution}
              </Attribution>
            </QuoteBlock>

            <Roles>
              <RolesLabel>Our roles:</RolesLabel>
              <RolesList>
                {item.roles.map((role) => (
                  <Role
                    key={`${item.id}-${role}`}
                    $placeholder={hasPlaceholderRoles && role === 'TBD'}
                  >
                    {role}
                  </Role>
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
