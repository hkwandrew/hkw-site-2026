import styled from 'styled-components'
import ArrowButton from '@/shared/ui/ArrowButton'
import ViewContainer from '@/shared/ui/ViewContainer'

export const Page = styled(ViewContainer)`
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    overflow-y: auto;
  }
`

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
  padding: 190px 120px 186px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 180px 72px 190px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    align-items: flex-start;
    padding: 112px 20px 36px;
  }
`

export const StudyArea = styled.div`
  display: flex;
  align-items: center;
  gap: 56px;
  width: min(100%, 1150px);
  min-height: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 36px;
    width: min(100%, 1000px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: stretch;
    gap: 24px;
    width: 100%;
  }
`

export const StudyText = styled.div`
  flex: 0 0 365px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-basis: 340px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-basis: auto;
    width: 100%;
    gap: 16px;
  }
`

export const ClientName = styled.h2`
  font-size: 64px;
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.orange.base};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 48px;
  }
`

export const Quote = styled.p`
  font-size: 20px;
  font-weight: 500;
  line-height: 1.19;
  letter-spacing: -0.4px;
  color: ${({ theme }) => theme.colors.blue.dark};
  font-style: italic;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 18px;
  }
`

export const Attribution = styled.p`
  font-size: 18px;
  font-weight: 400;
  font-style: italic;
  color: ${({ theme }) => theme.colors.blue.dark};
  opacity: 0.8;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 16px;
  }
`

export const Services = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0;
  list-style: none;
  padding: 0;
  margin: 0;
`

export const ServiceTag = styled.li`
  font-size: 18px;
  font-weight: 600;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.blue.dark};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 16px;
  }
`

export const HeroImage = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;

  img {
    width: min(100%, 720px);
    max-height: 520px;
    object-fit: contain;
    transform: rotate(-0.5deg);
    filter: drop-shadow(4px 8px 16px rgba(0, 0, 0, 0.2));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    justify-content: flex-end;

    img {
      width: min(100%, 280px);
      max-height: 220px;
    }
  }
`

export const DesktopNavRail = styled.div`
  position: absolute;
  bottom: 48px;
  left: 50%;
  z-index: 3;
  display: flex;
  justify-content: center;
  width: min(calc(100% - 144px), 1296px);
  padding: 0 4px 10px;
  overflow-x: auto;
  transform: translateX(-50%);
  pointer-events: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`

export const DesktopNavStrip = styled.div`
  display: flex;
  gap: 12px;
  width: max-content;
`

export const MobileNavRail = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: block;
    width: calc(100% + 8px);
    margin-right: -8px;
    overflow-x: auto;
    pointer-events: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`

export const MobileNavStrip = styled.div`
  display: flex;
  gap: 8px;
  width: max-content;
  padding: 4px 8px 8px 0;
`

export const NavButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: ${({ $compact }) => ($compact ? '56px' : '96px')};
  height: ${({ $compact }) => ($compact ? '56px' : '96px')};
  padding: 0;
  border: none;
  border-radius: ${({ $compact }) => ($compact ? '18px' : '28px')};
  background: transparent;
  cursor: pointer;
  pointer-events: auto;
  -webkit-tap-highlight-color: transparent;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.yellow.gold};
    outline-offset: 4px;
  }
`

export const NavVisual = styled.span`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
`

export const NavIconLayer = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  mix-blend-mode: darken;
  pointer-events: none;
  filter: ${({ $current }) =>
    $current ? 'drop-shadow(-3px 5px 0 #D0471B)' : 'none'};
  transition: filter 200ms ease;

  ${NavButton}:hover &,
  ${NavButton}:focus-visible & {
    filter: drop-shadow(-3px 5px 0 #D0471B);
  }
`

export const FallbackDot = styled.span`
  width: ${({ $compact }) => ($compact ? '10px' : '14px')};
  height: ${({ $compact }) => ($compact ? '10px' : '14px')};
  border-radius: 50%;
  background: ${({ $current, theme }) =>
    $current ? theme.colors.orange.base : theme.colors.blue.dark};
  opacity: ${({ $current }) => ($current ? 1 : 0.28)};
  transition: opacity 200ms ease, background-color 200ms ease;

  ${NavButton}:hover &,
  ${NavButton}:focus-visible & {
    background: ${({ theme }) => theme.colors.orange.base};
    opacity: 1;
  }
`

export const MarmotWrapper = styled.div`
  position: absolute;
  top: 142px;
  right: 114.84px;
  z-index: 2;
  pointer-events: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    right: 72px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    top: 110px;
    right: 12px;
    transform: scale(0.74);
    transform-origin: top right;
  }
`

export const DesktopArrowButton = styled(ArrowButton)`
  position: absolute;
  top: 50%;
  z-index: 3;
  pointer-events: auto;
  transform: translateY(-50%);

  ${({ $side }) => ($side === 'left' ? 'left: 24px;' : 'right: 24px;')}

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`
