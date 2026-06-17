import { useCallback, useState } from 'react'
import { useInRouterContext, useNavigate } from 'react-router'
import { convertCssPxToViewportUnit } from '@/styles/viewportUnits'
import MarmotCheer from './MarmotCheer'
import {
  ABOUT_DESKTOP_CLOUDS,
  ABOUT_DESKTOP_FILLS,
  ABOUT_DESKTOP_QUOTE_LAYOUTS,
  ABOUT_HERO_CLOUD,
  ABOUT_INTRO_COPY,
  ABOUT_MOBILE_HERO_CLOUD,
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
  MobileQuotePanels,
  MobileQuoteCloud,
  MobileQuoteMeta,
  MobileQuoteName,
  MobileQuoteText,
  MobileSwipeHint,
  MobileStaticScene,
  Page,
} from './AboutPage.styles'

const preloadRootsPage = () => import('../roots/RootsPage.jsx')

const CLOUD_FLOAT_PRESETS = {
  dark: { x: '4px', y: '-8px', duration: 7.6 },
  mid: { x: '-6px', y: '-10px', duration: 8.2 },
  light: { x: '8px', y: '-12px', duration: 8.8 },
  outro: { x: '-3px', y: '-7px', duration: 9.4 },
}

const MASCOT_FLOAT_STYLE = {
  '--about-float-x': convertCssPxToViewportUnit('2px'),
  '--about-float-y': convertCssPxToViewportUnit('-10px'),
  '--about-float-rotate': '1.3deg',
  '--about-float-duration': '5.2s',
  '--about-float-delay': '-0.8s',
}

