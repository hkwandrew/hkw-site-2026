import useCarousel from '@/shared/hooks/useCarousel'
import usePageActive from '@/shared/hooks/usePageActive'
import caseStudies from './caseStudies'
import WorkMarmot from './WorkMarmot'
import {
  Attribution,
  ClientName,
  DesktopArrowButton,
  DesktopNavRail,
  DesktopNavStrip,
  FallbackDot,
  HeroImage,
  MainContent,
  MarmotWrapper,
  MobileNavRail,
  MobileNavStrip,
  NavButton,
  NavIconLayer,
  NavVisual,
  Page,
  Quote,
  ServiceTag,
  Services,
  StudyArea,
  StudyText,
} from './WorkPage.styles'

const renderNavButtons = (currentIndex, goTo, compact = false) =>
  caseStudies.map((caseStudy, itemIndex) => {
    const isCurrent = itemIndex === currentIndex
    const hasIcon = Boolean(caseStudy.navIcon)

    return (
      <NavButton
        key={`${compact ? 'mobile' : 'desktop'}-${caseStudy.id}`}
        type='button'
        aria-label={`Show ${caseStudy.name}`}
        aria-current={isCurrent ? 'true' : undefined}
        data-nav-kind={hasIcon ? 'icon' : 'dot'}
        $compact={compact}
        onClick={() => goTo(itemIndex)}
      >
        <NavVisual>
          {hasIcon ? (
            <NavIconLayer
              src={caseStudy.navIcon}
              alt=''
              aria-hidden='true'
              $current={isCurrent}
            />
          ) : (
            <FallbackDot $compact={compact} $current={isCurrent} />
          )}
        </NavVisual>
      </NavButton>
    )
  })

const WorkPage = () => {
  const isActive = usePageActive()
  const { index, next, prev, goTo } = useCarousel(caseStudies.length)
  const study = caseStudies[index]
  const attributionLabel = study.attribution.replace(/^[—-]\s*/, '')

  return (
    <Page $isActive={isActive}>
      <MarmotWrapper>
        <WorkMarmot />
      </MarmotWrapper>

      <DesktopArrowButton
        direction='left'
        aria-label='Show previous work item'
        onClick={prev}
        $side='left'
      />

      <DesktopArrowButton
        direction='right'
        aria-label='Show next work item'
        onClick={next}
        $side='right'
      />

      <MainContent>
        <StudyArea>
          <StudyText key={study.id}>
            <ClientName>{study.name}</ClientName>
            <Quote>{study.quote}</Quote>
            <Attribution>&mdash;{attributionLabel}</Attribution>
            <Services>
              {study.services.map((service) => (
                <ServiceTag key={service}>{service}</ServiceTag>
              ))}
            </Services>

            <MobileNavRail>
              <MobileNavStrip>
                {renderNavButtons(index, goTo, true)}
              </MobileNavStrip>
            </MobileNavRail>
          </StudyText>

          {study.image && (
            <HeroImage>
              <img src={study.image} alt={study.name} />
            </HeroImage>
          )}
        </StudyArea>
      </MainContent>

      <DesktopNavRail>
        <DesktopNavStrip data-testid='work-nav-desktop'>
          {renderNavButtons(index, goTo)}
        </DesktopNavStrip>
      </DesktopNavRail>
    </Page>
  )
}

export default WorkPage
