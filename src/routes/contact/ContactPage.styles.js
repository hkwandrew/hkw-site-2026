import styled from 'styled-components'
import PillButton from '@/shared/ui/PillButton'

const PHONE_BREAKPOINT = ({ theme }) => theme.breakpoints.mobile

export const Page = styled.section`
  position: absolute;
  top: 0;
  width: 100%;
  min-height: 100dvh;
  overflow-x: hidden;
  overflow-y: auto;

  @media (max-width: ${PHONE_BREAKPOINT}) {
    background-image: linear-gradient(
      to bottom,
      ${({ theme }) => theme.colors.yellow.light} 20%,
      ${({ theme }) => theme.colors.orange.base} 20%,
      ${({ theme }) => theme.colors.orange.base} 100%
    );
  }
`

export const DesktopStage = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;

  @media (max-width: ${PHONE_BREAKPOINT}) {
    display: none;
  }
`

export const DesktopPanel = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 365px;
  overflow: visible;
`

export const DesktopCloseWrapper = styled.div`
  position: absolute;
  top: -55px;
  left: 50%;
  transform: translateX(-50%);
`

export const Title = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.yellow.light};
  text-align: center;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.font.family};
  font-variation-settings: 'wdth' 68;
  font-size: clamp(24px, 4vw, 40px);
  font-weight: ${({ theme }) => theme.font.weight.medium};
`

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  font-family: ${({ theme }) => theme.font.family};
  font-size: 16px;
  font-weight: ${({ theme }) => theme.font.weight.regular};
  line-height: calc(29 / 16);
`

export const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ $layout }) => ($layout === 'phone' ? '14px' : '8px')};
  width: ${({ $layout }) => ($layout === 'phone' ? '300px' : '365px')};
  margin-top: ${({ $layout }) => ($layout === 'phone' ? '18px' : '31px')};
`

export const SubmitRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ $layout }) => ($layout === 'phone' ? '4px' : '16px')};
`

export const SubmitButton = styled(PillButton)`
  width: 145px;
  min-width: 145px;
  height: 47px;
  padding: 0 20px;
  font-size: 20px;
  line-height: 1;
  font-variation-settings: 'wdth' 68;
`

export const RequiredNote = styled.p`
  margin: ${({ $layout }) => ($layout === 'phone' ? '2px 0 0' : '14px 0 0')};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  font-family: ${({ theme }) => theme.font.family};
  font-size: 16px;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  line-height: calc(24 / 16);
  text-transform: uppercase;
  letter-spacing: 1.6px;
  font-variation-settings: 'wdth' 68;
`

export const PhoneStage = styled.section`
  display: none;

  @media (max-width: ${PHONE_BREAKPOINT}) {
    display: block;
    position: relative;
    min-height: 100dvh;
    padding: 42px 20px 28px;
    isolation: isolate;

    &::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 21px;
      width: 620px;
      height: calc(100dvh - 21px);
      transform: translateX(-50%);
      background: ${({ theme }) => theme.colors.orange.base};
      border-radius: 50%;
      z-index: 0;
    }
  }
`

export const PhonePanel = styled.div`
  display: none;

  @media (max-width: ${PHONE_BREAKPOINT}) {
    position: relative;
    z-index: 1;
    top: 42px;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: calc(100dvh - 148px);
  }
`

export const PhoneSubtitle = styled(Subtitle)`
  @media (max-width: ${PHONE_BREAKPOINT}) {
    margin-top: 6px;
    font-size: 14px;
    line-height: 1.42857;
  }
`

export const PhoneTitle = styled(Title)`
  @media (max-width: ${PHONE_BREAKPOINT}) {
    font-size: 24px;
    line-height: calc(26 / 24);
    font-variation-settings:
      'wght' 600,
      'wdth' 68;
  }
`
