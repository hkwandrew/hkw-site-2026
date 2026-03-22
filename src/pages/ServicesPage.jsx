import { useState } from 'react'
import styled from 'styled-components'
import { BodyMedium } from '@/components/ui/Typography'
import services from '@/data/services'
import ViewContainer from '@/components/ui/ViewContainer'
import usePageActive from '@/hooks/usePageActive'

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

export default function Services() {
    const isActive = usePageActive()
    const [activeService, setActiveService] = useState(0)

    return (
        <ViewContainer $isActive={isActive}>
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
        </ViewContainer>
    )
}
