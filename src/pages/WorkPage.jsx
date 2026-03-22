import styled from 'styled-components'
import useCarousel from '../hooks/useCarousel'
import caseStudies from '../data/caseStudies'
import ArrowButton from '../components/ui/ArrowButton'
import WorkMarmot from '../components/characters/WorkMarmot'
import ViewContainer from '@/components/ui/ViewContainer'
import usePageActive from '../hooks/usePageActive'

const ArrowCol = styled.div`
    display: flex;
    align-items: center;
    padding: 0 24px;
    pointer-events: auto;
    flex-shrink: 0;
`

const Content = styled.div`
    // position: absolute;
    flex: 1;
    display: flex;
    align-items: flex-end;
    padding: 0 0 180px;
    overflow: hidden;
`

const StudyArea = styled.div`
    display: flex;
    gap: 40px;
    width: 100%;
    align-items: flex-end;
`

const StudyText = styled.div`
    flex: 0 0 365px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const ClientName = styled.h2`
    font-size: 64px;
    font-weight: 600;
    line-height: 1;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.colors.orange.base};
`

const Quote = styled.p`
    font-size: 20px;
    font-weight: 500;
    line-height: 1.19;
    letter-spacing: -0.4px;
    color: ${({ theme }) => theme.colors.blue.dark};
    font-style: italic;
`

const Attribution = styled.p`
    font-size: 18px;
    font-weight: 400;
    font-style: italic;
    color: ${({ theme }) => theme.colors.blue.dark};
    opacity: 0.8;
`

const Services = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 0;
    list-style: none;
    padding: 0;
    margin: 0;
`

const ServiceTag = styled.li`
    font-size: 18px;
    font-weight: 600;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.blue.dark};
`

const HeroImage = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;

    img {
        max-width: 100%;
        max-height: 520px;
        object-fit: contain;
        transform: rotate(-0.5deg);
        filter: drop-shadow(4px 8px 16px rgba(0, 0, 0, 0.2));
    }
`

const Dots = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 24px;
    pointer-events: auto;
`

const Dot = styled.span`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ $active, theme }) =>
        $active ? theme.colors.orange.base : theme.colors.blue.dark};
    opacity: ${({ $active }) => ($active ? 1 : 0.3)};
    cursor: pointer;
    transition: all 200ms ease;
`

const MarmotWrapper = styled.div`
    position: absolute;
    top: 142px;
    right: 114.84px;
    pointer-events: none;
`

const WorkPage = () => {
    const isActive = usePageActive()
    const { index, next, prev, goTo } = useCarousel(caseStudies.length)
    const study = caseStudies[index]

    return (
        <ViewContainer $isActive={isActive}>
            <MarmotWrapper>
                <WorkMarmot />
            </MarmotWrapper>
            <ArrowCol>
                <ArrowButton direction="left" onClick={prev} />
            </ArrowCol>

            <Content>
                <StudyArea>
                    <StudyText key={study.id}>
                        <ClientName>{study.name}</ClientName>
                        <Quote>{study.quote}</Quote>
                        <Attribution>&mdash;{study.attribution}</Attribution>
                        <Services>
                            {study.services.map((service) => (
                                <ServiceTag key={service}>{service}</ServiceTag>
                            ))}
                        </Services>
                        <Dots>
                            {caseStudies.map((cs, i) => (
                                <Dot
                                    key={cs.id}
                                    $active={i === index}
                                    onClick={() => goTo(i)}
                                />
                            ))}
                        </Dots>
                    </StudyText>

                    {study.image && (
                        <HeroImage>
                            <img src={study.image} alt={study.name} />
                        </HeroImage>
                    )}
                </StudyArea>
            </Content>

            <ArrowCol>
                <ArrowButton direction="right" onClick={next} />
            </ArrowCol>
        </ViewContainer>
    )
}

export default WorkPage
