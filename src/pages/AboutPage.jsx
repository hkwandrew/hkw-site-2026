import { createElement, Fragment } from 'react'
import MarmotCheer from '../components/characters/MarmotCheer'
import useAboutPageAnimation from '../hooks/useAboutPageAnimation'
import { HERO_CLOUD_PATHS } from '../aboutAnimationConfig'
import { CLOUDS, QUOTES } from '../data/about-clouds-quotes'
import {
    AboutPageStyle,
    AnimatedSection,
    Cloud,
    CloudFloat,
    CloudsLayer,
    HeroCloud,
    HeroCloudTarget,
    IntroCopy,
    Mascot,
    MascotFigure,
    MascotFloat,
    OutroCopy,
    OutroName,
    OutroQuote,
    OutroRole,
    Quote,
    QuoteName,
    QuoteRole,
    QuoteText,
    QuotesLayer,
    Scene,
    ScrollHint,
    StaticCard,
    StaticCardCloud,
    StaticCardContent,
    StaticCards,
    StaticHeroCloud,
    StaticIntroCopy,
    StaticIntro,
    StaticMascot,
    StaticOutroQuote,
    StaticPageLabel,
    StaticQuoteName,
    StaticQuoteRole,
    StaticQuoteText,
    StaticSection,
    StaticSwipeHint,
} from '../styles/aboutStyles'

const BR_TAG_REGEX = /<br\s*\/?>/gi
const MOBILE_CARD_CLOUD_BY_LAYER = {
    dark: CLOUDS.find((cloud) => cloud.id === 'dark-center'),
    mid: CLOUDS.find((cloud) => cloud.id === 'mid-center'),
    light: CLOUDS.find((cloud) => cloud.id === 'light-center'),
    outro: CLOUDS.find((cloud) => cloud.id === 'dark-center'),
}
const MOBILE_CARDS = [
    ...QUOTES,
    {
        id: 'outro',
        layer: 'outro',
        quote: 'We are grateful we selected HKW...',
        name: 'Nancy Janzen',
        roleLines: ['CEO at Maplewood'],
        isOutro: true,
    },
]

