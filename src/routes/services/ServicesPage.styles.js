import styled from 'styled-components'
import { BodyMedium, applyTypography } from '@/shared/ui/Typography'
import { MEDIA_QUERIES } from '@/styles/breakpoints'
import { DESKTOP_VIEWPORT_ASPECT_RATIO } from '@/styles/viewportUnits'

export const ServiceList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding-left: 72px;
  padding-top: 258.982px;

  @media ${MEDIA_QUERIES.mobilePortrait} {
    position: absolute;
    left: 19px;
    top: 127px;
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

  @media ${MEDIA_QUERIES.mobilePortrait} {
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
  right: 70px;
  top: 302px;
  max-width: 454px;
  transition: opacity 500ms ease-in-out;

  @media ${MEDIA_QUERIES.mobilePortrait} {
    max-width: 165px;
    top: 251px;
    right: 20px;
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

  @media ${MEDIA_QUERIES.mobilePortrait} {
    display: none;
  }
`

export const DescriptionText = styled(BodyMedium)`
  color: ${({ theme }) => theme.colors.blue.dark};
  text-align: right;
  font-size: 20px;
  line-height: 1.4;
  letter-spacing: -0.32px;
  text-box: ${({ theme }) => theme.typography.textBox};

  @media ${MEDIA_QUERIES.mobilePortrait} {
    color: ${({ theme }) => theme.colors.yellow.gold};
    font-size: 16px;
    line-height: 1.25;
    text-align: left;
    font-variation-settings:
      'wdth' 100,
      'wght' ${({ theme }) => theme.font.weight.regular};
  }
`

export const TopHatMarmotWrapper = styled.div`
  position: absolute;
  right: 76.64px;
  bottom: -25.55px;
  width: 362.902px;

  svg {
    display: block;
    width: 100%;
  }

  @media ${MEDIA_QUERIES.mobilePortrait} {
    right: -14.9px;
    bottom: -21px;
    width: 192.738px;
    z-index: 1;
    transform-origin: center bottom;

    svg {
      height: auto;
    }
  }
`

export const ServicesStage = styled.div`
  position: relative;
  container: services-stage / size;
  width: 100%;
  flex: 1;
  height: 100%;
  overflow: hidden;
  pointer-events: auto;
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

  @media ${MEDIA_QUERIES.mobilePortrait} {
    display: block;
    z-index: 2;
  }
`
