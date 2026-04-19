import { useCallback, useState } from 'react'
import { useInRouterContext } from 'react-router'
import usePageActive from '@/shared/hooks/usePageActive'
import MarmotCheer from './MarmotCheer'
import {
  ABOUT_DESKTOP_CLOUDS,
  ABOUT_DESKTOP_FILLS,
  ABOUT_DESKTOP_QUOTE_LAYOUTS,
  ABOUT_HERO_CLOUD,
  ABOUT_INTRO_COPY,
  ABOUT_MOBILE_PANELS,
  ABOUT_MOBILE_QUOTE_CLOUD,
} from './aboutSceneData'
import useAboutDesktopScene from './useAboutDesktopScene'
import useAboutPageTransition from './useAboutPageTransition'
import {
  DesktopBandFill,
  DesktopCloud,
  DesktopCloudFloat,
  DesktopHeroCloud,
  DesktopIntroCopy,
  DesktopMascot,
  DesktopMascotFloat,
  DesktopQuote,
  DesktopQuoteMeta,
  DesktopQuoteName,
  DesktopQuoteText,
  DesktopScroller,
  DesktopScrollHint,
  DesktopStickyScene,
  DesktopTrack,
  MobileHeroCloud,
  MobileIntroCopy,
  MobileMarmot,
  MobilePanel,
  MobilePanelQuote,
  MobilePanels,
  MobileQuoteCloud,
  MobileQuoteMeta,
  MobileQuoteName,
  MobileQuoteText,
  MobileSwipeHint,
  Page,
} from './AboutPage.styles'

const CLOUD_FLOAT_PRESETS = {
  dark: { x: '4px', y: '-8px', duration: 7.6 },
  mid: { x: '-6px', y: '-10px', duration: 8.2 },
  light: { x: '8px', y: '-12px', duration: 8.8 },
  outro: { x: '-3px', y: '-7px', duration: 9.4 },
}

const MASCOT_FLOAT_STYLE = {
  '--about-float-x': '2px',
  '--about-float-y': '-10px',
  '--about-float-rotate': '1.3deg',
  '--about-float-duration': '5.2s',
  '--about-float-delay': '-0.8s',
}

const getCloudFloatStyle = (layer, index) => {
  const preset = CLOUD_FLOAT_PRESETS[layer] ?? CLOUD_FLOAT_PRESETS.mid

  return {
    '--about-float-x': preset.x,
    '--about-float-y': preset.y,
    '--about-float-duration': `${preset.duration + index * 0.18}s`,
    '--about-float-delay': `${index * -0.55}s`,
  }
}

const DesktopHeroCloudSvg = () => (
  <svg
    viewBox={ABOUT_HERO_CLOUD.viewBoxes.stageZero}
    fill='none'
    preserveAspectRatio='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      data-about-hero-path='desktop'
      d={ABOUT_HERO_CLOUD.paths.stageZero}
      fill='white'
    />
  </svg>
)

const MobileHeroCloudSvg = () => (
  <svg
    viewBox='0 0 1450 622'
    fill='none'
    preserveAspectRatio='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      data-about-hero-path='mobile'
      d={ABOUT_HERO_CLOUD.paths.stageOne}
      fill='white'
    />
  </svg>
)

const ScrollCue = () => (
  <svg
    viewBox='0 0 65 65'
    xmlns='http://www.w3.org/2000/svg'
    aria-hidden='true'
  >
    <circle cx='32.5' cy='32.5' r='32.5' fill='#AFD3FC' />
    <path
      d='M46.3024 31.8543H40.1901L41.4222 20.5794C41.5551 19.3426 40.5766 18.262 39.3324 18.262H26.0446C25.7789 18.262 25.5252 18.31 25.2957 18.3941C24.438 18.7183 23.8461 19.5828 23.9427 20.5554L25.0661 31.8543H18.9054C17.7941 31.8543 17.1901 33.1391 17.8907 33.9796L24.3655 41.7724L31.6013 50.4778C32.1207 51.1021 33.0992 51.1021 33.6186 50.4778L39.6585 43.2013L40.8424 41.7724L44.4059 37.4738L47.3051 33.9796C48.0057 33.1271 47.4017 31.8543 46.3024 31.8543Z'
      fill='#1C2D38'
    />
    <path
      d='M39.6472 43.2013C35.8662 47.7641 29.9109 45.4947 28.1593 43.3574C24.9944 39.491 26.0091 34.8201 26.8668 33.4873C27.7244 32.1545 25.2722 18.3941 25.2722 18.3941C24.4146 18.7183 23.8226 19.5828 23.9193 20.5554L25.0427 31.8543H18.882C17.7707 31.8543 17.1667 33.1391 17.8673 33.9796L24.3421 41.7724L31.5779 50.4778C32.0973 51.1021 33.0758 51.1021 33.5952 50.4778L39.6351 43.2013H39.6472Z'
      fill='#1C2D38'
    />
  </svg>
)