const AboutPage = () => {
    const { sectionRef, handleScrollHintClick } = useAboutPageAnimation()

    const quoteLines = (quote) => {
        if (Array.isArray(quote)) return quote
        if (typeof quote === 'string')
            return quote.split(BR_TAG_REGEX).map((line) => line.trim())
        return [String(quote ?? '')]
    }

    const quoteTextWithMarks = (quote) =>
        createElement(
            Fragment,
            null,
            '\u201C',
            ...quoteLines(quote).map((line, index) =>
                createElement(
                    Fragment,
                    { key: `quote-line-${index}` },
                    index > 0 ? createElement('br') : null,
                    line,
                ),
            ),
            '\u201D',
        )

    const renderHeroCloudSvg = ({ includeMorphTarget = false }) => (
        <svg viewBox='0 0 1450 622' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                data-hero-cloud-stage-zero={includeMorphTarget ? '' : undefined}
                d={HERO_CLOUD_PATHS.stageZero}
                fill='white'
            />
            {includeMorphTarget ? (
                <HeroCloudTarget
                    data-hero-cloud-stage-one={includeMorphTarget ? '' : undefined}
                    d={HERO_CLOUD_PATHS.stageOne}
                    fill='white'
                />
            ) : null}
        </svg>
    )

    const renderQuoteContent = (quote) => (
        <>
            <QuoteText>{quoteTextWithMarks(quote.quote)}</QuoteText>
            <QuoteName>{quote.name}</QuoteName>
            <QuoteRole>
                {quote.roleLines.map((line, index) => (
                    <span key={`${quote.id}-role-${index}`}>{line}</span>
                ))}
            </QuoteRole>
        </>
    )

    const renderStaticQuoteContent = (quote) => (
        <>
            <StaticQuoteText>{quoteTextWithMarks(quote.quote)}</StaticQuoteText>
            <StaticQuoteName>{quote.name}</StaticQuoteName>
            <StaticQuoteRole>
                {quote.roleLines.map((line, index) => (
                    <span key={`${quote.id}-role-${index}`}>{line}</span>
                ))}
            </StaticQuoteRole>
        </>
    )

    const renderMobileSwipeIcon = () => (
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

    const introCopy = (
        <>
            <p>
                Great design isn't just about looking good—it's about creating
                connection. At HKW, we bring curiosity, strategy, and care to every
                project, whether we're amplifying nonprofit missions or shaping
                distinctive brand voices.
            </p>
            <p>
                <span>But don't just take our word for it—</span>
                <span>here's what our clients have to say.</span>
            </p>
        </>
    )

    return (
        <>
            <AboutPageStyle />

            <AnimatedSection className='about about--animated' id='about' ref={sectionRef}>
                <Scene className='about-scene'>
                    <HeroCloud className='about-heroCloud' aria-hidden='true'>
                        {renderHeroCloudSvg({ includeMorphTarget: true })}
                    </HeroCloud>

                    <IntroCopy data-intro-copy>
                        {introCopy}
                    </IntroCopy>

                    <ScrollHint
                        onClick={handleScrollHintClick}
                        type='button'
                        aria-label='Scroll for testimonials'
                        data-scroll-hint
                        className='about-scrollHint'
                    >
                        <svg width='65' height='65' viewBox='0 0 65 65' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <circle cx='32.5' cy='32.5' r='32.5' fill='#AFD3FC' />
                            <path d='M46.3024 31.8543H40.1901L41.4222 20.5794C41.5551 19.3426 40.5766 18.262 39.3324 18.262H26.0446C25.7789 18.262 25.5252 18.31 25.2957 18.3941C24.438 18.7183 23.8461 19.5828 23.9427 20.5554L25.0661 31.8543H18.9054C17.7941 31.8543 17.1901 33.1391 17.8907 33.9796L24.3655 41.7724L31.6013 50.4778C32.1207 51.1021 33.0992 51.1021 33.6186 50.4778L39.6585 43.2013L40.8424 41.7724L44.4059 37.4738L47.3051 33.9796C48.0057 33.1271 47.4017 31.8543 46.3024 31.8543Z' fill='#1C2D38' />
                            <path d='M39.6472 43.2013C35.8662 47.7641 29.9109 45.4947 28.1593 43.3574C24.9944 39.491 26.0091 34.8201 26.8668 33.4873C27.7244 32.1545 25.2722 18.3941 25.2722 18.3941C24.4146 18.7183 23.8226 19.5828 23.9193 20.5554L25.0427 31.8543H18.882C17.7707 31.8543 17.1667 33.1391 17.8673 33.9796L24.3421 41.7724L31.5779 50.4778C32.0973 51.1021 33.0758 51.1021 33.5952 50.4778L39.6351 43.2013H39.6472Z' fill='#1C2D38' />
                        </svg>
                    </ScrollHint>

                    <CloudsLayer aria-hidden='true'>
                        {CLOUDS.map((cloud) => (
                            <Cloud
                                key={cloud.id}
                                $layer={cloud.layer}
                                data-cloud-id={cloud.id}
                            >
                                <CloudFloat $layer={cloud.layer}>
                                    {createElement(cloud.component)}
                                </CloudFloat>
                            </Cloud>
                        ))}
                    </CloudsLayer>

                    <QuotesLayer>
                        {QUOTES.map((quote) => (
                            <Quote
                                key={quote.id}
                                $layer={quote.layer}
                                data-quote-id={quote.id}
                                data-quote-layer={quote.layer}
                            >
                                {renderQuoteContent(quote)}
                            </Quote>
                        ))}
                    </QuotesLayer>

                    <OutroCopy data-outro-copy>
                        <OutroQuote>"We are grateful we selected HKW..."</OutroQuote>
                        <OutroName>Nancy Janzen</OutroName>
                        <OutroRole>CEO at Maplewood</OutroRole>
                    </OutroCopy>

                    <Mascot data-outro-mascot aria-hidden='true'>
                        <MascotFigure data-outro-mascot-figure>
                            <MascotFloat>
                                <MarmotCheer />
                            </MascotFloat>
                        </MascotFigure>
                    </Mascot>
                </Scene>
            </AnimatedSection>

            <StaticSection aria-label='Client testimonials'>
                <StaticIntro>
                    <StaticPageLabel>Kind Words</StaticPageLabel>

                    <StaticHeroCloud aria-hidden='true'>
                        {renderHeroCloudSvg({ includeMorphTarget: false })}
                    </StaticHeroCloud>

                    <StaticIntroCopy>
                        {introCopy}
                    </StaticIntroCopy>
                </StaticIntro>

                <StaticCards>
                    {MOBILE_CARDS.map((quote, index) => {
                        const cardCloud = MOBILE_CARD_CLOUD_BY_LAYER[quote.layer]

                        return (
                            <StaticCard
                                key={quote.id}
                                $layer={quote.layer}
                                $isOutro={quote.isOutro}
                                data-is-outro={quote.isOutro ? '' : undefined}
                            >
                                <StaticCardCloud aria-hidden='true'>
                                    {cardCloud?.component
                                        ? createElement(cardCloud.component)
                                        : null}
                                </StaticCardCloud>

                                <StaticCardContent>
                                    {quote.isOutro ? (
                                        <>
                                            <StaticOutroQuote>
                                                {quoteTextWithMarks(quote.quote)}
                                            </StaticOutroQuote>
                                            <StaticQuoteName>{quote.name}</StaticQuoteName>
                                            <StaticQuoteRole>
                                                {quote.roleLines.map((line, roleIndex) => (
                                                    <span
                                                        key={`${quote.id}-role-${roleIndex}`}
                                                    >
                                                        {line}
                                                    </span>
                                                ))}
                                            </StaticQuoteRole>
                                        </>
                                    ) : (
                                        renderStaticQuoteContent(quote)
                                    )}
                                </StaticCardContent>

                                {index === 0 ? (
                                    <StaticSwipeHint>
                                        {renderMobileSwipeIcon()}
                                    </StaticSwipeHint>
                                ) : null}

                                {quote.isOutro ? (
                                    <StaticMascot aria-hidden='true'>
                                        <MarmotCheer />
                                    </StaticMascot>
                                ) : null}
                            </StaticCard>
                        )
                    })}
                </StaticCards>
            </StaticSection>
        </>
    )
}

export default AboutPage
