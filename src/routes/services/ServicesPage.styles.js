import styled from 'styled-components'
import { BodyMedium } from '@/shared/ui/Typography'

export const ServiceList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding-left: 72px;
  padding-top: 222px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`

export const ServiceItem = styled.li`
  font-family: ${({ theme }) => theme.font.family};
  font-size: clamp(32px, 5vw, 64px);
  text-box: trim-both cap alphabetic;
  font-weight: ${({ theme }) => theme.font.weight.regular};
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.yellow.gold : theme.colors.blue.light};
  cursor: default;
  transition: color 400ms ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.yellow.gold};
  }
`

export const Description = styled.div`
  position: absolute;
  right: 5%;
  top: 30%;
  width: 454px;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 500ms ease-in-out;
`

export const DescriptionText = styled(BodyMedium)`
  color: ${({ theme }) => theme.colors.blue.dark};
  text-align: right;
  font-size: 20px;
  line-height: 1.4;
  text-box: trim-both cap alphabetic;
`

export const TopHatMarmotWrapper = styled.div`
  position: absolute;
  right: 145.85px;
  bottom: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`

export const DesktopServices = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
  height: 100%;
  pointer-events: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`

export const MobileServices = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
  height: 100%;
  overflow: hidden;
  pointer-events: auto;
  background: ${({ theme }) => theme.colors.blue.dark};

  @media (min-width: calc(${({ theme }) => theme.breakpoints.mobile} + 1px)) {
    display: none;
  }
`

export const MobileSceneWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 260px;
  pointer-events: none;
  z-index: 0;
`

export const MobileSceneSvg = styled.svg`
  width: 100%;
  height: 100%;
`

export const MobileLogoBadge = styled.div`
  position: absolute;
  left: 23px;
  top: 87px;
  width: 69px;
  height: 27px;
  background: ${({ theme }) => theme.colors.blue.light};
  z-index: 1;
`

export const MobileTitle = styled.h2`
  position: absolute;
  left: 19px;
  top: 124px;
  margin: 0;
  color: ${({ theme }) => theme.colors.yellow.light};
  font-family: ${({ theme }) => theme.font.family};
  font-size: 20px;
  line-height: 1.2;
  font-variation-settings:
    'wdth' 68,
    'wght' 600;
  text-transform: uppercase;
`

export const MobileLayout = styled.div`
  position: absolute;
  inset: 0;
  padding: 0 19px;
`

export const MobileList = styled.ul`
  position: absolute;
  left: 19px;
  top: 190px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 184px;
`

export const MobileItem = styled.li`
  font-family: ${({ theme }) => theme.font.family};
  font-size: 24px;
  line-height: 1.25;
  letter-spacing: -0.02em;
  font-variation-settings:
    'wdth' 100,
    'wght'
      ${({ $isActive, theme }) =>
        $isActive ? theme.font.weight.semibold : theme.font.weight.regular};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.yellow.gold : '#c0ddfa'};
  cursor: pointer;
  transition: color 200ms ease;
  width: fit-content;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: ${({ theme }) => theme.colors.yellow.gold};
    }
  }
`

export const MobileDescription = styled.div`
  position: absolute;
  right: 19px;
  top: 252px;
  width: 165px;
  color: ${({ theme }) => theme.colors.yellow.gold};
  font-family: ${({ theme }) => theme.font.family};
  font-size: 16px;
  line-height: 1.25;
  font-variation-settings:
    'wdth' 100,
    'wght' 400;
`

export const MobileMarmot = styled.div`
  position: absolute;
  right: -10px;
  bottom: -4px;
  width: 154px;
  pointer-events: none;

  svg {
    width: 100%;
    height: auto;
  }
`
