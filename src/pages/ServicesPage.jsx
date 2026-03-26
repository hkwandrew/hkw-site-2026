import { useState } from 'react'
import styled from 'styled-components'
import { BodyMedium } from '@/components/ui/Typography'
import services from '@/data/services'
import ViewContainer from '@/components/ui/ViewContainer'
import usePageActive from '@/hooks/usePageActive'
import TopHatMarmot from '../components/characters/TopHatMarmot'
import BlueMountain from '@/components/BlueMountain'
import GoldMountain from '@/components/GoldMountain'
import TreeMountain from '@/components/TreeMountain'

const ServiceList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding-left: 30px;
  padding-top: 167px;

  @media (max-width: 767px) {
    display: none;
  }
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

  @media (max-width: 767px) {
    display: none;
  }
`

const DesktopServices = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
  height: 100%;
  pointer-events: auto;

  @media (max-width: 767px) {
    display: none;
  }
`

const MobileServices = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
  height: 100%;
  overflow: hidden;
  pointer-events: auto;
  background: ${({ theme }) => theme.colors.blue.dark};

  @media (min-width: 768px) {
    display: none;
  }
`

const MobileSceneWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 260px;
  pointer-events: none;
  z-index: 0;
`

const MobileSceneSvg = styled.svg`
  width: 100%;
  height: 100%;
`

const MobileLogoBadge = styled.div`
  position: absolute;
  left: 23px;
  top: 87px;
  width: 69px;
  height: 27px;
  background: ${({ theme }) => theme.colors.blue.light};
  z-index: 1;
`

const MobileTitle = styled.h2`
  position: absolute;
  left: 19px;
  top: 124px;
  margin: 0;
  color: ${({ theme }) => theme.colors.yellow.light};
  font-family: ${({ theme }) => theme.font.family};
  font-size: 20px;
  line-height: 1.2;
  font-variation-settings:
    'wdth' 68,
    'wght' 600;
  text-transform: uppercase;
`

const MobileLayout = styled.div`
  position: absolute;
  inset: 0;
  padding: 0 19px;
`

const MobileList = styled.ul`
  position: absolute;
  left: 19px;
  top: 190px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 184px;
`

const MobileItem = styled.li`
  font-family: ${({ theme }) => theme.font.family};
  font-size: 24px;
  line-height: 1.25;
  letter-spacing: -0.02em;
  font-variation-settings:
    'wdth' 100,
    'wght'
      ${({ $isActive, theme }) =>
        $isActive ? theme.font.weight.semibold : theme.font.weight.regular};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.yellow.gold : '#c0ddfa'};
  cursor: pointer;
  transition: color 200ms ease;
  width: fit-content;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: ${({ theme }) => theme.colors.yellow.gold};
    }
  }
`

const MobileDescription = styled.div`
  position: absolute;
  right: 19px;
  top: 252px;
  width: 165px;
  color: ${({ theme }) => theme.colors.yellow.gold};
  font-family: ${({ theme }) => theme.font.family};
  font-size: 16px;
  line-height: 1.25;
  font-variation-settings:
    'wdth' 100,
    'wght' 400;
`

const MobileMarmot = styled.div`
  position: absolute;
  right: -10px;
  bottom: -4px;
  width: 154px;
  pointer-events: none;

  svg {
    width: 100%;
    height: auto;
  }
`

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
          <Description key={service.name} $visible={i === activeService}>
            <DescriptionText>{service.description}</DescriptionText>
          </Description>
        ))}
      </DesktopServices>

      <MobileServices aria-label='HKW services mobile view'>
        <MobileSceneWrap aria-hidden='true'>
          <MobileSceneSvg
            viewBox='1380 150 980 700'
            preserveAspectRatio='xMidYMin slice'
          >
            <path
              d='M3960,0L0,0v1014h3975.5L3960,0Z'
              transform='translate(-1.849932 0)'
              fill='#fcfae5'
            />
            <BlueMountain />
            <GoldMountain />
            <TreeMountain />
          </MobileSceneSvg>
        </MobileSceneWrap>
        <MobileLogoBadge />
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

          <MobileDescription>{activeEntry?.description}</MobileDescription>
        </MobileLayout>
        <MobileMarmot>
          <TopHatMarmot />
        </MobileMarmot>
      </MobileServices>
    </ViewContainer>
  )
}