const getCloudFloatStyle = (layer, index) => {
  const preset = CLOUD_FLOAT_PRESETS[layer] ?? CLOUD_FLOAT_PRESETS.mid

  return {
    '--about-float-x': convertCssPxToViewportUnit(preset.x),
    '--about-float-y': convertCssPxToViewportUnit(preset.y),
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
    viewBox={ABOUT_MOBILE_HERO_CLOUD.viewBox}
    fill='none'
    preserveAspectRatio='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      data-about-hero-path='mobile'
      d={ABOUT_MOBILE_HERO_CLOUD.path}
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
    width='59'
    height='46'
    viewBox='0 0 59 46'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M19.8929 26.8604H15.6612L16.5143 34.6661C16.6063 35.5224 15.9289 36.2705 15.0675 36.2705H5.86825C5.68426 36.2705 5.50864 36.2373 5.34974 36.1791C4.75597 35.9546 4.34619 35.3561 4.4131 34.6828L5.19085 26.8604H0.925749C0.156359 26.8604 -0.261788 25.9709 0.223262 25.389L4.7058 19.994L9.7152 13.9673C10.0748 13.535 10.7522 13.535 11.1118 13.9673L15.2933 19.0048L16.1128 19.994L18.5799 22.97L20.587 25.389C21.0721 25.9793 20.6539 26.8604 19.8929 26.8604Z'
      fill='#AFD3FC'
    />
    <path
      d='M15.286 19.0048C12.6684 15.846 8.54549 17.4171 7.33286 18.8968C5.14177 21.5735 5.84426 24.8072 6.43803 25.7299C7.0318 26.6526 5.33412 36.1791 5.33412 36.1791C4.74035 35.9546 4.33057 35.3561 4.39747 34.6828L5.17522 26.8604H0.910124C0.140734 26.8604 -0.277413 25.9709 0.207637 25.3891L4.69017 19.994L9.69957 13.9673C10.0592 13.535 10.7366 13.535 11.0962 13.9673L15.2777 19.0048H15.286Z'
      fill='#AFD3FC'
    />
    <path
      d='M20.1716 11.9405C21.1063 11.0022 22.6077 11.0625 23.5104 11.9689L32.6889 21.1848C32.847 21.3435 33.1033 21.344 33.2615 21.1855C33.4197 21.0266 33.4197 20.7687 33.2615 20.6098L30.044 17.3791C29.134 16.4655 29.0966 14.9665 30.0233 14.0357C30.9504 13.1048 32.4437 13.1419 33.3539 14.0557L37.8663 18.5866C38.0248 18.7455 38.2815 18.7453 38.4396 18.5866C38.5977 18.4275 38.5977 18.1699 38.4396 18.0109L35.2221 14.7802C34.3122 13.8665 34.2741 12.3678 35.2014 11.4368C36.1287 10.5059 37.621 10.5436 38.5313 11.4575L43.0437 15.9883C43.2019 16.1472 43.4589 16.1468 43.617 15.9883C43.7753 15.8294 43.7753 15.5715 43.617 15.4126L40.7296 12.5134C39.8197 11.5998 39.7809 10.1005 40.7082 9.16927C41.6358 8.23793 43.1287 8.27694 44.0388 9.19072L50.8108 15.9904C51.7528 16.9362 52.9382 18.8753 54.0332 20.8257C55.1519 22.8184 56.2614 24.9804 57.0378 26.4594L57.3802 27.1133L45.3309 39.2119L44.7389 39.0036C44.1287 38.7887 43.3085 38.5474 42.5089 38.3255L40.4036 37.7602C38.8645 37.3493 36.9605 36.9518 34.9044 36.523C32.201 35.9596 29.102 35.3138 26.0229 34.4652C25.5848 34.3442 25.028 34.1489 24.5599 33.832C24.0967 33.5184 23.5471 32.9583 23.5469 32.0994C23.5464 31.4587 23.8111 30.8815 24.2298 30.4519L24.2409 30.4409C24.6176 30.0664 25.1014 29.8311 25.6219 29.7669L25.8472 29.751L25.8948 29.7489L25.9416 29.7517L34.1464 30.3052C34.3141 30.3166 34.4728 30.2219 34.5426 30.0679C34.6124 29.9135 34.5798 29.7318 34.4606 29.6119L20.1998 15.2929C19.2972 14.3866 19.2369 12.879 20.1716 11.9405Z'
      fill='#1C2D38'
      stroke='#AFD3FC'
      strokeWidth='2'
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
  const isInRouterContext = useInRouterContext()
  const navigate = useNavigate()
  const [pageElement, setPageElement] = useState(null)
  const {
    scrollerRef,
    sceneRef,
    handleScrollHintClick,
    isFinalStageActive,
  } = useAboutDesktopScene()
  const MobileQuoteCloudSvg = ABOUT_MOBILE_QUOTE_CLOUD.Svg
  const handlePageRef = useCallback((node) => {
    setPageElement(node)
  }, [])

  return (
    <Page
      ref={handlePageRef}
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

            {ABOUT_DESKTOP_CLOUDS.map((cloud, index) => {
              const CloudSvg = cloud.Svg

              return (
                <DesktopCloud
                  key={cloud.id}
                  data-about-cloud={cloud.id}
                  data-about-layer={cloud.layer}
                  $layer={cloud.layer}
                  aria-hidden='true'
                >
                  <DesktopCloudFloat
                    data-about-float-layer='cloud'
                    style={getCloudFloatStyle(cloud.layer, index)}
                  >
                    <CloudSvg />
                  </DesktopCloudFloat>
                </DesktopCloud>
              )
            })}

            {/* {ABOUT_DESKTOP_FILLS.map(({ id, layer }) => (
              <DesktopBandFill
                key={id}
                data-about-fill={id}
                data-about-layer={layer}
                $layer={layer}
                aria-hidden='true'
              />
            ))} */}

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
              type='button'
              aria-label='Enter Non-profit Roots'
              data-about-mascot
              data-about-layer='mascot'
              disabled={!isFinalStageActive}
              onClick={() => navigate('/roots')}
              onFocus={preloadRootsPage}
              onMouseEnter={preloadRootsPage}
            >
              <DesktopMascotFloat
                aria-hidden='true'
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
        <MobileStaticScene data-testid='about-mobile-static-scene'>
          <MobileHeroCloud aria-hidden='true'>
            <MobileHeroCloudSvg />
          </MobileHeroCloud>

          <MobileIntroCopy>
            {ABOUT_INTRO_COPY.map((paragraph, paragraphIndex) => (
              <p key={`mobile-intro-${paragraphIndex}`}>
                {paragraph.lead ? <strong>{paragraph.lead}</strong> : null}
                {paragraph.text}
                {paragraph.emphasis ? (
                  <strong>{paragraph.emphasis}</strong>
                ) : null}
              </p>
            ))}
          </MobileIntroCopy>

          <MobileQuoteCloud aria-hidden='true'>
            <MobileQuoteCloudSvg />
          </MobileQuoteCloud>
        </MobileStaticScene>

        <MobileQuotePanels>
          {ABOUT_MOBILE_PANELS.map((panel, index) => (
            <MobilePanel
              key={panel.id}
              data-about-mobile-panel={panel.id}
              data-testid='about-mobile-panel'
            >
              <MobilePanelQuote
                data-about-mobile-quote={panel.id}
                $isFinal={panel.isFinal}
              >
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
                <MobileSwipeHint
                  aria-hidden='true'
                  data-about-mobile-scroll-cue
                >
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
        </MobileQuotePanels>
      </MobilePanels>
    </Page>
  )
}

export default AboutPage
