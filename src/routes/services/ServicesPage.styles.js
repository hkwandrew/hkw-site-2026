import styled from 'styled-components'
import { BodyMedium, applyTypography } from '@/shared/ui/Typography'

export const ServiceList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding-left: 72px;
  padding-top: 258.982px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    position: absolute;
    left: 19px;
    top: 166px;
    gap: 24px;
    width: 184px;
    padding: 0;
    z-index: 2;
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-family: ${({ theme }) => theme.font.family};
    font-size: 24px;
    line-height: 1.25;
    letter-spacing: -0.48px;
    font-weight: ${({ theme }) => theme.font.weight.regular};
    font-variation-settings:
      'wdth' 100,
      'wght' ${({ theme }) => theme.font.weight.regular};
    color: ${({ $isActive, theme }) =>
      $isActive ? theme.colors.yellow.gold : theme.colors.blue.light};
    width: fit-content;
  }
`

export const Description = styled.section`
  position: absolute;
  right: 5%;
  top: 302px;
  width: 454px;
  transition: opacity 500ms ease-in-out;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    right: 20px;
    top: 228px;
    width: 165px;
    z-index: 2;
  }

  @media (${({ theme }) => theme.breakpoints.mobile} and (max-height: 960px)) {
    position: absolute;
    right: 5%;
    top: 302px;
    width: 454px;
    transition: opacity 500ms ease-in-out;
  }

  @media (orientation: landscape) and (max-aspect-ratio: 1440 / 1024) {
    position: absolute;
    right: 20px;
    ${'' /* top: 302px; */}
    width: 454px;
    transition: opacity 500ms ease-in-out;
  }
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`

export const DescriptionText = styled(BodyMedium)`
  color: ${({ theme }) => theme.colors.blue.dark};
  text-align: right;
  font-size: 20px;
  line-height: 1.4;
  text-box: ${({ theme }) => theme.typography.textBox};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    color: ${({ theme }) => theme.colors.yellow.gold};
    font-size: 16px;
    line-height: 1.25;
    text-align: left;
    font-variation-settings:
      'wdth' 100,
      'wght' ${({ theme }) => theme.font.weight.regular};
  }

  @media (orientation: landscape) and (min-aspect-ratio: 1440 / 1024) {
    color: ${({ theme }) => theme.colors.blue.dark};
    text-align: right;
    right: 20px !important;
  }
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
    right: -16px;
    bottom: -8px;
    width: min(49vw, 193px);
    z-index: 1;
    ${'' /* transform: scaleX(-1); */}
    transform-origin: center bottom;

    svg {
      width: 100%;
      height: auto;
    }
  }
`

export const ServicesStage = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
  height: 100%;
  pointer-events: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    overflow: hidden;
    ${
      '' /* background-image: linear-gradient(
      to bottom,
      transparent 0 360px,
      ${({ theme }) => theme.colors.blue.dark} 360px 100%
    ); */
    }
  }
`

export const ServicesTitle = styled.h2`
  display: none;
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: block;
    z-index: 2;
  }
`
