import { useState } from 'react'
import BlueMountain from '@/app/landscape/layers/BlueMountain'
import GoldMountain from '@/app/landscape/layers/GoldMountain'
import TreeMountain from '@/app/landscape/layers/TreeMountain'
import usePageActive from '@/shared/hooks/usePageActive'
import ViewContainer from '@/shared/ui/ViewContainer'
import services from './services'
import {
  Description,
  DescriptionEyebrow,
  DescriptionText,
  DesktopServices,
  MobileDescription,
  MobileItem,
  MobileLayout,
  MobileList,
  MobileMarmot,
  MobileSceneSvg,
  MobileSceneWrap,
  MobileServices,
  MobileTitle,
  ServiceItem,
  ServiceList,
  TopHatMarmotWrapper,
} from './ServicesPage.styles'
import TopHatMarmot from './TopHatMarmot'

export default function Services() {
  const isActive = usePageActive()
  const [activeService, setActiveService] = useState(0)
  const activeEntry = services[activeService]

  return (
    <ViewContainer $isActive={isActive}>
      <DesktopServices>
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
          <Description
            key={service.name}
            $visible={i === activeService}
            aria-hidden={i !== activeService}
            aria-label={`${service.name} service description`}
          >
            <DescriptionEyebrow>{service.name.toUpperCase()}</DescriptionEyebrow>
            <DescriptionText>{service.description}</DescriptionText>
          </Description>
        ))}
      </DesktopServices>

      {/* <MobileServices aria-label='HKW services mobile view'>
        <MobileTitle>OUR SPECIALTIES</MobileTitle>
        <MobileLayout>
          <MobileList>
            {services.map((service, i) => (
              <MobileItem
                key={service.name}
                $isActive={i === activeService}
                onClick={() => setActiveService(i)}
              >
                {service.name}
              </MobileItem>
            ))}
          </MobileList>

          <MobileDescription
            role='region'
            aria-label='Selected service description'
            aria-live='polite'
          >
            {activeEntry?.description}
          </MobileDescription>
        </MobileLayout>
        <MobileMarmot>
          <TopHatMarmot />
        </MobileMarmot>
      </MobileServices> */}
    </ViewContainer>

  )
}