const MobileSwipeCue = () => (
  <svg
    viewBox='0 0 59 46'
    xmlns='http://www.w3.org/2000/svg'
    aria-hidden='true'
  >
    <path
      d='M8.85 41.95V16.67h7.2L8.97 5.37L1.9 16.67h6.95v25.28z'
      fill='#AFD3FC'
    />
    <path
      d='M50.32 9.57c-2.15-1.5-5.02-1.17-6.79.58l-2.83 2.81l-2.49-7.04c-.66-1.87-2.65-2.92-4.56-2.38c-1.92.55-3.05 2.51-2.67 4.48l1.3 6.74l-1.76-1.55c-1.74-1.53-4.4-1.44-6.02.2l-.37.37c-1.7 1.72-1.72 4.49-.06 6.25l11.85 12.45l1.74 7.32h15.26l4.28-7.94c2.08-3.86 2.45-8.41.98-12.56l-1.24-3.52c-.51-1.45-1.46-2.72-2.75-3.62ZM51 38.29H39.85l-1.29-5.46l-11.54-12.12c-1.02-1.08-1-2.78.04-3.84l.37-.37c.98-.99 2.58-1.04 3.61-.13l5.26 4.63l-2.89-14.96c-.18-.93.35-1.86 1.26-2.12c.9-.26 1.84.24 2.15 1.12l4.2 11.89l4.51-4.48c1.05-1.04 2.74-1.23 4.01-.34c.76.53 1.32 1.27 1.63 2.15l1.24 3.52c1.28 3.62.95 7.59-.91 10.99z'
      fill='#AFD3FC'
    />
  </svg>
)

const renderQuoteText = (quote) =>
  Array.isArray(quote)
    ? quote.map((line, index) => (
        <span key={`${line}-${index}`}>
          {line}
          {index < quote.length - 1 ? <br /> : null}
        </span>
      ))
    : quote

const AboutPageTransitionController = ({ pageElement }) => {
  useAboutPageTransition(pageElement)

  return null
}

