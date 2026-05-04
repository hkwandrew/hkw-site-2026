import styled from 'styled-components'
import { BodyMedium, applyTypography } from '@/shared/ui/Typography'

export const ServiceList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding-left: 72px;
  padding-top: 258.982px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`

export const ServiceItem = styled.li`
  ${applyTypography('h2')}
  text-box: ${({ theme }) => theme.typography.textBox};
  font-weight: ${({ theme }) => theme.font.weight.regular};
  font-variation-settings:
    'wdth' ${({ theme }) => theme.typography.h2.width},
    'wght' ${({ theme }) => theme.font.weight.regular};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.yellow.gold : theme.colors.blue.light};
  cursor: default;
  transition: color 400ms ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.yellow.gold};
  }
`

export const Description = styled.section`
  position: absolute;
  right: 5%;
  top: 302px;
  width: 454px;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 500ms ease-in-out;
`

export const DescriptionEyebrow = styled.p`
  margin: 0 0 18px;
  color: ${({ theme }) => theme.colors.blue.dark};
  font-family: ${({ theme }) => theme.font.family};
  font-size: 24px;
  font-weight: ${({ theme }) => theme.font.weight.bold};
  font-variation-settings:
    'wdth' ${({ theme }) => theme.font.width.condensed},
    'wght' ${({ theme }) => theme.font.weight.bold};
  line-height: 26px;
  text-align: right;
  text-box: ${({ theme }) => theme.typography.textBox};
`

export const DescriptionText = styled(BodyMedium)`
  color: ${({ theme }) => theme.colors.blue.dark};
  text-align: right;
  font-size: 20px;
  line-height: 1.4;
  text-box: ${({ theme }) => theme.typography.textBox};
`

export const TopHatMarmotWrapper = styled.div`
  position: absolute;
  right: 145.85px;
  bottom: 0;

  svg {
    display: block;
  }

  @media (min-width: 768px) and (max-height: 820px) {
    right: 5.32%;
    bottom: -2.52%;
    width: 258px;

    svg {
      width: 100%;
      height: auto;
    }
  }

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

export const MobileTitle = styled.h2`
  position: absolute;
  left: 19px;
  top: 142px;
  margin: 0;
  color: ${({ theme }) => theme.colors.white};
  ${applyTypography('formButton')}
  font-weight: ${({ theme }) => theme.font.weight.semibold};
  font-variation-settings:
    'wdth' ${({ theme }) => theme.typography.formButton.width},
    'wght' 600;
  line-height: 24px;
  text-box: ${({ theme }) => theme.typography.textBox};
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
  gap: 16px;
  width: 184px;
`

export const MobileItem = styled.li`
  font-family: ${({ theme }) => theme.font.family};
  font-size: 24px;
  line-height: 1.25;
  letter-spacing: -0.02em;
  font-weight: ${({ theme }) => theme.font.weight.regular};
  font-variation-settings:
    'wdth' 100,
    'wght' ${({ theme }) => theme.font.weight.regular};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.yellow.gold : theme.colors.blue.pale};
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
  bottom: -3%;
  width: min(49vw, 193px);
  pointer-events: none;

  svg {
    width: 100%;
    height: auto;
  }
`
