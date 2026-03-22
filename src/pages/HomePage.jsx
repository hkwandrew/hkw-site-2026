import styled from 'styled-components'
import ViewContainer from '@/components/ui/ViewContainer'
import { Display, Label, BodySmall } from '@/components/ui/Typography'

const Content = styled.div`
  position: absolute;
  bottom: 10%;
  left: 40px;
  max-width: 640px;
  z-index: 5;
`

const Subtitle = styled(Label)`
  color: ${({ theme }) => theme.colors.orange.base};
  margin-bottom: 16px;
  display: block;
`

const HeroText = styled(Display)`
  color: ${({ theme }) => theme.colors.yellow.light};
  font-size: clamp(36px, 5vw, 64px);
  margin-bottom: 0;
`

const Logo = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
  background: ${({ theme }) => theme.colors.blue.dark};
  color: ${({ theme }) => theme.colors.white};
  padding: 12px 16px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 28px;
  letter-spacing: 2px;
  z-index: 10;
`

const Footer = styled.footer`
  position: absolute;
  bottom: 20px;
  left: 40px;
  z-index: 5;
`

const FooterText = styled(BodySmall)`
  color: ${({ theme }) => theme.colors.yellow.light};
  opacity: 0.8;

  a {
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`

export default function Home({ isActive }) {
  return (
    <ViewContainer $isActive={isActive}>
      <Logo>HKW</Logo>
      <Content>
        <Subtitle>HAPPY, KNOWLEDGABLE WORK</Subtitle>
        <HeroText as="h1">
          We are a digital design and marketing studio based in Spokane, Washington.
          We build unique online experiences and engaging campaigns for non-profits and fun brands.
        </HeroText>
      </Content>
      <Footer>
        <FooterText>
          &copy; 2026 HKW &nbsp;|&nbsp; <a href="#policies">Policies</a>
        </FooterText>
      </Footer>
    </ViewContainer>
  )
}