const AboutPage = () => {
  const isActive = usePageActive()
  const isInRouterContext = useInRouterContext()
  const [pageElement, setPageElement] = useState(null)
  const { scrollerRef, sceneRef, handleScrollHintClick } =
    useAboutDesktopScene()
  const handlePageRef = useCallback((node) => {
    setPageElement(node)
  }, [])

  return (
    <Page
      ref={handlePageRef}
      $isActive={isActive}
      data-testid='about-page'
      data-about-phase='entered'
    >
      {isInRouterContext ? (
        <AboutPageTransitionController pageElement={pageElement} />
      ) : null}

      <DesktopScroller ref={scrollerRef} data-testid='about-desktop-scroller'>
        <DesktopTrack>
          <DesktopStickyScene ref={sceneRef} data-about-scene>
            <DesktopHeroCloud
              data-about-hero
              data-about-layer='hero'
              aria-hidden='true'
            >
              <DesktopHeroCloudSvg />
            </DesktopHeroCloud>

            <DesktopIntroCopy data-about-layer='intro'>
              {ABOUT_INTRO_COPY.map((paragraph, index) => (
                <p key={index}>
                  {paragraph.lead ? <strong>{paragraph.lead}</strong> : null}
                  {paragraph.text}
                  {paragraph.emphasis ? (
                    <strong>{paragraph.emphasis}</strong>
                  ) : null}
                </p>
              ))}
            </DesktopIntroCopy>

            <DesktopScrollHint
              type='button'
              aria-label='Scroll for more client testimonials'
              onClick={handleScrollHintClick}
              data-about-layer='intro'
            >
              <ScrollCue />
            </DesktopScrollHint>

            {ABOUT_DESKTOP_CLOUDS.map(({ id, layer, src }, index) => (
              <DesktopCloud
                key={id}
                data-about-cloud={id}
                data-about-layer={layer}
                $layer={layer}
                aria-hidden='true'
              >
                <DesktopCloudFloat
                  data-about-float-layer='cloud'
                  style={getCloudFloatStyle(layer, index)}
                >
                  <img src={src} alt='' />
                </DesktopCloudFloat>
              </DesktopCloud>
            ))}

            {ABOUT_DESKTOP_FILLS.map(({ id, layer }) => (
              <DesktopBandFill
                key={id}
                data-about-fill={id}
                data-about-layer={layer}
                $layer={layer}
                aria-hidden='true'
              />
            ))}

            {ABOUT_DESKTOP_QUOTE_LAYOUTS.map((quote) => (
              <DesktopQuote
                key={quote.id}
                data-about-quote={quote.id}
                data-about-layer={quote.layer}
                $layer={quote.layer}
              >
                <DesktopQuoteText $layer={quote.layer}>
                  &ldquo;{renderQuoteText(quote.quote)}&rdquo;
                </DesktopQuoteText>
                <DesktopQuoteName $layer={quote.layer}>
                  {quote.name}
                </DesktopQuoteName>
                <DesktopQuoteMeta $layer={quote.layer}>
                  {quote.roleLines.map((line) => (
                    <span key={`${quote.id}-${line}`}>{line}</span>
                  ))}
                </DesktopQuoteMeta>
              </DesktopQuote>
            ))}

            <DesktopMascot
              data-about-mascot
              data-about-layer='mascot'
              aria-hidden='true'
            >
              <DesktopMascotFloat
                data-about-float-layer='mascot'
                style={MASCOT_FLOAT_STYLE}
              >
                <MarmotCheer />
              </DesktopMascotFloat>
            </DesktopMascot>
          </DesktopStickyScene>
        </DesktopTrack>
      </DesktopScroller>

      <MobilePanels>
        {ABOUT_MOBILE_PANELS.map((panel, index) => (
          <MobilePanel key={panel.id} data-testid='about-mobile-panel'>
            <MobileHeroCloud aria-hidden='true'>
              <MobileHeroCloudSvg />
            </MobileHeroCloud>

            <MobileIntroCopy>
              {ABOUT_INTRO_COPY.map((paragraph, paragraphIndex) => (
                <p key={`${panel.id}-${paragraphIndex}`}>
                  {paragraph.lead ? <strong>{paragraph.lead}</strong> : null}
                  {paragraph.text}
                  {paragraph.emphasis ? (
                    <strong>{paragraph.emphasis}</strong>
                  ) : null}
                </p>
              ))}
            </MobileIntroCopy>

            <MobileQuoteCloud aria-hidden='true'>
              <img src={ABOUT_MOBILE_QUOTE_CLOUD.src} alt='' />
            </MobileQuoteCloud>

            <MobilePanelQuote $isFinal={panel.isFinal}>
              <MobileQuoteText $isFinal={panel.isFinal}>
                &ldquo;{renderQuoteText(panel.quote)}&rdquo;
              </MobileQuoteText>
              <MobileQuoteName $isFinal={panel.isFinal}>
                {panel.name}
              </MobileQuoteName>
              <MobileQuoteMeta $isFinal={panel.isFinal}>
                {panel.roleLines.map((line) => (
                  <span key={`${panel.id}-${line}`}>{line}</span>
                ))}
              </MobileQuoteMeta>
            </MobilePanelQuote>

            {index === 0 ? (
              <MobileSwipeHint aria-hidden='true'>
                <MobileSwipeCue />
              </MobileSwipeHint>
            ) : null}

            {panel.isFinal ? (
              <MobileMarmot aria-hidden='true'>
                <MarmotCheer />
              </MobileMarmot>
            ) : null}
          </MobilePanel>
        ))}
      </MobilePanels>
    </Page>
  )
}

export default AboutPage
