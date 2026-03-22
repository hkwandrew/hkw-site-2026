import styled from 'styled-components'
import ViewContainer from './ViewContainer'
import { H5, BodyMedium, BodySmall, Label } from '@/components/ui/Typography'
import ArrowButton from '@/components/ui/ArrowButton'
import testimonials from '@/data/testimonials'

const Content = styled.div`
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  max-width: 680px;
  text-align: center;
  z-index: 5;
`

const AboutText = styled(BodyMedium)`
  color: ${({ theme }) => theme.colors.blue.dark};
  margin-bottom: 24px;
`

const BoldLink = styled.span`
  font-weight: 700;
`

const ArrowWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`

const TestimonialsSection = styled.div`
  position: absolute;
  bottom: 10%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  padding: 0 60px;
  z-index: 5;
`

const TestimonialCard = styled.div`
  max-width: 280px;
  text-align: center;
`

const Quote = styled(H5)`
  font-style: italic;
  color: ${({ theme }) => theme.colors.yellow.light};
  margin-bottom: 12px;
  font-size: clamp(16px, 2vw, 22px);
`

const Attribution = styled(BodySmall)`
  color: ${({ theme }) => theme.colors.yellow.light};
  font-weight: 600;
`

const Title = styled(BodySmall)`
  color: ${({ theme }) => theme.colors.yellow.light};
  opacity: 0.8;
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

const KindWordsLabel = styled(Label)`
  position: absolute;
  top: 90px;
  left: 40px;
  color: ${({ theme }) => theme.colors.orange.base};
  z-index: 10;
`

export default function About({ isActive }) {
  return (
    <ViewContainer $isActive={isActive}>
      <Logo>HKW</Logo>
      <KindWordsLabel>KIND WORDS</KindWordsLabel>
      <Content>
        <AboutText>
          Great design isn&apos;t just about looking good&mdash;it&apos;s about creating connection.
          At HKW, we bring curiosity, strategy, and care to every project, whether
          we&apos;re amplifying nonprofit missions or shaping distinctive brand voices.
        </AboutText>
        <AboutText>
          But don&apos;t just take our word for it&mdash;<BoldLink>here&apos;s what our clients have to say.</BoldLink>
        </AboutText>
        <ArrowWrapper>
          <ArrowButton direction="down" />
        </ArrowWrapper>
      </Content>
      <TestimonialsSection>
        {testimonials.map((t) => (
          <TestimonialCard key={t.name}>
            <Quote>&ldquo;{t.quote}&rdquo;</Quote>
            <Attribution>{t.name}</Attribution>
            <Title>{t.title}</Title>
          </TestimonialCard>
        ))}
      </TestimonialsSection>
    </ViewContainer>
  )
}
