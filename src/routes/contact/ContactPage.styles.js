import styled from 'styled-components'
import PillButton from '@/shared/ui/PillButton'
import { applyTypography } from '@/shared/ui/Typography'

const PHONE_BREAKPOINT = ({ theme }) => theme.breakpoints.mobile

export const Page = styled.section`
  position: absolute;
  top: 0;
  width: 100%;
  min-height: 100dvh;
  overflow-x: hidden;
  overflow-y: auto;
`

export const Stage = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;

  @media (max-width: ${PHONE_BREAKPOINT}) {
    display: block;
    position: relative;
    padding: 42px 20px 28px;
  }
`

export const Panel = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 365px;
  overflow: visible;

  @media (max-width: ${PHONE_BREAKPOINT}) {
    z-index: 1;
    top: 24px;
    width: 100%;
    min-height: calc(100dvh - 148px);
  }
`

export const CloseWrapper = styled.div`
  position: absolute;
  top: -55px;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: ${PHONE_BREAKPOINT}) {
    display: none;
  }
`

export const Title = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.peach};
  text-align: center;
  ${applyTypography('h4')}
  font-variation-settings:
    'wdth' ${({ theme }) => theme.font.width.condensed},
    'wght' ${({ theme }) => theme.font.weight.medium};
  text-transform: uppercase;
  line-height: normal;
  font-size: 40px;
  letter-spacing: unset;

  @media (max-width: ${PHONE_BREAKPOINT}) {
    ${applyTypography('pillButton')}
    color: ${({ theme }) => theme.colors.yellow.light};
    text-box: unset !important;
  }
`

export const Subtitle = styled.p`
  margin: 8px 0 0;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  font-size: 16px;
  font-variation-settings:
    'wdth' ${({ theme }) => theme.font.width.regular},
    'wght' ${({ theme }) => theme.font.weight.regular};
  line-height: calc(29 / 16);

  @media (max-width: ${PHONE_BREAKPOINT}) {
    margin: 6px 0 0;
    font-size: 14px;
    line-height: 1.42857;
  }
`

export const ContactForm = styled.form`
  --hkw-field-density: regular;

  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 365px;
  margin-top: 48px;

  @media (max-width: ${PHONE_BREAKPOINT}) {
    --hkw-field-density: compact;

    gap: 0;
    width: 300px;
    margin-top: 18px;
  }
`

export const SubmitRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;

  @media (max-width: ${PHONE_BREAKPOINT}) {
    margin-top: 12px;
  }
`

export const SubmitButton = styled(PillButton)`
  width: ${({ theme }) => theme.components.formButton.width};
  min-width: ${({ theme }) => theme.components.formButton.width};
  padding-inline: 30px;
  height: ${({ theme }) => theme.components.formButton.height};
  color: ${({ theme }) => theme.colors.white};
  text-box: trim-both cap alphabetic;

  &:disabled {
    cursor: wait;
    opacity: 0.72;
  }

  @media (max-width: ${PHONE_BREAKPOINT}) {
    font-size: 16px;
  }
`

export const FormStatus = styled.p`
  min-height: 20px;
  margin: 4px 0 0;
  color: ${({ theme, $tone }) =>
    $tone === 'error' ? theme.colors.peach : theme.colors.yellow.light};
  text-align: center;
  font-size: 14px;
  font-style: italic;
  font-variation-settings:
    'wdth' ${({ theme }) => theme.font.width.semicondensed},
    'slnt' ${({ theme }) => theme.font.slant.italic};
  line-height: 1.35;
`

export const RequiredNote = styled.p`
  margin: 14px 0 0;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  ${applyTypography('label')}

  @media (max-width: ${PHONE_BREAKPOINT}) {
    margin-top: 2px;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 1.4px;
  }
`
