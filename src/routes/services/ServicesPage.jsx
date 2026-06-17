import { useState } from 'react'
import { useNavigate } from 'react-router'
import usePageActive from '@/shared/hooks/usePageActive'
import ViewContainer from '@/shared/ui/ViewContainer'
import services from './services'
import {
  Description,
  DescriptionEyebrow,
  DescriptionText,
  ServiceItem,
  ServiceList,
  ServicesStage,
  ServicesTitle,
  TopHatMarmotWrapper,
} from './ServicesPage.styles'
import TopHatMarmot from './TopHatMarmot'

const preloadRootsPage = () => import('../roots/RootsPage.jsx')

export default function Services() {
  const isActive = usePageActive()
  const navigate = useNavigate()
  const [activeService, setActiveService] = useState(0)
  const activeEntry = services[activeService]

  return (
    <ViewContainer $isActive={isActive}>
      <ServicesStage>
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

        <Description
          aria-label={`${activeEntry.name} service description`}
          aria-live='polite'
        >
          <DescriptionEyebrow>
            {activeEntry.name.toUpperCase()}
          </DescriptionEyebrow>
          <DescriptionText>{activeEntry.description}</DescriptionText>
        </Description>
      </ServicesStage>
      <TopHatMarmotWrapper
        type='button'
        aria-label='Enter Non-profit Roots'
        onClick={() => navigate('/roots')}
        onFocus={preloadRootsPage}
        onMouseEnter={preloadRootsPage}
      >
        <TopHatMarmot />
      </TopHatMarmotWrapper>
    </ViewContainer>
  )
}
