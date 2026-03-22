import { useState } from 'react'
import styled from 'styled-components'
import { BodyMedium } from '@/components/ui/Typography'
import services from '@/data/services'
import ViewContainer from '@/components/ui/ViewContainer'
import usePageActive from '@/hooks/usePageActive'
import TopHatMarmot from '../components/characters/TopHatMarmot'

const ServiceList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding-left: 30px;
  padding-top: 167px;
`

const ServiceItem = styled.li`
  font-family: ${({ theme }) => theme.font.family};
  font-size: clamp(32px, 5vw, 64px);
  text-box: trim-both cap alphabetic;
  font-weight: ${({ theme }) => theme.font.weight.regular};
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: ${({ $isActive, theme }) =>
        $isActive ? theme.colors.yellow.gold : theme.colors.blue.light};
  cursor: pointer;
  transition: color 400ms ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.yellow.gold};
  }
`

const Description = styled.div`
  position: absolute;
  right: 5%;
  top: 30%;
  width: 454px;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 500ms ease-in-out;
`

const DescriptionText = styled(BodyMedium)`
  color: ${({ theme }) => theme.colors.blue.dark};
  text-align: right;
  font-size: 20px;
  line-height: 1.4;
  text-box: trim-both cap alphabetic;
`

const TopHatMarmotWrapper = styled.div`
  position: absolute;
  right: 145.85px;
  bottom: 0;
`

export default function Services() {
    const isActive = usePageActive()
    const [activeService, setActiveService] = useState(0)

    return (
        <ViewContainer $isActive={isActive}>
            <TopHatMarmotWrapper>
                <TopHatMarmot />
            </TopHatMarmotWrapper>
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
            {services.map((service, i) => (
                <Description key={service.name} $visible={i === activeService}>
                    <DescriptionText>
                        {service.description}
                    </DescriptionText>
                </Description>
            ))}
        </ViewContainer>
    )
}
