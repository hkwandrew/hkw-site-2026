import { useState } from 'react'
import styled from 'styled-components'
import ViewContainer from './ViewContainer'
import { Label, BodyMedium } from '@/components/ui/Typography'
import services from '@/data/services'

const Content = styled.div`
  position: absolute;
  top: 100px;
  left: 40px;
  max-width: 600px;
  z-index: 5;
`

const Subtitle = styled(Label)`
  color: ${({ theme }) => theme.colors.yellow.light};
  margin-bottom: 24px;
  display: block;
`

const ServiceList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const ServiceItem = styled.li`
  font-family: ${({ theme }) => theme.font.family};
  font-size: clamp(28px, 4vw, 48px);
  font-weight: ${({ $isActive }) => ($isActive ? 600 : 500)};
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.blue.light : theme.colors.yellow.light};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.blue.light};
  }
`

const Description = styled.div`
  position: absolute;
  right: -380px;
  top: 50%;
  transform: translateY(-50%);
  width: 320px;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: ${({ theme }) => theme.transition.medium};
`

const DescriptionText = styled(BodyMedium)`
  color: ${({ theme }) => theme.colors.yellow.light};
  text-align: center;
`

const Logo = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
  color: ${({ theme }) => theme.colors.blue.light};
  font-weight: 700;
  font-size: 28px;
  font-style: italic;
  letter-spacing: 2px;
  z-index: 10;
`

export default function Services({ isActive }) {
  const [activeService, setActiveService] = useState(0)

  return (
    <ViewContainer $isActive={isActive}>
      <Logo>HKW</Logo>
      <Content>
        <Subtitle>OUR SPECIALTIES</Subtitle>
        <ServiceList>
          {services.map((service, i) => (
            <ServiceItem
              key={service.name}
              $isActive={i === activeService}
              onClick={() => setActiveService(i)}
              onMouseEnter={() => setActiveService(i)}
            >
              {service.name}
            </ServiceItem>
          ))}
        </ServiceList>
        <Description $visible={activeService !== null}>
          <DescriptionText>
            {services[activeService]?.description}
          </DescriptionText>
        </Description>
      </Content>
    </ViewContainer>
  )
}
